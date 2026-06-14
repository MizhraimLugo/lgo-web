// Estado de las órdenes de pago de /contratos.
// Almacén: Netlify Blobs en producción. En `netlify dev` sin sitio enlazado,
// Blobs no está disponible → cae a un almacén de ARCHIVOS en el temp del SO
// (solo para desarrollo local). La lógica de negocio es idéntica en ambos.
//
// Ciclo de vida de una orden: pending → paid (token de un solo uso) → consumed.
import { getStore, connectLambda } from '@netlify/blobs';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const STORE = 'contratos-ordenes';
const FILE_DIR = join(tmpdir(), 'lgo-contratos-ordenes');
let _mode = null; // 'blobs' | 'file' — se decide en la primera operación

/**
 * En funciones Lambda clásicas, @netlify/blobs NO se auto-configura: el contexto
 * (siteID/token) viaja en el `event` y hay que conectarlo con connectLambda(event)
 * ANTES de usar el store. Cada handler que toque órdenes debe llamar a esto al
 * inicio. En local (netlify dev) el event no trae contexto → no pasa nada y se usa
 * el fallback de archivos.
 */
export function conectarBlobs(event) {
  try { if (event) connectLambda(event); } catch { /* sin contexto Lambda (local) → fallback de archivos */ }
}

function esErrorConfigBlobs(e) {
  return /configured to use Netlify Blobs/i.test(String((e && e.message) || e));
}

async function fileGet(id) {
  try { return JSON.parse(await readFile(join(FILE_DIR, `${id}.json`), 'utf8')); }
  catch { return null; }
}
async function fileSet(id, val) {
  await mkdir(FILE_DIR, { recursive: true });
  await writeFile(join(FILE_DIR, `${id}.json`), JSON.stringify(val), 'utf8');
}

async function kvGet(id) {
  if (_mode === 'file') return fileGet(id);
  try {
    const v = await getStore(STORE).get(id, { type: 'json' });
    _mode = 'blobs';
    return v;
  } catch (e) {
    if (esErrorConfigBlobs(e)) { caerAFile(); return fileGet(id); }
    throw e;
  }
}
async function kvSet(id, val) {
  if (_mode === 'file') return fileSet(id, val);
  try {
    await getStore(STORE).setJSON(id, val);
    _mode = 'blobs';
  } catch (e) {
    if (esErrorConfigBlobs(e)) { caerAFile(); return fileSet(id, val); }
    throw e;
  }
}
function caerAFile() {
  if (_mode !== 'file') console.warn('Netlify Blobs no disponible; usando almacén local de archivos (solo dev).');
  _mode = 'file';
}

/** Crea una orden pendiente y la persiste. Devuelve la orden. */
export async function crearOrden({ contrato_id, contrato_nombre, valores, lead, monto, moneda }) {
  const id = randomUUID();
  const orden = {
    id, contrato_id, contrato_nombre,
    valores: valores || {},
    lead: lead || null,
    monto, moneda: moneda || 'MXN',
    status: 'pending', payment_id: null, token: null,
    creado: new Date().toISOString(), pagado: null, consumido: null
  };
  await kvSet(id, orden);
  return orden;
}

/** Lee una orden por id, o null. */
export async function getOrden(id) {
  if (!id || typeof id !== 'string') return null;
  return kvGet(id);
}

/**
 * Marca la orden como pagada y emite un token de un solo uso. IDEMPOTENTE:
 * si ya estaba paid/consumed, devuelve la orden sin re-emitir token.
 */
export async function marcarPagada(id, payment_id) {
  const orden = await getOrden(id);
  if (!orden) return null;
  if (orden.status === 'paid' || orden.status === 'consumed') return orden;
  orden.status = 'paid';
  orden.payment_id = String(payment_id);
  orden.token = randomUUID();
  orden.pagado = new Date().toISOString();
  await kvSet(id, orden);
  return orden;
}

/**
 * Verifica que la orden esté pagada y el token sea válido, SIN consumirla.
 * Devuelve { ok, orden } o { ok:false, error }.
 */
export async function verificarToken(id, token) {
  const orden = await getOrden(id);
  if (!orden) return { ok: false, error: 'orden no encontrada' };
  if (orden.status === 'consumed') return { ok: false, error: 'esta orden ya se utilizó' };
  if (orden.status !== 'paid') return { ok: false, error: 'el pago no está confirmado' };
  if (!token || orden.token !== token) return { ok: false, error: 'token inválido' };
  return { ok: true, orden };
}

/**
 * Marca la orden como consumida (un pago = un documento). Si se pasa `documento`
 * ({ base64, filename, mime }), lo guarda en la orden para permitir RE-DESCARGA
 * posterior con el mismo token (sin re-generar ni re-cobrar). El token se conserva.
 */
export async function marcarConsumida(id, documento = null) {
  const orden = await getOrden(id);
  if (!orden) return null;
  orden.status = 'consumed';
  orden.consumido = new Date().toISOString();
  if (documento) orden.documento = { ...documento, generado: new Date().toISOString() };
  await kvSet(id, orden);
  return orden;
}

/**
 * Para la re-descarga: si la orden ya está consumida, el token coincide y hay un
 * documento guardado, lo devuelve. No regenera nada. { ok, documento } | { ok:false, error }.
 */
export async function documentoConToken(id, token) {
  const orden = await getOrden(id);
  if (!orden) return { ok: false, error: 'orden no encontrada' };
  if (!token || orden.token !== token) return { ok: false, error: 'token inválido' };
  if (orden.status !== 'consumed' || !orden.documento) return { ok: false, error: 'sin documento disponible' };
  return { ok: true, documento: orden.documento };
}

/**
 * Verifica el token y consume la orden en un paso (para la generación del
 * .docx en el Paso 5). Devuelve { ok, orden } o { ok:false, error }.
 */
export async function consumirConToken(id, token) {
  const v = await verificarToken(id, token);
  if (!v.ok) return v;
  const orden = await marcarConsumida(id);
  return { ok: true, orden };
}
