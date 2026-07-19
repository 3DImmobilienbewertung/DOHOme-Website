import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/home/TrustBand";
import { FunnelSplit } from "@/components/home/FunnelSplit";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { FlagshipSpotlight } from "@/components/home/FlagshipSpotlight";
import { InvestorTeaser } from "@/components/home/InvestorTeaser";
import { PressSection } from "@/components/sections/PressSection";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBand />
      <FunnelSplit />
      <StoryTeaser />
      <FlagshipSpotlight />
      <InvestorTeaser />
      <PressSection />
      <ClosingCta />
    </main>
  );
}
