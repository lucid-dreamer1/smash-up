"use client";

import { useState } from "react";
import { MenuItem, MenuCategory } from "@/lib/types";

const categories: { key: MenuCategory; label: string }[] = [
  { key: "primi", label: "Smash Burgers" },
  { key: "antipasti", label: "Pollo Croccante" },
  { key: "secondi", label: "Patatine & Sfizi" },
  { key: "dolci", label: "Dolci & Bevande" },
];

interface MenuSectionProps {
  items: MenuItem[];
}

export default function MenuSection({ items }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("primi");

  const filteredItems = items.filter(
    (item) => item.category === activeCategory && item.available
  );

  return (
    <section id="menu" className="py-24 bg-[#FAF5F6] border-b border-[#ECD5D9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8A0427] font-bold block mb-2">
            Carta dei Piatti
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-black text-[#22050D]">
            Il Nostro Menu
          </h2>
          <p className="text-sm text-[#6B4E55] mt-2">
            Ogni burger viene preparato espresso sulla piastra al momento dell&apos;ordine.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#8A0427] text-white"
                    : "bg-white text-[#22050D] border border-[#ECD5D9] hover:border-[#8A0427]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="pb-6 border-b border-[#ECD5D9] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline gap-4 mb-1.5">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#22050D]">
                    {item.name}
                  </h3>
                  <span className="font-bold text-[#8A0427] text-base shrink-0">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6B4E55] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-3 text-right">
                <a href="#prenota" className="text-[11px] font-bold text-[#8A0427] hover:underline uppercase tracking-wider">
                  Ordina / Prenota →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
