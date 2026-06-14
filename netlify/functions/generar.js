// generar.js — Paso 5: genera el .docx final y lo ENTREGA al usuario.
// Reemplaza el cierre interino de registrar-documento.js.
//
// BLINDAJE (un pago = un documento): recibe SOLO { orden_id, token }. Re-verifica
// el pago con verificarToken() ANTES de generar y consume con marcarConsumida()
// SOLO si el render tuvo éxito (si falla, no consume → el usuario puede reintentar).
// Los datos salen de la orden (Blobs), nunca del cliente.
//
// Entrega: responde { ok, filename, docx_base64 } para que el frontend descargue
// el .docx; además, best-effort, manda copia al despacho (correo Resend con el
// .docx adjunto + tarea ClickUp con el archivo adjunto).
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { getDocumento, resumenMarkdown } from '../lib/contratos-fields.js';
import { verificarToken, marcarConsumida, documentoConToken } from '../lib/ordenes.js';
import { construirContexto } from '../lib/contratos-render.js';

const EMAIL_FROM = process.env.LEAD_EMAIL_FROM || 'Asistente de Contratos LGO <no-reply@send.lgo.mx>';
const EMAIL_TO = process.env.LEAD_EMAIL_TO || 'contacto@lgo.mx';
const MIME_DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }
  const ordenId = typeof body.orden_id === 'string' ? body.orden_id : '';
  const token = typeof body.token === 'string' ? body.token : '';

  // RE-DESCARGA: si la orden ya se generó (consumida + token válido + documento
  // guardado), reentrega el MISMO archivo. No regenera, no consume otra vez, no
  // vuelve a avisar al despacho.
  const re = await documentoConToken(ordenId, token);
  if (re.ok) {
    return json(200, { ok: true, filename: re.documento.filename, mime: re.documento.mime || MIME_DOCX, docx_base64: re.documento.base64, reentrega: true });
  }

  // BLINDAJE: sin pago verificado, no se genera nada (no consume todavía).
  const v = await verificarToken(ordenId, token);
  if (!v.ok) return json(403, { error: v.error || 'Pago no verificado.' });

  const orden = v.orden;
  const documentoId = orden.contrato_id;
  const valores = orden.valores || {};
  const doc = getDocumento(documentoId);
  if (!doc) return json(400, { error: 'Documento no reconocido.' });

  const ctx = construirContexto(documentoId, valores);
  if (!ctx) return json(500, { error: 'No se pudo preparar el documento.' });

  const ruta = rutaPlantilla(documentoId);
  if (!ruta) { console.error('Plantilla no encontrada para', documentoId); return json(500, { error: 'Plantilla no disponible.' }); }

  // Render del .docx. Si algo falla, NO consumimos (el usuario ya pagó y reintenta).
  let buffer;
  try {
    const zip = new PizZip(readFileSync(ruta));
    const dt = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter: () => ''
    });
    dt.render(ctx);
    buffer = dt.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
  } catch (err) {
    console.error('docxtemplater error', err?.message || err, err?.properties?.errors || '');
    return json(500, { error: 'No se pudo generar el documento. Intenta de nuevo.' });
  }

  const filename = `${sanitizar(doc.nombre)}.docx`;
  const base64 = buffer.toString('base64');

  // Render OK → consumir (un pago = un documento), guardando el .docx en la orden
  // para permitir re-descarga posterior con el mismo token.
  await marcarConsumida(ordenId, { base64, filename, mime: MIME_DOCX });

  // Copia al despacho (best-effort; no bloquea la entrega al usuario).
  const despacho = await enviarAlDespacho({ doc, documentoId, orden, valores, filename, base64 });

  return json(200, { ok: true, filename, mime: MIME_DOCX, docx_base64: base64, despacho });
};

/** Busca la plantilla committeada (local con netlify dev y en el bundle desplegado). */
function rutaPlantilla(id) {
  const dirs = [join(process.cwd(), 'netlify', 'plantillas')];
  // Tras el bundling de esbuild las funciones son CommonJS: __dirname apunta al
  // directorio servido, junto al que se copian los included_files.
  if (typeof __dirname !== 'undefined') {
    dirs.push(join(__dirname, '..', 'plantillas'), join(__dirname, 'plantillas'), __dirname);
  }
  for (const d of dirs) {
    const p = join(d, `${id}.docx`);
    if (existsSync(p)) return p;
  }
  return null;
}

function sanitizar(nombre) {
  return String(nombre || 'documento').replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim() || 'documento';
}

/** Manda el .docx al despacho por correo (Resend, adjunto) y ClickUp (tarea + adjunto). */
async function enviarAlDespacho({ doc, documentoId, orden, valores, filename, base64 }) {
  const lead = orden.lead || {};
  const nombre = String(lead.nombre || '').trim() || '(sin nombre)';
  const telefono = String(lead.telefono || '').trim();
  const correo = String(lead.correo || '').trim();
  const resumen = resumenMarkdown(documentoId, valores);
  const cuando = new Date().toISOString();
  const out = { correo: false, clickup: false };

  // Correo con el .docx adjunto.
  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [EMAIL_TO],
          reply_to: correo || undefined,
          subject: `Documento GENERADO: ${doc.nombre} — ${nombre}`,
          html:
            `<h2>Documento generado y entregado por el asistente de /contratos</h2>` +
            `<p><strong>Contacto:</strong><br>Nombre: ${escapeHtml(nombre)}<br>Teléfono: ${escapeHtml(telefono)}<br>Correo: ${escapeHtml(correo)}</p>` +
            `<p><strong>Documento:</strong> ${escapeHtml(doc.nombre)} (${escapeHtml(documentoId)})<br>` +
            `<strong>Pago:</strong> orden ${escapeHtml(orden.id)} · payment ${escapeHtml(String(orden.payment_id))} · $${escapeHtml(String(orden.monto))} ${escapeHtml(orden.moneda)}</p>` +
            `<p><strong>Datos capturados:</strong></p><div>${mdToHtml(resumen)}</div>` +
            `<p style="color:#888">El .docx generado va adjunto. Fecha: ${cuando}</p>`,
          attachments: [{ filename, content: base64 }]
        })
      });
      out.correo = r.ok;
      if (!r.ok) console.error('Resend error', r.status, (await r.text()).slice(0, 300));
    } else { console.warn('Resend no configurado.'); }
  } catch (err) { console.error('Resend fetch error', err); }

  // ClickUp: crear tarea + adjuntar el .docx.
  try {
    if (process.env.CLICKUP_API_TOKEN && process.env.CLICKUP_LIST_ID) {
      const r = await fetch(`https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: process.env.CLICKUP_API_TOKEN },
        body: JSON.stringify({
          name: `Documento GENERADO: ${doc.nombre} — ${nombre}`,
          markdown_description:
            `**Documento generado y entregado al cliente por /contratos**\n\n` +
            `**Contacto:**\n- **Nombre:** ${nombre}\n- **Teléfono:** ${telefono}\n- **Correo:** ${correo}\n\n` +
            `**Documento:** ${doc.nombre} \`(${documentoId})\`\n` +
            `**Pago:** orden \`${orden.id}\` · payment \`${orden.payment_id}\` · $${orden.monto} ${orden.moneda}\n\n` +
            `**Datos capturados:**\n${resumen || '_(sin datos)_'}\n\n` +
            `**Fecha:** ${cuando} · (el .docx va adjunto a esta tarea)`
        })
      });
      if (r.ok) {
        const tarea = await r.json().catch(() => ({}));
        out.clickup = true;
        if (tarea && tarea.id) await adjuntarEnClickUp(tarea.id, filename, base64);
      } else {
        console.error('ClickUp error', r.status, (await r.text()).slice(0, 300));
      }
    } else { console.warn('ClickUp no configurado.'); }
  } catch (err) { console.error('ClickUp fetch error', err); }

  return out;
}

/** Sube el .docx como adjunto a una tarea de ClickUp (multipart). */
async function adjuntarEnClickUp(taskId, filename, base64) {
  try {
    const fd = new FormData();
    fd.append('attachment', new Blob([Buffer.from(base64, 'base64')], { type: MIME_DOCX }), filename);
    const r = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/attachment`, {
      method: 'POST',
      headers: { Authorization: process.env.CLICKUP_API_TOKEN },
      body: fd
    });
    if (!r.ok) console.error('ClickUp attachment error', r.status, (await r.text()).slice(0, 200));
  } catch (err) { console.error('ClickUp attachment fetch error', err); }
}

function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function mdToHtml(md) {
  if (!md) return '<em>(sin datos)</em>';
  const items = md.split('\n').filter(Boolean).map((l) => {
    const m = l.replace(/^-\s*/, '').match(/^\*\*(.+?)\*\*\s*(.*)$/);
    const inner = m ? `<strong>${escapeHtml(m[1])}</strong> ${escapeHtml(m[2])}` : escapeHtml(l);
    return `<li>${inner}</li>`;
  });
  return `<ul>${items.join('')}</ul>`;
}
function json(statusCode, obj) {
  return { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) };
}
