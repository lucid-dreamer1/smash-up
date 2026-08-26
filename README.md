# Cappiello Hair & Beauty — Sito Web

Sito web ufficiale di **Cappiello Hair & Beauty**, salone di parrucchiere donna a Caserta.

## Stack Tecnologico

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS 4
- **Database**: Supabase (prenotazioni)
- **Email**: Resend / Nodemailer
- **Deployment**: Vercel

## Funzionalità

- 🏠 **Landing Page** con hero, servizi, chi siamo, FAQ
- 📅 **Prenotazione Online** con form + conferma email
- 💬 **WhatsApp Direct** per prenotazioni rapide
- 📥 **Admin Inbox** per gestire richieste in arrivo
- 🔍 **SEO Ottimizzato** con Schema.org HairSalon
- 🍪 **Cookie Banner** GDPR compliant
- 📱 **Responsive** mobile-first design

## Sviluppo Locale

```bash
npm install
npm run dev
```

## Variabili d'Ambiente

Copia `.env.example` in `.env.local` e configura:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY` (opzionale, per email)
- `NEXT_PUBLIC_GA_ID` (opzionale, per Google Analytics)
