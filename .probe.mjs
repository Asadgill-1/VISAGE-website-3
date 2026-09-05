import { createServer } from 'node:http';
import handler from './.vercel/output/functions/index.func/index.mjs';
const server = createServer((req,res)=>handler(req,res).catch(e=>{console.error('ADAPTER THREW:',e);res.writeHead(500).end()}));
await new Promise(r=>server.listen(3112,r));
for (const [label, headers] of [
  ['vercel-like', {host:'visage-website-3.vercel.app','x-forwarded-proto':'https','x-forwarded-host':'visage-website-3.vercel.app','x-vercel-id':'bom1::abc','user-agent':'Mozilla/5.0'}],
  ['plain', {}],
]) {
  const r = await fetch('http://localhost:3112/', { headers });
  const t = await r.text();
  console.log(label, '->', r.status, '| bytes', t.length, '|', t.slice(0,60).replace(/\n/g,' '));
}
server.close();
