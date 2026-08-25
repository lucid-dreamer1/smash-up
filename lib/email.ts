"use server";

import nodemailer from "nodemailer";
import { Resend } from "resend";

interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes: string | null;
}

const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || "";
const RESEND_KEY = process.env.RESEND_API_KEY || "";
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const OWNER_EMAIL = process.env.OWNER_EMAIL || GMAIL_USER || "";
function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/+$/, "");
  }
  if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}

const BASE_URL = getBaseUrl();

// Lazy Nodemailer transport
function getGmailTransport() {
  if (!GMAIL_USER || !GMAIL_PASS) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS.replace(/\s+/g, ""), // strip spaces if copied from Google
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

// Lazy Resend client
function getResendClient(): Resend | null {
  if (!RESEND_KEY) return null;
  return new Resend(RESEND_KEY);
}

// Universal email sender helper
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  // 1. Try Gmail SMTP first if configured (no domain required)
  const transporter = getGmailTransport();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Allèr Allèr" <${GMAIL_USER}>`,
        to,
        subject,
        html,
      });
      return { success: true };
    } catch (err) {
      console.error("Gmail SMTP send error:", err);
      return { success: false, error: String(err) };
    }
  }

  // 2. Fallback to Resend if configured
  const resend = getResendClient();
  if (resend) {
    try {
      await resend.emails.send({
        from: RESEND_FROM,
        to,
        subject,
        html,
      });
      return { success: true };
    } catch (err) {
      console.error("Resend API send error:", err);
      return { success: false, error: String(err) };
    }
  }

  // 3. Mock mode
  console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
  return { success: true };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Shared HTML wrapper ───
function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f7f6f0;font-family:'Inter',system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="text-align:center;padding:24px 0;border-bottom:2px solid #ece9d8;">
      <h1 style="font-family:Georgia,serif;font-size:26px;color:#201a15;margin:0;letter-spacing:0.5px;">Allèr Allèr</h1>
      <p style="color:#96844a;font-size:12px;margin:6px 0 0;letter-spacing:2px;text-transform:uppercase;">Caserta · dal 1987</p>
    </div>
    <!-- Body -->
    <div style="padding:32px 0;">${content}</div>
    <!-- Footer -->
    <div style="border-top:2px solid #ece9d8;padding:20px 0;text-align:center;">
      <p style="color:#ae9f62;font-size:12px;margin:0;">Allèr Allèr · Via Example 123, Caserta</p>
      <p style="color:#ae9f62;font-size:12px;margin:4px 0 0;">Tel. +39 0823 170 2075</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Booking details table (reusable) ───
function bookingDetailsHtml(data: BookingEmailData): string {
  return `
    <div style="background:#ffffff;border:1px solid #ece9d8;border-radius:14px;padding:24px;margin:20px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#201a15;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;color:#96844a;font-weight:600;width:120px;">Nome</td><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;font-weight:600;">${data.name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;color:#96844a;font-weight:600;">Persone</td><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;font-weight:600;">${data.guests}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;color:#96844a;font-weight:600;">Data</td><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;font-weight:600;">${formatDate(data.date)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;color:#96844a;font-weight:600;">Ora</td><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;font-weight:600;">${data.time}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;color:#96844a;font-weight:600;">Telefono</td><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;"><a href="tel:${data.phone}" style="color:#c14627;text-decoration:none;font-weight:600;">${data.phone}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;color:#96844a;font-weight:600;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f7f6f0;">${data.email}</td></tr>
        ${data.notes ? `<tr><td style="padding:10px 0;color:#96844a;font-weight:600;">Note</td><td style="padding:10px 0;font-style:italic;color:#5f5232;">"${data.notes}"</td></tr>` : ""}
      </table>
    </div>`;
}

// ═══════════════════════════════════════════════════════
// UNIFIED OWNER NOTIFICATION (3 Buttons: Confirm, Reject, Open Inbox)
// ═══════════════════════════════════════════════════════
export async function sendOwnerBookingNotification(
  data: BookingEmailData,
  responseToken: string
) {
  const recipient = OWNER_EMAIL || GMAIL_USER;
  if (!recipient) {
    console.log("[MOCK] Nessuna email proprietario configurata.");
    return { success: true };
  }

  const confirmUrl = `${BASE_URL}/api/booking-respond/${responseToken}?action=confirm`;
  const rejectUrl = `${BASE_URL}/api/booking-respond/${responseToken}?action=reject`;
  const inboxUrl = `${BASE_URL}/admin/inbox`;

  return sendEmail({
    to: recipient,
    subject: `Nuova richiesta prenotazione: ${data.name} (${data.guests} persone - ${formatDate(data.date)} ore ${data.time})`,
    html: emailWrapper(`
      <h2 style="color:#201a15;font-family:Georgia,serif;font-size:22px;margin:0 0 8px;">Nuova Richiesta di Prenotazione</h2>
      <p style="color:#5f5232;font-size:14px;margin:0 0 16px;line-height:1.5;">Hai ricevuto una nuova richiesta. Puoi confermarla o rifiutarla subito con i pulsanti rapidi, oppure aprirla nel portale di gestione.</p>
      
      ${bookingDetailsHtml(data)}
      
      <!-- Action Buttons -->
      <div style="text-align:center;margin:32px 0 20px;">
        <div style="margin-bottom:14px;">
          <a href="${confirmUrl}" style="display:inline-block;background:#15803d;color:#ffffff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;margin:4px 6px;letter-spacing:0.3px;">
            Accetta Prenotazione
          </a>
          <a href="${rejectUrl}" style="display:inline-block;background:#b91c1c;color:#ffffff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;margin:4px 6px;letter-spacing:0.3px;">
            Rifiuta
          </a>
        </div>
        <div>
          <a href="${inboxUrl}" style="display:inline-block;background:#201a15;color:#faf3e0;padding:12px 26px;border-radius:10px;text-decoration:none;font-weight:500;font-size:13px;margin:4px 6px;border:1px solid #5f5232;">
            Apri nel Portale Inbox
          </a>
        </div>
      </div>

      <p style="color:#ae9f62;font-size:12px;text-align:center;margin:18px 0 0;">
        Tutte le prenotazioni sono consultabili anche dal <a href="${BASE_URL}/admin/dashboard" style="color:#c14627;text-decoration:underline;">Pannello dell'Oste</a>.
      </p>
    `),
  });
}

// Backward compatibility aliases
export async function sendOwnerInboxNotification(data: BookingEmailData) {
  return sendOwnerBookingNotification(data, "inbox");
}

export async function sendOwnerDirectEmail(
  data: BookingEmailData,
  responseToken: string
) {
  return sendOwnerBookingNotification(data, responseToken);
}

// ═══════════════════════════════════════════════════════
// SHARED: Send confirmation email to the customer
// ═══════════════════════════════════════════════════════
export async function sendCustomerConfirmation(data: BookingEmailData) {
  return sendEmail({
    to: data.email,
    subject: `Prenotazione Confermata — Allèr Allèr`,
    html: emailWrapper(`
      <h2 style="color:#15803d;font-family:Georgia,serif;font-size:24px;margin:0 0 8px;">Prenotazione Confermata</h2>
      <p style="color:#201a15;font-size:15px;margin:0 0 20px;line-height:1.5;">
        Gentile <strong>${data.name}</strong>, la tua prenotazione presso l'Allèr Allèr è stata confermata.
      </p>
      ${bookingDetailsHtml(data)}
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;text-align:center;margin:20px 0;">
        <p style="color:#166534;font-size:14px;margin:0;font-weight:600;">Ti aspettiamo ${formatDate(data.date)} alle ore ${data.time}.</p>
      </div>
      <p style="color:#5f5232;font-size:13px;margin:16px 0 0;">
        Per qualsiasi necessità di modifica o cancellazione, ti invitiamo a contattarci telefonicamente al <a href="tel:+390823456789" style="color:#c14627;font-weight:600;">+39 0823 170 2075</a>.
      </p>
    `),
  });
}

// ═══════════════════════════════════════════════════════
// SHARED: Send rejection email to the customer
// ═══════════════════════════════════════════════════════
export async function sendCustomerRejection(data: BookingEmailData) {
  return sendEmail({
    to: data.email,
    subject: `Aggiornamento Prenotazione — Allèr Allèr`,
    html: emailWrapper(`
      <h2 style="color:#991b1b;font-family:Georgia,serif;font-size:24px;margin:0 0 8px;">Disponibilità Esaurita</h2>
      <p style="color:#201a15;font-size:15px;margin:0 0 20px;line-height:1.5;">
        Gentile <strong>${data.name}</strong>, siamo spiacenti di informarti che per la data e l'orario richiesti non abbiamo tavoli disponibili.
      </p>
      ${bookingDetailsHtml(data)}
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px;text-align:center;margin:20px 0;">
        <p style="color:#991b1b;font-size:14px;margin:0;font-weight:500;">Ti invitiamo a selezionare un'altra data o fascia oraria.</p>
      </div>
      <p style="color:#5f5232;font-size:13px;margin:16px 0 0;">
        Puoi effettuare una nuova richiesta sul <a href="${BASE_URL}/#prenota" style="color:#c14627;font-weight:600;">nostro sito web</a> oppure contattarci telefonicamente al <a href="tel:+390823456789" style="color:#c14627;font-weight:600;">+39 0823 170 2075</a>.
      </p>
    `),
  });
}
