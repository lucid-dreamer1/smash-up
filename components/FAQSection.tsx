"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Come posso prenotare un appuntamento?",
    answer:
      "Puoi prenotare direttamente dal nostro sito compilando il modulo nella sezione Prenota, oppure scriverci su WhatsApp al 328 007 1334. Ti risponderemo il prima possibile per confermare data e orario.",
  },
  {
    question: "Offrite servizi per la sposa?",
    answer:
      "Sì! Offriamo un servizio completo per le spose: dalla prova acconciatura nei giorni precedenti alla realizzazione il giorno delle nozze, con prodotti premium e assistenza dedicata. Consigliamo di prenotare con almeno 2 mesi di anticipo.",
  },
  {
    question: "Quali prodotti utilizzate?",
    answer:
      "Utilizziamo esclusivamente prodotti professionali di altissima qualità dei migliori brand del settore. Ogni prodotto è selezionato per garantire risultati ottimali proteggendo la salute dei tuoi capelli.",
  },
  {
    question: "Fate trattamenti per capelli danneggiati?",
    answer:
      "Certamente! Offriamo trattamenti di ricostruzione cheratinica, filler capelli con acido ialuronico, trattamenti anticrespo e hair spa. Durante la consulenza valuteremo insieme il trattamento più adatto alle tue esigenze.",
  },
  {
    question: "Quali sono gli orari del salone?",
    answer:
      "Siamo aperti dal Lunedì al Giovedì dalle 09:00 alle 19:00, il Venerdì dalle 08:30 alle 20:00 e il Sabato dalle 08:00 alle 20:00. La Domenica siamo chiusi.",
  },
  {
    question: "Posso disdire o spostare un appuntamento?",
    answer:
      "Sì, ti chiediamo gentilmente di avvisarci almeno 24 ore prima, così potremo riprogrammare il tuo appuntamento e offrire il posto ad altre clienti. Puoi contattarci telefonicamente o via WhatsApp.",
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
    <section id="faq" className="py-24 bg-white border-t border-[#E8E8E4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C9A96E] font-semibold block mb-3">
            Domande Frequenti
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1A1A1B] italic">
            FAQ
          </h2>
        </div>

        <div className="divide-y divide-[#E8E8E4] border-y border-[#E8E8E4]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-[#1A1A1B] group-hover:text-[#C9A96E] transition-colors italic">
                    {faq.question}
                  </span>
                  <span
                    className={`text-[#C9A96E] text-xl font-bold w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
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
                    <p className="text-[#6B6B6B] text-sm font-normal leading-relaxed pr-6">
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
