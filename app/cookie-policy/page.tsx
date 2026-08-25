import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | Smash Up",
  description: "Informativa estesa sull'utilizzo dei cookie su Smash Up.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 bg-zinc-900/90 border border-zinc-800 p-8 sm:p-12 rounded-3xl">
        <Link href="/" className="text-yellow-400 hover:underline text-xs uppercase tracking-widest font-bold">
          ← Torna alla Home
        </Link>
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-white">
          Cookie Policy — Smash Up
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Questo sito utilizza cookie tecnici strettamente necessari al funzionamento e, previo tuo consenso esplicito, cookie statistici anonimizzati e cookie di terze parti (come Google Maps).
        </p>
      </div>
    </div>
  );
}
