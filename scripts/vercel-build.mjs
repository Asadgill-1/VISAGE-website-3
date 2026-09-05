// Assembles .vercel/output (Build Output API v3) from the vite build.
// Uploaded verbatim, so dist/server keeps its relative dynamic imports.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

const out = '.vercel/output';
const fn = `${out}/functions/index.func`;

await rm(out, { recursive: true, force: true });
await mkdir(fn, { recursive: true });

await cp('dist/client', `${out}/static`, { recursive: true });
await cp('dist/server', fn, { recursive: true });
await cp('scripts/vercel-entry.mjs', `${fn}/index.mjs`);
await writeFile(`${fn}/package.json`, JSON.stringify({ type: 'module' }));

await writeFile(`${fn}/.vc-config.json`, JSON.stringify({
 runtime: 'nodejs22.x',
 handler: 'index.mjs',
 launcherType: 'Nodejs',
 shouldAddHelpers: false,
 supportsResponseStreaming: true,
}, null, 1));

await writeFile(`${out}/config.json`, JSON.stringify({
 version: 3,
 routes: [
  { src: '/assets/(.*)', headers: { 'cache-control': 'public, max-age=31536000, immutable' }, continue: true },
  { handle: 'filesystem' },
  { src: '/(.*)', dest: '/index' },
 ],
}, null, 1));

console.log('.vercel/output ready');
