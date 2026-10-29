// ════════════════════════════════════════════════════════════════
//  PIXEL DE META — configuración
// ════════════════════════════════════════════════════════════════
//
// El pixel mide dos cosas y nada más: que alguien vio una página y que alguien
// salió a WhatsApp desde ella. No hay formulario de conversión en la landing de
// Modalidad 40, así que el clic a WhatsApp ES la conversión.
//
// Quien aplica esta configuración es src/components/MetaPixel.astro, y solo
// después de que la persona acepte las cookies publicitarias. El consentimiento
// lo administra src/components/CookieConsent.astro, que es su única fuente de
// verdad; este módulo no lo consulta ni lo guarda.
//
// El identificador NO va incrustado en ninguna plantilla: sale de la variable
// de entorno `PUBLIC_META_PIXEL_ID`, que se da de alta en Netlify. Sin ella el
// pixel no se carga, acepte o no la persona.
//
// Módulo PURO: lo importan plantillas .astro, el <script> cliente del
// componente y las pruebas en Node.

/**
 * Lectura de `PUBLIC_META_PIXEL_ID`.
 *
 * Astro sustituye `import.meta.env.PUBLIC_*` EN TIEMPO DE COMPILACIÓN, no en el
 * navegador: dar de alta la variable en Netlify no surte efecto hasta el
 * siguiente despliegue. En Node (las pruebas) `import.meta.env` no existe, de
 * ahí el acceso opcional.
 */
function leerId(): string {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  return (env?.PUBLIC_META_PIXEL_ID ?? '').trim();
}

/** Identificador del pixel. Cadena vacía = pixel apagado en todo el sitio. */
export const META_PIXEL_ID = leerId();

/**
 * Si el pixel debe operar. Una sola condición, en un solo lugar, para que la
 * plantilla y el script cliente no la escriban cada uno a su manera.
 */
export function pixelActivo(id: string = META_PIXEL_ID): boolean {
  return id.length > 0;
}

/**
 * Nombre de la landing de Modalidad 40. Viaja como `content_name` en el
 * `ViewContent` de la página y en el `Contact` de sus botones de WhatsApp.
 */
export const CONTENT_NAME_M40 = 'Amparo Modalidad 40';

/**
 * Nombre del envío de la autoevaluación. Se distingue del anterior a propósito:
 * quien termina la prueba y manda sus respuestas trae más intención que quien
 * pulsa un botón de la página, y en el Administrador de eventos los dos casos
 * deben poder separarse.
 */
export const CONTENT_NAME_M40_AUTOEVALUACION = 'Amparo Modalidad 40 - Autoevaluación';

/**
 * Evento de DOM con el que una isla avisa de una salida a WhatsApp que NO es un
 * clic en enlace (la autoevaluación abre la ventana con `window.open`). Un
 * escucha delegado no vería esas salidas; este evento las lleva a la misma
 * puerta de entrada que los clics.
 *
 * Detalle: `{ contentName?: string }`. Sin él se usa el nombre de la página.
 */
export const EVENTO_WHATSAPP = 'lgo:whatsapp';

/**
 * Ventana contra repetición del evento `Contact`, en milisegundos.
 *
 * La autoevaluación abre WhatsApp y además deja a la vista un enlace manual de
 * reintento: son dos caminos a la misma conversión y sin esta ventana se
 * contaría dos veces. Dos segundos cubren ese caso sin descartar clics
 * genuinamente distintos.
 */
export const VENTANA_ANTIRREPETICION_MS = 2000;
