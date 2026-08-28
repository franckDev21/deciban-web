import type { NextConfig } from "next";

// Le mode « standalone » ne sert qu'a l'image Docker, qui embarque son
// propre serveur sans copier node_modules. Sur Vercel il entre en
// conflit avec la trace de fichiers de la plateforme, qui reclame des
// .nft.json que ce mode ne produit pas de la meme facon : le build
// echoue alors sur next-server.js.nft.json introuvable.
//
// On l'active donc uniquement quand le Dockerfile le demande, plutot
// que de tester la presence de Vercel : la condition reste ainsi
// verifiable en local.
const forDocker = process.env.DOCKER_BUILD === "1";

const nextConfig: NextConfig = {
  ...(forDocker ? { output: "standalone" as const } : {}),

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
};

export default nextConfig;
