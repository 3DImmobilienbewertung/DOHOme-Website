// Einzige Quelle der Bildpfade.
//
// Projekte mit echtem Bildmaterial werden in PROJECT_IMAGE gepflegt. Für einen
// unbekannten Schlüssel wird bewusst ein lokales Markenmotiv verwendet: So
// lädt die Website weder fremde Tracking-/Platzhalterdienste noch bricht ein
// neuer Entwurf ohne Bild.

/** Echte Motive, Schlüssel = Slug bzw. Seed. ERGÄNZEN je neuem Projekt. */
const PROJECT_IMAGE: Record<string, string> = {
  "rotkamp-1": "/images/rotkamp-1/luftbild-projekt.jpg",
  "poststrasse-14": "/images/poststrasse-14/lageplan.png",
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
  void width;
  void height;
  return PROJECT_IMAGE[HERO_SEED];
}

/** Flagship/Marketing-Motiv für Rotkamp 1. */
export const ROTKAMP_SEED = "rotkamp-1";
/** Motiv der Startseiten-Bühne. */
export const HERO_SEED = "rotkamp-1";
