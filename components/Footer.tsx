"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contatti" className="bg-[#18181B] text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-white font-black">
              SMASH UP <span className="text-[#FF9F1C]">.</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Authentic American Smash Burgers.
              <br />
              <span className="text-[#FF9F1C] font-bold">Real Smash. Real Crust.</span>
            </p>
            <a
              href="https://www.instagram.com/smash_up_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#FF9F1C] hover:text-white font-bold transition-colors"
            >
              Instagram: @smash_up_official ↗
            </a>
          </div>

          <div className="space-y-2">
            <h4 className="text-[#FF9F1C] uppercase tracking-widest text-xs font-bold mb-3">
              Servizio &amp; Orari
            </h4>
            <p className="text-zinc-300 font-light">Disponibile al tavolo &amp; Takeaway</p>
            <div className="pt-2 text-zinc-400 font-light leading-relaxed">
              <p>Martedì – Domenica: 19:00 – 00:30</p>
              <p>Sabato &amp; Domenica anche a Pranzo: 12:30 – 15:30</p>
              <p className="text-zinc-500 italic">Lunedì riposo settimanale</p>
            </div>
          </div>

          <div>
            <h4 className="text-[#FF9F1C] uppercase tracking-widest text-xs font-bold mb-3">
              Social &amp; Community
            </h4>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-2">
              <p className="text-zinc-300 text-xs font-semibold">Taggaci nei tuoi post e reel!</p>
              <p className="text-zinc-500 text-[11px]">Condividi il tuo smash con l&apos;hashtag #SmashUpOfficial</p>
              <a
                href="https://www.instagram.com/smash_up_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FF9F1C] hover:bg-[#ff8f00] text-white text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-colors mt-2"
              >
                Segui su Instagram →
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Smash Up. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
