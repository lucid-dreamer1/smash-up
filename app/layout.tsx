import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LocalSchema from "@/components/LocalSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://cappiellohairbeauty.it"),
  title: "Cappiello Hair & Beauty | Salone Parrucchiere Donna a Caserta",
  description:
    "Cappiello Hair & Beauty — Salone di parrucchiere donna a Caserta. Taglio, colore, balayage, trattamenti ricostruttivi e acconciature sposa. Prenota il tuo appuntamento.",
  keywords: [
    "parrucchiere caserta",
    "salone donna caserta",
    "cappiello hair beauty",
    "balayage caserta",
    "colore capelli caserta",
    "taglio donna caserta",
    "acconciature sposa caserta",
    "trattamenti capelli caserta",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://cappiellohairbeauty.it",
  },
  openGraph: {
    title: "Cappiello Hair & Beauty | Salone Parrucchiere Donna a Caserta",
    description:
      "Taglio, colore, balayage, trattamenti e acconciature sposa nel cuore di Caserta. Prenota il tuo appuntamento da Cappiello Hair & Beauty.",
    url: "https://cappiellohairbeauty.it",
    siteName: "Cappiello Hair & Beauty",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Cappiello Hair & Beauty — Salone Parrucchiere Caserta",
      },
    ],
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cappiello Hair & Beauty | Salone Parrucchiere Donna a Caserta",
    description:
      "Taglio, colore, balayage, trattamenti e acconciature sposa nel cuore di Caserta. Prenota il tuo appuntamento.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#1A1A1B] font-sans" suppressHydrationWarning>
        <LocalSchema />
        <GoogleAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
