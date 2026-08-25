import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6F7] flex items-center justify-center px-4 relative overflow-hidden text-[#2B0A12]">
      
      {/* Background ambient ruby glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8A0427]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full py-12">
        
        {/* Brand Logo Mini */}
        <div className="inline-flex items-center gap-2.5 mb-6 bg-white border border-[#F0D5DA] px-4 py-2 rounded-2xl shadow-xs">
          <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-[#F0D5DA] bg-white">
            <Image src="/logo.jpg" alt="Smash Up" fill sizes="24px" className="object-cover" />
          </div>
          <span className="font-[family-name:var(--font-display)] font-black text-sm text-[#2B0A12] tracking-tight">
            SMASH UP <span className="text-[#8A0427]">.</span>
          </span>
        </div>

        {/* Large 404 Header */}
        <div className="relative mb-6">
          <span className="text-[8rem] sm:text-[10rem] font-[family-name:var(--font-display)] font-black text-[#8A0427]/15 leading-none select-none block">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl animate-bounce">
            🍔
          </span>
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#2B0A12] mb-3 leading-tight">
          Questo smash burger
          <br />
          <span className="text-[#8A0427]">non è nel nostro menu!</span>
        </h1>

        {/* Description */}
        <p className="text-[#735058] text-sm sm:text-base mb-8 max-w-md mx-auto font-medium leading-relaxed">
          Sembra che la pagina che stai cercando sia stata &quot;smashed&quot; via o non esista più. Torna alla home per gustare la vera crosticina croccante!
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#8A0427] hover:bg-[#6F021E] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-[#8A0427]/25 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>← Torna alla Home</span>
          </Link>
          <Link
            href="/#menu"
            className="w-full sm:w-auto bg-white hover:bg-[#FDF6F7] text-[#2B0A12] hover:text-[#8A0427] text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl border border-[#F0D5DA] transition-all shadow-xs flex items-center justify-center cursor-pointer"
          >
            Vedi il Menu
          </Link>
        </div>

        <div className="mt-8 text-xs text-[#735058] font-semibold">
          <span>📍 @smash_up_official</span>
        </div>

      </div>
    </div>
  );
}
