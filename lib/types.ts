// ─── Services ───
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: "taglio" | "colore" | "trattamenti" | "sposa";
  available: boolean;
  featured?: boolean;
  created_at?: string;
}

export type ServiceCategory = ServiceItem["category"];

// ─── Legacy alias for Supabase compatibility ───
export type MenuItem = ServiceItem;
export type MenuCategory = ServiceCategory;

// ─── Reservation Status (Extended for multi-flow) ───
export type ReservationStatus =
  | "pending"
  | "completed"
  | "cancelled"
  | "inbox"
  | "confirmed"
  | "rejected"
  | "direct_pending";

export type ReservationSource = "website" | "phone" | "walk_in" | "whatsapp";

// ─── Booking Flow ───
export type BookingFlow = "classic" | "inbox" | "direct";

// ─── Reservation ───
export interface Reservation {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  phone: string;
  email: string | null;
  notes: string | null;
  handled: boolean;
  status: ReservationStatus;
  source: ReservationSource;
  booking_flow: BookingFlow;
  response_token: string | null;
  responded_at: string | null;
  created_at: string;
}

// ─── Form States ───
export interface BookingFormState {
  success: boolean;
  error: string | null;
  message: string | null;
}

export interface QuickBookingFormState {
  success: boolean;
  error: string | null;
  message: string | null;
}

export interface InboxBookingFormState {
  success: boolean;
  error: string | null;
  message: string | null;
}

export interface DirectBookingFormState {
  success: boolean;
  error: string | null;
  message: string | null;
}

// ─── Status configuration ───
export const STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; color: string; bgColor: string; borderColor: string; icon: string }
> = {
  pending: {
    label: "In attesa",
    color: "text-amber-800",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-300",
    icon: "",
  },
  inbox: {
    label: "In arrivo",
    color: "text-blue-800",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
    icon: "",
  },
  direct_pending: {
    label: "In attesa risposta",
    color: "text-purple-800",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
    icon: "",
  },
  confirmed: {
    label: "Confermato",
    color: "text-emerald-800",
    bgColor: "bg-emerald-100",
    borderColor: "border-emerald-300",
    icon: "",
  },
  rejected: {
    label: "Rifiutato",
    color: "text-red-800",
    bgColor: "bg-red-100",
    borderColor: "border-red-300",
    icon: "",
  },
  completed: {
    label: "Completato",
    color: "text-green-800",
    bgColor: "bg-green-100",
    borderColor: "border-green-300",
    icon: "",
  },
  cancelled: {
    label: "Annullato",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-300",
    icon: "",
  },
};

export const SOURCE_CONFIG: Record<
  ReservationSource,
  { label: string; icon: string }
> = {
  website: { label: "Sito Web", icon: "" },
  phone: { label: "Telefono", icon: "" },
  walk_in: { label: "Passaggio", icon: "" },
  whatsapp: { label: "WhatsApp", icon: "" },
};

// ─── Constants ───
export const RESERVATION_DURATION_HOURS = 1;

// ─── Service Categories Config ───
export const SERVICE_CATEGORIES: { key: ServiceCategory; label: string }[] = [
  { key: "taglio", label: "Taglio & Piega" },
  { key: "colore", label: "Colore" },
  { key: "trattamenti", label: "Trattamenti" },
  { key: "sposa", label: "Sposa & Cerimonia" },
];
