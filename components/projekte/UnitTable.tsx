import { formatSqm } from "@/lib/format";
import type { Unit } from "@/lib/content/rotkamp";

// Wohnungsspiegel als zugängliche Tabelle: Zeilenkopf ist die Wohnungsnummer,
// `caption` beschreibt den Inhalt für Screenreader. Wird von der Landingpage
// und der Projektdetailseite genutzt – eine Darstellung, keine zwei.
//
// Preise fehlen bewusst: Sie werden nicht auf der Website ausgewiesen, sondern
// im persönlichen Gespräch besprochen.

export function UnitTable({
  units,
  projectName,
}: {
  units: Unit[];
  projectName: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <caption className="sr-only">
          Wohnungsspiegel {projectName}: {units.length} Wohneinheiten mit
          Zimmerzahl, Wohnfläche und Freifläche
        </caption>
        <thead>
          <tr className="border-b border-beige-100/15 text-sm text-muted-dark">
            <th scope="col" className="py-3 pr-4 font-medium">Wohnung</th>
            <th scope="col" className="py-3 pr-4 font-medium">Haus</th>
            <th scope="col" className="py-3 pr-4 font-medium">Geschoss</th>
            <th scope="col" className="py-3 pr-4 font-medium">Zimmer</th>
            <th scope="col" className="py-3 pr-4 font-medium">Wohnfläche</th>
            <th scope="col" className="py-3 font-medium">Freifläche</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u) => (
            <tr key={u.id} className="border-b border-beige-100/10">
              <th
                scope="row"
                className="py-3.5 pr-4 font-display text-lg font-normal"
              >
                <span className="inline-flex items-center gap-2">
                  {u.id}
                  {u.accessible && (
                    <span
                      title="behindertengerecht"
                      className="rounded border border-accent-500/50 px-1.5 py-0.5 font-sans text-[0.65rem] font-medium uppercase tracking-wide text-accent-400"
                    >
                      barrierefrei
                    </span>
                  )}
                </span>
              </th>
              <td className="py-3.5 pr-4 text-beige-100/75">{u.house}</td>
              <td className="py-3.5 pr-4 text-beige-100/75">{u.floor}</td>
              <td className="nums py-3.5 pr-4">
                {u.rooms.toLocaleString("de-DE")}
              </td>
              <td className="nums py-3.5 pr-4">{formatSqm(u.areaSqm)}</td>
              <td className="py-3.5 text-beige-100/75">{u.outdoor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
