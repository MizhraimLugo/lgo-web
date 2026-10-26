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
import { M40, fechaLarga } from './amparo-m40.ts';

const corte = fechaLarga(M40.plazos.corteInterno);

export const faqsAmparoM40: FaqItem[] = [
  {
    // La respuesta abre con la fecha: es el dato que la gente busca aquí.
    // VERIFICAR: las dos vías y que sus plazos corren por separado.
    q: '¿Hasta cuándo puedo ampararme?',
    a: `Recibimos expedientes hasta el ${corte}. Hay dos caminos y cada uno tiene su propio plazo: impugnar el acuerdo por sí mismo, cuyo término es breve y ya está corriendo, o esperar a que el IMSS te aplique el tope en un trámite concreto y reclamar ese acto. Si el IMSS ya respondió una solicitud tuya aplicando el tope, el plazo que corre es el más corto de los dos, así que conviene escribirnos de inmediato. Y la fecha de corte que ves arriba no es el plazo legal: es el nuestro, el margen que necesitamos para revisar tus documentos y preparar la demanda sin prisas.`
  },
  {
    // VERIFICAR: cómo se calcula la pensión en cada régimen.
    q: '¿Me sirve si empecé a cotizar después de 1997?',
    a: 'Por lo general no. La Modalidad 40 le sirve sobre todo a quien se pensiona con la Ley de 1973, porque ahí el monto depende del salario promedio de tus últimos años cotizados: subir ese salario mueve el resultado. Quien se pensiona con la Ley de 1997 recibe lo que haya acumulado en su cuenta individual, de modo que el efecto es distinto. Entre un régimen y otro hay casos de transición que conviene mirar con calma, y eso es justo lo que confirmamos en el diagnóstico con tus semanas cotizadas.'
  },
  {
    // VERIFICAR: respeto de condiciones a quien ya está inscrito, y régimen
    // aplicable a una reinscripción.
    q: 'Ya pago Modalidad 40, ¿me afecta?',
    a: 'Mientras dure el periodo que contrataste, conservas las condiciones con las que te inscribiste. El tope nuevo entra en juego cuando vuelves a inscribirte, porque una reinscripción se rige por las reglas vigentes el día que la solicitas. Por eso, si tu periodo está por terminar y piensas continuar, conviene revisar tu caso antes de que venza y no después: con el periodo cerrado, las opciones son otras.'
  },
  {
    // VERIFICAR: fin de la retroactividad en las inscripciones.
    q: '¿Puedo pagar meses atrasados?',
    a: 'Con las reglas nuevas, no: la inscripción cuenta desde la fecha de tu solicitud y no se pueden cubrir periodos anteriores. Antes era posible recuperar meses hacia atrás, y para mucha gente esa era una parte importante del plan, porque permitía acomodar el promedio salarial en menos tiempo. Si en tu caso hay algo que defender sobre este punto en concreto, te lo decimos en el diagnóstico.'
  },
  {
    // VERIFICAR: etapas del juicio y tramitación separada de la suspensión.
    q: '¿Cuánto tarda el juicio?',
    a: 'No hay un tiempo fijo: depende de la carga del juzgado y de si se interponen recursos. El camino pasa por la demanda, la solicitud de suspensión, el informe de la autoridad, la audiencia y la sentencia; si hay revisión, se suma esa etapa. La suspensión se tramita por separado y se resuelve antes que el fondo, así que es lo primero de lo que tendrás noticia. Te avisamos en cada etapa sin que tengas que preguntar.'
  },
  {
    q: '¿Y si el Congreso cambia la ley?',
    a: 'Es posible, y es uno de los riesgos que te explicamos antes de que contrates. Si el acuerdo se deroga o la ley se reforma, el juicio puede quedar sin materia: ya no habría acto que reclamar. También puede pasar lo contrario, que un cambio confirme el tope. Por eso el diagnóstico incluye el escenario de riesgo y no solo el favorable: si en tu caso el margen es estrecho, preferimos decírtelo antes de cobrarte el amparo.'
  },
  {
    q: '¿Por qué no usar un formato gratuito?',
    a: 'Un formato no revisa si tu caso procede, no decide qué vía te conviene según tus fechas, no lo adapta a tu régimen y no le da seguimiento al juicio. Tampoco responde cuando el juzgado previene la demanda ni interpone el recurso de revisión si hace falta. Elegir mal la vía o dejar pasar una prevención puede costarte el plazo, y el plazo no se recupera. Si aun así prefieres intentarlo por tu cuenta, el diagnóstico te sirve igual: te decimos por escrito qué vía va con tus fechas.'
  },
  {
    q: '¿Atienden fuera de Jalisco?',
    a: 'Sí, revisamos casos de cualquier estado. Dónde se presenta el amparo no depende de dónde vives, sino de dónde se ejecuta el acto que reclamas, y eso lo confirmamos en el diagnóstico con tus documentos. Buena parte del seguimiento es a distancia: te acompañamos por WhatsApp o correo y te avisamos de cada avance. Los documentos los pedimos por un canal seguro, nunca por este sitio.'
  },
  {
    q: '¿Garantizan el resultado?',
    a: 'No. Nadie puede hacerlo: el resultado lo decide un juez y todavía no hay sentencias sobre este acuerdo. Lo que sí está en nuestras manos sí lo comprometemos: un diagnóstico por escrito antes de que contrates, la vía que corresponde a tus fechas, un precio cerrado sin cobros sorpresa y aviso de cada avance del juicio. Y si al revisar tu caso vemos que no tiene sentido, te lo decimos antes de cobrarte el amparo.'
  }
];
