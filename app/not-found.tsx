import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4 relative overflow-hidden text-[#1A1A1B]">
      
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A96E]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full py-12">
        
        {/* Brand */}
        <div className="inline-flex items-center gap-2 mb-6 bg-white border border-[#E8E8E4] px-4 py-2 rounded-2xl shadow-xs">
          <span className="font-[family-name:var(--font-display)] font-bold text-sm text-[#1A1A1B] tracking-tight italic">
            Cappiello <span className="text-[#C9A96E]">.</span>
          </span>
        </div>

        {/* 404 */}
        <div className="relative mb-6">
          <span className="text-[8rem] sm:text-[10rem] font-[family-name:var(--font-display)] font-bold text-[#E8E8E4] leading-none select-none block">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl">
            ✂️
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1A1A1B] mb-3 leading-tight italic">
          Questa pagina
          <br />
          <span className="text-[#C9A96E]">non è nel nostro salone!</span>
        </h1>

        <p className="text-[#6B6B6B] text-sm sm:text-base mb-8 max-w-md mx-auto font-normal leading-relaxed">
          Sembra che la pagina che stai cercando non esista più. Torna alla home per scoprire i nostri servizi!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>← Torna alla Home</span>
          </Link>
          <Link
            href="/#servizi"
            className="w-full sm:w-auto bg-white hover:bg-[#F5F5F0] text-[#1A1A1B] hover:text-[#C9A96E] text-xs sm:text-sm font-medium uppercase tracking-wider px-6 py-3.5 rounded-xl border border-[#E8E8E4] transition-all shadow-xs flex items-center justify-center cursor-pointer"
          >
            Scopri i Servizi
          </Link>
        </div>

        <div className="mt-8 text-xs text-[#9B9B9B] font-medium">
          <span>📍 @cappiellohairbeauty</span>
        </div>

      </div>
    </div>
  );
}
