"use client";

import { useState, useRef, useEffect } from "react";
import type { Table, Reservation } from "@/lib/types";
import {
  createTable,
  updateTable,
  updateTablePosition,
  deleteTable,
} from "@/app/actions/tables";
import { updateReservationStatus } from "@/app/actions/reservations";
import { useRealtime } from "./RealtimeProvider";

interface TableMapProps {
  tables: Table[];
  reservations: Reservation[];
  onOpenQuickBookingForTable?: (tableId: string) => void;
}

function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
}

export default function TableMap({
  tables,
  reservations,
  onOpenQuickBookingForTable,
}: TableMapProps) {
  const { refreshAll, addTableLocal, updateTableLocal, removeTableLocal } = useRealtime();

  // Mode: "view" (live floor plan with reservations) or "edit" (drag & drop to move, add, delete)
  const [mode, setMode] = useState<"view" | "edit">("view");

  // Date and Time filter for view mode
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedTime, setSelectedTime] = useState("20:30");

  // Interactive states
  const [activeReservationModal, setActiveReservationModal] = useState<Reservation | null>(null);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for Add Table
  const nextNum = tables.length > 0 ? Math.max(...tables.map((t) => t.number)) + 1 : 1;
  const [newNumber, setNewNumber] = useState(nextNum);
  const [newSeats, setNewSeats] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local table positions during dragging
  const [localTables, setLocalTables] = useState<Table[]>(tables);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalTables(tables);
    const calculatedNext = tables.length > 0 ? Math.max(...tables.map((t) => t.number)) + 1 : 1;
    setNewNumber(calculatedNext);
  }, [tables]);

  // Calculate occupied tables in view mode
  const reqMinutes = timeToMinutes(selectedTime);
  const dayReservations = reservations.filter((r) => r.date === selectedDate && r.status === "pending");

  const tableStatusMap = new Map<string, { status: "free" | "occupied"; reservation?: Reservation }>();

  localTables.forEach((t) => {
    const res = dayReservations.find((r) => {
      if (r.table_id !== t.id) return false;
      const resMinutes = timeToMinutes(r.time);
      return Math.abs(reqMinutes - resMinutes) < 120;
    });

    if (res) {
      tableStatusMap.set(t.id, { status: "occupied", reservation: res });
    } else {
      tableStatusMap.set(t.id, { status: "free" });
    }
  });

  // Drag handlers for visual floor plan
  function handleMouseDown(tableId: string) {
    if (mode === "edit") {
      setDraggingId(tableId);
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!draggingId || mode !== "edit" || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(8, Math.min(88, ((e.clientY - rect.top) / rect.height) * 100));

    setLocalTables((prev) =>
      prev.map((t) => (t.id === draggingId ? { ...t, position_x: Math.round(x), position_y: Math.round(y) } : t))
    );
  }

  async function handleMouseUp() {
    if (draggingId && mode === "edit") {
      const dragged = localTables.find((t) => t.id === draggingId);
      if (dragged && dragged.position_x !== undefined && dragged.position_y !== undefined) {
        updateTableLocal(dragged);
        await updateTablePosition(dragged.id, dragged.position_x, dragged.position_y);
      }
      setDraggingId(null);
    }
  }

  // Create Table
  async function handleCreateTable(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    const posX = Math.floor(Math.random() * 50) + 25;
    const posY = Math.floor(Math.random() * 50) + 25;

    const optimisticTable: Table = {
      id: crypto.randomUUID(),
      number: newNumber,
      seats: newSeats,
      zone: "sala",
      active: true,
      position_x: posX,
      position_y: posY,
    };

    addTableLocal(optimisticTable);
    setLocalTables((prev) => [...prev, optimisticTable]);
    setShowAddModal(false);

    try {
      const res = await createTable({
        number: newNumber,
        seats: newSeats,
        zone: "sala",
        position_x: posX,
        position_y: posY,
      });

      if (res.success && res.table) {
        addTableLocal(res.table);
      }
    } catch (err) {
      console.error("Create table error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Edit Table
  async function handleUpdateTable(e: React.FormEvent) {
    e.preventDefault();
    if (!editingTable) return;
    setIsSubmitting(true);

    const updated = { ...editingTable };
    updateTableLocal(updated);
    setLocalTables((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setEditingTable(null);

    try {
      await updateTable(updated.id, {
        number: updated.number,
        seats: updated.seats,
        zone: "sala",
      });
    } catch (err) {
      console.error("Update table error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Delete Table
  async function handleDeleteTable(id: string) {
    if (!confirm("Sei sicuro di voler eliminare questo tavolo?")) return;
    removeTableLocal(id);
    setLocalTables((prev) => prev.filter((t) => t.id !== id));
    setEditingTable(null);

    try {
      await deleteTable(id);
    } catch (err) {
      console.error("Delete table error:", err);
    }
  }

  return (
    <div className="space-y-5">
      {/* Control Bar: Mode Toggle + Time Filter + Add Table Button */}
      <div className="bg-white rounded-3xl p-5 border border-olive-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Left: Mode Switch + Live View Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switch Button */}
          <div className="flex bg-olive-50 p-1 rounded-2xl border border-olive-200">
            <button
              onClick={() => setMode("view")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === "view"
                  ? "bg-white text-olive-900 shadow-sm"
                  : "text-olive-500 hover:text-olive-900"
              }`}
            >
              <span>👁️</span> Vista Sala
            </button>
            <button
              onClick={() => setMode("edit")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === "edit"
                  ? "bg-terra-500 text-white shadow-sm"
                  : "text-olive-500 hover:text-olive-900"
              }`}
            >
              <span>🖐️</span> Sposta & Modifica
            </button>
          </div>

          {mode === "view" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-olive-50 border border-olive-200 rounded-xl px-3 py-1.5 text-xs font-bold text-olive-900"
              />
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="bg-olive-50 border border-olive-200 rounded-xl px-3 py-1.5 text-xs font-bold text-olive-900"
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
          )}
        </div>

        {/* Right: Table count + Add Table Button */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-olive-500 bg-olive-50 px-3 py-2 rounded-xl border border-olive-200">
            🪑 {localTables.length} {localTables.length === 1 ? "Tavolo" : "Tavoli"}
          </span>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-olive-800 hover:bg-olive-900 text-cream-50 font-bold px-4 py-2 rounded-2xl text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>+</span> Aggiungi Tavolo
          </button>
        </div>
      </div>

      {/* Interactive Floor Plan Canvas */}
      <div
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative w-full h-[540px] bg-white rounded-3xl border-2 overflow-hidden select-none transition-all shadow-inner ${
          mode === "edit"
            ? "border-dashed border-terra-400 bg-amber-50/20 cursor-crosshair"
            : "border-olive-100 bg-cream-50/30"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(140, 120, 80, 0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* Unified Sala Header */}
        <div className="absolute top-4 left-6 text-xs font-extrabold uppercase tracking-widest text-olive-400/80 pointer-events-none">
          🏛️ Sala Locale
        </div>

        {/* Edit mode hint banner */}
        {mode === "edit" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-terra-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md z-10 animate-bounce">
            🖐️ Trascina i tavoli per posizionarli · Clicca su un tavolo per modificarlo
          </div>
        )}

        {/* Empty state when 0 tables */}
        {localTables.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
            <span className="text-5xl block mb-3">🪑</span>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-olive-800 mb-1">
              Nessun tavolo configurato
            </h3>
            <p className="text-xs text-olive-500 max-w-sm mb-4">
              La sala è vuota. Clicca su &quot;+ Aggiungi Tavolo&quot; per creare e posizionare i tuoi tavoli!
            </p>
          </div>
        )}

        {/* Render Tables on Floor Plan */}
        {localTables.map((t) => {
          const info = tableStatusMap.get(t.id);
          const isOccupied = info?.status === "occupied";
          const res = info?.reservation;

          const posX = t.position_x ?? 50;
          const posY = t.position_y ?? 50;

          const isRound = t.seats <= 2;
          const isLarge = t.seats >= 6;

          let tableColor = "bg-green-50 border-green-500 text-green-950 hover:border-green-600";
          if (mode === "view") {
            if (isOccupied) {
              tableColor = "bg-red-50 border-red-500 text-red-950 hover:border-red-600 shadow-md";
            }
          } else {
            tableColor = "bg-white border-terra-500 text-olive-900 hover:scale-105 shadow-md";
          }

          return (
            <div
              key={t.id}
              onMouseDown={() => handleMouseDown(t.id)}
              onClick={() => {
                if (mode === "edit") {
                  setEditingTable(t);
                } else if (res) {
                  setActiveReservationModal(res);
                } else if (onOpenQuickBookingForTable) {
                  onOpenQuickBookingForTable(t.id);
                }
              }}
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute cursor-pointer border-2 transition-transform duration-75 flex flex-col items-center justify-center p-2 text-center ${
                isRound
                  ? "w-20 h-20 rounded-full"
                  : isLarge
                  ? "w-28 h-20 rounded-2xl"
                  : "w-24 h-20 rounded-2xl"
              } ${tableColor}`}
            >
              <div className="font-[family-name:var(--font-display)] font-extrabold text-base leading-none">
                T{t.number}
              </div>
              <div className="text-[10px] font-bold opacity-75 mt-0.5">
                👥 {t.seats}p
              </div>

              {mode === "view" && (
                <div className="mt-1">
                  {isOccupied ? (
                    <span className="text-[9px] font-black uppercase tracking-wider text-red-700 bg-red-100 px-1.5 py-0.5 rounded-full block truncate max-w-[70px]">
                      {res?.name.split(" ")[0]}
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">
                      Libero
                    </span>
                  )}
                </div>
              )}

              {mode === "edit" && (
                <span className="text-[9px] text-terra-600 font-semibold mt-0.5">
                  ✏️ Modifica
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Reservation Details Modal (when clicked in view mode) */}
      {activeReservationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-olive-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-terra-600">
                  Tavolo Occupato
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900 mt-1">
                  {activeReservationModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveReservationModal(null)}
                className="text-olive-400 hover:text-olive-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 py-3 border-y border-olive-100 text-xs">
              <div className="flex justify-between">
                <span className="text-olive-500">Ospiti:</span>
                <span className="font-bold text-olive-900">{activeReservationModal.guests} persone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-olive-500">Orario:</span>
                <span className="font-bold text-olive-900">{activeReservationModal.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-olive-500">Telefono:</span>
                <a href={`tel:${activeReservationModal.phone}`} className="font-bold text-terra-600">
                  {activeReservationModal.phone}
                </a>
              </div>
              {activeReservationModal.notes && (
                <div className="pt-2">
                  <span className="text-olive-500 block mb-1">Note:</span>
                  <p className="bg-olive-50 p-2 rounded-lg italic text-olive-700">
                    &quot;{activeReservationModal.notes}&quot;
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={async () => {
                  await updateReservationStatus(activeReservationModal.id, "completed");
                  setActiveReservationModal(null);
                  await refreshAll();
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>✔️</span> Segna come Completata (Libera Tavolo)
              </button>
              <button
                type="button"
                onClick={async () => {
                  await updateReservationStatus(activeReservationModal.id, "cancelled");
                  setActiveReservationModal(null);
                  await refreshAll();
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded-xl text-xs transition-colors"
              >
                ✕ Annulla Prenotazione
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Table Modal (Unified Sala - No Zone Picker) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleCreateTable}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-olive-100 space-y-5"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900">
                + Aggiungi Nuovo Tavolo
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-olive-400 hover:text-olive-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-1.5">
                Numero Tavolo
              </label>
              <input
                type="number"
                min={1}
                required
                value={newNumber}
                onChange={(e) => setNewNumber(parseInt(e.target.value) || 1)}
                className="w-full bg-olive-50 border border-olive-200 rounded-xl px-4 py-2.5 text-olive-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-1.5">
                Posti a Sedere
              </label>
              <div className="flex gap-2">
                {[2, 4, 6, 8, 10].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setNewSeats(s)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      newSeats === s
                        ? "bg-terra-500 text-white border-terra-600 shadow-sm"
                        : "bg-olive-50 text-olive-800 border-olive-200"
                    }`}
                  >
                    {s}p
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-olive-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-olive-600 hover:bg-olive-50"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-terra-500 hover:bg-terra-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Creazione..." : "Crea Tavolo"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Table Modal (Unified Sala - No Zone Picker) */}
      {editingTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <form
            onSubmit={handleUpdateTable}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-olive-100 space-y-5"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900">
                Modifica Tavolo {editingTable.number}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTable(null)}
                className="text-olive-400 hover:text-olive-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-1.5">
                Numero Tavolo
              </label>
              <input
                type="number"
                min={1}
                required
                value={editingTable.number}
                onChange={(e) =>
                  setEditingTable({
                    ...editingTable,
                    number: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full bg-olive-50 border border-olive-200 rounded-xl px-4 py-2.5 text-olive-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-olive-700 mb-1.5">
                Posti a Sedere
              </label>
              <div className="flex gap-2">
                {[2, 4, 6, 8, 10].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setEditingTable({ ...editingTable, seats: s })}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      editingTable.seats === s
                        ? "bg-terra-500 text-white border-terra-600 shadow-sm"
                        : "bg-olive-50 text-olive-800 border-olive-200"
                    }`}
                  >
                    {s}p
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-olive-100">
              <button
                type="button"
                onClick={() => handleDeleteTable(editingTable.id)}
                className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors"
              >
                🗑️ Elimina Tavolo
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTable(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-olive-600 hover:bg-olive-50"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-olive-800 hover:bg-olive-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all disabled:opacity-50"
                >
                  Salva Modifiche
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
