"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitBooking } from "@/app/actions/booking";
import { BookingFormState } from "@/lib/types";
import Link from "next/link";

const initialState: BookingFormState = {
  success: false,
  error: null,
  message: null,
};

export default function BookingForm() {
  const [state, formAction, isPending] = useActionState(submitBooking, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const timeSlots: string[] = [];
  for (let h = 12; h <= 15; h++) {
    timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 15) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  for (let h = 19; h <= 23; h++) {
    timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 23) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="prenota" className="py-24 sm:py-32 bg-[#FBFBFA]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF9F1C] font-black block mb-2">
            Prenotazioni &amp; Takeaway
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-[#18181B]">
            Riserva il Tuo Posto
          </h2>
          <p className="text-zinc-600 text-sm mt-3 font-light">
            Prenota il tuo tavolo in sala o richiedi l&apos;asporto. Riceverai conferma rapida via email.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {state.success && (
            <div className="mb-6 bg-green-50 border border-green-300 rounded-xl p-4 text-center">
              <p className="text-green-700 font-bold text-base">✓ Richiesta Ricevuta!</p>
              <p className="text-green-600 text-xs mt-1.5 leading-relaxed">{state.message}</p>
            </div>
          )}
          {state.error && (
            <div className="mb-6 bg-red-50 border border-red-300 rounded-xl p-4 text-center">
              <p className="text-red-700 font-bold text-sm">✗ {state.error}</p>
            </div>
          )}

          <form ref={formRef} action={formAction} className="space-y-5">
            
            <div>
              <label htmlFor="booking-name" className="block text-[#18181B] text-xs uppercase tracking-wider mb-2 font-bold">
                Nome e Cognome *
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                placeholder="Mario Rossi"
                className="w-full bg-[#FBFBFA] border border-zinc-300 rounded-xl px-4 py-3 text-[#18181B] placeholder:text-zinc-400 focus:outline-none focus:border-[#FF9F1C] text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-email" className="block text-[#18181B] text-xs uppercase tracking-wider mb-2 font-bold">
                  Email (per la conferma) *
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  placeholder="mario.rossi@email.it"
                  className="w-full bg-[#FBFBFA] border border-zinc-300 rounded-xl px-4 py-3 text-[#18181B] placeholder:text-zinc-400 focus:outline-none focus:border-[#FF9F1C] text-sm"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="block text-[#18181B] text-xs uppercase tracking-wider mb-2 font-bold">
                  Telefono Cellulare *
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+39 333 123 4567"
                  className="w-full bg-[#FBFBFA] border border-zinc-300 rounded-xl px-4 py-3 text-[#18181B] placeholder:text-zinc-400 focus:outline-none focus:border-[#FF9F1C] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-guests" className="block text-[#18181B] text-xs uppercase tracking-wider mb-2 font-bold">
                  Numero Persone *
                </label>
                <select
                  id="booking-guests"
                  name="guests"
                  required
                  className="w-full bg-[#FBFBFA] border border-zinc-300 rounded-xl px-4 py-3 text-[#18181B] focus:outline-none focus:border-[#FF9F1C] text-sm cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-white text-[#18181B]">
                      {n} {n === 1 ? "persona" : "persone"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-date" className="block text-[#18181B] text-xs uppercase tracking-wider mb-2 font-bold">
                  Data *
                </label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  required
                  min={today}
                  className="w-full bg-[#FBFBFA] border border-zinc-300 rounded-xl px-4 py-3 text-[#18181B] focus:outline-none focus:border-[#FF9F1C] text-sm cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-time" className="block text-[#18181B] text-xs uppercase tracking-wider mb-2 font-bold">
                Orario *
              </label>
              <select
                id="booking-time"
                name="time"
                required
                className="w-full bg-[#FBFBFA] border border-zinc-300 rounded-xl px-4 py-3 text-[#18181B] focus:outline-none focus:border-[#FF9F1C] text-sm cursor-pointer"
              >
                <option value="">Seleziona orario</option>
                <optgroup label="Pranzo" className="bg-white text-[#18181B]">
                  {timeSlots.filter((t) => parseInt(t) < 16).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Cena" className="bg-white text-[#18181B]">
                  {timeSlots.filter((t) => parseInt(t) >= 19).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-[#18181B] text-xs uppercase tracking-wider mb-2 font-bold">
                Note <span className="text-zinc-400 lowercase">(allergie, intolleranze, orario asporto)</span>
              </label>
              <textarea
                id="booking-notes"
                name="notes"
                rows={2}
                placeholder="Es: tavolo all'aperto, asporto ore 20:45..."
                className="w-full bg-[#FBFBFA] border border-zinc-300 rounded-xl px-4 py-2.5 text-[#18181B] placeholder:text-zinc-400 focus:outline-none focus:border-[#FF9F1C] text-sm resize-none"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="booking-privacy"
                name="privacy"
                type="checkbox"
                required
                className="mt-0.5 w-3.5 h-3.5 rounded border-zinc-300 bg-white text-[#FF9F1C] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="booking-privacy" className="text-zinc-600 text-xs leading-relaxed cursor-pointer font-light">
                Ho letto e accetto la{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-[#FF9F1C] underline hover:text-[#ff8f00]"
                >
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF9F1C] hover:bg-[#ff8f00] text-white text-sm font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 cursor-pointer"
            >
              {isPending ? "Invio in corso..." : "Conferma Prenotazione Tavolo 🔥"}
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
