// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// El sitio se publica en dos lugares distintos:
//
//   - Dominio propio (producción): raíz del dominio. Es lo que sale por
//     defecto, sin configurar nada.
//   - GitHub Pages (vista previa): cuelga de /c2kweb. El workflow de deploy
//     define SITE_URL y BASE_PATH para ese caso.
//
// Así la vista previa no ensucia la configuración de producción.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.carreteras2000.com.ar',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
