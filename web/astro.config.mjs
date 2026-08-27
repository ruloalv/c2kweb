// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio real del sitio: lo usan el sitemap, el canonical y las etiquetas
  // para redes sociales. Si cambia el dominio, se cambia acá.
  site: 'https://www.carreteras2000.com.ar',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
