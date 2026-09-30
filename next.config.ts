import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js limite par défaut le corps d'une Server Action à 1 Mo — trop
  // bas pour nos formulaires avec upload de fichier (photo d'équipe/média
  // Vision jusqu'à 8 Mo, vidéo de publication jusqu'à 80 Mo, voir
  // src/lib/uploads.ts § TAILLE_MAX_IMAGE/TAILLE_MAX_VIDEO — c'est CETTE
  // limite applicative qui reste la vraie borne, pas celle-ci).
  experimental: {
    serverActions: {
      bodySizeLimit: "90mb",
    },
  },
};

export default nextConfig;
