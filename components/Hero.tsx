import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden">
      
      {/* ── Background: Seamless Cream on Mobile + Two-Tone Split on Desktop ── */}
      <div className="absolute inset-0 bg-[#FDF6F7] pointer-events-none overflow-hidden">
        
        {/* Desktop Left Side: Deep Ruby Brand Color (#8A0427) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-[42%] lg:w-[40%] bg-[#8A0427] overflow-hidden">
          <div className="absolute left-6 bottom-12 select-none opacity-20">
            <span className="font-[family-name:var(--font-display)] text-8xl font-black text-white tracking-tighter uppercase [writing-mode:vertical-lr] rotate-180">
              SMASH UP
            </span>
          </div>
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Ambient Subtle Glows */}
        <div className="md:hidden absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#8A0427]/10 blur-3xl" />
        <div className="md:hidden absolute bottom-10 -left-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="hidden md:block absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#8A0427]/10 blur-3xl" />
      </div>

      {/* ── Foreground Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Burger Image (Center on Mobile, Left on Desktop) */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start relative order-2 md:order-1">
            
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] mx-auto md:mx-0 group">
              
              {/* Subtle ambient glow behind card */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#8A0427]/20 via-amber-500/15 to-[#8A0427]/10 rounded-[2.5rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Real Instagram Burger Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(43,10,18,0.18)] border-4 border-white bg-white">
                <Image
                  src="/hero-image.jpg"
                  alt="Smash Up Authentic Smash Burger"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 460px"
                />
              </div>

            </div>

          </div>

          {/* Headline & Actions (Top on Mobile, Right on Desktop) */}
          <div className="md:col-span-6 space-y-5 sm:space-y-6 order-1 md:order-2 text-left">
            
           

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-black text-[#2B0A12] leading-[1.08] tracking-tight">
                Get your
                <br />
                <span className="text-[#8A0427]">Favorite</span> One.
              </h1>
              <p className="font-[family-name:var(--font-display)] text-base sm:text-xl font-bold text-[#735058]">
                La vera crosticina americana che crea dipendenza.
              </p>
            </div>

            <p className="text-[#735058] text-xs sm:text-base leading-relaxed max-w-lg font-medium">
              Doppio patty di Black Angus schiacciato a 250°C per liberare il massimo del sapore: bordi sottili e croccanti, cheddar fuso e soffice potato bun tostato.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="/#prenota"
                className="bg-[#8A0427] hover:bg-[#6F021E] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg shadow-[#8A0427]/25 transition-all hover:scale-105 text-center"
              >
                Prenota un Tavolo
              </a>
              <a
                href="/#menu"
                className="text-[#2B0A12] hover:text-[#8A0427] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors py-2 px-3 text-center"
              >
                <span>Vedi il Menu</span>
                <span>→</span>
              </a>
            </div>

            <div className="pt-1 text-xs text-[#735058] font-semibold flex items-center gap-3">
              <span>📍 @smash_up_official</span>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
