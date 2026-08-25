import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Smash Up",
  description: "Informativa sulla privacy per i clienti di Smash Up.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 bg-zinc-900/90 border border-zinc-800 p-8 sm:p-12 rounded-3xl">
        <Link href="/" className="text-yellow-400 hover:underline text-xs uppercase tracking-widest font-bold">
          ← Torna alla Home
        </Link>
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-white">
          Privacy Policy — Smash Up
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito web e utilizzano il modulo di prenotazione tavoli e ordini takeaway di Smash Up (@smash_up_official).
        </p>
        <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-yellow-400">1. Dati Trattati</h2>
          <p>I dati raccolti tramite il form di prenotazione (nome, email, recapito telefonico, data e ora, note) vengono utilizzati esclusivamente per la gestione e conferma della richiesta di tavolo o asporto.</p>
          <h2 className="text-lg font-bold text-yellow-400">2. Finalità del Trattamento</h2>
          <p>I dati non vengono ceduti a terzi per scopi pubblicitari e vengono conservati unicamente per il tempo necessario alla gestione del servizio.</p>
        </div>
      </div>
    </div>
  );
}
