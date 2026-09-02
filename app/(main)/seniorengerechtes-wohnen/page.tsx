import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Seniorengerechtes Wohnen von DOHOme: alltagstaugliche Grundrisse, kurze Wege und langfristig nutzbare Wohnungen in der Wedemark.";

export const metadata = pageMetadata({
  title: "Seniorengerechtes Wohnen in der Wedemark",
  description,
  path: "/seniorengerechtes-wohnen",
});

export default function SeniorengerechtesWohnenPage() {
  return (
    <ServiceLandingPage
      path="/seniorengerechtes-wohnen"
      eyebrow="Seniorengerechtes Wohnen"
      title="Wohnungen, die auch morgen zum Alltag passen"
      description={description}
      image="/images/rotkamp-1/wohnraum-balkon.jpg"
      imageAlt="Heller Wohnraum mit bodentiefen Fenstern in einem seniorengerecht geplanten DOHOme-Projekt"
      facts={[
        ["Bewegungsfreiheit", "Grundrisse werden so geplant, dass Wege klar und Räume gut nutzbar bleiben."],
        ["Private Außenräume", "Balkon, Terrasse oder Garten erweitern den Wohnraum – abhängig von Wohnung und Projekt."],
        ["Langfristige Nutzung", "Alltagstaugliche Details schaffen Komfort heute und Reserven für spätere Lebensphasen."],
      ]}
      steps={[
        ["01", "Bedarf klären", "Wohnungsgröße, Lage, Erreichbarkeit und persönliche Prioritäten festhalten."],
        ["02", "Merkmale prüfen", "Grundriss und konkrete Ausstattung der jeweiligen Wohnung abgleichen."],
        ["03", "Passend entscheiden", "Verfügbarkeit, Einzug und offene Fragen direkt mit DOHOme besprechen."],
      ]}
      ctaTitle="Sie suchen eine langfristig passende Wohnung?"
      ctaText="Hinterlegen Sie ein kurzes Suchprofil. Wir melden uns, wenn eine geeignete Wohnung verfügbar ist."
      ctaHref="/wohnung-mieten#suchprofil"
      ctaLabel="Wohnung vormerken"
      secondaryHref="/ratgeber/seniorengerecht-barrierefrei"
      secondaryLabel="Merkmale verstehen"
    />
  );
}
