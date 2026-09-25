import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hub Digitech360 — Éditeur de Performa360 Suite",
  description: "Hub Digitech360 conçoit Performa360 Suite, le logiciel de gestion multi-métiers pour les PME et structures camerounaises.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
