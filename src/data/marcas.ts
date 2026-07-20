// ════════════════════════════════════════════════════════════════
//  MOTOR — Calculadora de Declaración de Uso y Renovación de Marca
// ════════════════════════════════════════════════════════════════
//
// Reglas codificadas contra la Ley Federal de Protección a la Propiedad
// Industrial (LFPPI). Artículos de fundamento:
//
//   · Art. 178  — vigencia de 10 años del registro y su renovación.
//   · Art. 237  — la renovación se solicita dentro de los 6 meses previos
//                 al vencimiento; existe un periodo de gracia de 6 meses
//                 posteriores (con tarifa adicional). La renovación incluye
//                 la declaración de uso.
//   · Art. 233  — declaración de uso al tercer año de otorgado el registro,
//                 dentro de los 3 meses posteriores al tercer aniversario.
//                 Su omisión produce la caducidad del registro.
//   · Art. 21   — los plazos fijados en meses o años se cuentan "de fecha a
//                 fecha". Ver `addMonths` para el manejo de fin de mes.
//
// Este módulo es PURO (sin DOM, sin fetch): se importa tanto desde el
// <script> cliente de la calculadora como desde las pruebas en Node.
// Node 24 corre TypeScript de forma nativa (type-stripping), por lo que las
// pruebas importan este mismo archivo sin paso de compilación.

// ── Fechas de corte de la ley (referencia) ─────────────────────────

/**
 * Entrada en vigor del régimen que obliga a la declaración de uso al tercer
 * año (art. 233). Solo los registros OTORGADOS en esta fecha o después están
 * sujetos a ella; los anteriores presentan el uso junto con la renovación.
 */
export const FECHA_DECLARACION_USO_APLICA = '2018-08-10';

/**
 * Entrada en vigor de la LFPPI (5 de noviembre de 2020). Referencia para el
 * toggle de la calculadora: para registros otorgados antes de esta fecha, el
 * cómputo de la vigencia de 10 años corre desde la PRESENTACIÓN de la
 * solicitud; a partir de ella, desde el OTORGAMIENTO. El toggle deja que el
 * usuario indique este supuesto sin que la herramienta lo infiera.
 */
export const FECHA_LFPPI_VIGENTE = '2020-11-05';

// ── Aritmética de fechas (art. 21: "de fecha a fecha") ─────────────
//
// Todas las fechas se manejan como Date en UTC a medianoche, construidas con
// Date.UTC, para evitar cualquier corrimiento por zona horaria o DST.

/** Días del mes indicado. `month` es 1-12. */
function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/**
 * Suma (o resta, con `months` negativo) meses "de fecha a fecha".
 *
 * Cuando el día original no existe en el mes destino —p. ej. 30 de noviembre
 * + 3 meses cae en "30 de febrero", inexistente— se ajusta al ÚLTIMO día
 * válido del mes destino (28 o 29 de febrero según sea bisiesto). Esto
 * materializa el criterio "de fecha a fecha" del artículo 21 para los bordes
 * de fin de mes y años bisiestos.
 */
export function addMonths(date: Date, months: number): Date {
  const y = date.getUTCFullYear();
  const m0 = date.getUTCMonth(); // 0-11
  const d = date.getUTCDate();
  const total = m0 + months;
  const ny = y + Math.floor(total / 12);
  const nm0 = ((total % 12) + 12) % 12; // 0-11
  const nd = Math.min(d, daysInMonth(ny, nm0 + 1));
  return new Date(Date.UTC(ny, nm0, nd));
}

/** Suma (o resta) años "de fecha a fecha", con el mismo ajuste de fin de mes. */
export function addYears(date: Date, years: number): Date {
  return addMonths(date, years * 12);
}

/** Diferencia en días enteros (a - b). Ambas fechas se asumen a medianoche UTC. */
export function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86_400_000);
}

/** Parsea 'YYYY-MM-DD' a un Date en UTC a medianoche. Devuelve null si es inválida. */
export function parseISO(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12) return null;
  if (d < 1 || d > daysInMonth(y, mo)) return null;
  return new Date(Date.UTC(y, mo - 1, d));
}

/** Fecha de hoy normalizada a medianoche UTC del día de calendario local. */
export function hoyUTC(now: Date = new Date()): Date {
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

// ── Tipos ──────────────────────────────────────────────────────────

export type Tono = 'pendiente' | 'abierto' | 'gracia' | 'vencido' | 'caducidad' | 'info';

export type Estado = {
  texto: string;
  tono: Tono;
};

export type EntradaMarca = {
  /** Fecha de otorgamiento del registro (la del título). Obligatoria. 'YYYY-MM-DD'. */
  otorgamiento: string;
  /** Marca otorgada antes del 5 de noviembre de 2020 (ancla en presentación). */
  anteriorLFPPI: boolean;
  /** Fecha de presentación de la solicitud. Obligatoria solo si anteriorLFPPI. */
  presentacion?: string;
  // Opcionales — solo informativos, no afectan cálculos.
  nombre?: string;
  clase?: string;
  registro?: string;
};

export type ResultadoRenovacion = {
  /** Fecha ancla usada para el cómputo de la vigencia. */
  ancla: Date;
  anclaEtiqueta: 'otorgamiento' | 'presentación';
  /** Vencimiento = ancla + 10 años. */
  vencimiento: Date;
  /** La ventana de renovación abre 6 meses antes del vencimiento. */
  ventanaAbre: Date;
  /** Periodo de gracia: 6 meses después del vencimiento (tarifa adicional). */
  graciaFin: Date;
  estado: Estado;
};

export type ResultadoDeclaracionUso =
  | { aplica: false; mensaje: string }
  | {
      aplica: true;
      /** Abre a los 3 años del otorgamiento. */
      apertura: Date;
      /** Cierra 3 meses después de la apertura. */
      cierre: Date;
      estado: Estado;
    };

export type ResultadoMarca = {
  entrada: EntradaMarca;
  renovacion: ResultadoRenovacion;
  declaracionUso: ResultadoDeclaracionUso;
  /** Errores de validación de entrada (fechas faltantes o inválidas). */
  errores: string[];
};

// ── Estados vs. HOY ────────────────────────────────────────────────

function estadoDeclaracionUso(apertura: Date, cierre: Date, hoy: Date): Estado {
  if (hoy < apertura) {
    return { texto: `Faltan ${diffDays(apertura, hoy)} días para que abra la ventana.`, tono: 'pendiente' };
  }
  if (hoy <= cierre) {
    return { texto: `Ventana abierta — cierra en ${diffDays(cierre, hoy)} días.`, tono: 'abierto' };
  }
  return { texto: 'Fuera de plazo — posible caducidad.', tono: 'caducidad' };
}

function estadoRenovacion(ventanaAbre: Date, vencimiento: Date, graciaFin: Date, hoy: Date): Estado {
  if (hoy < ventanaAbre) {
    return { texto: `Faltan ${diffDays(ventanaAbre, hoy)} días para que abra la ventana.`, tono: 'pendiente' };
  }
  if (hoy <= vencimiento) {
    return { texto: `Ventana abierta — cierra en ${diffDays(vencimiento, hoy)} días.`, tono: 'abierto' };
  }
  if (hoy <= graciaFin) {
    return { texto: `Periodo de gracia (tarifa adicional) — cierra en ${diffDays(graciaFin, hoy)} días.`, tono: 'gracia' };
  }
  return { texto: 'Vencido.', tono: 'vencido' };
}

// ── Cálculo principal ──────────────────────────────────────────────

/**
 * Calcula plazos de renovación (art. 178 y 237) y declaración de uso de tercer
 * año (art. 233) para una marca, y su estado respecto a `hoy`.
 *
 * @param entrada  datos capturados de la marca.
 * @param hoy      fecha de referencia (por defecto hoy). Parametrizada para
 *                 pruebas deterministas.
 */
export function calcularMarca(entrada: EntradaMarca, hoy: Date = hoyUTC()): ResultadoMarca {
  const errores: string[] = [];

  const otorgamiento = parseISO(entrada.otorgamiento);
  if (!otorgamiento) errores.push('La fecha de otorgamiento es obligatoria y debe ser válida.');

  let presentacion: Date | null = null;
  if (entrada.anteriorLFPPI) {
    if (!entrada.presentacion) {
      errores.push('Para una marca otorgada antes del 5 de noviembre de 2020, la fecha de presentación es obligatoria.');
    } else {
      presentacion = parseISO(entrada.presentacion);
      if (!presentacion) errores.push('La fecha de presentación no es válida.');
    }
  }

  // ── Renovación (art. 178 y 237) ──
  // Ancla: presentación si el registro es anterior a la LFPPI; otorgamiento en
  // caso contrario. El vencimiento corre 10 años desde el ancla.
  const usaPresentacion = entrada.anteriorLFPPI && presentacion !== null;
  const ancla = (usaPresentacion ? presentacion : otorgamiento) as Date;

  let renovacion: ResultadoRenovacion;
  if (ancla) {
    const vencimiento = addYears(ancla, 10);
    const ventanaAbre = addMonths(vencimiento, -6);
    const graciaFin = addMonths(vencimiento, 6);
    renovacion = {
      ancla,
      anclaEtiqueta: usaPresentacion ? 'presentación' : 'otorgamiento',
      vencimiento,
      ventanaAbre,
      graciaFin,
      estado: estadoRenovacion(ventanaAbre, vencimiento, graciaFin, hoy)
    };
  } else {
    // Sin ancla válida no hay cómputo; se devuelve una estructura marcada por errores.
    renovacion = {
      ancla: hoy,
      anclaEtiqueta: usaPresentacion ? 'presentación' : 'otorgamiento',
      vencimiento: hoy,
      ventanaAbre: hoy,
      graciaFin: hoy,
      estado: { texto: 'Sin datos suficientes.', tono: 'info' }
    };
  }

  // ── Declaración de uso de tercer año (art. 233) ──
  // SIEMPRE anclada en la fecha de OTORGAMIENTO (el toggle NO la afecta).
  // Solo aplica si el otorgamiento es igual o posterior al 10/08/2018.
  let declaracionUso: ResultadoDeclaracionUso;
  const corteDU = parseISO(FECHA_DECLARACION_USO_APLICA) as Date;
  if (!otorgamiento) {
    declaracionUso = { aplica: false, mensaje: 'Captura la fecha de otorgamiento para calcular la declaración de uso.' };
  } else if (otorgamiento < corteDU) {
    declaracionUso = {
      aplica: false,
      mensaje: 'No aplica declaración de uso de tercer año para esta marca; se presenta junto con la renovación.'
    };
  } else {
    const apertura = addYears(otorgamiento, 3);
    const cierre = addMonths(apertura, 3);
    declaracionUso = {
      aplica: true,
      apertura,
      cierre,
      estado: estadoDeclaracionUso(apertura, cierre, hoy)
    };
  }

  return { entrada, renovacion, declaracionUso, errores };
}
