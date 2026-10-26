// ════════════════════════════════════════════════════════════════
//  MOTOR — Autoevaluación "¿Es tu caso?" (Amparo Modalidad 40)
// ════════════════════════════════════════════════════════════════
//
// Cinco preguntas y una clasificación. El motor es PURO: no toca el DOM ni
// la red, así que lo importan por igual el <script> cliente de la isla
// Autoevaluacion.astro y las pruebas en Node (amparo-m40.test.ts).
//
// La clasificación NO es un dictamen jurídico: ordena la atención del caso.
// Los criterios de las preguntas P2 y P3 (baja dentro de los últimos cinco
// años y 52 semanas cotizadas en los cinco años previos a la baja) provienen
// de los requisitos de la continuación voluntaria en el régimen obligatorio.
// Cotejados contra los artículos 218 y 219 de la Ley del Seguro Social el
// 26/10/2026 — ver el comentario de Autoevaluacion.astro.

/** Id de la opción elegida en cada pregunta. */
export type RespuestaP1 = 'si' | 'no' | 'no-se';
export type RespuestaP2 = 'menos-5' | 'mas-5' | 'sigo-alta';
export type RespuestaP3 = 'si' | 'no' | 'no-se';
export type RespuestaP4 = 'no' | 'si-termina-pronto' | 'si-falta-mucho';
export type RespuestaP5 = 'no' | 'si';

export type Respuestas = {
  p1: RespuestaP1;
  p2: RespuestaP2;
  p3: RespuestaP3;
  p4: RespuestaP4;
  p5: RespuestaP5;
};

/** Respuestas parciales mientras el visitante avanza por el cuestionario. */
export type RespuestasParciales = Partial<Respuestas>;

/** Las cuatro clasificaciones. El id es también la etiqueta en ClickUp. */
export type ClasificacionId = 'dudoso-urgente' | 'no-apto' | 'apto' | 'dudoso';

export type Clasificacion = {
  id: ClasificacionId;
  /** Etiqueta legible: encabezado del resultado y nombre de la tarea en ClickUp. */
  etiqueta: string;
  /**
   * Mensaje principal que ve el visitante: el gancho del resultado. La otra
   * mitad del texto —el siguiente paso— es la nota de Autoevaluacion.astro.
   */
  mensaje: string;
  /** Motivos concretos del resultado. Vacío salvo en 'no-apto'. */
  motivos: string[];
};

// ── Preguntas (texto visible) ──────────────────────────────────────

export type Pregunta = {
  /** Clave en `Respuestas`. */
  clave: keyof Respuestas;
  /** Etiqueta corta para la barra de avance y los registros ("P1"…"P5"). */
  codigo: string;
  texto: string;
  opciones: { id: string; texto: string }[];
};

export const preguntas: Pregunta[] = [
  {
    clave: 'p1',
    codigo: 'P1',
    texto: '¿Empezaste a cotizar al IMSS antes del 1 de julio de 1997?',
    opciones: [
      { id: 'si', texto: 'Sí' },
      { id: 'no', texto: 'No' },
      { id: 'no-se', texto: 'No sé' }
    ]
  },
  {
    clave: 'p2',
    codigo: 'P2',
    texto: '¿Hace cuánto te diste de baja del IMSS?',
    opciones: [
      { id: 'menos-5', texto: 'Menos de 5 años' },
      { id: 'mas-5', texto: 'Más de 5 años' },
      { id: 'sigo-alta', texto: 'Sigo dado de alta' }
    ]
  },
  {
    clave: 'p3',
    codigo: 'P3',
    texto: '¿Tienes al menos 52 semanas cotizadas en los 5 años antes de tu baja?',
    opciones: [
      { id: 'si', texto: 'Sí' },
      { id: 'no', texto: 'No' },
      { id: 'no-se', texto: 'No sé' }
    ]
  },
  {
    clave: 'p4',
    codigo: 'P4',
    texto: '¿Estás inscrito hoy en Modalidad 40?',
    opciones: [
      { id: 'no', texto: 'No' },
      { id: 'si-termina-pronto', texto: 'Sí, y mi periodo termina pronto' },
      { id: 'si-falta-mucho', texto: 'Sí, y me falta mucho' }
    ]
  },
  {
    clave: 'p5',
    codigo: 'P5',
    texto: '¿El IMSS ya te respondió una solicitud aplicando el nuevo tope?',
    opciones: [
      { id: 'no', texto: 'No' },
      { id: 'si', texto: 'Sí' }
    ]
  }
];

export const TOTAL_PREGUNTAS = preguntas.length;

/** Texto de la opción elegida, para el expediente que llega a ClickUp. */
export function textoRespuesta(clave: keyof Respuestas, id: string): string {
  const pregunta = preguntas.find((p) => p.clave === clave);
  return pregunta?.opciones.find((o) => o.id === id)?.texto ?? id;
}

// ── Clasificación ──────────────────────────────────────────────────

/**
 * Motivos por los que un perfil queda fuera, en el mismo orden en que el
 * encargo los enumera. Describen la respuesta del visitante; no afirman la
 * consecuencia jurídica.
 */
const MOTIVOS_NO_APTO: { cuando: (r: Respuestas) => boolean; motivo: string }[] = [
  {
    cuando: (r) => r.p1 === 'no',
    motivo:
      'Empezaste a cotizar después del 1 de julio de 1997. La Modalidad 40 es atractiva sobre todo para quien se pensiona con la Ley de 1973.'
  },
  {
    cuando: (r) => r.p2 === 'mas-5',
    motivo: 'Han pasado más de cinco años desde que te diste de baja del IMSS.'
  },
  {
    cuando: (r) => r.p3 === 'no',
    motivo: 'No reúnes 52 semanas cotizadas en los cinco años previos a tu baja.'
  },
  {
    cuando: (r) => r.p4 === 'si-falta-mucho',
    motivo:
      'Tu periodo contratado de Modalidad 40 sigue corriendo, así que el tope de las nuevas inscripciones todavía no te alcanza.'
  }
];

/**
 * Clasifica un perfil. El orden de evaluación es el del encargo y no es
 * conmutable: la urgencia gana a todo lo demás, y la no aptitud se revisa
 * antes de poder declarar un perfil apto.
 *
 *   1. dudoso-urgente — el IMSS ya resolvió una solicitud aplicando el tope.
 *   2. no-apto        — alguna de las condiciones de `MOTIVOS_NO_APTO`.
 *   3. apto           — el perfil completo coincide.
 *   4. dudoso         — todo lo demás ("No sé", "Sigo dado de alta"…).
 */
export function clasificar(r: Respuestas): Clasificacion {
  // 1. Urgente: hay un acto de autoridad concreto y su plazo corre aparte.
  if (r.p5 === 'si') {
    return {
      id: 'dudoso-urgente',
      etiqueta: 'Dudoso urgente',
      mensaje: 'Atención: si el IMSS ya te respondió, tu plazo es más corto.',
      motivos: []
    };
  }

  // 2. No apto: una sola condición basta, pero se listan todas las que apliquen.
  const motivos = MOTIVOS_NO_APTO.filter((m) => m.cuando(r)).map((m) => m.motivo);
  if (motivos.length > 0) {
    return {
      id: 'no-apto',
      etiqueta: 'No apto',
      mensaje: 'Por ahora el amparo no parece ser para ti, y preferimos decírtelo.',
      motivos
    };
  }

  // 3. Apto: el perfil coincide en las cinco preguntas.
  const apto =
    r.p1 === 'si' &&
    r.p2 === 'menos-5' &&
    r.p3 === 'si' &&
    (r.p4 === 'no' || r.p4 === 'si-termina-pronto') &&
    r.p5 === 'no';
  if (apto) {
    return {
      id: 'apto',
      etiqueta: 'Apto',
      mensaje: 'Tu perfil coincide.',
      motivos: []
    };
  }

  // 4. Dudoso: faltan datos para decidir ("No sé", "Sigo dado de alta").
  return {
    id: 'dudoso',
    etiqueta: 'Dudoso',
    mensaje: 'Puede que sí.',
    motivos: []
  };
}

/** ¿Están contestadas las cinco preguntas? */
export function completas(r: RespuestasParciales): r is Respuestas {
  return preguntas.every((p) => typeof r[p.clave] === 'string' && r[p.clave] !== undefined);
}
