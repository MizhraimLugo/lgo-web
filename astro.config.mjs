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

  // ── Alias de la división de administración inmobiliaria ──
  // La URL canónica de la sección es /administracion-de-condominios/.
  // /administradores/ queda como alias permanente para no perder enlaces
  // escritos a mano ni referencias externas al nombre corto.
  //
  // Nota: en build estático (sin adapter) Astro resuelve esto con una página de
  // redirección HTML (meta refresh + rel=canonical), no con un 301 HTTP real.
  // Si se necesita el 301 a nivel de servidor, se declara además en netlify.toml
  // como los de /contratos y /diagnostico.
  redirects: {
    '/administradores': { status: 301, destination: '/administracion-de-condominios/' }
  },
  integrations: [
    sitemap({
      // Páginas excluidas del sitemap:
      //  - /gracias/  → confirmación post-form (noindex)
      //  - /404       → página de error
      //  - /soy_emlg/ → página oculta en public/ (marca personal, noindex)
      //  - URLs NO canónicas de /contratos: las 21 versiones "-negocios"
      //    (rel=canonical → su General) y el duplicado donacion-bien-inmueble-2
      //    (301 → donacion-bien-inmueble). Las canónicas (landing + 51 fichas)
      //    SÍ entran. Coherente con /llms.txt y la consolidación de Fase E.
      // Las páginas en public/ tampoco entran al sitemap por defecto, pero
      // dejamos el filtro explícito por claridad.
      filter: (page) =>
        !page.includes('/gracias/') &&
        !page.includes('/404') &&
        !page.includes('/soy_emlg') &&
        !page.endsWith('-negocios/') &&
        !page.includes('/contratos/donacion-bien-inmueble-2/')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
