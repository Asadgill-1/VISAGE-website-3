// Applies migrations/*.sql to DATABASE_URL. Statements are idempotent.
import { readdir, readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is not set');
const sql = neon(url);

for (const file of (await readdir('migrations')).filter(f => f.endsWith('.sql')).sort()) {
 const text = await readFile(`migrations/${file}`, 'utf8');
 for (const statement of text.split(';').map(s => s.trim()).filter(Boolean)) {
  await sql.query(statement);
 }
 console.log('applied', file);
}
