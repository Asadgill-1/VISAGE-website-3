// Runnable check: drives the Vercel function exactly as the launcher does.
import { createServer } from 'node:http';
import handler from '../.vercel/output/functions/index.func/index.mjs';

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
if (html.status !== 200 || !body.includes('<html')) process.exit(1);
console.log('OK');
