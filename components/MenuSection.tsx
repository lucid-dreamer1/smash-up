"use client";

import { useState } from "react";
import { MenuItem, MenuCategory } from "@/lib/types";

const categories: { key: MenuCategory; label: string }[] = [
  { key: "primi", label: "Smash Burgers" },
  { key: "antipasti", label: "Crispy Chicken" },
  { key: "secondi", label: "Loaded Fries" },
  { key: "dolci", label: "Sweet Buns & Drinks" },
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
    <section id="menu" className="py-24 bg-[#F7EFE3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ECA050] font-black block mb-2">
            The Official Menu
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-black text-[#2B2118]">
            Scegli il Tuo Preferito
          </h2>
          <p className="text-[#786A5E] text-sm mt-2 font-medium">
            Preparati caldi al momento sulla piastra a 250°C.
          </p>
        </div>

        {/* Categories Tab */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center justify-center py-3 px-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "bg-[#ECA050] text-white border-[#ECA050] shadow-md shadow-orange-500/20 scale-[1.02]"
                    : "bg-white text-[#2B2118] border-black/5 hover:bg-white/80"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-black/5 rounded-2xl p-6 hover:border-[#ECA050] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-[#2B2118] group-hover:text-[#ECA050] transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-[family-name:var(--font-display)] text-lg font-black text-[#E75A4E] shrink-0">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-[#786A5E] text-xs sm:text-sm font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-[#786A5E]">
                <span className="font-semibold text-[11px] uppercase tracking-wider">
                  {item.featured ? "Top Seller" : "Smashed Fresh"}
                </span>
                <a href="#prenota" className="text-[#ECA050] font-extrabold hover:underline">
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
