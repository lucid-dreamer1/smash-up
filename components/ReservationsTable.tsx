"use client";

import { useState } from "react";
import type { Reservation, Table } from "@/lib/types";
import { SOURCE_CONFIG } from "@/lib/types";
import ReservationStatusSelect from "./admin/ReservationStatusSelect";
import TableAssignModal from "./admin/TableAssignModal";
import { useRealtime } from "./admin/RealtimeProvider";

interface ReservationsTableProps {
  reservations: Reservation[];
  tables?: Table[];
}

export default function ReservationsTable({
  reservations,
  tables = [],
}: ReservationsTableProps) {
  const { updateReservationTable } = useRealtime();
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [assigningReservation, setAssigningReservation] = useState<Reservation | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // Filtering
  const filtered = reservations.filter((r) => {
    // Hide completed / cancelled if toggle is ON
    if (hideCompleted && (r.status === "completed" || r.status === "cancelled" || r.status === "confirmed" || r.status === "rejected")) {
      return false;
    }

    if (selectedDateFilter === "today" && r.date !== todayStr) return false;
    if (selectedDateFilter === "tomorrow" && r.date !== tomorrowStr) return false;
    if (
      selectedDateFilter !== "all" &&
      selectedDateFilter !== "today" &&
      selectedDateFilter !== "tomorrow" &&
      r.date !== selectedDateFilter
    ) {
      return false;
    }

    if (selectedStatusFilter !== "all" && r.status !== selectedStatusFilter) {
      return false;
    }

    return true;
  });

  const sortedReservations = [...filtered].sort((a, b) => {
    // Active/actionable statuses first
    const activeStatuses = ["pending", "inbox", "direct_pending"];
    const aActive = activeStatuses.includes(a.status);
    const bActive = activeStatuses.includes(b.status);
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;

    if (a.status === "confirmed" && (b.status === "completed" || b.status === "cancelled" || b.status === "rejected")) return -1;
    if ((a.status === "completed" || a.status === "cancelled" || a.status === "rejected") && b.status === "confirmed") return 1;

    const dateComp = a.date.localeCompare(b.date);
    if (dateComp !== 0) return dateComp;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-olive-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Date Filter Buttons */}
        <div className="flex bg-olive-50 p-1 rounded-xl border border-olive-200 gap-1 flex-wrap">
          <button
            onClick={() => setSelectedDateFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedDateFilter === "all"
                ? "bg-white text-olive-900 shadow-sm"
                : "text-olive-500 hover:text-olive-900"
            }`}
          >
            Tutte ({reservations.length})
          </button>
          <button
            onClick={() => setSelectedDateFilter("today")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedDateFilter === "today"
                ? "bg-white text-terra-900 shadow-sm"
                : "text-olive-500 hover:text-olive-900"
            }`}
          >
            Oggi ({reservations.filter((r) => r.date === todayStr).length})
          </button>
          <button
            onClick={() => setSelectedDateFilter("tomorrow")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedDateFilter === "tomorrow"
                ? "bg-white text-olive-900 shadow-sm"
                : "text-olive-500 hover:text-olive-900"
            }`}
          >
            Domani ({reservations.filter((r) => r.date === tomorrowStr).length})
          </button>
        </div>

        {/* Right side: Hide completed toggle + Status Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Toggle: Hide Completed / Cancelled */}
          <button
            onClick={() => setHideCompleted(!hideCompleted)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              hideCompleted
                ? "bg-amber-100 text-amber-900 border-amber-300 shadow-sm"
                : "bg-olive-50 text-olive-600 border-olive-200 hover:bg-olive-100"
            }`}
          >
            {hideCompleted ? "Concluse Nascoste" : "Nascondi Concluse"}
          </button>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-olive-50 border border-olive-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-olive-900"
            >
              <option value="all">Tutti gli stati</option>
              <option value="pending">In attesa</option>
              <option value="inbox">In arrivo</option>
              <option value="direct_pending">In attesa risposta</option>
              <option value="confirmed">Confermate</option>
              <option value="rejected">Rifiutate</option>
              <option value="completed">Completate</option>
              <option value="cancelled">Annullate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      {sortedReservations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-olive-100 p-12 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-olive-700 mb-1">
            Nessuna prenotazione trovata
          </h3>
          <p className="text-olive-400 text-xs">
            {reservations.length === 0
              ? "Nessuna prenotazione presente nel registro."
              : "Nessuna prenotazione corrisponde ai filtri selezionati."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-olive-100 shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-olive-50 border-b border-olive-100 text-xs font-bold text-olive-600 uppercase tracking-wider">
                  <th className="text-left px-6 py-4">Cliente & Origine</th>
                  <th className="text-left px-6 py-4">Ospiti</th>
                  <th className="text-left px-6 py-4">Data & Ora</th>
                  <th className="text-left px-6 py-4">Telefono</th>
                  <th className="text-left px-6 py-4">Tavolo Assegnato</th>
                  <th className="text-left px-6 py-4">Note</th>
                  <th className="text-right px-6 py-4">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive-50 text-sm">
                {sortedReservations.map((res) => {
                  const source = SOURCE_CONFIG[res.source] || SOURCE_CONFIG.website;
                  const assignedTable =
                    res.table || tables.find((t) => t.id === res.table_id);
                  const isCompleted = res.status === "completed" || res.status === "confirmed";
                  const isCancelled = res.status === "cancelled" || res.status === "rejected";

                  return (
                    <tr
                      key={res.id}
                      className={`transition-colors ${
                        isCompleted
                          ? "bg-green-50/30 text-olive-800"
                          : isCancelled
                          ? "bg-gray-50/60 opacity-50"
                          : "hover:bg-cream-50/70"
                      }`}
                    >
                      {/* Name & Origin */}
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-olive-900 flex items-center gap-2">
                            {res.name}
                            {res.status === "completed" && (
                              <span className="text-[10px] bg-green-200 text-green-900 font-bold px-2 py-0.5 rounded-full">
                                Servita
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-olive-400 font-medium">
                            {source.label}
                          </span>
                        </div>
                      </td>

                      {/* Guests */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center font-semibold text-olive-800 bg-olive-50 px-2.5 py-1 rounded-lg border border-olive-200/60 text-xs">
                          {res.guests} {res.guests === 1 ? "persona" : "persone"}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-olive-900 font-mono text-sm">
                          {res.time}
                        </div>
                        <div className="text-xs text-olive-500">
                          {new Date(res.date).toLocaleDateString("it-IT", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4">
                        <a
                          href={`tel:${res.phone}`}
                          className="text-terra-600 hover:text-terra-700 hover:underline font-mono text-xs font-semibold"
                        >
                          {res.phone}
                        </a>
                      </td>

                      {/* Table Column */}
                      <td className="px-6 py-4">
                        {isCompleted ? (
                          assignedTable ? (
                            <span className="text-xs font-semibold text-olive-700 bg-olive-100/70 px-2.5 py-1 rounded-lg">
                              Tavolo {assignedTable.number}
                            </span>
                          ) : (
                            <span className="text-xs text-olive-400 italic">—</span>
                          )
                        ) : assignedTable ? (
                          <button
                            onClick={() => setAssigningReservation(res)}
                            className="bg-olive-100 hover:bg-olive-200 text-olive-900 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                          >
                            Tavolo {assignedTable.number} ({assignedTable.seats}p)
                          </button>
                        ) : (
                          <button
                            onClick={() => setAssigningReservation(res)}
                            className="border border-dashed border-terra-500 text-terra-600 hover:bg-terra-50 px-3 py-1 rounded-xl text-xs font-bold transition-all"
                          >
                            + Assegna Tavolo
                          </button>
                        )}
                      </td>

                      {/* Notes */}
                      <td className="px-6 py-4 text-xs text-olive-500 max-w-[180px] truncate">
                        {res.notes ? (
                          <span className="italic bg-olive-50/80 px-2 py-1 rounded-md">
                            &quot;{res.notes}&quot;
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Status Selector */}
                      <td className="px-6 py-4 text-right">
                        <ReservationStatusSelect
                          reservationId={res.id}
                          currentStatus={res.status}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden divide-y divide-olive-100">
            {sortedReservations.map((res) => {
              const assignedTable =
                res.table || tables.find((t) => t.id === res.table_id);
              const isCompleted = res.status === "completed" || res.status === "confirmed";

              return (
                <div
                  key={res.id}
                  className={`p-5 space-y-3 ${
                    isCompleted ? "bg-green-50/30" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-olive-900 flex items-center gap-2">
                        {res.name}
                        {res.status === "completed" && (
                          <span className="text-[10px] bg-green-200 text-green-900 font-bold px-2 py-0.5 rounded-full">
                            Servita
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-olive-500 mt-0.5">
                        {res.guests} persone · {res.time} (
                        {new Date(res.date).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "short",
                        })}
                        )
                      </div>
                    </div>

                    <ReservationStatusSelect
                      reservationId={res.id}
                      currentStatus={res.status}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <a
                      href={`tel:${res.phone}`}
                      className="text-terra-600 font-mono font-semibold"
                    >
                      {res.phone}
                    </a>

                    {!isCompleted &&
                      (assignedTable ? (
                        <button
                          onClick={() => setAssigningReservation(res)}
                          className="bg-olive-100 px-2.5 py-1 rounded-lg text-olive-900 font-bold"
                        >
                          Tavolo {assignedTable.number} ({assignedTable.seats}p)
                        </button>
                      ) : (
                        <button
                          onClick={() => setAssigningReservation(res)}
                          className="text-terra-600 border border-dashed border-terra-300 px-2 py-0.5 rounded-lg font-bold"
                        >
                          + Tavolo
                        </button>
                      ))}
                  </div>

                  {res.notes && (
                    <p className="text-xs text-olive-600 italic bg-olive-50 p-2 rounded-xl">
                      &quot;{res.notes}&quot;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table Assign Modal */}
      {assigningReservation && (
        <TableAssignModal
          reservation={assigningReservation}
          tables={tables}
          allReservations={reservations}
          onClose={() => setAssigningReservation(null)}
          onAssigned={(tableId) => {
            updateReservationTable(assigningReservation.id, tableId);
          }}
        />
      )}
    </div>
  );
}
