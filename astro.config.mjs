// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { M40 } from './src/data/amparo-m40.ts';
import { AVISO_PRIVACIDAD_PATH, AVISO_PRIVACIDAD_VERSION } from './src/data/aviso-privacidad.ts';

// ── lastmod del sitemap ──
//
// Solo se declara donde hay una fecha REAL que respalde la afirmación. Poner
// la fecha del build en todas las URL diría que el sitio entero cambió hoy,
// que es falso y a la larga se descuenta. Las que no tienen fuente de fecha
// salen sin lastmod, que es lo correcto: la ausencia no penaliza.
//
//   · artículos de /perspectivas → el `date` de su frontmatter
//   · /pensiones/amparo-modalidad-40/ → `M40.ultimaActualizacion`
//   · /aviso-de-privacidad/ → la versión del aviso (una prueba la mantiene
//     igual al frontmatter del documento)

/** @type {Map<string, string>} ruta → fecha ISO (YYYY-MM-DD) */
const fechas = new Map([
  ['/pensiones/amparo-modalidad-40/', M40.ultimaActualizacion],
  [AVISO_PRIVACIDAD_PATH, AVISO_PRIVACIDAD_VERSION]
]);

for (const archivo of readdirSync('./src/content/perspectivas').filter((f) => f.endsWith('.md'))) {
  const crudo = readFileSync(`./src/content/perspectivas/${archivo}`, 'utf8');
  const m = crudo.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?/m);
  if (m) fechas.set(`/perspectivas/${archivo.replace(/\.md$/, '')}/`, m[1]);
}

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
      // Agrega lastmod solo a las URL con fecha conocida; el resto queda igual.
      serialize: (item) => {
        const ruta = new URL(item.url).pathname;
        const fecha = fechas.get(ruta);
        return fecha ? { ...item, lastmod: new Date(`${fecha}T12:00:00Z`) } : item;
      },
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
