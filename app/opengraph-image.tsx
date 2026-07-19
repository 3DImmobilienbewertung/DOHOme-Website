import { ImageResponse } from "next/og";

// Social-Preview im Dark-Luxe-Look: echtes DH-Monogramm + Wortmarke + Claim.
// Das Monogramm kommt als SVG-Data-URI (satori rendert SVG nur als <img>).
// Wortmarke in System-Sans (Montserrat lässt sich in ImageResponse nicht ohne
// Font-Datei einbetten) – die Marke selbst ist der Monogramm-Vektor.
export const alt = "DOHOme – wir schaffen Lebensräume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MONOGRAM = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 200' fill='none' stroke='#FAFAF7' stroke-width='15' stroke-linecap='square' stroke-linejoin='round'><path d='M20 20 L96 20 C142 20 170 52 170 100 C170 148 142 180 96 180 L20 180'/><path d='M66 52 L66 148'/><path d='M216 14 L216 186'/><path d='M186 14 L216 14'/><path d='M120 100 L216 100'/></svg>`;
const monogramUri = `data:image/svg+xml;utf8,${encodeURIComponent(MONOGRAM)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A3A29",
          color: "#FAFAF7",
        }}
      >
        <img src={monogramUri} width={186} height={155} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: "0.01em",
            marginTop: 30,
          }}
        >
          DOHOme
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#9DB1A4",
            letterSpacing: "0.24em",
            marginTop: 12,
          }}
        >
          wir schaffen Lebensräume
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "#E5DECF", marginTop: 44 }}>
          Bauträger · Region Hannover
        </div>
      </div>
    ),
    { ...size },
  );
}
