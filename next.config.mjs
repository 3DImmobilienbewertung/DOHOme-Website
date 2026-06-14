/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Platzhalter-Quellen – später durch eigenes /public/images Material ersetzen.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
