"use client";

import Link from "next/link";
import Image from "next/image";

export default function CookiePolicyPage() {
  function handleOpenPreferences() {
    window.dispatchEvent(new CustomEvent("open-cookie-banner"));
  }

  return (
    <div className="min-h-screen bg-[#FDF6F7] text-[#2B0A12] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#8A0427] hover:text-[#6F021E] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Torna alla Home
          </Link>
          
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-[#F0D5DA] bg-white">
              <Image src="/logo.jpg" alt="Smash Up" fill sizes="32px" className="object-cover" />
            </div>
            <span className="font-[family-name:var(--font-display)] font-black text-lg text-[#2B0A12]">
              SMASH UP
            </span>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-[#F0D5DA] rounded-3xl p-6 sm:p-12 shadow-xl shadow-[#8A0427]/5 space-y-8">
          
          <div className="space-y-3 border-b border-[#F0D5DA]/80 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF6F7] border border-[#F0D5DA]">
              <span className="text-sm">🍪</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8A0427]">
                Direttiva ePrivacy &amp; GDPR
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#2B0A12] leading-tight">
              Informativa sui Cookie
            </h1>
            <p className="text-xs text-[#735058] font-medium">
              Ultimo aggiornamento: Febbraio 2026
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#735058] space-y-6 text-sm leading-relaxed font-medium">
            
            <div>
              <p>
                Questa informativa illustra cosa sono i cookie, quali tipologie vengono impiegate sul sito di <strong>Smash Up</strong> (@smash_up_official) e in che modo l&apos;utente può gestire o modificare le proprie preferenze in qualsiasi momento.
              </p>
            </div>

            {/* Manage Preferences Box */}
            <div className="bg-[#FDF6F7] p-6 rounded-2xl border border-[#F0D5DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-[family-name:var(--font-display)] font-black text-[#2B0A12] text-base">
                  Le tue preferenze sul consenso
                </h3>
                <p className="text-xs text-[#735058]">
                  Puoi modificare o revocare la tua scelta relativa ai cookie in qualsiasi momento.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenPreferences}
                className="bg-[#8A0427] hover:bg-[#6F021E] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                Modifica Preferenze Cookie
              </button>
            </div>

            {/* Section 1 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                1. Cosa sono i Cookie?
              </h2>
              <p>
                I cookie sono piccoli file di testo che i siti web visitati inviano al dispositivo dell&apos;utente (computer, smartphone, tablet), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie consentono al sito di funzionare in modo efficiente, di memorizzare preferenze di visualizzazione o di raccogliere statistiche anonime aggregate.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                2. Tipologie di Cookie Utilizzati
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#FDF6F7] border border-[#F0D5DA]/80">
                  <h3 className="font-extrabold text-[#2B0A12] text-sm mb-1">
                    A. Cookie Tecnici e Necessari (Sempre Attivi)
                  </h3>
                  <p className="text-xs">
                    Sono essenziali per il corretto funzionamento del sito e per consentire la navigazione di base (es. invio del modulo di prenotazione tavoli, memorizzazione dello stato del consenso ai cookie). Per l&apos;installazione di questi cookie non è richiesto il preventivo consenso dell&apos;utente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FDF6F7] border border-[#F0D5DA]/80">
                  <h3 className="font-extrabold text-[#2B0A12] text-sm mb-1">
                    B. Cookie Statistici e Analitici (Previo Consenso)
                  </h3>
                  <p className="text-xs">
                    Ci aiutano a capire come gli utenti interagiscono con il sito raccogliendo e trasmettendo informazioni in forma anonima e aggregata (es. pagine più visitate, tempi di caricamento). Vengono attivati solo se l&apos;utente clicca su &quot;Accetta Tutti&quot; nel banner.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FDF6F7] border border-[#F0D5DA]/80">
                  <h3 className="font-extrabold text-[#2B0A12] text-sm mb-1">
                    C. Servizi di Terze Parti (Social e Mappe)
                  </h3>
                  <p className="text-xs">
                    Il sito può integrare collegamenti o mappe (es. Google Maps per raggiungere il locale, collegamenti diretti a Instagram @smash_up_official). Questi servizi esterni possono impostare cookie autonomi disciplinati dalle rispettive informative sulla privacy dei singoli fornitori.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Cookie Table */}
            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                3. Dettaglio dei Cookie in Uso
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#F0D5DA] rounded-xl overflow-hidden">
                  <thead className="bg-[#FDF6F7] text-[#2B0A12] font-black uppercase text-[10px] tracking-wider border-b border-[#F0D5DA]">
                    <tr>
                      <th className="p-3">Nome Cookie</th>
                      <th className="p-3">Tipologia</th>
                      <th className="p-3">Finalità</th>
                      <th className="p-3">Scadenza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0D5DA]/60">
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#8A0427]">smash_up_cookie_consent_v1</td>
                      <td className="p-3">Tecnico (Storage Locale)</td>
                      <td className="p-3">Salva la preferenza di consenso cookie dell&apos;utente</td>
                      <td className="p-3">1 anno / Persistente</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#8A0427]">_ga, _ga_*</td>
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
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
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

          <div className="pt-6 border-t border-[#F0D5DA] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="bg-[#8A0427] hover:bg-[#6F021E] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
            >
              Torna al Menu &amp; Home
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[#2B0A12] hover:text-[#8A0427] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
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
