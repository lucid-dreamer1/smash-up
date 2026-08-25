import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.jpg"
          alt="Smash Up Hero Burger"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle cinematic overlays for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#22050D]/95 via-[#22050D]/75 to-[#22050D]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#22050D] via-transparent to-black/30" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl text-left space-y-6 text-white">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E75A4E] animate-pulse" />
            <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">
              Smash Up · Griddle a 250°C
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Il vero Smash Burger.
            <br />
            <span className="text-[#FFB800]">Crosticina croccante.</span>
            <br />
            Cuore succoso.
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            100% Black Angus fresco macinato ogni giorno e schiacciato al momento sulla piastra rovente in cromo. La reazione di Maillard crea quel bordo sottile e dorato, racchiuso in un soffice potato bun tostato al burro.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#prenota"
              className="bg-[#8A0427] hover:bg-[#6C031E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-center transition-all shadow-lg shadow-black/40 hover:scale-105"
            >
              Prenota un Tavolo
            </a>
            <a
              href="#menu"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-center transition-all backdrop-blur-sm"
            >
              Consulta il Menu
            </a>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-white/70 font-medium">
            <span>Disponibile al tavolo &amp; Takeaway</span>
            <span>·</span>
            <a
              href="https://www.instagram.com/smash_up_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFB800] font-bold hover:underline"
            >
              Seguici su Instagram @smash_up_official →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
