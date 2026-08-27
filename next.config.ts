import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome : l'image Docker embarque son propre serveur,
  // sans avoir a copier node_modules.
  output: "standalone",
  // Le jeton de session vit dans l'URL : il ne doit jamais partir dans
  // l'en-tete Referer vers un site tiers.
  async headers() {
    return [
      {
        source: "/session/:path*",
        headers: [{ key: "Referrer-Policy", value: "no-referrer" }],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
