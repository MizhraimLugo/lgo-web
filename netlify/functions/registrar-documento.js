// registrar-documento: cierre interino del flujo (mientras llega el Paso 5,
// generación del .docx). Tras un pago APROBADO y VERIFICADO, envía el documento
// al despacho en DOS destinos para que un abogado lo prepare:
//   1) ClickUp → tarea en la lista del espacio "LGO Abogados".
//   2) Correo → contacto@lgo.mx vía Resend.
//
// BLINDAJE: recibe SOLO { orden_id, token }. Los datos del documento salen de
// la orden en Blobs (no del cliente). Se exige token válido + orden pagada y NO
// consumida; al terminar se marca consumida (un pago = un documento).
//
// Sin dependencias extra: fetch nativo. Secretos en variables de entorno.
import { getDocumento, resumenMarkdown } from '../lib/contratos-fields.js';
import { verificarToken, marcarConsumida } from '../lib/ordenes.js';

const EMAIL_FROM = process.env.LEAD_EMAIL_FROM || 'Asistente de Contratos LGO <no-reply@send.lgo.mx>';
const EMAIL_TO = process.env.LEAD_EMAIL_TO || 'contacto@lgo.mx';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }

  const ordenId = typeof body.orden_id === 'string' ? body.orden_id : '';
  const token = typeof body.token === 'string' ? body.token : '';

  // BLINDAJE: sin pago verificado, no se entrega nada.
  const v = await verificarToken(ordenId, token);
  if (!v.ok) return json(403, { error: v.error || 'Pago no verificado.' });

  const orden = v.orden;
  const documentoId = orden.contrato_id;
  const valores = orden.valores || {};
  const lead = orden.lead || {};
  const doc = getDocumento(documentoId);
  if (!doc) return json(400, { error: 'Documento no reconocido.' });

  const nombre = String(lead.nombre || '').trim() || '(sin nombre)';
  const telefono = String(lead.telefono || '').trim();
  const correo = String(lead.correo || '').trim();
  const resumen = resumenMarkdown(documentoId, valores);
  const cuando = new Date().toISOString();
  const resultados = { clickup: false, correo: false };

  // 1) ClickUp
  try {
    if (process.env.CLICKUP_API_TOKEN && process.env.CLICKUP_LIST_ID) {
      const r = await fetch(`https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: process.env.CLICKUP_API_TOKEN },
        body: JSON.stringify({
          name: `Documento PAGADO: ${doc.nombre} — ${nombre}`,
          markdown_description:
            `**Documento preparado con el asistente de /contratos (PAGADO)**\n\n` +
            `**Contacto:**\n- **Nombre:** ${nombre}\n- **Teléfono:** ${telefono}\n- **Correo:** ${correo}\n\n` +
            `**Documento:** ${doc.nombre} \`(${documentoId})\`\n` +
            `**Pago:** orden \`${orden.id}\` · payment \`${orden.payment_id}\` · $${orden.monto} ${orden.moneda}\n\n` +
            `**Datos capturados:**\n${resumen || '_(sin datos)_'}\n\n` +
            `**Fecha:** ${cuando}`
        })
      });
      resultados.clickup = r.ok;
      if (!r.ok) console.error('ClickUp error', r.status, (await r.text()).slice(0, 300));
    } else { console.warn('ClickUp no configurado.'); }
  } catch (err) { console.error('ClickUp fetch error', err); }

  // 2) Correo (Resend)
  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [EMAIL_TO],
          reply_to: correo || undefined,
          subject: `Documento PAGADO: ${doc.nombre} — ${nombre}`,
          html:
            `<h2>Documento preparado con el asistente de /contratos (PAGADO)</h2>` +
            `<p><strong>Contacto:</strong><br>Nombre: ${escapeHtml(nombre)}<br>Teléfono: ${escapeHtml(telefono)}<br>Correo: ${escapeHtml(correo)}</p>` +
            `<p><strong>Documento:</strong> ${escapeHtml(doc.nombre)} (${escapeHtml(documentoId)})<br>` +
            `<strong>Pago:</strong> orden ${escapeHtml(orden.id)} · payment ${escapeHtml(String(orden.payment_id))} · $${escapeHtml(String(orden.monto))} ${escapeHtml(orden.moneda)}</p>` +
            `<p><strong>Datos capturados:</strong></p><div>${mdToHtml(resumen)}</div>` +
            `<p style="color:#888">Fecha: ${cuando}</p>`
        })
      });
      resultados.correo = r.ok;
      if (!r.ok) console.error('Resend error', r.status, (await r.text()).slice(0, 300));
    } else { console.warn('Resend no configurado.'); }
  } catch (err) { console.error('Resend fetch error', err); }

  // Consume la orden solo si al menos un canal recibió el documento.
  if (resultados.clickup || resultados.correo) {
    await marcarConsumida(ordenId);
    return json(200, { ok: true, registrado: resultados });
  }
  // Si ambos fallan, NO consumimos: el usuario ya pagó y puede reintentar.
  return json(502, { ok: false, error: 'No se pudo entregar el documento. Intenta de nuevo.' });
};

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
