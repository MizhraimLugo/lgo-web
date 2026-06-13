// Arma el contexto para docxtemplater a partir de (documento_id, valores):
//   · cada campo con su valor (los de tipo "moneda" → formateados $1,234,567.89)
//   · cada flag de sección evaluado desde contratos-flags.json
//   · cada marcador *_letra calculado desde contratos-letra.json (monto en letra)
// El contexto cubre TODOS los marcadores de la plantilla, así ninguno queda sin valor.
import { getDocumento } from './contratos-fields.js';
import { montoEnLetras, formatearMoneda } from './numero-a-letras.js';
import flagsMap from './contratos-flags.json' with { type: 'json' };
import letraMap from './contratos-letra.json' with { type: 'json' };

/** Misma normalización (sin acentos/mayúsculas) que el resto del pipeline. */
function norm(s) {
  return String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
}

/**
 * Devuelve el objeto de datos para docxtemplater, o null si el documento no existe.
 * @param {string} documentoId
 * @param {Record<string,string>} valores  datos capturados (selects ya canónicos)
 */
export function construirContexto(documentoId, valores) {
  const doc = getDocumento(documentoId);
  if (!doc) return null;
  const v = valores || {};
  const ctx = {};

  // 1) Campos capturados (moneda formateada; el resto tal cual).
  for (const campo of doc.campos) {
    let val = v[campo.clave];
    val = val == null ? '' : String(val);
    if (campo.tipo === 'moneda' && val.trim()) val = formatearMoneda(val);
    ctx[campo.clave] = val;
  }

  // 2) Flags de sección: flag => (campo == opción), comparación normalizada.
  const flagsDoc = flagsMap[documentoId] || {};
  for (const [flag, cond] of Object.entries(flagsDoc)) {
    ctx[flag] = norm(v[cond.clave]) === norm(cond.igual);
  }

  // 3) Marcadores *_letra: monto en letra desde su campo base.
  const letraDoc = letraMap[documentoId] || {};
  for (const [marcador, spec] of Object.entries(letraDoc)) {
    ctx[marcador] = montoEnLetras(v[spec.base], { pesos: spec.pesos });
  }

  return ctx;
}
