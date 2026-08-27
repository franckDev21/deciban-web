import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
