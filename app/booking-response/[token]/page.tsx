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

  let title = "Stato Prenotazione";
  let message = "Operazione completata con successo.";
  let statusType: "success" | "danger" | "warning" = "success";

  if (isConfirmed) {
    title = "Prenotazione Accettata!";
    message = "La prenotazione è stata confermata con successo. Il cliente riceverà l'email di conferma.";
    statusType = "success";
  } else if (isRejected) {
    title = "Prenotazione Rifiutata";
    message = "La richiesta è stata rifiutata. Il cliente è stato informato via email.";
    statusType = "danger";
  } else if (isAlreadyHandled) {
    title = "Richiesta Già Elaborata";
    message = `Questa prenotazione è già stata gestita in precedenza (stato: ${status || "confermata"}).`;
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
    <div className="min-h-screen bg-[#f7f5ef] flex items-center justify-center p-4">
      <div className="bg-[#FDFDFC] rounded-3xl border border-[#5F1A19]/15 shadow-2xl max-w-md w-full p-8 sm:p-10 text-center">
        
        {/* Brand Header */}
        <div className="mb-6 pb-5 border-b border-[#5F1A19]/10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#5F1A19] tracking-tight">
            Allèr Allèr
          </h2>
          <p className="text-[#260a0a]/60 text-xs mt-0.5 uppercase tracking-widest font-semibold">
            Gestione Prenotazioni
          </p>
        </div>

        {/* Status Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 font-bold">
            {statusType === "success" ? (
              <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center border border-green-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : statusType === "danger" ? (
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center border border-red-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#5F1A19] mb-3">
            {title}
          </h1>
          <p className="text-[#260a0a]/75 text-sm leading-relaxed max-w-xs mx-auto font-light">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href="/admin/dashboard"
            className="block bg-[#5F1A19] hover:bg-[#4d1514] text-[#FDD37B] text-xs uppercase tracking-wider font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg border border-[#FDD37B]/30"
          >
            Apri Pannello di Controllo →
          </Link>
          <Link
            href="/"
            className="block text-[#5F1A19]/70 hover:text-[#5F1A19] text-xs font-semibold py-2 transition-colors"
          >
            Torna al Sito Web
          </Link>
        </div>

      </div>
    </div>
  );
}
