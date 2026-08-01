# R. Anand — Portfolio

A minimal, light-themed portfolio site built with React + Vite. Sections: Hero, About,
Résumé (certifications & achievements), Projects, Skills, Contact.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with `npm run preview`.

## Deploy — Vercel (recommended, easiest)

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**.
3. Select the repo. Vercel auto-detects Vite — leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. You'll get a live `.vercel.app` URL in about a minute.
5. To use your own domain later: Project → Settings → Domains.

## Deploy — Netlify (alternative)

1. Push this folder to a GitHub repo.
2. Go to https://app.netlify.com → **Add new site → Import an existing project**.
3. Pick the repo. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**.

## Editing content

All copy and project data lives in `src/App.jsx` at the top (`projects`, `skillGroups`,
`certifications`, `achievements` arrays) — edit those arrays directly to update content,
no need to touch the markup. Colors, fonts, and spacing are defined as CSS variables at
the top of `src/index.css`.

Your résumé PDF is served from `public/R_Anand_Resume.pdf` — replace that file (keep the
same name) to update the download link, or update the `href` in `App.jsx` if you rename it.
