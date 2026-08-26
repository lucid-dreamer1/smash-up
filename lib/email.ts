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
const OWNER_EMAIL = process.env.RESTAURANT_NOTIFICATION_EMAIL || process.env.OWNER_EMAIL || GMAIL_USER || "";

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
      pass: GMAIL_PASS.replace(/\s+/g, ""),
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
  // 1. Try Gmail SMTP first if configured
  const transporter = getGmailTransport();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Cappiello Hair & Beauty" <${GMAIL_USER}>`,
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

// ─── Shared HTML wrapper for Cappiello Hair & Beauty ───
function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#FAFAF8;font-family:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="text-align:center;padding:24px 0;border-bottom:1px solid #E8E8E4;">
      <h1 style="font-family:Georgia,'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#1A1A1B;margin:0;font-style:italic;">
        Cappiello <span style="color:#C9A96E;">.</span>
      </h1>
      <p style="color:#C9A96E;font-size:11px;font-weight:600;margin:6px 0 0;letter-spacing:3px;text-transform:uppercase;">
        Hair & Beauty
      </p>
    </div>
    <!-- Body -->
    <div style="padding:32px 0;">${content}</div>
    <!-- Footer -->
    <div style="border-top:1px solid #E8E8E4;padding:20px 0;text-align:center;">
      <p style="color:#6B6B6B;font-size:12px;font-weight:500;margin:0;">Cappiello Hair & Beauty · Via delle Querce, 38 · Caserta</p>
      <p style="color:#6B6B6B;font-size:12px;margin:4px 0 0;">
        Instagram: <a href="https://www.instagram.com/cappiellohairbeauty/" style="color:#C9A96E;text-decoration:none;font-weight:600;">@cappiellohairbeauty</a>
        · WhatsApp: <a href="https://wa.me/393280071334" style="color:#C9A96E;text-decoration:none;font-weight:600;">328 007 1334</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Booking details table ───
function bookingDetailsHtml(data: BookingEmailData): string {
  return `
    <div style="background:#ffffff;border:1px solid #E8E8E4;border-radius:18px;padding:24px;margin:20px 0;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1A1A1B;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;color:#C9A96E;font-weight:600;width:120px;">Nome</td><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;font-weight:600;">${data.name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;color:#C9A96E;font-weight:600;">Data</td><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;font-weight:600;">${formatDate(data.date)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;color:#C9A96E;font-weight:600;">Ora</td><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;font-weight:600;">${data.time}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;color:#C9A96E;font-weight:600;">Telefono</td><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;"><a href="tel:${data.phone}" style="color:#C9A96E;text-decoration:none;font-weight:600;">${data.phone}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;color:#C9A96E;font-weight:600;">Email</td><td style="padding:10px 0;border-bottom:1px solid #F5F5F0;">${data.email}</td></tr>
        ${data.notes ? `<tr><td style="padding:10px 0;color:#C9A96E;font-weight:600;">Note</td><td style="padding:10px 0;font-style:italic;color:#6B6B6B;">"${data.notes}"</td></tr>` : ""}
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
    subject: `✂️ Nuova Richiesta Appuntamento: ${data.name} — ${formatDate(data.date)} ore ${data.time}`,
    html: emailWrapper(`
      <h2 style="color:#1A1A1B;font-size:22px;font-weight:700;margin:0 0 8px;font-family:Georgia,serif;font-style:italic;">Nuova Richiesta di Appuntamento</h2>
      <p style="color:#6B6B6B;font-size:14px;margin:0 0 16px;line-height:1.5;">Hai ricevuto una nuova richiesta dal sito web. Puoi confermarla o rifiutarla con un click, oppure gestirla dall'Inbox.</p>
      
      ${bookingDetailsHtml(data)}
      
      <!-- Action Buttons -->
      <div style="text-align:center;margin:32px 0 20px;">
        <div style="margin-bottom:14px;">
          <a href="${confirmUrl}" style="display:inline-block;background:#15803d;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:700;font-size:13px;margin:4px 6px;letter-spacing:0.5px;text-transform:uppercase;">
            ✓ Conferma Appuntamento
          </a>
          <a href="${rejectUrl}" style="display:inline-block;background:#b91c1c;color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:700;font-size:13px;margin:4px 6px;letter-spacing:0.5px;text-transform:uppercase;">
            ✕ Rifiuta
          </a>
        </div>
        <div>
          <a href="${inboxUrl}" style="display:inline-block;background:#1A1A1B;color:#FAFAF8;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;font-size:12px;margin:4px 6px;border:1px solid #C9A96E;">
            Apri nell'Inbox →
          </a>
        </div>
      </div>

      <p style="color:#6B6B6B;font-size:12px;text-align:center;margin:18px 0 0;">
        Tutte le richieste possono essere gestite dalla <a href="${inboxUrl}" style="color:#C9A96E;text-decoration:underline;font-weight:600;">Inbox Appuntamenti</a>.
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
    subject: `Appuntamento Confermato — Cappiello Hair & Beauty ✨`,
    html: emailWrapper(`
      <h2 style="color:#15803d;font-size:24px;font-weight:700;margin:0 0 8px;font-family:Georgia,serif;font-style:italic;">Appuntamento Confermato!</h2>
      <p style="color:#1A1A1B;font-size:15px;margin:0 0 20px;line-height:1.5;">
        Ciao <strong>${data.name}</strong>, il tuo appuntamento presso <strong>Cappiello Hair & Beauty</strong> è stato confermato. Ti aspettiamo!
      </p>
      ${bookingDetailsHtml(data)}
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:18px;text-align:center;margin:20px 0;">
        <p style="color:#166534;font-size:14px;margin:0;font-weight:700;">Ti aspettiamo ${formatDate(data.date)} alle ore ${data.time}.</p>
      </div>
      <p style="color:#6B6B6B;font-size:13px;margin:16px 0 0;">
        Per modifiche o cancellazioni, contattaci su WhatsApp al <a href="https://wa.me/393280071334" style="color:#C9A96E;font-weight:600;text-decoration:none;">328 007 1334</a> o su Instagram <a href="https://www.instagram.com/cappiellohairbeauty/" style="color:#C9A96E;font-weight:600;text-decoration:none;">@cappiellohairbeauty</a>.
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
    subject: `Aggiornamento Disponibilità — Cappiello Hair & Beauty`,
    html: emailWrapper(`
      <h2 style="color:#991b1b;font-size:24px;font-weight:700;margin:0 0 8px;font-family:Georgia,serif;font-style:italic;">Disponibilità Esaurita</h2>
      <p style="color:#1A1A1B;font-size:15px;margin:0 0 20px;line-height:1.5;">
        Ciao <strong>${data.name}</strong>, siamo spiacenti di informarti che per la data e l'orario richiesti non abbiamo disponibilità.
      </p>
      ${bookingDetailsHtml(data)}
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:14px;padding:18px;text-align:center;margin:20px 0;">
        <p style="color:#991b1b;font-size:14px;margin:0;font-weight:600;">Ti invitiamo a selezionare un'altra data o orario.</p>
      </div>
      <p style="color:#6B6B6B;font-size:13px;margin:16px 0 0;">
        Puoi effettuare una nuova richiesta sul <a href="${BASE_URL}/#prenota" style="color:#C9A96E;font-weight:600;text-decoration:underline;">nostro sito web</a> o contattarci su WhatsApp al <a href="https://wa.me/393280071334" style="color:#C9A96E;font-weight:600;text-decoration:none;">328 007 1334</a>.
      </p>
    `),
  });
}
