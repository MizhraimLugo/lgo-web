# Patrón "landing de herramienta"

Cascarón reutilizable para herramientas interactivas que viven en su **propia URL de
nivel superior** (no dentro de `/cursos/`). Hoy lo usa `/diagnostico/`; mañana lo hereda
`/marcas/` y cualquier otra. Pensado para que un futuro índice `/herramientas` las liste
todas con un hero/stats consistente.

## Piezas

| Pieza | Archivo | Rol |
|-------|---------|-----|
| **Layout** | `src/layouts/ToolLanding.astro` | Cascarón: hero (+ stats) → herramienta embebida (`<slot />`) → conversión final (`<slot name="conversion">`). Envuelve `Base` y le pasa el SEO. |
| **Teaser** | `src/components/herramientas/HerramientaFeature.astro` | Ficha destacada para promocionar la herramienta desde otra página (Inicio, `/cursos`, una sub-marca). Mismo tratamiento visual que `ContratosFeature`. |

## Cómo montar una herramienta nueva (ej. `/marcas/`)

1. **Crea la página** `src/pages/marcas/index.astro` y usa el layout:

   ```astro
   ---
   import ToolLanding from '@layouts/ToolLanding.astro';
   import { business } from '@data/business';

   const path = '/marcas/';
   const title = 'Buscador de disponibilidad de marca | Grupo LGO';
   const description = '…';

   const breadcrumbLd = {
     '@context': 'https://schema.org', '@type': 'BreadcrumbList',
     itemListElement: [
       { '@type': 'ListItem', position: 1, name: 'Inicio', item: business.url + '/' },
       { '@type': 'ListItem', position: 2, name: 'Marcas', item: business.url + path }
     ]
   };
   ---
   <ToolLanding
     title={title} description={description} path={path}
     extraJsonLd={[breadcrumbLd]}
     eyebrow="Herramienta gratuita"
     heading="Revisa si tu marca está disponible."
     lead="…"
     ctaLabel="Empezar"
     ctaHref="#tool"
     stats={[{ num: 3, label: 'pasos' }, { num: '~5', label: 'minutos' }]}
   >
     <!-- La herramienta en sí (widget, formulario, etc.) -->
     <section id="tool" class="section">…</section>

     <!-- Conversión al final (opcional). Estática, vía el slot "conversion": -->
     <CtaBand slot="conversion" title="¿Quieres registrarla con nosotros?" … />
   </ToolLanding>
   ```

   - **Hero, stats y CTA** salen de props del layout — consistentes entre herramientas.
   - **La herramienta** va en el slot por defecto (todo lo que pongas entre las etiquetas
     `<ToolLanding>`, sin `slot`).
   - **La conversión final** es opcional:
     - *Estática* → pásala con `slot="conversion"` (lo que hará `/marcas`).
     - *Dinámica* → móntala dentro de la propia herramienta (lo que hace `/diagnostico`,
       cuyo CTA se arma con el resultado del cuestionario). En ese caso no uses el slot.

2. **SEO**: el `canonical`, `<title>`, `meta description` y las `og:*` los resuelve
   `Base`/`Seo` a partir de `title`, `description` y `path`. El `canonical` es
   self-referential salvo que pases `canonical` explícito. Añade tu JSON-LD con
   `extraJsonLd`.

3. **Teaser en otra página**: importa `HerramientaFeature` y pásale el texto:

   ```astro
   import HerramientaFeature from '@components/herramientas/HerramientaFeature.astro';
   …
   <HerramientaFeature
     eyebrow="Nuevo · Herramienta gratuita"
     title="Revisa si tu marca está disponible."
     body="…"
     bullets={['Búsqueda IMPI', 'Clases sugeridas', 'Siguiente paso']}
     ctaLabel="Ir al buscador →"
     ctaHref="/marcas/"
   />
   ```

   El visual del panel es un `<slot name="visual">`: por defecto muestra el panel de
   diagnóstico (score + barras). Para otra herramienta, o bien lo dejas (neutro) o le
   pasas tu propio visual:

   ```astro
   <HerramientaFeature title="…" ctaHref="/marcas/">
     <div slot="visual">…tu mock…</div>
   </HerramientaFeature>
   ```

4. **Descubrimiento**: las herramientas viven en el dropdown **"Herramientas ▾"** del nav
   (cuyo label lleva al índice `/herramientas`), en la sección "Herramientas gratuitas" de
   Inicio, en el cruce desde secciones afines (ej. `/marcas` desde `/abogados`) y por SEO.
   El dropdown del nav, el índice `/herramientas` y la sección del home iteran la misma
   fuente única — `src/data/herramientas.ts` — con `HerramientaCard.astro` como tarjeta:
   publicar una herramienta ahí (`published: true`) la añade a los tres a la vez.

## Nota sobre `/diagnostico`
Es la referencia viva del patrón: `src/pages/diagnostico/index.astro` (herramienta con
gate + cuestionario + resultado dinámico) y el teaser en `src/pages/index.astro`. La lógica
de las 50 preguntas y el scoring vive en `src/data/diagnostico.ts`.
