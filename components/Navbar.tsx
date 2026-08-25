"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#la-scienza", label: "Il Nostro Smash" },
  { href: "#chi-siamo", label: "Il Locale" },
  { href: "#faq", label: "Domande" },
  { href: "#prenota", label: "Prenota" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF5F6]/95 backdrop-blur-md border-b border-[#ECD5D9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#ECD5D9] bg-white shrink-0">
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
              <span className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-black tracking-tight text-[#22050D] leading-tight">
                SMASH UP
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A0427]">
                American Burger Bar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest font-bold text-[#22050D]/80 hover:text-[#8A0427] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://www.instagram.com/smash_up_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#6B4E55] hover:text-[#8A0427] transition-colors"
            >
              @smash_up_official
            </a>
            <a
              href="#prenota"
              className="bg-[#8A0427] hover:bg-[#6C031E] text-white text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg transition-colors"
            >
              Prenota un Tavolo
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#22050D] hover:bg-black/5"
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-[#ECD5D9] flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#22050D] text-sm font-bold uppercase tracking-wider py-1.5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#prenota"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-[#8A0427] text-white text-center text-xs font-bold uppercase tracking-wider py-3 rounded-lg"
            >
              Prenota un Tavolo
            </a>
          </div>
        )}

      </div>
    </header>
  );
}
