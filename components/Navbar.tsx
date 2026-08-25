"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#menu", label: "Menu Smash" },
  { href: "#la-scienza", label: "Lo Smash" },
  { href: "#chi-siamo", label: "Crew" },
  { href: "#faq", label: "FAQ" },
  { href: "#prenota", label: "Prenota Tavolo" },
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
          ? "glass-header border-b border-zinc-800/80 py-3.5 shadow-xl shadow-black/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-xl shadow-lg shadow-yellow-500/20 group-hover:scale-105 transition-transform">
              🍔
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                SMASH UP <span className="text-yellow-400">.</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-yellow-400/90 -mt-1">
                Real American Smash
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 bg-zinc-900/60 border border-zinc-800/80 px-6 py-2 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-yellow-400 transition-colors"
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
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
            >
              @smash_up_official
            </a>
            <a
              href="#prenota"
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 hover:scale-105"
            >
              Prenota Ora 🔥
            </a>
          </div>

          {/* Animated Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex flex-col items-center justify-center gap-1.5 w-10 h-10"
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`w-5 h-0.5 bg-yellow-400 rounded-full transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-yellow-400 rounded-full transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-yellow-400 rounded-full transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
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
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-5 shadow-2xl flex flex-col divide-y divide-zinc-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-sm font-bold uppercase tracking-wider py-3 hover:text-yellow-400 transition-colors"
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
