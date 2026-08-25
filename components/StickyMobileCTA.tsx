"use client";

import { useState, useEffect } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
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
      <div className="bg-white/95 backdrop-blur-md border-t border-[#F0D5DA] px-4 py-3 shadow-2xl">
        <a
          href="#prenota"
          className="block bg-[#8A0427] hover:bg-[#6F021E] text-white text-center font-black py-3.5 rounded-2xl shadow-md text-xs uppercase tracking-wider"
        >
          Prenota un Tavolo
        </a>
      </div>
    </div>
  );
}
