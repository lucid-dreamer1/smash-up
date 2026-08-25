import { redirect } from "next/navigation";
import { Reservation, Table } from "@/lib/types";
import { mockReservationsData, mockTables } from "@/lib/mock-data";
import RealtimeProvider from "@/components/admin/RealtimeProvider";
import DashboardClient from "@/components/admin/DashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard Gestione Sala | Smash Up Admin",
  description: "Gestione prenotazioni e tavoli in tempo reale.",
};

async function getDashboardData(): Promise<{
  reservations: Reservation[];
  tables: Table[];
}> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      // Check authentication
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/admin/login");
      }

      // Fetch reservations and tables from database
      const [resResult, tablesResult] = await Promise.all([
        supabase
          .from("reservations")
          .select("*")
          .order("date", { ascending: true })
          .order("time", { ascending: true }),
        supabase.from("tables").select("*").order("number", { ascending: true }),
      ]);

      const tables: Table[] = (tablesResult.data as Table[]) || [];
      const rawReservations = (resResult.data as Reservation[]) || [];

      const reservations = rawReservations.map((r) => ({
        ...r,
        table: tables.find((t) => t.id === r.table_id),
      }));

      return { reservations, tables };
    } catch (err) {
      if (err instanceof Error && err.message === "NEXT_REDIRECT") {
        throw err;
      }
      console.error("Dashboard fetch error:", err);
      return {
        reservations: mockReservationsData,
        tables: mockTables,
      };
    }
  }

  // Fallback
  return {
    reservations: mockReservationsData,
    tables: mockTables,
  };
}

async function handleLogout() {
  "use server";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

export default async function AdminDashboardPage() {
  const { reservations, tables } = await getDashboardData();

  return (
    <RealtimeProvider initialReservations={reservations} initialTables={tables}>
      <DashboardClient onLogout={handleLogout} />
    </RealtimeProvider>
  );
}
