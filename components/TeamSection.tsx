import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="chi-siamo" className="py-24 bg-white border-t border-[#E8E8E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAFAF8] bg-white">
              <Image
                src="/salon-interior.jpg"
                alt="Interno salone Cappiello Hair & Beauty Caserta"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C9A96E] font-semibold block mb-3">
                Chi Siamo
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1A1A1B] leading-tight italic">
                La passione per la
                <br />
                <span className="text-[#C9A96E]">bellezza autentica.</span>
              </h2>
            </div>

            <div className="space-y-3 text-[#6B6B6B] text-sm leading-relaxed font-normal">
              <p>
                <strong className="text-[#1A1A1B]">Cappiello Hair & Beauty</strong> nasce dalla passione per la cura del capello e l&apos;attenzione al dettaglio. Nel cuore di Caserta, in Via delle Querce, il nostro salone è uno spazio dove eleganza e professionalità si incontrano.
              </p>
              <p>
                Ogni cliente è unica, e ogni servizio è pensato su misura. Dalla consulenza iniziale al risultato finale, il nostro team ti guida con competenza e dedizione per esaltare la tua bellezza naturale.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E8E8E4] text-center">
              <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#E8E8E4]">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#C9A96E] block italic">
                  10+
                </span>
                <span className="text-[11px] text-[#6B6B6B] font-medium">Anni di Esperienza</span>
              </div>
              <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#E8E8E4]">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#C9A96E] block italic">
                  1000+
                </span>
                <span className="text-[11px] text-[#6B6B6B] font-medium">Clienti Soddisfatte</span>
              </div>
              <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#E8E8E4]">
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#C9A96E] block italic">
                  20+
                </span>
                <span className="text-[11px] text-[#6B6B6B] font-medium">Servizi Offerti</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
