import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

const siteUrl = process.env.PAGES_BASE_URL ?? "https://wavo.fr";
const siteBaseUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;

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
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: "Wavo",
    images: [
      {
        url: new URL("assets/wavo-hero_202602.png", siteBaseUrl).toString(),
        width: 1200,
        height: 630,
        alt: "Wavo - Votre stock finance votre ambition",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: withBasePath("/assets/logo-wavo.webp"),
  },
};

import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#fafafc] dark:bg-[#080b13] text-[#0f172a] dark:text-[#f8fafc] selection:bg-[#fa6e69] selection:text-white min-h-screen flex flex-col transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
