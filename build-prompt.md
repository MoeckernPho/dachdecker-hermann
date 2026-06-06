# Dachdecker-Hermann — Build Prompt

> Diesen Prompt in einer **neuen** Claude-Code-Session im Ordner
> `dachdecker-hermann/` ausführen. Er baut die echte Website nach dem Plan.

---

## Aufgabe

Baue die vollständige, produktionsreife Website für den **Dachdeckermeisterbetrieb
André Herrmann** (Rackwitz) als Astro-Projekt in `06-build/`.

**Pflicht: Zuerst die `frontend-design` Skill aktivieren** und ihren Prozess
befolgen, um generisches KI-Design zu vermeiden. Lies außerdem
`../playbook-schritte-de/frontend-design-richtlinien.md` und halte dich daran.

---

## Lies zuerst (Quelle der Wahrheit)

Alle Vorgaben stehen in diesem Projektordner — nutze sie, erfinde nichts dazu:

- `PLAN.md` — Stack, Architektur, Entscheidungen
- `01-briefing/project-brief.md` — Ziel, Scope, Zielgruppe
- `02-discovery/sitemap.md` — Seiten + Routen
- `02-discovery/requirements.md` — Must-haves + Akzeptanzkriterien
- `02-discovery/old-site-analysis.md` — Bestandsdaten & NAP
- `05-design/design-direction.md` — Mini-Designsystem & Wireframes
- `06-build/BUILD-PLAN.md` — technische Detailvorgaben (Fonts, Formular, SEO)
- `08-deployment/scalingo-setup.md` — Hosting-Rahmen (beeinflusst Adapter/Procfile)

Bei Konflikt gilt: `PLAN.md` > `BUILD-PLAN.md` > dieser Prompt.

---

## Nicht-verhandelbare Anforderungen

1. **`frontend-design` Skill nutzen** — kein generisches Template, keine Standard-
   Purple-Gradients, keine beliebig zentrierten Karten-Stapel. Design passt zum
   Handwerk: solide, vertrauenswürdig, „Meisterbetrieb“.
2. **Stack:** Astro (latest) + **Tailwind v4** (`@theme` Tokens, keine Hardcodes).
3. **Rendering:** `@astrojs/node` Adapter (`mode: 'standalone'`) — wegen Formular
   & Scalingo. Nur `/api/kontakt` ist serverseitig (`export const prerender = false`).
4. **Kontaktformular** mit echtem Mailversand via `nodemailer` (SMTP aus ENV),
   Honeypot + serverseitige Validierung. Keine Secrets im Code/Client.
5. **Lokal gehostete Schriften** in `public/fonts/` (woff2, `font-display: swap`,
   Hauptschnitte preloaden). **Kein** Google-Fonts-CDN-Request.
6. **Basis-SEO:** pro Seite Title/Description, OG/Twitter, canonical,
   `@astrojs/sitemap`, `robots.txt`, **JSON-LD `LocalBusiness`** mit NAP.
7. **Mobile-first**, Accessibility-Basics (Labels, Fokus, Kontrast, Alt-Texte).
8. Deutsch, `lang="de"`.

---

## Design-Prozess (frontend-design Skill)

1. **Designrichtung festlegen** vor dem Coden: Zweck (Anfragen für Dachdecker),
   Zielgruppe (Hauseigentümer Region Rackwitz/Leipzig), Tonalität (bodenständig,
   kompetent), visueller Schwerpunkt (Dach/Material, echte Projektfotos).
2. **2–3 kurze Prototyp-Richtungen** für den Hero/Startseiten-Look skizzieren
   (in `../05-design/prototype/`), die beste wählen, nur diese ausbauen.
3. **Design-Tokens** via Tailwind `@theme`: Farben (Anthrazit/Schiefer als Primär,
   warmer Akzent wie Ziegelrot für CTAs, neutrale Grautöne), Fonts (Display + Body),
   Radius, Schatten, Spacing-Skala. Semantische Klassen: `bg-brand-primary`,
   `text-brand-ink`, `font-display`, `rounded-card`.
4. **Icons:** Lucide (`@lucide/astro`), ein konsistenter Stil.
5. Zustände mitdenken: hover/focus/active/disabled/loading/error/success.
6. Finale Werte mit echtem Logo abgleichen, sobald in `04-brand-assets/` vorhanden;
   bis dahin begründete Platzhalter-Tokens setzen (dokumentieren).

---

## Seiten (siehe sitemap.md)

`/` · `/leistungen` · `/ueber-uns` · `/projekte` · `/kontakt` · `/impressum`
· `/datenschutz` · API `POST /api/kontakt`

Komponenten (wiederverwendbar): `BaseLayout`, `Header` (mobiles Menü), `Footer`
(NAP + Rechtliches), `Hero`, `ServiceCard`, `ProjectCard`, `ContactForm`,
`Seo.astro` (Meta/OG/JSON-LD), `CtaSection`.

---

## Content — wiederverwenden & optimieren

Basis aus der alten Seite; **optimiere** Tonalität, Struktur und SEO. Wo echte
Inhalte fehlen (Projektfotos, Detailtexte), klar als Platzhalter markieren und
`03-content/assets-needed.md` als offene Liste behandeln. NAP exakt übernehmen.

**NAP (exakt, überall identisch):**
Dachdeckermeisterbetrieb André Herrmann · Alte Hauptstraße 2, 04519 Rackwitz ·
Tel. `0342 - 02 3000 17` (Format bestätigen) · `info@Dachdecker-Hermann.de`.

### Optimierte Basis-Texte (Vorschlag, Platzhalter wo nötig)

**Startseite — Hero**
- H1: „Ihr Dach in Meisterhand“
- Subline: „Dachdecker-, Schiefer- und Sanierungsarbeiten im Raum Rackwitz und
  Leipzig — zuverlässig, termingerecht und nach neuestem Stand der Technik.“
- USP-Badge: „Hier arbeitet der Meister noch selbst.“
- CTAs: „Anfrage senden“ (zu /kontakt) · „Anrufen“ (`tel:`)

**Vertrauens-/USP-Streifen:** Meisterbetrieb · Zuverlässig & termingerecht ·
Regional verwurzelt · Saubere Ausführung.

**Leistungen (3 Karten + Detailabschnitte):**
- *Dachdeckerarbeiten* — „Neueindeckung, Reparatur und Wartung. Wir schützen Ihr
  Haus dauerhaft vor Wind und Wetter.“
- *Schieferarbeiten* — „Handwerkliche Schieferdeckung für langlebige, charaktervolle
  Dächer und Fassaden.“
- *Dachsanierung* — „Energetische und bauliche Sanierung — fachgerecht geplant und
  termingerecht umgesetzt.“

**Über uns:** „Bei uns sind Sie in guten Händen. Als Meisterbetrieb stehe ich, André
Herrmann, persönlich für Qualität und Termintreue ein. Jeder Auftrag wird sorgfältig
und nach neuestem Stand der Technik ausgeführt.“ *(Person/Historie ggf. ergänzen.)*

**Projekte:** Grid aus echten Referenzen, ideal Vorher/Nachher. Platzhalter, bis
Fotos vorliegen.

**Kontakt:** Formular (Name, E-Mail, Telefon optional, Nachricht, Pflicht-Checkbox
Datenschutz, Honeypot) + NAP, Öffnungszeiten (bestätigen), klickbare Kontaktwege.

> SEO-Optimierung: sprechende Title/Descriptions je Seite mit Leistung + Ort
> (z. B. „Dachdecker in Rackwitz | Meisterbetrieb André Herrmann“), eine `<h1>` pro
> Seite, Alt-Texte mit Kontext, interne Verlinkung Leistungen↔Kontakt.

---

## Technik-Details

- **astro.config.mjs:** `output: 'static'` + `adapter: node({ mode: 'standalone' })`,
  `site` auf finale Domain, `@astrojs/sitemap` Integration, Tailwind via Vite-Plugin.
- **Fonts:** `@font-face` in `src/styles/global.css`, Dateien in `public/fonts/`,
  Preload im `<head>` von `BaseLayout`. SIL-OFL-Schriften wählen (self-hosting ok).
- **/api/kontakt.ts:** Methode + Felder validieren, Honeypot prüfen, einfache
  Rate-Bremse, `nodemailer` SMTP-Transport (ENV: `SMTP_HOST/PORT/USER/PASS/SECURE`,
  `MAIL_TO`, `MAIL_FROM`), `replyTo` = Absender. JSON-Antwort. `prerender = false`.
- **.env.example** mit allen ENV-Keys committen, **keine** echten Secrets.
- **Procfile:** `web: HOST=0.0.0.0 PORT=$PORT node ./dist/server/entry.mjs`;
  `package.json` `engines.node >=20`, `start`-Script entsprechend.
- Build-relevante Pakete (astro/tailwind) sicherheitshalber in `dependencies`.

---

## Setup-Befehle

```bash
cd 06-build
npm create astro@latest . -- --template minimal --install --no-git
npx astro add node          # Adapter standalone
npx astro add sitemap
npm i -D tailwindcss @tailwindcss/vite
npm i nodemailer @lucide/astro
npm run dev
```

---

## Vor „fertig“: QA (siehe 07-qa/qa-checklist.md)

- [ ] Alle Seiten + Routen vorhanden, keine Konsolenfehler, interne Links ok.
- [ ] Formular sendet Mail (lokal SMTP-Testkonto z. B. Ethereal); Honeypot greift.
- [ ] Schriften laden **lokal** (Netzwerk-Tab: kein externer Font-Request).
- [ ] SEO: Title/Description je Seite, OG, sitemap.xml, robots.txt, valides
      `LocalBusiness`-JSON-LD (Rich-Results-Test).
- [ ] Mobile/Tablet/Desktop sauber; Fokus/Kontrast/Alt-Texte ok.
- [ ] Lighthouse mobil Performance & SEO ≥ 90.
- [ ] Impressum/Datenschutz erreichbar; NAP überall identisch.
- [ ] **Kein generischer KI-Look** — Design entspricht der gewählten Richtung.

Führe nach dem Build `npm run build` aus und prüfe, dass `dist/server/entry.mjs`
entsteht (Scalingo-Start). Berichte am Ende offene Platzhalter + benötigte Kunden-
Assets aus `03-content/assets-needed.md`.
