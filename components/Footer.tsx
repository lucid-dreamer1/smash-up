"use client";

import Link from "next/link";

export default function Footer() {
  function handleOpenCookieBanner() {
    window.dispatchEvent(new CustomEvent("open-cookie-banner"));
  }

  return (
    <footer id="contatti" className="bg-[#2B0A12] text-[#FDF6F7]/70 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-white font-black">
              SMASH UP <span className="text-[#8A0427]">.</span>
            </h3>
            <p className="text-[#FDF6F7]/80 leading-relaxed font-light">
              Authentic American Smash Burgers.
              <br />
              <span className="text-[#F0D5DA] font-bold">Real Smash. Real Crust.</span>
            </p>
            <a
              href="https://www.instagram.com/smash_up_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#F0D5DA] hover:text-white font-bold transition-colors"
            >
              Instagram: @smash_up_official ↗
            </a>
          </div>

          <div className="space-y-2">
            <h4 className="text-[#F0D5DA] uppercase tracking-widest text-xs font-bold mb-3">
              Servizio &amp; Orari
            </h4>
            <p className="text-white font-light">Disponibile al tavolo &amp; Takeaway</p>
            <div className="pt-2 text-[#FDF6F7]/70 font-light leading-relaxed">
              <p>Mercoledì – Lunedì: 19:00 – 00:30</p>
              <p>Sabato &amp; Domenica anche a Pranzo: 12:30 – 15:30</p>
              <p className="text-[#FDF6F7]/50 italic">Martedì riposo settimanale</p>
            </div>
          </div>

          <div>
            <h4 className="text-[#F0D5DA] uppercase tracking-widest text-xs font-bold mb-3">
              Social &amp; Community
            </h4>
            <div className="bg-[#3D101C] border border-[#8A0427]/30 rounded-2xl p-5 space-y-2">
              <p className="text-white text-xs font-semibold">Taggaci nei tuoi post e reel</p>
              <p className="text-[#FDF6F7]/60 text-[11px]">Condividi il tuo smash con l&apos;hashtag #SmashUpOfficial</p>
              <a
                href="https://www.instagram.com/smash_up_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#8A0427] hover:bg-[#6F021E] text-white text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-colors mt-2"
              >
                Segui su Instagram →
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#8A0427]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FDF6F7]/60">
          <p>© {new Date().getFullYear()} Smash Up. Tutti i diritti riservati.</p>
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
              className="hover:text-white transition-colors cursor-pointer underline text-[#F0D5DA]"
            >
              Gestisci Cookie
            </button>
         </div>
        </div>

      </div>
    </footer>
  );
}
