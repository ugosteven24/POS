"use server";

import db from "@/lib/db";

export async function getTaxes() {
  try {

    const [taxes] = await db.execute(`
      SELECT
        id,
        name,
        rate
      FROM taxes
      WHERE status = 'active'
      ORDER BY name ASC
    `);

    return taxes;
   

  } catch (error) {

    console.error(
      "Get taxes error:",
      error
    );

    return {
      success: false,
      taxes: [],
      message: "Failed to load taxes.",
    };
  }
}