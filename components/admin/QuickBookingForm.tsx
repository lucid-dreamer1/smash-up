"use client";

import { useState, useActionState, useEffect, useRef } from "react";
import type { Table, Reservation } from "@/lib/types";
import { createQuickBooking } from "@/app/actions/reservations";
import { useRealtime } from "./RealtimeProvider";

interface QuickBookingFormProps {
  tables: Table[];
  reservations: Reservation[];
  onSuccess?: () => void;
}

function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
}

export default function QuickBookingForm({
  tables,
  reservations,
  onSuccess,
}: QuickBookingFormProps) {
  const { refreshAll } = useRealtime();
  const [state, formAction, isPending] = useActionState(createQuickBooking, {
    success: false,
    error: null,
    message: null,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);
  const [source, setSource] = useState<"phone" | "walk_in">("phone");
  const [selectedTableId, setSelectedTableId] = useState("");
  const [notes, setNotes] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState("20:30");

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setPhone("");
      setName("");
      setNotes("");
      setSelectedTableId("");
      refreshAll();
      if (onSuccess) onSuccess();
    }
  }, [state.success, onSuccess, refreshAll]);

  // Available tables calculation
  const reqMinutes = timeToMinutes(time);
  const occupiedTableIds = new Set<string>();
  for (const r of reservations) {
    if (
      r.date === date &&
      r.table_id &&
      r.status === "pending"
    ) {
      const resMinutes = timeToMinutes(r.time);
      if (Math.abs(reqMinutes - resMinutes) < 120) {
        occupiedTableIds.add(r.table_id);
      }
    }
  }

  const suitableTables = tables.filter(
    (t) => t.active && !occupiedTableIds.has(t.id) && t.seats >= guests
  );

  return (
    <div className="bg-white rounded-3xl border border-olive-100 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-olive-100">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900">
            Inserimento Rapido
          </h2>
          <p className="text-olive-500 text-xs mt-1">
            Per telefonate e clienti al banco in pochi secondi
          </p>
        </div>

        {/* Source Toggle */}
        <div className="flex bg-olive-50 p-1 rounded-xl border border-olive-200">
          <button
            type="button"
            onClick={() => setSource("phone")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              source === "phone"
                ? "bg-white text-olive-900 shadow-sm"
                : "text-olive-500 hover:text-olive-800"
            }`}
          >
            Telefono
          </button>
          <button
            type="button"
            onClick={() => setSource("walk_in")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              source === "walk_in"
                ? "bg-white text-olive-900 shadow-sm"
                : "text-olive-500 hover:text-olive-800"
            }`}
          >
            Al Banco
          </button>
        </div>
      </div>

      {/* Feedback Messages */}
      {state.success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl text-sm">
          <div className="font-semibold">{state.message}</div>
        </div>
      )}

      {state.error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm">
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-5">
        <input type="hidden" name="source" value={source} />

        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-2">
              Nome Cliente *
            </label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Es. Mario Rossi"
              className="w-full bg-olive-50/50 border border-olive-200 rounded-xl px-4 py-2.5 text-olive-900 focus:ring-2 focus:ring-terra-500/40 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-2">
              Telefono *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Es. 333 123 4567"
              className="w-full bg-olive-50/50 border border-olive-200 rounded-xl px-4 py-2.5 text-olive-900 focus:ring-2 focus:ring-terra-500/40 text-sm font-medium"
            />
          </div>
        </div>

        {/* Row 2: Guests + Date + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-2">
              Persone ({guests})
            </label>
            <input type="hidden" name="guests" value={guests} />
            <div className="flex gap-1 flex-wrap">
              {[1, 2, 4, 6, 8, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuests(num)}
                  className={`flex-1 min-w-[32px] py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    guests === num
                      ? "bg-terra-500 text-white border-terra-600 shadow-sm"
                      : "bg-olive-50 text-olive-700 border-olive-200 hover:bg-olive-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-2">
              Data
            </label>
            <input
              type="date"
              name="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-olive-50/50 border border-olive-200 rounded-xl px-3 py-2 text-olive-900 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-2">
              Orario
            </label>
            <select
              name="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-olive-50/50 border border-olive-200 rounded-xl px-3 py-2 text-olive-900 text-sm font-medium"
            >
              <optgroup label="Pranzo">
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
              </optgroup>
              <optgroup label="Cena">
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Row 3: Table assignment */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-2 flex items-center justify-between">
            <span>Assegna Tavolo (Opzionale)</span>
            <span className="text-[11px] font-normal text-olive-500">
              {suitableTables.length} tavoli liberi per {guests}p
            </span>
          </label>
          <select
            name="table_id"
            value={selectedTableId}
            onChange={(e) => setSelectedTableId(e.target.value)}
            className="w-full bg-olive-50/50 border border-olive-200 rounded-xl px-4 py-2.5 text-olive-900 text-sm font-medium"
          >
            <option value="">-- Assegna dopo --</option>
            {suitableTables.map((t) => (
              <option key={t.id} value={t.id}>
                Tavolo {t.number} ({t.seats} posti)
              </option>
            ))}
          </select>
        </div>

        {/* Row 4: Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-2">
            Note
          </label>
          <input
            type="text"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Es. Seggiolone, tavolo all'aperto..."
            className="w-full bg-olive-50/50 border border-olive-200 rounded-xl px-4 py-2.5 text-olive-900 text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-terra-500 hover:bg-terra-600 disabled:opacity-50 text-white font-bold py-3 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
        >
          {isPending ? "Salvataggio..." : "Registra Prenotazione"}
        </button>
      </form>
    </div>
  );
}
