// Portfolio-Registry: alle Bauvorhaben von DOHOme.
//
// Diese Datei ist die Quelle der Wahrheit, solange die Supabase-Anbindung
// nicht steht. Sobald `NEXT_PUBLIC_SUPABASE_URL`/`..._ANON_KEY` gesetzt sind,
// übernehmen die Aggregations-Views die Verfügbarkeiten (siehe
// app/(main)/projekte/page.tsx) – die Registry bleibt dann als Fallback und
// als Quelle für Bild, Teaser und Detailtexte bestehen, die nicht in der
// Datenbank liegen.
//
// ERGÄNZEN: Weitere Projekte als Objekt in `portfolio` eintragen. Abgeschlossene
// Referenzen erhalten phase: "abgeschlossen" und units.available: 0.

import type { ProjectSummary } from "@/lib/supabase/public";
import { rotkamp, unitsAvailable } from "@/lib/content/rotkamp";
import { rotkampCover } from "@/lib/content/gallery";

export type PortfolioProject = {
  slug: string;
  name: string;
  phase: ProjectSummary["phase"];
  isFlagship: boolean;
  city: string;
  postalCode: string;
  /** Ortsteil, z. B. "Mellendorf" – schärft die lokale Auffindbarkeit. */
  district?: string;
  /** Ein Satz für die Übersichtskarte. */
  teaser: string;
  units: { total: number; sold: number; available: number };
  /** Wohnfläche je Einheit in m². */
  area: { min: number; max: number } | null;
  rooms: { min: number; max: number } | null;
  image: { src: string; alt: string };
  /**
   * Eigene Landingpage (Anzeigen), falls vorhanden. Die Projektdetailseite
   * unter /projekte/<slug> existiert unabhängig davon.
   */
  landingPage?: string;
};

export const portfolio: PortfolioProject[] = [
  {
    slug: "rotkamp-1",
    name: rotkamp.name,
    phase: "laufend",
    isFlagship: true,
    city: rotkamp.city,
    postalCode: rotkamp.postalCode,
    district: rotkamp.district,
    teaser: `${rotkamp.units.total} Eigentumswohnungen in drei Häusern – Klinkerfassade, abgesetztes Dachgeschoss, Privatgärten im Erdgeschoss.`,
    units: {
      total: rotkamp.units.total,
      sold: rotkamp.units.sold,
      available: unitsAvailable,
    },
    area: { min: rotkamp.facts.area.min, max: rotkamp.facts.area.max },
    rooms: { min: rotkamp.facts.rooms.min, max: rotkamp.facts.rooms.max },
    image: { src: rotkampCover.src, alt: rotkampCover.alt },
    landingPage: "/rotkamp-1",
  },
];

export function findProject(slug: string): PortfolioProject | null {
  return portfolio.find((p) => p.slug === slug) ?? null;
}

/**
 * Bringt ein Registry-Projekt in die Form der Aggregations-View, damit
 * Übersicht und Detailseite unabhängig von der Datenquelle dieselbe
 * Darstellung nutzen.
 *
 * Preisfelder bleiben bewusst `null`: Kaufpreise werden nicht auf der Website
 * ausgewiesen. Die Ansichten sind darauf ausgelegt und zeigen dann Verfügbarkeit
 * statt Preis (siehe availabilityHint in ProjectFinder).
 */
export function toSummary(p: PortfolioProject): ProjectSummary {
  return {
    project_id: p.slug,
    slug: p.slug,
    name: p.name,
    phase: p.phase,
    is_flagship: p.isFlagship,
    city: p.city,
    postal_code: p.postalCode,
    available_total: p.units.available,
    available_for_sale: p.units.available,
    available_for_rent: 0,
    area_sqm_min: p.area?.min ?? null,
    area_sqm_max: p.area?.max ?? null,
    rooms_min: p.rooms?.min ?? null,
    rooms_max: p.rooms?.max ?? null,
    sale_price_min: null,
    sale_price_max: null,
    price_per_sqm_from: null,
    rent_price_min: null,
    rent_price_max: null,
    earliest_available_from: null,
    updated_at: "",
  };
}

/** Die gesamte Registry in View-Form – Leuchtturmprojekte zuerst. */
export function portfolioSummaries(): ProjectSummary[] {
  return [...portfolio]
    .sort((a, b) => {
      if (a.isFlagship !== b.isFlagship) return a.isFlagship ? -1 : 1;
      return a.name.localeCompare(b.name, "de");
    })
    .map(toSummary);
}
