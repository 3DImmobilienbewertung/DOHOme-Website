import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── 60 % · dominante Tannengrün-Flächen (Dark Luxe) ──
        // Vollständige Skala 50–950, damit niemals das grelle Tailwind-Default-Grün
        // (z. B. green-600 #16a34a) versehentlich ins Layout einstreut.
        green: {
          50: "#EFF4F1",
          100: "#D9E4DE",
          200: "#B3C7BC",
          300: "#83A794",
          400: "#5A8770",
          500: "#3E6B52",
          600: "#2E5B42",
          700: "#234B36",
          800: "#1F4230",
          900: "#1A3A29",
          950: "#0F241A",
        },
        // Gedämpfter Text / feine Trennlinien auf Grün (AA: 5,5:1 auf green-900).
        sage: { 300: "#9DB1A4" },
        // ── 30 % · warmer Beige-/Papier-Untergrund ──
        beige: { 100: "#F1EFE9", 200: "#E7E3D9" },
        // ── 10 % · Präzisions-Akzent: gebranntes Kupfer / Terrakotta ──
        // Reserviert für Primär-CTA, Aktiv-Zustände und Schlüssel-Kennzahlen.
        // Primär-CTA = accent-500-Fläche mit green-950-Text (4,8:1, AA).
        accent: {
          400: "#DA8666", // Hover
          500: "#CD7350", // Basis — gebranntes Kupfer/Terrakotta
          600: "#B05837", // Pressed / Kontur
        },
        warmwhite: "#FBFAF7", // Aktiv-Chip auf Grün (10 %-Höhepunkt)
        ink: "#1C2A22", // Primärtext auf Beige (13:1)
        // Semantische Statusfarbe (Formular-Fehler) – bewusst röter/heller als der
        // Kupfer-Akzent, damit Fehler nie mit einem CTA verwechselt werden.
        danger: { 300: "#E6B8A2", 500: "#D46A5A" },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      // ── Fluid-Type-Skala: eine Quelle für alle Display-/Heading-Stufen ──
      // Beendet die zwei konkurrierenden H1-Systeme (clamp vs. Breakpoint-Sprünge);
      // Gewicht & Zeilenhöhe je Stufe fest verankert.
      fontSize: {
        "display-2xl": [
          "clamp(2.8rem, 7vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "300" },
        ],
        "display-xl": [
          "clamp(2.4rem, 5.5vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.015em", fontWeight: "300" },
        ],
        "display-lg": [
          "clamp(2rem, 4.5vw, 3.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        heading: [
          "clamp(1.4rem, 2.5vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.005em" },
        ],
        lead: ["clamp(1.05rem, 1.4vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      letterSpacing: { eyebrow: "0.14em" },
      transitionTimingFunction: { "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)" },
      maxWidth: { container: "90rem" },
      // Explizite z-Index-Skala statt arbiträrer z-[100]-Werte.
      zIndex: { header: "50", overlay: "90", preloader: "100" },
    },
  },
  plugins: [],
} satisfies Config;
