export default function SmashProcessSection() {
  const points = [
    {
      title: "La Carne: 100% Black Angus",
      desc: "Nessun additivo o conservante. Solo tagli nobili selezionati con il bilanciamento ideale di grasso nobile per garantire un morso morbido e ricco di sapore.",
    },
    {
      title: "La Piastra: Pressione a 250°C",
      desc: "La polpetta viene schiacciata con forza nei primi secondi sulla piastra rovente. Il contatto termico immediato crea la celebre crosticina caramellata di Maillard.",
    },
    {
      title: "Il Pane: Authentic Potato Bun",
      desc: "Panino americano a base di patate, soffice e leggero, tostato al burro sulla piastra per accogliere il doppio cheddar fuso e la nostra salsa speciale.",
    },
  ];

  return (
    <section id="la-scienza" className="py-20 bg-white border-b border-[#ECD5D9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8A0427] font-bold block">
              La Filosofia Smash
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#22050D] leading-tight">
              Cosa rende unico il nostro burger
            </h2>
            <p className="text-sm text-[#6B4E55] leading-relaxed">
              Non è un hamburger tradizionale: è una tecnica di cottura specifica nata negli Stati Uniti per esaltare al massimo consistenza e sapore.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {points.map((pt, i) => (
              <div key={i} className="border-t-2 border-[#8A0427] pt-4 space-y-2">
                <h3 className="font-bold text-[#22050D] text-base">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B4E55] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
