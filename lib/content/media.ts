// Einzige Quelle der Bildpfade. Aktuell Platzhalter-Fotografie (picsum);
// sobald echte Projektfotos vorliegen, wird NUR diese Datei angepasst
// (z. B. auf /public/images oder Supabase Storage) – alle Ansichten ziehen nach.

export function projectImage(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/** Flagship/Marketing-Motiv für Rotkamp 1. */
export const ROTKAMP_SEED = "dohome-rotkamp";
/** Motiv der Startseiten-Bühne. */
export const HERO_SEED = "dohome-hero";
