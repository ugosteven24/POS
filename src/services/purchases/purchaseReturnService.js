"use server";

import db from "@/lib/db";

export async function createPurchaseReturn(prevState, formData) {
  const connection = await db.getConnection();

  try {
    const payload = JSON.parse(formData.get("payload"));

    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO purchase_returns
      (
        purchase_id,
        supplier_id,
        return_date,
        reason,
        refund_method,
        subtotal,
        total_quantity,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.purchaseId,
        payload.supplierId || null,
        payload.returnDate,
        payload.reason,
        payload.refundMethod,
        payload.subtotal,
        payload.totalQuantity,
        payload.notes || null,
      ],
    );

    const purchaseReturnId = result.insertId;

    for (const item of payload.items) {
      await connection.execute(
        `INSERT INTO purchase_return_items
        (
          return_id,
          product_id,
          quantity,
          unit_cost,
          total
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
          purchaseReturnId,
          item.id,
          item.quantity,
          item.cost_price,
          item.quantity * item.cost_price,
        ]
      );
    }

    await connection.commit();

    return {
      success: true,
      message: "Purchase return saved successfully",
      purchaseReturnId,
    };
  } catch (error) {
    await connection.rollback();

    console.error(error);

    return {
      success: false,
      message: "Failed to save purchase return " + error,
    };
  } finally {
    connection.release();
  }
}




export async function getPurchaseReturnStats() {
  const [rows] = await db.query(
    `
    SELECT
      COUNT(*) AS total_returns,

      SUM(
        CASE
          WHEN status = 'Completed' THEN 1
          ELSE 0
        END
      ) AS completed_returns,

      SUM(
        CASE
          WHEN status = 'Pending' THEN 1
          ELSE 0
        END
      ) AS pending_returns,

      COALESCE(SUM(subtotal), 0) AS total_value

    FROM purchase_returns
  
  `);

  return rows[0];
}





export async function getPurchaseReturns({
  page = 1,
  limit = 6,
  search = "",
  status = "All",
  reason = "All",
  date = "",
} = {}) {
  try {
    const offset = (page - 1) * limit;

    const conditions = [
      `pr.status != 'deleted'`
    ];

    const params = [];

    // =========================
    // SEARCH
    // =========================

    if (search.trim()) {
      conditions.push(`
        (
          CAST(pr.id AS CHAR) LIKE ?
          OR s.supplier_name LIKE ?
          OR p.invoice_number LIKE ?
        )
      `);

      const searchValue = `%${search.trim()}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue
      );
    }

    // =========================
    // STATUS
    // =========================

    if (status !== "All") {
      conditions.push(`pr.status = ?`);
      params.push(status);
    }

    // =========================
    // REASON
    // =========================

    if (reason !== "All") {
      conditions.push(`pr.reason = ?`);
      params.push(reason);
    }

    // =========================
    // DATE
    // =========================

    if (date) {
      conditions.push(`
        pr.return_date >= ?
        AND pr.return_date < DATE_ADD(?, INTERVAL 1 DAY)
      `);

      params.push(date, date);
    }

    const whereClause = `
      WHERE ${conditions.join(" AND ")}
    `;

    // =========================
    // GET DATA
    // =========================

    const [rows] = await db.query(
      `
      SELECT
        pr.id AS return_id,
        pr.return_date,

        s.supplier_name AS supplier,

        p.invoice_number AS purchase_order,

        COUNT(DISTINCT pri.product_id) AS items,

        COALESCE(SUM(pri.quantity), 0) AS quantity,

        COALESCE(SUM(pri.total), 0) AS return_value,

        pr.reason,
        pr.status

      FROM purchase_returns pr

      LEFT JOIN suppliers s
        ON s.id = pr.supplier_id

      LEFT JOIN purchases p
        ON p.id = pr.purchase_id

      LEFT JOIN purchase_return_items pri
        ON pri.return_id = pr.id

      ${whereClause}

      GROUP BY
        pr.id,
        pr.return_date,
        s.supplier_name,
        p.invoice_number,
        pr.reason,
        pr.status

      ORDER BY pr.id DESC

      LIMIT ? OFFSET ?
      `,
      [
        ...params,
        Number(limit),
        Number(offset),
      ]
    );

    // =========================
    // COUNT FILTERED RECORDS
    // =========================

    const [countRows] = await db.query(
      `
      SELECT COUNT(DISTINCT pr.id) AS total

      FROM purchase_returns pr

      LEFT JOIN suppliers s
        ON s.id = pr.supplier_id

      LEFT JOIN purchases p
        ON p.id = pr.purchase_id

      ${whereClause}
      `,
      params
    );

    const total = Number(
      countRows[0]?.total || 0
    );

    return {
      success: true,
      data: rows,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(
        total / Number(limit)
      ),
    };

  } catch (error) {
    console.error(
      "Get purchase returns error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch purchase returns",
      data: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
    };
  }
}



export async function deletePurchaseReturn(returnId) {
  try {
    if (!returnId) {
      return {
        success: false,
        message: "Purchase return ID is required",
      };
    }

    const [result] = await db.execute(
      `
      UPDATE purchase_returns
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


