import Image from "next/image";

export default function TeamSection() {
  return (
    <section id="chi-siamo" className="py-24 bg-white border-t border-[#F0D5DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-[#FDF6F7] bg-white">
              <Image
                src="/insta-burger-box.jpg"
                alt="Smash Up Experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
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
