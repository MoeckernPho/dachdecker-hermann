/**
 * Zentrale Datenquelle der Website.
 *
 * NAP (Name/Adresse/Telefon) wird AUSSCHLIESSLICH hier gepflegt, damit es auf jeder
 * Seite, im Footer und im JSON-LD identisch ist (wichtig für lokales SEO).
 *
 * Mit `PLATZHALTER` markierte Werte müssen vor dem Launch mit dem Kunden bestätigt
 * werden (siehe 03-content/assets-needed.md).
 */

export const nap = {
  company: "Dachdeckermeisterbetrieb André Herrmann",
  shortName: "Dachdecker Herrmann",
  owner: "André Herrmann",
  street: "Alte Hauptstraße 2",
  postalCode: "04519",
  city: "Rackwitz",
  region: "Sachsen",
  country: "DE",
  // Telefon: Format laut Bestandsseite. PLATZHALTER: Schreibweise/Korrektheit bestätigen.
  phoneDisplay: "0342 - 02 3000 17",
  phoneHref: "tel:+4934202300017",
  email: "info@Dachdecker-Hermann.de",
  emailHref: "mailto:info@Dachdecker-Hermann.de",
  // Geo: PLATZHALTER: ungefähre Koordinaten für Rackwitz, vor Launch verifizieren.
  geo: { lat: 51.4209, lng: 12.4126 },
} as const;

/** Öffnungszeiten: PLATZHALTER: mit Kunde bestätigen (auch für JSON-LD). */
export const openingHours = {
  display: [
    { days: "Mo - Fr", hours: "07:00 - 17:00 Uhr" },
    { days: "Sa", hours: "nach Vereinbarung" },
    { days: "So", hours: "geschlossen" },
  ],
  // Strukturiert für schema.org (nur sichere Tage; „nach Vereinbarung" wird ausgelassen).
  spec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" },
  ],
} as const;

export const site = {
  name: nap.company,
  shortName: nap.shortName,
  url: "https://www.dachdecker-hermann.de",
  locale: "de_DE",
  lang: "de",
  /** Standard-Beschreibung, falls eine Seite keine eigene setzt. */
  defaultDescription:
    "Dachdeckermeisterbetrieb André Herrmann aus Rackwitz: Dachdecker-, Schiefer- und " +
    "Sanierungsarbeiten im Raum Rackwitz und Leipzig. Zuverlässig, termingerecht, vom Meister.",
  /** Social-Preview-Bild (liegt in /public). PLATZHALTER bis echtes Bild vorliegt. */
  ogImage: "/images/og-default.svg",
  areaServed: ["Rackwitz", "Leipzig", "Leipzig Nord", "Landkreis Nordsachsen"],
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Projekte", href: "/projekte" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export type IconName =
  | "roof"
  | "slate"
  | "renovation"
  | "storm"
  | "chimney"
  | "wood"
  | "shield"
  | "clock"
  | "map-pin"
  | "award";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: IconName;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "dachdeckerarbeiten",
    title: "Dachdeckerarbeiten",
    short:
      "Steil- und Flachdächer, Eindeckungen, Dämmung, Fenster, Entwässerung und Blecharbeiten.",
    icon: "roof",
    description:
      "Wir führen Dachdeckerarbeiten an Steil- und Flachdächern mit unterschiedlichen " +
      "Materialien aus. Dazu gehören Eindeckungen, Verkleidungen, Entwässerung, Fenster und " +
      "Wärmedämmung.",
    bullets: [
      "Ziegeleindeckungen mit Betondachziegeln, Tondachziegeln, Biberziegeln und Dachpfannen",
      "Schieferdächer und Schieferverkleidungen",
      "Schindeldächer und Blechdächer",
      "Flachdächer aus Bitumen- und Kunststoffbahnen",
      "Dachentwässerung und Blecharbeiten aus Zink-, Aluminium- und Kupferblech",
      "Einbau von Dachflächenfenstern für Wohnräume und als Ausstiegsfenster",
      "Schallschutzfenster in verschiedenen Schallschutzklassen",
      "Wärmedämmung im Flach- und Steildach mit geeigneten Materialien",
    ],
  },
  {
    slug: "sturmschadenregulierung",
    title: "Sturmschaden",
    short:
      "Schnelle Notabdichtung, fachgerechte Reparatur und Unterstützung bei der Regulierung.",
    icon: "storm",
    description:
      "Nach einem Sturmschaden sichern wir das Dach zunächst gegen weitere Schäden und führen " +
      "die erforderliche Reparatur aus. Für die Versicherung erstellen wir ein Kostenangebot " +
      "und übernehmen auf Wunsch die direkte Abrechnung.",
    bullets: [
      "Notabdichtung beschädigter Dachflächen",
      "Fachgerechte Reparatur der Sturmschäden",
      "Kostenangebot zur Vorlage bei der Versicherung",
      "Auf Wunsch direkte Abrechnung mit der Versicherung",
    ],
  },
  {
    slug: "schornsteine",
    title: "Schornsteinarbeiten",
    short:
      "Verkleidungen, Einfassungen und Abdeckungen für einen wetterfesten Schornstein.",
    icon: "chimney",
    description:
      "Schornsteine erhalten fachgerechte Verkleidungen, Einfassungen und Abdeckungen. Je nach " +
      "Gebäude und Anforderung verarbeiten wir Schiefer, Faserzement, Blech, Walzblei, " +
      "Kunststoff oder Edelstahl.",
    bullets: [
      "Verkleidung aus Naturschiefer oder Faserzementplatten",
      "Schornsteinverkleidung aus Blech",
      "Einfassungen aus Blech, Walzblei oder Kunststoff",
      "Schornsteinabdeckungen aus Edelstahl",
    ],
  },
  {
    slug: "holzarbeiten",
    title: "Holzarbeiten",
    short:
      "Dachstühle, Gauben, Vordächer und Carport-Überdachungen mit spezialisierten Fachfirmen.",
    icon: "wood",
    description:
      "Ergänzend zu unseren Dachdeckerarbeiten realisieren wir verschiedene Holzarbeiten am " +
      "Gebäude. Diese Arbeiten führen wir in Zusammenarbeit mit den passenden Fachfirmen aus.",
    bullets: [
      "Dachstühle",
      "Dachgauben",
      "Vordächer",
      "Carport-Überdachungen",
      "Ausführung in Zusammenarbeit mit Fachfirmen",
    ],
  },
];

export type Usp = { icon: IconName; title: string; text: string };

export const usps: Usp[] = [
  { icon: "award", title: "Meisterbetrieb", text: "Hier arbeitet der Meister noch selbst." },
  { icon: "clock", title: "Termingerecht", text: "Zuverlässig und nach Absprache pünktlich." },
  { icon: "map-pin", title: "Regional verwurzelt", text: "Zuhause im Raum Rackwitz und Leipzig." },
  { icon: "shield", title: "Saubere Ausführung", text: "Nach neuestem Stand der Technik." },
];

export type Project = {
  title: string;
  location?: string;
  summary: string;
  image: string;
  alt: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Dachsanierung am Altbau",
    summary:
      "Sanierungsarbeiten an der Dachfläche eines mehrgeschossigen Bestandsgebäudes.",
    image: "/images/references/fs_p003_1_1.jpg",
    alt: "Mehrgeschossiger Altbau vor der Dachsanierung",
    tags: ["Dachsanierung", "Altbau"],
  },
  {
    title: "Altbaudach in Arbeit",
    summary:
      "Eingerüstetes Bestandsgebäude während der fachgerechten Sanierung des Daches.",
    image: "/images/references/fs_p003_1_2.jpg",
    alt: "Eingerüsteter Altbau während der Dachsanierung",
    tags: ["Dachsanierung", "Bestand"],
  },
  {
    title: "Neueindeckung mit Tonziegeln",
    summary:
      "Sauber verlegte rote Tonziegel für einen langlebigen Schutz vor Wind und Wetter.",
    image: "/images/references/fs_p003_1_3.jpg",
    alt: "Detailansicht eines Daches mit roten Tonziegeln",
    tags: ["Dachdeckerarbeiten", "Neueindeckung"],
  },
  {
    title: "Sanierter Gebäudekomplex",
    summary:
      "Abgeschlossene Dacharbeiten an einem historischen Gebäudeensemble.",
    image: "/images/references/fs_p003_1_4.jpg",
    alt: "Historischer Gebäudekomplex mit sanierten roten Dächern",
    tags: ["Dachsanierung", "Altbau"],
  },
  {
    title: "Steildach vor und nach der Sanierung",
    summary:
      "Dokumentation der Arbeiten vom ursprünglichen Dach bis zur neuen Eindeckung.",
    image: "/images/references/fs_p003_1_5.jpg",
    alt: "Vorher-Nachher-Ansichten eines sanierten Steildachs",
    tags: ["Dachsanierung", "Vorher & Nachher"],
  },
  {
    title: "Dachsanierung im Straßenzug",
    summary:
      "Dacharbeiten an mehreren Wohnhäusern mit Gerüst und fachgerechter Baustelleneinrichtung.",
    image: "/images/references/fs_p003_1_6.jpg",
    alt: "Mehrere Wohnhäuser während laufender Dacharbeiten",
    tags: ["Dachdeckerarbeiten", "Sanierung"],
  },
  {
    title: "Wohnhaus modernisiert",
    summary:
      "Vorher-Nachher-Dokumentation eines Wohnhauses mit erneuertem Dach und Gauben.",
    image: "/images/references/fs_p003_1_7.jpg",
    alt: "Wohnhaus vor und nach der Dachmodernisierung",
    tags: ["Dachsanierung", "Vorher & Nachher"],
  },
  {
    title: "Neueindeckung mit Gauben",
    summary:
      "Erneuerung einer weitläufigen Dachfläche einschließlich der vorhandenen Dachgauben.",
    image: "/images/references/fs_p003_1_8.jpg",
    alt: "Vorher-Nachher-Ansichten eines Daches mit mehreren Gauben",
    tags: ["Neueindeckung", "Gauben"],
  },
  {
    title: "Dach- und Terrassenarbeiten",
    summary:
      "Ausgeführte Arbeiten am Wohnhausdach und an einer eingefassten Terrassenfläche.",
    image: "/images/references/fs_p003_1_9.jpg",
    alt: "Wohnhaus mit erneuertem Dach und eingefasster Terrassenfläche",
    tags: ["Dachdeckerarbeiten", "Details"],
  },
];
