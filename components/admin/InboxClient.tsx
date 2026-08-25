"use client";

import { useState, useTransition } from "react";
import type { Reservation } from "@/lib/types";
import { STATUS_CONFIG } from "@/lib/types";
import { respondToInboxBooking } from "@/app/actions/booking-respond";

interface InboxClientProps {
  reservations: Reservation[];
  onLogout: () => Promise<void>;
}

type InboxFilter = "all" | "inbox" | "direct_pending" | "confirmed" | "rejected";

export default function InboxClient({ reservations, onLogout }: InboxClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    reservations.find((r) => r.status === "inbox" || r.status === "direct_pending")?.id || null
  );
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [isPending, startTransition] = useTransition();
  const [actionFeedback, setActionFeedback] = useState<{ id: string; type: "confirm" | "reject" } | null>(null);

  // Filter reservations
  const filtered = reservations.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const selected = reservations.find((r) => r.id === selectedId);

  const pendingCount = reservations.filter(
    (r) => r.status === "inbox" || r.status === "direct_pending"
  ).length;
  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length;
  const rejectedCount = reservations.filter((r) => r.status === "rejected").length;

  function handleRespond(id: string, action: "confirm" | "reject") {
    startTransition(async () => {
      const result = await respondToInboxBooking(id, action);
      if (result.success) {
        setActionFeedback({ id, type: action });
        setTimeout(() => setActionFeedback(null), 3000);
      }
    });
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "adesso";
    if (mins < 60) return `${mins}m fa`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h fa`;
    const days = Math.floor(hours / 24);
    return `${days}g fa`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-olive-50">
      {/* Header */}
      <header className="bg-white border-b border-olive-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-olive-900 tracking-tight">
              Inbox Prenotazioni
            </h1>
            <p className="text-olive-500 text-xs">
              {pendingCount > 0
                ? `${pendingCount} ${pendingCount === 1 ? "richiesta in attesa" : "richieste in attesa"}`
                : "Nessuna richiesta da gestire"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/admin/dashboard"
              className="text-xs bg-olive-50 hover:bg-olive-100 text-olive-700 px-3.5 py-2 rounded-xl border border-olive-200 font-semibold transition-all"
            >
              Pannello Generale
            </a>
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
                className="bg-olive-800 hover:bg-olive-900 text-cream-50 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                Esci
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-2xl border p-4 text-left transition-all ${
              filter === "all"
                ? "bg-white border-olive-400 shadow-md"
                : "bg-white/60 border-olive-100 hover:bg-white hover:shadow-sm"
            }`}
          >
            <p className="text-olive-500 text-xs font-semibold uppercase tracking-wider">Tutte le Richieste</p>
            <p className="text-2xl font-bold text-olive-900 mt-1">{reservations.length}</p>
          </button>
          <button
            onClick={() => setFilter("inbox")}
            className={`rounded-2xl border p-4 text-left transition-all ${
              filter === "inbox"
                ? "bg-blue-50 border-blue-400 shadow-md"
                : "bg-white/60 border-olive-100 hover:bg-blue-50/50 hover:shadow-sm"
            }`}
          >
            <p className="text-blue-700 text-xs font-semibold uppercase tracking-wider">Da Gestire</p>
            <p className="text-2xl font-bold text-blue-800 mt-1">{pendingCount}</p>
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`rounded-2xl border p-4 text-left transition-all ${
              filter === "confirmed"
                ? "bg-emerald-50 border-emerald-400 shadow-md"
                : "bg-white/60 border-olive-100 hover:bg-emerald-50/50 hover:shadow-sm"
            }`}
          >
            <p className="text-emerald-700 text-xs font-semibold uppercase tracking-wider">Confermate</p>
            <p className="text-2xl font-bold text-emerald-800 mt-1">{confirmedCount}</p>
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`rounded-2xl border p-4 text-left transition-all ${
              filter === "rejected"
                ? "bg-red-50 border-red-400 shadow-md"
                : "bg-white/60 border-olive-100 hover:bg-red-50/50 hover:shadow-sm"
            }`}
          >
            <p className="text-red-700 text-xs font-semibold uppercase tracking-wider">Rifiutate</p>
            <p className="text-2xl font-bold text-red-800 mt-1">{rejectedCount}</p>
          </button>
        </div>

        {/* Main Content — Split View */}
        <div className="flex gap-6 min-h-[calc(100vh-260px)]">
          {/* Left Sidebar — Message List */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-2xl border border-olive-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-olive-100 bg-olive-50/50">
                <h3 className="text-xs font-bold text-olive-800 uppercase tracking-wider">
                  {filter === "all" ? "Elenco richieste" : `Filtro: ${filter}`}
                  <span className="text-olive-400 font-normal ml-2 lowercase">({filtered.length})</span>
                </h3>
              </div>

              {filtered.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-olive-500 text-sm font-medium">Nessuna prenotazione presente</p>
                </div>
              ) : (
                <div className="divide-y divide-olive-50 max-h-[calc(100vh-340px)] overflow-y-auto">
                  {filtered.map((res) => {
                    const statusConfig = STATUS_CONFIG[res.status];
                    const isSelected = selectedId === res.id;
                    const isNew = res.status === "inbox" || res.status === "direct_pending";
                    const wasJustActioned = actionFeedback?.id === res.id;

                    return (
                      <button
                        key={res.id}
                        onClick={() => setSelectedId(res.id)}
                        className={`w-full text-left p-4 transition-all hover:bg-cream-50 ${
                          isSelected
                            ? "bg-blue-50/70 border-l-4 border-l-blue-600"
                            : isNew
                            ? "bg-blue-50/30 border-l-4 border-l-blue-400"
                            : "border-l-4 border-l-transparent"
                        } ${wasJustActioned ? "animate-pulse" : ""}`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {isNew && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                            )}
                            <span className="font-semibold text-olive-900 text-sm truncate max-w-[180px]">
                              {res.name}
                            </span>
                          </div>
                          <span className="text-olive-400 text-[11px] font-mono flex-shrink-0">
                            {timeAgo(res.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-olive-600 font-medium">
                          <span>{res.guests} {res.guests === 1 ? "persona" : "persone"}</span>
                          <span>·</span>
                          <span>{formatDate(res.date)}</span>
                          <span>·</span>
                          <span className="font-mono">{res.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2.5">
                          <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                          <span className="text-[11px] text-olive-400 font-mono">
                            {res.phone}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel — Detail View */}
          <div className="hidden lg:block flex-1">
            {selected ? (
              <div className="bg-white rounded-2xl border border-olive-100 shadow-sm overflow-hidden">
                {/* Detail Header */}
                <div className="p-6 border-b border-olive-100 bg-gradient-to-r from-olive-50 to-cream-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-olive-900">
                        {selected.name}
                      </h2>
                      <p className="text-olive-500 text-xs mt-1">
                        Richiesta registrata {timeAgo(selected.created_at)}
                      </p>
                    </div>
                    <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${STATUS_CONFIG[selected.status].bgColor} ${STATUS_CONFIG[selected.status].color} ${STATUS_CONFIG[selected.status].borderColor} border`}>
                      {STATUS_CONFIG[selected.status].label}
                    </span>
                  </div>
                </div>

                {/* Detail Body */}
                <div className="p-6 space-y-6">
                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-olive-50 rounded-xl p-4">
                      <p className="text-olive-500 text-xs font-semibold uppercase tracking-wider mb-1">Ospiti</p>
                      <p className="text-2xl font-bold text-olive-900">{selected.guests} <span className="text-sm font-normal text-olive-600">{selected.guests === 1 ? "persona" : "persone"}</span></p>
                    </div>
                    <div className="bg-olive-50 rounded-xl p-4">
                      <p className="text-olive-500 text-xs font-semibold uppercase tracking-wider mb-1">Data</p>
                      <p className="text-lg font-bold text-olive-900">{formatDate(selected.date)}</p>
                    </div>
                    <div className="bg-olive-50 rounded-xl p-4">
                      <p className="text-olive-500 text-xs font-semibold uppercase tracking-wider mb-1">Orario</p>
                      <p className="text-2xl font-bold text-olive-900 font-mono">{selected.time}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-cream-50 rounded-xl p-4 space-y-3 border border-cream-200/50">
                    <h4 className="text-xs font-bold text-olive-700 uppercase tracking-wider">Recapiti Cliente</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-olive-500 text-xs block">Telefono:</span>
                        <a
                          href={`tel:${selected.phone}`}
                          className="text-terra-600 hover:text-terra-700 font-mono font-semibold hover:underline"
                        >
                          {selected.phone}
                        </a>
                      </div>
                      {selected.email && (
                        <div>
                          <span className="text-olive-500 text-xs block">Email:</span>
                          <a
                            href={`mailto:${selected.email}`}
                            className="text-terra-600 hover:text-terra-700 font-medium hover:underline truncate block"
                          >
                            {selected.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {selected.notes && (
                    <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5">Note del Cliente</h4>
                      <p className="text-amber-950 text-sm italic">&quot;{selected.notes}&quot;</p>
                    </div>
                  )}

                  {/* Response timestamp */}
                  {selected.responded_at && (
                    <div className="text-xs text-olive-400 text-center font-mono">
                      Risposta inviata il {new Date(selected.responded_at).toLocaleString("it-IT", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}

                  {/* Action Feedback */}
                  {actionFeedback?.id === selected.id && (
                    <div className={`rounded-xl p-4 text-center font-semibold text-sm ${
                      actionFeedback.type === "confirm"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}>
                      {actionFeedback.type === "confirm"
                        ? "Prenotazione confermata. Email inviata al cliente."
                        : "Prenotazione rifiutata. Il cliente è stato informato via email."}
                    </div>
                  )}

                  {/* Action Buttons — only for pending reservations */}
                  {(selected.status === "inbox" || selected.status === "direct_pending" || selected.status === "pending") && (
                    <div className="flex gap-4 pt-4 border-t border-olive-100">
                      <button
                        onClick={() => handleRespond(selected.id, "confirm")}
                        disabled={isPending}
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-md flex items-center justify-center text-sm"
                      >
                        {isPending ? "Salvataggio..." : "Accetta Prenotazione"}
                      </button>
                      <button
                        onClick={() => handleRespond(selected.id, "reject")}
                        disabled={isPending}
                        className="flex-1 bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-md flex items-center justify-center text-sm"
                      >
                        {isPending ? "Salvataggio..." : "Rifiuta"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-olive-100 shadow-sm flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-olive-700 mb-1">
                    Seleziona una richiesta
                  </h3>
                  <p className="text-olive-400 text-xs">
                    Clicca su una voce nell&apos;elenco per visualizzare i dettagli completi
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Detail — bottom sheet */}
          {selected && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedId(null)}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slide-up"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile close bar */}
                <div className="sticky top-0 bg-white pt-3 pb-2 px-6 border-b border-olive-100 flex items-center justify-between z-10">
                  <h3 className="font-bold text-olive-900 text-sm">{selected.name}</h3>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-olive-500 hover:text-olive-800 text-sm font-semibold p-1"
                  >
                    Chiudi
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Status */}
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${STATUS_CONFIG[selected.status].bgColor} ${STATUS_CONFIG[selected.status].color} ${STATUS_CONFIG[selected.status].borderColor} border`}>
                      {STATUS_CONFIG[selected.status].label}
                    </span>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-olive-50 rounded-xl p-3 text-center">
                      <p className="text-olive-500 text-[10px] font-bold uppercase">Persone</p>
                      <p className="text-xl font-bold text-olive-900">{selected.guests}</p>
                    </div>
                    <div className="bg-olive-50 rounded-xl p-3 text-center">
                      <p className="text-olive-500 text-[10px] font-bold uppercase">Data</p>
                      <p className="text-sm font-bold text-olive-900">{formatDate(selected.date)}</p>
                    </div>
                    <div className="bg-olive-50 rounded-xl p-3 text-center">
                      <p className="text-olive-500 text-[10px] font-bold uppercase">Ora</p>
                      <p className="text-xl font-bold text-olive-900 font-mono">{selected.time}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-3">
                    <a href={`tel:${selected.phone}`} className="flex-1 bg-olive-50 rounded-xl p-3 text-center hover:bg-olive-100 transition-colors">
                      <p className="text-[10px] text-olive-500 uppercase font-semibold">Telefono</p>
                      <p className="text-terra-600 font-mono text-sm font-semibold">{selected.phone}</p>
                    </a>
                    {selected.email && (
                      <a href={`mailto:${selected.email}`} className="flex-1 bg-olive-50 rounded-xl p-3 text-center hover:bg-olive-100 transition-colors">
                        <p className="text-[10px] text-olive-500 uppercase font-semibold">Email</p>
                        <p className="text-terra-600 text-xs font-semibold truncate">{selected.email}</p>
                      </a>
                    )}
                  </div>

                  {selected.notes && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-amber-900 text-xs italic">&quot;{selected.notes}&quot;</p>
                    </div>
                  )}

                  {/* Action Feedback */}
                  {actionFeedback?.id === selected.id && (
                    <div className={`rounded-xl p-3 text-center font-bold text-xs ${
                      actionFeedback.type === "confirm"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {actionFeedback.type === "confirm" ? "Confermata" : "Rifiutata"}
                    </div>
                  )}

                  {/* Mobile Actions */}
                  {(selected.status === "inbox" || selected.status === "direct_pending" || selected.status === "pending") && (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleRespond(selected.id, "confirm")}
                        disabled={isPending}
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all text-xs"
                      >
                        Accetta
                      </button>
                      <button
                        onClick={() => handleRespond(selected.id, "reject")}
                        disabled={isPending}
                        className="flex-1 bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-bold py-3 rounded-xl transition-all text-xs"
                      >
                        Rifiuta
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
