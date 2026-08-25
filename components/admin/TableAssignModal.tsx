"use client";

import { useState } from "react";
import type { Reservation, Table } from "@/lib/types";
import { assignTable } from "@/app/actions/reservations";

interface TableAssignModalProps {
  reservation: Reservation;
  tables: Table[];
  allReservations: Reservation[];
  onClose: () => void;
  onAssigned?: (tableId: string | null) => void;
}

function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
}

export default function TableAssignModal({
  reservation,
  tables,
  allReservations,
  onClose,
  onAssigned,
}: TableAssignModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(
    reservation.table_id || null
  );

  const reqMinutes = timeToMinutes(reservation.time);

  // Check which tables are occupied on that date within ±2 hours (excluding this reservation itself)
  const occupiedTableIds = new Set<string>();
  for (const r of allReservations) {
    if (
      r.id !== reservation.id &&
      r.date === reservation.date &&
      r.table_id &&
      r.status === "pending"
    ) {
      const resMinutes = timeToMinutes(r.time);
      if (Math.abs(reqMinutes - resMinutes) < 120) {
        occupiedTableIds.add(r.table_id);
      }
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      await assignTable(reservation.id, selectedTableId);
      if (onAssigned) onAssigned(selectedTableId);
      onClose();
    } catch (err) {
      console.error("Assign table error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-olive-100">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900">
              Assegna Tavolo
            </h3>
            <p className="text-olive-500 text-sm mt-1">
              Per <strong className="text-olive-900">{reservation.name}</strong> ·{" "}
              {reservation.guests} ospiti · {reservation.time} ({reservation.date})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-olive-400 hover:text-olive-700 text-xl font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-h-80 overflow-y-auto p-1">
          {/* Option: No table */}
          <button
            type="button"
            onClick={() => setSelectedTableId(null)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedTableId === null
                ? "border-terra-500 bg-terra-50 text-terra-900 shadow-sm"
                : "border-olive-200 hover:border-olive-300 bg-olive-50/50 text-olive-700"
            }`}
          >
            <div className="text-xs uppercase tracking-wider font-semibold text-olive-400">
              Nessuno
            </div>
            <div className="text-sm font-bold mt-1">Nessun tavolo</div>
            <div className="text-xs text-olive-500 mt-1">Non assegnato</div>
          </button>

          {tables.map((table) => {
            const isOccupied = occupiedTableIds.has(table.id);
            const isTooSmall = table.seats < reservation.guests;
            const isSelected = selectedTableId === table.id;

            return (
              <button
                key={table.id}
                type="button"
                disabled={isOccupied}
                onClick={() => setSelectedTableId(table.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                  isSelected
                    ? "border-terra-500 bg-terra-50 text-terra-900 shadow-md ring-2 ring-terra-500/20"
                    : isOccupied
                    ? "border-red-200 bg-red-50/50 opacity-60 cursor-not-allowed text-red-900"
                    : isTooSmall
                    ? "border-amber-200 bg-amber-50/30 text-amber-900 hover:border-amber-400"
                    : "border-olive-200 hover:border-olive-400 bg-white text-olive-900"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-wider font-bold text-olive-500">
                    Tavolo {table.number}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-olive-100 text-olive-700">
                    {table.seats}p
                  </span>
                </div>

                <div className="mt-3 text-xs font-medium">
                  {isOccupied ? (
                    <span className="text-red-600 font-semibold">🔴 Occupato</span>
                  ) : isTooSmall ? (
                    <span className="text-amber-600">⚠️ Piccolo ({table.seats}p)</span>
                  ) : (
                    <span className="text-green-600 font-semibold">🟢 Disponibile</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-olive-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-olive-600 hover:bg-olive-50 transition-colors"
          >
            Annulla
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-olive-800 hover:bg-olive-900 text-cream-50 shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? "Salvataggio..." : "Conferma Assegnazione"}
          </button>
        </div>
      </div>
    </div>
  );
}
