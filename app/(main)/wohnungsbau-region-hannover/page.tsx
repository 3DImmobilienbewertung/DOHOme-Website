import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Wohnungsbau von DOHOme in der Region Hannover: durchdachte Grundrisse, solide Substanz und regionale Projektverantwortung.";

export const metadata = pageMetadata({
  title: "Wohnungsbau Region Hannover",
  description,
  path: "/wohnungsbau-region-hannover",
});

export default function WohnungsbauPage() {
  return (
    <ServiceLandingPage
      path="/wohnungsbau-region-hannover"
      eyebrow="Wohnungsbau"
      title="Wohnungsbau mit Substanz und kurzen Entscheidungswegen"
      description={description}
      image="/images/rotkamp-1/luftbild-projekt.jpg"
      imageAlt="Realisiertes DOHOme-Wohnprojekt mit Klinkerfassade in der Region Hannover"
      facts={[
        ["Eigene Entwicklung", "Grundriss, Bauweise und Außenanlagen werden als ein Wohnkonzept geplant – nicht als Einzelteile."],
        ["Eingespielte Partner", "Viele Handwerker und Fachplaner arbeiten seit Jahren projektübergreifend mit uns zusammen."],
        ["Für den Alltag", "Nutzbare Grundrisse, private Außenbereiche und dauerhafte Materialien stehen im Mittelpunkt."],
      ]}
      steps={[
        ["01", "Bedarf verstehen", "Standort, Zielgruppe und Wohnungsgrößen zu einem klaren Konzept verbinden."],
        ["02", "Qualität planen", "Konstruktion, Technik und Ausstattung vor Baubeginn sauber definieren."],
        ["03", "Verlässlich bauen", "Ausführung und Übergabe mit festen Ansprechpartnern koordinieren."],
      ]}
      ctaTitle="Sehen Sie, wie DOHOme Wohnprojekte umsetzt."
      ctaText="Aktuelle Vorhaben und fertiggestellte Referenzen zeigen unsere Planung und Bauqualität im Zusammenhang."
      ctaHref="/projekte"
      ctaLabel="Projekte ansehen"
      secondaryHref="/kontakt"
      secondaryLabel="Kontakt aufnehmen"
    />
  );
}
