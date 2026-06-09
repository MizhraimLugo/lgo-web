// ════════════════════════════════════════════════════════════════
//  DIAGNÓSTICO DE SALUD EMPRESARIAL — Grupo LGO
// ════════════════════════════════════════════════════════════════
//
// Herramienta interactiva de auto-diagnóstico para empresarios.
// Cubre cinco dimensiones del negocio: financiero, fiscal, contable,
// corporativo y patrimonial — no solo lo fiscal.
//
// 50 preguntas organizadas en 5 territorios. Cada pregunta vale:
//   "Sí"      = 2 puntos
//   "Parcial" = 1 punto
//   "No"      = 0 puntos
//   "No sé"   = 0 puntos (no penaliza — preferible reconocer que mentir)
//
// Score máximo por territorio: 20. Score total máximo: 100.
//
// Semáforo de interpretación:
//   ≥ 80  → SANO         (negocio razonablemente ordenado)
//   ≥ 60  → VIGILAR      (áreas por fortalecer)
//   ≥ 40  → ATENDER      (acumulando riesgos)
//   <  40 → PRIORITARIO  (requiere revisión inmediata)

export type Territorio = {
  id: number;
  num: string;            // '01', '02' ... para badge
  name: string;           // título corto del territorio
  fullTitle: string;      // título completo
  oneLine: string;        // tagline editorial
  pitch: string;          // por qué importa (1 párrafo)
  questions: string[];    // 10 preguntas
};

export const territorios: Territorio[] = [
  {
    id: 1,
    num: '01',
    name: 'Orden financiero',
    fullTitle: 'Orden financiero del empresario',
    oneLine: 'Sin saber tus números, todo lo demás es opinión.',
    pitch:
      'Entender tus números no es ser contador. Es tener visibilidad mensual de cuánto vendiste, cuánto cobraste, cuánto debes y cuánto te queda. Ese es el suelo sobre el que se construye todo lo demás.',
    questions: [
      '¿Sabes cuánto vendió tu negocio el mes pasado?',
      '¿Sabes cuánto cobraste realmente, no solo cuánto facturaste?',
      '¿Sabes cuánto tienes pendiente por cobrar a clientes?',
      '¿Sabes cuánto debe actualmente tu negocio?',
      '¿Recibes o revisas mensualmente un estado de resultados?',
      '¿Recibes o revisas periódicamente un balance general?',
      '¿Tienes identificado cuánto flujo libre tiene tu negocio?',
      '¿Sabes cuánto dinero puedes retirar sin afectar la operación?',
      '¿Tu contador o área administrativa te explica tus números de manera clara?',
      '¿Tomas decisiones con base en reportes y no solo viendo el saldo en el banco?'
    ]
  },
  {
    id: 2,
    num: '02',
    name: 'Régimen fiscal',
    fullTitle: 'Régimen fiscal y estructura del negocio',
    oneLine: 'El régimen que te quedó al empezar puede ya no servirte hoy.',
    pitch:
      'No elijas tu régimen solo por pagar menos. Elígelo porque corresponde a la realidad de tu negocio — al tamaño, a los socios, a los clientes que quieres atender.',
    questions: [
      '¿Sabes exactamente en qué régimen fiscal estás inscrito?',
      '¿Sabes qué obligaciones fiscales debes cumplir cada mes?',
      '¿Tu régimen actual fue elegido por estrategia y no solo porque así empezaste?',
      '¿Tus actividades registradas ante el SAT reflejan lo que realmente haces?',
      '¿Has revisado en el último año si te conviene seguir como persona física o constituir una persona moral?',
      'Si tienes socios, ¿tu estructura actual permite operar correctamente con ellos?',
      '¿Tu estructura actual protege razonablemente tu patrimonio personal?',
      '¿Tu estructura fiscal corresponde al tamaño actual de tu negocio?',
      '¿Tu negocio podría contratar con clientes grandes sin verse informal?',
      '¿Tienes claro qué pasaría fiscalmente si tu negocio crece o incorpora socios?'
    ]
  },
  {
    id: 3,
    num: '03',
    name: 'Utilidad y flujo',
    fullTitle: 'Utilidad, flujo, deducciones e impuestos',
    oneLine: 'Vender mucho no significa tener dinero ni pagar menos impuestos.',
    pitch:
      'Utilidad contable, utilidad fiscal y flujo en banco son tres cosas distintas. Cuando se entienden por separado, los impuestos dejan de ser sorpresa.',
    questions: [
      '¿Sabes qué gastos de tu negocio son realmente deducibles?',
      '¿Revisas tus facturas recibidas antes de que cierre el mes?',
      '¿Tienes identificados tus gastos no deducibles?',
      '¿Separas el Impuesto al Valor Agregado cobrado de tu dinero operativo?',
      '¿Sabes cuánto Impuesto sobre la Renta estimado pagarás este mes?',
      '¿Sabes cuánto Impuesto al Valor Agregado tendrás que pagar o acreditar?',
      'Si tu negocio maneja mercancía, ¿tienes control de inventario actualizado?',
      '¿Sabes cuánto dinero está detenido en cuentas por cobrar?',
      '¿Antes de comprar activos importantes revisas su impacto fiscal?',
      '¿Tu contador te explica la diferencia entre utilidad, flujo e impuestos?'
    ]
  },
  {
    id: 4,
    num: '04',
    name: 'Riesgos cotidianos',
    fullTitle: 'Errores fiscales que cuestan caro',
    oneLine: 'Los problemas grandes empiezan como desórdenes pequeños y repetidos.',
    pitch:
      'No facturar no borra la operación — solo crea una explicación pendiente. Mezclar cuentas no es práctico, es opaco. Cada decisión pequeña construye o destruye visibilidad fiscal.',
    questions: [
      '¿Facturas todas tus ventas?',
      '¿Cobras los ingresos del negocio en cuentas bancarias identificadas para ese fin?',
      '¿Evitas usar cuentas personales para cobrar ingresos del negocio?',
      '¿Evitas pagar gastos personales desde la cuenta del negocio?',
      '¿Puedes explicar documentalmente el origen de tus depósitos relevantes?',
      '¿Documentas formalmente los préstamos que recibes o das?',
      '¿Tienes soporte cuando alguien paga gastos por cuenta de tu negocio?',
      '¿Revisas periódicamente tu buzón tributario?',
      '¿Evitas proveedores que ofrecen facturas sin operación real?',
      '¿Tienes evidencia de que los servicios que deduces realmente se prestaron?'
    ]
  },
  {
    id: 5,
    num: '05',
    name: 'Socios y patrimonio',
    fullTitle: 'Socios, patrimonio, préstamos e inmuebles',
    oneLine: 'La empresa termina donde tu patrimonio personal empieza.',
    pitch:
      'El dinero que sale de la empresa debe tener nombre y apellido: sueldo, honorario, dividendo, préstamo o reembolso. Cada uno con su soporte. Cada uno con su consecuencia fiscal.',
    questions: [
      '¿Tienes separado tu patrimonio personal del patrimonio del negocio?',
      'Si tienes socios, ¿existen acuerdos por escrito?',
      '¿Está definido cómo se retiran utilidades del negocio?',
      '¿Está claro si los pagos a socios son sueldo, honorarios, dividendos, préstamos o reembolsos?',
      '¿Los préstamos entre socios y empresa están documentados con contrato?',
      '¿Tienes actas o documentos que respalden las decisiones importantes?',
      '¿Tus inmuebles, vehículos o activos importantes están a nombre de quien estratégicamente conviene?',
      '¿Tu marca o nombre comercial está protegido mediante registro?',
      '¿Tienes contratos claros con clientes, proveedores o colaboradores clave?',
      '¿Has revisado si un problema del negocio podría afectar tu patrimonio personal?'
    ]
  }
];

// ──────────────────────────────────────────────────────────────────
//  CONSTANTES DE SCORING
// ──────────────────────────────────────────────────────────────────

export const TOTAL_PREGUNTAS = territorios.reduce((acc, t) => acc + t.questions.length, 0); // 50
export const SCORE_MAX_POR_TERRITORIO = 20;
export const SCORE_MAX_TOTAL = TOTAL_PREGUNTAS * 2; // 100

export type RespuestaValor = 2 | 1 | 0;
export const OPCIONES_RESPUESTA: { label: string; val: RespuestaValor }[] = [
  { label: 'Sí', val: 2 },
  { label: 'Parcial', val: 1 },
  { label: 'No', val: 0 }
];

// "No sé" se trata como sin respuesta para fines de scoring — preferible
// no penalizar la honestidad. El UI lo muestra como botón aparte que solo
// marca la pregunta como vista pero no suma.

// ──────────────────────────────────────────────────────────────────
//  SEMÁFORO
// ──────────────────────────────────────────────────────────────────

export type SemaforoNivel = 'sano' | 'vigilar' | 'atender' | 'prioritario';

export type SemaforoConfig = {
  nivel: SemaforoNivel;
  label: string;
  shortDesc: string;
  longDesc: string;
  /** Variable CSS para colorear el resultado. */
  color: string;
};

export const SEMAFORO: Record<SemaforoNivel, SemaforoConfig> = {
  sano: {
    nivel: 'sano',
    label: 'SANO',
    shortDesc: 'Negocio razonablemente ordenado',
    longDesc:
      'Tu negocio muestra una base fiscal y administrativa razonablemente ordenada. Te recomendamos mantener revisiones preventivas, especialmente si vas a crecer, contratar personal, comprar activos o asociarte.',
    color: 'var(--color-success)'
  },
  vigilar: {
    nivel: 'vigilar',
    label: 'VIGILAR',
    shortDesc: 'Va bien con áreas por fortalecer',
    longDesc:
      'Hay puntos que conviene mejorar antes de que se vuelvan costosos. Recomendamos una revisión de las áreas con menor puntaje y un plan de orden a 3-6 meses.',
    color: 'var(--color-accent)'
  },
  atender: {
    nivel: 'atender',
    label: 'ATENDER',
    shortDesc: 'Acumulando riesgos por falta de orden',
    longDesc:
      'Es posible que estés pagando de más, deduciendo mal o usando una estructura que ya no corresponde. Recomendamos una revisión preventiva con prioridad para evitar contingencias mayores.',
    color: 'var(--color-accent-deep)'
  },
  prioritario: {
    nivel: 'prioritario',
    label: 'PRIORITARIO',
    shortDesc: 'Requiere revisión inmediata',
    longDesc:
      'Tus respuestas reflejan áreas sensibles que pueden generar riesgos fiscales, contables o patrimoniales. No es para alarmarse — es para ordenar. Conversemos antes de que el problema escale.',
    color: 'var(--color-alert)'
  }
};

export const semaforoFromScore = (score: number): SemaforoConfig => {
  if (score >= 80) return SEMAFORO.sano;
  if (score >= 60) return SEMAFORO.vigilar;
  if (score >= 40) return SEMAFORO.atender;
  return SEMAFORO.prioritario;
};
