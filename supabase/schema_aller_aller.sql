-- ═══════════════════════════════════════════════════════════════
-- SCHEMA COMPLETO ALL-IN-ONE — Allèr Allèr (Cucina Tradizionale · Caserta)
-- Esegui questo script nel "SQL Editor" del tuo nuovo progetto Supabase
-- ═══════════════════════════════════════════════════════════════

-- 1. Tabella TAVOLI (Tables)
CREATE TABLE IF NOT EXISTS tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number INTEGER UNIQUE NOT NULL,
  seats INTEGER NOT NULL DEFAULT 4,
  zone TEXT NOT NULL DEFAULT 'sala',
  position_x INTEGER DEFAULT 50,
  position_y INTEGER DEFAULT 50,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Popola i 10 tavoli di base
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

-- 2. Tabella PRENOTAZIONI (Reservations)
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  table_id UUID REFERENCES tables(id) ON DELETE SET NULL,
  handled BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'inbox' CHECK (status IN ('pending', 'completed', 'cancelled', 'inbox', 'confirmed', 'rejected', 'direct_pending')),
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'phone', 'walk_in')),
  booking_flow TEXT DEFAULT 'inbox' CHECK (booking_flow IN ('classic', 'inbox', 'direct')),
  response_token UUID DEFAULT NULL,
  responded_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reservations_response_token ON reservations (response_token) WHERE response_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_reservations_booking_flow ON reservations (booking_flow);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations (date);

-- 3. Tabella MENU ITEMS (Menu)
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(6,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('antipasti', 'primi', 'secondi', 'dolci')),
  available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  allergens TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Popola il menu tradizionale di Allèr Allèr
INSERT INTO menu_items (name, description, price, category, available, featured) VALUES
  -- Antipasti
  ('Antipasto della Casa', 'Selezione di salumi nostrani, provolone del Monaco DOP, sfizi fritti napoletani e verdure di stagione.', 13.00, 'antipasti', true, true),
  ('''O Pere e ''o Musso', 'La storica pietanza con zampetto e musetto di vitello conditi al momento con succo di limone e sale grosso.', 9.00, 'antipasti', true, false),
  ('Parmigiana di Melanzane', 'La parmigiana dorata e fritta secondo tradizione, con passata di pomodoro San Marzano e fior di latte filante.', 8.50, 'antipasti', true, true),
  ('Alici Fritte Dorate', 'Alici fresche del golfo panate e fritte croccanti, servite con spicchi di limone.', 9.00, 'antipasti', true, false),

  -- Primi Piatti
  ('Ziti spezzati alla Genovese', 'Il piatto simbolo: ziti spezzati a mano con il ragù bianco di cipolle ramate stufato per 10 ore.', 14.00, 'primi', true, true),
  ('Candele al Ragù Napoletano', 'La lenta cottura domenicale di 8 ore con carne selezionata di manzo e maiale, densa e corposa.', 13.50, 'primi', true, true),
  ('Pasta e Patate con Provola', 'La classica pasta mista trafilata al bronzo mantecata con patate e provola affumicata d''Agerola.', 12.00, 'primi', true, true),
  ('Gnocchi alla Sorrentina', 'Gnocchi di patate fatti in casa al forno nel coccio con pomodoro, basilico fresco e mozzarella filante.', 11.50, 'primi', true, false),

  -- Secondi Piatti
  ('''O Tianiello di Carni al Ragù', 'Braciola napoletana ripiena di aglio, prezzemolo, pinoli e uvetta, con tracchia e salsiccia nel sugo.', 16.00, 'secondi', true, true),
  ('Salsiccia e Friarielli', 'Salsiccia di maiale paesana a punta di coltello su letto di friarielli campani saltati con aglio e peperoncino.', 13.00, 'secondi', true, false),
  ('Frittura di Calamari e Gamberi', 'Paranza dorata e croccante con calamari locali e gamberi del Tirreno.', 15.50, 'secondi', true, false),
  ('Polpette al Ragù della Nonna', 'Morbide polpette di carne mista fritte e poi tuffate nel ragù caldo che pippia.', 11.00, 'secondi', true, false),

  -- Dolci
  ('Babà Napoletano al Rum', 'Il re dei dolci: lievitato soffice e bagnato a regola d''arte con rum invecchiato.', 6.00, 'dolci', true, true),
  ('Pastiera Tradizionale', 'Con grano cotto, ricotta fresca di pecora, millefiori e scorzette d''arancia candite.', 6.50, 'dolci', true, true),
  ('Delizia al Limone', 'Pan di spagna soffice farcito e ricoperto da vellutata crema ai limoni della costa.', 6.00, 'dolci', true, false),
  ('Torta Caprese', 'La celebre torta a base di mandorle e cioccolato fondente, servita con ciuffo di panna fresca.', 5.50, 'dolci', true, false)
ON CONFLICT DO NOTHING;

-- 4. Disabilita RLS per consentire il funzionamento pulito da app Next.js
ALTER TABLE tables DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;

-- 5. Abilita Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE reservations;
ALTER PUBLICATION supabase_realtime ADD TABLE tables;
