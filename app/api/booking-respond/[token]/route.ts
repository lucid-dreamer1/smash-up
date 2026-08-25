import { NextRequest, NextResponse } from "next/server";
import {
  sendCustomerConfirmation,
  sendCustomerRejection,
} from "@/lib/email";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { searchParams } = request.nextUrl;
  const action = searchParams.get("action");

  if (!token || !action || (action !== "confirm" && action !== "reject")) {
    return NextResponse.redirect(
      new URL("/booking-response/invalid", request.url)
    );
  }

  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  try {
    if (!isSupabaseConfigured()) {
      console.log(`📩 [MOCK] Direct respond: token=${token}, action=${action}`);
      return NextResponse.redirect(
        new URL(`/booking-response/${token}?result=${action}ed`, baseUrl)
      );
    }

    // Use service role or anon key for this public API
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Find reservation by token
    const { data: reservation, error: fetchErr } = await supabase
      .from("reservations")
      .select("*")
      .eq("response_token", token)
      .single();

    if (fetchErr || !reservation) {
      console.error("❌ Direct respond fetch error:", fetchErr, "token:", token);
      return NextResponse.redirect(
        new URL("/booking-response/invalid", baseUrl)
      );
    }

    // Check if already responded
    const isActionable =
      reservation.status === "inbox" ||
      reservation.status === "direct_pending" ||
      reservation.status === "pending";

    if (!isActionable) {
      return NextResponse.redirect(
        new URL(
          `/booking-response/${token}?result=already_handled&status=${reservation.status}`,
          baseUrl
        )
      );
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
      .eq("id", reservation.id);

    if (updateErr) {
      console.error("Direct respond update error:", updateErr);
      return NextResponse.redirect(
        new URL(`/booking-response/${token}?result=error`, baseUrl)
      );
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

    return NextResponse.redirect(
      new URL(`/booking-response/${token}?result=${action}ed`, baseUrl)
    );
  } catch (err) {
    console.error("Direct respond error:", err);
    return NextResponse.redirect(
      new URL(`/booking-response/${token}?result=error`, baseUrl)
    );
  }
}
