"use server";

import { revalidatePath } from "next/cache";
import type { Table, TableZone } from "@/lib/types";
import { mockTables } from "@/lib/mock-data";

async function getSupabase() {
  const { createClient } = await import("@/lib/supabase/server");
  return createClient();
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key && !url.includes("your-project");
}

export async function createTable(data: {
  number: number;
  seats: number;
  zone: TableZone;
  position_x?: number;
  position_y?: number;
}): Promise<{ success: boolean; table?: Table; error?: string }> {
  const posX = data.position_x ?? 50;
  const posY = data.position_y ?? 50;

  try {
    if (!isSupabaseConfigured()) {
      const mockTable: Table = {
        id: crypto.randomUUID(),
        number: data.number,
        seats: data.seats,
        zone: data.zone,
        active: true,
        position_x: posX,
        position_y: posY,
      };
      revalidatePath("/admin/dashboard");
      return { success: true, table: mockTable };
    }

    const supabase = await getSupabase();

    // 1. Try inserting with position coordinates
    let insertResult = await supabase
      .from("tables")
      .insert({
        number: data.number,
        seats: data.seats,
        zone: data.zone,
        active: true,
        position_x: posX,
        position_y: posY,
      })
      .select()
      .single();

    // 2. If position columns don't exist in Supabase schema yet, fallback to inserting core columns
    if (insertResult.error && insertResult.error.message.includes("position")) {
      insertResult = await supabase
        .from("tables")
        .insert({
          number: data.number,
          seats: data.seats,
          zone: data.zone,
          active: true,
        })
        .select()
        .single();
    }

    if (insertResult.error) {
      console.error("Create table error:", insertResult.error);
      return { success: false, error: insertResult.error.message };
    }

    const createdTable: Table = {
      ...(insertResult.data as Table),
      position_x: posX,
      position_y: posY,
    };

    revalidatePath("/admin/dashboard");
    return { success: true, table: createdTable };
  } catch (err) {
    console.error("createTable error:", err);
    return { success: false, error: "Errore durante la creazione del tavolo." };
  }
}

export async function updateTable(
  id: string,
  data: Partial<Table>
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      revalidatePath("/admin/dashboard");
      return { success: true };
    }

    const supabase = await getSupabase();

    // Check if table already exists in DB
    const { data: existing } = await supabase
      .from("tables")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (!existing) {
      // Table doesn't exist in Supabase yet (was a mock item) -> insert it with the ID!
      const mockMatch = mockTables.find((t) => t.id === id);
      const newTable = {
        id,
        number: data.number ?? mockMatch?.number ?? 1,
        seats: data.seats ?? mockMatch?.seats ?? 4,
        zone: data.zone ?? mockMatch?.zone ?? "sala",
        active: data.active ?? true,
      };

      let insertRes = await supabase.from("tables").insert(newTable);
      if (insertRes.error) {
        console.error("Insert missing table error:", insertRes.error);
      }
    } else {
      const updatePayload: Record<string, unknown> = {};
      if (data.number !== undefined) updatePayload.number = data.number;
      if (data.seats !== undefined) updatePayload.seats = data.seats;
      if (data.zone !== undefined) updatePayload.zone = data.zone;
      if (data.active !== undefined) updatePayload.active = data.active;
      if (data.position_x !== undefined) updatePayload.position_x = data.position_x;
      if (data.position_y !== undefined) updatePayload.position_y = data.position_y;

      let { error } = await supabase
        .from("tables")
        .update(updatePayload)
        .eq("id", id);

      if (error && error.message.includes("position")) {
        delete updatePayload.position_x;
        delete updatePayload.position_y;
        const retry = await supabase
          .from("tables")
          .update(updatePayload)
          .eq("id", id);
        error = retry.error;
      }

      if (error) {
        console.error("Update table error:", error);
        return { success: false, error: error.message };
      }
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err) {
    console.error("updateTable error:", err);
    return { success: false, error: "Errore durante l'aggiornamento del tavolo." };
  }
}

export async function updateTablePosition(
  id: string,
  position_x: number,
  position_y: number
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    const supabase = await getSupabase();

    // Check if table exists
    const { data: existing } = await supabase
      .from("tables")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (!existing) {
      const mockMatch = mockTables.find((t) => t.id === id);
      if (mockMatch) {
        await supabase.from("tables").insert({
          id,
          number: mockMatch.number,
          seats: mockMatch.seats,
          zone: mockMatch.zone,
          active: mockMatch.active,
        });
      }
    }

    await supabase
      .from("tables")
      .update({ position_x, position_y })
      .eq("id", id);

    return { success: true };
  } catch {
    return { success: true };
  }
}

export async function deleteTable(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isSupabaseConfigured()) {
      revalidatePath("/admin/dashboard");
      return { success: true };
    }

    const supabase = await getSupabase();

    // 1. Unassign reservations from this table
    await supabase
      .from("reservations")
      .update({ table_id: null })
      .eq("table_id", id);

    // 2. Delete table
    const { error } = await supabase
      .from("tables")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete table error:", error);
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err) {
    console.error("deleteTable error:", err);
    return { success: false, error: "Errore durante l'eliminazione del tavolo." };
  }
}
