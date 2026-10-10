"use server";

import db from "@/lib/db";

export async function getPurchases({
  page = 1,
  limit = 20,
  search = "",
  status = "All",
  payment = "All",
  date = "All",
  warehouse = "All",
}) {
  try {
    const offset = (Number(page) - 1) * Number(limit);

    // =========================================================
    // CONDITIONS
    // =========================================================

    const conditions = [`p.status != 'delete'`];

    const params = [];

    // =========================================================
    // SEARCH
    // =========================================================

    if (search.trim()) {
      const searchValue = `%${search.trim()}%`;

      conditions.push(`
        (
          CAST(p.id AS CHAR) LIKE ?
          OR p.invoice_number LIKE ?
          OR s.supplier_name LIKE ?
          OR p.created_by LIKE ?
        )
      `);

      params.push(searchValue, searchValue, searchValue, searchValue);
    }

    // =========================================================
    // STATUS
    // =========================================================

    if (status !== "All") {
      conditions.push(`
        p.status = ?
      `);

      params.push(status);
    }

    // =========================================================
    // PAYMENT
    // =========================================================

    if (payment === "Paid") {
      conditions.push(`
        p.paid_amount >= p.total
      `);
    }

    if (payment === "Partial") {
      conditions.push(`
        p.paid_amount > 0
        AND p.paid_amount < p.total
      `);
    }

    if (payment === "Unpaid") {
      conditions.push(`
        p.paid_amount <= 0
      `);
    }

    // =========================================================
    // DATE
    // =========================================================

    /* =========================================
     DATE
  ========================================= */

    if (date) {
      conditions.push(`
    DATE(p.purchase_date) = ?
  `);

      params.push(date);
    }

    // =========================================================
    // WAREHOUSE / BRANCH
    // =========================================================

    if (warehouse !== "All") {
      conditions.push(`
        b.name = ?
      `);

      params.push(warehouse);
    }

    // =========================================================
    // WHERE
    // =========================================================

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // =========================================================
    // QUERY
    // =========================================================

    const [rows] = await db.query(
      `
      SELECT

        p.id,
        p.branch_id,
        p.supplier_id,
        p.invoice_number,
        p.notes,

        p.subtotal,
        p.discount,
        p.tax,
        p.total,

        p.paid_amount AS paid,
        p.due_amount AS balance,

        CASE
          WHEN p.paid_amount <= 0
            THEN 'Unpaid'

          WHEN p.paid_amount < p.total
            THEN 'Partial'

          ELSE 'Paid'
        END AS payment,

        p.status,
        p.purchase_date,
        p.created_by,
        p.created_at,

        s.supplier_name AS supplier_name,
        s.phone AS supplier_phone,

        products.name AS product_name,

        b.name AS warehouse_name,

        COUNT(pi.id) AS items_count,

        COALESCE(
          SUM(pi.quantity),
          0
        ) AS total_quantity

      FROM purchases p

      LEFT JOIN suppliers s
        ON s.id = p.supplier_id

      LEFT JOIN branches b
        ON b.id = p.branch_id

   LEFT JOIN purchase_items pi
        ON pi.purchase_id = p.id
      LEFT JOIN products
        ON products.id = pi.product_id


   

      ${whereClause}

      GROUP BY

        p.id,
        p.branch_id,
        p.supplier_id,
        p.invoice_number,
        p.notes,

        p.subtotal,
        p.discount,
        p.tax,
        p.total,

        p.paid_amount,
        p.due_amount,

        p.status,
        p.purchase_date,
        p.created_by,
        p.created_at,

        products.name,

        s.supplier_name,
        s.phone,

        b.name

      ORDER BY
        p.created_at DESC

      LIMIT ? OFFSET ?
      `,
      [...params, Number(limit), Number(offset)],
    );

    // =========================================================
    // RETURN
    // =========================================================

    return {
      success: true,

      purchases: rows,

      pagination: {
        page: Number(page),
        limit: Number(limit),
        hasMore: rows.length === Number(limit),
      },
    };
  } catch (error) {
    console.error("Get purchases error:", error);

    return {
      success: false,

      purchases: [],

      pagination: {
        page: Number(page),
        limit: Number(limit),
        hasMore: false,
      },

      message: error.message || "Failed to fetch purchases.",
    };
  }
}

export async function deactivatePurchase(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "purchases ID is required",
      };
    }

    const [result] = await db.query(
      `
        UPDATE  purchases
        SET status = 'delete'
        WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "purchases not found",
      };
    }

    return {
      success: true,
      message: "purchases deactivated successfully",
    };
  } catch (error) {
    console.error("Deactivate purchases error:", error);

    return {
      success: false,
      message: "Failed to deactivate purchases",
    };
  }
}

export async function getPurchasesAll() {
  const [rows] = await db.query(`
    SELECT
      p.id,
      p.branch_id,
      p.supplier_id,
      p.invoice_number,
      p.notes,

      p.subtotal,
      p.discount,
      p.tax,
      p.total As amount,

      p.paid_amount AS paid,
      p.due_amount AS balance,
      p.status,
      p.purchase_date AS purchase_date,
      p.created_by,
      p.created_at,

      s.supplier_name AS supplier_name,
       s.company_name AS company_name,
        s.payment_terms AS payment_terms,

       s.id AS supplier_id,
      s.phone AS supplier_phone

    FROM purchases p

    LEFT JOIN suppliers s
      ON s.id = p.supplier_id
  `);

  return rows;
}
