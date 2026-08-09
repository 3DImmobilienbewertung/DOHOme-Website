// Portfolio-Registry: alle Bauvorhaben von DOHOme.
//
// Diese Datei ist die Quelle der Wahrheit, solange die Supabase-Anbindung
// nicht steht. Sobald `NEXT_PUBLIC_SUPABASE_URL`/`..._ANON_KEY` gesetzt sind,
// übernehmen die Aggregations-Views die Verfügbarkeiten (siehe
// app/(main)/projekte/page.tsx) – die Registry bleibt dann als Fallback und
// als Quelle für Bild, Teaser und Detailinhalte bestehen.
//
// ERGÄNZEN: Weitere Projekte als Objekt in `portfolio` eintragen. Die
// Projektdetailseite rendert alle gepflegten Abschnitte automatisch; fehlt ein
// Abschnitt (z. B. keine Lagedaten), wird er ausgelassen statt erfunden.

import type { ProjectSummary } from "@/lib/supabase/public";
import type { Unit, PoiGroup } from "@/lib/content/types";
import type { GalleryImage } from "@/lib/content/gallery";
import {
  rotkampGallery,
  bissendorfGallery,
  rotkampCover,
} from "@/lib/content/gallery";
import {
  rotkamp,
  units as rotkampUnits,
  neighbourhood,
  locationCopy,
  unitsAvailable,
  parkingTotal,
  accessibleUnits,
} from "@/lib/content/rotkamp";
import {
  bissendorf,
  bissendorfUnits,
  bissendorfStory,
} from "@/lib/content/bissendorf";
import {
  rotkampCalcDefaults,
  type CalcInput,
} from "@/lib/content/beispielrechnung";

export type ProjectFact = { k: string; v: string };

export type ProjectLocation = {
  /** Fließtext zur Lage. */
  copy: string[];
  neighbourhood: PoiGroup[];
  address: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
};

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
  /** Bildstrecke für den Slider auf der Projektseite. */
  gallery?: GalleryImage[];
  /** Fließtext zur Architektur/Ausführung. */
  story?: { title: string; paragraphs: string[] };
  /** Kennzahlen als Definitionsliste. */
  facts?: ProjectFact[];
  /** Wohnungsspiegel. */
  unitList?: Unit[];
  /**
   * Aussage zur Zugänglichkeit, die für ALLE Wohnungen gilt – z. B.
   * „alle Wohnungen seniorengerecht“.
   *
   * Wortlaut wird unverändert übernommen. Nicht zu „barrierefrei“ aufwerten:
   * Der Begriff ist über DIN 18040-2 definiert und braucht einen Nachweis.
   */
  accessibilityNote?: string;
  /**
   * Sachlicher Steuerhinweis für vermietende Käufer.
   *
   * Grundsätze: exakter Paragraf, Voraussetzungen benannt, Vorbehalt der
   * steuerlichen Beratung. KEINE Renditeversprechen, KEIN „Kapitalanlage“ –
   * DOHOme verkauft eigene Wohnungen, die Website bleibt frei von
   * maklertypischem Anlagejargon. Nur setzen, wo tatsächlich noch Einheiten
   * erworben werden können.
   */
  taxNote?: { title: string; paragraphs: string[]; disclaimer: string };
  /**
   * Ausgangswerte der 10-Jahres-Beispielrechnung. Nur setzen, wo tatsächlich
   * noch Einheiten erworben werden können – bei vollständig vermarkteten
   * Projekten wäre die Rechnung gegenstandslos.
   */
  calc?: { defaults: CalcInput; unitNote?: string };
  location?: ProjectLocation;
  /**
   * Eigene Landingpage (Anzeigen), falls vorhanden. Die Projektdetailseite
   * unter /projekte/<slug> existiert unabhängig davon.
   */
  landingPage?: string;
};

const dec = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 });
const r = rotkamp.facts;
const b = bissendorf.facts;

export const portfolio: PortfolioProject[] = [
  {
    slug: "rotkamp-1",
    name: rotkamp.name,
    phase: "laufend",
    isFlagship: true,
    city: rotkamp.city,
    postalCode: rotkamp.postalCode,
    district: rotkamp.district,
    teaser: `${rotkamp.units.total} seniorengerechte Eigentumswohnungen in drei Häusern – Klinkerfassade, abgesetztes Dachgeschoss, Privatgärten im Erdgeschoss.`,
    units: {
      total: rotkamp.units.total,
      sold: rotkamp.units.sold,
      available: unitsAvailable,
    },
    area: { min: r.area.min, max: r.area.max },
    rooms: { min: r.rooms.min, max: r.rooms.max },
    image: { src: rotkampCover.src, alt: rotkampCover.alt },
    gallery: rotkampGallery,
    story: {
      title: "Gebaut, um lange zu bleiben",
      paragraphs: [
        `Drei Baukörper mit ${rotkamp.architecture.facade}fassade und ${rotkamp.architecture.roof}, das Dachgeschoss bewusst abgesetzt. Diese Handschrift ist in der Wedemark verwurzelt – sie altert gut und braucht in zwanzig Jahren keine Sanierung der Hülle.`,
        `Die Außenwände sind als ${rotkamp.architecture.construction} ausgeführt: eine Konstruktion, die Schlagregen abhält, Schall dämpft und den Klinker trägt, ohne dass eine aufgeklebte Dämmschicht das Erscheinungsbild bestimmt.`,
        "Im Erdgeschoss gehört zu jeder Wohnung ein Privatgarten, in den Obergeschossen ein Balkon. Für jede Wohnung ist ein Stellplatz vorhanden.",
        "Alle Wohnungen sind seniorengerecht ausgeführt; vier Einheiten zusätzlich behindertengerecht. Das ist keine Zusatzausstattung für den Einzelfall, sondern der Standard im ganzen Quartier.",
      ],
    },
    facts: [
      { k: "Fassade", v: `${rotkamp.architecture.facade}, ${rotkamp.architecture.construction}` },
      { k: "Dach", v: `${rotkamp.architecture.roof}, ${rotkamp.architecture.detail}` },
      { k: "Energiestandard", v: rotkamp.specs.energy ?? "Angabe folgt" },
      { k: "Gesamtwohnfläche", v: `${dec(r.totalArea)} m²` },
      { k: "Privatgärten (EG)", v: `${dec(r.gardens.min)} – ${dec(r.gardens.max)} m²` },
      {
        k: "Stellplätze",
        v: `${parkingTotal} – ${rotkamp.parking.garages} Garagen, ${rotkamp.parking.carports} Carports, ${rotkamp.parking.outdoor} Außenstellplätze`,
      },
      {
        k: "Zugänglichkeit",
        v: `Alle Wohnungen seniorengerecht, ${accessibleUnits.length} davon behindertengerecht`,
      },
      { k: "Geschosse", v: r.floors.join(", ") },
    ],
    unitList: rotkampUnits,
    accessibilityNote: rotkamp.accessibility,
    taxNote: {
      title: "Für Käufer, die vermieten",
      paragraphs: [
        "Wer eine Wohnung im Rotkamp 1 vermietet, kann das Gebäude nach § 7 Abs. 5a EStG degressiv abschreiben: 5 % vom jeweiligen Restwert – anstelle der linearen Abschreibung von 3 % pro Jahr, die für nach 2022 fertiggestellte Wohngebäude gilt.",
        "Voraussetzung ist unter anderem, dass der Baubeginn zwischen dem 1. Oktober 2023 und dem 30. September 2029 liegt und der Kaufvertrag bis zum Ende des Fertigstellungsjahres geschlossen wird. Ein späterer Wechsel zur linearen Abschreibung ist möglich.",
      ],
      disclaimer:
        "Diese Angabe dient der ersten Orientierung und ersetzt keine steuerliche Beratung. Ob und in welcher Höhe die Abschreibung in Ihrem Fall greift, klären Sie bitte mit Ihrer Steuerberaterin oder Ihrem Steuerberater.",
    },
    calc: {
      defaults: rotkampCalcDefaults,
      unitNote:
        "Als Beispiel dient eine 77,67 m² große Wohnung – dieser Zuschnitt ist aktuell noch verfügbar.",
    },
    location: {
      copy: locationCopy,
      neighbourhood,
      address: `${rotkamp.street}, ${rotkamp.postalCode} ${rotkamp.city}`,
      mapsUrl: rotkamp.mapsUrl,
      mapsEmbedUrl: rotkamp.mapsEmbedUrl,
    },
    landingPage: "/rotkamp-1",
  },
  {
    slug: "bissendorfer-strasse-21",
    name: bissendorf.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: bissendorf.city,
    postalCode: bissendorf.postalCode,
    teaser: `${bissendorf.units.total} seniorengerechte Wohnungen über drei Vollgeschosse – Klinkerfassade, verglastes Treppenhaus, Tiefgarage und ein eigener Abstellraum je Wohnung.`,
    units: {
      total: bissendorf.units.total,
      sold: bissendorf.units.sold,
      available: 0,
    },
    area: { min: b.area.min, max: b.area.max },
    rooms: { min: b.rooms.min, max: b.rooms.max },
    image: {
      src: "/images/bissendorfer-strasse-21/aussenansicht-strasse.jpg",
      alt: `${bissendorf.name}, ${bissendorf.postalCode} ${bissendorf.city} – Klinkerfassade mit Satteldach und verglastem Treppenhaus`,
    },
    gallery: bissendorfGallery,
    story: {
      title: "Eine Adresse, die sich einfügt",
      paragraphs: bissendorfStory,
    },
    facts: [
      { k: "Fassade", v: bissendorf.architecture.facade },
      { k: "Dach", v: bissendorf.architecture.roof },
      { k: "Besonderheit", v: bissendorf.architecture.detail },
      { k: "Zugänglichkeit", v: "Alle 21 Wohnungen seniorengerecht" },
      { k: "Balkone", v: bissendorf.architecture.balconies },
      { k: "Gesamtwohnfläche", v: `${dec(b.totalArea)} m²` },
      { k: "Beheizte Wohnfläche", v: `${dec(b.heatedArea)} m²` },
      { k: "Stellplätze", v: bissendorf.parking },
      {
        k: "Abstellräume",
        v: `${dec(b.storageArea)} m² Nutzfläche im ${b.storageLocation}`,
      },
      {
        k: "Geschosse",
        v: `${b.fullStoreys} Vollgeschosse – ${b.floors.join(", ")}`,
      },
    ],
    unitList: bissendorfUnits,
    accessibilityNote: bissendorf.accessibility,
    location: {
      copy: [
        `${bissendorf.name} liegt an einer gewachsenen Ortsdurchfahrt – Nachbarschaft statt Neubaugebiet am Feldrand. Das Gebäude nimmt mit Klinker und Satteldach die Bauweise der Umgebung auf und fügt sich in die Zeile ein, statt sich davor zu stellen.`,
        "Stellplätze liegen ebenerdig direkt am Haus, der Eingang ist von der Straße aus einsehbar und über das verglaste Treppenhaus tageslichtdurchflutet.",
      ],
      neighbourhood: [],
      address: `${bissendorf.street}, ${bissendorf.postalCode} ${bissendorf.city}`,
      mapsUrl: bissendorf.mapsUrl,
      mapsEmbedUrl: bissendorf.mapsEmbedUrl,
    },
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
 * statt Preis (siehe priceHint in ProjectFinder).
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
    .sort((a, b2) => {
      if (a.isFlagship !== b2.isFlagship) return a.isFlagship ? -1 : 1;
      return a.name.localeCompare(b2.name, "de");
    })
    .map(toSummary);
}
