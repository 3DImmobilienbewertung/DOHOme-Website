// Bildmaterial der Projekte (Visualisierungen, Innen-/Außenansichten, Baustand).
//
// NACHTRAGEN: Sobald die finalen Renderings und Fotos vorliegen:
//   1. Dateien nach /public/images/<projekt>/ legen
//   2. Unten je Bild einen Eintrag ergänzen (src, category, optional caption)
//   3. `usePlaceholders` auf false setzen
// Alt-Texte werden automatisch erzeugt (SEO + Barrierefreiheit), sofern kein
// eigener Text gesetzt ist. Lazy Loading und responsive Größen übernimmt die
// Galerie-Komponente.

import { projectImage } from "./media";

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

/** Solange true, werden Platzhalter-Motive gezeigt (klar markiert). */
export const usePlaceholders = true;

/** Bildmaterial Rotkamp 1. Platzhalter, bis echte Dateien vorliegen. */
export const rotkampGallery: GalleryImage[] = [
  { src: projectImage("dohome-rotkamp-a", 1600, 1100), category: "aussen", width: 1600, height: 1100, caption: "Straßenansicht" },
  { src: projectImage("dohome-rotkamp-b", 1600, 1100), category: "aussen", width: 1600, height: 1100, caption: "Gartenseite" },
  { src: projectImage("dohome-rotkamp-c", 1600, 1100), category: "innen", width: 1600, height: 1100, caption: "Wohnbereich" },
  { src: projectImage("dohome-rotkamp-d", 1600, 1100), category: "innen", width: 1600, height: 1100, caption: "Küche" },
  { src: projectImage("dohome-rotkamp-e", 1600, 1100), category: "umgebung", width: 1600, height: 1100, caption: "Lage in der Wedemark" },
  { src: projectImage("dohome-rotkamp-f", 1600, 1100), category: "baustand", width: 1600, height: 1100, date: "Juni 2026" },
];
