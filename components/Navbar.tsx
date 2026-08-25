"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#la-scienza", label: "Lo Smash" },
  { href: "#chi-siamo", label: "Chi Siamo" },
  { href: "#faq", label: "FAQ" },
  { href: "#prenota", label: "Prenota" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav-light border-b border-zinc-200/80 py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#FF9F1C] flex items-center justify-center text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              🍔
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-[#18181B] flex items-center gap-1">
                SMASH UP <span className="text-[#FF9F1C]">.</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-extrabold text-[#FF9F1C] -mt-1">
                American Smash Burger
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 bg-white/80 border border-zinc-200/80 px-6 py-2 rounded-full shadow-xs backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-[#FF9F1C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://www.instagram.com/smash_up_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#18181B] transition-colors"
            >
              @smash_up_official
            </a>
            <a
              href="#prenota"
              className="bg-[#FF9F1C] hover:bg-[#ff8f00] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
            >
              Prenota Tavolo 🔥
            </a>
          </div>

          {/* Animated Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white border border-zinc-200 text-[#18181B] flex flex-col items-center justify-center gap-1.5 w-10 h-10 shadow-xs"
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`w-5 h-0.5 bg-[#18181B] rounded-full transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2 bg-[#FF9F1C]" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#18181B] rounded-full transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#18181B] rounded-full transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2 bg-[#FF9F1C]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xl flex flex-col divide-y divide-zinc-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#18181B] text-sm font-bold uppercase tracking-wider py-3 hover:text-[#FF9F1C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
