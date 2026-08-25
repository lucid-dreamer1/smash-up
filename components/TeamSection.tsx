import Image from "next/image";

export default function TeamSection() {
  const photos = [
    { src: "/insta-burger-2.jpg", alt: "Smash Up Burger sul tagliere" },
    { src: "/insta-burger-box.jpg", alt: "Smash Up Combo Box" },
    { src: "/insta-burger-3.jpg", alt: "Smash burger con doppio formaggio" },
    { src: "/insta-burger-4.jpg", alt: "Smash Up Loaded special" },
  ];

  return (
    <section id="chi-siamo" className="py-24 bg-white border-b border-[#ECD5D9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Gallery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {photos.map((p, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#ECD5D9]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8A0427] font-bold block mb-2">
                La Nostra Storia
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#22050D] leading-tight">
                Passione artigianale per la cottura smashed
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#6B4E55] leading-relaxed">
              <p>
                <strong>Smash Up</strong> nasce con un obiettivo chiaro: portare l&apos;autentico smash burger americano senza compromessi.
              </p>
              <p>
                Utilizziamo solo materie prime selezionate, buns freschi e carni ad alto contenuto di sapore lavorate ogni mattina.
              </p>
              <p>
                Siamo presenti sui social per mostrare ogni giorno le nostre preparazioni e i fuori menu del mese.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/smash_up_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8A0427] hover:bg-[#6C031E] text-white text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <span>Vedi il Profilo Instagram</span>
                <span>↗</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
