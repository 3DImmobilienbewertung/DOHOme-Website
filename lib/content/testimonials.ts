// Käuferstimmen.
//
// AUSTAUSCHEN: Die Einträge unten sind realistisch formulierte Platzhalter im
// Zielstil – ruhig, konkret, ohne Superlative. Sobald echte, freigegebene
// Zitate vorliegen: Text und Namen ersetzen und `placeholder` auf false setzen.
// Dann verschwindet der Platzhalter-Hinweis automatisch aus allen Ansichten.
//
// Hinweis für echte Referenzen: Namensnennung nur mit schriftlicher Freigabe
// (DSGVO). Bewährt: Vorname + Anfangsbuchstabe + Ort, z. B. „Familie M., Wedemark".

export type Testimonial = {
  quote: string;
  author: string;
  /** Kontext, z. B. Projekt oder Wohnungstyp. */
  context?: string;
};

/** Solange true, zeigen die Ansichten einen Platzhalter-Hinweis. */
export const testimonialsArePlaceholder = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Uns war wichtig, dass jemand das Haus wirklich verantwortet. Bei Fragen hatten wir immer denselben Ansprechpartner – und Antworten, die auch stimmten.",
    author: "Familie M.",
    context: "Wedemark",
  },
  {
    quote:
      "Der Grundriss war der Grund. Nach zwei Jahren merken wir erst, wie gut die Räume geschnitten sind – das Licht stimmt zu jeder Tageszeit.",
    author: "Anke und Thomas R.",
    context: "Eigentumswohnung, 3 Zimmer",
  },
  {
    quote:
      "Wir haben vorher zwei Bauträger angeschaut. Hier wurde uns als Einzigem ehrlich gesagt, was nicht geht. Das hat den Ausschlag gegeben.",
    author: "Familie K.",
    context: "Wedemark",
  },
];
