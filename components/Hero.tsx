import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-24"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Smash Up — Real American Smash Burger"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Live Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-extrabold uppercase tracking-[0.2em]">
                Authentic American Smash Burger
              </span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
                REAL SMASH.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
                  REAL CRUST.
                </span>
              </h1>
              <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-zinc-300 font-bold tracking-wide">
                La vera crosticina americana che crea dipendenza.
              </p>
            </div>

            {/* Description */}
            <p className="text-zinc-300/90 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed">
              100% Black Angus smashed a 250°C per liberare la massima reazione di Maillard: bordo croccante e caramellato, cuore succoso, formaggio cheddar fuso e soffice potato bun tostato al burro.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs font-bold text-white">
              <span className="bg-zinc-900/80 border border-zinc-700/60 px-3.5 py-1.5 rounded-lg backdrop-blur-sm">
                🥩 100% Black Angus
              </span>
              <span className="bg-zinc-900/80 border border-zinc-700/60 px-3.5 py-1.5 rounded-lg backdrop-blur-sm">
                🧀 Double Melting Cheddar
              </span>
              <span className="bg-zinc-900/80 border border-zinc-700/60 px-3.5 py-1.5 rounded-lg backdrop-blur-sm">
                🥔 Toasted Potato Bun
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#prenota"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black text-sm font-black tracking-wider uppercase px-8 py-4 rounded-xl shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Prenota un Tavolo</span>
                <span>🔥</span>
              </a>
              <a
                href="#menu"
                className="bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-yellow-400/50 text-sm font-bold tracking-wider uppercase px-8 py-4 rounded-xl transition-all text-center"
              >
                Guarda il Menu
              </a>
            </div>

            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest pt-2">
              📍 @smash_up_official · Disponibile al tavolo &amp; Takeaway
            </p>
          </div>

          {/* Right Card: Spotlight on The OG Double Smash */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest block">
                    ★ The King of the Griddle
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                    The OG Double Smash
                  </h3>
                </div>
                <span className="font-[family-name:var(--font-display)] text-2xl font-black text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-xl border border-yellow-400/30">
                  €9.50
                </span>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-5">
                Due polpette di Black Angus schiacciate sulla piastra a 250°C, doppio cheddar fuso, cetriolini pickles croccanti, cipolla e signature smash sauce in potato bun glassato.
              </p>

              <div className="grid grid-cols-2 gap-3 bg-black/60 rounded-xl p-3.5 border border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 block font-medium">Crosticina:</span>
                  <span className="text-yellow-400 font-bold">100% Maillard Crust</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-medium">Bun:</span>
                  <span className="text-white font-bold">Martins Potato Bun</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-green-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Piastra accesa oggi
                </span>
                <a href="#menu" className="text-yellow-400 font-bold hover:underline">
                  Tutti i Burger →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
