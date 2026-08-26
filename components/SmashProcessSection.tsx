export default function WhyChooseUsSection() {
  const steps = [
    {
      num: "01",
      title: "Consulenza Personalizzata",
      desc: "Ogni appuntamento inizia con un'analisi accurata del capello e un dialogo aperto per capire i tuoi desideri e consigliarti il look perfetto.",
      icon: "✦",
    },
    {
      num: "02",
      title: "Prodotti Premium",
      desc: "Utilizziamo esclusivamente prodotti professionali di alta qualità selezionati per proteggere e valorizzare ogni tipo di capello.",
      icon: "◆",
    },
    {
      num: "03",
      title: "Risultato Garantito",
      desc: "Anni di esperienza e formazione continua ci permettono di offrirti un risultato impeccabile, ogni volta che varchi la nostra porta.",
      icon: "★",
    },
  ];

  return (
    <section id="perche-noi" className="py-20 bg-white border-y border-[#E8E8E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#C9A96E] text-[11px] font-semibold uppercase tracking-[0.3em] block mb-3">
            La Differenza Cappiello
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1A1A1B] italic">
            Perché sceglierci
          </h2>
          <p className="text-[#6B6B6B] text-sm mt-3 font-normal">
            Tre pilastri che rendono ogni visita un&apos;esperienza unica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#FAFAF8] rounded-3xl p-7 border border-[#E8E8E4] hover:border-[#C9A96E]/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="w-10 h-10 rounded-full bg-[#C9A96E]/10 flex items-center justify-center text-sm text-[#C9A96E] group-hover:bg-[#C9A96E]/20 transition-colors">
                    {step.icon}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#E8E8E4] group-hover:text-[#C9A96E]/30 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1A1A1B] mb-2 italic">
                  {step.title}
                </h3>
                <p className="text-[#6B6B6B] text-xs sm:text-sm leading-relaxed font-normal">
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
