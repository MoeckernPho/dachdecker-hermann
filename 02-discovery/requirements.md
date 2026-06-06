# Anforderungen

## Must-have (Launch)

- [ ] Responsive Design (Mobile-first), getestet auf Mobile/Tablet/Desktop.
- [ ] 5 Inhaltsseiten + Impressum + Datenschutz (siehe `sitemap.md`).
- [ ] **Kontaktformular** mit serverseitigem Mailversand an `info@Dachdecker-Hermann.de`.
  - Felder: Name, E-Mail, Telefon (optional), Nachricht, Datenschutz-Checkbox.
  - Validierung (client + server), **Honeypot** + serverseitige Spam-Bremse.
  - Erfolgs-/Fehlermeldung, kein Datenverlust bei Reload.
- [ ] **Lokal gehostete Schriften** (woff2, `font-display: swap`, preload der Hauptschnitte).
- [ ] **Basis-SEO**: pro Seite Title/Description, Open-Graph/Twitter, canonical,
      `sitemap.xml`, `robots.txt`, **JSON-LD `LocalBusiness`** (NAP, Öffnungszeiten).
- [ ] Klickbare Kontaktwege: `tel:`, `mailto:`, Adresse.
- [ ] Korrekte, aktualisierte **Rechtstexte** (Impressum + Datenschutz inkl. Formular & Scalingo).
- [ ] Favicon / Touch-Icons.
- [ ] Barrierefreiheits-Basics: Alt-Texte, Fokus-Stile, Kontrast, Labels.
- [ ] Deployment auf **Scalingo** mit Domain + automatischem SSL.

## Nice-to-have (später)

- Google Maps / OSM-Einbettung auf Kontaktseite (DSGVO-konform, Klick-to-load).
- Bewertungen / Kundenstimmen.
- Datenschutzfreundliches Analytics (z. B. Plausible).
- Vorher-Nachher-Slider in Projekten.
- Partner-Logos-Sektion.

## Akzeptanzkriterien (Launch-Reife)

- Formular sendet zuverlässig Mail an den Kunden an; Bestätigung für Absender sichtbar.
- Lighthouse mobil: Performance & SEO im grünen Bereich (Ziel ≥ 90).
- Alle Seiten ohne Konsolenfehler; alle internen Links funktionieren.
- Impressum & Datenschutz erreichbar und inhaltlich aktuell.
- NAP-Daten überall identisch zur Realität.
- Schriften laden lokal (kein externer Font-Request im Netzwerk-Tab).
