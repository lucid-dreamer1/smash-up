-- ==============================================================================
-- RESET COMPLETO & SCHEMA — CAPPIELLO HAIR & BEAUTY (Salone Parrucchiere Caserta)
-- Copia e incolla TUTTO questo script nell'SQL Editor di Supabase e premi "RUN".
-- ==============================================================================

-- 0. PULIZIA TOTALE (Elimina vecchie tabelle e dati)
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS tables CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- 1. TABELLA SERVIZI DEL SALONE (Services)
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('taglio', 'colore', 'trattamenti', 'sposa')),
  available BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELLA PRENOTAZIONI / APPUNTAMENTI (Reservations)
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  service TEXT NOT NULL DEFAULT 'Appuntamento',
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'inbox' CHECK (status IN ('pending', 'inbox', 'direct_pending', 'confirmed', 'rejected', 'completed', 'cancelled')),
  source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'phone', 'walk_in', 'whatsapp')),
  booking_flow TEXT NOT NULL DEFAULT 'inbox' CHECK (booking_flow IN ('classic', 'inbox', 'direct')),
  response_token UUID,
  responded_at TIMESTAMPTZ,
  handled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indici per velocizzare le query
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_token ON reservations(response_token);
CREATE INDEX idx_services_category ON services(category);

-- 3. ABILITA ROW LEVEL SECURITY (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- 4. POLICY DI SICUREZZA PER I SERVIZI
CREATE POLICY "Servizi visibili a tutti" ON services
  FOR SELECT USING (true);

CREATE POLICY "Servizi modificabili solo da autenticati" ON services
  FOR ALL USING (auth.role() = 'authenticated');

-- 5. POLICY DI SICUREZZA PER LE PRENOTAZIONI
CREATE POLICY "Chiunque può creare prenotazioni" ON reservations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Autenticati possono gestire prenotazioni" ON reservations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Accesso tramite response_token per 1-click action" ON reservations
  FOR SELECT USING (response_token IS NOT NULL);

CREATE POLICY "Aggiornamento tramite response_token" ON reservations
  FOR UPDATE USING (response_token IS NOT NULL);

-- 6. ABILITA REALTIME SU PRENOTAZIONI E SERVIZI
ALTER PUBLICATION supabase_realtime ADD TABLE reservations;
ALTER PUBLICATION supabase_realtime ADD TABLE services;

-- 7. POPOLA IL CATALOGO DEI SERVIZI DI CAPPIELLO HAIR & BEAUTY
INSERT INTO services (id, name, description, category, available, featured) VALUES
  ('t1', 'Taglio Donna', 'Consulenza personalizzata, taglio su misura studiato per la forma del viso e la texture del capello.', 'taglio', true, true),
  ('t2', 'Taglio + Piega', 'Taglio di precisione con piega professionale liscia, mossa o a boccoli. Il look completo.', 'taglio', true, true),
  ('t3', 'Piega Liscia o Mossa', 'Piega professionale con lavaggio e styling completo.', 'taglio', true, false),
  ('t4', 'Taglio Bambina', 'Taglio delicato dedicato alle più piccole in un ambiente accogliente.', 'taglio', true, false),
  ('c1', 'Balayage', 'Tecnica di schiaritura a mano libera per un effetto naturale, luminoso e sfumato.', 'colore', true, true),
  ('c2', 'Colpi di Sole', 'Meches e colpi di sole con stagnola per riflessi definiti e luminosi.', 'colore', true, true),
  ('c3', 'Colorazione Completa', 'Colorazione professionale testa intera con prodotti di altissima qualità.', 'colore', true, false),
  ('c4', 'Tonalizzazione', 'Trattamento di colorazione semi-permanente per brillantezza estrema.', 'colore', true, false),
  ('c5', 'Ritocco Ricrescita', 'Ritocco colore alla radice rapido e preciso.', 'colore', true, false),
  ('tr1', 'Ricostruzione Cheratinica', 'Trattamento intensivo alla cheratina che ripara la fibra capillare in profondità.', 'trattamenti', true, true),
  ('tr2', 'Filler Capelli', 'Trattamento rimpolpante con acido ialuronico e collagene per capelli corposi e idratati.', 'trattamenti', true, true),
  ('tr3', 'Trattamento Anticrespo', 'Lisciatura e disciplina per capelli ribelli fino a 3 mesi.', 'trattamenti', true, false),
  ('tr4', 'Hair Spa & Detox', 'Rituale benessere con scrub purificante, massaggio rilassante e maschera nutriente.', 'trattamenti', true, false),
  ('s1', 'Prova Sposa', 'Sessione dedicata per definire lo stile dell''acconciatura del grande giorno.', 'sposa', true, true),
  ('s2', 'Acconciatura Sposa', 'Realizzazione acconciatura il giorno delle nozze con prodotti a lunga tenuta e assistenza.', 'sposa', true, true),
  ('s3', 'Acconciatura Cerimonia', 'Look elegante e sofisticato per eventi speciali e gala.', 'sposa', true, false),
  ('s4', 'Extension Capelli', 'Applicazione extension di alta qualità per volume e lunghezza extra.', 'sposa', true, false);
