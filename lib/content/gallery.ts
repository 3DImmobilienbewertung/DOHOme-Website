// Bildmaterial der Projekte (Visualisierungen, Innen-/Außenansichten, Baustand).
//
// NACHTRAGEN: Sobald die finalen Renderings und Fotos vorliegen:
//   1. Dateien nach /public/images/<projekt>/ legen
//   2. Unten je Bild einen Eintrag ergänzen (src, category, optional caption)
//   3. `usePlaceholders` auf false setzen
// Alt-Texte werden automatisch erzeugt (SEO + Barrierefreiheit), sofern kein
// eigener Text gesetzt ist. Lazy Loading und responsive Größen übernimmt die
// Galerie-Komponente.

export type GalleryCategory = "aussen" | "innen" | "grundriss" | "baustand" | "umgebung";

export type GalleryImage = {
  src: string;
  category: GalleryCategory;
  /** Eigener Alt-Text; sonst automatisch erzeugt. */
  alt?: string;
  /** Bildunterschrift, z. B. "Blick von der Südterrasse". */
  caption?: string;
  /** Aufnahme-/Standdatum für Baustandsbilder, z. B. "Juni 2026". */
  date?: string;
  width: number;
  height: number;
};

const CATEGORY_LABEL: Record<GalleryCategory, string> = {
  aussen: "Außenvisualisierung",
  innen: "Innenvisualisierung",
  grundriss: "Grundriss",
  baustand: "Baufortschritt",
  umgebung: "Lage und Umgebung",
};

export function categoryLabel(c: GalleryCategory): string {
  return CATEGORY_LABEL[c];
}

/**
 * Erzeugt einen beschreibenden, SEO-tauglichen Alt-Text.
 * Beispiel: „Außenvisualisierung Rotkamp 1, 30900 Wedemark – Blick von Süden"
 */
export function buildAlt(
  img: GalleryImage,
  project: { name: string; postalCode?: string; city?: string },
): string {
  if (img.alt) return img.alt;
  const place = [project.postalCode, project.city].filter(Boolean).join(" ");
  const base = `${categoryLabel(img.category)} ${project.name}${place ? `, ${place}` : ""}`;
  const detail = img.caption ?? (img.date ? `Stand ${img.date}` : "");
  return detail ? `${base} – ${detail}` : base;
}

/** Echte Aufnahmen liegen vor – Platzhalter nur noch für fehlende Motive. */
export const usePlaceholders = false;

/**
 * Deckblatt (Titelbild) von Rotkamp 1 – die Außenvisualisierung.
 *
 * ABLEGEN: Datei als `public/images/rotkamp-1/visualisierung-aussen.jpg`
 * speichern, dann `available: true` setzen. Bis dahin greift automatisch das
 * Innenfoto, damit die Seite nie ein fehlendes Bild zeigt.
 */
export const rotkampCover = {
  available: true,
  src: "/images/rotkamp-1/visualisierung-aussen.jpg",
  fallbackSrc: "/images/rotkamp-1/wohnraum-balkon.jpg",
  alt: "Außenvisualisierung Rotkamp 1, 30900 Wedemark – Klinkerfassade mit Satteldach und Stellplätzen",
  fallbackAlt:
    "Wohnraum mit bodentiefen Fenstern und Balkonzugang, Rotkamp 1, 30900 Wedemark",
} as const;

/** Das tatsächlich zu verwendende Titelbild samt passendem Alt-Text. */
export function coverImage() {
  return rotkampCover.available
    ? { src: rotkampCover.src, alt: rotkampCover.alt, isVisualisation: true }
    : {
        src: rotkampCover.fallbackSrc,
        alt: rotkampCover.fallbackAlt,
        isVisualisation: false,
      };
}

/**
 * Bildmaterial Rotkamp 1. Echte Fotos und Planzeichnungen aus dem Projekt.
 * ERGÄNZEN: Sobald finale Außen-Renderings vorliegen, hier oben einfügen –
 * das erste Bild der Liste lädt priorisiert.
 */
export const rotkampGallery: GalleryImage[] = [
  {
    src: "/images/rotkamp-1/visualisierung-aussen.jpg",
    category: "aussen",
    width: 1191,
    height: 842,
    caption: "Klinkerfassade mit Satteldach, Stellplätze im Innenhof",
  },
  {
    src: "/images/rotkamp-1/wohnraum-balkon.jpg",
    category: "innen",
    width: 1086,
    height: 1448,
    caption: "Wohnraum mit bodentiefen Fenstern und Balkonzugang",
  },
  {
    src: "/images/rotkamp-1/zimmer-fenster.jpg",
    category: "innen",
    width: 1086,
    height: 1448,
    caption: "Zimmer mit bodentiefem Fenster",
  },
  {
    src: "/images/rotkamp-1/dachgeschoss-balkon.jpg",
    category: "baustand",
    width: 1086,
    height: 1448,
    caption: "Dachgeschosswohnung mit Balkonzugang",
    date: "Ausbau",
  },
  {
    src: "/images/rotkamp-1/dachgeschoss-giebel.jpg",
    category: "baustand",
    width: 1086,
    height: 1448,
    caption: "Dachgeschoss mit Giebelfenster und Dachflächenfenster",
    date: "Ausbau",
  },
  {
    src: "/images/rotkamp-1/ansichten.jpg",
    category: "aussen",
    width: 1290,
    height: 1090,
    caption: "Ansichten Nord, Ost, Süd und West – Klinker mit abgesetztem Dachgeschoss",
  },
  {
    src: "/images/rotkamp-1/lageplan.jpg",
    category: "umgebung",
    width: 1290,
    height: 639,
    caption: "Lageplan: drei Baukörper mit Garagen und Carports",
  },
];

/**
 * Bildmaterial Bissendorfer Straße 21 (fertiggestellt).
 * ERGÄNZEN: weitere Aufnahmen – Innenräume, Treppenhaus, Rückseite. Die Galerie
 * ist als Slider angelegt und nimmt zusätzliche Motive ohne Anpassung auf.
 */
export const bissendorfGallery: GalleryImage[] = [
  {
    src: "/images/bissendorfer-strasse-21/aussenansicht-strasse.jpg",
    category: "aussen",
    width: 2048,
    height: 1536,
    caption: "Straßenansicht mit verglastem Treppenhaus und Stellplätzen",
    date: "August 2023",
  },
];
