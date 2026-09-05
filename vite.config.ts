import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
 resolve: { tsconfigPaths: true },
 // .mjs so the SSR chunks stay ESM wherever they land, without depending on a
 // package.json "type" travelling with them into the Vercel function bundle.
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
});
