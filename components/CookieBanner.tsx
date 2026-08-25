"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "smash_up_cookie_consent_v1";

export type ConsentStatus = "all" | "necessary" | null;

export function getCookieConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY) as ConsentStatus;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      setVisible(true);
    }

    function onOpenBanner() {
      setVisible(true);
    }
    window.addEventListener("open-cookie-banner", onOpenBanner);
    return () => window.removeEventListener("open-cookie-banner", onOpenBanner);
  }, []);

  function handleAcceptAll() {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: "all" }));
  }

  function handleAcceptNecessary() {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: "necessary" }));
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-fade-in pointer-events-none">
      <div className="max-w-4xl mx-auto bg-[#2B0A12]/95 backdrop-blur-xl border border-[#8A0427]/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/40 text-[#FDF6F7] pointer-events-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base">🍪</span>
              <h4 className="font-[family-name:var(--font-display)] font-extrabold text-sm sm:text-base text-white">
                Informativa su Cookie &amp; Privacy
              </h4>
            </div>
            <p className="text-xs text-[#FDF6F7]/80 leading-relaxed font-normal">
              Utilizziamo cookie tecnici essenziali per il funzionamento del sito e, previo tuo consenso, cookie statistici anonimi per migliorare la tua esperienza. Per saperne di più, consulta la nostra{" "}
              <Link href="/cookie-policy" className="text-[#F0D5DA] font-bold underline hover:text-white transition-colors">
                Cookie Policy
              </Link>{" "}
              e la{" "}
              <Link href="/privacy-policy" className="text-[#F0D5DA] font-bold underline hover:text-white transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleAcceptNecessary}
              className="flex-1 md:flex-initial px-4 py-2.5 text-xs font-bold text-[#FDF6F7]/80 hover:text-white border border-[#F0D5DA]/30 hover:border-[#F0D5DA]/60 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer text-center"
            >
              Solo Necessari
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 md:flex-initial px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-[#8A0427] hover:bg-[#6F021E] rounded-xl transition-all shadow-lg shadow-[#8A0427]/30 hover:scale-[1.02] cursor-pointer text-center"
            >
              Accetta Tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
