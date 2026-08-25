import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      
      {/* ── Two-Tone Split Background ── */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 pointer-events-none">
        {/* Left Side: Warm Cheddar */}
        <div className="md:col-span-5 bg-[#ECA050] relative overflow-hidden flex items-center justify-center">
          <div className="absolute left-6 bottom-12 select-none opacity-20 hidden md:block">
            <span className="font-[family-name:var(--font-display)] text-8xl font-black text-[#663A0F] tracking-tighter uppercase [writing-mode:vertical-lr] rotate-180">
              SMASH UP
            </span>
          </div>
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        </div>

        {/* Right Side: Warm Cream */}
        <div className="md:col-span-7 bg-[#F7EFE3] relative">
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#ECA050]/15 blur-3xl pointer-events-none" />
        </div>
      </div>

      {/* ── Foreground Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Center Area: Real Instagram Burger Photo across split */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start relative order-2 md:order-1">
            
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto md:mx-0">
              
              {/* Real Instagram Burger Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white">
                <Image
                  src="/burger-hero.jpg"
                  alt="Smash Up Authentic Smash Burger"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 450px"
                />
              </div>

              {/* Star Sticker Badge (Zero emojis) */}
              <div className="absolute -top-4 -left-3 sm:-left-5 bg-white text-[#2B2118] rounded-2xl px-4 py-2 shadow-xl border border-black/10 flex items-center gap-2 transform -rotate-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E75A4E]" />
                <div className="leading-tight">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E75A4E] block">
                    100% BLACK ANGUS
                  </span>
                  <span className="font-extrabold text-xs text-[#2B2118]">
                    Maillard Crust
                  </span>
                </div>
              </div>

              {/* Bottom Price Highlight Hook */}
              <div className="mt-4 text-center md:text-left">
                <p className="text-sm font-extrabold text-[#2B2118] inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-black/5 shadow-xs">
                  <span>Smash Burger a partire da</span>
                  <span className="text-[#E75A4E] font-black text-base">€9.50</span>
                </p>
              </div>

            </div>

          </div>

          {/* Right Area: Clean Headline & Direct Actions */}
          <div className="md:col-span-6 space-y-6 order-1 md:order-2 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-black/5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E75A4E] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E75A4E]">
                Authentic American Smash
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-[#2B2118] leading-[1.05] tracking-tight">
                Get your
                <br />
                <span className="text-[#ECA050]">Favorite</span> One.
              </h1>
              <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-[#786A5E]">
                La vera crosticina americana che crea dipendenza.
              </p>
            </div>

            <p className="text-[#786A5E] text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              Doppio patty di Black Angus schiacciato a 250°C per liberare il massimo del sapore: bordi sottili e croccanti, cheddar fuso e soffice potato bun tostato.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#prenota"
                className="bg-[#ECA050] hover:bg-[#D98836] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
              >
                Prenota un Tavolo
              </a>
              <a
                href="#menu"
                className="text-[#2B2118] hover:text-[#ECA050] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors py-2 px-3"
              >
                <span>Vedi il Menu</span>
                <span>→</span>
              </a>
            </div>

            <div className="pt-2 text-xs text-[#786A5E] font-semibold flex items-center gap-3">
              <span>📍 @smash_up_official</span>
              <span>·</span>
              <span>Al tavolo &amp; Takeaway</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
