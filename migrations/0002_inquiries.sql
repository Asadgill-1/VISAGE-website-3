CREATE TABLE IF NOT EXISTS inquiries (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT NOT NULL DEFAULT '',
 brand TEXT NOT NULL DEFAULT '',
 brief TEXT NOT NULL,
 created_at BIGINT NOT NULL
);
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS inquiries_email_created ON inquiries(email, created_at);
