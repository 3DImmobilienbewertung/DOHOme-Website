// Strukturierte Platzhalter-Daten für die 6 Referenzprojekte.
// Bilder sind seed-basierte Platzhalter (picsum) und 1:1 gegen eigene
// Fotografie in /public/images austauschbar. Texte sind Dummy-Inhalte.

export type ProjectStatus =
  | "In Planung"
  | "Im Bau"
  | "Fertiggestellt"
  | "Verkauft";

export type Project = {
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  year: number;
  type: string;
  units: number;
  teaser: string;
  heroImage: string;
  gallery: string[];
  /** Funnel-Zuordnung: Eigennutzer-, Anleger- oder gemischtes Produkt */
  audience: "Eigennutzer" | "Kapitalanlage" | "Mischnutzung";
};

const img = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const projects: Project[] = [
  {
    slug: "waldkante-wedemark",
    title: "Waldkante",
    location: "Wedemark",
    status: "Im Bau",
    year: 2026,
    type: "Doppelhaushälften",
    units: 8,
    teaser:
      "Acht energieeffiziente Doppelhaushälften am Waldrand – großzügige Grundrisse für Familien, die Ruhe und Anbindung verbinden möchten.",
    heroImage: img("dohome-waldkante"),
    gallery: [img("dohome-waldkante-1"), img("dohome-waldkante-2"), img("dohome-waldkante-3")],
    audience: "Eigennutzer",
  },
  {
    slug: "leinegaerten-schwarmstedt",
    title: "Leinegärten",
    location: "Schwarmstedt",
    status: "In Planung",
    year: 2027,
    type: "Mehrfamilienhaus",
    units: 14,
    teaser:
      "Vierzehn barrierearme Eigentumswohnungen mit Südterrassen – ein ruhiges Quartier in Wassernähe mit durchdachter Stellplatzlösung.",
    heroImage: img("dohome-leinegaerten"),
    gallery: [img("dohome-leinegaerten-1"), img("dohome-leinegaerten-2"), img("dohome-leinegaerten-3")],
    audience: "Mischnutzung",
  },
  {
    slug: "heidehoefe-lindwedel",
    title: "Heidehöfe",
    location: "Lindwedel",
    status: "Fertiggestellt",
    year: 2024,
    type: "Reihenhäuser",
    units: 6,
    teaser:
      "Sechs klar gezeichnete Reihenhäuser mit privaten Gärten – langlebige Materialien, KfW-Standard und eine ruhige Sackgassenlage.",
    heroImage: img("dohome-heidehoefe"),
    gallery: [img("dohome-heidehoefe-1"), img("dohome-heidehoefe-2"), img("dohome-heidehoefe-3")],
    audience: "Eigennutzer",
  },
  {
    slug: "parkresidenz-grossburgwedel",
    title: "Parkresidenz",
    location: "Großburgwedel",
    status: "Verkauft",
    year: 2023,
    type: "Stadtvillen",
    units: 4,
    teaser:
      "Vier exklusive Stadtvillen-Einheiten in zentraler Lage – hochwertige Ausstattung, Aufzug und Tiefgarage für anspruchsvolle Eigennutzer.",
    heroImage: img("dohome-parkresidenz"),
    gallery: [img("dohome-parkresidenz-1"), img("dohome-parkresidenz-2"), img("dohome-parkresidenz-3")],
    audience: "Eigennutzer",
  },
  {
    slug: "anlagequartier-isernhagen",
    title: "Anlagequartier",
    location: "Isernhagen",
    status: "In Planung",
    year: 2027,
    type: "Mehrfamilienhaus",
    units: 18,
    teaser:
      "Achtzehn renditestarke Mietwohnungen mit pflegeleichter Architektur – konzipiert als wertstabile Kapitalanlage mit langfristiger Nachfrage.",
    heroImage: img("dohome-anlagequartier"),
    gallery: [img("dohome-anlagequartier-1"), img("dohome-anlagequartier-2"), img("dohome-anlagequartier-3")],
    audience: "Kapitalanlage",
  },
  {
    slug: "gartenhoefe-wedemark",
    title: "Gartenhöfe",
    location: "Wedemark",
    status: "Im Bau",
    year: 2026,
    type: "Einfamilienhäuser",
    units: 5,
    teaser:
      "Fünf freistehende Einfamilienhäuser mit Atriumgärten – maximale Privatsphäre, Wärmepumpe und Photovoltaik bereits ab Werk.",
    heroImage: img("dohome-gartenhoefe"),
    gallery: [img("dohome-gartenhoefe-1"), img("dohome-gartenhoefe-2"), img("dohome-gartenhoefe-3")],
    audience: "Mischnutzung",
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
