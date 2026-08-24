import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import { ProjectGallery } from "@/components/projekte/ProjectGallery";
import { ConsentMap } from "@/components/projekte/ConsentMap";
import { UnitTable } from "@/components/projekte/UnitTable";
import { ProjectVideo } from "@/components/projekte/ProjectVideo";
import { NeighbourhoodPanel } from "@/components/projekte/NeighbourhoodPanel";
import { Beispielrechnung } from "@/components/projekte/Beispielrechnung";
import type { PortfolioProject } from "@/lib/content/projects";

// Inhaltliche Tiefe der Projektdetailseite – vollständig datengetrieben.
//
// Jeder Abschnitt erscheint nur, wenn das Projekt die Daten dafür mitbringt.
// Ein Projekt ohne Galerie zeigt keine leere Galerie, eines ohne Umfeldliste
// keine leere Liste. So trägt dieselbe Seite ein laufendes Vorhaben mit
// vollständigem Material genauso wie eine schlanke Referenz.
//
// Abgrenzung zur Anzeigen-Landingpage: Diese Seite ist indexierbar und
// informierend, im Markenrahmen mit Header und Footer. Die Landingpage bleibt
// kurz und auf den Anruf ausgerichtet.

export function ProjectSections({ project }: { project: PortfolioProject }) {
  const { story, facts, gallery, video, unitList, location, taxNote, calc } = project;
  const hasStoryBlock = Boolean(story || (facts && facts.length > 0));
  const hasUnitStatus = Boolean(unitList?.some((u) => u.status));
  const availableUnitIds =
    unitList?.filter((u) => u.status === "verfuegbar").map((u) => u.id) ?? [];

  return (
    <>
      {/* -------------------------------------------- ARCHITEKTUR & AUSFÜHRUNG */}
      {hasStoryBlock && (
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 section">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              {story && (
                <Reveal>
                  <p className="eyebrow text-sage-300">
                    Architektur &amp; Ausführung
                  </p>
                  <h2 className="mt-2 text-display-lg">{story.title}</h2>
                  <div className="mt-5 space-y-4 text-lead text-beige-100/80">
                    {story.paragraphs.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              )}

              {facts && facts.length > 0 && (
                <Reveal delay={0.08}>
                  <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {facts.map((item) => (
                      <div
                        key={item.k}
                        className="border-t border-beige-100/15 pt-3"
                      >
                        <dt className="eyebrow text-muted-dark">{item.k}</dt>
                        <dd className="mt-1 text-beige-100/90">{item.v}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ GALERIE */}
      {gallery && gallery.length > 0 && (
        <section className="border-t border-beige-100/10 bg-green-950">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-sage-300">Einblicke</p>
              <h2 className="mt-2 max-w-2xl text-display-lg">
                {project.name} in Bildern
              </h2>
            </Reveal>
            <Reveal className="mt-10">
              <ProjectGallery
                images={gallery}
                project={{
                  name: project.name,
                  postalCode: project.postalCode,
                  city: project.city,
                }}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- VIDEO */}
      {video && (
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 section-sm">
            <Reveal>
              <p className="eyebrow text-sage-300">Aus der Luft</p>
              <h2 className="mt-2 max-w-2xl text-display-lg">
                {project.name} im Video
              </h2>
            </Reveal>
            <Reveal className="mt-8">
              <ProjectVideo
                src={video.src}
                poster={video.poster}
                title={`Drohnenaufnahme ${project.name}`}
                caption={video.caption}
                portrait={video.portrait}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- WOHNUNGSSPIEGEL */}
      {unitList && unitList.length > 0 && (
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-sage-300">Wohnungsspiegel</p>
              <h2 className="mt-2 max-w-2xl text-display-lg">
                Alle {project.units.total} Wohnungen im Überblick
              </h2>
              <p className="mt-4 max-w-2xl text-beige-100/75">
                {project.units.available <= 0
                  ? "Zimmerzahl, Wohnfläche und Zuschnitt jeder Einheit. Dieses Projekt ist vollständig vermarktet – die Aufstellung zeigt, wie wir Grundrisse schneiden."
                  : hasUnitStatus
                    ? "Zimmerzahl, Wohnfläche und Zuschnitt jeder Einheit – die noch verfügbaren Wohnungen sind markiert. Preise besprechen wir persönlich."
                    : "Zimmerzahl, Wohnfläche und Zuschnitt jeder Einheit. Welche Wohnungen aktuell noch frei sind, besprechen wir persönlich – mit Grundriss, Ausstattung und Preis."}
              </p>
              {availableUnitIds.length > 0 && (
                <p className="mt-4 max-w-2xl text-sm font-medium text-accent-400">
                  Aktuell verfügbar: {availableUnitIds.join(" · ")}
                </p>
              )}
            </Reveal>
            <Reveal className="mt-10">
              <UnitTable units={unitList} projectName={project.name} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ STEUERHINWEIS */}
      {/* Bewusst zurückhaltend gesetzt: ein sachlicher Kasten nach dem
          Wohnungsspiegel, kein eigener Werbeblock. Die Website richtet sich an
          Selbstnutzer; dieser Hinweis informiert vermietende Käufer, ohne die
          Ausrichtung zu verschieben. */}
      {taxNote && (
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 section-sm">
            <Reveal>
              <div className="max-w-3xl rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-8 md:p-10">
                <p className="eyebrow text-sage-300">Steuerlicher Hinweis</p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">
                  {taxNote.title}
                </h2>
                <div className="mt-4 space-y-3 text-beige-100/80">
                  {taxNote.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
                <p className="mt-5 border-t border-beige-100/10 pt-4 text-sm text-muted-dark">
                  {taxNote.disclaimer}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- BEISPIELRECHNUNG */}
      {calc && (
        <section className="border-t border-beige-100/10 bg-green-950">
          <div className="mx-auto max-w-container px-6 section-sm">
            <Reveal>
              <Beispielrechnung
                defaults={calc.defaults}
                projectName={project.name}
                unitNote={calc.unitNote}
              />
              <p className="mt-5 text-sm text-beige-100/70">
                Sie möchten mit ganz eigenen Zahlen rechnen?{" "}
                <Link
                  href="/rechner"
                  className="underline underline-offset-4 transition-colors hover:text-beige-100"
                >
                  Zum leeren Rechner
                </Link>
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- LAGE */}
      {location && (
        <section className="border-t border-beige-100/10 bg-green-950">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-sage-300">Die Lage</p>
              <h2 className="mt-2 max-w-2xl text-display-lg">
                {location.neighbourhood.length > 0
                  ? "Alles Wichtige zu Fuß erreichbar"
                  : "Die Adresse"}
              </h2>
              <div className="mt-5 max-w-2xl space-y-4 text-lead text-beige-100/80">
                {location.copy.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <div
              className={
                location.neighbourhood.length > 0
                  ? "mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
                  : "mt-12"
              }
            >
              {location.neighbourhood.length > 0 && (
                <Reveal>
                  <NeighbourhoodPanel
                    groups={location.neighbourhood}
                    origin={project.name}
                  />
                </Reveal>
              )}
              <Reveal delay={0.08}>
                <ConsentMap
                  embedUrl={location.mapsEmbedUrl}
                  linkUrl={location.mapsUrl}
                  address={location.address}
                  className="h-full"
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
