"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#servizi", label: "Servizi" },
  { href: "/#chi-siamo", label: "Chi Siamo" },
  { href: "/#faq", label: "FAQ" },
];

const WHATSAPP_URL = "https://wa.me/393280071334?text=Ciao%2C%20vorrei%20prenotare%20un%20appuntamento";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-xs z-40 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-6"
      } px-4 sm:px-8`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#1A1A1B] leading-none tracking-tight italic">
                Cappiello
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#C9A96E] mt-0.5">
                Hair & Beauty
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-6 pill-nav border px-5 py-2.5 rounded-full shadow-lg shadow-black/5 transition-all duration-300 ${
            scrolled ? "border-[#E8E8E4] bg-white/95" : "border-[#E8E8E4]/80"
          }`}>
            <nav className="flex items-center gap-8 px-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link-underline text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1A1A1B]/70 hover:text-[#1A1A1B] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 pl-3 border-l border-[#E8E8E4]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#6B6B6B] hover:text-[#25D366] transition-colors flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>WhatsApp</span>
              </a>
              <a
                href="/#prenota"
                className="bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-[11px] font-semibold uppercase tracking-[0.12em] px-5 py-2 rounded-full transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
              >
                Prenota
              </a>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative p-2.5 rounded-2xl border transition-all duration-300 flex items-center justify-center w-11 h-11 shadow-sm cursor-pointer ${
              mobileOpen
                ? "bg-[#1A1A1B] border-[#1A1A1B] text-white shadow-md"
                : "bg-white border-[#E8E8E4] text-[#1A1A1B] hover:bg-[#FAFAF8]"
            }`}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center">
              <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ease-out origin-center ${
                mobileOpen ? "bg-white translate-y-[7px] -rotate-45" : "bg-[#1A1A1B]"
              }`} />
              <span className={`h-0.5 w-5 rounded-full transition-all duration-200 ease-out ${
                mobileOpen ? "opacity-0 scale-x-0" : "bg-[#1A1A1B] opacity-100"
              }`} />
              <span className={`h-0.5 w-5 rounded-full transition-all duration-300 ease-out origin-center ${
                mobileOpen ? "bg-white -translate-y-[7px] rotate-45" : "bg-[#1A1A1B]"
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out transform origin-top ${
            mobileOpen
              ? "opacity-100 scale-100 translate-y-3 max-h-[460px] pointer-events-auto"
              : "opacity-0 scale-95 translate-y-0 max-h-0 pointer-events-none"
          }`}
        >
          <div className="max-w-sm mx-auto bg-white/95 backdrop-blur-xl border border-[#E8E8E4] rounded-3xl p-5 shadow-2xl shadow-black/10 flex flex-col gap-1.5">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-[#1A1A1B] font-semibold text-sm uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between hover:bg-[#F5F5F0] hover:text-[#C9A96E] hover:translate-x-1 ${
                  mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                }`}
                style={{ transitionDelay: mobileOpen ? `${idx * 40 + 50}ms` : "0ms" }}
              >
                <span>{link.label}</span>
                <span className="text-[#C9A96E]/50 text-xs font-semibold">→</span>
              </a>
            ))}

            <div className="pt-2 border-t border-[#E8E8E4]/70 flex flex-col gap-2 mt-1">
              <a
                href="/#prenota"
                onClick={() => setMobileOpen(false)}
                className="bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-center text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                Prenota Appuntamento
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="bg-[#25D366] hover:bg-[#1DA851] text-white text-center text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Scrivici su WhatsApp
              </a>
              <a
                href="https://www.instagram.com/cappiellohairbeauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[11px] font-semibold text-[#6B6B6B] hover:text-[#C9A96E] py-1 transition-colors"
              >
                📍 @cappiellohairbeauty su Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
