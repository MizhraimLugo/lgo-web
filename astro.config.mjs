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
      // /gracias/ y /404 no deben indexarse.
      filter: (page) => !page.includes('/gracias/') && !page.includes('/404')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
