"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "aller_cookie_consent_v1";

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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-[#260a0a]/95 backdrop-blur-xl border border-[#5F1A19] rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/50 text-[#FDFDFC]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <h4 className="font-semibold text-sm text-[#FDD37B]">Informativa sui Cookie</h4>
            <p className="text-xs text-[#FDFDFC]/80 leading-relaxed font-light">
              Utilizziamo cookie tecnici essenziali e, previo consenso, cookie analitici e mappe per migliorare la tua esperienza. Leggi la nostra{" "}
              <Link href="/cookie-policy" className="text-[#FDD37B] hover:underline">
                Cookie Policy
              </Link>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleAcceptNecessary}
              className="flex-1 md:flex-initial px-4 py-2 text-xs font-medium text-[#FDFDFC]/70 hover:text-[#FDFDFC] border border-[#FDFDFC]/20 rounded-lg transition-colors cursor-pointer"
            >
              Solo Necessari
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 md:flex-initial px-5 py-2 text-xs font-semibold text-[#5F1A19] bg-[#FDD37B] hover:bg-[#e5b959] rounded-lg transition-all shadow-md cursor-pointer"
            >
              Accetta Tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
