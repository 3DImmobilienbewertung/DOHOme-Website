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
    src: "/images/rotkamp-1/wohnraum-eckfenster.jpg",
    category: "innen",
    width: 1086,
    height: 1448,
    caption: "Wohnraum mit Balkonzugang und Eckfenster",
  },
  {
    src: "/images/rotkamp-1/zimmer-strassenfenster.jpg",
    category: "innen",
    width: 1086,
    height: 1448,
    caption: "Zimmer mit bodentiefem Fenster zur Grünfläche",
  },
  {
    src: "/images/rotkamp-1/flur.jpg",
    category: "innen",
    width: 1086,
    height: 1448,
    caption: "Flur mit Tageslicht bis in die Tiefe der Wohnung",
  },
  {
    src: "/images/rotkamp-1/zimmer-schmal.jpg",
    category: "innen",
    width: 1086,
    height: 1448,
    caption: "Zimmer mit bodentiefer Fenstertür",
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
 * Bildmaterial Bissendorfer Straße 11 (fertiggestellt).
 * ERGÄNZEN: weitere Aufnahmen – Innenräume, Treppenhaus, Rückseite. Die Galerie
 * ist als Slider angelegt und nimmt zusätzliche Motive ohne Anpassung auf.
 */
export const bissendorfGallery: GalleryImage[] = [
  {
    src: "/images/bissendorfer-strasse-11/strassenansicht-sonne.jpg",
    category: "aussen",
    width: 1600,
    height: 1200,
    caption: "Straßenansicht mit verglastem Treppenhaus über zwei Geschosse",
  },
  {
    src: "/images/bissendorfer-strasse-11/wohnraum-terrassentuer.jpg",
    category: "innen",
    width: 1600,
    height: 1200,
    caption: "Wohnraum mit Terrassentür und Fenster zum Garten",
  },
  {
    src: "/images/bissendorfer-strasse-11/privatgarten.jpg",
    category: "aussen",
    width: 1600,
    height: 1200,
    caption: "Privatgarten mit gepflasterter Terrasse",
  },
  {
    src: "/images/bissendorfer-strasse-11/zimmer-gartenseite.jpg",
    category: "innen",
    width: 1600,
    height: 1200,
    caption: "Zimmer zur ruhigen Gartenseite",
  },
  {
    src: "/images/bissendorfer-strasse-11/zimmer-strassenseite.jpg",
    category: "innen",
    width: 1600,
    height: 1200,
    caption: "Zimmer mit Fenster zur Straßenseite",
  },
  {
    src: "/images/bissendorfer-strasse-11/tiefgaragenzufahrt.jpg",
    category: "aussen",
    width: 1600,
    height: 1200,
    caption: "Zufahrt zur Tiefgarage, Stellplätze ebenerdig am Haus",
  },
  {
    src: "/images/bissendorfer-strasse-11/aussenansicht-strasse.jpg",
    category: "aussen",
    width: 2048,
    height: 1536,
    caption: "Gebäude von der Straße, Klinker mit Satteldach",
    date: "August 2023",
  },
];

/**
 * Bildmaterial Walsroder Straße 7 (fertiggestellt). Luftaufnahmen aus dem
 * Marketing-Archiv (DJI). ERGÄNZEN: Innenaufnahmen, sobald verfügbar.
 */
export const walsroderGallery: GalleryImage[] = [
  {
    src: "/images/walsroder-strasse-7/luftbild-strassenseite.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Straßenseite mit verglastem Treppenhaus und Carports",
  },
  {
    src: "/images/walsroder-strasse-7/gartenseite-balkone.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Gartenseite mit Balkonen, dahinter offene Feldflur",
  },
];

/**
 * Bildmaterial Walsroder Straße 9 (fertiggestellt) – Nachbarobjekt der
 * Nummer 7, gemeinsamer Innenhof. ERGÄNZEN: Innenaufnahmen.
 */
export const walsroder9Gallery: GalleryImage[] = [
  {
    src: "/images/walsroder-strasse-9/carports-innenhof.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Carports und Stellplätze im gemeinsamen Innenhof",
  },
  {
    src: "/images/walsroder-strasse-9/gartenseite-balkone.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Balkone und Terrassen zur ruhigen Rückseite",
  },
];

/**
 * Bildmaterial Holunderweg 2 a/b (fertiggestellt). Luftaufnahmen aus dem
 * Marketing-Archiv (DJI). ERGÄNZEN: Innenaufnahmen.
 */
export const holunderwegGallery: GalleryImage[] = [
  {
    src: "/images/holunderweg-2/luftbild-balkone.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Balkone und Dachterrassen zur ruhigen Gartenseite",
  },
  {
    src: "/images/holunderweg-2/luftbild-strasse-garagen.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Zwei Hauseingänge mit Garagen an der Wohnstraße",
  },
  {
    src: "/images/holunderweg-2/strassenansicht.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Klinkerfassade an begrünter Wohnstraße",
  },
];

/** Bildmaterial Walsroder Straße 10 b (fertiggestellt). */
export const walsroder10bGallery: GalleryImage[] = [
  {
    src: "/images/walsroder-strasse-10b/luftbild-zufahrt.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Zufahrt und Stellplätze, zwei Vollgeschosse in Klinker",
  },
  {
    src: "/images/walsroder-strasse-10b/giebelseite.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Giebelseite mit Satteldach",
  },
  {
    src: "/images/walsroder-strasse-10b/gartenseite.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Gartenseite mit Balkonen und Terrassen",
  },
];

/** Bildmaterial Am Beekeufer 11 (fertiggestellt). */
export const beekeuferGallery: GalleryImage[] = [
  {
    src: "/images/am-beekeufer-11/luftbild-photovoltaik.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Klinkerfassade mit Photovoltaik auf dem Satteldach",
  },
  {
    src: "/images/am-beekeufer-11/gaerten-obenansicht.jpg",
    category: "aussen",
    width: 1125,
    height: 2000,
    caption: "Gartenanteile und Terrassen von oben",
  },
];

/** Bildmaterial Holunderweg 4 (fertiggestellt) – Luftaufnahmen. */
export const holunderweg4Gallery: GalleryImage[] = [
  {
    src: "/images/holunderweg-4/luftbild-bahnseite.jpg",
    category: "aussen",
    width: 2000,
    height: 1125,
    caption: "Luftbild mit Blick zur Bahnseite, Garagen und Gärten",
  },
  {
    src: "/images/holunderweg-4/dachansicht-gaerten.jpg",
    category: "aussen",
    width: 1125,
    height: 2000,
    caption: "Dachansicht mit Gärten und Stellplätzen",
  },
];
