import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#FBFBFA] pt-28 pb-16 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Live Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/80">
              <span className="w-2 h-2 rounded-full bg-[#FF9F1C] animate-pulse" />
              <span className="text-[#FF9F1C] text-xs font-black uppercase tracking-[0.2em]">
                Authentic American Smash Burger
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-black text-[#18181B] leading-[0.95] tracking-tight">
                REAL SMASH.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9F1C] via-amber-500 to-[#FF9F1C]">
                  REAL CRUST.
                </span>
              </h1>
              <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-zinc-600 font-bold tracking-wide">
                La vera crosticina americana che crea dipendenza.
              </p>
            </div>

            {/* Description */}
            <p className="text-zinc-600 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
              100% Black Angus smashed al momento sulla piastra rovente a 250°C per creare la celebre reazione di Maillard: bordi sottili e croccantissimi, doppio cheddar fuso e soffice potato bun tostato al burro.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-bold text-zinc-700">
              <span className="bg-white border border-zinc-200 px-3.5 py-1.5 rounded-xl shadow-xs">
                🥩 100% Black Angus
              </span>
              <span className="bg-white border border-zinc-200 px-3.5 py-1.5 rounded-xl shadow-xs">
                🧀 Double Melting Cheddar
              </span>
              <span className="bg-white border border-zinc-200 px-3.5 py-1.5 rounded-xl shadow-xs">
                🥔 Toasted Potato Bun
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a
                href="#prenota"
                className="bg-[#FF9F1C] hover:bg-[#ff8f00] text-white text-sm font-black tracking-wider uppercase px-8 py-4 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Prenota un Tavolo</span>
                <span>🔥</span>
              </a>
              <a
                href="#menu"
                className="bg-white hover:bg-zinc-50 text-[#18181B] border border-zinc-300 text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-xl transition-all text-center shadow-xs"
              >
                Consulta il Menu
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500 font-medium">
              <span>📍 @smash_up_official</span>
              <span>·</span>
              <span>Disponibile al tavolo &amp; Takeaway</span>
            </div>

          </div>

          {/* Right Column: Burger Spotlight */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/hero-bg.jpg"
                  alt="Il doppio smash burger di Smash Up"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Quality Tag */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white border border-zinc-200 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <span className="text-3xl">🍔</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#FF9F1C] block">
                    The King of the Griddle
                  </span>
                  <span className="font-bold text-sm text-[#18181B]">
                    The OG Double Smash
                  </span>
                </div>
                <span className="bg-orange-50 text-[#FF9F1C] font-black text-sm px-2.5 py-1 rounded-lg border border-orange-200 ml-2">
                  €9.50
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
