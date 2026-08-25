-- ═══════════════════════════════════════════════════════════════
-- SCHEMA COMPLETO ALL-IN-ONE — SMASH UP (Real American Smash Burger)
-- Esegui questo script nel "SQL Editor" del tuo progetto Supabase
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
  (9, 4, 'sala', 60, 85, true),
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

-- Popola il menu ufficiale di Smash Up
INSERT INTO menu_items (name, description, price, category, available, featured) VALUES
  -- Smash Burgers (Primi)
  ('The OG Double Smash', 'Doppio patty Black Angus smashed sottile e croccante, doppio American cheddar fuso, cetriolini pickles, cipolla tritata e salsa segreta Smash Up in potato bun tostato.', 9.50, 'primi', true, true),
  ('Bacon Beast Smash', 'Doppio Black Angus smashed con crosticina dorata, triplo bacon croccante al miele, doppio cheddar, cipolla caramellata e salsa BBQ affumicata.', 11.00, 'primi', true, true),
  ('Truffle & Crispy', 'Doppio patty smashed, provola affumicata campana fusa alla piastra, crema di tartufo nero estivo, cipolla fritta croccante e maionese al pepe nero.', 12.50, 'primi', true, true),
  ('Spicy Diablo Smash', 'Doppio Black Angus, formaggio Pepper Jack piccante, jalapeños croccanti, bacon glassato all''hot honey e maionese alla ''nduja calabrese.', 11.50, 'primi', true, false),
  ('Triple Monster Smash (270g)', 'Tre patty Black Angus da 90g schiacciati al massimo, triplo cheddar fuso, doppio bacon, cetriolini e doppia salsa della casa.', 13.50, 'primi', true, false),

  -- Crispy Starters (Antipasti)
  ('Nashville Hot Chicken Bun', 'Coscia di pollo marinata nel latticello per 24h, panatura extra crunchy con spezie Nashville, coleslaw fresca, pickles e maionese al miele piccante.', 10.50, 'antipasti', true, true),
  ('Crispy Chicken Tenders (5pz)', 'Filetti di pollo fresco con doppia impanatura croccante ai cornflakes, serviti con salsa ranch e salsa barbecue artigianale.', 6.50, 'antipasti', true, false),
  ('Beer Battered Onion Rings (8pz)', 'Anelli di cipolla interi dorati e pastellati alla birra artigianale, serviti caldi e croccantissimi con salsa smash.', 5.00, 'antipasti', true, false),
  ('Mozzarella Sticks Filanti (6pz)', 'Bastoncini di vera mozzarella campana dorati all''esterno e morbidamente filanti all''interno con salsa al pomodoro e origano.', 5.50, 'antipasti', true, false),

  -- Loaded Fries (Secondi)
  ('Smash Loaded Fries', 'Patatine fritte con la buccia dorate e croccanti, colata di formaggio cheddar caldo fuso, crumble di bacon croccante e salsa smash.', 6.50, 'secondi', true, true),
  ('Truffle & Parmesan Fries', 'Patatine fritte speziate con fonduta tiepida di Parmigiano Reggiano 24 mesi e gocce di olio al tartufo nero pregiato.', 7.00, 'secondi', true, false),
  ('Diablo Spicy Fries', 'Patatine croccanti con polvere di peperoncino affumicato, jalapeños a rondelle, cheddar fuso e maionese piccante.', 6.50, 'secondi', true, false),
  ('Classic Skin-On Fries', 'Porzione classica di patatine fritte dorate con sale marino di Cervia e mix di spezie Smash Up.', 4.00, 'secondi', true, false),

  -- Sweets & Drinks (Dolci)
  ('Sweet Smash Bun Nutella & Oreo', 'Potato bun tostato al burro, farcito con abbondante Nutella calda colante e granella croccante di biscotti Oreo.', 5.50, 'dolci', true, true),
  ('Pistachio Bomb Bun', 'Bun dolce tostato e ripieno di crema vellutata al pistacchio di Bronte pura, gocce di cioccolato bianco e granella.', 6.00, 'dolci', true, true),
  ('Cheesecake New York Style', 'La classica torta al formaggio newyorkese con base biscottata al burro e coulis ai frutti di bosco o caramello salato.', 5.50, 'dolci', true, false),
  ('Birre Artigianali IPA / Blonde', 'Selezione di birre artigianali alla spina e in lattina, perfette in abbinamento con il nostro smash burger.', 5.00, 'dolci', true, false)
ON CONFLICT DO NOTHING;

-- 4. Disabilita RLS per consentire il funzionamento pulito da Server Actions Next.js
ALTER TABLE tables DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;

-- 5. Abilita Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE reservations;
ALTER PUBLICATION supabase_realtime ADD TABLE tables;
