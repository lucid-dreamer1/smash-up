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

const WHATSAPP_URL = "https://wa.me/393280071334?text=Ciao%2C%20vorrei%20prenotare%20un%20appuntamento";

const services = [
  "Taglio Donna",
  "Taglio + Piega",
  "Piega Liscia o Mossa",
  "Balayage",
  "Colpi di Sole",
  "Colorazione Completa",
  "Tonalizzazione",
  "Ritocco Ricrescita",
  "Ricostruzione Cheratinica",
  "Filler Capelli",
  "Trattamento Anticrespo",
  "Hair Spa & Detox",
  "Prova Sposa",
  "Acconciatura Sposa",
  "Acconciatura Cerimonia",
  "Extension Capelli",
  "Altro (specificare nelle note)",
];

export default function BookingForm() {
  const [state, formAction, isPending] = useActionState(submitBooking, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  // Time slots for the salon
  const timeSlots: string[] = [];
  for (let h = 8; h <= 19; h++) {
    timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 19) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="prenota" className="py-24 bg-[#FAFAF8]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C9A96E] font-semibold block mb-3">
            Prenotazioni
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[#1A1A1B] italic">
            Prenota il tuo Appuntamento
          </h2>
          <p className="text-[#6B6B6B] text-sm mt-3 font-normal">
            Compila il modulo o scrivici direttamente su WhatsApp. Ti confermeremo al più presto.
          </p>
        </div>

        {/* WhatsApp Quick CTA */}
        <div className="mb-6">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-[1.01] text-sm uppercase tracking-wider"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Prenota su WhatsApp
          </a>
          <p className="text-center text-[#9B9B9B] text-xs mt-2 font-normal">oppure compila il modulo qui sotto</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#E8E8E4] rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {state.success && (
            <div className="mb-6 bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-center">
              <p className="text-emerald-700 font-semibold text-sm">Richiesta Ricevuta!</p>
              <p className="text-emerald-600 text-xs mt-1">{state.message}</p>
            </div>
          )}
          {state.error && (
            <div className="mb-6 bg-red-50 border border-red-300 rounded-2xl p-4 text-center">
              <p className="text-red-700 font-semibold text-sm">Errore: {state.error}</p>
            </div>
          )}

          <form ref={formRef} action={formAction} className="space-y-4">
            
            <div>
              <label htmlFor="booking-name" className="block text-[#1A1A1B] text-xs uppercase tracking-wider mb-1.5 font-semibold">
                Nome e Cognome *
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                placeholder="Maria Rossi"
                className="w-full bg-[#FAFAF8]/60 border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1B] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C9A96E] text-sm transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-email" className="block text-[#1A1A1B] text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  Email *
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  placeholder="maria.rossi@email.it"
                  className="w-full bg-[#FAFAF8]/60 border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1B] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C9A96E] text-sm transition-colors"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="block text-[#1A1A1B] text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  Telefono *
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+39 333 123 4567"
                  className="w-full bg-[#FAFAF8]/60 border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1B] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C9A96E] text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-service" className="block text-[#1A1A1B] text-xs uppercase tracking-wider mb-1.5 font-semibold">
                Servizio Richiesto *
              </label>
              <select
                id="booking-service"
                name="service"
                required
                className="w-full bg-[#FAFAF8]/60 border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1B] focus:outline-none focus:border-[#C9A96E] text-sm cursor-pointer transition-colors"
              >
                <option value="">Seleziona servizio</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-date" className="block text-[#1A1A1B] text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  Data Preferita *
                </label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  required
                  min={today}
                  className="w-full bg-[#FAFAF8]/60 border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1B] focus:outline-none focus:border-[#C9A96E] text-sm cursor-pointer transition-colors"
                />
              </div>
              <div>
                <label htmlFor="booking-time" className="block text-[#1A1A1B] text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  Orario Preferito *
                </label>
                <select
                  id="booking-time"
                  name="time"
                  required
                  className="w-full bg-[#FAFAF8]/60 border border-[#E8E8E4] rounded-xl px-4 py-3 text-[#1A1A1B] focus:outline-none focus:border-[#C9A96E] text-sm cursor-pointer transition-colors"
                >
                  <option value="">Seleziona orario</option>
                  <optgroup label="Mattina">
                    {timeSlots.filter((t) => parseInt(t) < 13).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Pomeriggio">
                    {timeSlots.filter((t) => parseInt(t) >= 13).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-[#1A1A1B] text-xs uppercase tracking-wider mb-1.5 font-semibold">
                Note <span className="text-[#9B9B9B] lowercase">(preferenze, richieste particolari)</span>
              </label>
              <textarea
                id="booking-notes"
                name="notes"
                rows={2}
                placeholder="Es: prima visita, capelli lunghi, allergie..."
                className="w-full bg-[#FAFAF8]/60 border border-[#E8E8E4] rounded-xl px-4 py-2.5 text-[#1A1A1B] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C9A96E] text-sm resize-none transition-colors"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="booking-privacy"
                name="privacy"
                type="checkbox"
                required
                className="mt-0.5 w-3.5 h-3.5 rounded border-[#E8E8E4] text-[#C9A96E] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="booking-privacy" className="text-[#6B6B6B] text-xs cursor-pointer font-normal">
                Ho letto e accetto la{" "}
                <Link href="/privacy-policy" target="_blank" className="text-[#C9A96E] underline">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1A1A1B] hover:bg-[#0A0A0B] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider py-4 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Invio in corso..." : "Invia Richiesta Appuntamento"}
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
