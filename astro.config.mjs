// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Statische Seiten + Node-Adapter (standalone): nur /api/kontakt läuft serverseitig
// (prerender = false). Gebaut wird ein Node-Server (dist/server/entry.mjs), den
// Scalingo startet. `site` wird für canonical URLs und die Sitemap gebraucht.
export default defineConfig({
  site: 'https://www.dachdecker-hermann.de',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
