# Jenny Camaro

Personal showcase + ownership / build log for **Jenny** — a personified white third-gen Chevrolet Camaro (very stock **305** V8, **700R4** automatic). First-person, warm, slightly cheeky.

Built with **Astro + TypeScript + Tailwind** for static output and GitHub Pages.

**Live base path (configured):** `https://jennycamaro.github.io/Jenny-Camaro/`

## Quick start (local)

```bash
cd jenny-camaro
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:4321/Jenny-Camaro/`).  
Because `base` is `/Jenny-Camaro`, local links include that prefix — that is intentional.

```bash
npm run build    # output → dist/
npm run preview  # preview the production build
```

Requires **Node.js 22.12+**.

## Project layout

| Path | Purpose |
|------|---------|
| `src/pages/` | Routes: Home, About, Gallery, Log |
| `src/content/log/` | Markdown ownership-log entries (content collection) |
| `src/content.config.ts` | Collection schema for log posts |
| `public/assets/` | Static images (hero / gallery) |
| `astro.config.mjs` | `site` + `base: '/Jenny-Camaro'` for GitHub Pages |

## Add a log entry

1. Create a new Markdown file in `src/content/log/`, e.g. `my-show-day.md`.
2. Use frontmatter:

```md
---
title: My show day
description: Short teaser for the log index card.
pubDate: 2026-04-12
tags:
  - show
  - cruise
---

Write in Jenny’s voice. Keep mechanical claims honest (stock 305 / 700R4).
```

3. Quote numeric-looking tags in YAML (e.g. `"305"`) so they stay strings.
4. The slug is the file name without extension (`my-show-day` → `/Jenny-Camaro/log/my-show-day/`).
5. Run `npm run dev` to preview.

## Add a photo

1. Drop the image into `public/assets/` (e.g. `public/assets/dusk-hero.jpg`).
2. Reference it with the base path in Astro:

```astro
---
import { withBase } from '../lib/site';
---
<img src={withBase('assets/dusk-hero.jpg')} alt="Jenny at dusk" />
```

3. On the Gallery page, replace a placeholder slot with a real `<img>` (or extend the `placeholders` array to include `src` fields).
4. Optional: update the Home hero `img` `src` and Layout `ogImage` prop when you have a better share image.

The Facebook profile screenshot is included temporarily as `public/assets/jenny-camaro-fb.png`.

## GitHub Pages deploy

Config already set in `astro.config.mjs`:

```js
site: 'https://jennycamaro.github.io',
base: '/Jenny-Camaro',
```

### Option A — GitHub Actions (recommended)

1. Push this repo to `https://github.com/jennycamaro/Jenny-Camaro` (or your fork with the same Pages URL).
2. Add `.github/workflows/deploy.yml` (example):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. Repo **Settings → Pages → Build and deployment → Source:** GitHub Actions.
4. After the workflow succeeds, site is at `https://jennycamaro.github.io/Jenny-Camaro/`.

### Option B — Manual

```bash
npm run build
# Upload the contents of dist/ to the gh-pages branch or Pages artifact
```

If the repo name (and therefore the Pages path) changes, update `base` (and `site` if needed) in `astro.config.mjs` to match.

## Custom domain later

1. In the GitHub repo: **Settings → Pages → Custom domain** (e.g. `jennycamaro.com`) and follow DNS instructions (CNAME / A records).
2. Add `public/CNAME` with that domain if you deploy via Actions/static files and want it committed.
3. Change `astro.config.mjs`:

```js
site: 'https://jennycamaro.com', // your domain
base: '/',                       // root on a custom domain
```

4. Rebuild and redeploy. Update any hard-coded absolute URLs if you added them.

## Design notes

- Sunset / dusk palette (deep dusk backgrounds, orange–gold accents) for white Camaro photography.
- Mobile-friendly layout, SEO title/meta, SVG favicon.
- Facts only: stock 305, 700R4, Norwood vibe, Oct 21 1983 — light Easter egg “It’s complicated.”

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production static build → `dist/` |
| `npm run preview` | Serve `dist/` locally |

Do not invent false mechanical claims when extending content.
