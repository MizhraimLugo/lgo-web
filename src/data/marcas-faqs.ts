// Preguntas frecuentes de la herramienta /marcas.
//
// PENDIENTE DE APROBACIÓN DE COPY LEGAL: cada respuesta toca plazos legales.
// El texto se deriva EXCLUSIVAMENTE de hechos ya verificados y aprobados que
// aparecen en la propia página (artículos 178, 237, 233 y 21 de la Ley Federal
// de Protección a la Propiedad Industrial y los cortes del 10/08/2018 y
// 05/11/2020). No introduce ninguna afirmación legal nueva.
//
// Formato pensado para GEO/AEO: cada respuesta es autónoma (se puede citar sin
// el párrafo anterior), arranca con la conclusión y pega el artículo al hecho
// en la misma oración. Se muestra con el componente <Faq> y se expone como
// FAQPage en JSON-LD desde src/pages/marcas/index.astro.

import type { FaqItem } from './faqs';

export const faqsMarcas: FaqItem[] = [
  {
    q: '¿Cada cuándo se renueva una marca registrada en México?',
    a: 'Una marca registrada se renueva cada 10 años. La ventana de renovación abre seis meses antes del vencimiento y, si se deja pasar, hay un periodo de gracia de seis meses posteriores con tarifa adicional (artículos 178 y 237 de la Ley Federal de Protección a la Propiedad Industrial). La renovación incluye la declaración de uso correspondiente.'
  },
  {
    q: '¿Desde qué fecha se cuentan los 10 años de vigencia de una marca?',
    a: 'Los diez años se cuentan desde la fecha de otorgamiento del registro (la que aparece en el título). La excepción son las marcas otorgadas antes del 5 de noviembre de 2020, cuya vigencia se cuenta desde la fecha de presentación de la solicitud.'
  },
  {
    q: '¿Qué es la declaración de uso de tercer año y cuándo se presenta?',
    a: 'La declaración de uso de tercer año es una obligación que se presenta dentro de los tres meses posteriores al tercer aniversario del otorgamiento del registro; omitirla produce la caducidad de la marca (artículo 233 de la Ley Federal de Protección a la Propiedad Industrial). Solo aplica a marcas otorgadas a partir del 10 de agosto de 2018.'
  },
  {
    q: '¿Qué pasa si no renuevo mi marca a tiempo?',
    a: 'Si no renuevas dentro de la ventana, todavía cuentas con un periodo de gracia de seis meses posteriores al vencimiento para hacerlo con una tarifa adicional (artículo 237 de la Ley Federal de Protección a la Propiedad Industrial). Pasado ese periodo de gracia, el registro se pierde.'
  },
  {
    q: '¿Mi marca necesita la declaración de uso de tercer año?',
    a: 'Solo si fue otorgada el 10 de agosto de 2018 o después. Las marcas otorgadas antes de esa fecha no presentan declaración de uso de tercer año por separado: su uso se declara junto con la renovación (artículo 233 de la Ley Federal de Protección a la Propiedad Industrial).'
  }
];
