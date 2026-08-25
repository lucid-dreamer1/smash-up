export default function SmashProcessSection() {
  const steps = [
    {
      num: "01",
      title: "The Meat & Fat Ratio",
      subtitle: "100% Black Angus selezionato",
      desc: "Nessun additivo o conservante. Solo tagli nobili freschi macinati ogni mattina con il bilanciamento perfetto di grasso per un morso succoso ed esplosivo.",
      icon: "🥩",
    },
    {
      num: "02",
      title: "The Searing 250°C Press",
      subtitle: "La vera reazione di Maillard",
      desc: "La polpetta viene schiacciata con la pressa in ghisa direttamente sulla piastra rovente. Il contatto genera quella crosticina bruna, sottile e saporitissima.",
      icon: "🔥",
    },
    {
      num: "03",
      title: "The Potato Bun & Sauce",
      subtitle: "Morbido, caldo e imburrato",
      desc: "Un panino soffice come una nuvola tostato al burro sulla piastra, doppio American cheddar fuso e la nostra iconica salsa smash segreta.",
      icon: "🍔",
    },
  ];

  return (
    <section id="la-scienza" className="py-24 bg-white border-y border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#FF9F1C] text-xs font-black uppercase tracking-[0.25em] block mb-2">
            Perché è Diverso da Tutti gli Altri
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#18181B]">
            La Scienza dello Smash
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-3">
            Non è un semplice hamburger: è un rituale di cottura ad altissima temperatura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#FBFBFA] border border-zinc-200/80 rounded-3xl p-8 hover:border-[#FF9F1C]/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="font-[family-name:var(--font-display)] text-3xl font-black text-[#FF9F1C]/30">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#18181B] mb-1">
                  {step.title}
                </h3>
                <p className="text-[#FF9F1C] text-xs font-bold uppercase tracking-wider mb-4">
                  {step.subtitle}
                </p>
                <p className="text-zinc-600 text-sm leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
