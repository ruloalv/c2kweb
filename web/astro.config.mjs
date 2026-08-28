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
  // La página de precios es una herramienta interna: no va al sitemap ni a Google.
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/precios') })],
  build: {
    inlineStylesheets: 'auto',
    // 'file' genera vecinos.html en vez de vecinos/index.html.
    // Con eso /vecinos responde 200 directo, sin el 301 a /vecinos/ que hace
    // GitHub Pages con los directorios. Muchos agentes no siguen redirecciones
    // y se quedan afuera.
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
