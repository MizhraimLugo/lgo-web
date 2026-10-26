// ════════════════════════════════════════════════════════════════
//  ANALÍTICA — configuración y consentimiento
// ════════════════════════════════════════════════════════════════
//
// El aviso de privacidad (apartado VIII) dice que la analítica del sitio es
// Google Analytics cargado mediante Google Tag Manager, y que **solo se
// activa si la persona la acepta**. Este módulo guarda esa configuración y
// las claves del consentimiento; quien lo aplica es
// src/components/CookieConsent.astro.
//
// Mientras `GTM_ID` esté vacío NO se carga nada, acepte o no la persona: el
// contenedor todavía no existe. Al darlo de alta basta ponerlo aquí y la
// analítica queda condicionada al consentimiento desde el primer despliegue.

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
 */
export const CONSENT_VERSION = 1;

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
  }
] as const;

export type ConsentimientoCookies = {
  version: number;
  analiticas: boolean;
  /** Momento de la elección, en ISO. Sirve como constancia. */
  fecha: string;
};
