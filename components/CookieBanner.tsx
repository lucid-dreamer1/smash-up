"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cappiello_cookie_consent_v1";

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
      <div className="max-w-4xl mx-auto bg-[#0A0A0B]/95 backdrop-blur-xl border border-[#2A2A2B] rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/40 text-[#FAFAF8] pointer-events-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base">🍪</span>
              <h4 className="font-[family-name:var(--font-display)] font-bold text-sm sm:text-base text-white italic">
                Informativa su Cookie & Privacy
              </h4>
            </div>
            <p className="text-xs text-[#FAFAF8]/70 leading-relaxed font-light">
              Utilizziamo cookie tecnici essenziali per il funzionamento del sito e, previo tuo consenso, cookie statistici anonimi per migliorare la tua esperienza. Per saperne di più, consulta la nostra{" "}
              <Link href="/cookie-policy" className="text-[#C9A96E] font-medium underline hover:text-white transition-colors">
                Cookie Policy
              </Link>{" "}
              e la{" "}
              <Link href="/privacy-policy" className="text-[#C9A96E] font-medium underline hover:text-white transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleAcceptNecessary}
              className="flex-1 md:flex-initial px-4 py-2.5 text-xs font-medium text-[#FAFAF8]/70 hover:text-white border border-[#2A2A2B] hover:border-[#6B6B6B] bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer text-center"
            >
              Solo Necessari
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 md:flex-initial px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C9A96E] hover:bg-[#B8963D] rounded-xl transition-all shadow-lg shadow-[#C9A96E]/20 hover:scale-[1.02] cursor-pointer text-center"
            >
              Accetta Tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
