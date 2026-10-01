"use server";

import db from "@/lib/db";

export async function GetProductOptions() {
  try {
    const [
      [categories],
      [brands],
      [units],
      [taxes],
      [suppliers],
    ] = await Promise.all([
      db.execute(`
        SELECT id, name
        FROM categories
        ORDER BY name ASC
      `),

      db.execute(`
        SELECT id, name
        FROM brands
        ORDER BY name ASC
      `),

      db.execute(`
        SELECT id, name
        FROM units
        ORDER BY name ASC
      `),

      db.execute(`
        SELECT id, name, rate
        FROM taxes
        ORDER BY name ASC
      `),

      db.execute(`
        SELECT id, name
        FROM suppliers
        ORDER BY name ASC
      `),
    ]);

    return {
      success: true,

      categories,
      brands,
      units,
      taxes,
      suppliers,
    };

  } catch (error) {

    console.error(
      "Get product options error:",
      error
    );

    return {
      success: false,
      message: "Failed to load product options.",

      categories: [],
      brands: [],
      units: [],
      taxes: [],
      suppliers: [],
    };
  }
}