import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Accesso Pannello | Allèr Allèr",
  description: "Area riservata per la gestione delle prenotazioni.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#5F1A19] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">
              🌶️
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#FDFDFC]">
              Allèr Allèr
            </h1>
          </Link>
          <p className="text-[#FDD37B] text-xs uppercase tracking-[0.2em] mt-1 font-semibold">
            Pannello di Gestione
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#FDFDFC] rounded-3xl p-8 shadow-2xl border border-[#FDD37B]/30">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#5F1A19] mb-1">
            Accesso Riservato
          </h2>
          <p className="text-[#260a0a]/60 text-xs mb-6">
            Inserisci le credenziali di amministrazione per gestire tavoli e prenotazioni.
          </p>

          <LoginForm />
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#FDFDFC]/70 hover:text-[#FDD37B] transition-colors"
          >
            ← Torna al sito web
          </Link>
        </div>
      </div>
    </div>
  );
}
