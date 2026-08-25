"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#la-scienza", label: "Lo Smash" },
  { href: "#chi-siamo", label: "Chi Siamo" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with User logo.jpg */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform border border-black/10 bg-white">
            <Image
              src="/logo.jpg"
              alt="Smash Up Logo"
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-black tracking-tight text-[#2B0A12] leading-none">
              SMASH UP
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#8A0427] mt-0.5">
              Burger Bar
            </span>
          </div>
        </Link>

        {/* Floating Pill Nav Container */}
        <div className="hidden md:flex items-center gap-6 pill-nav border border-[#F0D5DA] px-4 py-2 rounded-full shadow-lg shadow-black/5">
          <nav className="flex items-center gap-7 px-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-[#2B0A12]/80 hover:text-[#8A0427] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 pl-2 border-l border-[#F0D5DA]">
            <a
              href="https://www.instagram.com/smash_up_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#735058] hover:text-[#8A0427] transition-colors"
            >
              @smash_up_official
            </a>
            <a
              href="#prenota"
              className="bg-[#8A0427] hover:bg-[#6F021E] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md shadow-[#8A0427]/25 hover:scale-105"
            >
              Prenota
            </a>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-white border border-[#F0D5DA] text-[#2B0A12] flex flex-col items-center justify-center gap-1.5 w-10 h-10 shadow-sm"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`w-5 h-0.5 bg-[#2B0A12] rounded-full transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2 bg-[#8A0427]" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#2B0A12] rounded-full transition-all duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#2B0A12] rounded-full transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2 bg-[#8A0427]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto bg-white/95 backdrop-blur-lg border border-[#F0D5DA] rounded-3xl p-6 shadow-2xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[#2B0A12] text-sm font-bold uppercase tracking-wider py-2 border-b border-[#F0D5DA]/60 hover:text-[#8A0427]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#prenota"
            onClick={() => setMobileOpen(false)}
            className="mt-2 bg-[#8A0427] text-white text-center text-xs font-black uppercase tracking-wider py-3.5 rounded-full shadow-md"
          >
            Prenota un Tavolo
          </a>
        </div>
      )}
    </header>
  );
}
