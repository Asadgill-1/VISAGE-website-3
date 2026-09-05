import { createServerFn } from '@tanstack/react-start';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

const inquirySchema = z.object({
 name: z.string().trim().min(2, 'Please enter your name.').max(100),
 email: z.email('Please enter a valid email.').max(254).transform(v => v.toLowerCase()),
 brand: z.string().trim().max(200),
 brief: z.string().trim().min(15, 'Tell us a little more about the project.').max(5000),
 website: z.string().max(0, 'Please refresh and try again.'),
});

export const submitInquiry = createServerFn({ method: 'POST' })
 .inputValidator(inquirySchema)
 .handler(async ({ data }) => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('The inquiry form is temporarily unavailable. Please try again later.');
  const sql = neon(url);
  const receipt = crypto.randomUUID();
  const now = Date.now();
  try {
   const rows = await sql`INSERT INTO inquiries (id,name,email,brand,brief,created_at)
    SELECT ${receipt},${data.name},${data.email},${data.brand},${data.brief},${now}
    WHERE (SELECT COUNT(*) FROM inquiries WHERE email=${data.email} AND created_at>${now - 3600000}) < 3
    RETURNING id`;
   if (!rows.length) throw new Error('RATE_LIMIT');
   return { receipt };
  } catch (error) {
   if (error instanceof Error && error.message === 'RATE_LIMIT') throw new Error('Please wait an hour before sending another inquiry.');
   console.error(error);
   throw new Error('Your inquiry could not be saved. Please try again.');
  }
 });
