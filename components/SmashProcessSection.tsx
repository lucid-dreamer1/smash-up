export default function SmashProcessSection() {
  const steps = [
    {
      num: "01",
      title: "The Blend 100% Angus",
      desc: "Solo tagli nobili selezionati freschi ogni mattina con il bilanciamento ideale di grasso nobile per un morso succoso ed esplosivo.",
    },
    {
      num: "02",
      title: "The Searing 250°C Press",
      desc: "La polpetta viene schiacciata con la pressa in ghisa sulla piastra rovente, liberando la reazione di Maillard e una crosticina irresistibile.",
    },
    {
      num: "03",
      title: "The Potato Bun & Sauce",
      desc: "Panino soffice come una nuvola tostato al burro, doppio cheddar fuso e la nostra iconica salsa segreta della casa.",
    },
  ];

  return (
    <section id="la-scienza" className="py-20 bg-white border-y border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#ECA050] text-xs font-black uppercase tracking-[0.25em] block mb-2">
            La Differenza Smash
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#2B2118]">
            Perché lo Smash crea dipendenza
          </h2>
          <p className="text-[#786A5E] text-sm mt-2 font-medium">
            Tre passaggi precisi che trasformano un burger in un&apos;esperienza unica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#F7EFE3] rounded-3xl p-7 border border-black/5 hover:border-[#ECA050]/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-8 h-8 rounded-full bg-[#ECA050]/15 flex items-center justify-center text-xs font-black text-[#ECA050]">
                    0{idx + 1}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-2xl font-black text-[#ECA050]/40">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2B2118] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#786A5E] text-xs sm:text-sm leading-relaxed font-medium">
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
