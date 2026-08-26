import Link from "next/link";

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

  let title = "Stato Appuntamento";
  let message = "Operazione completata con successo.";
  let statusType: "success" | "danger" | "warning" = "success";

  if (isConfirmed) {
    title = "Appuntamento Confermato!";
    message = "La richiesta è stata confermata con successo. La cliente riceverà immediatamente l'email di conferma.";
    statusType = "success";
  } else if (isRejected) {
    title = "Appuntamento Rifiutato";
    message = "La richiesta è stata rifiutata. La cliente è stata informata via email con l'invito a scegliere un'altra data o orario.";
    statusType = "danger";
  } else if (isAlreadyHandled) {
    title = "Richiesta Già Gestita";
    message = `Questa richiesta è già stata gestita in precedenza (stato attuale: ${status || "confermata"}).`;
    statusType = "warning";
  } else if (isInvalid) {
    title = "Collegamento Non Valido";
    message = "Il link utilizzato è scaduto oppure la richiesta non è più presente nel database.";
    statusType = "danger";
  } else if (isError) {
    title = "Errore di Elaborazione";
    message = "Si è verificato un errore durante l'aggiornamento. Puoi gestire la richiesta dalla Inbox.";
    statusType = "danger";
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#E8E8E4] shadow-2xl max-w-md w-full p-8 sm:p-10 text-center">
        
        {/* Brand Header */}
        <div className="mb-6 pb-5 border-b border-[#E8E8E4] flex flex-col items-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#1A1A1B] tracking-tight italic">
            Cappiello <span className="text-[#C9A96E]">.</span>
          </h2>
          <p className="text-[#C9A96E] text-xs uppercase tracking-widest font-semibold mt-0.5">
            Gestione Appuntamenti
          </p>
        </div>

        {/* Status Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 font-bold">
            {statusType === "success" ? (
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
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

          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#1A1A1B] mb-2 italic">
            {title}
          </h1>
          <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs mx-auto font-normal">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href="/admin/inbox"
            className="block bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-xs uppercase tracking-wider font-semibold py-3.5 rounded-xl transition-all shadow-md hover:scale-[1.02]"
          >
            Vai alla Inbox Appuntamenti →
          </Link>
          <Link
            href="/"
            className="block text-[#6B6B6B] hover:text-[#1A1A1B] text-xs font-semibold py-2 transition-colors"
          >
            Torna alla Home del Sito
          </Link>
        </div>

      </div>
    </div>
  );
}
