import { GuidePage } from "@/components/guides/GuidePage";
import { pageMetadata } from "@/lib/metadata";

const title = "So entsteht ein Wohnprojekt";
const description =
  "Projektentwicklung verständlich erklärt: vom Grundstück über Konzept, Planung und Genehmigung bis zu Bau und Übergabe eines Wohnprojekts.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/ratgeber/projektentwicklung-ablauf",
  type: "article",
});

export default function ProjektentwicklungRatgeberPage() {
  return (
    <GuidePage
      path="/ratgeber/projektentwicklung-ablauf"
      title={title}
      description={description}
      intro="Ein Wohnprojekt beginnt lange vor dem ersten Spatenstich. Gute Projektentwicklung verbindet Grundstück, Planungsrecht, Zielgruppe, Qualität und Wirtschaftlichkeit zu einem realisierbaren Konzept."
      image="/images/poststrasse-14/lageplan.png"
      sections={[
        {
          title: "Grundstück und Rahmenbedingungen",
          paragraphs: [
            "Zu Beginn werden Lage, Zuschnitt, Erschließung, Bestand und planungsrechtliche Möglichkeiten geprüft. Daraus entsteht ein erster belastbarer Entwicklungskorridor.",
          ],
        },
        {
          title: "Konzept und Vorplanung",
          paragraphs: [
            "Wohnungsgrößen, Erschließung, Stellplätze, Freiräume und Bauweise werden aufeinander abgestimmt. Gleichzeitig werden Kosten, Termine und Risiken fortgeschrieben.",
          ],
        },
        {
          title: "Genehmigung und Ausführungsplanung",
          paragraphs: [
            "Nach Abstimmungen mit Fachplanern und Behörden wird die Genehmigung vorbereitet. Die anschließende Ausführungsplanung übersetzt das Konzept in konkrete Bauteile, Details und Leistungsbeschreibungen.",
          ],
        },
        {
          title: "Bau, Qualität und Übergabe",
          paragraphs: [
            "Während der Realisierung werden Gewerke, Termine und Schnittstellen koordiniert. Abnahmen, Dokumentation und eine geordnete Übergabe schließen das Projekt ab.",
          ],
        },
      ]}
      ctaTitle="Sie möchten aus einem Grundstück ein Wohnprojekt entwickeln?"
      ctaText="DOHOme prüft Vorhaben in der Wedemark und der Region Hannover persönlich und vertraulich."
      ctaHref="/kontakt"
      ctaLabel="Projekt besprechen"
    />
  );
}
