import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#5F1A19] flex items-center justify-center px-4 relative overflow-hidden text-[#FDFDFC]">
      
      {/* Subtle brand glow in background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#FDD37B] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3a100f] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        
        {/* Large 404 Header */}
        <div className="relative mb-6">
          <span className="text-[9rem] sm:text-[11rem] font-[family-name:var(--font-display)] font-bold text-[#FDD37B]/20 leading-none select-none block">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-6xl">
            🌶️
          </span>
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-normal text-[#FDFDFC] mb-4">
          Questo piatto non è
          <br />
          <span className="italic text-[#FDD37B]">nel nostro menu!</span>
        </h1>

        {/* Description */}
        <p className="text-[#FDFDFC]/80 text-base sm:text-lg mb-8 max-w-md mx-auto font-light leading-relaxed">
          La pagina che stai cercando non esiste o è stata spostata.
          Torna alla homepage per scoprire i nostri piatti di casa.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group bg-[#FDD37B] hover:bg-[#e5b959] text-[#5F1A19] text-xs sm:text-sm font-bold tracking-wider uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Torna alla Homepage
          </Link>
          <Link
            href="/#prenota"
            className="text-[#FDFDFC] hover:text-[#FDD37B] text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-3.5 rounded-full border border-[#FDFDFC]/30 hover:border-[#FDD37B] transition-all duration-300"
          >
            Prenota un Tavolo
          </Link>
        </div>

      </div>
    </div>
  );
}
