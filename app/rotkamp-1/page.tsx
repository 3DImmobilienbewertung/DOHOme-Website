import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Monogram } from "@/components/brand/Monogram";
import { Reveal } from "@/components/animation/Reveal";
import { PressSection } from "@/components/sections/PressSection";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { ProjectGallery } from "@/components/projekte/ProjectGallery";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { rotkampGallery } from "@/lib/content/gallery";
import {
  rotkamp,
  units,
  unitsWithStatus,
  unitsAvailable,
  soldPercent,
} from "@/lib/content/rotkamp";
import {
  testimonials,
  testimonialsArePlaceholder,
} from "@/lib/content/testimonials";
import { formatEuro, formatSqm } from "@/lib/format";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Rotkamp 1 – Neubau in der Wedemark",
  description: `Rotkamp 1 in der Wedemark: ${rotkamp.units.total} Eigentumswohnungen aus eigener Entwicklung, ${rotkamp.units.sold} bereits verkauft. Durchdachte Grundrisse, hochwertige Ausführung.`,
  // Ad-Landingpage: nicht indexieren (kein SEO-Wettbewerb mit /projekte).
  robots: { index: false, follow: false },
  alternates: { canonical: "/rotkamp-1" },
};

// Rufnummer kommt zentral aus site.ts – eine Quelle für Website und Landingpage.
const CALL = { display: site.contact.phone ?? "", href: site.contact.phoneHref };

const PROJECT = {
  name: rotkamp.name,
  postalCode: rotkamp.postalCode,
  city: rotkamp.city,
};

const f = rotkamp.facts;
const dec = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

/** Belegte Kennzahlen aus dem Wohnungsspiegel – unbestätigtes klar markiert. */
const FACTS: { k: string; v: string; pending?: boolean }[] = [
  { k: "Wohneinheiten", v: `${rotkamp.units.total} in ${f.buildings} Häusern` },
  {
    k: "Wohnungsgrößen",
    v: `${dec(f.area.min)} – ${dec(f.area.max)} m²`,
  },
  { k: "Zimmer", v: `${f.rooms.min} – ${f.rooms.max} Zimmer` },
  {
    k: "Erdgeschoss",
    v: `Privatgarten, ${dec(f.gardens.min)} – ${dec(f.gardens.max)} m²`,
  },
  { k: "Ober-/Dachgeschoss", v: "Balkon" },
  {
    k: "Stellplätze",
    v: `${rotkamp.parking.garages} Garagen, ${rotkamp.parking.carports} Carports, ${rotkamp.parking.outdoor} Außen`,
  },
  {
    k: "Bauweise",
    v: `${rotkamp.architecture.facade}fassade, ${rotkamp.architecture.roof}`,
  },
  {
    k: "Energie",
    v: rotkamp.specs.energy ?? "Angabe folgt",
    pending: !rotkamp.specs.energy,
  },
  {
    k: "Bezugsfertig",
    v: rotkamp.specs.completion ?? "Termin auf Anfrage",
    pending: !rotkamp.specs.completion,
  },
];

function CallButton({
  className = "",
  label = "Jetzt anrufen",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={CALL.href}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-green-950 transition-colors hover:bg-accent-400 ${className}`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 2.2Z"
          fill="currentColor"
        />
      </svg>
      {label}
    </a>
  );
}

export default function RotkampLanding() {
  return (
    <>
      {/* ---------------------------------------------------- STICKY TOP BAR */}
      <header className="sticky top-0 z-header border-b border-beige-100/10 bg-green-900/95 text-beige-100 backdrop-blur">
        <div className="mx-auto flex max-w-container items-center justify-between px-5 py-3">
          <Link href="/" aria-label="DOHOme" className="inline-flex items-center gap-2">
            <Monogram className="h-7 w-auto" />
            <span className="font-brand text-lg font-bold">DOHOme</span>
          </Link>
          <CallButton className="hidden sm:inline-flex" label={CALL.display} />
        </div>
      </header>

      <main className="bg-green-900 text-beige-100">
        {/* ------------------------------------------------------------- HERO */}
        {/* Split-Layout: Text auf ruhigem Grün (garantierter Kontrast),
            Foto im Hochformat daneben – ohne erzwungenen Beschnitt. */}
        <section className="border-b border-beige-100/10">
          <div className="mx-auto grid max-w-container items-center gap-10 px-6 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="eyebrow text-sage-300">Neubau · {rotkamp.city}</p>
              <h1 className="mt-3 text-display-xl">
                {rotkamp.name} – Ihr neues Zuhause in der {rotkamp.city}
              </h1>
              <p className="mt-5 max-w-xl text-lead text-beige-100/85">
                {rotkamp.units.total} Eigentumswohnungen in drei Häusern, aus
                eigener Entwicklung. {rotkamp.units.sold} sind bereits verkauft,{" "}
                {rotkamp.units.occupied} Wohnungen bewohnt.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CallButton />
                <a
                  href="#rueckruf"
                  className="rounded-full border border-beige-100/45 px-7 py-3.5 text-sm font-medium text-beige-100 transition-colors hover:bg-beige-100/10"
                >
                  Rückruf anfordern
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-dark">
                Familiengeführt · Wedemark &amp; Region Hannover
              </p>
            </div>

            {/* Höhe begrenzt, damit der Anruf-CTA auf Laptops über der Falz bleibt. */}
            <div className="relative h-[46vh] min-h-[300px] overflow-hidden rounded-3xl lg:h-[min(56vh,460px)]">
              <Image
                src="/images/rotkamp-1/wohnraum-balkon.jpg"
                alt={`Wohnraum mit bodentiefen Fenstern und Balkonzugang, ${rotkamp.name}, ${rotkamp.postalCode} ${rotkamp.city}`}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                quality={82}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ VERKAUFSSTAND */}
        <section className="border-t border-beige-100/10 bg-green-950">
          <div className="mx-auto max-w-container px-6 section-sm">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow text-sage-300">Aktueller Stand</p>
                  <h2 className="mt-2 text-display-lg">
                    {rotkamp.units.sold} von {rotkamp.units.total} Wohnungen
                    verkauft
                  </h2>
                </div>
                <p className="max-w-sm text-beige-100/75">
                  Das Projekt ist weit fortgeschritten – {rotkamp.units.occupied}{" "}
                  Wohnungen sind bereits bewohnt. Sprechen Sie uns zu den
                  verbleibenden Einheiten an.
                </p>
              </div>

              {/* Fortschrittsbalken */}
              <div className="mt-8">
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-beige-100/15"
                  role="img"
                  aria-label={`Verkaufsstand: ${soldPercent} Prozent der Wohnungen verkauft`}
                >
                  <div
                    className="h-full rounded-full bg-accent-500"
                    style={{ width: `${soldPercent}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-sm text-muted-dark">
                  <span className="nums">{soldPercent} % verkauft</span>
                  <span className="nums">
                    {unitsAvailable} Einheiten noch verfügbar
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------------- FAKTEN */}
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-sage-300">Auf einen Blick</p>
              <h2 className="mt-2 text-display-lg">Das Projekt</h2>
            </Reveal>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-2 lg:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.k} className="bg-green-900 p-6 md:p-8">
                  <dt className="eyebrow text-muted-dark">{f.k}</dt>
                  <dd className="mt-2 text-heading">
                    {f.v}
                    {f.pending && (
                      <span className="mt-2 block">
                        <PlaceholderTag>Angabe folgt</PlaceholderTag>
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------- GALERIE */}
        <section className="border-t border-beige-100/10 bg-green-950">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-sage-300">Einblicke</p>
              <h2 className="mt-2 max-w-2xl text-display-lg">
                Visualisierungen und Baufortschritt
              </h2>
              <p className="mt-4 max-w-xl text-beige-100/75">
                Außen- und Innenansichten, Lage und aktueller Baustand.
              </p>
            </Reveal>
            <ProjectGallery
              images={rotkampGallery}
              project={PROJECT}
              className="mt-10"
            />
          </div>
        </section>

        {/* ------------------------------------------------------- WOHNUNGEN */}
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-sage-300">Verfügbarkeit</p>
              <h2 className="mt-2 max-w-2xl text-display-lg">
                Die verbleibenden Wohnungen
              </h2>
            </Reveal>

            <Reveal className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <caption className="sr-only">
                  Wohnungsspiegel {rotkamp.name}: {rotkamp.units.total}{" "}
                  Wohneinheiten mit Zimmerzahl, Wohnfläche und Freifläche
                </caption>
                <thead>
                  <tr className="border-b border-beige-100/15 text-sm text-muted-dark">
                    <th scope="col" className="py-3 pr-4 font-medium">Wohnung</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Haus</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Geschoss</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Zimmer</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Wohnfläche</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Freifläche</th>
                    {unitsWithStatus.length > 0 && (
                      <th scope="col" className="py-3 font-medium">Kaufpreis</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {units.map((u) => (
                    <tr key={u.id} className="border-b border-beige-100/10">
                      <th
                        scope="row"
                        className="py-3.5 pr-4 font-display text-lg font-normal"
                      >
                        {u.id}
                      </th>
                      <td className="py-3.5 pr-4 text-beige-100/75">{u.house}</td>
                      <td className="py-3.5 pr-4 text-beige-100/75">{u.floor}</td>
                      <td className="nums py-3.5 pr-4">
                        {u.rooms.toLocaleString("de-DE")}
                      </td>
                      <td className="nums py-3.5 pr-4">{formatSqm(u.areaSqm)}</td>
                      <td className="py-3.5 pr-4 text-beige-100/75">{u.outdoor}</td>
                      {unitsWithStatus.length > 0 && (
                        <td className="nums py-3.5">
                          {u.price == null ? "auf Anfrage" : formatEuro(u.price)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal className="mt-8">
              <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-8 md:p-10">
                <p className="max-w-xl text-beige-100/80">
                  {rotkamp.units.sold} der {rotkamp.units.total} Wohnungen sind
                  bereits verkauft. Welche Einheiten aktuell noch frei sind,
                  besprechen wir gern persönlich – mit Grundriss, Ausstattung und
                  Preis.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <CallButton label={`Anrufen: ${CALL.display}`} />
                  <a
                    href="#rueckruf"
                    className="rounded-full border border-beige-100/45 px-7 py-3.5 text-sm font-medium transition-colors hover:bg-beige-100/10"
                  >
                    Unterlagen anfordern
                  </a>
                </div>
                {unitsWithStatus.length === 0 && (
                  <div className="mt-6">
                    <PlaceholderTag>
                      Preisliste einpflegen → Preise und Status erscheinen in der
                      Tabelle
                    </PlaceholderTag>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------- KÄUFER-STIMMEN */}
        <section className="bg-beige-100 text-ink">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-green-700">Das sagen Käufer</p>
              <h2 className="mt-2 max-w-2xl text-display-lg text-green-900">
                Menschen, die schon bei uns gekauft haben
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.author} delay={i * 0.06}>
                  <figure className="flex h-full flex-col rounded-3xl border border-green-900/10 bg-green-900/[0.03] p-8">
                    <blockquote className="font-display text-lg leading-snug text-green-900">
                      „{t.quote}"
                    </blockquote>
                    <figcaption className="mt-4 text-sm text-green-900/70">
                      {t.author}
                      {t.context ? ` · ${t.context}` : ""}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            {testimonialsArePlaceholder && (
              <div className="mt-6">
                <PlaceholderTag>
                  Beispieltexte – echte Stimmen mit Freigabe ersetzen
                </PlaceholderTag>
              </div>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------- BEKANNT AUS */}
        <PressSection />

        {/* -------------------------------------------------- RÜCKRUF / CTA */}
        <section id="rueckruf" className="bg-green-950">
          <div className="mx-auto max-w-container px-6 section-lg">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <p className="eyebrow text-sage-300">Persönlich statt Exposé</p>
                <h2 className="mt-2 text-display-lg">
                  Rufen Sie an – oder wir rufen Sie zurück
                </h2>
                <p className="mt-4 max-w-md text-beige-100/80">
                  Ein kurzes Gespräch reicht: Wir klären Ihre Fragen zu{" "}
                  {rotkamp.name}, gehen die verfügbaren Wohnungen durch und
                  besprechen die nächsten Schritte. Sie sprechen direkt mit den
                  Inhabern.
                </p>
                <div className="mt-8">
                  <CallButton label={`Jetzt anrufen: ${CALL.display}`} />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="rounded-3xl border border-beige-100/15 bg-beige-100/[0.03] p-8 md:p-10">
                  <h3 className="text-heading">Rückruf anfordern</h3>
                  <p className="mt-2 text-sm text-beige-100/75">
                    Name und Telefonnummer genügen – wir melden uns zeitnah.
                  </p>
                  <CallbackForm source="rotkamp-1" className="mt-6" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* --------------------------------------------------- MINIMAL FOOTER */}
      <footer className="border-t border-beige-100/10 bg-green-900 text-beige-100">
        <div className="mx-auto flex max-w-container flex-col gap-3 px-6 py-8 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.legalName} · {site.address.postalCode} {site.address.city}
          </p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-beige-100">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-beige-100">
              Datenschutz
            </Link>
          </nav>
        </div>
      </footer>

      {/* ------------------------------------------- STICKY MOBILE CALL BAR */}
      <div className="fixed inset-x-0 bottom-0 z-overlay border-t border-beige-100/10 bg-green-950/95 p-3 backdrop-blur sm:hidden">
        <CallButton className="w-full" label={`Jetzt anrufen: ${CALL.display}`} />
      </div>
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </>
  );
}
