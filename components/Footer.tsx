"use client";

import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/393280071334?text=Ciao%2C%20vorrei%20informazioni";

export default function Footer() {
  function handleOpenCookieBanner() {
    window.dispatchEvent(new CustomEvent("open-cookie-banner"));
  }

  return (
    <footer id="contatti" className="bg-[#0A0A0B] text-[#FAFAF8]/70 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-white font-bold italic">
              Cappiello <span className="text-[#C9A96E]">.</span>
            </h3>
            <p className="text-[#FAFAF8]/70 leading-relaxed font-light">
              Salone di Parrucchiere Donna.
              <br />
              <span className="text-[#C9A96E] font-medium">Hair & Beauty · Caserta</span>
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://www.instagram.com/cappiellohairbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAF8]/60 hover:text-[#C9A96E] transition-colors font-medium"
              >
                Instagram ↗
              </a>
              <a
                href="https://www.facebook.com/people/Cappiello-hair-beauty/100063717897194/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAFAF8]/60 hover:text-[#C9A96E] transition-colors font-medium"
              >
                Facebook ↗
              </a>
            </div>
          </div>

          {/* Orari & Contatti */}
          <div className="space-y-2">
            <h4 className="text-[#C9A96E] uppercase tracking-widest text-xs font-semibold mb-3">
              Orari & Contatti
            </h4>
            <div className="text-[#FAFAF8]/70 font-light leading-relaxed space-y-1">
              <p>Lunedì – Giovedì: 09:00 – 19:00</p>
              <p>Venerdì: 08:30 – 20:00</p>
              <p>Sabato: 08:00 – 20:00</p>
              <p className="text-[#FAFAF8]/40 italic">Domenica chiuso</p>
            </div>
            <div className="pt-3 space-y-1">
              <p className="text-white font-medium">📍 Via delle Querce, 38 — 81100 Caserta</p>
              <p className="text-[#FAFAF8]/70">📞 0823 155 4546</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#25D366] hover:text-[#1DA851] font-medium transition-colors"
              >
                💬 WhatsApp: 328 007 1334 ↗
              </a>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-[#C9A96E] uppercase tracking-widest text-xs font-semibold mb-3">
              Seguici
            </h4>
            <div className="bg-[#1A1A1B] border border-[#2A2A2B] rounded-2xl p-5 space-y-2">
              <p className="text-white text-xs font-medium">Condividi il tuo nuovo look</p>
              <p className="text-[#FAFAF8]/50 text-[11px]">Taggaci nei tuoi post e stories con #CappielloHairBeauty</p>
              <a
                href="https://www.instagram.com/cappiellohairbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#C9A96E] hover:bg-[#B8963D] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors mt-2"
              >
                Segui su Instagram →
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#2A2A2B] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAFAF8]/40">
          <p>© {new Date().getFullYear()} Cappiello Hair & Beauty. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <span>·</span>
            <button
              onClick={handleOpenCookieBanner}
              type="button"
              className="hover:text-white transition-colors cursor-pointer underline text-[#C9A96E]/60"
            >
              Gestisci Cookie
            </button>
         </div>
        </div>

      </div>
    </footer>
  );
}
