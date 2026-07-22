import { Reveal } from "@/components/animation/Reveal";
import { ProjectGallery } from "@/components/projekte/ProjectGallery";
import { ConsentMap } from "@/components/projekte/ConsentMap";
import { UnitTable } from "@/components/projekte/UnitTable";
import { NeighbourhoodPanel } from "@/components/projekte/NeighbourhoodPanel";
import { rotkampGallery } from "@/lib/content/gallery";
import {
  rotkamp,
  units,
  accessibleUnits,
  neighbourhood,
  locationCopy,
  parkingTotal,
} from "@/lib/content/rotkamp";

// Inhaltliche Tiefe der Projektseite /projekte/rotkamp-1.
//
// Abgrenzung zur Anzeigen-Landingpage /rotkamp-1: Diese Seite ist indexierbar
// und informierend (Architektur, Galerie, Wohnungsspiegel, Lage) und im
// Markenrahmen mit Header/Footer. Die Landingpage bleibt kurz und auf den
// Anruf ausgerichtet. Beide ziehen ihre Zahlen aus lib/content/rotkamp.ts.

const a = rotkamp.architecture;
const f = rotkamp.facts;
const dec = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

const BUILD_FACTS: { k: string; v: string }[] = [
  { k: "Fassade", v: `${a.facade}, ${a.construction}` },
  { k: "Dach", v: `${a.roof}, ${a.detail}` },
  { k: "Energiestandard", v: rotkamp.specs.energy ?? "Angabe folgt" },
  { k: "Gesamtwohnfläche", v: `${dec(f.totalArea)} m²` },
  {
    k: "Privatgärten (EG)",
    v: `${dec(f.gardens.min)} – ${dec(f.gardens.max)} m²`,
  },
  {
    k: "Stellplätze",
    v: `${parkingTotal} – ${rotkamp.parking.garages} Garagen, ${rotkamp.parking.carports} Carports, ${rotkamp.parking.outdoor} Außenstellplätze`,
  },
  { k: "Barrierefrei", v: `${accessibleUnits.length} Wohnungen behindertengerecht` },
  { k: "Geschosse", v: f.floors.join(", ") },
];

export function RotkampSections() {
  return (
    <>
      {/* -------------------------------------------- ARCHITEKTUR & AUSFÜHRUNG */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 section">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-sage-300">Architektur &amp; Ausführung</p>
              <h2 className="mt-2 text-display-lg">
                Gebaut, um lange zu bleiben
              </h2>
              <div className="mt-5 space-y-4 text-lead text-beige-100/80">
                <p>
                  Drei Baukörper mit {a.facade}fassade und {a.roof}, das
                  Dachgeschoss bewusst abgesetzt. Diese Handschrift ist in der
                  Wedemark verwurzelt – sie altert gut und braucht in zwanzig
                  Jahren keine Sanierung der Hülle.
                </p>
                <p>
                  Die Außenwände sind als {a.construction} ausgeführt: eine
                  Konstruktion, die Schlagregen abhält, Schall dämpft und den
                  Klinker trägt, ohne dass eine aufgeklebte Dämmschicht das
                  Erscheinungsbild bestimmt.
                </p>
                <p className="text-beige-100/70">
                  Im Erdgeschoss gehört zu jeder Wohnung ein Privatgarten, in den
                  Obergeschossen ein Balkon. Für jede Wohnung ist ein Stellplatz
                  vorhanden.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {BUILD_FACTS.map((item) => (
                  <div key={item.k} className="border-t border-beige-100/15 pt-3">
                    <dt className="eyebrow text-muted-dark">{item.k}</dt>
                    <dd className="mt-1 text-beige-100/90">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ GALERIE */}
      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 section">
          <Reveal>
            <p className="eyebrow text-sage-300">Einblicke</p>
            <h2 className="mt-2 max-w-2xl text-display-lg">
              Visualisierungen, Innenräume und Pläne
            </h2>
          </Reveal>
          <Reveal className="mt-10">
            <ProjectGallery
              images={rotkampGallery}
              project={{
                name: rotkamp.name,
                postalCode: rotkamp.postalCode,
                city: rotkamp.city,
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- WOHNUNGSSPIEGEL */}
      <section className="border-t border-beige-100/10">
        <div className="mx-auto max-w-container px-6 section">
          <Reveal>
            <p className="eyebrow text-sage-300">Wohnungsspiegel</p>
            <h2 className="mt-2 max-w-2xl text-display-lg">
              Alle {rotkamp.units.total} Wohnungen im Überblick
            </h2>
            <p className="mt-4 max-w-2xl text-beige-100/75">
              Zimmerzahl, Wohnfläche und Freifläche jeder Einheit. Welche
              Wohnungen aktuell noch frei sind, besprechen wir persönlich – mit
              Grundriss, Ausstattung und Preis.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <UnitTable units={units} projectName={rotkamp.name} />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- LAGE */}
      <section className="border-t border-beige-100/10 bg-green-950">
        <div className="mx-auto max-w-container px-6 section">
          <Reveal>
            <p className="eyebrow text-sage-300">Die Lage</p>
            <h2 className="mt-2 max-w-2xl text-display-lg">
              Alles Wichtige zu Fuß erreichbar
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 text-lead text-beige-100/80">
              {locationCopy.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <Reveal>
              <NeighbourhoodPanel groups={neighbourhood} origin={rotkamp.name} />
            </Reveal>
            <Reveal delay={0.08}>
              <ConsentMap
                embedUrl={rotkamp.mapsEmbedUrl}
                linkUrl={rotkamp.mapsUrl}
                address={`${rotkamp.street}, ${rotkamp.postalCode} ${rotkamp.city}`}
                className="h-full"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
