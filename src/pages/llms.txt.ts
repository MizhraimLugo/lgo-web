import type { APIRoute } from 'astro';
import { contratosCatalogo } from '@data/contratos-catalogo';
import { publishedHerramientas } from '@data/herramientas';
import { business } from '@data/business';
import { M40, fechaLarga, precioCorto } from '@data/amparo-m40';

// /llms.txt — índice legible por modelos de IA (GPTBot, ClaudeBot, PerplexityBot…)
// del sitio. Generado en build desde los data layers, así que nunca se desincroniza:
// agregar un contrato, una herramienta o un servicio lo actualiza solo.
//
// Nota honesta sobre su alcance: no hay evidencia pública de que los modelos lo usen
// para decidir a quién citan, y Google ha dicho que no lo consume. Se mantiene por
// coherencia —si el archivo existe, debe describir el sitio entero y no una sección—,
// no porque se espere un efecto medible.
//
// Se listan solo las URLs CANÓNICAS: se omiten las versiones "-negocios" que
// duplican a una General (mismo contenido visible) y el duplicado puro
// donacion-bien-inmueble-2 — coherente con la consolidación vía rel=canonical.

export const prerender = true;

export const GET: APIRoute = () => {
  const ids = new Set(contratosCatalogo.map((c) => c.id));
  const canonicas = contratosCatalogo
    .filter((c) => {
      if (c.id === 'donacion-bien-inmueble-2') return false;
      if (c.id.endsWith('-negocios')) {
        const base = c.id.replace(/-negocios$/, '');
        if (ids.has(base)) return false;
      }
      return true;
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  const herramientas = publishedHerramientas.map(
    (h) => `- [${h.name}](${business.url}${h.url}): ${h.description}`
  );

  const lineas = canonicas.map(
    (c) => `- [${c.nombre}](${business.url}/contratos/${c.id}/): ${c.descripcion_corta}`
  );

  const txt = `# Grupo LGO — Despacho jurídico y contable en Guadalajara

> Grupo LGO es un ecosistema de firmas mexicanas con sede en Guadalajara, Jalisco: LGO Abogados & Consultores (jurídico), LGO Contadores & Consultores (contable y fiscal) y LGO Administradores Inmobiliarios (administración de condominios y plazas comerciales). Este índice reúne lo que el sitio publica: servicios, herramientas gratuitas de autodiagnóstico y una biblioteca de ${canonicas.length} documentos legales explicados y verificados por abogados, con fundamento en la legislación mexicana vigente (Código Civil Federal, Código de Comercio, Ley Federal del Trabajo, Ley General de Títulos y Operaciones de Crédito, entre otras). Cada ficha explica qué es el documento, para qué sirve, quiénes intervienen, sus requisitos, dudas frecuentes y el fundamento legal con el artículo aplicable. Contenido en español de México. Última revisión de la sección de pensiones: ${fechaLarga(M40.ultimaActualizacion)}.

## Pensiones y seguridad social
- [Amparo contra el tope del IMSS a la Modalidad 40](${business.url}/pensiones/amparo-modalidad-40/): el IMSS limitó, mediante un acuerdo de su Consejo Técnico, el salario con el que se puede ingresar a la Modalidad 40. La página explica qué cambió, por qué puede impugnarse, los riesgos de hacerlo —incluido que todavía no hay sentencias sobre ese acuerdo— y el precio cerrado del servicio: diagnóstico ${precioCorto(M40.precios.diagnostico)}, amparo completo ${precioCorto(M40.precios.amparo)}. Incluye una autoevaluación de cinco preguntas y nueve preguntas frecuentes sobre plazos, requisitos y alcance.
- [Servicios de pensiones](${business.url}/pensiones/): el área de LGO Abogados dedicada a seguridad social y pensiones.

## Herramientas gratuitas
${herramientas.join('\n')}

## Documentos legales
${lineas.join('\n')}

## Sobre el despacho
- [Grupo LGO](${business.url}/): Ecosistema empresarial mexicano con sede en Guadalajara, Jalisco.
- [LGO Abogados & Consultores](${business.url}/abogados/): Asesoría jurídica corporativa, contratos, defensa fiscal, propiedad intelectual e inmobiliario.
- [Aviso de privacidad](${business.url}/aviso-de-privacidad/): cómo trata Grupo LGO los datos personales.
- Contacto: ${business.email} · ${business.phone}
- Domicilio: ${business.address.full}
`;

  return new Response(txt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
