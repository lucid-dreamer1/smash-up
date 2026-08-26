import { redirect } from "next/navigation";
import type { Reservation } from "@/lib/types";
import InboxClient from "@/components/admin/InboxClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inbox Appuntamenti | Cappiello Hair & Beauty Admin",
  description: "Gestisci le richieste di appuntamento in arrivo per Cappiello Hair & Beauty.",
};

async function getInboxReservations(): Promise<Reservation[]> {
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

      // Fetch all reservations for the inbox portal
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Inbox fetch error:", error);
        return [];
      }

      return (data as Reservation[]) || [];
    } catch (err) {
      if (err instanceof Error && err.message === "NEXT_REDIRECT") {
        throw err;
      }
      console.error("Inbox page error:", err);
      return [];
    }
  }

  // Mock data for dev
  return [];
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

export default async function AdminInboxPage() {
  const reservations = await getInboxReservations();

  return <InboxClient reservations={reservations} onLogout={handleLogout} />;
}
