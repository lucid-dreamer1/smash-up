import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface BookingResponsePageProps {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ result?: string; status?: string }>;
}

export default async function BookingResponsePage({
  params,
  searchParams,
}: BookingResponsePageProps) {
  const { token } = await params;
  const { result, status } = await searchParams;

  const isInvalid = token === "invalid";
  const isError = result === "error";
  const isAlreadyHandled = result === "already_handled";
  const isConfirmed = result === "confirmed" || result === "confirmeded";
  const isRejected = result === "rejected" || result === "rejecteded";

  let title = "Stato Prenotazione";
  let message = "Operazione completata con successo.";
  let statusType: "success" | "danger" | "warning" = "success";

  if (isConfirmed) {
    title = "Prenotazione Accettata!";
    message = "La prenotazione è stata confermata con successo. Il cliente riceverà immediatamente l'email di conferma.";
    statusType = "success";
  } else if (isRejected) {
    title = "Prenotazione Rifiutata";
    message = "La richiesta è stata rifiutata. Il cliente è stato informato via email con l'invito a scegliere un'altra data.";
    statusType = "danger";
  } else if (isAlreadyHandled) {
    title = "Richiesta Già Gestita";
    message = `Questa prenotazione è già stata gestita in precedenza (stato attuale: ${status || "confermata"}).`;
    statusType = "warning";
  } else if (isInvalid) {
    title = "Collegamento Non Valido";
    message = "Il link utilizzato è scaduto oppure la prenotazione non è più presente nel database.";
    statusType = "danger";
  } else if (isError) {
    title = "Errore di Elaborazione";
    message = "Si è verificato un errore durante l'aggiornamento. Puoi gestire la prenotazione dal pannello admin.";
    statusType = "danger";
  }

  return (
    <div className="min-h-screen bg-[#FDF6F7] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#F0D5DA] shadow-2xl max-w-md w-full p-8 sm:p-10 text-center">
        
        {/* Brand Header */}
        <div className="mb-6 pb-5 border-b border-[#F0D5DA] flex flex-col items-center">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[#F0D5DA] bg-white mb-2 shadow-xs">
            <Image src="/logo.jpg" alt="Smash Up" fill sizes="48px" className="object-cover" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#2B0A12] tracking-tight">
            SMASH UP <span className="text-[#8A0427]">.</span>
          </h2>
          <p className="text-[#735058] text-xs uppercase tracking-widest font-extrabold mt-0.5">
            Gestione Prenotazioni
          </p>
        </div>

        {/* Status Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 font-bold">
            {statusType === "success" ? (
              <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center border border-green-200">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : statusType === "danger" ? (
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center border border-red-200">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#2B0A12] mb-2">
            {title}
          </h1>
          <p className="text-[#735058] text-sm leading-relaxed max-w-xs mx-auto font-medium">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href="/admin/dashboard"
            className="block bg-[#8A0427] hover:bg-[#6F021E] text-white text-xs uppercase tracking-wider font-black py-3.5 rounded-xl transition-all shadow-md shadow-[#8A0427]/20 hover:scale-[1.02]"
          >
            Apri Dashboard Gestione →
          </Link>
          <Link
            href="/"
            className="block text-[#735058] hover:text-[#2B0A12] text-xs font-bold py-2 transition-colors"
          >
            Torna alla Home del Sito
          </Link>
        </div>

      </div>
    </div>
  );
}
