// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// Cloudflare adapter is required because `src/actions/index.ts` exists —
// Astro Actions need on-demand rendering. Caveat: with the adapter present,
// `astro dev` routes every page through workerd, which breaks `astro-icon`
// with `module is not defined`. So `npm run dev` is broken for this project;
// use `wrangler dev` against the built output for local preview:
//   npm run build && npx wrangler dev --config dist/server/wrangler.json

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [icon(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});