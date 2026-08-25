import Image from "next/image";

export default function TeamSection() {
  return (
    <section id="chi-siamo" className="py-24 bg-white border-t border-[#F0D5DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-2 border-[#FDF6F7] bg-white">
              <Image
                src="/insta-burger-2.jpg"
                alt="Smash Up Signature Burger da Instagram"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-2 border-[#FDF6F7] bg-white mt-6">
              <Image
                src="/insta-burger-box.jpg"
                alt="Smash Up Box Combo da Instagram"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-2 border-[#FDF6F7] bg-white -mt-6">
              <Image
                src="/insta-burger-3.jpg"
                alt="Smash Up Double Patty da Instagram"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-2 border-[#FDF6F7] bg-white">
              <Image
                src="/insta-burger-4.jpg"
                alt="Smash Up Loaded Burger da Instagram"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8A0427] font-black block mb-2">
                Behind The Griddle
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#2B0A12] leading-tight">
                La passione per il vero
                <br />
                <span className="text-[#8A0427]">American Smash Burger.</span>
              </h2>
            </div>

            <div className="space-y-3 text-[#735058] text-sm leading-relaxed font-medium">
              <p>
                <strong>Smash Up</strong> nasce con una missione precisa: portare l&apos;autentica tecnica americana del burger schiacciato a regola d&apos;arte.
              </p>
              <p>
                Piastra in cromo rovente a 250°C, carne Black Angus ad alto contenuto di sapore e la tipica pressatura rapida che intrappola tutti i succhi e crea quella crosticina irresistibile.
              </p>
              <p>
                Seguici su Instagram <a href="https://www.instagram.com/smash_up_official/" target="_blank" rel="noopener noreferrer" className="text-[#8A0427] font-bold underline">@smash_up_official</a> per scoprire tutte le ultime novità e i burger speciali del mese.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#F0D5DA] text-center">
              <div className="bg-[#FDF6F7] p-3 rounded-2xl border border-[#F0D5DA]">
                <span className="font-[family-name:var(--font-display)] text-2xl font-black text-[#8A0427] block">
                  250°C
                </span>
                <span className="text-[11px] text-[#735058] font-bold">Piastra Calda</span>
              </div>
              <div className="bg-[#FDF6F7] p-3 rounded-2xl border border-[#F0D5DA]">
                <span className="font-[family-name:var(--font-display)] text-2xl font-black text-[#8A0427] block">
                  100%
                </span>
                <span className="text-[11px] text-[#735058] font-bold">Black Angus</span>
              </div>
              <div className="bg-[#FDF6F7] p-3 rounded-2xl border border-[#F0D5DA]">
                <span className="font-[family-name:var(--font-display)] text-2xl font-black text-[#8A0427] block">
                  0
                </span>
                <span className="text-[11px] text-[#735058] font-bold">Compromessi</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
