"use client";

import { useState } from "react";
import { MenuItem, MenuCategory } from "@/lib/types";

const categories: { key: MenuCategory; label: string; icon: string }[] = [
  { key: "primi", label: "Smash Burgers", icon: "🍔" },
  { key: "antipasti", label: "Crispy Chicken & Bites", icon: "🍗" },
  { key: "secondi", label: "Loaded Fries", icon: "🍟" },
  { key: "dolci", label: "Sweet Buns & Drinks", icon: "🥤" },
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
    <section id="menu" className="py-24 sm:py-32 bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF9F1C] font-black block mb-2">
            The Official Menu
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-black text-[#18181B]">
            I Nostri Burger &amp; Sfizi
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-3">
            Tutti i burger sono serviti caldi e preparati al momento sulla piastra.
          </p>
        </div>

        {/* Categories Tab */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "bg-[#FF9F1C] text-white border-[#FF9F1C] shadow-lg shadow-orange-500/25 scale-[1.02]"
                    : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50 hover:text-[#18181B]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-zinc-200/90 rounded-2xl p-6 hover:border-[#FF9F1C] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-[#18181B] group-hover:text-[#FF9F1C] transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-[family-name:var(--font-display)] text-xl font-black text-[#FF9F1C] shrink-0">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
                <span>{item.featured ? "⭐ Top Seller" : "🔥 Smashed Fresh"}</span>
                <a href="#prenota" className="text-[#FF9F1C] font-bold hover:underline">
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
