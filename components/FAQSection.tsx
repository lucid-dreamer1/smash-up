"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Che cos'è la tecnica dello 'Smash Burger'?",
    answer:
      "A differenza dei burger tradizionali alti, lo smash burger viene schiacciato con forza su una piastra rovente a 250°C nei primi secondi di cottura. Questo crea la famosa 'reazione di Maillard': una crosticina croccante, saporita e caramellata che sigilla tutti i succhi della carne all'interno.",
  },
  {
    question: "Che tipo di carne e pane utilizzate?",
    answer:
      "Utilizziamo esclusivamente 100% manzo Black Angus fresco macinato ogni mattina con il giusto rapporto di grasso nobile, racchiuso nei morbidissimi Potato Bun americani tostati al burro.",
  },
  {
    question: "È possibile ordinare da asporto (Takeaway)?",
    answer:
      "Sì! Puoi prenotare il tuo ordine da asporto direttamente compilando il modulo sul sito specificando l'orario di ritiro nelle note, oppure scrivendoci su Instagram @smash_up_official.",
  },
  {
    question: "Avete opzioni per celiaci o senza glutine?",
    answer:
      "Possiamo preparare i nostri smash burger con bun senza glutine certificato e porzioni di patatine fritte dedicate: basta segnalarlo nelle note della prenotazione.",
  },
  {
    question: "Accettate prenotazioni per gruppi e compleanni?",
    answer:
      "Certamente! Accogliamo tavolate e gruppi. Per tavoli numerosi da 8+ persone ti consigliamo di prenotare con qualche giorno di anticipo.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 bg-[#0A0A0B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-yellow-400 font-extrabold block mb-2">
            Domande Frequenti
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-white">
            FAQ Smash Up
          </h2>
        </div>

        <div className="divide-y divide-zinc-800 border-y border-zinc-800">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`text-yellow-400 text-xl font-bold w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-zinc-400 text-sm font-light leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
