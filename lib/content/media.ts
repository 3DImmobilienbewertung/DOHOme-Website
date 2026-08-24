// Einzige Quelle der Bildpfade.
//
// Projekte mit echtem Bildmaterial werden in PROJECT_IMAGE gepflegt; nur für
// Motive, die noch fehlen, greift ein externer Platzhalter. Ziel ist, dass vor
// dem Livegang kein Platzhalter mehr ausgeliefert wird – `missingImages()`
// listet auf, was dafür noch fehlt.

/** Echte Motive, Schlüssel = Slug bzw. Seed. ERGÄNZEN je neuem Projekt. */
const PROJECT_IMAGE: Record<string, string> = {
  "rotkamp-1": "/images/rotkamp-1/visualisierung-aussen.jpg",
  "bissendorfer-strasse-11":
    "/images/bissendorfer-strasse-11/strassenansicht-sonne.jpg",
  "walsroder-strasse-7":
    "/images/walsroder-strasse-7/luftbild-strassenseite.jpg",
  "walsroder-strasse-9":
    "/images/walsroder-strasse-9/carports-innenhof.jpg",
  "holunderweg-2": "/images/holunderweg-2/luftbild-balkone.jpg",
  "halzroder-strasse-32-a-b":
    "/images/halzroder-strasse-32-a-b/luftbild-zufahrt.jpg",
  "am-beekeufer-11": "/images/am-beekeufer-11/luftbild-photovoltaik.jpg",
  "holunderweg-4": "/images/holunderweg-4/luftbild-bahnseite.jpg",
};

/** True, wenn für den Schlüssel ein echtes Motiv hinterlegt ist. */
export function hasRealImage(seed: string): boolean {
  return seed in PROJECT_IMAGE;
}

export function projectImage(seed: string, width: number, height: number): string {
  const real = PROJECT_IMAGE[seed];
  if (real) return real;
  // Platzhalter, bis Bildmaterial vorliegt – bewusst als externe Quelle
  // erkennbar, damit er beim Launch-Check auffällt.
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/** Flagship/Marketing-Motiv für Rotkamp 1. */
export const ROTKAMP_SEED = "rotkamp-1";
/** Motiv der Startseiten-Bühne. */
export const HERO_SEED = "rotkamp-1";
