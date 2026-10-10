"use server";

import db from "@/lib/db";



// Keep your existing "use server" directive and `db` import at the top of the file.

export async function getUsers() {
    try {
        const [rows] = await db.query(`
            SELECT
                u.id            AS id,
                u.first_name    AS first_name,
                u.last_name     AS last_name,
                u.role_id       AS role_id,
                u.created_at    AS created_at,
                r.name          AS role_name
            FROM users u
            LEFT JOIN roles r ON r.id = u.role_id
            ORDER BY u.id DESC
        `);

        return rows.map((row) => ({
            id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            role_id: row.role_id ?? null,
            role: row.role_name ?? "No role",
            created_at: row.created_at
                ? new Date(row.created_at).toISOString()
                : null,
        }));
    } catch (error) {
        console.error("Get users error:", error);
        return [];
    }
}