import { GuidePage } from "@/components/guides/GuidePage";
import { pageMetadata } from "@/lib/metadata";

const title = "Grundstück direkt an einen Bauträger verkaufen";
const description =
  "Grundstück an einen Bauträger verkaufen: Unterlagen, Bewertung, Angebot und Notartermin – der Ablauf für Eigentümer kompakt erklärt.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/ratgeber/grundstueck-an-bautraeger-verkaufen",
  type: "article",
});

export default function GrundstueckRatgeberPage() {
  return (
    <GuidePage
      path="/ratgeber/grundstueck-an-bautraeger-verkaufen"
      title={title}
      description={description}
      intro="Ein Direktverkauf kann Wege verkürzen, weil der Käufer das Grundstück selbst entwickelt. Entscheidend sind eine nachvollziehbare Prüfung, klare Bedingungen und ein verlässlicher Zeitplan."
      image="/images/rotkamp-1/lageplan.jpg"
      sections={[
        {
          title: "Mit wenigen Eckdaten beginnen",
          paragraphs: [
            "Für eine erste Einschätzung genügen meist Adresse, ungefähre Grundstücksgröße und Ihre Kontaktdaten. Vollständige Unterlagen werden erst für die vertiefte Prüfung benötigt.",
          ],
          bullets: ["Flurstück und Grundstücksgröße", "Vorhandene Pläne oder Bauvorbescheide", "Bekannte Rechte, Altlasten oder Bestandsgebäude"],
        },
        {
          title: "Bebaubarkeit vor Preis",
          paragraphs: [
            "Der Wert hängt nicht nur von Quadratmetern ab. Planungsrecht, Erschließung, Zuschnitt, mögliche Wohnfläche und notwendige Vorleistungen bestimmen, welches Projekt realistisch umsetzbar ist.",
          ],
        },
        {
          title: "Ein Angebot muss erklärbar sein",
          paragraphs: [
            "Ein seriöses Angebot benennt die wesentlichen Annahmen und Bedingungen. Vergleichen Sie nicht nur den Preis, sondern auch Finanzierungssicherheit, Prüfvorbehalte, Zeitplan und Verantwortlichkeiten.",
          ],
        },
        {
          title: "Verbindlichkeit entsteht beim Notar",
          paragraphs: [
            "Sind Preis und Bedingungen geklärt, wird der Kaufvertrag notariell vorbereitet. Bis dahin sollten offene Punkte transparent dokumentiert und ausreichend Zeit zur Prüfung eingeplant sein.",
          ],
        },
      ]}
      ctaTitle="Sie möchten wissen, was auf Ihrem Grundstück möglich ist?"
      ctaText="Adresse und Kontaktmöglichkeit genügen für eine erste, vertrauliche Einordnung durch DOHOme."
      ctaHref="/grundstueck-verkaufen#formular"
      ctaLabel="Ersteinschätzung anfragen"
    />
  );
}
