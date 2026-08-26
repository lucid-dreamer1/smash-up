import { ServiceItem, Reservation } from "./types";

export const mockServiceItems: ServiceItem[] = [
  // ── Taglio & Piega ──
  {
    id: "t1",
    name: "Taglio Donna",
    description: "Consulenza personalizzata, taglio su misura studiato per la forma del viso e la texture del capello. Include lavaggio e asciugatura finale.",
    category: "taglio",
    available: true,
    featured: true,
  },
  {
    id: "t2",
    name: "Taglio + Piega",
    description: "Taglio di precisione con piega professionale liscia, mossa o a boccoli. Il pacchetto completo per un look perfetto.",
    category: "taglio",
    available: true,
    featured: true,
  },
  {
    id: "t3",
    name: "Piega Liscia o Mossa",
    description: "Piega professionale con lavaggio e styling completo. Disponibile liscia effetto seta, mossa naturale o a onde morbide.",
    category: "taglio",
    available: true,
    featured: false,
  },
  {
    id: "t4",
    name: "Taglio Bambina",
    description: "Taglio dedicato alle più piccole in un ambiente accogliente e divertente. Include lavaggio delicato e asciugatura.",
    category: "taglio",
    available: true,
    featured: false,
  },

  // ── Colore ──
  {
    id: "c1",
    name: "Balayage",
    description: "Tecnica di schiaritura a mano libera per un effetto naturale e luminoso. Schiariture sfumate e personalizzate per un risultato sunkissed.",
    category: "colore",
    available: true,
    featured: true,
  },
  {
    id: "c2",
    name: "Colpi di Sole",
    description: "Meches e colpi di sole con stagnola per riflessi definiti e luminosi. Disponibili in diverse intensità e nuance.",
    category: "colore",
    available: true,
    featured: true,
  },
  {
    id: "c3",
    name: "Colorazione Completa",
    description: "Colorazione professionale testa intera con prodotti di altissima qualità. Copertura perfetta dei capelli bianchi con risultato naturale.",
    category: "colore",
    available: true,
    featured: false,
  },
  {
    id: "c4",
    name: "Tonalizzazione",
    description: "Trattamento di colorazione semi-permanente per ravvivare il colore, eliminare i toni gialli e donare brillantezza estrema.",
    category: "colore",
    available: true,
    featured: false,
  },
  {
    id: "c5",
    name: "Ritocco Ricrescita",
    description: "Ritocco colore alla radice rapido e preciso per mantenere un look sempre perfetto tra una colorazione e l'altra.",
    category: "colore",
    available: true,
    featured: false,
  },

  // ── Trattamenti ──
  {
    id: "tr1",
    name: "Ricostruzione Cheratinica",
    description: "Trattamento intensivo alla cheratina che ripara la fibra capillare in profondità, ridona forza, elasticità e lucentezza ai capelli danneggiati.",
    category: "trattamenti",
    available: true,
    featured: true,
  },
  {
    id: "tr2",
    name: "Filler Capelli",
    description: "Trattamento rimpolpante di ultima generazione con acido ialuronico e collagene. Capelli visibilmente più pieni, morbidi e idratati.",
    category: "trattamenti",
    available: true,
    featured: true,
  },
  {
    id: "tr3",
    name: "Trattamento Anticrespo",
    description: "Lisciatura e disciplina per capelli ribelli e crespi. Effetto liscio naturale e seta che dura fino a 3 mesi.",
    category: "trattamenti",
    available: true,
    featured: false,
  },
  {
    id: "tr4",
    name: "Hair Spa & Detox",
    description: "Rituale benessere completo per cute e capelli: scrub purificante, massaggio rilassante, maschera nutriente e aromaterapia.",
    category: "trattamenti",
    available: true,
    featured: false,
  },

  // ── Sposa & Cerimonia ──
  {
    id: "s1",
    name: "Prova Sposa",
    description: "Sessione dedicata per provare l'acconciatura del grande giorno. Consulenza completa su stile, accessori e look coordinato con l'abito.",
    category: "sposa",
    available: true,
    featured: true,
  },
  {
    id: "s2",
    name: "Acconciatura Sposa",
    description: "Realizzazione dell'acconciatura il giorno delle nozze, con assistenza dedicata. Include ritocchi e prodotti premium per una tenuta perfetta.",
    category: "sposa",
    available: true,
    featured: true,
  },
  {
    id: "s3",
    name: "Acconciatura Cerimonia",
    description: "Look elegante e sofisticato per eventi speciali: battesimi, comunioni, cresime, gala e serate importanti.",
    category: "sposa",
    available: true,
    featured: false,
  },
  {
    id: "s4",
    name: "Extension Capelli",
    description: "Applicazione extension di alta qualità con metodo cheratina o clip per volume e lunghezza extra. Risultato naturale e duraturo.",
    category: "sposa",
    available: true,
    featured: false,
  },
];

// Legacy alias for backward compatibility
export const mockMenuItems = mockServiceItems;

export const mockReservationsData: Reservation[] = [
  {
    id: "1",
    name: "Maria Esposito",
    phone: "+39 333 123 4567",
    email: "maria.esposito@email.it",
    service: "Taglio + Piega",
    date: "2026-08-25",
    time: "10:00",
    notes: "Prima visita, vorrei un taglio medio",
    handled: true,
    status: "confirmed",
    source: "website",
    booking_flow: "inbox",
    response_token: null,
    responded_at: null,
    created_at: "2026-08-25T14:00:00Z",
  },
];
