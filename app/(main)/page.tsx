import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/home/TrustBand";
import { FunnelSplit } from "@/components/home/FunnelSplit";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { FlagshipSpotlight } from "@/components/home/FlagshipSpotlight";
import { ArchitectureSection } from "@/components/home/ArchitectureSection";
import { PressSection } from "@/components/sections/PressSection";
import { ClosingCta } from "@/components/home/ClosingCta";

const title = "DOHOme – Donnarumma / Horstmann GmbH | Immobilien Wedemark";
const description =
  "DOHOme ist die Marke der Donnarumma / Horstmann GmbH in 30900 Wedemark – für Projektentwicklung, Wohnungsbau, Vermietung und Immobilienbewertung.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
  },
  twitter: { title, description },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBand />
      <FunnelSplit />
      <StoryTeaser />
      <FlagshipSpotlight />
      <ArchitectureSection />
      <PressSection />
      <ClosingCta />
    </main>
  );
}
