import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="border-b border-[#ECD5D9]">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[82vh]">
        
        {/* Left Column: Brand Ruby Side with Real Burger Photo */}
        <div className="lg:col-span-5 bg-[#8A0427] p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white relative">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-bold block mb-4">
              Smash Up · Authentic Griddle
            </span>
            <div className="relative aspect-square w-full max-w-[380px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="/insta-hero-burger.jpg"
                alt="Smash burger con doppio formaggio e bacon"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-white uppercase tracking-wider">The OG Double Smash</p>
              <p className="text-white/70 text-[11px]">Black Angus, doppio cheddar &amp; potato bun</p>
            </div>
            <span className="text-base font-black bg-white text-[#8A0427] px-3 py-1 rounded-lg">
              €9.50
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Food Copy */}
        <div className="lg:col-span-7 bg-[#FAF5F6] p-8 sm:p-12 lg:p-20 flex flex-col justify-center text-left">
          <div className="max-w-xl space-y-6">
            
            <div className="inline-block bg-[#8A0427]/10 text-[#8A0427] text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-md">
              Cottura Rapida a 250°C
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-[#22050D] leading-[1.08] tracking-tight">
              Il vero Smash Burger.
              <br />
              <span className="text-[#8A0427]">Crosticina croccante.</span>
              <br />
              Cuore succoso.
            </h1>

            <p className="text-[#6B4E55] text-base sm:text-lg leading-relaxed">
              Carne Black Angus fresca macinata ogni giorno e schiacciata al momento su piastra rovente in cromo. La reazione di Maillard crea quel bordo dorato e sottile racchiuso in un soffice potato bun tostato al burro.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#prenota"
                className="bg-[#8A0427] hover:bg-[#6C031E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-center transition-colors shadow-sm"
              >
                Prenota un Tavolo
              </a>
              <a
                href="#menu"
                className="border border-[#22050D]/20 hover:border-[#8A0427] hover:text-[#8A0427] text-[#22050D] text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-center transition-colors bg-white"
              >
                Consulta il Menu
              </a>
            </div>

            <div className="pt-4 border-t border-[#ECD5D9] flex flex-wrap items-center gap-6 text-xs text-[#6B4E55]">
              <span>Disponibile al tavolo &amp; Takeaway</span>
              <span>·</span>
              <a
                href="https://www.instagram.com/smash_up_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A0427] font-bold hover:underline"
              >
                Seguici su Instagram @smash_up_official →
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
