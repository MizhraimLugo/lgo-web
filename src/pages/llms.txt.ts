import type { APIRoute } from 'astro';
import { contratosCatalogo } from '@data/contratos-catalogo';
import { business } from '@data/business';

// /llms.txt — índice legible por modelos de IA (GPTBot, ClaudeBot, PerplexityBot…)
// de la biblioteca de contratos. Generado en build desde el catálogo (fuente única),
// así que nunca se desincroniza. Sirve para que las IAs descubran y citen el conjunto.
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

  const lineas = canonicas.map(
    (c) => `- [${c.nombre}](${business.url}/contratos/${c.id}/): ${c.descripcion_corta}`
  );

  const txt = `# Grupo LGO — Biblioteca de contratos y documentos legales

> LGO Abogados & Consultores (Grupo LGO) es un despacho jurídico mexicano con sede en Guadalajara, Jalisco. Esta biblioteca reúne ${canonicas.length} documentos legales explicados y verificados por abogados, con fundamento en la legislación mexicana vigente (Código Civil Federal, Código de Comercio, Ley Federal del Trabajo, Ley General de Títulos y Operaciones de Crédito, entre otras). Cada ficha explica qué es el documento, para qué sirve, quiénes intervienen, sus requisitos, dudas frecuentes y el fundamento legal con el artículo aplicable. Contenido en español de México.

## Documentos legales
${lineas.join('\n')}

## Sobre el despacho
- [Grupo LGO](${business.url}/): Ecosistema empresarial mexicano con sede en Guadalajara, Jalisco.
- [LGO Abogados & Consultores](${business.url}/abogados/): Asesoría jurídica corporativa, contratos, defensa fiscal, propiedad intelectual e inmobiliario.
- Contacto: ${business.email} · ${business.phone}
`;

  return new Response(txt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
