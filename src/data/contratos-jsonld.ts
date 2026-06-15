// ════════════════════════════════════════════════════════════════
//  JSON-LD por página para /contratos  (AEO / GEO)
// ════════════════════════════════════════════════════════════════
//
// Genera el structured data específico de cada ficha y del catálogo,
// que Base.astro inyecta vía la prop `extraJsonLd` (además del schema
// global de Organization/LocalBusiness/WebSite).
//
// REGLA DURA: los datos legales (fundamento_legal, respuestas de las
// dudas) se toman VERBATIM del JSON de la ficha. Aquí no se inventa ni
// se reformula contenido legal — solo se reestructura como Schema.org.
//
// Nota AEO: las "Dudas frecuentes" se marcan como FAQPage. Google retiró
// los rich results de FAQ (mayo 2026), así que el valor de este marcado
// es la CITACIÓN por IAs (ChatGPT, Perplexity, AI Overviews), no un
// rich result en el SERP. Es FAQPage (no QAPage) porque son preguntas
// frecuentes respondidas por el despacho, no Q&A de foro de usuarios.

import type { ContratoCatalogo } from './contratos-catalogo';
import { contratosCatalogo } from './contratos-catalogo';
import { business } from './business';

// Fecha de la revisión jurídica formal de las 73 fichas (confirmada por el despacho).
// Fuente única: se usa en el schema (datePublished/dateModified) y en el byline visible.
export const FECHA_REVISION_ISO = '2026-01-01';
export const FECHA_REVISION_TEXTO = 'enero de 2026';

const clean = (l: string): string => l.replace(/[#*]/g, '').replace(/\s+/g, ' ').trim();

export interface Faq {
  q: string;
  a: string;
}

/**
 * Extrae los pares pregunta/respuesta de la sección "Dudas frecuentes"
 * de la explicación (markdown). Robusto a las variantes de marcado del
 * corpus: encabezado con o sin `#`, preguntas en `**…?**` / `***…?***` /
 * `### **…?**`, y respuestas en párrafo o en lista. Si no hay sección o
 * no se reconocen pares, devuelve [] (la ficha no emite FAQPage).
 */
export function extraerFaqs(explicacion: string): Faq[] {
  const raw = (explicacion || '').split('\n').map((s) => s.trim()).filter(Boolean);
  const i = raw.findIndex((l) => /^dudas frecuentes/i.test(clean(l)));
  if (i === -1) return [];
  const faqs: Faq[] = [];
  let q: string | null = null;
  let ans: string[] = [];
  const push = () => {
    const a = ans.join(' ').replace(/\s+/g, ' ').trim();
    if (q && a) faqs.push({ q, a });
  };
  for (let j = i + 1; j < raw.length; j++) {
    const line = raw[j];
    const c = clean(line);
    if (!c) continue;
    const esPregunta = /^¿.*\?$/.test(c) && c.length < 200;
    if (esPregunta) {
      push();
      q = c;
      ans = [];
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      push();
      q = null;
      break;
    }
    if (q) ans.push(c.replace(/^[*-]\s*/, ''));
  }
  push();
  return faqs;
}

interface ContratoData {
  explicacion: string;
  fundamento_legal: string;
}

/** JSON-LD de una ficha: BreadcrumbList + Article(+citation) + FAQPage. */
export function contratoJsonLd(
  contrato: ContratoCatalogo,
  data: ContratoData
): Record<string, unknown>[] {
  const url = `${business.url}/contratos/${contrato.id}/`;
  const blocks: Record<string, unknown>[] = [];

  blocks.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Contratos', item: `${business.url}/contratos/` },
      { '@type': 'ListItem', position: 2, name: contrato.nombre, item: url }
    ]
  });

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: contrato.nombre,
    description: contrato.descripcion_corta,
    url,
    mainEntityOfPage: url,
    inLanguage: 'es-MX',
    datePublished: FECHA_REVISION_ISO,
    dateModified: FECHA_REVISION_ISO,
    image: `${business.url}/og-default.jpg`,
    about: { '@type': 'Thing', name: contrato.nombre },
    author: { '@id': `${business.url}/#abogados` },
    publisher: { '@id': `${business.url}/#organization` },
    isPartOf: { '@id': `${business.url}/#website` }
  };
  // Fundamento legal VERBATIM (solo si la ficha lo tiene).
  if (data.fundamento_legal && data.fundamento_legal.trim()) {
    article.citation = data.fundamento_legal.trim();
  }
  blocks.push(article);

  const faqs = extraerFaqs(data.explicacion);
  if (faqs.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#dudas`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }

  return blocks;
}

/** JSON-LD del catálogo /contratos/: BreadcrumbList + CollectionPage(ItemList). */
export function catalogoJsonLd(): Record<string, unknown>[] {
  const url = `${business.url}/contratos/`;
  const ordenados = [...contratosCatalogo].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, 'es')
  );
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Contratos', item: url }]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name: 'Contratos y documentos legales',
      description:
        'Catálogo de documentos legales que prepara Grupo LGO, explicados y verificados por abogados.',
      url,
      inLanguage: 'es-MX',
      isPartOf: { '@id': `${business.url}/#website` },
      about: { '@id': `${business.url}/#abogados` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: ordenados.length,
        itemListElement: ordenados.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: c.nombre,
          url: `${business.url}/contratos/${c.id}/`
        }))
      }
    }
  ];
}
