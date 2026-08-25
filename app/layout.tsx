import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LocalSchema from "@/components/LocalSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://smashupburger.it"),
  title: "Smash Up | Real American Smash Burger",
  description:
    "Smash burger autentico americano. 100% Black Angus smashed a 250°C, crosticina croccante Maillard, cheddar fuso e potato bun. Prenota il tuo tavolo o takeaway!",
  keywords: [
    "smash up",
    "smash burger",
    "smash burger caserta",
    "smash burger napoli",
    "american burger",
    "best burger",
    "black angus smash",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  openGraph: {
    title: "Smash Up | Real American Smash Burger",
    description:
      "Real Smash. Real Crust. No Bullsh*t. L'autentico smash burger americano con crosticina croccante e potato bun.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="h-full antialiased dark" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-[#0A0A0B] text-white font-sans">
        <LocalSchema />
        <GoogleAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
