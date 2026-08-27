import type { Metadata } from "next";
import {
  Archivo,
  Source_Serif_4,
  IBM_Plex_Mono,
  Martian_Mono,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

/* Direction d'origine */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/* Proposition n°1 — Phosphore */
const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Deciban",
  description:
    "Un outil libre qui permet aux vrais travailleurs de prouver qu'ils sont humains, sans accuser personne.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable} ${martian.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
