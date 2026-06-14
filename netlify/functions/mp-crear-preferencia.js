// mp-crear-preferencia: crea una preferencia de Checkout Pro para cobrar un
// documento. El PRECIO se lee del catálogo SERVER-SIDE (nunca del frontend).
// Guarda la orden (con los datos ya capturados) en Blobs y devuelve la URL de
// pago (init_point) + el orden_id para consultar el estado al volver.
//
// Body: { contrato_id, valores, lead }.
import { preferenceApi } from '../lib/mp.js';
import { getCatalogo } from '../lib/catalogo.js';
import { crearOrden, conectarBlobs } from '../lib/ordenes.js';

export const handler = async (event) => {
  conectarBlobs(event);
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido' });
  if (!process.env.MP_ACCESS_TOKEN) return json(500, { error: 'Falta configurar MP_ACCESS_TOKEN en el servidor.' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }

  const contratoId = typeof body.contrato_id === 'string' ? body.contrato_id : '';
  const cat = getCatalogo(contratoId);
  if (!cat) return json(400, { error: 'Documento no reconocido.' });

  const valores = body.valores && typeof body.valores === 'object' && !Array.isArray(body.valores) ? body.valores : {};
  const lead = body.lead && typeof body.lead === 'object' ? {
    nombre: String(body.lead.nombre || '').slice(0, 120),
    telefono: String(body.lead.telefono || '').slice(0, 40),
    correo: String(body.lead.correo || '').slice(0, 160)
  } : null;

  const monto = cat.precio; // del catálogo, server-side

  try {
    const orden = await crearOrden({
      contrato_id: contratoId, contrato_nombre: cat.nombre,
      valores, lead, monto, moneda: cat.moneda || 'MXN'
    });

    const base = baseUrl(event);
    const esHttps = base.startsWith('https://');
    const prefBody = {
      items: [{
        id: contratoId,
        title: cat.nombre,
        quantity: 1,
        unit_price: Number(monto),
        currency_id: cat.moneda || 'MXN'
      }],
      external_reference: orden.id,
      back_urls: {
        success: `${base}/contratos/?orden=${orden.id}`,
        failure: `${base}/contratos/?orden=${orden.id}`,
        pending: `${base}/contratos/?orden=${orden.id}`
      },
      notification_url: `${base}/.netlify/functions/mp-webhook`,
      metadata: { orden_id: orden.id, contrato_id: contratoId }
    };
    // auto_return solo con https (MP lo rechaza con back_urls http en local).
    if (esHttps) prefBody.auto_return = 'approved';

    const pref = await preferenceApi().create({ body: prefBody });

    // Con usuarios de prueba (sandbox) y en producción se usa init_point.
    const url = pref.init_point || pref.sandbox_init_point;
    if (!url) {
      console.error('Preferencia sin init_point', JSON.stringify(pref).slice(0, 300));
      return json(502, { error: 'No se pudo iniciar el pago. Intenta de nuevo.' });
    }
    return json(200, { orden_id: orden.id, preference_id: pref.id, init_point: url });
  } catch (err) {
    console.error('mp-crear-preferencia error', err?.message || err);
    return json(502, { error: 'No se pudo iniciar el pago. Intenta de nuevo o escríbenos por WhatsApp.' });
  }
};

function baseUrl(event) {
  // El HOST del request es el origen real desde donde se llamó (deploy preview o
  // producción), así el back_url SIEMPRE vuelve al mismo sitio. Las env vars no sirven
  // aquí: URL es siempre producción y DEPLOY_PRIME_URL no llega al runtime de functions.
  const h = event.headers || {};
  const host = h['x-forwarded-host'] || h.host || h.Host;
  if (host) {
    const proto = host.includes('localhost') || host.startsWith('127.') ? 'http' : 'https';
    return `${proto}://${host}`;
  }
  return (process.env.DEPLOY_PRIME_URL || process.env.URL || '').replace(/\/$/, '');
}

function json(statusCode, obj) {
  return { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) };
}
