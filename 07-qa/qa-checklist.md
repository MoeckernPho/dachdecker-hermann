# QA-Checkliste (vor Launch)

## Funktion
- [ ] Alle internen Links & Navigation funktionieren (Desktop + Mobile-Menü).
- [ ] Kontaktformular: Erfolgsfall sendet Mail an Kunde an, `replyTo` korrekt.
- [ ] Formular-Validierung: Pflichtfelder, E-Mail-Format, Datenschutz-Checkbox.
- [ ] Honeypot/Spam-Schutz greift; kein Absturz bei leerem/falschem Input.
- [ ] `tel:` und `mailto:` Links klickbar und korrekt.

## Darstellung / Responsive
- [ ] Mobile (≤390px), Tablet, Desktop geprüft — keine Überläufe.
- [ ] Bilder skaliert/optimiert, kein Layout-Shift (CLS).
- [ ] Fokus-Stile sichtbar, Kontraste ausreichend (WCAG AA Basis).

## Schriften
- [ ] Schriften laden **lokal** — kein externer Font-Request im Netzwerk-Tab.
- [ ] `font-display: swap` aktiv, Haupt-Schnitte preloaded.

## SEO / Meta
- [ ] Jede Seite: eindeutiger Title + Meta-Description.
- [ ] Open-Graph/Twitter-Tags vorhanden (Social-Preview testen).
- [ ] `sitemap.xml` erreichbar & korrekt; `robots.txt` verweist darauf.
- [ ] JSON-LD `LocalBusiness` valide (Rich-Results-Test).
- [ ] Canonical-URLs korrekt; eine `<h1>` pro Seite.

## Performance
- [ ] Lighthouse mobil: Performance & SEO ≥ 90 (Ziel).
- [ ] Keine Konsolenfehler/-warnungen.

## Recht / Inhalt
- [ ] Impressum vollständig (§5 DDG/TMG) und korrekt.
- [ ] Datenschutzerklärung deckt Kontaktformular + Hosting (Scalingo) ab.
- [ ] NAP-Daten überall identisch und aktuell.
- [ ] Alt-Texte für relevante Bilder.

## Fixliste
- [ ] Launch-blockierende Fehler behoben.
- [ ] Nicht-blockierende Punkte dokumentiert (später).
- [ ] Kunde gibt Build final frei.
