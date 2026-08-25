import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-[#ECD5D9] bg-[#FAF5F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Floating Burger (No frame, no border, pure floating burger) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
              
              {/* Floating Burger with realistic soft shadow */}
              <div className="relative aspect-[3/4] w-full drop-shadow-[0_25px_35px_rgba(34,5,13,0.22)] hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/hero-burger-floating.png"
                  alt="Smash Up Authentic Burger"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>

              {/* Discreet Floating Price Hook */}
              

            </div>
          </div>

          {/* Right Column: Editorial Food Copy & Direct Booking */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
            
           

            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black text-[#22050D] leading-[1.06] tracking-tight">
              Il vero Smash Burger.
              <br />
              <span className="text-[#8A0427]">Crosticina croccante.</span>
              <br />
              Cuore succoso.
            </h1>

            <p className="text-[#6B4E55] text-base sm:text-lg leading-relaxed font-normal">
              100% Black Angus fresco schiacciato al momento sulla piastra rovente in cromo. La reazione di Maillard crea quel bordo sottile e dorato, racchiuso in un soffice potato bun tostato al burro.
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
                className="border border-[#22050D]/20 hover:border-[#8A0427] hover:text-[#8A0427] text-[#22050D] text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-xl text-center transition-colors bg-white shadow-xs"
              >
                Consulta il Menu
              </a>
            </div>

            <div className="pt-4 border-t border-[#ECD5D9] flex flex-wrap items-center gap-6 text-xs text-[#6B4E55]">
              
              <a
                href="https://www.instagram.com/smash_up_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A0427] font-bold hover:underline"
              >
                Instagram: @smash_up_official →
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
