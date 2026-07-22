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
 * Bildmaterial Rotkamp 1. Echte Fotos und Planzeichnungen aus dem Projekt.
 * ERGÄNZEN: Sobald finale Außen-Renderings vorliegen, hier oben einfügen –
 * das erste Bild der Liste lädt priorisiert.
 */
export const rotkampGallery: GalleryImage[] = [
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
