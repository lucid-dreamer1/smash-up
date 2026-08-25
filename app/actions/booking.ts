"use server";

import { BookingFormState } from "@/lib/types";
import { sendOwnerBookingNotification } from "@/lib/email";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project");
}

export async function submitBooking(
  prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const guests = parseInt(formData.get("guests") as string);
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const phone = formData.get("phone") as string;
  const notes = (formData.get("notes") as string) || null;

  // Validation
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Inserisci un nome valido.", message: null };
  }
  if (!email || !email.includes("@")) {
    return { success: false, error: "Inserisci un'email valida per ricevere la risposta.", message: null };
  }
  if (!guests || guests < 1 || guests > 12) {
    return { success: false, error: "Numero di persone non valido (max 12).", message: null };
  }
  if (!date) {
    return { success: false, error: "Seleziona una data.", message: null };
  }
  if (!time) {
    return { success: false, error: "Seleziona un orario.", message: null };
  }
  if (!phone || phone.trim().length < 6) {
    return { success: false, error: "Inserisci un numero di telefono valido.", message: null };
  }

  // Check if date is not in the past
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    return { success: false, error: "Non puoi prenotare per una data passata.", message: null };
  }

  // Generate response token for 1-click email actions
  const responseToken = crypto.randomUUID();

  try {
    if (isSupabaseConfigured()) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      // Insert reservation with status 'inbox' and response token
      const { error: insertErr } = await supabase.from("reservations").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        guests,
        date,
        time,
        phone: phone.trim(),
        notes: notes?.trim() || null,
        handled: false,
        status: "inbox",
        source: "website",
        booking_flow: "inbox",
        table_id: null,
        response_token: responseToken,
      });

      if (insertErr) {
        console.error("Supabase insert error:", insertErr);
        return {
          success: false,
          error: "Errore nel salvataggio. Riprova o chiamaci direttamente al +39 0823 456 789.",
          message: null,
        };
      }
    } else {
      console.log("📋 Prenotazione (mock):", { name, email, guests, date, time, phone, notes, responseToken });
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Send unified email notification with 3 action buttons to owner
    const bookingData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      guests,
      date,
      time,
      notes: notes?.trim() || null,
    };
    await sendOwnerBookingNotification(bookingData, responseToken);

    return {
      success: true,
      error: null,
      message: `Grazie ${name.trim().split(" ")[0]}! La tua richiesta per ${guests} persone il ${new Date(date).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })} alle ${time} è stata inviata. Riceverai conferma via email a ${email.trim()} non appena avremo verificato la disponibilità.`,
    };
  } catch (err) {
    console.error("Booking error:", err);
    return {
      success: false,
      error: "Si è verificato un errore. Riprova tra qualche istante.",
      message: null,
    };
  }
}

