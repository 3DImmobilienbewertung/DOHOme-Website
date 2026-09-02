import { CompactTaxLanding } from "@/components/investment/CompactTaxLanding";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Steuern reduzieren und Immobilienvermögen aufbauen",
  description:
    "Bis zu 22 % Eigenkapitaleffekt im Referenzjahr: 5 % degressive Gebäude-AfA, Miete und Tilgung mit einer DOHOme-Neubauwohnung verbinden.",
  path: "/steuern-sparen",
});

export default function SteuernSparenPage() {
  return <CompactTaxLanding />;
}
