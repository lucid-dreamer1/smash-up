"use client";

import { useState, useEffect } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-[#260a0a]/95 backdrop-blur-md border-t border-[#5F1A19]/40 px-4 py-3">
        <a
          href="#prenota"
          className="block bg-[#5F1A19] hover:bg-[#4d1514] text-[#FDD37B] text-center font-bold py-3.5 rounded-full transition-all duration-300 shadow-lg text-sm border border-[#FDD37B]/30 uppercase tracking-wider"
        >
          Prenota un Tavolo
        </a>
      </div>
    </div>
  );
}
