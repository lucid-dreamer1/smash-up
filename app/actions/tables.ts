"use server";

// Tables management is not used for the salon website.
// This file is kept as a stub for backward compatibility.

export async function createTable() {
  return { success: false, error: "Table management is not available." };
}

export async function updateTable() {
  return { success: false, error: "Table management is not available." };
}

export async function updateTablePosition() {
  return { success: true };
}

export async function deleteTable() {
  return { success: false, error: "Table management is not available." };
}
