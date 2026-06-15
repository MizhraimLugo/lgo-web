// Lógica compartida del llenado conversacional de /contratos.
// La consumen las funciones chat.js (form-filling) y registrar-documento.js.
// Sin dependencias: solo el índice de campos generado.
import { contratosCampos } from '../../src/data/contratos-campos.ts';

/** Devuelve { nombre, campos } del documento, o null si el id no existe. */
export function getDocumento(id) {
  return (id && contratosCampos[id]) || null;
}

/** Normaliza para comparar opciones sin acentos/mayúsculas. */
function norm(s) {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toLowerCase();
}

/** Resuelve un valor libre a la opción canónica de un select; null si no coincide. */
export function resolverOpcion(campo, valor) {
  if (!Array.isArray(campo.opciones)) return valor;
  const v = norm(valor);
  // 1) coincidencia exacta normalizada
  let hit = campo.opciones.find((o) => norm(o) === v);
  if (hit) return hit;
  // 2) coincidencia por inclusión (la opción contiene la respuesta o viceversa)
  hit = campo.opciones.find((o) => norm(o).includes(v) || v.includes(norm(o)));
  return hit || null;
}

/** ¿El campo está activo dado el estado actual (según depende_de)? */
export function campoActivo(campo, valores) {
  const dep = campo.depende_de;
  if (!dep) return true;
  return norm(valores[dep.clave_padre]) === norm(dep.valor_que_activa);
}

/** Un valor cuenta como "lleno" si es string no vacío. */
function lleno(valores, clave) {
  const v = valores[clave];
  return typeof v === 'string' ? v.trim().length > 0 : v != null && v !== '';
}

/**
 * Valida y normaliza valores nuevos contra la definición del documento.
 * No rechaza por inactividad (un padre puede llegar en el mismo lote).
 * Devuelve { valores (mezclados), aceptados:{clave:valor}, rechazados:{clave:razon} }.
 */
export function aplicarValores(id, valoresActuales, nuevos) {
  const doc = getDocumento(id);
  const valores = { ...(valoresActuales || {}) };
  const aceptados = {};
  const rechazados = {};
  if (!doc) return { valores, aceptados, rechazados: { _doc: 'documento no seleccionado' } };

  const porClave = new Map(doc.campos.map((c) => [c.clave, c]));
  for (const [clave, valRaw] of Object.entries(nuevos || {})) {
    const campo = porClave.get(clave);
    if (!campo) { rechazados[clave] = 'clave desconocida'; continue; }
    const val = typeof valRaw === 'string' ? valRaw.trim() : String(valRaw ?? '').trim();
    if (!val) { rechazados[clave] = 'vacío'; continue; }

    if (campo.tipo === 'select') {
      const canon = resolverOpcion(campo, val);
      if (!canon) { rechazados[clave] = `debe ser una de: ${campo.opciones.join(', ')}`; continue; }
      valores[clave] = canon; aceptados[clave] = canon; continue;
    }
    if (campo.tipo === 'numero' || campo.tipo === 'moneda') {
      if (!/\d/.test(val)) { rechazados[clave] = 'debe ser un número'; continue; }
      valores[clave] = val; aceptados[clave] = val; continue;
    }
    // texto, parrafo, fecha → se aceptan tal cual (la IA ya los formatea)
    valores[clave] = val; aceptados[clave] = val;
  }
  return { valores, aceptados, rechazados };
}

/** Vista de campos para el panel del frontend y para guiar a la IA. */
export function vistaCampos(id, valores) {
  const doc = getDocumento(id);
  if (!doc) return [];
  return doc.campos.map((c) => ({
    clave: c.clave,
    etiqueta: c.etiqueta,
    tipo: c.tipo,
    obligatorio: !!c.obligatorio,
    opciones: c.opciones,
    activo: campoActivo(c, valores || {}),
    lleno: lleno(valores || {}, c.clave),
    valor: (valores || {})[c.clave] ?? ''
  }));
}

/** Campos obligatorios, activos y aún sin valor. */
export function faltantesObligatorios(id, valores) {
  return vistaCampos(id, valores).filter((c) => c.obligatorio && c.activo && !c.lleno);
}

/** ¿Todos los obligatorios activos están llenos? (requiere documento elegido) */
export function estaCompleto(id, valores) {
  const doc = getDocumento(id);
  if (!doc) return false;
  return faltantesObligatorios(id, valores).length === 0;
}

/** Resumen markdown de los datos capturados (para correo/ClickUp). */
export function resumenMarkdown(id, valores) {
  const doc = getDocumento(id);
  if (!doc) return '';
  const lineas = [];
  for (const c of doc.campos) {
    if (!campoActivo(c, valores || {})) continue;
    if (!lleno(valores || {}, c.clave)) continue;
    const etiqueta = c.etiqueta.replace(/[:¿?]+$/g, '').trim();
    lineas.push(`- **${etiqueta}** ${valores[c.clave]}`);
  }
  return lineas.join('\n');
}
