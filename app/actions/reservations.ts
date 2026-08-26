"use server";

import { revalidatePath } from "next/cache";
import type {
  ReservationStatus,
  ReservationSource,
  QuickBookingFormState,
} from "@/lib/types";

async function getSupabase() {
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project");
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
) {
  try {
    if (!isSupabaseConfigured()) {
      console.log(`📋 Status aggiornato (mock) [${id}]: ${status}`);
      revalidatePath("/admin/inbox");
      return { success: true, error: null };
    }

    const supabase = await getSupabase();

    const isHandled = status === "completed" || status === "cancelled" || status === "confirmed" || status === "rejected";

    let { error } = await supabase
      .from("reservations")
      .update({
        status,
        handled: isHandled,
      })
      .eq("id", id);

    // Fallback if status column is missing
    if (error && error.message.includes("status")) {
      const retry = await supabase
        .from("reservations")
        .update({
          handled: isHandled,
        })
        .eq("id", id);
      error = retry.error;
    }

    if (error) {
      console.error("Update reservation status error:", error);
      return { success: false, error: "Errore nell'aggiornamento stato." };
    }

    revalidatePath("/admin/inbox");
    return { success: true, error: null };
  } catch (err) {
    console.error("updateReservationStatus error:", err);
    return { success: false, error: "Si è verificato un errore." };
  }
}

export async function createQuickBooking(
  prevState: QuickBookingFormState,
  formData: FormData
): Promise<QuickBookingFormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const service = (formData.get("service") as string) || "Appuntamento";
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const notes = (formData.get("notes") as string) || null;
  const source = (formData.get("source") as ReservationSource) || "phone";

  if (!name || name.trim().length < 2) {
    return { success: false, error: "Inserisci un nome valido.", message: null };
  }
  if (!phone || phone.trim().length < 5) {
    return { success: false, error: "Inserisci un telefono valido.", message: null };
  }
  if (!date || !time) {
    return { success: false, error: "Data e ora sono obbligatorie.", message: null };
  }

  try {
    if (!isSupabaseConfigured()) {
      console.log("⚡ Inserimento rapido (mock):", {
        name,
        phone,
        service,
        date,
        time,
        notes,
        source,
      });
      revalidatePath("/admin/inbox");
      return {
        success: true,
        error: null,
        message: `Appuntamento registrato con successo per ${name}!`,
      };
    }

    const supabase = await getSupabase();

    const { error } = await supabase.from("reservations").insert({
      name: name.trim(),
      phone: phone.trim(),
      service,
      date,
      time,
      notes: notes?.trim() || null,
      source,
      status: "pending",
      handled: false,
    });

    if (error) {
      console.error("Insert quick reservation error:", error);
      return { success: false, error: error.message, message: null };
    }

    revalidatePath("/admin/inbox");
    return {
      success: true,
      error: null,
      message: `Appuntamento registrato con successo per ${name}!`,
    };
  } catch (err) {
    console.error("createQuickBooking error:", err);
    return { success: false, error: "Si è verificato un errore imprevisto.", message: null };
  }
}

export async function markReservationHandled(id: string) {
  return updateReservationStatus(id, "completed");
}

export async function markReservationPending(id: string) {
  return updateReservationStatus(id, "pending");
}
