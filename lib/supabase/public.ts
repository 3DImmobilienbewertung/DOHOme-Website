// Öffentlicher, nur-lesender Supabase-Client (anon key).
// Nutzt ausschließlich die Aggregations-Views (public_project_*), nie `units`.
// Keine Session/Cookies nötig – die Daten sind öffentlich.

import { createClient } from "@supabase/supabase-js";

export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase-Umgebungsvariablen fehlen: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ---- Typen der Aggregations-Views (1:1 zu 0002_public_website_interface.sql) ----

export type ProjectSummary = {
  project_id: string;
  slug: string;
  name: string;
  phase: "zukuenftig" | "laufend" | "abgeschlossen";
  is_flagship: boolean;
  city: string | null;
  postal_code: string | null;
  available_total: number;
  available_for_sale: number;
  available_for_rent: number;
  area_sqm_min: number | null;
  area_sqm_max: number | null;
  rooms_min: number | null;
  rooms_max: number | null;
  sale_price_min: number | null;
  sale_price_max: number | null;
  price_per_sqm_from: number | null;
  rent_price_min: number | null;
  rent_price_max: number | null;
  earliest_available_from: string | null;
  updated_at: string;
};

export type ProjectPlan = {
  project_id: string;
  title: string;
  plan_type: "grundriss" | "lageplan" | "baubeschreibung" | "energieausweis" | "sonstiges";
  rooms: number | null;
  area_sqm: number | null;
  file_url: string;
  file_size_kb: number | null;
  sort_order: number;
};
