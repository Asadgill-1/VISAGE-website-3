# VESAGE website

Complete portable source export of the VESAGE website, including the latest business story, marketing-kit copy, brand-value sections, portfolio viewer and 15-second scroll-controlled opening.

## Included

- React 19 + TanStack Start website source, custom styles and responsive layouts.
- All current portfolio projects and additional Ember House / Noor & Bean work.
- Eleven web-ready portfolio films, the identity film, photos, thumbnails, social covers, icons and locally hosted fonts.
- Full-resolution supplied originals in `original-media/` (kept out of git; see `media-manifest.json`).
- Contact form code and database migration, with validation and submission rate limiting.
- A readable copy document: `WEBSITE-COPY.md`.
- `media-manifest.json` linking original files to their website copies, with original-file SHA-256 checksums.

This is a source project, not a single HTML file. Run it through a local server; do not double-click source files to preview it.

## Quick local preview

Install Bun 1.3 or newer and Node.js 22.12 or newer. From this folder:

```sh
bun install
bun run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`). This is a hot-reload development server. The contact form needs `DATABASE_URL` (see below); without it the form reports that it is temporarily unavailable and the rest of the site works normally.

To exercise the exact bundle Vercel runs:

```sh
npm run vercel-build
npm run smoke
```

## Deploy to Vercel

1. Import the repository at [vercel.com/new](https://vercel.com/new). `vercel.json` sets the build command; no framework preset is needed.
2. Create a Postgres database (Vercel's Storage tab, or any Neon database) and attach it to the project. It must expose `DATABASE_URL` as an environment variable.
3. Apply the migration once, from this folder:

```sh
DATABASE_URL='<your connection string>' bun run db:push
```

4. Set your public domain in `src/site.ts`. This controls canonical and social metadata URLs.
5. Redeploy. Add a custom domain in the Vercel dashboard if desired.

`npm run vercel-build` produces a Build Output API v3 directory in `.vercel/output`: `dist/client` becomes the static CDN payload, and `dist/server` plus `scripts/vercel-entry.mjs` become a single Node function that server-renders every non-static request.

Hosting charges and account limits depend on your provider and plan. The portfolio films total roughly 98 MB; watch your bandwidth allowance if traffic is heavy.

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

The form stores inquiries in the Postgres database named by `DATABASE_URL` and returns a receipt. It does not send email notifications. There is no public page listing submissions. Review submissions using your own authenticated database tools.

No existing customer submissions, account credentials, API keys, authentication tokens or production database identifiers are included. Local test databases and dependency caches are also excluded.

## Package contents

- `src/`: editable website source.
- `public/`: website media and icons.
- `original-media/`: archival full-resolution supplied media.
- `migrations/`: inquiry database schema.
- `scripts/`: Vercel build assembler, function entry, migration runner and smoke test.
- Configuration files and dependency lockfile.

Run `bun run build` to create `dist/`, containing the deployable server and client bundles. Installed dependencies and build output are not duplicated in the ZIP, keeping the package smaller.
