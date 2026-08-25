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
    <section id="prenota" className="py-24 sm:py-32 bg-[#0A0A0B] text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-yellow-400 font-extrabold block mb-2">
            Prenotazioni &amp; Takeaway
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-black text-white">
            Riserva il Tuo Posto
          </h2>
          <p className="text-zinc-400 text-sm mt-3 font-light">
            Prenota il tuo tavolo in sala. Riceverai la conferma rapida via email.
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {state.success && (
            <div className="mb-6 bg-green-500/15 border border-green-400/40 rounded-xl p-4 text-center">
              <p className="text-green-400 font-bold text-base">✓ Richiesta Ricevuta!</p>
              <p className="text-zinc-300 text-xs mt-1.5 leading-relaxed">{state.message}</p>
            </div>
          )}
          {state.error && (
            <div className="mb-6 bg-red-950/60 border border-red-400/50 rounded-xl p-4 text-center">
              <p className="text-red-400 font-bold text-sm">✗ {state.error}</p>
            </div>
          )}

          <form ref={formRef} action={formAction} className="space-y-5">
            
            <div>
              <label htmlFor="booking-name" className="block text-yellow-400 text-xs uppercase tracking-wider mb-2 font-bold">
                Nome e Cognome *
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                placeholder="Mario Rossi"
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-email" className="block text-yellow-400 text-xs uppercase tracking-wider mb-2 font-bold">
                  Email (per la conferma) *
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  placeholder="mario.rossi@email.it"
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 text-sm"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="block text-yellow-400 text-xs uppercase tracking-wider mb-2 font-bold">
                  Telefono Cellulare *
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+39 333 123 4567"
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-guests" className="block text-yellow-400 text-xs uppercase tracking-wider mb-2 font-bold">
                  Numero Persone *
                </label>
                <select
                  id="booking-guests"
                  name="guests"
                  required
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 text-sm cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-zinc-900 text-white">
                      {n} {n === 1 ? "persona" : "persone"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-date" className="block text-yellow-400 text-xs uppercase tracking-wider mb-2 font-bold">
                  Data *
                </label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  required
                  min={today}
                  className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 text-sm cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-time" className="block text-yellow-400 text-xs uppercase tracking-wider mb-2 font-bold">
                Orario *
              </label>
              <select
                id="booking-time"
                name="time"
                required
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-400 text-sm cursor-pointer"
              >
                <option value="">Seleziona orario</option>
                <optgroup label="Pranzo" className="bg-zinc-900">
                  {timeSlots.filter((t) => parseInt(t) < 16).map((t) => (
                    <option key={t} value={t} className="bg-zinc-900 text-white">
                      {t}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Cena" className="bg-zinc-900">
                  {timeSlots.filter((t) => parseInt(t) >= 19).map((t) => (
                    <option key={t} value={t} className="bg-zinc-900 text-white">
                      {t}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-yellow-400 text-xs uppercase tracking-wider mb-2 font-bold">
                Note o Esigenze <span className="text-zinc-500 lowercase">(allergie, intolleranze, asporto)</span>
              </label>
              <textarea
                id="booking-notes"
                name="notes"
                rows={2}
                placeholder="Es: tavolo all'aperto, intolleranza al lattosio..."
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 text-sm resize-none"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="booking-privacy"
                name="privacy"
                type="checkbox"
                required
                className="mt-0.5 w-3.5 h-3.5 rounded border-zinc-700 bg-black text-yellow-400 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="booking-privacy" className="text-zinc-400 text-xs leading-relaxed cursor-pointer font-light">
                Ho letto e accetto la{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="text-yellow-400 underline hover:text-yellow-300"
                >
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black text-sm font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg hover:shadow-yellow-400/25 cursor-pointer"
            >
              {isPending ? "Invio richiesta in corso..." : "Invia Richiesta Prenotazione 🔥"}
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
