import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/brand/Monogram";

// Gebrandete 404 im Dark-Luxe-Look. Next setzt automatisch den 404-Status,
// sodass Suchmaschinen die Seite nicht indexieren.
export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-green-900 text-beige-100">
      <div className="mx-auto max-w-container px-6 py-32 text-center">
        <Monogram className="mx-auto h-12 w-12 text-accent-500" />
        <p className="eyebrow mt-8 text-muted-dark">Fehler 404</p>
        <h1 className="mt-4 text-display-lg">Diese Seite gibt es nicht (mehr).</h1>
        <p className="mx-auto mt-4 max-w-md text-lead text-beige-100/75">
          Vielleicht wurde sie verschoben. Kehren Sie zu unseren Projekten
          zurück – oder sprechen Sie uns direkt an.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/projekte" variant="primary">
            Projekte entdecken
          </Button>
          <Button href="/grundstueck-verkaufen" variant="secondary">
            Grundstück verkaufen
          </Button>
        </div>
      </div>
    </main>
  );
}
