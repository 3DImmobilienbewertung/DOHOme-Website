import { ImageResponse } from "next/og";

// Statisches OG-Bild im Dark-Luxe-Look (Tannengrün + Kupfer-Akzent). Fraunces
// steht in der ImageResponse-Umgebung nicht zur Verfügung – als Näherung dient
// eine Serif-System-Schrift; ein pixelgenaues Marken-Rendering folgt mit dem
// finalen Vektor-Asset.
export const alt = "DOHOme – wir schaffen Lebensräume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A3A29",
          color: "#F1EFE9",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          DOHOme
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 6,
              background: "#CD7350",
              marginBottom: 28,
            }}
          />
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 88,
              fontFamily: "Georgia, serif",
              lineHeight: 1.05,
            }}
          >
            wir schaffen Lebensräume
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#9DB1A4" }}>
          Bauträger · Region Hannover — Wedemark · Isernhagen · Großburgwedel
        </div>
      </div>
    ),
    { ...size },
  );
}
