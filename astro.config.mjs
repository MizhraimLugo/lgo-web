// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://lgo.mx',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      // Páginas excluidas del sitemap:
      //  - /gracias/  → confirmación post-form (noindex)
      //  - /404       → página de error
      //  - /soy_emlg/ → página oculta en public/ (marca personal, noindex)
      //  - /contratos → autoservicio de contratos (noindex hasta lanzamiento)
      // Las páginas en public/ tampoco entran al sitemap por defecto, pero
      // dejamos el filtro explícito por claridad.
      filter: (page) =>
        !page.includes('/gracias/') &&
        !page.includes('/404') &&
        !page.includes('/soy_emlg') &&
        !page.includes('/contratos')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
