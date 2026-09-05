# VESAGE website

Complete portable source export of the VESAGE website, including the latest business story, marketing-kit copy, brand-value sections, portfolio viewer and 15-second scroll-controlled opening.

## Included

- React 19 + TanStack Start website source, custom styles and responsive layouts.
- All current portfolio projects and additional Ember House / Noor & Bean work.
- Eleven web-ready portfolio films, the identity film, photos, thumbnails, social covers, icons and locally hosted fonts.
- Full-resolution supplied originals in `original-media/`.
- Contact form code and database migration, with validation and submission rate limiting.
- A readable copy document: `WEBSITE-COPY.md`.
- `media-manifest.json` linking original files to their website copies, with original-file SHA-256 checksums.

This is a source project, not a single HTML file. Run it through a local server; do not double-click source files to preview it.

## Quick local preview

Install Bun 1.3 or newer and Node.js 22.12 or newer. From this folder:

```sh
bun install
bun run build
bun run db:local
bun run preview
```

Open the local URL printed by Wrangler (normally `http://localhost:8787`). The database is local during this preview. A Cloudflare login is not required for local development.

After editing source files, run `bun run build` again. `bun run dev` builds and starts the local preview in one command; it is not a hot-reload development server.

## Deploy to your own Cloudflare account

1. Authenticate and create a database:

```sh
bunx wrangler login
bunx wrangler d1 create vesage-inquiries
```

2. In `wrangler.jsonc`, replace the all-zero `database_id` with the ID returned by the create command. The all-zero ID is a local-development placeholder, not a production database.
3. Set your public domain in `src/site.ts`. This controls canonical and social metadata URLs.
4. Apply the migration and deploy:

```sh
bun run db:remote
bun run deploy
```

5. Configure your custom domain in Cloudflare if desired. Hosting charges and account limits depend on your provider and plan.

The live VESAGE site is not modified by this export. Deploying this project creates a separately managed website in your account.

## Where to edit

| Content | File |
| --- | --- |
| Main page and portfolio layout | `src/routes/index.tsx` |
| Business story and production comparison | `src/components/vesage-business.tsx` |
| Marketing kits and brand-value pain points | `src/components/vesage-marketing-kit.tsx` |
| Portfolio media, titles and categories | `src/portfolio.ts` |
| Hero scene settings and copy | `src/scroll-scrub-scenes.ts` |
| Main visual styling | `src/vesage.css` |
| Business-story styling | `src/vesage-business.css` |
| Marketing-kit styling | `src/vesage-marketing-kit.css` |
| Browser title, description and covers | `src/app-meta.json` |
| Contact form | `src/components/vesage-contact.tsx` |
| Contact submission handler | `src/lib/inquiry.functions.ts` |
| Database schema | `migrations/0002_inquiries.sql` |

## Media

All media used for page rendering and playback is included locally under `public/`; no generated-media CDN is required for playback.

`public/assets/videos/` contains web-optimized versions that preserve the original timing, aspect ratios and audio. Full-resolution supplied files are kept separately in `original-media/`. These archival originals are not copied into the deployed site; several exceed standard per-file hosting limits. The viewer's separate-file link is labelled "Open media" in this export because it opens the web-ready copy.

The identity film has separate desktop/mobile encodes and matching first-frame posters. Keep each poster paired with its film when replacing the hero.

The separate UNIQLO catalogue film was not present in the available uploads, so it remains omitted. No replacement footage was invented.

## Contact form and privacy

The form stores inquiries in the configured D1 database and returns a receipt. It does not send email notifications. There is no public page listing submissions. Review submissions using your own authenticated database tools.

No existing customer submissions, account credentials, API keys, authentication tokens or production database identifiers are included. Local test databases and dependency caches are also excluded.

## Package contents

- `src/`: editable website source.
- `public/`: website media and icons.
- `original-media/`: archival full-resolution supplied media.
- `migrations/`: inquiry database schema.
- Configuration files and dependency lockfile.

Run `bun run build` to create `dist/`, containing the deployable server and client bundles. Installed dependencies and build output are not duplicated in the ZIP, keeping the package smaller.
