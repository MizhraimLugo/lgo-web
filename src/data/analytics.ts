// ════════════════════════════════════════════════════════════════
//  ANALÍTICA Y PUBLICIDAD — configuración y consentimiento
// ════════════════════════════════════════════════════════════════
//
// El aviso de privacidad (apartado VIII) declara qué tecnologías de rastreo
// usa el sitio y que **ninguna se activa sin que la persona la acepte**. Este
// módulo guarda esa configuración y el contrato del consentimiento; quien lo
// aplica es src/components/CookieConsent.astro, que es su única fuente de
// verdad.
//
// Dos categorías opcionales, cada una con su propio interruptor:
//
//   · analiticas    → Google Analytics mediante Google Tag Manager.
//                     Mientras `GTM_ID` esté vacío NO se carga nada, acepte o
//                     no la persona: el contenedor todavía no existe.
//   · publicitarias → Pixel de Meta. Se configura en @data/meta-pixel y lo
//                     aplica src/components/MetaPixel.astro. Sin la variable
//                     `PUBLIC_META_PIXEL_ID` tampoco se carga nada.
//
// Cómo lo consulta quien depende del consentimiento: `window.lgoConsentimiento()`
// al arrancar, y el evento `EVENTO_CONSENTIMIENTO` para los cambios posteriores.
// Hacen falta los dos. Ver la nota de la condición de carrera en CookieConsent.

/**
 * Contenedor de Google Tag Manager, con el formato `GTM-XXXXXXX`.
 * Vacío = analítica apagada en todo el sitio.
 */
export const GTM_ID = '';

/** Clave de localStorage donde se guarda la elección de la persona. */
export const CONSENT_KEY = 'lgo:cookies';

/**
 * Versión del esquema de consentimiento. Si cambian las categorías de
 * cookies, se sube este número y el banner vuelve a preguntar.
 *
 * v2: entra la categoría `publicitarias` (pixel de Meta). Quien ya había
 * elegido con el esquema v1 nunca dijo nada sobre publicidad, así que se le
 * pregunta de nuevo; dar por aceptado lo que no se preguntó no es una opción.
 */
export const CONSENT_VERSION = 2;

/**
 * Evento de DOM que dispara el banner cada vez que aplica una elección, con el
 * consentimiento vigente en `detail`. También se dispara al retirarlo, para que
 * los scripts que dependen de él puedan dejar de enviar en el acto.
 */
export const EVENTO_CONSENTIMIENTO = 'lgo:consentimiento';

/**
 * Copia del banner, el primer nivel de la pregunta.
 *
 * Vive aquí, junto a CATEGORIAS, a propósito: el texto resume las categorías,
 * así que si cambian las categorías tiene que cambiar en el mismo lugar.
 * Tenerlo escrito a mano en la plantilla fue lo que dejó al banner hablando de
 * dos categorías cuando ya eran tres, con el pixel activándose desde
 * «Aceptar todas» sin que el texto lo dijera.
 *
 * Nombra el Pixel de Meta, que es un nombre comercial: otra razón para que sea
 * una constante y no texto incrustado.
 */
export const BANNER_TITULO = 'Cookies en lgo.mx';
export const BANNER_TEXTO =
  'Las necesarias hacen funcionar el sitio. Las analíticas y las publicitarias (Pixel de Meta), solo si las aceptas.';

/** Categorías de cookies del aviso. Las necesarias no se pueden desactivar. */
export const CATEGORIAS = [
  {
    id: 'necesarias',
    titulo: 'Necesarias',
    texto:
      'Permiten el funcionamiento del sitio, el envío de formularios, el procesamiento de pagos y el registro de su elección sobre cookies. No pueden desactivarse.',
    obligatoria: true
  },
  {
    id: 'analiticas',
    titulo: 'Analíticas',
    texto:
      'Google Analytics, mediante Google Tag Manager, para medir visitas y uso del sitio. Solo se activan si usted las acepta.',
    obligatoria: false
  },
  {
    id: 'publicitarias',
    titulo: 'Publicitarias',
    texto:
      'Pixel de Meta (Facebook e Instagram), para medir el resultado de nuestras campañas y mostrar anuncios a quienes visitaron el sitio. Meta recibe datos técnicos de su navegación en este sitio. Solo se activan si usted las acepta.',
    obligatoria: false
  }
] as const;

export type ConsentimientoCookies = {
  version: number;
  analiticas: boolean;
  publicitarias: boolean;
  /** Momento de la elección, en ISO. Sirve como constancia. */
  fecha: string;
};

declare global {
  interface Window {
    /**
     * Consentimiento vigente, de solo lectura. Lo define el banner y devuelve
     * una copia congelada, o `null` si la persona todavía no ha elegido.
     * Nadie de fuera del banner puede cambiar la elección.
     */
    readonly lgoConsentimiento?: () => ConsentimientoCookies | null;
  }
}
