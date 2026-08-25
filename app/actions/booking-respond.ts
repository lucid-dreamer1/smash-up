"use server";

import { revalidatePath } from "next/cache";
import {
  sendCustomerConfirmation,
  sendCustomerRejection,
} from "@/lib/email";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project");
}

/**
 * Respond to an inbox booking (Flow 1) — called from the admin Inbox portal.
 * Accepts or rejects the booking and sends an email to the customer.
 */
export async function respondToInboxBooking(
  reservationId: string,
  action: "confirm" | "reject"
) {
  try {
    if (!isSupabaseConfigured()) {
      console.log(`📬 [MOCK] Inbox risposta: ${reservationId} -> ${action}`);
      revalidatePath("/admin/inbox");
      revalidatePath("/admin/dashboard");
      return { success: true, error: null };
    }

    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    // Fetch reservation
    const { data: reservation, error: fetchErr } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", reservationId)
      .single();

    if (fetchErr || !reservation) {
      return { success: false, error: "Prenotazione non trovata." };
    }

    // Update status
    const newStatus = action === "confirm" ? "confirmed" : "rejected";
    const { error: updateErr } = await supabase
      .from("reservations")
      .update({
        status: newStatus,
        handled: true,
        responded_at: new Date().toISOString(),
      })
      .eq("id", reservationId);

    if (updateErr) {
      console.error("Update inbox status error:", updateErr);
      return { success: false, error: "Errore nell'aggiornamento." };
    }

    // Send email to customer
    if (reservation.email) {
      const emailData = {
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone,
        guests: reservation.guests,
        date: reservation.date,
        time: reservation.time,
        notes: reservation.notes,
      };

      if (action === "confirm") {
        await sendCustomerConfirmation(emailData);
      } else {
        await sendCustomerRejection(emailData);
      }
    }

    revalidatePath("/admin/inbox");
    revalidatePath("/admin/dashboard");
    return { success: true, error: null };
  } catch (err) {
    console.error("respondToInboxBooking error:", err);
    return { success: false, error: "Si è verificato un errore." };
  }
}
