# Build-Plan (Phase 06)

Astro-Projekt für Dachdecker-Hermann. Standard-Stack laut
`playbook-schritte-de/technologieauswahl-und-systeme.md`: **Astro + Tailwind CSS**.

## Stack & Pakete

- `astro` (v5+), `@astrojs/node` (Adapter, `mode: 'standalone'`) — wegen Formular & Scalingo.
- `tailwindcss` + `@tailwindcss/vite` (Tailwind v4) für Styling.
- `@astrojs/sitemap` für `sitemap.xml`.
- `nodemailer` für Mailversand im API-Endpoint.
- Optional: `@lucide/astro` für Icons (wie in `MIA_new`).

`output: 'server'` ist **nicht** nötig — Standard `output: 'static'` mit Adapter
reicht; nur die API-Route ist serverseitig (Hybrid). Mit Node-Adapter wird die App
als Node-Server (`./dist/server/entry.mjs`) gebaut, den Scalingo startet.

## Projektstruktur (Ziel)

```
06-build/
  astro.config.mjs        # node adapter standalone, site-URL, sitemap
  tailwind.config / vite
  package.json            # "start": "node ./dist/server/entry.mjs"
  Procfile               # web: node ./dist/server/entry.mjs   (Scalingo)
  .env.example           # SMTP_HOST, SMTP_USER, ... (keine echten Secrets!)
  public/
    fonts/               # lokale .woff2 Schriften
    robots.txt
    favicon / icons
    images/              # optimierte Projekt-/Hero-Fotos
  src/
    layouts/BaseLayout.astro     # <head>, SEO-Slots, Header, Footer
    components/  Header, Footer, Hero, ServiceCard, ProjectCard,
                 ContactForm, Seo.astro (Meta/OG/JSON-LD)
    pages/
      index.astro
      leistungen.astro
      ueber-uns.astro
      projekte.astro
      kontakt.astro
      impressum.astro
      datenschutz.astro
      api/kontakt.ts             # POST -> nodemailer
    styles/global.css            # @font-face (lokal), Tailwind, Tokens
```

## Lokale Schriften (Anforderung)

- Schriftdateien als **`woff2`** in `public/fonts/` ablegen.
- `@font-face` in `global.css` mit `font-display: swap`.
- Haupt-Schnitte im `<head>` **preloaden** (`<link rel="preload" as="font" crossorigin>`).
- **Kein** Google-Fonts-CDN-Request (DSGVO + Performance). Im Netzwerk-Tab verifizieren.

## Kontaktformular (Anforderung)

- `ContactForm.astro`: Felder Name, E-Mail, Telefon (optional), Nachricht,
  Pflicht-Checkbox Datenschutz, **Honeypot**-Feld (versteckt) gegen Bots.
- Client: HTML5-Validierung + Fetch-`POST` an `/api/kontakt`, Erfolg/Fehler inline.
- `src/pages/api/kontakt.ts` (`export const prerender = false`):
  - Methode/Felder validieren, Honeypot prüfen, einfache Rate-Bremse.
  - `nodemailer` mit SMTP-Transport (ENV) → Mail an `info@Dachdecker-Hermann.de`,
    `replyTo` = Absender-E-Mail.
  - JSON-Antwort `{ ok: true }` / Fehlercode; keine Secrets im Client.
- Secrets nur über **ENV** (Scalingo-Variablen), nie committen.

## SEO-Implementierung (Basis)

- `Seo.astro`-Komponente: `title`, `description`, canonical, Open-Graph, Twitter-Card.
- `@astrojs/sitemap` → `sitemap.xml`; `public/robots.txt` verweist darauf.
- **JSON-LD `LocalBusiness`** (Name, Adresse, Telefon, geo, Öffnungszeiten, `url`).
- Pro Seite individueller Title/Description; saubere `<h1>`-Struktur; Bilder mit `alt`.
- `site`-URL in `astro.config.mjs` setzen (für canonical & sitemap).

## Befehle

```
npm install
npm run dev        # lokal entwickeln
npm run build      # -> dist/ (Server-Entry für Scalingo)
npm run preview    # Build lokal prüfen
```

## Definition of Done (Build)
Alle Seiten gebaut, Formular versendet lokal (SMTP-Testkonto), Fonts lokal,
SEO-Tags + sitemap + JSON-LD vorhanden, keine Konsolenfehler. → Phase 07 QA.
