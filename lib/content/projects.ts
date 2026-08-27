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
  walsroderGallery,
  walsroder9Gallery,
  holunderwegGallery,
  walsroder32Gallery,
  holunderweg4Gallery,
  beekeuferGallery,
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
  walsroder,
  walsroderStory,
} from "@/lib/content/walsroder";
import {
  walsroder9,
  walsroder9Story,
} from "@/lib/content/walsroder9";
import {
  holunderweg,
  holunderwegStory,
} from "@/lib/content/holunderweg";
import {
  walsroder32,
  walsroder32Story,
} from "@/lib/content/walsroder32";
import {
  beekeufer,
  beekeuferStory,
} from "@/lib/content/beekeufer";
import {
  holunderweg4,
  holunderweg4Story,
} from "@/lib/content/holunderweg4";
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
  /** Gesamtwohnfläche des Projekts in m² – Grundlage der Unternehmenskennzahlen. */
  totalAreaSqm: number | null;
  /** Wohnfläche je Einheit in m². */
  area: { min: number; max: number } | null;
  rooms: { min: number; max: number } | null;
  /** Geplanter Projektstart bzw. Veröffentlichungszeitpunkt. */
  targetYear?: number;
  image: { src: string; alt: string };
  /** Bildstrecke für den Slider auf der Projektseite. */
  gallery?: GalleryImage[];
  /**
   * Projektvideo (Drohnenflug). Ohne Autoplay – der Besucher startet es
   * selbst. `portrait` für Aufnahmen im Hochformat.
   */
  video?: { src: string; poster: string; caption?: string; portrait?: boolean };
  /** Fließtext zur Architektur/Ausführung. */
  story?: { title: string; paragraphs: string[] };
  /** Kennzahlen als Definitionsliste. */
  facts?: ProjectFact[];
  /**
   * Presseberichte über DIESES Projekt (E-E-A-T). Nur verlinken, nicht den
   * Artikeltext übernehmen – Urheberrecht.
   */
  press?: { outlet: string; headline: string; url: string }[];
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
const dec2 = (n: number) =>
  n.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const r = rotkamp.facts;
const b = bissendorf.facts;
const w = walsroder.facts;
const w9 = walsroder9.facts;
const w32 = walsroder32.facts;
const bk = beekeufer.facts;
const h4 = holunderweg4.facts;
const h = holunderweg.facts;

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
    totalAreaSqm: r.totalArea,
    area: { min: r.area.min, max: r.area.max },
    rooms: { min: r.rooms.min, max: r.rooms.max },
    image: {
      src: "/images/rotkamp-1/luftbild-projekt.jpg",
      alt: `Luftbild ${rotkamp.name}, ${rotkamp.postalCode} ${rotkamp.city} – drei Wohngebäude mit Photovoltaik, Garagen und Stellplätzen`,
    },
    gallery: rotkampGallery,
    video: {
      src: "/video/rotkamp-1.mp4",
      poster: "/video/rotkamp-1-poster.jpg",
      caption:
        "Drohnenflug über Rotkamp 1 – die drei Baukörper kurz vor Fertigstellung.",
      portrait: true,
    },
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
        "Berechnet wird die verfügbare WE 3: 62,59 m², Erdgeschoss mit Terrasse, Garten und Außenstellplatz.",
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
    slug: "poststrasse-14",
    name: "Poststraße 14",
    phase: "zukuenftig",
    isFlagship: false,
    city: "Wedemark",
    postalCode: "30900",
    district: "Elze",
    targetYear: 2027,
    teaser:
      "15 barrierefreie Miet- und Eigentumswohnungen mit begrünten Holzcarports – derzeit in Planung.",
    units: { total: 15, sold: 0, available: 0 },
    totalAreaSqm: null,
    area: null,
    rooms: null,
    image: {
      src: "/images/poststrasse-14/visualisierung-poster.jpg",
      alt: "Außenvisualisierung Poststraße 14 in 30900 Wedemark-Elze mit Klinkerfassade und begrünten Carports",
    },
    gallery: [
      {
        src: "/images/poststrasse-14/visualisierung-poster.jpg",
        category: "aussen",
        caption: "Geplanter Entwurf mit Klinkerfassade und begrünten Carports",
        width: 1280,
        height: 720,
      },
      {
        src: "/images/poststrasse-14/lageplan.png",
        category: "grundriss",
        caption: "Lageplan mit Wohngebäude, Carports und Nebenanlage",
        width: 1840,
        height: 1150,
      },
    ],
    video: {
      src: "/video/poststrasse-14/projektvisualisierung-720.mp4",
      poster: "/images/poststrasse-14/visualisierung-poster.jpg",
      caption: "Projektvisualisierung des aktuellen Planungsstands.",
    },
    story: {
      title: "Nächstes Projekt: Poststraße 14",
      paragraphs: [
        "Geplant ist ein Mehrfamilienhaus mit 15 barrierefreien Miet- und Eigentumswohnungen. Rotkamp 1 bleibt bis zum Vermarktungsstart das aktuelle Leuchtturmprojekt.",
      ],
    },
    facts: [
      { k: "Status", v: "Coming soon · geplant für 2027" },
      { k: "Wohneinheiten", v: "15 barrierefreie Wohnungen" },
      { k: "Geschosse", v: "2 Vollgeschosse + Dachgeschoss" },
      { k: "Stellplätze", v: "12 extensiv begrünte Holzcarports" },
      { k: "Rollstuhlgerecht", v: "2 Carport-Stellplätze" },
      { k: "Nebenanlage", v: "Haustechnik- und Fahrradhaus" },
      { k: "Grundstück", v: "1.228 m²" },
      { k: "Wohnfläche", v: "Wird in der laufenden Planung ermittelt" },
    ],
    location: {
      copy: ["Poststraße 14 im Ortsteil Elze, 30900 Wedemark."],
      neighbourhood: [],
      address: "Poststraße 14, 30900 Wedemark",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Poststra%C3%9Fe%2014%2C%2030900%20Wedemark",
      mapsEmbedUrl:
        "https://www.google.com/maps?q=Poststra%C3%9Fe+14,+30900+Wedemark&output=embed",
    },
  },
  {
    slug: "bissendorfer-strasse-11",
    name: bissendorf.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: bissendorf.city,
    postalCode: bissendorf.postalCode,
    teaser: `${bissendorf.units.total} seniorengerechte Wohnungen – mit verglastem Treppenhaus, Tiefgarage und eigenem Abstellraum je Einheit.`,
    units: {
      total: bissendorf.units.total,
      sold: bissendorf.units.sold,
      available: 0,
    },
    totalAreaSqm: b.totalArea,
    area: { min: b.area.min, max: b.area.max },
    rooms: { min: b.rooms.min, max: b.rooms.max },
    image: {
      src: "/images/bissendorfer-strasse-11/strassenansicht-sonne.jpg",
      alt: `${bissendorf.name}, ${bissendorf.postalCode} ${bissendorf.city} – Klinkerfassade mit Satteldach und verglastem Treppenhaus`,
    },
    press: [
      {
        outlet: "Hannoversche Allgemeine Zeitung",
        headline: "Bauboom in der Wedemark – Kritiker fordern Ideen",
        url: "https://www.haz.de/lokales/umland/wedemark/bauboom-in-der-wedemark-kritiker-befuerchten-verstaedterung-und-fordern-ideen-SNB2DP66PFEZEOMZSMF3HN4YK4.html",
      },
    ],
    gallery: bissendorfGallery,
    story: {
      title: "Seniorengerecht und klar gegliedert",
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
        `${bissendorf.name} liegt an einer gewachsenen Ortsdurchfahrt. Klinker und Satteldach greifen die Bauweise der Umgebung auf.`,
        "Der Eingang ist klar zur Straße orientiert; das verglaste Treppenhaus bringt Tageslicht in die Erschließung.",
      ],
      neighbourhood: [],
      address: `${bissendorf.street}, ${bissendorf.postalCode} ${bissendorf.city}`,
      mapsUrl: bissendorf.mapsUrl,
      mapsEmbedUrl: bissendorf.mapsEmbedUrl,
    },
  },
  {
    slug: "walsroder-strasse-7",
    name: walsroder.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: walsroder.city,
    postalCode: walsroder.postalCode,
    teaser: `${walsroder.units.total} Wohnungen – mit verglastem Treppenhaus, Balkonen, Erdgeschossterrassen und Carports.`,
    units: { total: walsroder.units.total, sold: walsroder.units.sold, available: 0 },
    totalAreaSqm: w.totalArea,
    // Wohnungsspiegel liegt noch nicht vor – deshalb keine Spanne je Wohnung,
    // nur die belegte Gesamtfläche in den Fakten.
    area: null,
    rooms: null,
    image: {
      src: "/images/walsroder-strasse-7/luftbild-strassenseite.jpg",
      alt: `${walsroder.name}, ${walsroder.postalCode} ${walsroder.city} – Klinkerfassade mit Satteldach, verglastes Treppenhaus und Carports`,
    },
    gallery: walsroderGallery,
    story: { title: "Licht, Freiraum und klare Wege", paragraphs: walsroderStory },
    facts: [
      { k: "Wohneinheiten", v: `${walsroder.units.total} Wohnungen` },
      { k: "Gesamtwohnfläche", v: `${dec(w.totalArea)} m²` },
      { k: "Fassade", v: walsroder.architecture.facade },
      { k: "Dach", v: walsroder.architecture.roof },
      { k: "Besonderheit", v: walsroder.architecture.detail },
      { k: "Freiflächen", v: walsroder.architecture.balconies },
      { k: "Stellplätze", v: walsroder.architecture.parking },
    ],
    location: {
      copy: [
        `${walsroder.name} liegt am Ortsrand zwischen Straße und offener Feldflur. Die rückwärtigen Wohnungen orientieren sich ins Grüne.`,
        "Carports und Stellplätze liegen direkt auf dem eigenen Grundstück.",
      ],
      neighbourhood: [],
      address: `${walsroder.street}, ${walsroder.postalCode} ${walsroder.city}`,
      mapsUrl: walsroder.mapsUrl,
      mapsEmbedUrl: walsroder.mapsEmbedUrl,
    },
  },
  {
    slug: "walsroder-strasse-9",
    name: walsroder9.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: walsroder9.city,
    postalCode: walsroder9.postalCode,
    teaser: `${walsroder9.units.total} Wohnungen – mit Balkonen, Erdgeschossterrassen und geschütztem Innenhof mit Carports.`,
    units: { total: walsroder9.units.total, sold: walsroder9.units.sold, available: 0 },
    totalAreaSqm: w9.totalArea,
    area: null,
    rooms: null,
    image: {
      src: "/images/walsroder-strasse-9/carports-innenhof.jpg",
      alt: `${walsroder9.name}, ${walsroder9.postalCode} ${walsroder9.city} – Klinkerfassade mit Satteldach und Carports im Innenhof`,
    },
    gallery: walsroder9Gallery,
    story: { title: "Ein geschützter gemeinsamer Hof", paragraphs: walsroder9Story },
    press: [
      {
        outlet: "Hannoversche Allgemeine Zeitung",
        headline: "Bürgermeister: Vorzeigeprojekt für Wedemark",
        url: "https://www.haz.de/lokales/umland/wedemark/buergermeister-vorzeigeprojekt-fuer-wedemark-5VMAH23YYTLM4PAVVT4ODNG6UU.html",
      },
      {
        outlet: "Hannoversche Allgemeine Zeitung",
        headline: "Vorzeigeprojekt für Wedemark",
        url: "https://www.haz.de/lokales/umland/wedemark/buergermeister-vorzeigeprojekt-fuer-wedemark-5FMPP7K2PV2K4GMMJCM6NKEWHM.html",
      },
    ],
    facts: [
      { k: "Wohneinheiten", v: `${walsroder9.units.total} Wohnungen` },
      { k: "Gesamtwohnfläche", v: `${dec(w9.totalArea)} m²` },
      { k: "Fassade", v: walsroder9.architecture.facade },
      { k: "Dach", v: walsroder9.architecture.roof },
      { k: "Freiflächen", v: walsroder9.architecture.balconies },
      { k: "Stellplätze", v: walsroder9.architecture.parking },
    ],
    location: {
      copy: [
        `${walsroder9.name} steht direkt neben der Nummer 7. Beide Gebäude fassen einen gemeinsamen Innenhof mit Carports und Stellplätzen.`,
        "Zur Rückseite öffnen sich Balkone und Erdgeschossterrassen in Richtung der Außenbereiche.",
      ],
      neighbourhood: [],
      address: `${walsroder9.street}, ${walsroder9.postalCode} ${walsroder9.city}`,
      mapsUrl: walsroder9.mapsUrl,
      mapsEmbedUrl: walsroder9.mapsEmbedUrl,
    },
  },
  {
    slug: "holunderweg-2",
    name: holunderweg.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: holunderweg.city,
    postalCode: holunderweg.postalCode,
    teaser: `${holunderweg.units.total} Wohnungen in zwei Hauseingängen – mit Balkonen, Dachterrassen, Erdgeschossgärten und Keller.`,
    units: { total: holunderweg.units.total, sold: holunderweg.units.sold, available: 0 },
    totalAreaSqm: h.totalArea,
    area: null,
    rooms: null,
    image: {
      src: "/images/holunderweg-2/luftbild-balkone.jpg",
      alt: `${holunderweg.name}, ${holunderweg.postalCode} ${holunderweg.city} – Klinkerfassade mit Satteldach, Balkone und Dachterrassen`,
    },
    gallery: holunderwegGallery,
    story: {
      title: "Zwei Eingänge, ein ruhiges Wohnensemble",
      paragraphs: holunderwegStory,
    },
    facts: [
      { k: "Wohneinheiten", v: `${holunderweg.units.total} Wohnungen in zwei Hauseingängen` },
      { k: "Gesamtwohnfläche", v: `${dec2(h.totalArea)} m²` },
      { k: "Keller", v: "voll unterkellert" },
      { k: "Fassade", v: holunderweg.architecture.facade },
      { k: "Dach", v: holunderweg.architecture.roof },
      { k: "Freiflächen", v: holunderweg.architecture.balconies },
      { k: "Stellplätze", v: holunderweg.architecture.parking },
    ],
    location: {
      copy: [
        `${holunderweg.name} ist in zwei überschaubare Hauseingänge gegliedert. Garagen und Stellplätze liegen direkt auf dem Grundstück.`,
      ],
      neighbourhood: [],
      address: `${holunderweg.street}, ${holunderweg.postalCode} ${holunderweg.city}`,
      mapsUrl: holunderweg.mapsUrl,
      mapsEmbedUrl: holunderweg.mapsEmbedUrl,
    },
  },
  {
    slug: "walsroder-strasse-32-a-b",
    name: walsroder32.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: walsroder32.city,
    postalCode: walsroder32.postalCode,
    teaser: `${walsroder32.units.total} Wohnungen auf zwei Vollgeschossen – mit Balkonen, Terrassen, Gartenanteilen und Keller.`,
    units: { total: walsroder32.units.total, sold: walsroder32.units.sold, available: 0 },
    totalAreaSqm: w32.totalArea,
    area: null,
    rooms: null,
    image: {
      src: "/images/walsroder-strasse-32-a-b/luftbild-zufahrt.jpg",
      alt: `${walsroder32.name}, ${walsroder32.postalCode} ${walsroder32.city} – Klinkerfassade mit Satteldach über zwei Vollgeschosse`,
    },
    gallery: walsroder32Gallery,
    story: { title: "Zwei Geschosse, bewusst kompakt", paragraphs: walsroder32Story },
    facts: [
      { k: "Wohneinheiten", v: `${walsroder32.units.total} Wohnungen` },
      { k: "Gesamtwohnfläche", v: `${dec(w32.totalArea)} m²` },
      { k: "Geschosse", v: `${w32.fullStoreys} Vollgeschosse` },
      { k: "Keller", v: "voll unterkellert" },
      { k: "Fassade", v: walsroder32.architecture.facade },
      { k: "Freiflächen", v: walsroder32.architecture.balconies },
      { k: "Stellplätze", v: walsroder32.architecture.parking },
    ],
    location: {
      copy: [
        `${walsroder32.name} liegt in einer gewachsenen Wohnstraße. Die zwei Vollgeschosse nehmen den Maßstab der umgebenden Bebauung auf.`,
      ],
      neighbourhood: [],
      address: `${walsroder32.street}, ${walsroder32.postalCode} ${walsroder32.city}`,
      mapsUrl: walsroder32.mapsUrl,
      mapsEmbedUrl: walsroder32.mapsEmbedUrl,
    },
  },
  {
    slug: "am-beekeufer-11",
    name: beekeufer.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: beekeufer.city,
    postalCode: beekeufer.postalCode,
    teaser: `${beekeufer.units.total} Wohnungen – mit Balkonen, Dachterrassen, Erdgeschossgärten und Keller.`,
    units: { total: beekeufer.units.total, sold: beekeufer.units.sold, available: 0 },
    totalAreaSqm: bk.totalArea,
    area: null,
    rooms: null,
    image: {
      src: "/images/am-beekeufer-11/luftbild-wohnanlage.jpg",
      alt: `${beekeufer.name}, ${beekeufer.postalCode} ${beekeufer.city} – Wohnanlage mit Klinkerfassade und Satteldach`,
    },
    gallery: beekeuferGallery,
    story: { title: "Wohnraum mit großzügigen Freiflächen", paragraphs: beekeuferStory },
    facts: [
      { k: "Wohneinheiten", v: `${beekeufer.units.total} Wohnungen` },
      { k: "Gesamtwohnfläche", v: `${dec(bk.totalArea)} m²` },
      { k: "Dach", v: beekeufer.architecture.roof },
      { k: "Keller", v: "voll unterkellert" },
      { k: "Fassade", v: beekeufer.architecture.facade },
      { k: "Freiflächen", v: beekeufer.architecture.balconies },
      { k: "Stellplätze", v: beekeufer.architecture.parking },
    ],
    location: {
      copy: [
        `${beekeufer.name} liegt in ruhiger Wohnlage abseits der Durchgangsstraßen. Garagen und Stellplätze befinden sich direkt auf dem Grundstück.`,
      ],
      neighbourhood: [],
      address: `${beekeufer.street}, ${beekeufer.postalCode} ${beekeufer.city}`,
      mapsUrl: beekeufer.mapsUrl,
      mapsEmbedUrl: beekeufer.mapsEmbedUrl,
    },
  },
  {
    slug: "holunderweg-4",
    name: holunderweg4.name,
    phase: "abgeschlossen",
    isFlagship: false,
    city: holunderweg4.city,
    postalCode: holunderweg4.postalCode,
    teaser: `${holunderweg4.units.total} Wohnungen – mit Balkonen, Dachterrassen, Erdgeschossgärten und Keller.`,
    units: { total: holunderweg4.units.total, sold: holunderweg4.units.sold, available: 0 },
    totalAreaSqm: h4.totalArea,
    area: null,
    rooms: null,
    image: {
      src: "/images/holunderweg-4/luftbild-bahnseite.jpg",
      alt: `${holunderweg4.name}, ${holunderweg4.postalCode} ${holunderweg4.city} – Klinkerfassade mit Satteldach`,
    },
    gallery: holunderweg4Gallery,
    story: { title: "Drei Eingänge, großzügige Freiflächen", paragraphs: holunderweg4Story },
    facts: [
      { k: "Wohneinheiten", v: `${holunderweg4.units.total} Wohnungen` },
      { k: "Gesamtwohnfläche", v: `${dec(h4.totalArea)} m²` },
      { k: "Keller", v: "voll unterkellert" },
      { k: "Fassade", v: holunderweg4.architecture.facade },
      { k: "Dach", v: holunderweg4.architecture.roof },
      { k: "Freiflächen", v: holunderweg4.architecture.balconies },
      { k: "Stellplätze", v: holunderweg4.architecture.parking },
    ],
    location: {
      copy: [
        `${holunderweg4.name} liegt am Ortsrand in einer gewachsenen Wohnlage. Klinkerfassade und Satteldach orientieren sich an der umgebenden Bebauung.`,
      ],
      neighbourhood: [],
      address: `${holunderweg4.street}, ${holunderweg4.postalCode} ${holunderweg4.city}`,
      mapsUrl: holunderweg4.mapsUrl,
      mapsEmbedUrl: holunderweg4.mapsEmbedUrl,
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
    total_area_sqm: p.totalAreaSqm ?? undefined,
    units_total: p.units.total,
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

/**
 * Belegte Unternehmenskennzahlen, aus dem Portfolio abgeleitet.
 *
 * Bewusst berechnet statt gepflegt: Sobald ein Projekt dazukommt, stimmen
 * Startseite und Über-uns automatisch. Handgepflegte Zahlen laufen
 * erfahrungsgemäß irgendwann auseinander.
 */
const deliveredAndCurrent = portfolio.filter((p) => p.phase !== "zukuenftig");

export const portfolioTotals = {
  projects: deliveredAndCurrent.length,
  units: deliveredAndCurrent.reduce((s, p) => s + p.units.total, 0),
  livingSpace: Math.round(
    deliveredAndCurrent.reduce((s, p) => s + (p.totalAreaSqm ?? 0), 0),
  ),
};
