"use client";

// Auffangnetz für Fehler im Root-Layout selbst: ersetzt <html>/<body> komplett,
// daher bewusst mit Inline-Styles (Designsystem-CSS ist hier nicht garantiert).
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          background: "#1A3A29",
          color: "#F1EFE9",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 400, margin: 0 }}>
            Da ist etwas schiefgelaufen.
          </h1>
          <p style={{ opacity: 0.8, marginTop: "0.75rem" }}>
            Bitte laden Sie die Seite neu.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              borderRadius: "999px",
              background: "#CD7350",
              color: "#0F241A",
              border: "none",
              padding: "0.85rem 1.75rem",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
