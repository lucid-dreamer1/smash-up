-- ═══════════════════════════════════════════════════════════════
-- SCRIPT CORRETTO — Osteria da Miduccia
-- Esegui questo script nel SQL Editor di Supabase
-- ═══════════════════════════════════════════════════════════════

-- 1. Disabilita il blocco RLS per la tabella tavoli
ALTER TABLE tables DISABLE ROW LEVEL SECURITY;

-- 2. Aggiunge le colonne per la mappa grafica
ALTER TABLE tables ADD COLUMN IF NOT EXISTS position_x INTEGER DEFAULT 50;
ALTER TABLE tables ADD COLUMN IF NOT EXISTS position_y INTEGER DEFAULT 50;

-- 3. Aggiorna o inserisce i tavoli gestendo il conflitto sul numero
INSERT INTO tables (number, seats, zone, position_x, position_y, active) VALUES
  (1, 2, 'sala', 15, 20, true),
  (2, 2, 'sala', 35, 20, true),
  (3, 4, 'sala', 60, 20, true),
  (4, 4, 'sala', 80, 20, true),
  (5, 4, 'sala', 20, 60, true),
  (6, 6, 'sala', 50, 60, true),
  (7, 6, 'esterno', 80, 60, true),
  (8, 8, 'esterno', 25, 85, true),
  (9, 4, 'privata', 60, 85, true),
  (10, 2, 'esterno', 85, 85, true)
ON CONFLICT (number) DO UPDATE SET
  seats = EXCLUDED.seats,
  zone = EXCLUDED.zone,
  position_x = EXCLUDED.position_x,
  position_y = EXCLUDED.position_y;

-- 4. Assicura che le colonne e le policy sulle prenotazioni siano a posto
DO $$ BEGIN
  ALTER TABLE reservations ADD COLUMN status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','completed','cancelled'));
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE reservations ADD COLUMN source TEXT DEFAULT 'website'
    CHECK (source IN ('website','phone','walk_in'));
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE reservations ADD COLUMN table_id UUID REFERENCES tables(id);
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- 5. Abilita la sincronizzazione Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE reservations;
ALTER PUBLICATION supabase_realtime ADD TABLE tables;
