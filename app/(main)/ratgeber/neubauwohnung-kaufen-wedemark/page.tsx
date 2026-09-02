import { GuidePage } from "@/components/guides/GuidePage";
import { pageMetadata } from "@/lib/metadata";

const title = "Neubauwohnung in der Wedemark kaufen";
const description =
  "Neubauwohnung in der Wedemark kaufen: Lage, Unterlagen, Bauqualität, Gesamtkosten und Übergabe – die wichtigsten Prüfpunkte kompakt.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/ratgeber/neubauwohnung-kaufen-wedemark",
  type: "article",
});

export default function NeubauwohnungRatgeberPage() {
  return (
    <GuidePage
      path="/ratgeber/neubauwohnung-kaufen-wedemark"
      title={title}
      description={description}
      intro="Eine gute Neubauwohnung überzeugt nicht nur im Exposé. Lage, Grundriss, Baubeschreibung, Gesamtkosten und Ansprechpartner müssen zusammenpassen."
      image="/images/rotkamp-1/wohnraum-balkon.jpg"
      sections={[
        {
          title: "Lage im Alltag prüfen",
          paragraphs: [
            "Entscheidend ist nicht nur der Ortsname. Wege zu Einkauf, Arzt, Bahnhof und Familie sollten zur eigenen Lebensplanung oder zur späteren Vermietbarkeit passen.",
          ],
        },
        {
          title: "Grundriss statt Quadratmeterzahl",
          paragraphs: [
            "Ein effizienter Grundriss nutzt Fläche besser als eine größere Wohnung mit langen Fluren. Prüfen Sie Möblierbarkeit, Stauraum, Belichtung und den Zugang zu Balkon, Terrasse oder Garten.",
          ],
        },
        {
          title: "Unterlagen vollständig lesen",
          bullets: ["Baubeschreibung und Ausstattungsumfang", "Teilungserklärung und Gemeinschaftsordnung", "Grundriss, Flächenangaben und Sondernutzungsrechte", "Zahlungsplan, Fertigstellung und Übergaberegeln"],
        },
        {
          title: "Gesamtkosten sauber erfassen",
          paragraphs: [
            "Neben dem Kaufpreis gehören Grunderwerbsteuer, Notar- und Grundbuchkosten sowie gegebenenfalls Finanzierungs- und Ausstattungsentscheidungen in die eigene Kalkulation.",
          ],
        },
      ]}
      ctaTitle="Aktuelle Neubauwohnungen von DOHOme ansehen"
      ctaText="Projektseiten zeigen Lage, Flächen, Grundrisse und Verfügbarkeit der jeweiligen Wohnungen."
      ctaHref="/projekte"
      ctaLabel="Projekte entdecken"
    />
  );
}
