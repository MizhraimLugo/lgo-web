// ════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN — Amparo Modalidad 40 (/pensiones/amparo-modalidad-40)
// ════════════════════════════════════════════════════════════════
//
// FUENTE ÚNICA de fechas, precios y datos de contacto de la sección.
// Ningún componente ni página lleva una fecha o un precio escrito a mano:
// todo sale de aquí o de los helpers de este archivo. Cambiar una fecha
// en `M40` la cambia en el contador, las FAQ, las tarjetas de precio,
// la función de leads y los avisos del pie.
//
// Módulo PURO (sin DOM, sin fetch): se importa desde el frontmatter de las
// páginas .astro, desde el <script> cliente de las islas y desde las pruebas
// en Node. Node 24 corre TypeScript nativo, así que las pruebas importan
// este mismo archivo sin paso de compilación.
//
// Las utilidades de aritmética de fechas UTC (`parseISO`, `diffDays`) se
// reutilizan del motor de /marcas en lugar de duplicarlas: son genéricas y
// ya están cubiertas por src/data/marcas.test.ts.

// Import relativo con extensión explícita (no el alias `@data/`): así este
// módulo se resuelve igual bajo Vite/Astro y bajo `node --test`, que corre el
// TypeScript nativo sin conocer los paths del tsconfig.
import { parseISO, diffDays } from './marcas.ts';
import { AVISO_PRIVACIDAD_PATH } from './aviso-privacidad.ts';

export const M40 = {
  acuerdo: {
    /** Publicación en el DOF del acuerdo del Consejo Técnico del IMSS. [VERIFICAR] contra dof.gob.mx */
    fechaDOF: '2026-10-21',
    /** Inicio de vigencia del tope para nuevas inscripciones. [VERIFICAR] */
    vigenciaDesde: '2026-10-22'
  },
  plazos: {
    /** Fecha de corte interno de recepción de expedientes. Es la que se muestra al público. */
    corteInterno: '2026-11-26',
    /** Último día de vigencia del precio de lanzamiento. */
    lanzamientoHasta: '2026-11-15'
  },
  precios: {
    /** Tasa de IVA aplicable. Los montos de abajo son ANTES de IVA, en MXN. */
    iva: 0.16,
    diagnostico: 500,
    amparo: 5500,
    amparoLanzamiento: 4500,
    /** Descuento por persona cuando se amparan dos o más del mismo hogar. */
    descuentoFamiliar: 0.1
  },
  /**
   * Valor diario de la UMA. De aquí salen los DOS topes que la landing
   * enfrenta (el de antes y el de ahora): actualizar este número en enero
   * los recalcula a los dos sin tocar la página.
   *
   * [VERIFICAR] valor diario de la UMA 2026 (DOF 09/01/2026).
   */
  uma2026: 117.31,
  /** Tope general de cotización, en veces UMA. [VERIFICAR] */
  topeAnteriorVecesUMA: 25,
  /** Fecha de la última revisión del contenido de la página. */
  ultimaActualizacion: '2026-10-26',
  /** WhatsApp de captación de la sección (distinto del conmutador del sitio). */
  whatsapp: '523318761361',
  /**
   * Aviso de privacidad del sitio, enlazado desde los avisos del pie de la
   * landing. Sale de @data/aviso-privacidad para no repetir la ruta: el
   * aviso simplificado de la autoevaluación enlaza al mismo lugar.
   */
  avisoPrivacidadUrl: AVISO_PRIVACIDAD_PATH,
  /** Firma visible de la sección. Sin número de cédula, por decisión editorial. */
  firma: {
    nombre: 'Edgar Lugo',
    puesto: 'Socio',
    division: 'LGO Abogados & Consultores'
  },
  /** Nombre del inmueble donde se atiende (complementa business.address). */
  sede: 'Casa Empresarial Lorenzana 781'
} as const;

/** Liga de WhatsApp de captación de la sección. */
export const M40_WHATSAPP_URL = `https://wa.me/${M40.whatsapp}`;

/**
 * Mensajes prellenados de WhatsApp. Dos, y solo dos: el de los botones
 * generales de la página y el de la autoevaluación (que agrega el resultado y
 * el nombre). Sin emojis.
 */
export const M40_WA_MENSAJE_GENERAL =
  'Hola, vi la página de Amparo Modalidad 40 en lgo.mx y quiero revisar mi caso.';

/** Liga que usan todos los botones generales de WhatsApp de la sección. */
export const M40_WHATSAPP_GENERAL = `${M40_WHATSAPP_URL}?text=${encodeURIComponent(
  M40_WA_MENSAJE_GENERAL
)}`;

/** Mensaje de la autoevaluación, con el resultado y el nombre del visitante. */
export function waMensajeAutoevaluacion(clasificacion: string, nombre: string): string {
  return `Hola, hice la prueba de Modalidad 40 en lgo.mx. Resultado: ${clasificacion}. Mi nombre es ${nombre}.`;
}

/** Zona horaria de referencia para todo cómputo de plazos de la sección. */
export const M40_TZ = 'America/Mexico_City';

// ── Dinero ─────────────────────────────────────────────────────────

/** Agrega el IVA a un monto en MXN. Redondeado al peso. */
export function conIva(montoSinIva: number): number {
  return Math.round(montoSinIva * (1 + M40.precios.iva));
}

/**
 * Formatea un entero de pesos como "$5,500".
 *
 * Implementado a mano (no con Intl) para que el string sea idéntico en el
 * build de Node, en el navegador y en las pruebas, sin depender de la versión
 * de ICU disponible.
 */
export function fmtMXN(monto: number): string {
  const entero = Math.round(monto).toString();
  return '$' + entero.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Precio tal como se muestra al público: el monto sin IVA, la leyenda "+ IVA"
 * y entre paréntesis el total con IVA. P. ej. `"$5,500 + IVA ($6,380)"`.
 */
export function precioTexto(montoSinIva: number): string {
  return `${fmtMXN(montoSinIva)} + IVA (${fmtMXN(conIva(montoSinIva))})`;
}

/**
 * Versión corta del precio, sin el total entre paréntesis: `"$500 + IVA"`.
 *
 * Es la que usan los rótulos donde el total estorbaría —el ancla de precio del
 * encabezado y la barra fija del móvil—. El total con IVA aparece completo en
 * la sección de precios, que es donde vive la letra chica.
 */
export function precioCorto(montoSinIva: number): string {
  return `${fmtMXN(montoSinIva)} + IVA`;
}

// ── Topes de cotización ────────────────────────────────────────────

/** Equivalencia de un mes en días de cotización. */
export const DIAS_MES_COTIZACION = 30.4;

/**
 * Formatea un TOPE redondeando hacia ABAJO: un máximo no debe mostrarse más
 * alto de lo que es. 2 932.75 → `"$2,932"`.
 */
export function fmtTope(monto: number): string {
  return fmtMXN(Math.floor(monto));
}

/** Tope general de cotización, en pesos diarios (veces UMA). */
export function topeAnteriorDiario(): number {
  return M40.uma2026 * M40.topeAnteriorVecesUMA;
}

/**
 * El mismo tope, aproximado al mes. Se muestra con `fmtMXN` (redondeo normal)
 * y no con `fmtTope`: la cifra se presenta como aproximada, no como un máximo.
 */
export function topeAnteriorMensual(): number {
  return topeAnteriorDiario() * DIAS_MES_COTIZACION;
}

// ── Fechas ─────────────────────────────────────────────────────────

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
] as const;

/** Formatea 'YYYY-MM-DD' como "26 de noviembre de 2026". */
export function fechaLarga(iso: string): string {
  const d = parseISO(iso);
  if (!d) return iso;
  return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

/** Formatea 'YYYY-MM-DD' como "26 de noviembre", sin año. Para rótulos cortos. */
export function fechaCorta(iso: string): string {
  const d = parseISO(iso);
  if (!d) return iso;
  return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`;
}

/**
 * "Hoy" en la zona horaria de la sección (America/Mexico_City), como Date a
 * medianoche UTC para poder restarlo contra las fechas de `M40`.
 *
 * Se resuelve con Intl en lugar de un offset fijo: así sigue siendo correcto
 * si México volviera a aplicar horario de verano.
 */
export function hoyEnMexico(now: Date = new Date()): Date {
  // 'en-CA' entrega 'YYYY-MM-DD', el formato que parseISO espera.
  const iso = new Intl.DateTimeFormat('en-CA', {
    timeZone: M40_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(now);
  return parseISO(iso) ?? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/**
 * Días naturales que faltan para una fecha 'YYYY-MM-DD'. Negativo si ya pasó,
 * 0 el día mismo.
 */
export function diasHasta(iso: string, hoy: Date = hoyEnMexico()): number {
  const objetivo = parseISO(iso);
  if (!objetivo) return 0;
  return diffDays(objetivo, hoy);
}

/**
 * ¿Sigue vigente el precio de lanzamiento?
 *
 * Vigente mientras "hoy" no haya pasado de `plazos.lanzamientoHasta` — es
 * decir, el último día cuenta. Regla de render del encargo: *después* de esa
 * fecha la tarjeta de lanzamiento desaparece sola.
 */
export function lanzamientoVigente(hoy: Date = hoyEnMexico()): boolean {
  return diasHasta(M40.plazos.lanzamientoHasta, hoy) >= 0;
}

/** ¿Ya pasó la fecha de corte interno de recepción de expedientes? */
export function cortePasado(hoy: Date = hoyEnMexico()): boolean {
  return diasHasta(M40.plazos.corteInterno, hoy) < 0;
}

// ── Textos derivados (una sola redacción para toda la sección) ─────

/**
 * Texto del contador mientras la fecha de corte no ha pasado: la fecha
 * primero (el dato útil) y la cuenta después (la urgencia).
 */
export function textoContador(dias: number): string {
  const cuenta = dias === 1 ? 'Falta 1 día' : `Faltan ${dias} días`;
  return `Recibimos expedientes hasta el ${fechaCorta(M40.plazos.corteInterno)} · ${cuenta}`;
}

/** Texto del contador una vez que la fecha de corte pasó. */
export const TEXTO_CONTADOR_VENCIDO =
  'La fecha de recepción para impugnar el acuerdo directamente ya pasó. Si el IMSS te aplicó el tope en una solicitud, aún podemos revisar tu caso.';
