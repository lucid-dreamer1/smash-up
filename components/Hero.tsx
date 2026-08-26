import Image from "next/image";

const WHATSAPP_URL = "https://wa.me/393280071334?text=Ciao%2C%20vorrei%20prenotare%20un%20appuntamento";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[#FAFAF8] pointer-events-none overflow-hidden">
        {/* Desktop Left Side: Dark Panel */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-[42%] lg:w-[40%] bg-[#0A0A0B] overflow-hidden">
          <div className="absolute left-6 bottom-12 select-none opacity-[0.06]">
            <span className="font-[family-name:var(--font-display)] text-8xl font-bold text-white tracking-tighter italic [writing-mode:vertical-lr] rotate-180">
              Cappiello
            </span>
          </div>
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#C9A96E]/10 blur-3xl" />
        </div>

        {/* Ambient Glows */}
        <div className="md:hidden absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#C9A96E]/8 blur-3xl" />
        <div className="md:hidden absolute bottom-10 -left-12 w-64 h-64 rounded-full bg-[#C9A96E]/5 blur-3xl" />
        <div className="hidden md:block absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#C9A96E]/8 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Image */}
          <div className="md:col-span-6 flex flex-col items-center md:items-start relative order-2 md:order-1">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] mx-auto md:mx-0 group">
              
              {/* Glow behind card */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#C9A96E]/15 via-[#D4BC8A]/10 to-[#C9A96E]/8 rounded-[2.5rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Image Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.12)] border-4 border-white bg-white">
                <Image
                  src="/hero-image.jpg"
                  alt="Cappiello Hair & Beauty — Salone Parrucchiere Caserta"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 460px"
                />
              </div>
            </div>
          </div>

          {/* Headline & Actions */}
          <div className="md:col-span-6 space-y-5 sm:space-y-6 order-1 md:order-2 text-left">
            
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#C9A96E]">
                Salone Parrucchiere · Caserta
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1B] leading-[1.08] tracking-tight">
                Il tuo stile,
                <br />
                <span className="italic text-[#C9A96E]">la nostra arte.</span>
              </h1>
              <p className="font-[family-name:var(--font-body)] text-base sm:text-lg font-medium text-[#6B6B6B]">
                Dove ogni dettaglio racconta la tua bellezza.
              </p>
            </div>

            <p className="text-[#6B6B6B] text-xs sm:text-sm leading-relaxed max-w-lg font-normal">
              Taglio, colore, trattamenti ricostruttivi e acconciature sposa. 
              Da Cappiello Hair & Beauty ogni servizio è pensato su misura per valorizzare la tua unicità.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="/#prenota"
                className="bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] text-center"
              >
                Prenota Appuntamento
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1DA851] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>

            <div className="pt-1 text-xs text-[#9B9B9B] font-medium flex items-center gap-3">
              <span>📍 Via delle Querce, 38 — Caserta</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
