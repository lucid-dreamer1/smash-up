export default function SmashProcessSection() {
  const steps = [
    {
      num: "01",
      title: "The Meat & Fat Ratio",
      subtitle: "100% Black Angus selezionato",
      desc: "Nessun additivo, solo tagli nobili macinati freschi ogni giorno con il perfetto bilanciamento tra magro e grasso per un succo esplosivo.",
      icon: "🥩",
    },
    {
      num: "02",
      title: "The Searing 250°C Press",
      subtitle: "La vera reazione di Maillard",
      desc: "La polpetta viene schiacciata con la pressa in ghisa direttamente sulla piastra rovente. Il contatto genera quella crosticina bruna, croccante e saporitissima.",
      icon: "🔥",
    },
    {
      num: "03",
      title: "The Potato Bun & Sauce",
      subtitle: "Morbido, caldo e imburrato",
      desc: "Un panino soffice come una nuvola tostato al burro, doppio American cheddar fuso a cascata e la nostra salsa speciale artigianale.",
      icon: "🍔",
    },
  ];

  return (
    <section id="la-scienza" className="py-24 bg-zinc-950 text-white relative border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-yellow-400 text-xs font-black uppercase tracking-[0.25em] block mb-2">
            Perché è Diverso da Tutti gli Altri
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-white">
            La Scienza dello Smash
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Non è un semplice hamburger: è un rituale di cottura ad altissima temperatura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="font-[family-name:var(--font-display)] text-3xl font-black text-yellow-400/30">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
                  {step.subtitle}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
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
