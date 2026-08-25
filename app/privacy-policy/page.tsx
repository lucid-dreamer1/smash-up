import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy | Smash Up — Real American Smash Burger",
  description: "Informativa sulla privacy e trattamento dei dati personali per i clienti di Smash Up.",
};

export default function PrivacyPolicyPage() {
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
              <span className="w-2 h-2 rounded-full bg-[#8A0427]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8A0427]">
                Regolamento UE 2016/679 (GDPR)
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#2B0A12] leading-tight">
              Informativa sulla Privacy
            </h1>
            <p className="text-xs text-[#735058] font-medium">
              Ultimo aggiornamento: Febbraio 2026
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#735058] space-y-6 text-sm leading-relaxed font-medium">
            
            <div>
              <p>
                Benvenuto su <strong>Smash Up</strong>. La tua privacy e la protezione dei tuoi dati personali sono per noi di fondamentale importanza. In questa pagina descriviamo come raccogliamo, utilizziamo e proteggiamo i tuoi dati quando visiti il nostro sito web o utilizzi il nostro modulo di prenotazione tavoli e ordini.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-2 bg-[#FDF6F7] p-5 rounded-2xl border border-[#F0D5DA]">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                1. Titolare del Trattamento dei Dati
              </h2>
              <p>
                Il Titolare del trattamento è <strong>Smash Up</strong>, con sede e attività di ristorazione (profilo ufficiale Instagram:{" "}
                <a
                  href="https://www.instagram.com/smash_up_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8A0427] font-bold underline"
                >
                  @smash_up_official
                </a>).
              </p>
              <p>
                Per qualsiasi domanda o per esercitare i tuoi diritti in materia di privacy, puoi contattarci tramite i nostri canali social ufficiali o recandoti direttamente presso il locale.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                2. Dati Personali Raccolti
              </h2>
              <p>Raccogliamo ed elaboriamo le seguenti tipologie di dati:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Dati di Prenotazione e Contatto:</strong> Nome, cognome, indirizzo email, numero di telefono cellulare, numero di coperti, data e ora della prenotazione, preferenza oraria, ed eventuali note (es. intolleranze, richieste speciali).
                </li>
                <li>
                  <strong>Dati di Navigazione:</strong> Indirizzi IP, tipo di browser, informazioni sul dispositivo e orari di visita, raccolti automaticamente per fini di sicurezza tecnica e aggregati per statistiche anonime di consultazione.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                3. Finalità e Base Giuridica del Trattamento
              </h2>
              <p>I tuoi dati personali vengono trattati esclusivamente per:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Gestione delle prenotazioni:</strong> Elaborare, confermare o aggiornare la tua richiesta di tavolo o servizio takeaway tramite email o messaggio WhatsApp di conferma (<em>Base giuridica: esecuzione di misure precontrattuali o contrattuali</em>).
                </li>
                <li>
                  <strong>Assistenza Clienti:</strong> Rispondere a domande, richieste di disponibilità o modifiche di orario/coperti (<em>Base giuridica: legittimo interesse ed esecuzione del servizio</em>).
                </li>
                <li>
                  <strong>Adempimenti di Legge:</strong> Rispettare obblighi fiscali, contabili e normativi vigenti.
                </li>
              </ul>
              <p className="text-xs bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200">
                🔒 <strong>Non cediamo mai</strong> i tuoi dati personali a società terze per finalità promozionali o di marketing non autorizzato.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                4. Modalità di Trattamento e Conservazione
              </h2>
              <p>
                Il trattamento è svolto mediante strumenti informatici e telematici con logiche strettamente correlate alle finalità indicate e con misure di sicurezza adeguate a prevenire la perdita dei dati, usi illeciti o accessi non autorizzati.
              </p>
              <p>
                I dati relativi alle prenotazioni vengono conservati per il tempo strettamente necessario all&apos;erogazione del servizio di ristorazione e successivamente archiviati o anonimizzati nel rispetto dei termini di legge.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                5. Destinatari dei Dati
              </h2>
              <p>
                I dati possono essere trattati dal personale autorizzato di Smash Up e da fornitori di servizi tecnici e informatici necessari al funzionamento del sito e della piattaforma (es. servizi di hosting e database protetti da standard di sicurezza moderni), nominati Responsabili del Trattamento ove previsto dal GDPR.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-2">
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
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
              <h2 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-black text-[#2B0A12]">
                7. Cookie Policy
              </h2>
              <p>
                Per maggiori dettagli circa l&apos;utilizzo dei cookie e tecnologie affini, consulta la nostra{" "}
                <Link href="/cookie-policy" className="text-[#8A0427] font-bold underline hover:text-[#6F021E]">
                  Cookie Policy dedicata
                </Link>.
              </p>
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
              href="/cookie-policy"
              className="text-[#2B0A12] hover:text-[#8A0427] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
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
