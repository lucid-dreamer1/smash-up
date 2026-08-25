"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      if (!supabaseUrl || supabaseUrl.includes("your-project")) {
        setError(
          "Supabase non configurato. Aggiungi le variabili d'ambiente in .env.local"
        );
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("Invalid login")) {
          setError("Email o password non validi.");
        } else {
          setError(authError.message);
        }
        setLoading(false);
        return;
      }

      // Direct to Inbox immediately
      router.push("/admin/inbox");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error
          ? `Errore: ${err.message}`
          : "Si è verificato un errore. Riprova."
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-red-700 text-xs leading-relaxed font-medium">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="login-email"
          className="block text-[#2B0A12] text-xs font-black uppercase tracking-wider mb-2"
        >
          Email Amministratore
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@smashupburger.it"
          className="w-full bg-[#FDF6F7]/60 border border-[#F0D5DA] rounded-xl px-4 py-3 text-[#2B0A12] placeholder:text-[#735058]/50 focus:outline-none focus:border-[#8A0427] transition-all text-sm font-medium"
        />
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="block text-[#2B0A12] text-xs font-black uppercase tracking-wider mb-2"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full bg-[#FDF6F7]/60 border border-[#F0D5DA] rounded-xl px-4 py-3 text-[#2B0A12] placeholder:text-[#735058]/50 focus:outline-none focus:border-[#8A0427] transition-all text-sm font-medium"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8A0427] hover:bg-[#6F021E] disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-[#8A0427]/25 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Accesso in corso...
          </>
        ) : (
          "Accedi all'Inbox →"
        )}
      </button>
    </form>
  );
}
