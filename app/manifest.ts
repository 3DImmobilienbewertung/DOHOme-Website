import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DOHOme – wir schaffen Lebensräume",
    short_name: "DOHOme",
    description:
      "Bauträger und Projektentwickler für die Wedemark und die Region Hannover.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A3A29",
    theme_color: "#1A3A29",
    icons: [
      {
        src: "/web-app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
