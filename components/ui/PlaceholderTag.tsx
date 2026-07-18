import type { ReactNode } from "react";

// Sichtbarer Marker für Inhalte, die vor dem Launch echten Kundeninput brauchen
// (Zahlen, Fotos, Preise) – verhindert, dass Platzhalter versehentlich „fertig“
// wirken. Bewusst im Akzentton, damit es im Review sofort auffällt.
export function PlaceholderTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded border border-accent-500/40 px-2 py-0.5 text-xs text-accent-400">
      Platzhalter · {children}
    </span>
  );
}
