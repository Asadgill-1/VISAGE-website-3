// Runnable check: copies the function out of the project first, so a bare
// import the SSR bundle failed to inline cannot resolve via our node_modules
// -- the exact failure Vercel hits. Then drives it as the launcher does.
import { cp, mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const sandbox = await mkdtemp(join(tmpdir(), 'vesage-fn-'));
await cp('.vercel/output/functions/index.func', sandbox, { recursive: true });
const { default: handler } = await import(pathToFileURL(join(sandbox, 'index.mjs')).href);

const server = createServer((req, res) => {
 handler(req, res).catch(e => { console.error(e); res.writeHead(500).end(String(e)); });
});
await new Promise(r => server.listen(3111, r));

const html = await fetch('http://localhost:3111/');
const body = await html.text();
console.log('GET / ->', html.status, html.headers.get('content-type'));
console.log('CSP set:', !!html.headers.get('content-security-policy'));
console.log('has <html>:', body.includes('<html'), '| bytes:', body.length);

const redir = await fetch('http://localhost:3111/app/', { redirect: 'manual' });
console.log('GET /app/ ->', redir.status, redir.headers.get('location'));

server.close();
await rm(sandbox, { recursive: true, force: true });

if (html.status !== 200 || !body.includes('<html')) {
 console.error('FAIL:', body.slice(0, 500));
 process.exit(1);
}
console.log('OK (ran with no node_modules in scope)');
