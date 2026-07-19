import type { Metadata } from "next";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei DOHOme.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <main className="bg-green-900 text-beige-100">
      <section className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
        <p className="eyebrow text-sage-300">Rechtliches</p>
        <h1 className="mt-3 text-display-xl">Datenschutzerklärung</h1>

        <p className="mt-6 rounded-xl border border-accent-500/30 bg-accent-500/[0.06] p-4 text-sm text-beige-100/80">
          Entwurf/Gerüst nach DSGVO-Struktur. Vor dem Livegang anwaltlich prüfen
          und an die tatsächlich eingesetzten Dienste anpassen lassen.
        </p>

        <div className="mt-10 space-y-8 text-beige-100/80">
          <div>
            <h2 className="text-heading text-beige-100">
              1. Verantwortlicher
            </h2>
            <p className="mt-3">
              {site.legalName}
              <br />
              {site.address.street}, {site.address.postalCode}{" "}
              {site.address.city}
              <br />
              <a
                href={`mailto:${site.contact.email}`}
                className="underline underline-offset-4 hover:text-beige-100"
              >
                {site.contact.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">
              2. Zugriffsdaten beim Besuch der Website
            </h2>
            <p className="mt-3">
              Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse,
              Zeitpunkt, abgerufene Seite) durch unseren Hosting-Dienstleister
              verarbeitet. Rechtsgrundlage ist unser berechtigtes Interesse an
              einem sicheren, stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">3. Kontakt- und Anfrageformulare</h2>
            <p className="mt-3">
              Nutzen Sie unsere Formulare, verarbeiten wir die eingegebenen Daten
              (z. B. Name, Kontaktdaten, Angaben zu Ihrer Anfrage) ausschließlich
              zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. b bzw. lit. f DSGVO. Die Daten werden gelöscht, sobald sie für
              den Zweck nicht mehr erforderlich sind und keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">4. Schriftarten</h2>
            <p className="mt-3">
              Schriften werden lokal ausgeliefert (self-hosted über next/font).
              Es besteht dabei keine Verbindung zu Servern Dritter, es werden
              keine Daten an externe Font-Anbieter übermittelt.
            </p>
          </div>

          <div>
            <h2 className="text-heading text-beige-100">5. Ihre Rechte</h2>
            <p className="mt-3">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch
              sowie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
              beschweren.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
