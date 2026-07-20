import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Monogram } from "@/components/brand/Monogram";
import { Reveal } from "@/components/animation/Reveal";
import { PressSection } from "@/components/sections/PressSection";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { projectImage, ROTKAMP_SEED } from "@/lib/content/media";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Rotkamp 1 – Neubau in der Wedemark",
  description:
    "Rotkamp 1 in der Wedemark: Eigentumswohnungen aus eigener Entwicklung – durchdachte Grundrisse, hochwertige Ausführung. Sprechen Sie direkt mit uns.",
  // Ad-Landingpage: nicht indexieren (kein SEO-Wettbewerb mit /projekte).
  robots: { index: false, follow: false },
  alternates: { canonical: "/rotkamp-1" },
};

// TODO(Vito): echte Rufnummer eintragen, BEVOR Ads laufen.
const CALL = { display: "0 51 30 / 00 00 00", href: "tel:+4951300000000" };

const FACTS: { k: string; v: string; pending?: boolean }[] = [
  { k: "Lage", v: "Wedemark – ruhig & gut angebunden" },
  { k: "Bauweise", v: "Energieeffizient, Wärmepumpe", pending: true },
  { k: "Ausstattung", v: "Hochwertig, schlüsselfertig" },
  { k: "Einheiten", v: "auf Anfrage", pending: true },
  { k: "Preis", v: "auf Anfrage", pending: true },
  { k: "Bauträger", v: `familiengeführt seit ${site.founded}` },
];

// Käufer-Stimmen – echte Referenzen reichst du nach.
const TESTIMONIALS: { quote: string; who: string }[] = [
  {
    quote:
      "Von der ersten Beratung bis zur Übergabe alles aus einer Hand – ehrlich und ohne Stress.",
    who: "Familie M., Wedemark",
  },
  {
    quote:
      "Wir haben die Inhaber persönlich kennengelernt. Diese Handschrift spürt man im Haus.",
    who: "Käuferpaar aus der Region",
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
        <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden">
          <Image
            src={projectImage(ROTKAMP_SEED, 2000, 1400)}
            alt="Neubau-Visualisierung Rotkamp 1, Wedemark"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-900/70 to-green-900/20" />
          <div className="relative mx-auto w-full max-w-container px-6 pb-16 pt-24">
            <p className="eyebrow text-sage-300">Neubau · Wedemark</p>
            <h1 className="mt-3 max-w-3xl text-display-xl">
              Rotkamp 1 – Ihr neues Zuhause in der Wedemark
            </h1>
            <p className="mt-5 max-w-xl text-lead text-beige-100/85">
              Eigentumswohnungen aus eigener Entwicklung: durchdachte Grundrisse,
              hochwertige Ausführung, ruhige Lage in der Wedemark. Wir planen und
              bauen selbst.
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
              Familiengeführt seit {site.founded} · Region Hannover
            </p>
            <div className="mt-3">
              <PlaceholderTag>echte Rufnummer + Projektfoto vor Ad-Start</PlaceholderTag>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- FAKTEN */}
        <section className="border-t border-beige-100/10">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-sage-300">Auf einen Blick</p>
              <h2 className="mt-2 text-display-lg">Warum Rotkamp 1</h2>
            </Reveal>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-beige-100/10 sm:grid-cols-2 lg:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.k} className="bg-green-900 p-6 md:p-8">
                  <dt className="eyebrow text-muted-dark">{f.k}</dt>
                  <dd className="mt-2 text-heading">
                    {f.v}
                    {f.pending && (
                      <span className="mt-2 block">
                        <PlaceholderTag>echte Angabe</PlaceholderTag>
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* -------------------------------------------------- KÄUFER-STIMMEN */}
        <section className="bg-beige-100 text-ink">
          <div className="mx-auto max-w-container px-6 section">
            <Reveal>
              <p className="eyebrow text-green-700">Das sagen Käufer</p>
              <h2 className="mt-2 max-w-2xl text-display-lg text-green-900">
                Menschen, die schon bei uns gebaut haben
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.who} delay={i * 0.08}>
                  <figure className="flex h-full flex-col rounded-3xl border border-green-900/10 bg-green-900/[0.03] p-8">
                    <blockquote className="font-display text-xl leading-snug text-green-900">
                      „{t.quote}"
                    </blockquote>
                    <figcaption className="mt-4 text-sm text-green-900/70">
                      {t.who}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <div className="mt-6">
              <PlaceholderTag>echte Kundenstimmen (mit Freigabe)</PlaceholderTag>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- BEKANNT AUS */}
        <PressSection />

        {/* -------------------------------------------------- RÜCKRUF / CTA */}
        <section id="rueckruf" className="bg-green-950">
          <div className="mx-auto max-w-container px-6 section-lg">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <p className="eyebrow text-sage-300">In 24 Stunden zurückgerufen</p>
                <h2 className="mt-2 text-display-lg">
                  Rufen Sie an – oder wir rufen Sie zurück
                </h2>
                <p className="mt-4 max-w-md text-beige-100/80">
                  Ein kurzes Gespräch reicht: Wir klären Ihre Fragen zu Rotkamp 1,
                  zeigen verfügbare Einheiten und die nächsten Schritte.
                  Persönlich, unverbindlich, direkt mit den Inhabern.
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
