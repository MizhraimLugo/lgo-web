// ════════════════════════════════════════════════════════════════
//  CLUSTERS TEMÁTICOS + MALLA DE ENLACES INTERNOS  (/contratos)
// ════════════════════════════════════════════════════════════════
//
// Dos piezas de la malla de enlaces internos (Fase D):
//  1) `documentosRelacionados(id)` → otras fichas del MISMO cluster temático
//     y misma categoría, para el bloque "Documentos relacionados".
//  2) `linkificarMenciones(html, id)` → convierte en enlaces reales las
//     menciones de OTRAS fichas dentro del texto (sobre todo en la sección
//     "¿Con qué documento lo puedo confundir?"). NO altera el texto: solo
//     envuelve la palabra existente en un <a>. Diccionario curado para
//     evitar falsos positivos; jamás enlaza términos que no sean fichas
//     (Poder Notarial, factura, letra de cambio, etc.).

import { contratosCatalogo } from './contratos-catalogo';
import type { ContratoCategoria } from './contratos-catalogo';

export type ClusterId =
  | 'arrendamiento'
  | 'compraventa'
  | 'laboral'
  | 'mercantil'
  | 'servicios'
  | 'generales';

export const CLUSTERS: Record<ClusterId, { nombre: string; ids: string[] }> = {
  arrendamiento: {
    nombre: 'Arrendamiento y renta',
    ids: [
      'arrendamiento-casa', 'arrendamiento-departamento', 'arrendamiento-local-comercial',
      'arrendamiento-bodega', 'arrendamiento-nave-industrial', 'arrendamiento-vacacional',
      'arrendamiento-casa-opcion-compra', 'autorizacion-subarrendar', 'autorizacion-subarrendar-negocios',
      'notificacion-incremento-renta', 'notificacion-prorroga-arrendamiento', 'recibo-pago-renta',
      'notificacion-deterioros-arrendador', 'notificacion-deterioros-arrendador-negocios'
    ]
  },
  compraventa: {
    nombre: 'Compraventa y propiedad',
    ids: [
      'compraventa-vehiculo', 'compraventa-contado', 'compraventa-plazos', 'compraventa-acciones',
      'compraventa-bien-inmueble', 'promesa-compraventa-inmueble', 'promesa-compraventa-inmueble-negocios',
      'permuta', 'carta-intencion-compra-inmueble', 'donacion-bien-inmueble', 'donacion-bien-inmueble-2',
      'comodato-bien-inmueble', 'comodato-bien-mueble', 'comodato-bien-mueble-negocios',
      'notificacion-deterioros-vendedor', 'notificacion-deterioros-vendedor-negocios'
    ]
  },
  laboral: {
    nombre: 'Laboral',
    ids: [
      'contrato-individual-trabajo', 'contrato-individual-trabajo-negocios', 'carta-renuncia-voluntaria',
      'carta-renuncia-voluntaria-negocios', 'finiquito-laboral', 'finiquito-laboral-negocios',
      'abandono-laboral', 'convenio-terminacion-finiquito', 'convenio-terminacion-finiquito-negocios',
      'carta-confidencialidad-empleados', 'carta-confidencialidad-empleados-negocios', 'contrato-empleada-domestica'
    ]
  },
  mercantil: {
    nombre: 'Mercantil y financiero',
    ids: [
      'pagare', 'pagare-negocios', 'contrato-mutuo', 'contrato-mutuo-negocios', 'requerimiento-pago',
      'requerimiento-pago-negocios', 'recibo-pago', 'recibo-pago-negocios', 'comision-mercantil',
      'consignacion-mercantil', 'distribucion', 'suministro', 'licencia-uso-marca', 'no-competencia'
    ]
  },
  servicios: {
    nombre: 'Servicios y representación',
    ids: [
      'prestacion-servicios', 'prestacion-servicios-negocios', 'contrato-chofer-uber',
      'contrato-chofer-uber-negocios', 'contrato-confidencialidad', 'contrato-confidencialidad-negocios',
      'carta-poder', 'carta-poder-negocios', 'carta-instruccion-fe-hechos', 'carta-instruccion-fe-hechos-negocios'
    ]
  },
  generales: {
    nombre: 'Otros documentos',
    ids: [
      'convenio-modificatorio', 'convenio-modificatorio-negocios', 'rescision-contrato',
      'rescision-contrato-negocios', 'aviso-privacidad', 'convenio-divorcio', 'carta-pension-alimenticia'
    ]
  }
};

const idACluster = new Map<string, ClusterId>();
for (const [cl, { ids }] of Object.entries(CLUSTERS)) {
  for (const id of ids) idACluster.set(id, cl as ClusterId);
}

export const clusterDe = (id: string): ClusterId | undefined => idACluster.get(id);

export interface Relacionado {
  id: string;
  nombre: string;
}

/**
 * Otras fichas del mismo cluster temático y MISMA categoría (evita mostrar el
 * par General/Negocios duplicado), excluyendo la propia ficha. Máximo `max`.
 */
export function documentosRelacionados(id: string, max = 6): Relacionado[] {
  const cl = clusterDe(id);
  if (!cl) return [];
  const actual = contratosCatalogo.find((c) => c.id === id);
  if (!actual) return [];
  return CLUSTERS[cl].ids
    .filter((rid) => rid !== id)
    .map((rid) => contratosCatalogo.find((c) => c.id === rid))
    .filter((c): c is NonNullable<typeof c> => !!c && c.categoria === actual.categoria)
    .slice(0, max)
    .map((c) => ({ id: c.id, nombre: c.nombre }));
}

// ── Enlaces contextuales ──────────────────────────────────────────
// Diccionario curado: SOLO menciones que corresponden a una ficha real del
// catálogo. Patrones específicos para no enlazar términos genéricos ni
// documentos que no tenemos (Poder Notarial, factura, etc.). Se enlaza a la
// versión canónica (General cuando existe) — coherente con la consolidación.
// Boundaries que reconocen letras acentuadas (el \b nativo de JS falla tras
// caracteres como é/ó/ñ, p.ej. "pagaré" o "donación").
const NB = '(?<![A-Za-zÁÉÍÓÚáéíóúÑñ])';
const NA = '(?![A-Za-zÁÉÍÓÚáéíóúÑñ])';
const mk = (cuerpo: string) => new RegExp(NB + cuerpo + NA, 'i');

const MENCIONES: { re: RegExp; id: string }[] = [
  { re: mk('pagaré'), id: 'pagare' },
  { re: mk('contrato de mutuo'), id: 'contrato-mutuo' },
  { re: mk('contrato individual de trabajo'), id: 'contrato-individual-trabajo' },
  { re: mk('contrato laboral'), id: 'contrato-individual-trabajo' },
  { re: mk('(?:contrato de )?prestación de servicios(?: profesionales)?'), id: 'prestacion-servicios' },
  { re: mk('carta de confidencialidad para empleados'), id: 'carta-confidencialidad-empleados' },
  { re: mk('compraventa a plazos'), id: 'compraventa-plazos' },
  { re: mk('notificación de prórroga'), id: 'notificacion-prorroga-arrendamiento' },
  { re: mk('opción a compra'), id: 'arrendamiento-casa-opcion-compra' },
  { re: mk('donación'), id: 'donacion-bien-inmueble' }
];

/**
 * Convierte en enlaces las menciones de otras fichas dentro del HTML de la
 * explicación. Trabaja por segmentos: no toca el interior de etiquetas, ni de
 * un <a> ya existente, ni de los encabezados; enlaza solo la primera ocurrencia
 * de cada término y nunca anida enlaces. NO modifica el texto visible.
 */
export function linkificarMenciones(html: string, idActual: string): string {
  const partes = html.split(/(<[^>]+>)/);
  const baseActual = idActual.replace(/-negocios$/, ''); // no enlazar al par G/N del mismo concepto
  const usados = new Set<string>([idActual]); // cada destino se enlaza una sola vez
  let dentroA = false;
  let dentroH = false;
  for (let i = 0; i < partes.length; i++) {
    const p = partes[i];
    if (p.startsWith('<')) {
      if (/^<a\b/i.test(p)) dentroA = true;
      else if (/^<\/a>/i.test(p)) dentroA = false;
      else if (/^<h[1-6]\b/i.test(p)) dentroH = true;
      else if (/^<\/h[1-6]>/i.test(p)) dentroH = false;
      continue;
    }
    if (dentroA || dentroH) continue;
    // Reúne todas las menciones de este segmento de texto, descarta solapamientos
    // y reconstruye insertando los enlaces (varios por párrafo, sin anidar).
    const hits: { start: number; end: number; text: string; id: string }[] = [];
    for (const { re, id } of MENCIONES) {
      if (usados.has(id) || id.replace(/-negocios$/, '') === baseActual) continue;
      const m = re.exec(p);
      if (m) hits.push({ start: m.index, end: m.index + m[0].length, text: m[0], id });
    }
    if (!hits.length) continue;
    hits.sort((a, b) => a.start - b.start);
    let res = '';
    let cur = 0;
    for (const h of hits) {
      if (h.start < cur || usados.has(h.id)) continue; // solapado o ya usado
      res += p.slice(cur, h.start) + `<a href="/contratos/${h.id}/" class="exp-link">${h.text}</a>`;
      cur = h.end;
      usados.add(h.id);
    }
    res += p.slice(cur);
    partes[i] = res;
  }
  return partes.join('');
}
