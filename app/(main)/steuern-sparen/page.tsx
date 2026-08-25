import type { Metadata } from "next";

import { CompactTaxLanding } from "@/components/investment/CompactTaxLanding";

export const metadata: Metadata = {
  title: "Mit Neubauwohnungen Steuern sparen und Vermögen aufbauen",
  description:
    "Eine kompakte DOHOme-Referenz: 5 % degressive Gebäude-AfA, Tilgung und langfristiger Vermögensaufbau mit einer Neubauwohnung.",
  alternates: { canonical: "/steuern-sparen" },
};

export default function SteuernSparenPage() {
  return <CompactTaxLanding />;
}
