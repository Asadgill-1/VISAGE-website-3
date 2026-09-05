// Vercel Node function -> the web `fetch` handler in dist/server/server.js.
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import server from './server.mjs';

export default async function handler(req, res) {
 const proto = req.headers['x-forwarded-proto'] ?? 'https';
 const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost';

 const headers = new Headers();
 for (const [key, value] of Object.entries(req.headers)) {
  if (value === undefined) continue;
  for (const one of Array.isArray(value) ? value : [value]) headers.append(key, one);
 }

 const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
 const request = new Request(new URL(req.url, `${proto}://${host}`), {
  method: req.method,
  headers,
  body: hasBody ? Readable.toWeb(req) : undefined,
  duplex: hasBody ? 'half' : undefined,
 });

 const response = await server.fetch(request, process.env, {});

 const out = {};
 response.headers.forEach((value, key) => { if (key !== 'set-cookie') out[key] = value; });
 const cookies = response.headers.getSetCookie?.() ?? [];
 if (cookies.length) out['set-cookie'] = cookies;

 res.writeHead(response.status, out);
 if (response.body) await pipeline(Readable.fromWeb(response.body), res);
 else res.end();
}
