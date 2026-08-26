"use client";

import Link from "next/link";

export default function CookiePolicyPage() {
  function handleOpenPreferences() {
    window.dispatchEvent(new CustomEvent("open-cookie-banner"));
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1B] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1A1A1B] hover:text-[#C9A96E] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Torna alla Home
          </Link>
          
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-[family-name:var(--font-display)] font-bold text-xl text-[#1A1A1B] italic">
              Cappiello <span className="text-[#C9A96E]">.</span>
            </span>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-[#E8E8E4] rounded-3xl p-6 sm:p-12 shadow-xl shadow-black/5 space-y-8">
          
          <div className="space-y-3 border-b border-[#E8E8E4] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E8E8E4]">
              <span className="text-sm">🍪</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A96E]">
                Direttiva ePrivacy &amp; GDPR
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1A1A1B] leading-tight italic">
              Informativa sui Cookie
            </h1>
            <p className="text-xs text-[#6B6B6B] font-medium">
              Ultimo aggiornamento: Febbraio 2026
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#6B6B6B] space-y-6 text-sm leading-relaxed font-normal">
            
            <div>
              <p>
                Questa informativa illustra cosa sono i cookie, quali tipologie vengono impiegate sul sito di <strong>Cappiello Hair & Beauty</strong> (@cappiellohairbeauty) e in che modo l&apos;utente può gestire o modificare le proprie preferenze in qualsiasi momento.
              </p>
            </div>

            {/* Manage Preferences Box */}
            <div className="bg-[#FAFAF8] p-6 rounded-2xl border border-[#E8E8E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[#1A1A1B] text-base italic">
                  Le tue preferenze sul consenso
                </h3>
                <p className="text-xs text-[#6B6B6B]">
                  Puoi modificare o revocare la tua scelta relativa ai cookie in qualsiasi momento.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenPreferences}
                className="bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02] shrink-0 cursor-pointer"
              >
                Modifica Preferenze Cookie
              </button>
            </div>

            {/* Section 1 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                1. Cosa sono i Cookie?
              </h2>
              <p>
                I cookie sono piccoli file di testo che i siti web visitati inviano al dispositivo dell&apos;utente (computer, smartphone, tablet), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie consentono al sito di funzionare in modo efficiente, di memorizzare preferenze di visualizzazione o di raccogliere statistiche anonime aggregate.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                2. Tipologie di Cookie Utilizzati
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E4]">
                  <h3 className="font-bold text-[#1A1A1B] text-sm mb-1">
                    A. Cookie Tecnici e Necessari (Sempre Attivi)
                  </h3>
                  <p className="text-xs">
                    Sono essenziali per il corretto funzionamento del sito e per consentire la navigazione di base (es. invio del modulo di prenotazione appuntamenti, memorizzazione dello stato del consenso ai cookie). Per l&apos;installazione di questi cookie non è richiesto il preventivo consenso dell&apos;utente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E4]">
                  <h3 className="font-bold text-[#1A1A1B] text-sm mb-1">
                    B. Cookie Statistici e Analitici (Previo Consenso)
                  </h3>
                  <p className="text-xs">
                    Ci aiutano a capire come le utenti interagiscono con il sito raccogliendo e trasmettendo informazioni in forma anonima e aggregata. Vengono attivati solo se l&apos;utente clicca su &quot;Accetta Tutti&quot; nel banner.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E4]">
                  <h3 className="font-bold text-[#1A1A1B] text-sm mb-1">
                    C. Servizi di Terze Parti (Social e WhatsApp)
                  </h3>
                  <p className="text-xs">
                    Il sito può integrare collegamenti a Instagram (@cappiellohairbeauty), Facebook e WhatsApp per facilitare il contatto diretto. Questi servizi esterni possono impostare cookie autonomi disciplinati dalle rispettive informative privacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Cookie Table */}
            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                3. Dettaglio dei Cookie in Uso
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#E8E8E4] rounded-xl overflow-hidden">
                  <thead className="bg-[#FAFAF8] text-[#1A1A1B] font-bold uppercase text-[10px] tracking-wider border-b border-[#E8E8E4]">
                    <tr>
                      <th className="p-3">Nome Cookie</th>
                      <th className="p-3">Tipologia</th>
                      <th className="p-3">Finalità</th>
                      <th className="p-3">Scadenza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E4]/60">
                    <tr>
                      <td className="p-3 font-mono font-semibold text-[#C9A96E]">cappiello_cookie_consent_v1</td>
                      <td className="p-3">Tecnico (Storage Locale)</td>
                      <td className="p-3">Salva la preferenza di consenso cookie dell&apos;utente</td>
                      <td className="p-3">1 anno / Persistente</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-semibold text-[#C9A96E]">_ga, _ga_*</td>
                      <td className="p-3">Analitico (Google Analytics anonimizzato)</td>
                      <td className="p-3">Statistiche anonime sul traffico web (solo se acconsentito)</td>
                      <td className="p-3">Fino a 2 anni</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                4. Come disabilitare i Cookie tramite Browser
              </h2>
              <p>
                L&apos;utente può inoltre configurare il proprio browser in modo da bloccare o eliminare i cookie già memorizzati:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Google Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</li>
                <li><strong>Apple Safari:</strong> Preferenze → Privacy → Blocca tutti i cookie</li>
                <li><strong>Mozilla Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie e dati dei siti web</li>
                <li><strong>Microsoft Edge:</strong> Impostazioni → Cookie e autorizzazioni del sito</li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-[#E8E8E4] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              Torna alla Home
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[#1A1A1B] hover:text-[#C9A96E] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Vedi Privacy Policy</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
