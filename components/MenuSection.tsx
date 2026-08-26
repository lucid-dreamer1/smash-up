"use client";

import { useState } from "react";
import { ServiceItem, ServiceCategory } from "@/lib/types";

const categories: { key: ServiceCategory; label: string }[] = [
  { key: "taglio", label: "Taglio & Piega" },
  { key: "colore", label: "Colore" },
  { key: "trattamenti", label: "Trattamenti" },
  { key: "sposa", label: "Sposa & Cerimonia" },
];

const WHATSAPP_URL = "https://wa.me/393280071334?text=Ciao%2C%20vorrei%20informazioni%20sui%20servizi";

interface ServicesSectionProps {
  items: ServiceItem[];
}

export default function ServicesSection({ items }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("taglio");

  const filteredItems = items.filter(
    (item) => item.category === activeCategory && item.available
  );

  return (
    <section id="servizi" className="py-24 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C9A96E] font-semibold block mb-3">
            I Nostri Servizi
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1B] italic">
            Cosa possiamo fare per te
          </h2>
          <p className="text-[#6B6B6B] text-sm mt-3 font-normal">
            Ogni servizio è personalizzato sulle tue esigenze. Per un preventivo scrivici su WhatsApp.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center justify-center py-3 px-4 rounded-2xl font-semibold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "bg-[#1A1A1B] text-white border-[#1A1A1B] shadow-md scale-[1.02]"
                    : "bg-white text-[#1A1A1B] border-[#E8E8E4] hover:bg-[#F5F5F0] hover:text-[#C9A96E]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E8E8E4] rounded-2xl p-6 hover:border-[#C9A96E]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-[#1A1A1B] group-hover:text-[#C9A96E] transition-colors italic">
                    {item.name}
                  </h3>
                  {item.featured && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C9A96E] bg-[#C9A96E]/10 px-2.5 py-1 rounded-full shrink-0">
                      Top
                    </span>
                  )}
                </div>
                <p className="text-[#6B6B6B] text-xs sm:text-sm font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E8E4]/60 flex items-center justify-between text-xs text-[#6B6B6B]">
                <span className="font-medium text-[11px] uppercase tracking-wider text-[#9B9B9B]">
                  {item.featured ? "Più richiesto" : "Su appuntamento"}
                </span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A96E] font-semibold hover:underline flex items-center gap-1"
                >
                  Chiedi Info →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
