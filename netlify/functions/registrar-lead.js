// Función registrar-lead: guarda el lead (nombre, teléfono, correo) del asistente
// de /contratos en DOS destinos para Grupo LGO:
//   1) ClickUp → crea una tarea en la lista del espacio "LGO Abogados".
//   2) Correo → aviso a contacto@lgo.mx vía Resend.
//
// Es lead de seguimiento, NO datos del contrato. Los secretos viven en variables
// de entorno del servidor. Sin dependencias: fetch nativo (Node 18+).
//
// Variables: CLICKUP_API_TOKEN, CLICKUP_LIST_ID, RESEND_API_KEY,
//            LEAD_EMAIL_TO (contacto@lgo.mx), LEAD_EMAIL_FROM.

const EMAIL_FROM = process.env.LEAD_EMAIL_FROM || 'Asistente de Contratos LGO <no-reply@lgo.mx>';
const EMAIL_TO = process.env.LEAD_EMAIL_TO || 'contacto@lgo.mx';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }

  const nombre = limpia(body.nombre, 120);
  const telefono = limpia(body.telefono, 40);
  const correo = limpia(body.correo, 160);

  const telDigits = telefono.replace(/\D/g, '');
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo);
  if (!nombre || telDigits.length < 10 || !emailOk) {
    return json(400, { error: 'Datos incompletos o inválidos (nombre, teléfono de 10 dígitos y correo válido).' });
  }

  const cuando = new Date().toISOString();
  const resultados = { clickup: false, correo: false };

  // 1) ClickUp
  try {
    if (process.env.CLICKUP_API_TOKEN && process.env.CLICKUP_LIST_ID) {
      const r = await fetch(`https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: process.env.CLICKUP_API_TOKEN },
        body: JSON.stringify({
          name: `Lead contratos: ${nombre}`,
          markdown_description:
            `**Lead del asistente de /contratos**\n\n` +
            `- **Nombre:** ${nombre}\n- **Teléfono:** ${telefono}\n- **Correo:** ${correo}\n- **Fecha:** ${cuando}`
        })
      });
      resultados.clickup = r.ok;
      if (!r.ok) console.error('ClickUp error', r.status, (await r.text()).slice(0, 300));
    } else {
      console.warn('ClickUp no configurado (CLICKUP_API_TOKEN / CLICKUP_LIST_ID).');
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
          subject: `Nuevo lead de contratos: ${nombre}`,
          html:
            `<h2>Nuevo lead del asistente de /contratos</h2>` +
            `<p><strong>Nombre:</strong> ${escapeHtml(nombre)}<br>` +
            `<strong>Teléfono:</strong> ${escapeHtml(telefono)}<br>` +
            `<strong>Correo:</strong> ${escapeHtml(correo)}<br>` +
            `<strong>Fecha:</strong> ${cuando}</p>`
        })
      });
      resultados.correo = r.ok;
      if (!r.ok) console.error('Resend error', r.status, (await r.text()).slice(0, 300));
    } else {
      console.warn('Resend no configurado (RESEND_API_KEY).');
    }
  } catch (err) { console.error('Resend fetch error', err); }

  // El registro no debe bloquear al usuario: respondemos OK aunque un canal falle
  // (queda en logs para revisión). Solo error duro si AMBOS fallan estando configurados.
  const ambosConfigurados = !!(process.env.CLICKUP_API_TOKEN && process.env.RESEND_API_KEY);
  if (ambosConfigurados && !resultados.clickup && !resultados.correo) {
    return json(502, { ok: false, error: 'No se pudo registrar el lead. Intenta de nuevo.' });
  }
  return json(200, { ok: true, registrado: resultados });
};

function limpia(v, max) { return (typeof v === 'string' ? v : '').trim().slice(0, max); }
function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function json(statusCode, obj) {
  return { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) };
}
