"use server";

import type { InboxBookingFormState } from "@/lib/types";
import { sendOwnerInboxNotification } from "@/lib/email";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project");
}

export async function submitBookingInbox(
  prevState: InboxBookingFormState,
  formData: FormData
): Promise<InboxBookingFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const service = formData.get("service") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const phone = formData.get("phone") as string;
  const notes = (formData.get("notes") as string) || null;

  // Validation
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Inserisci un nome valido.", message: null };
  }
  if (!email || !email.includes("@")) {
    return { success: false, error: "Inserisci un'email valida per ricevere la conferma.", message: null };
  }
  if (!service) {
    return { success: false, error: "Seleziona un servizio.", message: null };
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

  // Check date not in past
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    return { success: false, error: "Non puoi prenotare per una data passata.", message: null };
  }

  try {
    if (isSupabaseConfigured()) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      let { error: insertErr } = await supabase.from("reservations").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        service,
        date,
        time,
        phone: phone.trim(),
        notes: notes?.trim() || null,
        handled: false,
        status: "inbox",
        source: "website",
        booking_flow: "inbox",
      });

      // Fallback: if 'service' column doesn't exist yet in Supabase schema (PGRST204)
      if (insertErr && (insertErr.code === "PGRST204" || insertErr.message?.includes("service"))) {
        const enrichedNotes = notes?.trim()
          ? `[Servizio: ${service}] ${notes.trim()}`
          : `[Servizio: ${service}]`;

        const retry = await supabase.from("reservations").insert({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          guests: 1,
          date,
          time,
          phone: phone.trim(),
          notes: enrichedNotes,
          handled: false,
          status: "inbox",
          source: "website",
          booking_flow: "inbox",
        });

        insertErr = retry.error;
      }

      if (insertErr) {
        console.error("Supabase insert error (inbox):", insertErr);
        return {
          success: false,
          error: "Errore nel salvataggio. Riprova o contattaci su WhatsApp al 328 007 1334.",
          message: null,
        };
      }
    } else {
      console.log("📬 Prenotazione Inbox (mock):", { name, email, service, date, time, phone, notes });
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Send notification email to owner
    const bookingData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      guests: 1,
      date,
      time,
      notes: notes?.trim() ? `Servizio: ${service}\n${notes.trim()}` : `Servizio: ${service}`,
    };
    await sendOwnerInboxNotification(bookingData);

    return {
      success: true,
      error: null,
      message: `Grazie ${name.trim().split(" ")[0]}! La tua richiesta per "${service}" è stata inviata. Riceverai conferma via email a ${email.trim()} al più presto.`,
    };
  } catch (err) {
    console.error("Booking inbox error:", err);
    return {
      success: false,
      error: "Si è verificato un errore. Riprova tra qualche istante.",
      message: null,
    };
  }
}
