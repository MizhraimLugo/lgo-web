// mp-webhook: recibe las notificaciones de pago de Mercado Pago (Checkout Pro).
// 1) Valida la firma x-signature (HMAC-SHA256 con MP_WEBHOOK_SECRET).
// 2) Consulta el pago real contra la API de MP (no confía en la notificación).
// 3) Verifica server-side: status === 'approved' y transaction_amount === precio
//    del catálogo para el contrato (recuperado por external_reference = orden_id).
// 4) Marca la orden como pagada y emite el token de un solo uso (idempotente).
// Responde 200 SIEMPRE que el evento se procese (o se ignore) para que MP no
// reintente de más; solo 401 si la firma no valida.
import crypto from 'node:crypto';
import { paymentApi } from '../lib/mp.js';
import { getCatalogo } from '../lib/catalogo.js';
import { getOrden, marcarPagada } from '../lib/ordenes.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Método no permitido' };

  const q = event.queryStringParameters || {};
  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch { /* MP a veces no manda body */ }

  const tipo = q.type || q.topic || body.type;
  const dataId = q['data.id'] || (body.data && body.data.id) || q.id;

  // Validación de firma (obligatoria si hay secret configurado).
  const firma = validarFirma(event, dataId);
  if (firma === 'invalid') { console.warn('mp-webhook: firma inválida'); return { statusCode: 401, body: 'firma inválida' }; }

  if (tipo !== 'payment' || !dataId) return ok('evento ignorado');

  try {
    const pago = await paymentApi().get({ id: dataId });
    const status = pago.status;
    const monto = Number(pago.transaction_amount);
    const ordenId = pago.external_reference;

    const orden = await getOrden(ordenId);
    if (!orden) return ok('orden no encontrada');

    const cat = getCatalogo(orden.contrato_id);
    const precioCatalogo = cat ? Number(cat.precio) : NaN;

    if (status === 'approved' && monto === precioCatalogo) {
      await marcarPagada(ordenId, dataId); // idempotente
      return ok('pago aprobado y registrado');
    }
    console.warn('mp-webhook: pago no cuadra', { status, monto, precioCatalogo, ordenId });
    return ok('pago no aprobado o monto distinto');
  } catch (err) {
    console.error('mp-webhook error', err?.message || err);
    // 200 para que MP no reintente en bucle por un error nuestro; mp-estado cubre.
    return ok('error procesando');
  }
};

// Devuelve 'valid' | 'invalid' | 'skip'. 'skip' si no hay secret (no podemos validar).
function validarFirma(event, dataId) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) { console.warn('mp-webhook: sin MP_WEBHOOK_SECRET; no se valida firma'); return 'skip'; }
  const h = event.headers || {};
  const xSignature = h['x-signature'] || h['X-Signature'] || '';
  const xRequestId = h['x-request-id'] || h['X-Request-Id'] || '';
  const parts = {};
  for (const seg of xSignature.split(',')) {
    const i = seg.indexOf('=');
    if (i > 0) parts[seg.slice(0, i).trim()] = seg.slice(i + 1).trim();
  }
  const ts = parts.ts, v1 = parts.v1;
  if (!ts || !v1) return 'invalid';
  const id = String(dataId == null ? '' : dataId).toLowerCase();
  const manifest = `id:${id};request-id:${xRequestId};ts:${ts};`;
  const calc = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
  if (calc.length !== v1.length) return 'invalid';
  try {
    return crypto.timingSafeEqual(Buffer.from(calc), Buffer.from(v1)) ? 'valid' : 'invalid';
  } catch { return 'invalid'; }
}

function ok(msg) { return { statusCode: 200, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ok: true, msg }) }; }
