// Función registrar-documento: cuando la persona termina de llenar un documento
// con el asistente y CONFIRMA, envía el documento al despacho en DOS destinos:
//   1) ClickUp → tarea en la lista del espacio "LGO Abogados".
//   2) Correo → contacto@lgo.mx vía Resend.
// Así un abogado lo prepara. Cierre interino mientras llegan el pago (Paso 4)
// y la generación del .docx (Paso 5).
//
// Sin dependencias: fetch nativo (Node 18+). Secretos en variables de entorno.
import { getDocumento, resumenMarkdown, faltantesObligatorios } from '../lib/contratos-fields.js';

const EMAIL_FROM = process.env.LEAD_EMAIL_FROM || 'Asistente de Contratos LGO <no-reply@send.lgo.mx>';
const EMAIL_TO = process.env.LEAD_EMAIL_TO || 'contacto@lgo.mx';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }

  const lead = body.lead && typeof body.lead === 'object' ? body.lead : {};
  const nombre = limpia(lead.nombre, 120);
  const telefono = limpia(lead.telefono, 40);
  const correo = limpia(lead.correo, 160);
  const documentoId = limpia(body.documento_id, 80);
  const valores = body.valores && typeof body.valores === 'object' && !Array.isArray(body.valores) ? body.valores : {};

  const telDigits = telefono.replace(/\D/g, '');
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo);
  if (!nombre || telDigits.length < 10 || !emailOk) {
    return json(400, { error: 'Faltan datos de contacto válidos (nombre, teléfono y correo).' });
  }

  const doc = getDocumento(documentoId);
  if (!doc) return json(400, { error: 'Documento no reconocido.' });

  const resumen = resumenMarkdown(documentoId, valores);
  const faltan = faltantesObligatorios(documentoId, valores).map((c) => c.etiqueta);
  const cuando = new Date().toISOString();
  const notaFaltan = faltan.length
    ? `\n\n**Nota:** quedaron datos pendientes: ${faltan.join('; ')}.`
    : '';

  const resultados = { clickup: false, correo: false };

  // 1) ClickUp
  try {
    if (process.env.CLICKUP_API_TOKEN && process.env.CLICKUP_LIST_ID) {
      const r = await fetch(`https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: process.env.CLICKUP_API_TOKEN },
        body: JSON.stringify({
          name: `Documento por preparar: ${doc.nombre} — ${nombre}`,
          markdown_description:
            `**Documento preparado con el asistente de /contratos**\n\n` +
            `**Contacto (lead):**\n- **Nombre:** ${nombre}\n- **Teléfono:** ${telefono}\n- **Correo:** ${correo}\n\n` +
            `**Documento:** ${doc.nombre} \`(${documentoId})\`${notaFaltan}\n\n` +
            `**Datos capturados:**\n${resumen || '_(sin datos)_'}\n\n` +
            `**Fecha:** ${cuando}`
        })
      });
      resultados.clickup = r.ok;
      if (!r.ok) console.error('ClickUp error', r.status, (await r.text()).slice(0, 300));
    } else {
      console.warn('ClickUp no configurado.');
    }
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
          reply_to: correo,
          subject: `Documento por preparar: ${doc.nombre} — ${nombre}`,
          html:
            `<h2>Documento preparado con el asistente de /contratos</h2>` +
            `<p><strong>Contacto:</strong><br>` +
            `Nombre: ${escapeHtml(nombre)}<br>Teléfono: ${escapeHtml(telefono)}<br>Correo: ${escapeHtml(correo)}</p>` +
            `<p><strong>Documento:</strong> ${escapeHtml(doc.nombre)} (${escapeHtml(documentoId)})` +
            (faltan.length ? `<br><em>Pendientes: ${escapeHtml(faltan.join('; '))}</em>` : '') + `</p>` +
            `<p><strong>Datos capturados:</strong></p><div>${mdToHtml(resumen)}</div>` +
            `<p style="color:#888">Fecha: ${cuando}</p>`
        })
      });
      resultados.correo = r.ok;
      if (!r.ok) console.error('Resend error', r.status, (await r.text()).slice(0, 300));
    } else {
      console.warn('Resend no configurado.');
    }
  } catch (err) { console.error('Resend fetch error', err); }

  const ambosConfigurados = !!(process.env.CLICKUP_API_TOKEN && process.env.RESEND_API_KEY);
  if (ambosConfigurados && !resultados.clickup && !resultados.correo) {
    return json(502, { ok: false, error: 'No se pudo enviar el documento. Intenta de nuevo.' });
  }
  return json(200, { ok: true, registrado: resultados });
};

function limpia(v, max) { return (typeof v === 'string' ? v : '').trim().slice(0, max); }
function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
// Convierte el resumen markdown (líneas "- **etiqueta** valor") a HTML simple.
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
