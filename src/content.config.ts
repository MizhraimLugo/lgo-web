// ════════════════════════════════════════════════════════════════
//  CONTENT COLLECTIONS — Grupo LGO
// ════════════════════════════════════════════════════════════════
//
// Astro 5 Content Layer API. Los archivos viven en src/content/perspectivas/
// como Markdown con frontmatter. Cada uno se publica como página individual
// y se agrega a los índices /perspectivas/, /abogados/perspectivas/ y
// /contadores/perspectivas/ según su `brand`.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const perspectivas = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/perspectivas'
  }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),

    // Brand origen del artículo. Determina filtros del blog y badge en cards.
    // Coincide con LgoPracticeId + 'grupo' (paraguas para temas transversales).
    brand: z.enum(['abogados', 'contadores', 'tecnologia', 'marketing', 'grupo']),

    category: z.string(),
    date: z.coerce.date(),

    author: z.object({
      name: z.string(),
      role: z.string().optional(),
      email: z.string().email().optional()
    }).optional(),

    /** Pregunta o frase de cierre destacada (caja naranja al final del cuerpo). */
    highlight: z.string().optional(),

    /** Si true, aparece prioritariamente en landing. */
    featured: z.boolean().optional().default(false),

    /** Si true, se omite del build y de los índices. */
    draft: z.boolean().optional().default(false)
  })
});

// ──────────────────────────────────────────────────────────────────
//  LEGAL — páginas de texto largo (aviso de privacidad, términos…)
// ──────────────────────────────────────────────────────────────────
//
// Markdown en src/content/legal/. Una página por archivo, renderizada por
// src/pages/<id>/index.astro. El cuerpo NO lleva su propio H1 ni la fecha:
// la página los compone desde `title` y `lastUpdated`, así que el documento
// queda con un solo <h1> y la fecha siempre coincide con el frontmatter.

const legal = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/legal'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Fecha visible bajo el título, en formato 'YYYY-MM-DD'. */
    lastUpdated: z.string(),
    /** Versión del aviso que se registra junto a cada consentimiento. */
    privacyVersion: z.string()
  })
});

export const collections = { perspectivas, legal };
