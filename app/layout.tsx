import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LocalSchema from "@/components/LocalSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://smashupburger.it"),
  title: "Smash Up | Real American Smash Burger",
  description:
    "Autentico American Smash Burger con 100% Black Angus, crosticina croccante Maillard e cheddar fuso. Scopri il menu e prenota subito il tuo tavolo!",
  keywords: [
    "smash up",
    "smash burger",
    "american smash burger",
    "real smash burger",
    "black angus smash",
    "best burger",
    "potato bun",
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
    canonical: "https://smashupburger.it",
  },
  openGraph: {
    title: "Smash Up | Real American Smash Burger",
    description:
      "Autentico American Smash Burger con 100% Black Angus, crosticina croccante Maillard e cheddar fuso. Scopri il menu e prenota subito!",
    url: "https://smashupburger.it",
    siteName: "Smash Up",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Smash Up — Real American Smash Burger",
      },
    ],
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smash Up | Real American Smash Burger",
    description:
      "Autentico American Smash Burger con 100% Black Angus, crosticina croccante Maillard e cheddar fuso. Scopri il menu e prenota subito!",
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
      <body className="min-h-full flex flex-col bg-[#FBFBFA] text-[#18181B] font-sans" suppressHydrationWarning>
        <LocalSchema />
        <GoogleAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
