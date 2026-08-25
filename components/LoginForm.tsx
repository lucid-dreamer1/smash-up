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

      router.push("/admin/dashboard");
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
          className="block text-[#5F1A19] text-xs font-semibold uppercase tracking-wider mb-2"
        >
          Email Amministratore
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@alleraller.it"
          className="w-full bg-[#f9f8f4] border border-[#5F1A19]/20 rounded-xl px-4 py-3 text-[#260a0a] placeholder:text-[#260a0a]/35 focus:outline-none focus:border-[#5F1A19] focus:ring-1 focus:ring-[#5F1A19] transition-all text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="block text-[#5F1A19] text-xs font-semibold uppercase tracking-wider mb-2"
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
          className="w-full bg-[#f9f8f4] border border-[#5F1A19]/20 rounded-xl px-4 py-3 text-[#260a0a] placeholder:text-[#260a0a]/35 focus:outline-none focus:border-[#5F1A19] focus:ring-1 focus:ring-[#5F1A19] transition-all text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#5F1A19] hover:bg-[#4d1514] disabled:opacity-50 text-[#FDD37B] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#FDD37B]/30 cursor-pointer"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
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
          "Accedi al Pannello →"
        )}
      </button>
    </form>
  );
}
