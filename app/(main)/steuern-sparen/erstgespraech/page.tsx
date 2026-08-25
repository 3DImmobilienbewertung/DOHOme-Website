import type { Metadata } from "next";
import { CallbackForm } from "@/components/forms/CallbackForm";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Erstgespräch zur Neubauwohnung",
  description:
    "Unverbindliches Erstgespräch zu verfügbaren DOHOme-Neubauwohnungen, Vermietung und individueller Kalkulation anfragen.",
  alternates: { canonical: "/steuern-sparen/erstgespraech" },
};

export default function ErstgespraechPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-container px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow text-sage-300">Unverbindlich · ca. 20 Minuten</p>
            <h1 className="mt-3 text-display-xl">Ihre Zahlen. Ihre passende Wohnung.</h1>
            <p className="mt-6 text-lead text-beige-100/75">
              Wir zeigen Ihnen konkret, welche verfügbare Wohnung zu Eigenkapital,
              Finanzierung und gewünschter Vermietung passt.
            </p>
            <dl className="mt-9 space-y-5 border-t border-beige-100/15 pt-7 text-sm">
              <div>
                <dt className="text-beige-100/50">Dauer</dt>
                <dd className="mt-1">Persönlich, telefonisch oder per Video</dd>
              </div>
              <div>
                <dt className="text-beige-100/50">Inhalt</dt>
                <dd className="mt-1">Wohnung, Miete, Finanzierung und möglicher Steuereffekt</dd>
              </div>
              <div>
                <dt className="text-beige-100/50">Kontakt</dt>
                <dd className="mt-1">
                  <a className="underline underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl border border-beige-100/15 bg-green-950/35 p-6 md:p-9">
            <h2 className="font-display text-3xl">Gespräch anfragen</h2>
            <p className="mt-3 text-sm text-beige-100/65">
              Name und Telefonnummer genügen. Wir melden uns werktags in der Regel innerhalb von 24 Stunden.
            </p>
            <CallbackForm
              source="erstgespraech-neubauwohnung"
              className="mt-8"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
