"use client";

// Stub: RealtimeProvider is no longer needed since the dashboard was removed.
// Kept as a passthrough wrapper for backward compatibility.

import { ReactNode } from "react";
import type { Reservation } from "@/lib/types";

interface RealtimeProviderProps {
  initialReservations: Reservation[];
  children: ReactNode;
}

export default function RealtimeProvider({ children }: RealtimeProviderProps) {
  return <>{children}</>;
}
