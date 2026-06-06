# Projektplan — Dachdecker-Hermann (Relaunch)

Neue Website für den **Dachdeckermeisterbetrieb André Herrmann**, Rackwitz.
Bestehende Seite: http://www.dachdecker-hermann.de/ (statisches HTML, © 2019).

Dieser Plan folgt dem 6-Schritte-Playbook (`playbook-schritte-de/`) und der
8-Phasen-Ordnerstruktur der anderen Projekte (`sauna-express`, `MIA_new`).

---

## Kurzfassung

| Punkt | Entscheidung |
| --- | --- |
| Projekttyp | Statische lokale Dienstleister-Website (Marketing) |
| Stack | **Astro + Tailwind CSS** (Standard laut `technologieauswahl-und-systeme.md`) |
| Rendering | Astro **Node-Adapter (standalone)** — wegen Kontaktformular ein Server, kein reines Static-Hosting |
| Schriften | **Lokal gehostet** (self-hosted, `woff2`, `font-display: swap`) — keine Google-Fonts-CDN |
| Kontaktformular | Astro-API-Route `POST /api/kontakt` → Mailversand via SMTP (nodemailer) + Spam-/Honeypot-Schutz |
| Hosting | **Scalingo** (EU/DSGVO-freundlich, PaaS) als Node-App, ein Container |
| SEO | Basis-SEO: Meta/OG/Twitter, `sitemap.xml`, `robots.txt`, JSON-LD `LocalBusiness`, semantisches HTML |
| CMS | **Nein** — Inhalte ändern sich selten, Pflege bleibt bei uns (kein WordPress nötig) |
| Sprache | Deutsch |

---

## Warum dieser Stack

- **Astro** liefert statisches, sehr schnelles HTML mit minimal JS — ideal für eine
  kleine Dienstleisterseite mit gutem SEO und Ladezeit.
- **Kein CMS**, weil der Kunde Inhalte erfahrungsgemäß kaum selbst pflegt
  (alte Seite seit 2019 unverändert). Spart Kosten und Wartungsfläche.
- **Node-Adapter statt rein statisch**, weil ein Kontaktformular serverseitig eine
  Mail versenden muss. Scalingo betreibt nativ Node-Apps → ein Deploy, ein Container,
  Formular und Seite aus derselben App.
- **Scalingo**: europäisches PaaS (Hosting in FR/DE), DSGVO-konform, passt für einen
  deutschen Handwerksbetrieb. Deploy per Git-Push, automatisches SSL.

> Architektur-Alternative (falls Kunde rein statisch will): Astro statisch +
> Formular über externen Dienst (Formspree/Brevo). Wird **nicht** empfohlen, weil es
> einen zweiten Anbieter und Datentransfer einführt. Default = Node-App auf Scalingo.

---

## Offene Entscheidungen (vor Build klären)

1. **Mailversand fürs Formular**: Bevorzugt SMTP des bestehenden Postfachs
   `info@Dachdecker-Hermann.de` (Zugangsdaten vom Kunden) — sonst Transaktions-Dienst
   (Brevo, EU). → Step 3.
2. **Domain/DNS**: Wer verwaltet `dachdecker-hermann.de`? Umzug der DNS auf Scalingo
   (CNAME/A-Record) planen, Mail-Records (MX) **nicht** anfassen. → Step 6.
3. **Inhalte**: Texte/Bilder der alten Seite übernehmen, überarbeiten oder neu? Echte
   Projektfotos & Referenzen vom Kunden anfordern. → Step 3.
4. **Budget, Deadline, Paket** (Starter/Growth): noch offen. → Step 1.
5. **Rechtstexte**: Impressum/Datenschutz aktualisieren (DSGVO, Kontaktformular-Hinweis,
   Hosting-Anbieter Scalingo nennen). Wer liefert/prüft? → Step 3.

---

## Phasen & Deliverables (Ordnerstruktur)

| Ordner | Inhalt | Status |
| --- | --- | --- |
| `01-briefing/` | `project-brief.md` — Ziel, Scope, Paket | Entwurf vorhanden |
| `02-discovery/` | `sitemap.md`, `requirements.md`, `old-site-analysis.md` | Entwurf vorhanden |
| `03-content/` | Texte, Bilder, Rechtstexte (vom Kunden) | Wartet auf Kunde |
| `04-brand-assets/` | Logo, Farben, Schriften, Referenzen | Wartet auf Kunde |
| `05-design/` | `design-direction.md`, Wireframes, Freigabe | Entwurf vorhanden |
| `06-build/` | Astro-Projekt + `BUILD-PLAN.md` | Geplant |
| `07-qa/` | `qa-checklist.md` | Geplant |
| `08-deployment/` | `scalingo-setup.md` | Geplant |

---

## Ablauf (empfohlene Reihenfolge)

1. **Briefing & Scope freigeben** (`01`) — Ziel: Anrufe & Anfragen für den Betrieb.
2. **Discovery** (`02`) — Sitemap & Anforderungen mit Kunde bestätigen.
3. **Content & Assets sammeln** (`03`, `04`) — echte Fotos, Logo, Rechtstexte, SMTP-Daten.
4. **Design-Richtung** (`05`) — Mini-Designsystem, Wireframe Startseite, Freigabe.
5. **Build** (`06`) — Astro-Setup, Seiten, Kontaktformular, lokale Fonts, SEO.
6. **QA** (`07`) — Mobile/Desktop, Formular-Test, Lighthouse, rechtliche Links.
7. **Deployment** (`08`) — Scalingo, Domain, SSL, Live-Test, Handoff.

Details siehe die einzelnen Dateien je Phase.
