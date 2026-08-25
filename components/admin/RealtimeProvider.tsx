"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { Reservation, Table, ReservationStatus } from "@/lib/types";
import { mockTables } from "@/lib/mock-data";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface RealtimeState {
  reservations: Reservation[];
  tables: Table[];
  isConnected: boolean;
  lastUpdate: Date | null;
  refreshAll: () => Promise<void>;
  updateReservationTable: (reservationId: string, tableId: string | null) => void;
  updateReservationLocalStatus: (reservationId: string, status: ReservationStatus) => void;
  addTableLocal: (table: Table) => void;
  updateTableLocal: (table: Table) => void;
  removeTableLocal: (tableId: string) => void;
}

const RealtimeContext = createContext<RealtimeState>({
  reservations: [],
  tables: [],
  isConnected: false,
  lastUpdate: null,
  refreshAll: async () => {},
  updateReservationTable: () => {},
  updateReservationLocalStatus: () => {},
  addTableLocal: () => {},
  updateTableLocal: () => {},
  removeTableLocal: () => {},
});

export function useRealtime() {
  return useContext(RealtimeContext);
}

interface RealtimeProviderProps {
  children: ReactNode;
  initialReservations: Reservation[];
  initialTables: Table[];
}

export default function RealtimeProvider({
  children,
  initialReservations,
  initialTables,
}: RealtimeProviderProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const updateReservationTable = useCallback((reservationId: string, tableId: string | null) => {
    setReservations((prev) =>
      prev.map((r) => {
        if (r.id === reservationId) {
          const matchedTable = tableId ? tables.find((t) => t.id === tableId) : undefined;
          return {
            ...r,
            table_id: tableId,
            table: matchedTable,
          };
        }
        return r;
      })
    );
  }, [tables]);

  const updateReservationLocalStatus = useCallback((reservationId: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => {
        if (r.id === reservationId) {
          return {
            ...r,
            status,
            handled: status === "completed" || status === "cancelled",
          };
        }
        return r;
      })
    );
  }, []);

  const addTableLocal = useCallback((newTable: Table) => {
    setTables((prev) => {
      const exists = prev.some((t) => t.id === newTable.id || t.number === newTable.number);
      if (exists) {
        return prev.map((t) => (t.id === newTable.id || t.number === newTable.number ? newTable : t));
      }
      return [...prev, newTable];
    });
  }, []);

  const updateTableLocal = useCallback((updatedTable: Table) => {
    setTables((prev) =>
      prev.map((t) => (t.id === updatedTable.id ? updatedTable : t))
    );
  }, []);

  const removeTableLocal = useCallback((tableId: string) => {
    setTables((prev) => prev.filter((t) => t.id !== tableId));
    // Also unassign from reservations
    setReservations((prev) =>
      prev.map((r) => (r.table_id === tableId ? { ...r, table_id: null, table: undefined } : r))
    );
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const supabase = createClient();

      const [resResult, tablesResult] = await Promise.all([
        supabase
          .from("reservations")
          .select("*")
          .order("date", { ascending: true })
          .order("time", { ascending: true }),
        supabase
          .from("tables")
          .select("*")
          .order("number", { ascending: true }),
      ]);

      const fetchedTables = (tablesResult.data as Table[]) || tables;

      if (tablesResult.data) setTables(fetchedTables);

      if (resResult.data) {
        const enrichedReservations = (resResult.data as Reservation[]).map((r) => ({
          ...r,
          status: (r.status as ReservationStatus) || (r.handled ? "completed" : "pending"),
          table:
            fetchedTables.find((t) => t.id === r.table_id) ||
            mockTables.find((t) => t.id === r.table_id),
        }));
        setReservations(enrichedReservations);
      }

      setLastUpdate(new Date());
    } catch (err) {
      console.error("Realtime fetchAll error:", err);
    }
  }, [tables]);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes("your-project")) return;

    const supabase = createClient();

    const channel = supabase
      .channel("admin-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        () => {
          fetchAll();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tables" },
        () => {
          fetchAll();
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [fetchAll]);

  useEffect(() => {
    setReservations(initialReservations);
  }, [initialReservations]);

  useEffect(() => {
    setTables(initialTables);
  }, [initialTables]);

  return (
    <RealtimeContext.Provider
      value={{
        reservations,
        tables,
        isConnected,
        lastUpdate,
        refreshAll: fetchAll,
        updateReservationTable,
        updateReservationLocalStatus,
        addTableLocal,
        updateTableLocal,
        removeTableLocal,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
}
