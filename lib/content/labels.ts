import type { ProjectSummary, ProjectPlan } from "@/lib/supabase/public";

// Zentrale, typisierte Beschriftungen der Projekt-Enums. Eine Quelle für
// Übersicht und Detailseite – verhindert Drift zwischen den Ansichten.

export const PHASE_LABEL: Record<ProjectSummary["phase"], string> = {
  zukuenftig: "In Planung",
  laufend: "Im Verkauf",
  abgeschlossen: "Referenzprojekt",
};

/** Beschriftung, wenn ein Projekt aktuell keine verfügbaren Einheiten hat. */
export const EMPTY_LABEL: Record<ProjectSummary["phase"], string> = {
  zukuenftig: "Vermarktung startet in Kürze",
  laufend: "Aktuell reserviert – Warteliste möglich",
  abgeschlossen: "Ausverkauft · Referenzprojekt",
};

export const PLAN_TYPE_LABEL: Record<ProjectPlan["plan_type"], string> = {
  grundriss: "Grundriss",
  lageplan: "Lageplan",
  baubeschreibung: "Baubeschreibung",
  energieausweis: "Energieausweis",
  sonstiges: "Dokument",
};
