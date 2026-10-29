// ════════════════════════════════════════════════════════════════
//  AVISO DE PRIVACIDAD — textos reutilizables (Anexos A y B)
// ════════════════════════════════════════════════════════════════
//
// El aviso INTEGRAL vive en src/content/legal/aviso-de-privacidad.md y se
// publica en /aviso-de-privacidad/. Ese documento termina en el apartado XII:
// los dos anexos no son parte del texto público, sino material que el sitio
// usa en otros lugares, y por eso viven aquí.
//
//   · Anexo A → el aviso simplificado que acompaña a cada formulario
//     (artículo 16, fracción II de la Ley). Lo renderiza
//     src/components/AvisoSimplificado.astro.
//   · Anexo B → la leyenda del primer contacto por WhatsApp. No se muestra
//     en el sitio: se guarda aquí para que la respuesta automática use el
//     mismo texto que aprobó el área legal.
//
// Módulo PURO: lo importan plantillas .astro, el <script> cliente de las
// islas y las pruebas en Node.

/** Ruta canónica del aviso integral. Un solo lugar que cambiar si se mueve. */
export const AVISO_PRIVACIDAD_PATH = '/aviso-de-privacidad/';

/**
 * Versión del aviso vigente. Viaja con cada consentimiento, para saber qué
 * texto aceptó la persona. DEBE coincidir con `privacyVersion` del frontmatter
 * de src/content/legal/aviso-de-privacidad.md; una prueba lo verifica.
 */
export const AVISO_PRIVACIDAD_VERSION = '2026-10-28';

/** Cómo se muestra esa ruta en texto corrido. */
export const AVISO_PRIVACIDAD_ETIQUETA = 'www.lgo.mx/aviso-de-privacidad';

/** Correo del Departamento de Datos Personales. */
export const AVISO_PRIVACIDAD_CORREO = 'contacto@lgo.mx';

/** Título en negritas con el que abre el aviso simplificado. */
export const AVISO_SIMPLIFICADO_TITULO = 'Aviso de privacidad simplificado.';

/**
 * Anexo A, párrafo único. `{correo}` y `{aviso}` son los dos puntos que el
 * componente convierte en enlace; en texto plano se sustituyen por su valor.
 * No se edita sin pasar por el área legal.
 */
export const AVISO_SIMPLIFICADO_TEXTO =
  'Grupo LGO (LGO Abogados & Consultores, S.C. y LGO Servicios Digitales Contables, S.A.S.), ' +
  'con domicilio en Calle Lorenzana 781, Col. Jardines del Bosque, C.P. 44520, Guadalajara, ' +
  'Jalisco, tratará su nombre, teléfono, correo electrónico y la información que capture en ' +
  'este formulario para atender su solicitud, dar seguimiento a su asunto y, si usted lo ' +
  'autoriza, enviarle información de nuestros servicios. No capture datos personales ' +
  'sensibles. Puede limitar el uso de sus datos y ejercer sus derechos ARCO escribiendo a ' +
  '{correo}. Consulte el aviso de privacidad integral en {aviso}.';

/** Las dos casillas del Anexo A. La de mercadotecnia va desmarcada. */
export const AVISO_CASILLAS = {
  obligatoria: {
    name: 'aviso',
    texto:
      'He leído el aviso de privacidad y acepto el tratamiento de mis datos para atender mi solicitud.'
  },
  mercadotecnia: {
    name: 'mercadotecnia',
    texto: 'Acepto recibir información comercial, boletines y novedades de Grupo LGO.'
  }
} as const;

/**
 * Anexo B. Leyenda del primer contacto por WhatsApp; la usa la respuesta
 * automática, no el sitio.
 */
export const WHATSAPP_LEYENDA_PRIVACIDAD =
  'Gracias por escribir a Grupo LGO. Tratamos sus datos de contacto y los mensajes que nos ' +
  'envíe para atender su solicitud y dar seguimiento a su asunto. Le pedimos no enviar por ' +
  'este medio datos sensibles ni documentos con información de salud; le indicaremos un canal ' +
  `seguro para ello. Aviso de privacidad integral: ${AVISO_PRIVACIDAD_ETIQUETA}`;

/** El aviso simplificado en texto plano, para correos y registros. */
export function avisoSimplificadoTextoPlano(): string {
  return AVISO_SIMPLIFICADO_TEXTO.replace('{correo}', AVISO_PRIVACIDAD_CORREO).replace(
    '{aviso}',
    AVISO_PRIVACIDAD_ETIQUETA
  );
}

/**
 * Parte el texto del Anexo A en tramos para renderizarlo con enlaces:
 * cada tramo es texto corrido o uno de los dos marcadores.
 */
export type TramoAviso =
  | { tipo: 'texto'; valor: string }
  | { tipo: 'correo' }
  | { tipo: 'aviso' };

export function tramosAvisoSimplificado(): TramoAviso[] {
  const tramos: TramoAviso[] = [];
  const partes = AVISO_SIMPLIFICADO_TEXTO.split(/(\{correo\}|\{aviso\})/);
  for (const parte of partes) {
    if (parte === '{correo}') tramos.push({ tipo: 'correo' });
    else if (parte === '{aviso}') tramos.push({ tipo: 'aviso' });
    else if (parte) tramos.push({ tipo: 'texto', valor: parte });
  }
  return tramos;
}
