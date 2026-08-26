import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Accesso Riservato | Cappiello Hair & Beauty Admin",
  description: "Area riservata per la gestione delle prenotazioni di Cappiello Hair & Beauty.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#1A1A1B] italic">
              Cappiello <span className="text-[#C9A96E]">.</span>
            </h1>
          </Link>
          <p className="text-[#C9A96E] text-xs uppercase tracking-[0.2em] mt-1 font-semibold">
            Pannello Gestione Appuntamenti
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#E8E8E4]">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1A1A1B] mb-1 italic">
            Accesso Riservato
          </h2>
          <p className="text-[#6B6B6B] text-xs mb-6 font-normal">
            Inserisci le credenziali di amministrazione per gestire gli appuntamenti.
          </p>

          <LoginForm />
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-semibold text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
          >
            ← Torna al sito web
          </Link>
        </div>

      </div>
    </div>
  );
}
