"use client";

import { useState } from "react";
import BookingForm from "./BookingForm";
import BookingFormInbox from "./BookingFormInbox";
import BookingFormDirect from "./BookingFormDirect";
import type { BookingFlow } from "@/lib/types";

interface BookingFlowSelectorProps {
  /** If set, only this flow is available (configured via env var NEXT_PUBLIC_BOOKING_FLOW) */
  forcedFlow?: BookingFlow;
}

const FLOW_CONFIG: Record<
  BookingFlow,
  { label: string; icon: string; description: string; accent: string; activeClass: string }
> = {
  classic: {
    label: "Classico",
    icon: "📋",
    description: "Conferma automatica",
    accent: "terra",
    activeClass: "bg-terra-500 text-white shadow-lg shadow-terra-500/30",
  },
  inbox: {
    label: "Inbox",
    icon: "📬",
    description: "Conferma via email",
    accent: "blue",
    activeClass: "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
  },
  direct: {
    label: "Diretto",
    icon: "📩",
    description: "Risposta del titolare",
    accent: "purple",
    activeClass: "bg-purple-600 text-white shadow-lg shadow-purple-500/30",
  },
};

export default function BookingFlowSelector({ forcedFlow }: BookingFlowSelectorProps) {
  const [selectedFlow, setSelectedFlow] = useState<BookingFlow>(forcedFlow || "classic");

  // If only one flow is forced, skip the selector entirely
  const showSelector = !forcedFlow;

  return (
    <section id="prenota" className="py-20 sm:py-28 bg-olive-900 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terra-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-olive-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-terra-400 text-sm uppercase tracking-[0.25em] font-medium">
            Ti Aspettiamo
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream-50 mt-3 mb-4">
            Prenota un Tavolo
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-terra-400 to-terra-600 mx-auto rounded-full" />
          <p className="text-cream-200/70 mt-6 max-w-md mx-auto">
            {selectedFlow === "classic"
              ? "Compila il modulo e ti confermeremo la prenotazione al più presto."
              : selectedFlow === "inbox"
              ? "Invia la tua richiesta e ricevi conferma direttamente via email."
              : "La tua richiesta arriva direttamente al titolare che ti risponde via email."}
          </p>
        </div>

        {/* Flow Selector Tabs */}
        {showSelector && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/5 backdrop-blur-sm border border-cream-100/10 rounded-2xl p-1.5 gap-1">
              {(Object.keys(FLOW_CONFIG) as BookingFlow[]).map((flow) => {
                const config = FLOW_CONFIG[flow];
                const isActive = selectedFlow === flow;
                return (
                  <button
                    key={flow}
                    onClick={() => setSelectedFlow(flow)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? config.activeClass
                        : "text-cream-300/60 hover:text-cream-100 hover:bg-white/5"
                    }`}
                  >
                    <span>{config.icon}</span>
                    <span className="hidden sm:inline">{config.label}</span>
                    <span className="sm:hidden">{config.icon}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Form */}
        <div className="animate-fade-in" key={selectedFlow}>
          {selectedFlow === "classic" && <BookingForm />}
          {selectedFlow === "inbox" && <BookingFormInbox />}
          {selectedFlow === "direct" && <BookingFormDirect />}
        </div>
      </div>
    </section>
  );
}
