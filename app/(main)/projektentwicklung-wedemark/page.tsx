import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { pageMetadata } from "@/lib/metadata";

const description =
  "DOHOme entwickelt Wohnprojekte in der Wedemark: Grundstücksprüfung, Planung, Genehmigung, Bau und Übergabe aus einer Hand.";

export const metadata = pageMetadata({
  title: "Projektentwicklung Wedemark & Region Hannover",
  description,
  path: "/projektentwicklung-wedemark",
});

export default function ProjektentwicklungPage() {
  return (
    <ServiceLandingPage
      path="/projektentwicklung-wedemark"
      eyebrow="Projektentwicklung"
      title="Vom Grundstück zum durchdachten Wohnprojekt"
      description={description}
      image="/images/rotkamp-1/lageplan.jpg"
      imageAlt="Lageplan eines von DOHOme entwickelten Wohnprojekts in der Wedemark"
      facts={[
        ["Potenzial erkennen", "Wir prüfen Lage, Bebaubarkeit, Erschließung und Nutzungsidee als zusammenhängendes Vorhaben."],
        ["Planung steuern", "Architektur, Fachplanung und Genehmigungsweg werden früh aufeinander abgestimmt."],
        ["Verantwortung behalten", "Von der ersten Prüfung bis zur Übergabe bleibt DOHOme der zentrale Ansprechpartner."],
      ]}
      steps={[
        ["01", "Prüfen", "Grundstück, Planungsrecht, Zielgruppe und wirtschaftliche Eckdaten einordnen."],
        ["02", "Planen", "Ein belastbares Wohnkonzept entwickeln und die Genehmigung vorbereiten."],
        ["03", "Realisieren", "Bau, Qualität, Termine und Übergabe mit eingespielten Partnern koordinieren."],
      ]}
      ctaTitle="Sie besitzen ein Grundstück oder planen ein Wohnprojekt?"
      ctaText="Schildern Sie uns Lage und Ziel. Wir prüfen, ob daraus ein tragfähiges Projekt entstehen kann."
      ctaHref="/kontakt"
      ctaLabel="Vorhaben besprechen"
      secondaryHref="/ratgeber/projektentwicklung-ablauf"
      secondaryLabel="Ablauf verstehen"
    />
  );
}
