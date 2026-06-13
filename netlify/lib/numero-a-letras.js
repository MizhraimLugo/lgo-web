// Conversión de un monto a su expresión con letra, para los marcadores {{*_letra}}
// de las plantillas de /contratos. Determinista, sin dependencias.
//
// La parte ENTERA se escribe en palabras (español de México, minúsculas, con los
// apócopes "un"/"veintiún" antes de mil/millón/pesos). Los CENTAVOS se expresan
// como "NN/100" (convención legal mexicana), solo si son distintos de cero.
// La palabra "pesos" se añade SOLO cuando la plantilla no la trae ya en su texto
// fijo (el llamador lo indica con la opción { pesos } — ver netlify/lib/contratos-letra.json).

const UNIDADES = [
  'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete',
  'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés',
  'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'
];
const DECENAS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

/** Apócope: "uno"→"un", "veintiuno"→"veintiún", "...y uno"→"...y un". */
function apocopar(palabras) {
  return palabras.replace(/veintiuno$/, 'veintiún').replace(/\buno$/, 'un');
}

/** 0–999 en palabras. */
function centenasEnLetras(n) {
  if (n === 0) return '';
  if (n === 100) return 'cien';
  if (n < 30) return UNIDADES[n];
  if (n < 100) {
    const d = Math.floor(n / 10), u = n % 10;
    return u === 0 ? DECENAS[d] : `${DECENAS[d]} y ${UNIDADES[u]}`;
  }
  const c = Math.floor(n / 100), r = n % 100;
  return r === 0 ? CENTENAS[c] : `${CENTENAS[c]} ${centenasEnLetras(r)}`;
}

/** Entero >= 0 en palabras (hasta miles de millones, suficiente para contratos). */
function enteroEnLetras(n) {
  if (n === 0) return 'cero';
  const millones = Math.floor(n / 1_000_000);
  const miles = Math.floor((n % 1_000_000) / 1000);
  const resto = n % 1000;
  const partes = [];

  if (millones > 0) {
    if (millones === 1) partes.push('un millón');
    else partes.push(`${apocopar(enteroEnLetras(millones))} millones`);
  }
  if (miles > 0) {
    if (miles === 1) partes.push('mil');
    else partes.push(`${apocopar(centenasEnLetras(miles))} mil`);
  }
  if (resto > 0) partes.push(centenasEnLetras(resto));

  return partes.join(' ').trim();
}

/** Normaliza un monto de texto ("$7,500.50", "7500", "1,000") a número. */
export function parsearMonto(valor) {
  if (typeof valor === 'number') return valor;
  const limpio = String(valor ?? '')
    .replace(/[^\d.,-]/g, '')   // quita $, espacios, letras
    .replace(/,/g, '');          // coma = separador de miles
  const n = parseFloat(limpio);
  return Number.isFinite(n) ? n : null;
}

/**
 * Formatea un monto como "$1,234,567.89" (signo, miles con coma, 2 decimales).
 * Si no es un número válido, devuelve el texto original sin tocarlo.
 */
export function formatearMoneda(valor) {
  const n = parsearMonto(valor);
  if (n === null) return String(valor ?? '');
  const [ent, dec] = n.toFixed(2).split('.');
  return `$${ent.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${dec}`;
}

/**
 * Monto en letra. Devuelve "" si el valor no es un número válido (deja el
 * documento sin texto inventado en vez de romperlo).
 * @param {string|number} valor  monto capturado
 * @param {{pesos?: boolean}} opts  pesos=true añade la palabra "pesos"
 */
export function montoEnLetras(valor, opts = {}) {
  const n = parsearMonto(valor);
  if (n === null || n < 0) return '';
  const entero = Math.floor(n);
  const centavos = Math.round((n - entero) * 100);

  let texto = apocopar(enteroEnLetras(entero));
  if (opts.pesos) {
    // "un millón DE pesos", "dos millones DE pesos" (solo si la cifra termina en
    // millón/millones; "dos millones quinientos mil pesos" no lleva "de").
    if (entero === 1) texto += ' peso';
    else if (/mill(ón|ones)$/.test(texto)) texto += ' de pesos';
    else texto += ' pesos';
  }
  if (centavos > 0) texto += ` ${String(centavos).padStart(2, '0')}/100`;
  return texto;
}
