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
// VERIFICAR (sección 9 del encargo) — afirmaciones jurídicas pendientes de
// cotejo contra fuente oficial antes del merge:
//   · P3 «Ya pago Modalidad 40, ¿me afecta?» — respeto de las condiciones
//     contratadas a quien ya está inscrito.
//   · P4 «¿Puedo pagar meses atrasados?» — fin de la retroactividad: las
//     inscripciones cuentan desde la fecha de la solicitud.

import type { FaqItem } from './faqs';
import { M40, fechaLarga } from './amparo-m40.ts';

const corte = fechaLarga(M40.plazos.corteInterno);

export const faqsAmparoM40: FaqItem[] = [
  {
    q: '¿Hasta cuándo puedo ampararme?',
    a: `El plazo para impugnar el acuerdo de forma directa es breve y ya está corriendo. Para trabajar con margen, recibimos expedientes hasta el ${corte}. Si el IMSS ya respondió una solicitud tuya aplicando el tope, el plazo es distinto y más corto: escríbenos de inmediato.`
  },
  {
    q: '¿Me sirve si empecé a cotizar después de 1997?',
    a: 'Por lo general no. La Modalidad 40 es atractiva sobre todo para quien se pensiona con la Ley de 1973. En el diagnóstico lo confirmamos con tus documentos.'
  },
  {
    // VERIFICAR: respeto de condiciones a quien ya está inscrito.
    q: 'Ya pago Modalidad 40, ¿me afecta?',
    a: 'Mientras dure el periodo que contrataste, conservas tus condiciones. Si tu periodo está por terminar y planeas reinscribirte, conviene revisar tu caso desde ahora.'
  },
  {
    // VERIFICAR: fin de la retroactividad en las inscripciones.
    q: '¿Puedo pagar meses atrasados?',
    a: 'Con las reglas nuevas, las inscripciones cuentan solo desde la fecha de la solicitud. Si en tu caso hay algo que defender sobre este punto, te lo diremos en el diagnóstico.'
  },
  {
    q: '¿Cuánto tarda el juicio?',
    a: 'No hay un tiempo fijo; depende del juzgado y de si hay recursos. Te explicamos cada etapa conforme avanza.'
  },
  {
    q: '¿Y si el Congreso cambia la ley?',
    a: 'Es posible. En ese caso el juicio podría quedar sin materia. Por eso explicamos este riesgo antes de que contrates.'
  },
  {
    q: '¿Por qué no usar un formato gratuito?',
    a: 'Un formato no decide qué vía te conviene, no lo adapta a tu régimen ni a tus fechas y no da seguimiento al juicio. Elegir mal la vía puede costarte el plazo.'
  },
  {
    q: '¿Atienden fuera de Jalisco?',
    a: 'Revisamos cada caso. Dónde se presenta el amparo depende de dónde se ejecuta el acto, así que lo confirmamos en el diagnóstico.'
  },
  {
    q: '¿Garantizan el resultado?',
    a: 'No. Nadie puede hacerlo. Lo que sí te damos es un análisis honesto, una estrategia clara y un precio cerrado.'
  }
];
