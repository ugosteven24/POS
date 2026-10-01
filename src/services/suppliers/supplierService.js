"use server";

import db from "@/lib/db";



export async function getSuppliers({
  page = 1,
  limit = 10,
  search = "",
  status = "All",
} = {})
 {
  try {
    const offset = (Number(page) - 1) * Number(limit);

    const conditions = [];
    const params = [];

    // ==========================================
    // HIDE DELETED SUPPLIERS
    // ==========================================

    conditions.push(`s.status != 'deleted'`);

    // ==========================================
    // SEARCH
    // ==========================================

    if (search.trim()) {
      conditions.push(`
        (
          s.supplier_name LIKE ?
          OR s.company_name LIKE ?
          OR s.phone LIKE ?
          OR s.alternate_phone LIKE ?
          OR s.email LIKE ?
          OR s.tax_number LIKE ?
          OR s.city LIKE ?
          OR s.state LIKE ?
        )
      `);

      const searchValue = `%${search.trim()}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue
      );
    }

    // ==========================================
    // STATUS
    // ==========================================

    if (status !== "All") {
      conditions.push(`s.status = ?`);
      params.push(status);
    }

    const whereClause = `
      WHERE ${conditions.join(" AND ")}
    `;

    // ==========================================
    // GET SUPPLIERS
    // ==========================================

    const [rows] = await db.query(
      `
      SELECT
        s.id,
        s.supplier_name,
        s.company_name,
        s.phone,
        s.alternate_phone,
        s.email,
        s.address,
        s.city,
        s.state,
        s.country,
        s.tax_number,
        s.payment_terms,
        s.opening_balance,
        s.balance_type,
        s.status,
        s.notes,
        s.created_at,
        s.updated_at,

        -- Number of purchases
        COUNT(p.id) AS purchase_count,

        -- Total amount purchased from supplier
        COALESCE(SUM(p.total), 0) AS total_purchase,

        -- Amount still owed to supplier
        COALESCE(SUM(p.due_amount), 0) AS outstanding_balance

      FROM suppliers s

      LEFT JOIN purchases p
        ON p.supplier_id = s.id

      ${whereClause}

      GROUP BY
        s.id,
        s.supplier_name,
        s.company_name,
        s.phone,
        s.alternate_phone,
        s.email,
        s.address,
        s.city,
        s.state,
        s.country,
        s.tax_number,
        s.payment_terms,
        s.opening_balance,
        s.balance_type,
        s.status,
        s.notes,
        s.created_at,
        s.updated_at

      ORDER BY s.id DESC

      LIMIT ? OFFSET ?
      `,
      [
        ...params,
        Number(limit),
        Number(offset),
      ]
    );

    // ==========================================
    // COUNT SUPPLIERS
    // ==========================================

    const [countRows] = await db.query(
      `
      SELECT COUNT(*) AS total

      FROM suppliers s

      ${whereClause}
      `,
      params
    );

    const total = Number(
      countRows[0]?.total || 0
    );

    return {
      success: true,

      data: rows.map((supplier) => ({
        ...supplier,

        id: Number(supplier.id),

        opening_balance: Number(
          supplier.opening_balance || 0
        ),

        purchase_count: Number(
          supplier.purchase_count || 0
        ),

        total_purchase: Number(
          supplier.total_purchase || 0
        ),

        outstanding_balance: Number(
          supplier.outstanding_balance || 0
        ),
      })),

      total,

      page: Number(page),

      limit: Number(limit),

      totalPages: Math.ceil(
        total / Number(limit)
      ),
    };

  } catch (error) {
    console.error(
      "Get suppliers error:",
      error
    );

    return {
      success: false,

      message: "Failed to fetch suppliers",

      data: [],

      total: 0,

      page: Number(page),

      limit: Number(limit),

      totalPages: 0,
    };
  }
}



export async function getSupplierStats() {
  try {
    // ==========================================
    // SUPPLIER STATS
    // ==========================================

    const [supplierRows] = await db.query(`
      SELECT
        COUNT(*) AS total_suppliers,

        SUM(
          CASE
            WHEN status = 'active' THEN 1
            ELSE 0
          END
        ) AS active_suppliers

      FROM suppliers

      WHERE status != 'deleted'
    `);

    // ==========================================
    // PURCHASE STATS
    // ==========================================

    const [purchaseRows] = await db.query(`
      SELECT
        COALESCE(SUM(p.total), 0) AS total_purchases,

        COALESCE(SUM(p.due_amount), 0) AS outstanding_balance

      FROM purchases p

      INNER JOIN suppliers s
        ON s.id = p.supplier_id

      WHERE s.status != 'deleted'
    `);

    const supplierStats = supplierRows[0] || {};
    const purchaseStats = purchaseRows[0] || {};

    return {
      success: true,

      data: {
        totalSuppliers: Number(
          supplierStats.total_suppliers || 0
        ),

        activeSuppliers: Number(
          supplierStats.active_suppliers || 0
        ),

        totalPurchases: Number(
          purchaseStats.total_purchases || 0
        ),

        outstandingBalance: Number(
          purchaseStats.outstanding_balance || 0
        ),
      },
    };

  } catch (error) {
    console.error(
      "Get supplier stats error:",
      error
    );

    return {
      success: false,

      message: "Failed to fetch supplier statistics",

      data: {
        totalSuppliers: 0,
        activeSuppliers: 0,
        totalPurchases: 0,
        outstandingBalance: 0,
      },
    };
  }
}


export async function deleteSupplierReturn(returnId) {
  try {
    if (!returnId) {
      return {
        success: false,
        message: "Purchase return ID is required",
      };
    }

    const [result] = await db.execute(
      `
      UPDATE suppliers
      SET status = 'Deleted'
      WHERE id = ?
      AND status <> 'Deleted'
      `,
      [returnId]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Purchase return not found or already deleted",
      };
    }

    return {
      success: true,
      message: "Purchase return deleted successfully",
    };

  } catch (error) {
    console.error(
      "Delete purchase return error:",
      error
    );

    return {
      success: false,
      message: "Failed to delete purchase return",
    };
  }
}