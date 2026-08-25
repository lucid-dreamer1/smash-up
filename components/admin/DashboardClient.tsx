"use client";

import { useState } from "react";
import { useRealtime } from "./RealtimeProvider";
import ReservationsTable from "../ReservationsTable";
import QuickBookingForm from "./QuickBookingForm";
import TableMap from "./TableMap";

type AdminTab = "reservations" | "quick_booking" | "tables";

interface DashboardClientProps {
  onLogout: () => Promise<void>;
}

export default function DashboardClient({ onLogout }: DashboardClientProps) {
  const { reservations, tables, isConnected, refreshAll } = useRealtime();
  const [activeTab, setActiveTab] = useState<AdminTab>("reservations");

  const todayStr = new Date().toISOString().split("T")[0];

  // Stats calculation
  const pendingCount = reservations.filter(
    (r) => r.status === "pending" || r.status === "inbox" || r.status === "direct_pending"
  ).length;
  const completedCount = reservations.filter((r) => r.status === "completed" || r.status === "confirmed").length;
  const todayCount = reservations.filter((r) => r.date === todayStr).length;
  const inboxCount = reservations.filter(
    (r) => r.status === "inbox" || r.status === "direct_pending"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-olive-50">
      {/* Top Header */}
      <header className="bg-white border-b border-olive-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-olive-900 tracking-tight">
                Pannello dell&apos;Oste
              </h1>
              {/* Realtime Live Sync Indicator */}
              <span
                title={
                  isConnected
                    ? "Sincronizzazione in tempo reale attiva"
                    : "Connessione in corso..."
                }
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isConnected
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isConnected ? "bg-green-600" : "bg-amber-600"
                  }`}
                />
                {isConnected ? "Live Sync" : "Syncing"}
              </span>
            </div>
            <p className="text-olive-500 text-xs">
              Allèr Allèr · Caserta
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/admin/inbox"
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3.5 py-2 rounded-xl border border-blue-200 font-bold transition-all flex items-center gap-1.5"
            >
              Inbox Richieste
              {inboxCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {inboxCount}
                </span>
              )}
            </a>
            <button
              onClick={() => refreshAll()}
              title="Aggiorna dati"
              className="text-xs bg-olive-50 hover:bg-olive-100 text-olive-700 px-3.5 py-2 rounded-xl border border-olive-200 font-semibold transition-all"
            >
              Aggiorna
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-olive-600 hover:text-terra-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-olive-50 transition-colors hidden sm:block"
            >
              Vedi Sito
            </a>
            <form action={onLogout}>
              <button
                type="submit"
                className="bg-vesuvio-800 hover:bg-vesuvio-900 text-cream-50 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                Esci
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl border border-olive-100 p-5 shadow-sm">
            <p className="text-olive-500 text-xs uppercase tracking-wider font-bold">
              In Attesa
            </p>
            <p className="text-3xl font-black text-amber-600 mt-1 font-[family-name:var(--font-display)]">
              {pendingCount}
            </p>
            <p className="text-[11px] text-olive-400 mt-0.5">Da gestire o assegnare</p>
          </div>

          <div className="bg-white rounded-3xl border border-olive-100 p-5 shadow-sm">
            <p className="text-olive-500 text-xs uppercase tracking-wider font-bold">
              Oggi ({todayStr})
            </p>
            <p className="text-3xl font-black text-terra-600 mt-1 font-[family-name:var(--font-display)]">
              {todayCount}
            </p>
            <p className="text-[11px] text-olive-400 mt-0.5">Prenotazioni odierne</p>
          </div>

          <div className="bg-white rounded-3xl border border-olive-100 p-5 shadow-sm">
            <p className="text-olive-500 text-xs uppercase tracking-wider font-bold">
              Confermate / Servite
            </p>
            <p className="text-3xl font-black text-green-700 mt-1 font-[family-name:var(--font-display)]">
              {completedCount}
            </p>
            <p className="text-[11px] text-olive-400 mt-0.5">Gestite con successo</p>
          </div>

          <div className="bg-white rounded-3xl border border-olive-100 p-5 shadow-sm">
            <p className="text-olive-500 text-xs uppercase tracking-wider font-bold">
              Tavoli Totali
            </p>
            <p className="text-3xl font-black text-olive-900 mt-1 font-[family-name:var(--font-display)]">
              {tables.length}
            </p>
            <p className="text-[11px] text-olive-400 mt-0.5">Disponibili nel locale</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-3xl border border-olive-100 shadow-sm gap-2 max-w-xl">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "reservations"
                ? "bg-vesuvio-800 text-cream-50 shadow-md"
                : "text-olive-600 hover:bg-olive-50"
            }`}
          >
            Registro Prenotazioni
            {pendingCount > 0 && (
              <span className="bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("quick_booking")}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "quick_booking"
                ? "bg-ragu-600 text-white shadow-md"
                : "text-olive-600 hover:bg-olive-50"
            }`}
          >
            Inserimento Rapido
          </button>

          <button
            onClick={() => setActiveTab("tables")}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "tables"
                ? "bg-vesuvio-800 text-cream-50 shadow-md"
                : "text-olive-600 hover:bg-olive-50"
            }`}
          >
            Mappa Tavoli
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "reservations" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900">
                    Registro Prenotazioni
                  </h2>
                  <p className="text-olive-500 text-xs mt-0.5">
                    Elenco cronologico delle prenotazioni con gestione stato e assegnazione tavoli
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("quick_booking")}
                  className="bg-ragu-600 hover:bg-terra-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  Nuova Prenotazione
                </button>
              </div>
              <ReservationsTable reservations={reservations} tables={tables} />
            </div>
          )}

          {activeTab === "quick_booking" && (
            <QuickBookingForm
              tables={tables}
              reservations={reservations}
              onSuccess={() => setActiveTab("reservations")}
            />
          )}

          {activeTab === "tables" && (
            <div className="space-y-4">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900">
                  Mappa & Gestione Tavoli
                </h2>
                <p className="text-olive-500 text-xs mt-0.5">
                  Visualizzazione della disposizione dei tavoli e assegnazione rapida
                </p>
              </div>
              <TableMap
                tables={tables}
                reservations={reservations}
                onOpenQuickBookingForTable={() => {
                  setActiveTab("quick_booking");
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
