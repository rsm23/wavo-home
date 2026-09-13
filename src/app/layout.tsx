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
    "Libérez votre trésorerie et accélérez votre croissance avec Wavo : financement de stock rapide, non dilutif et sans dette pour les TPE & PME françaises.",
  keywords: [
    "financement de stock",
    "rachat de stock",
    "alternative prêt bancaire",
    "gage sur stock",
    "trésorerie entreprise",
    "BFR",
    "fintech",
    "Wavo",
  ],
  authors: [{ name: "Wavo SAS" }],
  openGraph: {
    title: "Wavo • Financement de Stock sans dette ni caution",
    description:
      "Convertissez jusqu'à 100% de votre stock en trésorerie immédiate. Zéro dette au bilan, aucune caution personnelle, rachat unitaire au fil des ventes.",
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
    <html lang="fr" className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#fafbfe] text-[#0c111d] selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
