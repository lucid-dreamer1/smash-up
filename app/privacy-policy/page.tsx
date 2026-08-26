import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Cappiello Hair & Beauty — Salone Parrucchiere Caserta",
  description: "Informativa sulla privacy e trattamento dei dati personali per le clienti di Cappiello Hair & Beauty.",
};

export default function PrivacyPolicyPage() {
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
              <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9A96E]">
                Regolamento UE 2016/679 (GDPR)
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1A1A1B] leading-tight italic">
              Informativa sulla Privacy
            </h1>
            <p className="text-xs text-[#6B6B6B] font-medium">
              Ultimo aggiornamento: Febbraio 2026
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#6B6B6B] space-y-6 text-sm leading-relaxed font-normal">
            
            <div>
              <p>
                Benvenuta su <strong>Cappiello Hair & Beauty</strong>. La tua privacy e la protezione dei tuoi dati personali sono per noi di fondamentale importanza. In questa pagina descriviamo come raccogliamo, utilizziamo e proteggiamo i tuoi dati quando visiti il nostro sito web o utilizzi il nostro modulo di prenotazione appuntamenti.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-2 bg-[#FAFAF8] p-5 rounded-2xl border border-[#E8E8E4]">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                1. Titolare del Trattamento dei Dati
              </h2>
              <p>
                Il Titolare del trattamento è <strong>Cappiello Hair & Beauty</strong>, con sede in Via delle Querce, 38 — 81100 Caserta (CE), Tel. 0823 155 4546, WhatsApp: 328 007 1334 (profilo ufficiale Instagram:{" "}
                <a
                  href="https://www.instagram.com/cappiellohairbeauty/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A96E] font-semibold underline"
                >
                  @cappiellohairbeauty
                </a>).
              </p>
              <p>
                Per qualsiasi domanda o per esercitare i tuoi diritti in materia di privacy, puoi contattarci telefonicamente, via WhatsApp o recandoti direttamente presso il salone.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                2. Dati Personali Raccolti
              </h2>
              <p>Raccogliamo ed elaboriamo le seguenti tipologie di dati:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Dati di Prenotazione e Contatto:</strong> Nome, cognome, indirizzo email, numero di telefono, servizio richiesto, data e ora dell&apos;appuntamento ed eventuali note (es. trattamenti precedenti, richieste particolari).
                </li>
                <li>
                  <strong>Dati di Navigazione:</strong> Indirizzi IP, tipo di browser, informazioni sul dispositivo e orari di visita, raccolti automaticamente per fini di sicurezza tecnica e aggregati per statistiche anonime di consultazione.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                3. Finalità e Base Giuridica del Trattamento
              </h2>
              <p>I tuoi dati personali vengono trattati esclusivamente per:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Gestione degli appuntamenti:</strong> Elaborare, confermare o aggiornare la tua richiesta di appuntamento tramite email o WhatsApp (<em>Base giuridica: esecuzione di misure precontrattuali o contrattuali</em>).
                </li>
                <li>
                  <strong>Assistenza Clienti:</strong> Rispondere a richieste di informazioni, disponibilità o consulenza sui servizi (<em>Base giuridica: legittimo interesse ed esecuzione del servizio</em>).
                </li>
                <li>
                  <strong>Adempimenti di Legge:</strong> Rispettare obblighi fiscali, contabili e normativi vigenti.
                </li>
              </ul>
              <p className="text-xs bg-amber-50/70 text-amber-900 p-3 rounded-xl border border-amber-200">
                🔒 <strong>Non cediamo mai</strong> i tuoi dati personali a società terze per finalità promozionali o di marketing non autorizzato.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                4. Modalità di Trattamento e Conservazione
              </h2>
              <p>
                Il trattamento è svolto mediante strumenti informatici e telematici con logiche strettamente correlate alle finalità indicate e con misure di sicurezza adeguate a prevenire la perdita dei dati, usi illeciti o accessi non autorizzati.
              </p>
              <p>
                I dati relativi agli appuntamenti vengono conservati per il tempo strettamente necessario all&apos;erogazione del servizio e successivamente archiviati o anonimizzati nel rispetto dei termini di legge.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                5. Destinatari dei Dati
              </h2>
              <p>
                I dati possono essere trattati dal personale autorizzato di Cappiello Hair & Beauty e da fornitori di servizi tecnici e informatici necessari al funzionamento del sito e della piattaforma, nominati Responsabili del Trattamento ove previsto dal GDPR.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                6. I Tuoi Diritti (Art. 15-22 del GDPR)
              </h2>
              <p>In qualunque momento hai il diritto di:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Ottenere la conferma dell&apos;esistenza o meno di dati personali che ti riguardano;</li>
                <li>Conoscere l&apos;origine dei dati e le finalità del trattamento;</li>
                <li>Chiedere l&apos;aggiornamento, la rettifica o la cancellazione dei dati;</li>
                <li>Opporsi al trattamento o chiederne la limitazione;</li>
                <li>Revocare in qualsiasi momento il consenso espresso.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-[#1A1A1B] italic">
                7. Cookie Policy
              </h2>
              <p>
                Per maggiori dettagli circa l&apos;utilizzo dei cookie e tecnologie affini, consulta la nostra{" "}
                <Link href="/cookie-policy" className="text-[#C9A96E] font-semibold underline hover:text-[#1A1A1B]">
                  Cookie Policy dedicata
                </Link>.
              </p>
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
              href="/cookie-policy"
              className="text-[#1A1A1B] hover:text-[#C9A96E] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Vedi Cookie Policy</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
