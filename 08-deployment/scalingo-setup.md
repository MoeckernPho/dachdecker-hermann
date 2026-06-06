# Deployment — Scalingo

Astro-App (Node-Adapter, standalone) als Node-Container auf **Scalingo** (EU/DSGVO).
Deploy per Git-Push; Scalingo erkennt Node über `package.json`.

## Voraussetzungen
- Scalingo-Account + CLI (oder Dashboard) + Git-Remote.
- `package.json` mit `engines.node` (z. B. `>=20`) und Start-Befehl.
- App lauscht auf `process.env.PORT` (Scalingo gibt den Port vor).

## Start-Konfiguration

Node-Adapter standalone baut `dist/server/entry.mjs`. Scalingo braucht einen
Start-Prozess — per **Procfile** im Build-Ordner:

```
web: HOST=0.0.0.0 PORT=$PORT node ./dist/server/entry.mjs
```

`package.json`:
```json
{
  "scripts": {
    "build": "astro build",
    "start": "HOST=0.0.0.0 node ./dist/server/entry.mjs"
  },
  "engines": { "node": ">=20.0.0" }
}
```

> Hinweis: Astro Node-Adapter respektiert `HOST`/`PORT`. Sicherstellen, dass beide
> aus der Umgebung gelesen werden (`host: true` / Adapter-Default).

## Build auf Scalingo
- Scalingo Node-Buildpack führt `npm install` + `npm run build` aus.
- `devDependencies` werden für den Build evtl. benötigt → falls Astro/Tailwind in
  devDependencies stehen, `NODE_ENV` bzw. Buildpack-Einstellung prüfen, damit sie
  installiert werden. Sicherer: Build-relevante Pakete in `dependencies`.

## Umgebungsvariablen (Scalingo Dashboard / `scalingo env-set`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`
- `MAIL_TO` = `info@Dachdecker-Hermann.de`
- `MAIL_FROM` = sendende Adresse (vom SMTP-Anbieter erlaubt)
- ggf. `PUBLIC_SITE_URL`
> Keine Secrets ins Git. `.env.example` als Vorlage committen.

## Domain & SSL
1. App zuerst auf Scalingo-Subdomain testen (`*.osc-fr1.scalingo.io`).
2. Domain `dachdecker-hermann.de` + `www` in Scalingo hinzufügen.
3. DNS beim Domain-Provider setzen (CNAME auf Scalingo-Ziel bzw. laut Scalingo-Doku);
   `www` → Apex via Provider-Regeln.
4. **MX-/Mail-Records NICHT ändern** — E-Mail-Postfach bleibt unberührt.
5. Scalingo stellt automatisch **Let's Encrypt SSL** aus → HTTPS erzwingen,
   Weiterleitung `http→https` und `www`↔Apex festlegen.

## Live-Test (auf echter Domain)
- [ ] HTTPS/SSL gültig, http→https Redirect.
- [ ] Formular sendet echte Mail an Kunde an.
- [ ] Alle Seiten laden, sitemap/robots erreichbar.
- [ ] Mobile-Ansicht & Ladezeit ok.
- [ ] Rechtliche Links erreichbar.

## Handoff & Wartung
- Doku: Zugänge (Scalingo, Domain, SMTP), Deploy-Weg (Git-Push), bekannte Grenzen.
- Inhaltsänderungen = Entwickler-/Support-Aufgabe (kein CMS).
- Wartungsangebot definieren: Updates, Monitoring, kleine Änderungen, Backups des Repos.
- Kunde bestätigt Launch + Handoff schriftlich.
