import type { Metadata } from "next";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der DOHOme.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

// Pflichtangabe, die noch fehlt → sichtbar markiert (nie leer „fertig“ wirken).
function Pending({ label }: { label: string }) {
  return (
    <span className="rounded border border-accent-500/40 px-2 py-0.5 text-xs text-accent-400">
      {label} · vom Kunden zu ergänzen
    </span>
  );
}

export default function ImpressumPage() {
  const { legal, contact } = site;
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
        <p className="eyebrow text-sage-300">Rechtliches</p>
        <h1 className="mt-3 text-display-xl">Impressum</h1>

        <p className="mt-6 rounded-xl border border-accent-500/30 bg-accent-500/[0.06] p-4 text-sm text-beige-100/80">
          Entwurf/Gerüst. Vor dem Livegang mit den Handelsregisterdaten
          vervollständigen und rechtlich prüfen lassen.
        </p>

        <div className="mt-10 space-y-8 text-beige-100/80">
          <div>
            <h2 className="text-heading text-beige-100">Angaben gemäß § 5 DDG</h2>
            <p className="mt-3">
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Vertreten durch</h2>
            <p className="mt-3">
              {legal.managingDirectors ?? <Pending label="Geschäftsführung" />}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Kontakt</h2>
            <p className="mt-3">
              E-Mail:{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline underline-offset-4 hover:text-beige-100"
              >
                {contact.email}
              </a>
              {contact.phone && (
                <>
                  <br />
                  Telefon: {contact.phone}
                </>
              )}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Registereintrag</h2>
            <p className="mt-3">
              {legal.registerCourt && legal.registerNumber ? (
                <>
                  Registergericht: {legal.registerCourt}
                  <br />
                  Registernummer: {legal.registerNumber}
                </>
              ) : (
                <Pending label="Registergericht & HRB-Nummer" />
              )}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">Umsatzsteuer-ID</h2>
            <p className="mt-3">
              {legal.vatId ?? <Pending label="USt-IdNr. (§ 27a UStG)" />}
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">
              Verantwortlich i. S. d. § 18 Abs. 2 MStV
            </h2>
            <p className="mt-3">
              {legal.managingDirectors ?? (
                <Pending label="Verantwortliche Person" />
              )}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
