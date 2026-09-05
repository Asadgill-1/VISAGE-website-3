import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
 resolve: { tsconfigPaths: true },
 // The Vercel function ships without node_modules, so the SSR build has to
 // inline every dependency. Dev keeps them external for fast reloads.
 ssr: { noExternal: command === 'build' ? true : undefined },
 // .mjs so the SSR chunks stay ESM wherever they land, without depending on a
 // package.json "type" travelling with them into the function bundle.
 environments: {
  ssr: {
   build: {
    rollupOptions: {
     output: { entryFileNames: '[name].mjs', chunkFileNames: 'assets/[name]-[hash].mjs' },
    },
   },
  },
 },
 plugins: [tanstackStart({ server: { entry: 'server' } }), react(), tailwindcss()],
}));
