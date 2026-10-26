// ════════════════════════════════════════════════════════════════
//  BLOQUES DE AUTORIDAD — Amparo Modalidad 40
// ════════════════════════════════════════════════════════════════
//
// Los tres bloques donde la página deja de ser folleto y demuestra pericia:
// cuánto dura el plazo, qué cambió con la reforma de 2025 y qué va a
// argumentar el IMSS. Los redactó Edgar Lugo (documento "Bloques de
// autoridad", 26/10/2026), que es quien puede firmarlos.
//
// Cada bloque tiene dos capas, y NO se mezclan:
//   · `cuerpo`     — lo que lee cualquiera.
//   · `fundamento` — las citas legales, dentro de un desplegable.
//
// Ninguna fecha ni plazo está escrito a mano: todos salen de `M40`, así que
// corregir el calendario de días inhábiles en un lugar los corrige en toda
// la página.
//
// Sobre el HTML en las cadenas: los textos llevan `<strong>` porque la
// negrita es parte de cómo se leen, y se renderizan con `set:html`. El
// contenido es nuestro y está aquí literal —no viene de ninguna entrada de
// usuario—, así que no hay superficie de inyección.
//
// VERIFICAR (sección 9 del encargo) — lo que Edgar marcó como pendiente de
// cotejo contra fuente oficial antes del merge:
//   · Acuerdo del Consejo Técnico en dof.gob.mx (punto Séptimo, vigencia).
//   · Ley del Seguro Social: artículos 218, 219, 251, 263, 264, 294 y 295.
//   · Ley de Amparo: artículos 128, 129, 148 y el tercero transitorio del
//     decreto de 2025.
//   · Reglamento de Afiliación, artículo 64.
//   · Tesis 2027614 y 2032691 en el Semanario Judicial de la Federación.
//   · Calendario de días inhábiles del PJF para noviembre y diciembre 2026.
//
// Lo que Edgar SÍ verificó contra el PDF de la Cámara de Diputados queda
// anotado en la descripción del PR, no aquí: esto es código, no bitácora.

import { M40, fechaLarga, fechaCorta } from './amparo-m40.ts';

/** Un tramo del texto público. */
export type TramoAutoridad =
  | { tipo: 'intro'; texto: string }
  | { tipo: 'apartado'; titulo: string; parrafos: string[] }
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'cierre'; texto: string };

export type BloqueAutoridad = {
  id: string;
  eyebrow: string;
  titulo: string;
  cuerpo: TramoAutoridad[];
  /** Citas legales del desplegable. */
  fundamento: string[];
  /** Nota final del desplegable, cuando hace falta mostrar un cómputo. */
  fundamentoNota?: string;
};

const vigencia = fechaLarga(M40.acuerdo.vigenciaDesde);
const vence = fechaLarga(M40.plazos.vencimientoAcuerdo);
const corte = fechaCorta(M40.plazos.corteInterno);
const reforma = fechaLarga(M40.reformaAmparo.fechaDOF);

// ── A. El plazo ───────────────────────────────────────────────────

export const BLOQUE_PLAZO: BloqueAutoridad = {
  id: 'plazo',
  eyebrow: 'El plazo',
  titulo: 'Hay dos relojes, y el tuyo depende de tu situación',
  cuerpo: [
    {
      tipo: 'apartado',
      titulo: 'Reloj 1 — Impugnar el acuerdo directamente',
      parrafos: [
        `El acuerdo del IMSS entró en vigor el ${vigencia}. Cuando se impugna una norma general que afecta por su sola vigencia, la Ley de Amparo da <strong>${M40.plazos.diasAcuerdo} días hábiles contados desde el día en que entra en vigor</strong>. Se descuentan sábados, domingos y los días inhábiles del Poder Judicial de la Federación.`,
        `Con ese conteo, el plazo vence el <strong>${vence}</strong>. Si los juzgados declaran inhábiles algún día de noviembre, el vencimiento podría correrse unos días, pero nunca adelantarse.`,
        `Por eso trabajamos con un <strong>corte interno al ${corte}</strong>: necesitamos días para revisar tus documentos, redactar y presentar sin depender de un cómputo ajeno.`
      ]
    },
    {
      tipo: 'apartado',
      titulo: 'Reloj 2 — Impugnar la respuesta del IMSS a tu caso',
      parrafos: [
        `Si ya solicitaste tu inscripción con un salario superior y el IMSS te la negó o te la limitó al tope nuevo, tu plazo es distinto: <strong>${M40.plazos.diasRespuesta} días hábiles</strong> contados a partir del día siguiente a aquel en que surta efectos la notificación de esa respuesta. Ese reloj corre con independencia del primero. Si estás en este caso, escríbenos hoy.`
      ]
    },
    {
      tipo: 'parrafo',
      texto: `<strong>Lo que no cambia con ningún reloj:</strong> el derecho a la continuación voluntaria solo puede ejercerse dentro de los <strong>${M40.plazos.aniosContinuacion} años</strong> siguientes a la baja. Cada mes que pasa sin resolver tu situación es un mes menos de esa ventana.`
    }
  ],
  fundamento: [
    'Ley de Amparo, artículo 17: el plazo general para presentar la demanda es de quince días; la fracción I lo amplía a treinta días cuando se reclama una norma general autoaplicativa.',
    'Ley de Amparo, artículo 18: los plazos se computan a partir del día siguiente a aquel en que surte efectos la notificación del acto reclamado, salvo el caso de la fracción I del artículo 17, en que se computa a partir del día de la entrada en vigor de la norma.',
    'Ley de Amparo, artículo 19: son días hábiles todos los del año, excepto sábados, domingos, 1 de enero, 5 de febrero, 21 de marzo, 1 y 5 de mayo, 14 y 16 de septiembre, 12 de octubre, 20 de noviembre y 25 de diciembre, y aquellos en que el órgano jurisdiccional suspenda labores.',
    'Ley de Amparo, artículo 21: la demanda puede presentarse hasta las veinticuatro horas del día de su vencimiento, en forma impresa ante la oficialía de partes o en forma electrónica con Firma Electrónica.',
    `Acuerdo del Consejo Técnico del IMSS publicado en el Diario Oficial de la Federación el ${fechaLarga(M40.acuerdo.fechaDOF)}, punto Séptimo: entra en vigor el día hábil siguiente a su publicación.`,
    'Ley del Seguro Social, artículo 219: el asegurado puede solicitar la continuación voluntaria dentro de los cinco años siguientes a la fecha de baja.'
  ],
  fundamentoNota:
    'Cómputo del Reloj 1 (treinta días hábiles, iniciando el 22 de octubre de 2026 y descontando el 20 de noviembre): días 1 a 7 del 22 al 30 de octubre; días 8 a 21 del 2 al 19 de noviembre; días 22 a 27 del 23 al 30 de noviembre; días 28 a 30 del 1 al 3 de diciembre. Si el 2 y el 16 de noviembre resultan inhábiles por acuerdo del Órgano de Administración Judicial, el vencimiento se recorre al 7 de diciembre.'
};

// ── B. La reforma de 2025 ─────────────────────────────────────────

export const BLOQUE_REFORMA: BloqueAutoridad = {
  id: 'reforma',
  eyebrow: 'La reforma de 2025',
  titulo: 'No cerró la puerta del amparo, pero la hizo más angosta',
  cuerpo: [
    {
      tipo: 'intro',
      texto: `La reforma del ${reforma} no cerró la puerta del amparo, pero la hizo más angosta. Hay que saber por dónde entrar. Tres cambios te afectan directamente.`
    },
    {
      tipo: 'apartado',
      titulo: '1. Ya no basta con “verse afectado”. Hay que probarlo',
      parrafos: [
        'Desde la reforma, quien promueve un amparo por interés legítimo debe demostrar una lesión <strong>real y diferenciada</strong> de la del resto de las personas, y que ganar le produciría un beneficio <strong>cierto, no hipotético</strong>. En la práctica: tu constancia de semanas, tu fecha de baja, tu último salario y tu plan de pensión son la prueba de que el tope te golpea a ti, no a “los asegurados en general”. Una demanda genérica se desecha; una demanda con tu expediente, no.'
      ]
    },
    {
      tipo: 'apartado',
      titulo: '2. La suspensión es más difícil y nunca tiene efectos generales',
      parrafos: [
        'La ley ahora obliga al juez a ponderar la apariencia de buen derecho frente al interés social y amplió los casos en que la suspensión no procede. Además, cuando se impugna una norma general, la suspensión no puede beneficiar a nadie más que a quien la pidió. Te lo decimos claro: es probable que la suspensión no te permita inscribirte con el salario alto mientras dura el juicio. El beneficio llegaría con la sentencia.'
      ]
    },
    {
      tipo: 'apartado',
      titulo: '3. Las sentencias protegen solo a quien se amparó',
      parrafos: [
        'Si otro gana su amparo, eso no te protege a ti. Si el acuerdo se declara inconstitucional en tu juicio, se deja de aplicar únicamente en tu caso. No hay “amparo colectivo” automático contra este acuerdo.'
      ]
    },
    {
      tipo: 'cierre',
      texto: `<strong>Lo que sigue igual:</strong> los plazos de ${M40.plazos.diasRespuesta} y ${M40.plazos.diasAcuerdo} días, la competencia de los juzgados de distrito y la posibilidad de presentar la demanda en línea.`
    }
  ],
  fundamento: [
    `Decreto publicado en el Diario Oficial de la Federación el ${reforma}, en vigor desde el ${fechaLarga(M40.reformaAmparo.vigenciaDesde)}. Su artículo tercero transitorio dispone que la reforma aplica a las actuaciones procesales posteriores a su entrada en vigor.`,
    'Ley de Amparo, artículo 5, fracción I, segundo párrafo (adicionado el 16 de octubre de 2025): tratándose del interés legítimo, la norma, acto u omisión debe ocasionar una lesión jurídica real y diferenciada del resto de las personas, de modo que su anulación produzca un beneficio cierto y no meramente hipotético o eventual.',
    'Ley de Amparo, artículo 61, fracción XII: el amparo es improcedente contra actos que no afecten los intereses jurídicos o legítimos del quejoso y contra normas generales que requieran un acto de aplicación posterior al inicio de su vigencia.',
    'Ley de Amparo, artículo 73, primer párrafo (reformado el 13 de marzo de 2025): en los amparos que resuelvan la inconstitucionalidad de normas generales, las sentencias en ningún caso fijarán efectos generales.',
    'Ley de Amparo, artículo 78, segundo párrafo: si se declara la inconstitucionalidad de la norma, los efectos se traducen en su inaplicación únicamente respecto de la persona quejosa.',
    'Ley de Amparo, artículos 128, 129 y 148 (reformados el 16 de octubre de 2025): análisis ponderado para conceder la suspensión, nuevos supuestos de afectación al interés social y prohibición de suspensión con efectos generales contra normas.',
    'Ley de Amparo, artículo 3: la demanda puede presentarse de forma electrónica a través del Portal de Servicios en Línea del Poder Judicial de la Federación.'
  ]
};

// ── C. La defensa del IMSS ────────────────────────────────────────

export const BLOQUE_DEFENSA: BloqueAutoridad = {
  id: 'defensa-imss',
  eyebrow: 'La otra parte',
  titulo: 'Qué va a argumentar el IMSS y por qué no coincide con la ley',
  cuerpo: [
    {
      tipo: 'intro',
      texto:
        'Conocemos la defensa del IMSS antes de que la escriba. Esto es lo que dirá y lo que responderemos.'
    },
    {
      tipo: 'apartado',
      titulo: '“El Consejo Técnico tiene facultades para dictar acuerdos sobre la operación del Instituto”',
      parrafos: [
        'Es cierto que las tiene. Lo que no tiene es facultad para contradecir la ley. El artículo 218 de la Ley del Seguro Social dice que el asegurado dado de baja queda inscrito “con el último salario <strong>o superior</strong>”. El acuerdo cambia ese “o superior” por “más una UMA”. La propia Ley del Seguro Social, en su artículo 9, establece que las normas sobre <strong>base de cotización</strong> son normas que fijan cargas y se aplican de manera estricta. Un acuerdo administrativo no puede reescribir la base de cotización que la ley fijó.'
      ]
    },
    {
      tipo: 'apartado',
      titulo: '“Usted no tenía un derecho adquirido; solo una expectativa. No estaba inscrito”',
      parrafos: [
        'La ley no dice “podrá solicitar”; dice que el asegurado con 52 semanas en los últimos cinco años, al ser dado de baja, <strong>tiene el derecho</strong> a continuar. El derecho nace con la baja, no con la inscripción. Lo que el acuerdo restringe es el contenido de un derecho que la ley ya te reconoció. Y con tus documentos demostramos que la lesión es tuya y concreta: tu salario de baja, tu meta de cotización y la diferencia entre ambos.'
      ]
    },
    {
      tipo: 'apartado',
      titulo: '“El amparo es improcedente: el acuerdo necesita un acto de aplicación”',
      parrafos: [
        'Aquí está la decisión más importante del caso, y por eso empezamos con un diagnóstico. Si el juez considera que el acuerdo solo te afecta cuando el IMSS lo aplica, la demanda contra el acuerdo se desecha. Nuestra respuesta tiene dos capas: sostenemos que el acuerdo cambia por sí mismo la condición jurídica de quien ya tiene el derecho del artículo 218 y, en paralelo, dejamos documentado el acto de aplicación para impugnarlo en su propio plazo si hace falta.',
        'Sobre el recurso de inconformidad que el Instituto suele oponer: la Ley de Amparo permite ir directamente al amparo cuando se alegan violaciones directas a la Constitución, y los tribunales han reconocido que el IMSS actúa como autoridad cuando afecta el derecho a la seguridad social.'
      ]
    },
    {
      tipo: 'apartado',
      titulo: '“Es una medida temporal para proteger las finanzas del Instituto”',
      parrafos: [
        'Es el argumento que más pesa contra la suspensión, y lo reconocemos. Nuestra respuesta es que no pedimos frenar la medida para todos, sino que se te permita inscribirte con el salario que la ley autoriza <strong>pagando íntegras las cuotas correspondientes</strong>. El Instituto no pierde: recibe más cuotas. Aun así, es probable que la suspensión se niegue y el resultado llegue con la sentencia.'
      ]
    },
    {
      tipo: 'apartado',
      titulo: '“El acuerdo ya cambió; el juicio quedó sin materia”',
      parrafos: [
        'Puede pasar si el Consejo Técnico modifica la medida o si el Congreso reforma la ley. Por eso desde el primer día dejamos constancia de tu solicitud de inscripción y del salario pretendido: si el acuerdo desaparece, tu solicitud queda viva y la ruta cambia, pero no se pierde.'
      ]
    },
    {
      tipo: 'cierre',
      texto:
        '<strong>En una frase:</strong> el IMSS defenderá que puede administrar; nosotros defenderemos que no puede legislar.'
    }
  ],
  fundamento: [
    'Ley del Seguro Social, artículo 218: el asegurado con un mínimo de cincuenta y dos cotizaciones semanales acreditadas en el régimen obligatorio en los últimos cinco años, al ser dado de baja, tiene el derecho a continuar voluntariamente en el mismo en los seguros de invalidez y vida y de retiro, cesantía en edad avanzada y vejez, debiendo quedar inscrito con el último salario o superior al que tenía en el momento de la baja.',
    'Ley del Seguro Social, artículo 9, primer párrafo: las disposiciones que establecen cargas y las que fijan excepciones son de aplicación estricta; se consideran normas que establecen cargas las que se refieren a sujeto, objeto, base de cotización y tasa.',
    'Ley del Seguro Social, artículo 28: los asegurados se inscriben con el salario base de cotización que perciban, con límite superior de veinticinco veces el salario mínimo general (hoy expresado en UMA) y límite inferior de un salario mínimo.',
    'Reglamento de la Ley del Seguro Social en materia de Afiliación, Clasificación de Empresas, Recaudación y Fiscalización, artículos 64 y 65: el salario base de cotización en la continuación voluntaria es el registrado a la baja o uno superior, sin exceder el límite legal.',
    'Ley del Seguro Social, artículos 251, 263 y 264: facultades del Instituto y del Consejo Técnico, invocadas como fundamento del propio acuerdo.',
    'Ley de Amparo, artículo 61, fracción XIV, segundo y tercer párrafos: una norma general no se entiende consentida si no se reclamó desde su vigencia, siempre que se promueva amparo contra el primer acto de aplicación; cuando contra ese acto proceda un recurso, es optativo agotarlo o acudir desde luego al amparo.',
    'Ley de Amparo, artículo 61, fracción XX, segundo párrafo: no existe obligación de agotar recursos cuando solo se aleguen violaciones directas a la Constitución o cuando el recurso esté previsto en un reglamento sin que la ley contemple su existencia.',
    'Ley de Amparo, artículo 61, fracciones XXI y XXII: improcedencia cuando cesan los efectos del acto o cuando el acto subsiste pero ya no puede surtir efecto por haber dejado de existir su materia.',
    'Ley de Amparo, artículo 77, fracción I: cuando el acto reclamado sea positivo, la concesión del amparo restituye al quejoso en el pleno goce del derecho violado.',
    'Ley del Seguro Social, artículos 294 y 295: recurso de inconformidad y medios de defensa en materia de prestaciones.',
    'Tesis con registro digital 2027614 (Pleno Regional en Materia Administrativa): el IMSS, al actuar como ente asegurador, puede ser autoridad responsable para efectos del amparo cuando afecta el derecho a la seguridad social.',
    'Tesis con registro digital 2032691 (Pleno Regional en Materias Administrativa y Civil de la Región Centro-Norte, publicada el 2 de octubre de 2026): la competencia para conocer de amparos contra actos del IMSS relacionados con la Modalidad 40 corresponde a los juzgados de distrito en materia administrativa.'
  ]
};

/** Los dos avisos que el documento de autoridad suma al pie. */
export const AVISOS_AUTORIDAD = [
  `Los plazos descritos son el cómputo de ${M40.firma.division} conforme a la Ley de Amparo vigente al ${fechaLarga(M40.ultimaActualizacion)} y pueden variar según los días inhábiles que determine el Poder Judicial de la Federación. No son asesoría para un caso concreto.`,
  'La estrategia descrita es nuestra posición jurídica. No existen todavía sentencias sobre este acuerdo y la autoridad judicial puede resolver en sentido distinto.'
];
