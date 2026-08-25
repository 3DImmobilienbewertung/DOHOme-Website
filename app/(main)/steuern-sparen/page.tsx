import type { Metadata } from "next";

import { CompactTaxLanding } from "@/components/investment/CompactTaxLanding";

export const metadata: Metadata = {
  title: "Steuern reduzieren und Immobilienvermögen aufbauen",
  description:
    "Bis zu 22 % Eigenkapitaleffekt im Referenzjahr: 5 % degressive Gebäude-AfA, Miete und Tilgung mit einer DOHOme-Neubauwohnung verbinden.",
  alternates: { canonical: "/steuern-sparen" },
};

export default function SteuernSparenPage() {
  return <CompactTaxLanding />;
}
