"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#menu", label: "Menu" },
  { href: "/#la-scienza", label: "Lo Smash" },
  { href: "/#chi-siamo", label: "Chi Siamo" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close menu when resizing to desktop or on Esc key
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-[#2B0A12]/30 backdrop-blur-xs z-40 transition-opacity duration-300 animate-fade-in"
          aria-hidden="true"
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
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

          {/* Floating Pill Nav Container (Desktop) */}
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
                href="/#prenota"
                className="bg-[#8A0427] hover:bg-[#6F021E] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md shadow-[#8A0427]/25 hover:scale-105"
              >
                Prenota
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Button with Smooth Icon Animation */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative p-2.5 rounded-2xl border transition-all duration-300 flex items-center justify-center w-11 h-11 shadow-sm cursor-pointer ${
              mobileOpen
                ? "bg-[#8A0427] border-[#8A0427] text-white shadow-md shadow-[#8A0427]/25 rotate-90"
                : "bg-white border-[#F0D5DA] text-[#2B0A12] hover:bg-[#FDF6F7]"
            }`}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center">
              {/* Top Line */}
              <span
                className={`h-0.5 w-5 rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileOpen
                    ? "bg-white translate-y-[7px] -rotate-45"
                    : "bg-[#2B0A12]"
                }`}
              />
              {/* Middle Line */}
              <span
                className={`h-0.5 w-5 rounded-full transition-all duration-200 ease-out ${
                  mobileOpen
                    ? "opacity-0 scale-x-0"
                    : "bg-[#2B0A12] opacity-100"
                }`}
              />
              {/* Bottom Line */}
              <span
                className={`h-0.5 w-5 rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileOpen
                    ? "bg-white -translate-y-[7px] rotate-45"
                    : "bg-[#2B0A12]"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Animated Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out transform origin-top ${
            mobileOpen
              ? "opacity-100 scale-100 translate-y-3 max-h-[460px] pointer-events-auto"
              : "opacity-0 scale-95 translate-y-0 max-h-0 pointer-events-none"
          }`}
        >
          <div className="max-w-sm mx-auto bg-white/95 backdrop-blur-xl border border-[#F0D5DA] rounded-3xl p-5 shadow-2xl shadow-[#8A0427]/15 flex flex-col gap-1.5">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[#2B0A12] font-extrabold text-sm uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between hover:bg-[#8A0427]/10 hover:text-[#8A0427] hover:translate-x-1 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${idx * 40 + 50}ms` : "0ms",
                }}
              >
                <span>{link.label}</span>
                <span className="text-[#8A0427]/50 text-xs font-black">→</span>
              </a>
            ))}

            <div className="pt-2 border-t border-[#F0D5DA]/70 flex flex-col gap-2 mt-1">
              <a
                href="/#prenota"
                onClick={() => setMobileOpen(false)}
                className="bg-[#8A0427] hover:bg-[#6F021E] text-white text-center text-xs font-black uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-[#8A0427]/25 transition-all active:scale-95"
              >
                Prenota un Tavolo
              </a>
              <a
                href="https://www.instagram.com/smash_up_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[11px] font-bold text-[#735058] hover:text-[#8A0427] py-1 transition-colors"
              >
                📍 @smash_up_official su Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
