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
    <section id="prenota" className="py-24 bg-[#F7EFE3]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ECA050] font-black block mb-2">
            Prenotazioni &amp; Asporto
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black text-[#2B2118]">
            Riserva il Tuo Posto
          </h2>
          <p className="text-[#786A5E] text-sm mt-2 font-medium">
            Prenota il tavolo o richiedi il takeaway. Conferma rapida via email.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {state.success && (
            <div className="mb-6 bg-green-50 border border-green-300 rounded-2xl p-4 text-center">
              <p className="text-green-700 font-bold text-sm">✓ Richiesta Ricevuta!</p>
              <p className="text-green-600 text-xs mt-1">{state.message}</p>
            </div>
          )}
          {state.error && (
            <div className="mb-6 bg-red-50 border border-red-300 rounded-2xl p-4 text-center">
              <p className="text-red-700 font-bold text-sm">✗ {state.error}</p>
            </div>
          )}

          <form ref={formRef} action={formAction} className="space-y-4">
            
            <div>
              <label htmlFor="booking-name" className="block text-[#2B2118] text-xs uppercase tracking-wider mb-1.5 font-bold">
                Nome e Cognome *
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                placeholder="Mario Rossi"
                className="w-full bg-[#F7EFE3]/50 border border-black/10 rounded-xl px-4 py-3 text-[#2B2118] placeholder:text-[#786A5E]/60 focus:outline-none focus:border-[#ECA050] text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-email" className="block text-[#2B2118] text-xs uppercase tracking-wider mb-1.5 font-bold">
                  Email *
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  placeholder="mario.rossi@email.it"
                  className="w-full bg-[#F7EFE3]/50 border border-black/10 rounded-xl px-4 py-3 text-[#2B2118] placeholder:text-[#786A5E]/60 focus:outline-none focus:border-[#ECA050] text-sm"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="block text-[#2B2118] text-xs uppercase tracking-wider mb-1.5 font-bold">
                  Telefono Cellulare *
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+39 333 123 4567"
                  className="w-full bg-[#F7EFE3]/50 border border-black/10 rounded-xl px-4 py-3 text-[#2B2118] placeholder:text-[#786A5E]/60 focus:outline-none focus:border-[#ECA050] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-guests" className="block text-[#2B2118] text-xs uppercase tracking-wider mb-1.5 font-bold">
                  Numero Persone *
                </label>
                <select
                  id="booking-guests"
                  name="guests"
                  required
                  className="w-full bg-[#F7EFE3]/50 border border-black/10 rounded-xl px-4 py-3 text-[#2B2118] focus:outline-none focus:border-[#ECA050] text-sm cursor-pointer"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "persona" : "persone"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-date" className="block text-[#2B2118] text-xs uppercase tracking-wider mb-1.5 font-bold">
                  Data *
                </label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  required
                  min={today}
                  className="w-full bg-[#F7EFE3]/50 border border-black/10 rounded-xl px-4 py-3 text-[#2B2118] focus:outline-none focus:border-[#ECA050] text-sm cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-time" className="block text-[#2B2118] text-xs uppercase tracking-wider mb-1.5 font-bold">
                Orario *
              </label>
              <select
                id="booking-time"
                name="time"
                required
                className="w-full bg-[#F7EFE3]/50 border border-black/10 rounded-xl px-4 py-3 text-[#2B2118] focus:outline-none focus:border-[#ECA050] text-sm cursor-pointer"
              >
                <option value="">Seleziona orario</option>
                <optgroup label="Pranzo">
                  {timeSlots.filter((t) => parseInt(t) < 16).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
                <optgroup label="Cena">
                  {timeSlots.filter((t) => parseInt(t) >= 19).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-[#2B2118] text-xs uppercase tracking-wider mb-1.5 font-bold">
                Note <span className="text-[#786A5E] lowercase">(allergie, orario asporto)</span>
              </label>
              <textarea
                id="booking-notes"
                name="notes"
                rows={2}
                placeholder="Es: asporto ore 20:30, intolleranza..."
                className="w-full bg-[#F7EFE3]/50 border border-black/10 rounded-xl px-4 py-2.5 text-[#2B2118] placeholder:text-[#786A5E]/60 focus:outline-none focus:border-[#ECA050] text-sm resize-none"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="booking-privacy"
                name="privacy"
                type="checkbox"
                required
                className="mt-0.5 w-3.5 h-3.5 rounded border-black/10 text-[#ECA050] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="booking-privacy" className="text-[#786A5E] text-xs cursor-pointer font-medium">
                Ho letto e accetto la{" "}
                <Link href="/privacy-policy" target="_blank" className="text-[#ECA050] underline">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#ECA050] hover:bg-[#D98836] text-white text-xs sm:text-sm font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              {isPending ? "Invio in corso..." : "Invia Richiesta Prenotazione 🔥"}
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
