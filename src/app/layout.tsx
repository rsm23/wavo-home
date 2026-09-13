import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wavo.fr"),
  title: "Wavo • Financement de Stock sans dette ni caution pour Entreprises",
  description:
    "Plateforme de financement d'inventaire nouvelle génération : libérez jusqu'à 100% de votre trésorerie sur stock sans endettement ni caution personnelle pour les entreprises françaises.",
  keywords: [
    "financement de stock",
    "private credit marketplace",
    "rachat de stock",
    "alternative prêt bancaire",
    "trésorerie sans dette",
    "BFR",
    "fintech",
    "Wavo",
  ],
  authors: [{ name: "Wavo SAS" }],
  openGraph: {
    title: "Wavo • Financement de Stock sans dette ni caution",
    description:
      "Convertissez votre stock physique en liquidité immédiate. 0€ dette au bilan, aucune caution personnelle, rachat unitaire au fil des ventes.",
    url: "https://wavo.fr",
    siteName: "Wavo",
    images: [
      {
        url: "/assets/wavo-hero_202602.png",
        width: 1200,
        height: 630,
        alt: "Wavo - Votre stock finance votre ambition",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: "/assets/logo-wavo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="font-sans antialiased bg-[#07080d] text-[#f1f5f9] selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
