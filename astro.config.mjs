// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.yellowiot.nl',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Formulier-bevestiging en 404 horen niet in de zoekresultaten
      filter: (page) => !page.includes('/verstuurd/') && !page.includes('/404'),
    }),
  ],
  env: {
    schema: {
      // Zet deze in Netlify (Site configuration → Environment variables) en deploy opnieuw.
      SPONSOR_RAISED: envField.number({ context: 'server', access: 'public', default: 600 }),
      SPONSOR_GOAL: envField.number({ context: 'server', access: 'public', default: 3500 }),
    },
  },
  fonts: [
    {
      name: 'Pixelify Sans',
      cssVariable: '--font-pixel',
      provider: fontProviders.fontsource(),
      weights: [500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
    {
      name: 'Space Grotesk',
      cssVariable: '--font-body',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.fontsource(),
      weights: [500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      // Alleen de cijfers 0–9 en € uit Silkscreen: die tekens zijn in Pixelify Sans slecht leesbaar.
      name: 'Silkscreen Digits',
      cssVariable: '--font-digits',
      provider: fontProviders.local(),
      // Geen fallback: letters moeten doorvallen naar Pixelify Sans (zie .px in global.css)
      fallbacks: [],
      options: {
        variants: [
          { src: ['./src/assets/fonts/silkscreen-digits-400.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/silkscreen-digits-700.woff2'], weight: 700, style: 'normal' },
        ],
      },
    },
  ],
});
