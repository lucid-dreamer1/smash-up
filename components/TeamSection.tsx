import Image from "next/image";

export default function TeamSection() {
  return (
    <section id="chi-siamo" className="py-24 bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-zinc-800">
              <Image
                src="/team-photo.jpg"
                alt="La crew di Smash Up al lavoro sulla piastra"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-yellow-400 font-black block mb-2">
                Behind The Griddle
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Nati dalla passione
                <br />
                <span className="text-yellow-400">per il vero Smash Burger.</span>
              </h2>
            </div>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                <strong>Smash Up</strong> nasce con un obiettivo preciso: portare l&apos;autentica tecnica americana del burger schiacciato senza compromessi.
              </p>
              <p>
                Niente polpettoni alti e asciutti. Usiamo una piastra in cromo rovente a 250°C, carne Black Angus ad alto contenuto di sapore e la tipica pressatura rapida che intrappola tutti i succhi e crea quella crosticina irresistibile.
              </p>
              <p>
                Vieni a provarlo caldo al tavolo oppure ordina il tuo takeaway per una serata burger a casa.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800 text-center">
              <div>
                <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black text-yellow-400 block">
                  250°C
                </span>
                <span className="text-xs text-zinc-400 font-medium">Temperatura Piastra</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black text-yellow-400 block">
                  100%
                </span>
                <span className="text-xs text-zinc-400 font-medium">Black Angus</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black text-yellow-400 block">
                  0 Min
                </span>
                <span className="text-xs text-zinc-400 font-medium">Burger Precotti</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
