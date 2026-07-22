import type { PoiGroup } from "@/lib/content/rotkamp";

// Infrastruktur im Umfeld, gruppiert nach Mobilität / Versorgung / Bildung.
// Alle Entfernungen sind belegt (Straßenverzeichnis), keine Schätzungen –
// der Hinweis am Ende macht die Rundung transparent.

export function NeighbourhoodPanel({
  groups,
  origin,
}: {
  groups: PoiGroup[];
  /** Bezugspunkt der Entfernungen, z. B. "Rotkamp 1". */
  origin: string;
}) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="eyebrow text-accent-400">{group.title}</p>
          <dl className="mt-3 space-y-2">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="flex items-baseline justify-between gap-4 border-b border-beige-100/10 pb-2"
              >
                <dt className="text-beige-100/85">{item.name}</dt>
                <dd className="nums shrink-0 text-sm text-muted-dark">
                  {item.distance}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      <p className="text-xs text-muted-dark">
        Entfernungen gerundet, ab {origin}.
      </p>
    </div>
  );
}
