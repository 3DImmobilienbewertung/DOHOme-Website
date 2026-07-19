"use client";

import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/brand/Monogram";

// Gebrandete Error-Boundary für Rendering-Fehler innerhalb des Layouts
// (z. B. wenn Datenlader künftig bewusst werfen statt Fehler zu verschlucken).
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-svh place-items-center bg-green-900 text-beige-100">
      <div className="mx-auto max-w-container px-6 py-32 text-center">
        <Monogram className="mx-auto block h-12 w-auto text-accent-500" />
        <p className="eyebrow mt-8 text-muted-dark">Ein Fehler ist aufgetreten</p>
        <h1 className="mt-4 text-display-lg">Da ist etwas schiefgelaufen.</h1>
        <p className="mx-auto mt-4 max-w-md text-lead text-beige-100/75">
          Bitte versuchen Sie es erneut. Bleibt das Problem bestehen, erreichen
          Sie uns jederzeit direkt.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button variant="primary" onClick={reset}>
            Erneut versuchen
          </Button>
          <Button href="/" variant="secondary">
            Zur Startseite
          </Button>
        </div>
      </div>
    </main>
  );
}
