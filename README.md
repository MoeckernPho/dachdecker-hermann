# Dachdecker-Hermann — Website (06-build)

Produktionsreife Website für den **Dachdeckermeisterbetrieb André Herrmann** (Rackwitz).
Astro + Tailwind v4, Node-Adapter (standalone) für Hosting auf **Scalingo**.

## Stack
- **Astro 6** (statische Seiten) + **@astrojs/node** (`standalone`) — nur `/api/kontakt`
  läuft serverseitig (`prerender = false`).
- **Tailwind v4** über `@tailwindcss/vite`, Tokens als `@theme` in `src/styles/global.css`.
- **@astrojs/sitemap** → `sitemap-index.xml`.
- **nodemailer** für den Mailversand des Kontaktformulars (SMTP aus ENV).
- Icons: **@lucide/astro**. Schriften **lokal** in `public/fonts/` (kein Google-Fonts-CDN).

## Befehle
```bash
npm install
npm run dev       # lokal entwickeln (http://localhost:4321)
npm run check     # astro check (Typen/Templates)
npm run build     # -> dist/  (Server-Entry: dist/server/entry.mjs)
npm run preview   # Build lokal prüfen
npm start         # Produktionsstart (HOST/PORT aus ENV) — wie Scalingo
```

## Umgebungsvariablen
Siehe `.env.example`. Lokal `.env` anlegen (nicht committen), auf Scalingo via Dashboard /
`scalingo env-set` setzen. Pflicht für den Mailversand:
`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `MAIL_FROM`.
Ohne SMTP-Werte gibt `/api/kontakt` einen Konfigurationsfehler zurück (Seiten laden normal).

## Deployment (Scalingo)
- `Procfile`: `web: HOST=0.0.0.0 PORT=$PORT node ./dist/server/entry.mjs`
- Build-relevante Pakete stehen bewusst in `dependencies` (Buildpack installiert sie).
- Details: `../08-deployment/scalingo-setup.md`.

## Struktur
- `src/data/site.ts` — **zentrale Quelle** für NAP, Navigation, Leistungen, Projekte, SEO.
- `src/layouts/BaseLayout.astro` — `<head>`, Font-Preloads, Header/Footer.
- `src/components/` — Seo, Header, Footer, Hero, ServiceCard, ProjectCard, ContactForm, …
- `src/pages/` — Seiten + `api/kontakt.ts`.
- `src/styles/global.css` — `@font-face`, `@theme`-Tokens, Basis-Styles.

## Offene Platzhalter
Inhaberfoto, finale Rechtstexte, SMTP-Zugang, Telefon-Format,
Öffnungszeiten und Geo-Koordinaten — siehe `../03-content/assets-needed.md` und die mit
`PLATZHALTER` markierten Stellen im Code.
