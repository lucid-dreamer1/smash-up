import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Accesso Riservato | Smash Up Admin",
  description: "Area riservata per la gestione delle prenotazioni e della sala di Smash Up.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FDF6F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#F0D5DA] bg-white mb-3 shadow-md group-hover:scale-105 transition-transform">
              <Image src="/logo.jpg" alt="Smash Up" fill sizes="56px" className="object-cover" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-black text-[#2B0A12]">
              SMASH UP <span className="text-[#8A0427]">.</span>
            </h1>
          </Link>
          <p className="text-[#8A0427] text-xs uppercase tracking-[0.2em] mt-1 font-black">
            Pannello di Gestione Locale
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#F0D5DA]">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-black text-[#2B0A12] mb-1">
            Accesso Riservato
          </h2>
          <p className="text-[#735058] text-xs mb-6 font-medium">
            Inserisci le credenziali di amministrazione per gestire tavoli, ordini e prenotazioni.
          </p>

          <LoginForm />
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-bold text-[#735058] hover:text-[#8A0427] transition-colors"
          >
            ← Torna al sito web
          </Link>
        </div>

      </div>
    </div>
  );
}
