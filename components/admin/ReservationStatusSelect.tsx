"use client";

import { useState } from "react";
import type { ReservationStatus } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/types";
import { updateReservationStatus } from "@/app/actions/reservations";
import { useRealtime } from "./RealtimeProvider";

interface ReservationStatusSelectProps {
  reservationId: string;
  currentStatus: ReservationStatus;
  onStatusChange?: (newStatus: ReservationStatus) => void;
}

export default function ReservationStatusSelect({
  reservationId,
  currentStatus,
  onStatusChange,
}: ReservationStatusSelectProps) {
  const { updateReservationLocalStatus } = useRealtime();
  const [status, setStatus] = useState<ReservationStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as ReservationStatus;
    setStatus(newStatus);
    updateReservationLocalStatus(reservationId, newStatus);
    setLoading(true);

    try {
      await updateReservationStatus(reservationId, newStatus);
      if (onStatusChange) onStatusChange(newStatus);
    } catch (err) {
      console.error("Status update error:", err);
      setStatus(currentStatus);
      updateReservationLocalStatus(reservationId, currentStatus);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative inline-block">
      <select
        value={status}
        disabled={loading}
        onChange={handleChange}
        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer appearance-none pr-7 ${config.bgColor} ${config.color} ${config.borderColor} hover:opacity-90 disabled:opacity-50`}
      >
        <option value="pending">In attesa</option>
        <option value="inbox">In arrivo</option>
        <option value="direct_pending">In attesa risposta</option>
        <option value="confirmed">Confermata</option>
        <option value="rejected">Rifiutata</option>
        <option value="completed">Completata</option>
        <option value="cancelled">Annullata</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-60">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
