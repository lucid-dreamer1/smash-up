"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitBookingInbox } from "@/app/actions/booking-inbox";
import { InboxBookingFormState } from "@/lib/types";
import Link from "next/link";

const initialState: InboxBookingFormState = {
  success: false,
  error: null,
  message: null,
};

export default function BookingFormInbox() {
  const [state, formAction, isPending] = useActionState(submitBookingInbox, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  // Generate time slots (12:00 - 14:30, 19:00 - 22:30)
  const timeSlots: string[] = [];
  for (let h = 12; h <= 14; h++) {
    timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 14 || h === 14) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  for (let h = 19; h <= 22; h++) {
    timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 22 || h === 22) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* Flow badge */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
          📬 Portale Inbox
        </span>
        <span className="text-cream-300/50 text-xs">
          Ricevi conferma via email
        </span>
      </div>

      {/* Success/Error Messages */}
      {state.success && (
        <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center">
          <p className="text-green-400 font-medium text-lg">✓ Richiesta inviata!</p>
          <p className="text-green-400/70 text-sm mt-1">{state.message}</p>
        </div>
      )}
      {state.error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center">
          <p className="text-red-400 font-medium">✗ {state.error}</p>
        </div>
      )}

      {/* Form */}
      <form
        ref={formRef}
        action={formAction}
        className="bg-white/5 backdrop-blur-sm border border-cream-100/10 rounded-3xl p-6 sm:p-10 space-y-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="inbox-name" className="block text-cream-200 text-sm font-medium mb-2">
            Nome e Cognome *
          </label>
          <input
            id="inbox-name"
            name="name"
            type="text"
            required
            placeholder="Mario Rossi"
            className="w-full bg-white/10 border border-cream-100/15 rounded-xl px-4 py-3.5 text-cream-50 placeholder:text-cream-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="inbox-email" className="block text-cream-200 text-sm font-medium mb-2">
            Email * <span className="text-cream-400/50">(per ricevere la conferma)</span>
          </label>
          <input
            id="inbox-email"
            name="email"
            type="email"
            required
            placeholder="mario@email.com"
            className="w-full bg-white/10 border border-cream-100/15 rounded-xl px-4 py-3.5 text-cream-50 placeholder:text-cream-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          />
        </div>

        {/* Guests + Date row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="inbox-guests" className="block text-cream-200 text-sm font-medium mb-2">
              Numero Persone *
            </label>
            <select
              id="inbox-guests"
              name="guests"
              required
              className="w-full bg-white/10 border border-cream-100/15 rounded-xl px-4 py-3.5 text-cream-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 appearance-none"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="bg-olive-800 text-cream-50">
                  {n} {n === 1 ? "persona" : "persone"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="inbox-date" className="block text-cream-200 text-sm font-medium mb-2">
              Data *
            </label>
            <input
              id="inbox-date"
              name="date"
              type="date"
              required
              min={today}
              className="w-full bg-white/10 border border-cream-100/15 rounded-xl px-4 py-3.5 text-cream-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Time + Phone row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="inbox-time" className="block text-cream-200 text-sm font-medium mb-2">
              Ora *
            </label>
            <select
              id="inbox-time"
              name="time"
              required
              className="w-full bg-white/10 border border-cream-100/15 rounded-xl px-4 py-3.5 text-cream-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 appearance-none"
            >
              <option value="" className="bg-olive-800">Seleziona orario</option>
              <optgroup label="Pranzo" className="bg-olive-800">
                {timeSlots.filter((t) => parseInt(t) < 15).map((t) => (
                  <option key={t} value={t} className="bg-olive-800 text-cream-50">
                    {t}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Cena" className="bg-olive-800">
                {timeSlots.filter((t) => parseInt(t) >= 19).map((t) => (
                  <option key={t} value={t} className="bg-olive-800 text-cream-50">
                    {t}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label htmlFor="inbox-phone" className="block text-cream-200 text-sm font-medium mb-2">
              Telefono *
            </label>
            <input
              id="inbox-phone"
              name="phone"
              type="tel"
              required
              placeholder="+39 333 123 4567"
              className="w-full bg-white/10 border border-cream-100/15 rounded-xl px-4 py-3.5 text-cream-50 placeholder:text-cream-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="inbox-notes" className="block text-cream-200 text-sm font-medium mb-2">
            Note <span className="text-cream-400/50">(allergie, seggiolone, ecc.)</span>
          </label>
          <textarea
            id="inbox-notes"
            name="notes"
            rows={3}
            placeholder="Es: tavolo all'aperto, intolleranze..."
            className="w-full bg-white/10 border border-cream-100/15 rounded-xl px-4 py-3.5 text-cream-50 placeholder:text-cream-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
          />
        </div>

        {/* Privacy checkbox */}
        <div className="flex items-start gap-3">
          <input
            id="inbox-privacy"
            name="privacy"
            type="checkbox"
            required
            className="mt-1 w-4 h-4 rounded border-cream-100/30 bg-white/10 text-blue-500 focus:ring-blue-500/50 focus:ring-2 cursor-pointer"
          />
          <label htmlFor="inbox-privacy" className="text-cream-200/70 text-sm leading-relaxed cursor-pointer">
            Ho letto e accetto la{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            *
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white text-lg font-semibold py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-3"
        >
          {isPending ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Invio in corso...
            </>
          ) : (
            <>
              📬 Invia Richiesta
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>

        {/* Info */}
        <div className="text-center pt-2">
          <p className="text-cream-200/60 text-sm flex items-center justify-center gap-2">
            <span>📧</span>
            Riceverai <strong className="text-cream-100/80">conferma via email</strong> dopo la verifica
          </p>
          <p className="text-cream-300/40 text-xs mt-1">
            Se preferisci, chiamaci al{" "}
            <a href="tel:+390823456789" className="text-blue-400/70 hover:text-blue-400 transition-colors">
              +39 0823 456 789
            </a>
          </p>
        </div>
      </form>
    </>
  );
}
