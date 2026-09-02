import { GuidePage } from "@/components/guides/GuidePage";
import { pageMetadata } from "@/lib/metadata";

const title = "Seniorengerecht oder barrierefrei?";
const description =
  "Seniorengerechtes und barrierefreies Wohnen unterscheiden: Welche konkreten Merkmale bei Grundriss, Zugang und Ausstattung wichtig sind.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/ratgeber/seniorengerecht-barrierefrei",
  type: "article",
});

export default function SeniorengerechtRatgeberPage() {
  return (
    <GuidePage
      path="/ratgeber/seniorengerecht-barrierefrei"
      title={title}
      description={description}
      intro="Begriffe allein reichen für eine Wohnentscheidung nicht. Entscheidend ist, welche Eigenschaften die konkrete Wohnung tatsächlich bietet und welche davon für Ihren Alltag wichtig sind."
      sections={[
        {
          title: "Konkrete Merkmale statt Etikett",
          paragraphs: [
            "Seniorengerecht beschreibt meist ein alltagstaugliches Wohnkonzept. Ob eine Wohnung bestimmte Anforderungen an Barrierefreiheit erfüllt, ergibt sich dagegen aus Planung, Baubeschreibung und vereinbarter Ausführung.",
          ],
        },
        {
          title: "Zugang und Wege betrachten",
          bullets: ["Stufen oder Schwellen vom Eingang bis zur Wohnung", "Aufzug und gut erreichbare Stellplätze", "Ausreichende Bewegungsflächen in Flur, Bad und Wohnräumen", "Kurze Wege zu Versorgung und öffentlichem Verkehr"],
        },
        {
          title: "Bad und Außenbereich prüfen",
          paragraphs: [
            "Eine bodengleiche Dusche, gut nutzbare Türbreiten und ein schwellenarmer Zugang zu Balkon oder Terrasse können den Alltag deutlich erleichtern. Maßgeblich sind immer die konkreten Unterlagen der Wohnung.",
          ],
        },
        {
          title: "Den eigenen Bedarf priorisieren",
          paragraphs: [
            "Nicht jede Person benötigt dieselben Eigenschaften. Legen Sie vor der Besichtigung fest, was sofort wichtig ist und welche Anpassungen später möglich bleiben sollen.",
          ],
        },
      ]}
      ctaTitle="Eine langfristig passende Wohnung finden"
      ctaText="Hinterlegen Sie Ihre Wunschgröße und Kontaktdaten. Wir gleichen Ihr Profil mit verfügbaren Wohnungen ab."
      ctaHref="/wohnung-mieten#suchprofil"
      ctaLabel="Suchprofil hinterlegen"
    />
  );
}
