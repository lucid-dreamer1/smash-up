-- ═══════════════════════════════════════════════════════════════
-- MIGRAZIONE V3 — Nuovi Booking Flows
-- Osteria da Miduccia
-- Esegui questo script nel SQL Editor di Supabase
-- ═══════════════════════════════════════════════════════════════

-- 0. Assicura che le policy RLS non blocchino le conferme via token link
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;

-- 1. Aggiunge colonna email per i nuovi flow
DO $$ BEGIN
  ALTER TABLE reservations ADD COLUMN email TEXT DEFAULT NULL;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- 2. Aggiunge colonna response_token per il flow diretto (link conferma/rifiuta)
DO $$ BEGIN
  ALTER TABLE reservations ADD COLUMN response_token UUID DEFAULT NULL;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- 3. Aggiunge colonna booking_flow per tracciare quale flow è stato usato
DO $$ BEGIN
  ALTER TABLE reservations ADD COLUMN booking_flow TEXT DEFAULT 'classic'
    CHECK (booking_flow IN ('classic', 'inbox', 'direct'));
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- 4. Aggiunge colonna responded_at per tracciare quando il titolare ha risposto
DO $$ BEGIN
  ALTER TABLE reservations ADD COLUMN responded_at TIMESTAMPTZ DEFAULT NULL;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- 5. Aggiorna il CHECK constraint su status per includere i nuovi valori
-- Prima rimuove il vecchio constraint, poi ne crea uno nuovo
ALTER TABLE reservations DROP CONSTRAINT IF EXISTS reservations_status_check;
ALTER TABLE reservations ADD CONSTRAINT reservations_status_check
  CHECK (status IN ('pending', 'completed', 'cancelled', 'inbox', 'confirmed', 'rejected', 'direct_pending'));

-- 6. Indice su response_token per lookup veloci (flow 2)
CREATE INDEX IF NOT EXISTS idx_reservations_response_token
  ON reservations (response_token)
  WHERE response_token IS NOT NULL;

-- 7. Indice su booking_flow per filtri nella inbox
CREATE INDEX IF NOT EXISTS idx_reservations_booking_flow
  ON reservations (booking_flow);
