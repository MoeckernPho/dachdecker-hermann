# Sitemap

## Hauptnavigation

- **Startseite** (`/`) — Ziel: Vertrauen + zur Kontaktaufnahme/Leistungen führen.
- **Leistungen** (`/leistungen`) — Ziel: Angebot zeigen (Dachdeckerei, Schiefer, Sanierung).
- **Über uns** (`/ueber-uns`) — Ziel: Meisterbetrieb, Person, Vertrauen.
- **Projekte** (`/projekte`) — Ziel: Referenzen / Vorher-Nachher zeigen.
- **Kontakt** (`/kontakt`) — Ziel: Kontaktformular + NAP + Karte.

> „Beratung“ der alten Seite wird in Startseite/Leistungen integriert (CTA „Kostenlose Beratung“),
> kann aber als eigene Seite ergänzt werden, falls der Kunde es wünscht.

## Footer

- Telefon (klickbar `tel:`) & E-Mail (klickbar `mailto:`)
- Adresse (NAP)
- **Impressum** (`/impressum`)
- **Datenschutz** (`/datenschutz`)
- ggf. Partner-Hinweis

## Seitenziele (Übersicht)

| Seite | Primäres Ziel | Haupt-CTA |
| --- | --- | --- |
| Startseite | Überblick + Vertrauen | „Anfrage senden“ / „Anrufen“ |
| Leistungen | Angebot erklären | „Beratung anfragen“ |
| Über uns | Vertrauen, Meister persönlich | „Kontakt aufnehmen“ |
| Projekte | Kompetenz beweisen | „Eigenes Projekt anfragen“ |
| Kontakt | Anfrage auslösen | Formular absenden |

## Routen-Übersicht (Astro `src/pages/`)

```
/                 index.astro
/leistungen       leistungen.astro
/ueber-uns        ueber-uns.astro
/projekte         projekte.astro
/kontakt          kontakt.astro
/impressum        impressum.astro
/datenschutz      datenschutz.astro
/api/kontakt      api/kontakt.ts   (POST, Mailversand)
```
