import { formatSqm } from "@/lib/format";
import type { Unit } from "@/lib/content/types";

// Wohnungsspiegel als zugängliche Tabelle: Zeilenkopf ist die Wohnungsnummer,
// `caption` beschreibt den Inhalt für Screenreader.
//
// Die Spalten richten sich nach den vorhandenen Daten: Ein Projekt mit nur
// einem Baukörper zeigt keine leere Haus-Spalte, eines ohne Freiflächenangabe
// keine leere Freiflächen-Spalte. Ist bei mindestens einer Wohnung ein Status
// gepflegt, erscheint zusätzlich die Verfügbarkeits-Spalte – die Tabelle wird
// damit zum Verkaufswerkzeug: freie Wohnungen treten hervor, verkaufte treten
// zurück.
//
// Preise fehlen bewusst: Sie werden nicht auf der Website ausgewiesen, sondern
// im persönlichen Gespräch besprochen.

const STATUS_LABEL: Record<NonNullable<Unit["status"]>, string> = {
  verfuegbar: "Verfügbar",
  reserviert: "Reserviert",
  verkauft: "Verkauft",
};

function StatusBadge({ status }: { status: NonNullable<Unit["status"]> }) {
  if (status === "verfuegbar") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-semibold text-green-950">
        <span className="h-1.5 w-1.5 rounded-full bg-green-950" aria-hidden />
        {STATUS_LABEL.verfuegbar}
      </span>
    );
  }
  if (status === "reserviert") {
    return (
      <span className="whitespace-nowrap rounded-full border border-accent-500/50 px-2.5 py-0.5 text-xs font-medium text-accent-400">
        {STATUS_LABEL.reserviert}
      </span>
    );
  }
  return (
    <span className="whitespace-nowrap text-xs text-muted-dark">
      {STATUS_LABEL.verkauft}
    </span>
  );
}

export function UnitTable({
  units,
  projectName,
}: {
  units: Unit[];
  projectName: string;
}) {
  const showHouse = units.some((u) => u.house);
  const showOutdoor = units.some((u) => u.outdoor);
  const showStorage = units.some((u) => u.storageSqm != null);
  const showStatus = units.some((u) => u.status);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[38rem] border-collapse text-left">
        <caption className="sr-only">
          Wohnungsspiegel {projectName}: {units.length} Wohneinheiten mit
          Zimmerzahl und Wohnfläche
          {showStatus ? " und Verfügbarkeit" : ""}
        </caption>
        <thead>
          <tr className="border-b border-beige-100/15 text-sm text-muted-dark">
            <th scope="col" className="py-3 pr-4 font-medium">Wohnung</th>
            {showHouse && (
              <th scope="col" className="py-3 pr-4 font-medium">Haus</th>
            )}
            <th scope="col" className="py-3 pr-4 font-medium">Geschoss</th>
            <th scope="col" className="py-3 pr-4 font-medium">Zimmer</th>
            <th scope="col" className="py-3 pr-4 font-medium">Wohnfläche</th>
            {showStorage && (
              <th scope="col" className="py-3 pr-4 font-medium">Abstellraum</th>
            )}
            {showOutdoor && (
              <th scope="col" className="py-3 pr-4 font-medium">Freifläche</th>
            )}
            {showStatus && (
              <th scope="col" className="py-3 font-medium">Status</th>
            )}
          </tr>
        </thead>
        <tbody>
          {units.map((u) => {
            const available = u.status === "verfuegbar";
            // Verkaufte Einheiten treten zurück, freie werden hervorgehoben.
            const sold = u.status === "verkauft";
            return (
              <tr
                key={u.id}
                className={
                  available
                    ? "border-b border-beige-100/10 bg-accent-500/[0.07]"
                    : "border-b border-beige-100/10"
                }
              >
                <th
                  scope="row"
                  className={`py-3.5 pr-4 font-display text-lg font-normal ${
                    sold ? "text-beige-100/55" : ""
                  }`}
                >
                  <span className="inline-flex flex-wrap items-center gap-2">
                    <span className="whitespace-nowrap">{u.id}</span>
                    {/* Kennzeichnung exakt wie im Wohnungsspiegel (BHG).
                        NICHT „barrierefrei“ – dieser Begriff ist über
                        DIN 18040-2 definiert und braucht einen Nachweis. */}
                    {u.accessible && (
                      <span className="whitespace-nowrap rounded border border-accent-500/50 px-1.5 py-0.5 font-sans text-[0.65rem] font-medium uppercase tracking-wide text-accent-400">
                        behindertengerecht
                      </span>
                    )}
                  </span>
                </th>
                {showHouse && (
                  <td className={`py-3.5 pr-4 ${sold ? "text-beige-100/45" : "text-beige-100/75"}`}>
                    {u.house ?? "—"}
                  </td>
                )}
                <td className={`py-3.5 pr-4 ${sold ? "text-beige-100/45" : "text-beige-100/75"}`}>
                  {u.floor}
                </td>
                <td className={`nums py-3.5 pr-4 ${sold ? "text-beige-100/55" : ""}`}>
                  {u.rooms.toLocaleString("de-DE")}
                </td>
                <td className={`nums py-3.5 pr-4 ${sold ? "text-beige-100/55" : ""}`}>
                  {formatSqm(u.areaSqm)}
                </td>
                {showStorage && (
                  <td className={`nums py-3.5 pr-4 ${sold ? "text-beige-100/45" : "text-beige-100/75"}`}>
                    {u.storageSqm != null ? formatSqm(u.storageSqm) : "—"}
                  </td>
                )}
                {showOutdoor && (
                  <td className={`py-3.5 pr-4 ${sold ? "text-beige-100/45" : "text-beige-100/75"}`}>
                    {u.outdoor ?? "—"}
                  </td>
                )}
                {showStatus && (
                  <td className="py-3.5">
                    {u.status ? <StatusBadge status={u.status} /> : null}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
