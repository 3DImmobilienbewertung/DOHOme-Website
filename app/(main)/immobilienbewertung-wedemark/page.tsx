import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Immobilien- und Grundstücksbewertung in der Wedemark: nachvollziehbare Einordnung von Lage, Substanz, Baurecht und Entwicklungspotenzial.";

export const metadata = pageMetadata({
  title: "Immobilienbewertung Wedemark",
  description,
  path: "/immobilienbewertung-wedemark",
});

export default function ImmobilienbewertungPage() {
  return (
    <ServiceLandingPage
      path="/immobilienbewertung-wedemark"
      eyebrow="Immobilienbewertung"
      title="Nachvollziehbar bewerten statt pauschal schätzen"
      description={description}
      image="/images/walsroder-strasse-32-a-b/luftbild-zufahrt.jpg"
      imageAlt="Wohnimmobilie in der Wedemark als Beispiel für eine objektbezogene Bewertung"
      facts={[
        ["Lage & Markt", "Mikrolage, Nachfrage und realistische Nutzung werden gemeinsam betrachtet."],
        ["Substanz & Daten", "Gebäudezustand, Flächen, Rechte und vorhandene Unterlagen fließen in die Einordnung ein."],
        ["Potenzial & Grenzen", "Bei Grundstücken zählen auch Bebaubarkeit, Erschließung und notwendige Vorleistungen."],
      ]}
      steps={[
        ["01", "Unterlagen sichten", "Adresse, Grundstücks- und Gebäudedaten sowie vorhandene Pläne zusammenstellen."],
        ["02", "Objekt einordnen", "Lage, Zustand, Nutzung und Entwicklungsmöglichkeiten strukturiert prüfen."],
        ["03", "Ergebnis erklären", "Die wertrelevanten Faktoren verständlich darstellen und nächste Schritte ableiten."],
      ]}
      ctaTitle="Sie möchten den Wert Ihres Grundstücks realistisch einordnen?"
      ctaText="Eine Adresse und Ihre Kontaktdaten genügen für den ersten Austausch. Die Details klären wir persönlich."
      ctaHref="/grundstueck-verkaufen#formular"
      ctaLabel="Ersteinschätzung anfragen"
      secondaryHref="/ueber-uns"
      secondaryLabel="Qualifikationen ansehen"
    />
  );
}
