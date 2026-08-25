"use server";

import { revalidatePath } from "next/cache";
import type {
  ReservationStatus,
  ReservationSource,
  QuickBookingFormState,
} from "@/lib/types";
import { mockTables } from "@/lib/mock-data";

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
      revalidatePath("/admin/dashboard");
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

    revalidatePath("/admin/dashboard");
    return { success: true, error: null };
  } catch (err) {
    console.error("updateReservationStatus error:", err);
    return { success: false, error: "Si è verificato un errore." };
  }
}

export async function assignTable(
  reservationId: string,
  tableId: string | null
) {
  try {
    if (!isSupabaseConfigured()) {
      console.log(`📋 Tavolo assegnato (mock): Prenotazione ${reservationId} -> Tavolo ${tableId}`);
      revalidatePath("/admin/dashboard");
      return { success: true, error: null };
    }

    const supabase = await getSupabase();

    if (tableId) {
      // Ensure table exists in Supabase
      const { data: tableCheck } = await supabase
        .from("tables")
        .select("id")
        .eq("id", tableId)
        .maybeSingle();

      if (!tableCheck) {
        const mockMatch = mockTables.find((t) => t.id === tableId);
        if (mockMatch) {
          await supabase.from("tables").insert({
            id: mockMatch.id,
            number: mockMatch.number,
            seats: mockMatch.seats,
            zone: mockMatch.zone,
            active: mockMatch.active,
          });
        }
      }
    }

    let { error } = await supabase
      .from("reservations")
      .update({
        table_id: tableId,
      })
      .eq("id", reservationId);

    if (error) {
      console.error("Assign table error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/dashboard");
    return { success: true, error: null };
  } catch (err) {
    console.error("assignTable error:", err);
    return { success: false, error: "Si è verificato un errore." };
  }
}

export async function createQuickBooking(
  prevState: QuickBookingFormState,
  formData: FormData
): Promise<QuickBookingFormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const guests = parseInt(formData.get("guests") as string);
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const notes = (formData.get("notes") as string) || null;
  const source = (formData.get("source") as ReservationSource) || "phone";
  const rawTableId = formData.get("table_id") as string;
  const tableId = rawTableId && rawTableId !== "" ? rawTableId : null;

  if (!name || name.trim().length < 2) {
    return { success: false, error: "Inserisci un nome valido.", message: null };
  }
  if (!phone || phone.trim().length < 5) {
    return { success: false, error: "Inserisci un telefono valido.", message: null };
  }
  if (!guests || guests < 1) {
    return { success: false, error: "Numero persone non valido.", message: null };
  }
  if (!date || !time) {
    return { success: false, error: "Data e ora sono obbligatorie.", message: null };
  }

  try {
    if (!isSupabaseConfigured()) {
      console.log("⚡ Inserimento rapido (mock):", {
        name,
        phone,
        guests,
        date,
        time,
        notes,
        source,
        tableId,
      });
      revalidatePath("/admin/dashboard");
      return {
        success: true,
        error: null,
        message: `Prenotazione registrata con successo per ${name}!`,
      };
    }

    const supabase = await getSupabase();

    let finalTableId = tableId;
    if (finalTableId) {
      // Check if table exists in DB by ID
      const { data: tableCheck } = await supabase
        .from("tables")
        .select("id")
        .eq("id", finalTableId)
        .maybeSingle();

      if (!tableCheck) {
        // If not in Supabase yet, insert it from mock data so foreign key succeeds!
        const mockMatch = mockTables.find((t) => t.id === finalTableId);
        if (mockMatch) {
          const { error: seedErr } = await supabase.from("tables").insert({
            id: mockMatch.id,
            number: mockMatch.number,
            seats: mockMatch.seats,
            zone: mockMatch.zone,
            active: mockMatch.active,
          });
          if (seedErr) {
            console.error("Auto-insert table for booking error:", seedErr);
          }
        }
      }
    }

    // Insert reservation
    let insertResult = await supabase.from("reservations").insert({
      name: name.trim(),
      phone: phone.trim(),
      guests,
      date,
      time,
      notes: notes?.trim() || null,
      source,
      status: "pending",
      handled: false,
      table_id: finalTableId,
    });

    // Fallback if foreign key still complains
    if (insertResult.error && (insertResult.error.code === "23503" || insertResult.error.code === "22P02")) {
      insertResult = await supabase.from("reservations").insert({
        name: name.trim(),
        phone: phone.trim(),
        guests,
        date,
        time,
        notes: notes?.trim() || null,
        source,
        status: "pending",
        handled: false,
        table_id: null,
      });
    }

    if (insertResult.error) {
      console.error("Insert quick reservation error:", insertResult.error);
      return { success: false, error: insertResult.error.message, message: null };
    }

    revalidatePath("/admin/dashboard");
    return {
      success: true,
      error: null,
      message: `Prenotazione registrata con successo per ${name}!`,
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
