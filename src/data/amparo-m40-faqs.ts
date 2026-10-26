// ════════════════════════════════════════════════════════════════
//  FAQ — Amparo Modalidad 40
// ════════════════════════════════════════════════════════════════
//
// Preguntas frecuentes de /pensiones/amparo-modalidad-40. Se renderizan con
// <Faq> (acordeón accesible) y alimentan el schema FAQPage de la landing, de
// modo que el texto visible y el estructurado nunca se separan.
//
// La fecha de corte no está escrita a mano: sale de `M40.plazos.corteInterno`
// vía `fechaLarga`, igual que el contador y las tarjetas de precio.
//
// Las respuestas son más largas que las "tres líneas" que pedía el encargo
// v2: Edgar las pidió desarrolladas. Siguen siendo escaneables —primero la
// respuesta directa, después el porqué— y ahora el FAQPage lleva contenido
// con sustancia en lugar de tres renglones.
//
// REGISTRO: sin tecnicismos. Nada de "recurso", "interponer", "informe de
// la autoridad", "el fondo", "prevención", "sin materia" ni "acto de
// aplicación": quien lee esto no conoce esas palabras y no tiene por qué.
// Se describe QUÉ PASA, no cómo se llama el acto procesal. Profesional no
// es sonar a escrito judicial.
//
// VERIFICAR (sección 9 del encargo) — afirmaciones jurídicas pendientes de
// cotejo contra fuente oficial antes del merge:
//   · P1 «¿Hasta cuándo puedo ampararme?» — las dos vías (impugnar el acuerdo
//     por sí mismo o reclamar el acto concreto de aplicación) y que sus plazos
//     corren por separado.
//   · P2 «¿Me sirve si empecé a cotizar después de 1997?» — cómo se calcula la
//     pensión con la Ley de 1973 (salario promedio de los últimos años) frente
//     a la de 1997 (cuenta individual).
//   · P3 «Ya pago Modalidad 40, ¿me afecta?» — respeto de las condiciones
//     contratadas a quien ya está inscrito, y que una reinscripción se rige
//     por las reglas vigentes al momento de solicitarla.
//   · P4 «¿Puedo pagar meses atrasados?» — fin de la retroactividad: las
//     inscripciones cuentan desde la fecha de la solicitud.
//   · P5 «¿Cuánto tarda el juicio?» — las etapas del juicio y que la
//     suspensión se resuelve por separado del fondo.

import type { FaqItem } from './faqs';
import { M40, fechaLarga, fechaCorta } from './amparo-m40.ts';

const corte = fechaLarga(M40.plazos.corteInterno);
/** Año de la última revisión, para fechar lo que caduca. */
const anio = M40.ultimaActualizacion.slice(0, 4);

export const faqsAmparoM40: FaqItem[] = [
  {
    // NO abre con nuestra fecha. Si lo hiciera, quien cite esa primera frase
    // —una persona o un modelo— presentaría el corte interno de LGO como si
    // fuera el plazo que da la ley, y alguien podría darse por vencido sin
    // estarlo. Primero la distinción, después la fecha, siempre rotulada.
    // VERIFICAR: las dos vías y que sus plazos corren por separado.
    q: '¿Hasta cuándo puedo ampararme?',
    a: `Depende del camino, y el plazo de la ley no es el mismo que nuestra fecha de recepción. En LGO recibimos expedientes para el amparo contra el tope de la Modalidad 40 hasta el ${corte}: esa es una fecha interna nuestra, el margen que necesitamos para revisar tus documentos y preparar el caso sin prisas. El plazo legal corre aparte y hay dos caminos: pelear el acuerdo del IMSS en sí, cuyo término es breve y ya empezó, o esperar a que el IMSS te aplique el tope al contestar un trámite tuyo, lo que abre un plazo propio y más corto desde esa respuesta. Si el IMSS ya te contestó aplicando el tope, escríbenos hoy. Cuál de los dos corre en tu caso y cuántos días quedan te lo decimos en el diagnóstico, con tus fechas a la vista.`
  },
  {
    // VERIFICAR: cómo se calcula la pensión en cada régimen.
    q: '¿Me sirve si empecé a cotizar después de 1997?',
    a: 'Por lo general no. La Modalidad 40 le sirve sobre todo a quien se pensiona con la Ley de 1973, porque ahí la pensión se calcula con el promedio del salario de tus últimos años cotizados: subir ese salario cambia el resultado. Con la Ley de 1997 la pensión sale de lo que hayas acumulado en tu Afore, así que el efecto es distinto. Entre una ley y otra hay situaciones mixtas que conviene mirar con calma, y eso es justo lo que revisamos en el diagnóstico con tus semanas cotizadas.'
  },
  {
    // VERIFICAR: respeto de condiciones a quien ya está inscrito, y régimen
    // aplicable a una reinscripción.
    q: 'Ya pago Modalidad 40, ¿me afecta?',
    a: 'Mientras dure el periodo que contrataste, conservas las condiciones con las que entraste. El tope nuevo aparece cuando vuelves a inscribirte, porque una reinscripción se rige por las reglas que estén vigentes el día que la pides. Por eso, si tu periodo está por terminar y piensas seguir, conviene revisar tu caso antes de que se venza y no después: una vez cerrado, las opciones son otras.'
  },
  {
    // VERIFICAR: fin de la retroactividad en las inscripciones.
    q: '¿Puedo pagar meses atrasados?',
    a: 'Con las reglas nuevas de la Modalidad 40, no: tu inscripción cuenta desde el día que la solicitas y ya no se pueden cubrir meses anteriores. Antes sí se podía, y para mucha gente era parte importante del plan, porque permitía subir el promedio de su salario en menos tiempo. Si en tu caso hay algo que defender sobre este punto, te lo decimos en el diagnóstico.'
  },
  {
    // VERIFICAR: etapas del juicio y tramitación separada de la suspensión.
    q: '¿Cuánto tarda el juicio?',
    a: 'No hay un tiempo fijo: depende de qué tan cargado esté el juzgado y de si alguna de las partes pide que otro tribunal revise la decisión, lo que suma meses. El orden es este: presentamos tu caso, le pedimos al juez una medida provisional —la suspensión— para mientras dura el juicio, el IMSS responde por escrito, hay una audiencia y al final el juez decide. Esa medida provisional se resuelve aparte y mucho antes que lo demás, así que suele ser la primera noticia que recibes. Te avisamos en cada paso sin que tengas que preguntar.'
  },
  {
    q: '¿Y si el Congreso cambia la ley?',
    a: 'Es posible, y es uno de los riesgos que te explicamos antes de que contrates. Si el IMSS da marcha atrás o el Congreso cambia la ley, el juicio puede quedarse sin objeto: ya no habría nada que pelear. También puede pasar lo contrario, que un cambio confirme el tope. Por eso el diagnóstico incluye el escenario malo y no solo el bueno: si en tu caso el margen es estrecho, preferimos decírtelo antes de cobrarte el amparo.'
  },
  {
    q: '¿Por qué no usar un formato gratuito?',
    a: 'Un formato no revisa si tu caso procede, no decide qué camino te conviene según tus fechas, no se adapta a tu situación y no le da seguimiento al juicio. Tampoco contesta cuando el juzgado pide corregir algo del escrito, ni insiste ante otro tribunal si el juez no te da la razón. Equivocarte de camino o dejar pasar una de esas peticiones puede costarte el plazo, y el plazo no se recupera. Si aun así prefieres intentarlo por tu cuenta, el diagnóstico te sirve igual: te decimos por escrito qué camino va con tus fechas.'
  },
  {
    q: '¿Atienden fuera de Jalisco?',
    a: 'Sí, revisamos casos de cualquier estado. Dónde se presenta el amparo no depende de dónde vives, sino del lugar donde el IMSS aplica la decisión que reclamas, y eso lo confirmamos en el diagnóstico con tus documentos. Buena parte del seguimiento es a distancia: te acompañamos por WhatsApp o correo y te avisamos de cada avance. Los documentos los pedimos por un canal seguro, nunca por este sitio.'
  },
  {
    q: '¿Garantizan el resultado?',
    a: `No. Nadie puede hacerlo: la decisión es del juez y, al ${fechaCorta(M40.ultimaActualizacion)} de ${anio}, no conocemos sentencias sobre este acuerdo. Lo que sí está en nuestras manos lo comprometemos: un diagnóstico por escrito antes de que contrates, el camino que corresponde a tus fechas, un precio cerrado sin cobros sorpresa y aviso de cada avance. Y si al revisar tu caso vemos que no tiene sentido, te lo decimos antes de cobrarte el amparo.`
  }
];
