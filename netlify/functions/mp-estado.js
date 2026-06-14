// mp-estado: el frontend lo consulta al volver del pago. Devuelve si la orden
// ya está pagada y, en ese caso, el token de un solo uso para habilitar la
// generación. Para NO depender del webhook (que en local no llega a localhost),
// si la orden sigue pendiente verifica el pago DIRECTO contra Mercado Pago.
//
// Body/Query: { orden_id, payment_id? }.
import { paymentApi } from '../lib/mp.js';
import { getCatalogo } from '../lib/catalogo.js';
import { getOrden, marcarPagada, conectarBlobs } from '../lib/ordenes.js';

export const handler = async (event) => {
  conectarBlobs(event);
  const q = event.queryStringParameters || {};
  let body = {};
  if (event.httpMethod === 'POST') { try { body = JSON.parse(event.body || '{}'); } catch {} }
  const ordenId = body.orden_id || q.orden_id || q.orden;
  const paymentId = body.payment_id || q.payment_id || null;

  const orden = await getOrden(ordenId);
  if (!orden) return json(404, { error: 'orden no encontrada' });

  // Ya resuelta (webhook o consulta previa).
  if (orden.status === 'paid') return json(200, { status: 'paid', pagado: true, token: orden.token });
  // Devolvemos el token aun consumida: ya no puede generar otro documento, pero
  // permite RE-DESCARGAR el .docx guardado en la orden.
  if (orden.status === 'consumed') return json(200, { status: 'consumed', pagado: true, token: orden.token });

  // Pendiente → verificar directo contra MP.
  try {
    let pago = null;
    if (paymentId) pago = await paymentApi().get({ id: paymentId }).catch(() => null);
    if (!pago) {
      const res = await paymentApi().search({ options: { external_reference: ordenId } }).catch(() => null);
      const results = (res && res.results) || [];
      pago = results.find((p) => p.status === 'approved') || results[0] || null;
    }
    if (pago && pago.status === 'approved') {
      const cat = getCatalogo(orden.contrato_id);
      if (cat && Number(pago.transaction_amount) === Number(cat.precio)) {
        const upd = await marcarPagada(ordenId, pago.id);
        return json(200, { status: 'paid', pagado: true, token: upd.token });
      }
      return json(200, { status: 'pending', pagado: false, error: 'monto no coincide' });
    }
  } catch (err) {
    console.error('mp-estado error', err?.message || err);
  }
  return json(200, { status: orden.status, pagado: false, token: null });
};

function json(statusCode, obj) {
  return { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) };
}
