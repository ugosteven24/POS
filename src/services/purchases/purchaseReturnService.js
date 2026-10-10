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
        return_number,
        total_amount,
        reason,
        notes,
        refund_method,
        status,
        returned_by,
        return_date,
        subtotal,
        total_quantity
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        pr.subtotal,
        pr.total_quantity AS purchase_return_quantity,
        pr.total_amount AS return_value,
        s.supplier_name AS supplier,

        p.invoice_number AS purchase_order,

        products.name AS product_name,
        products.sku As product_sku,
        products.id As product_id,
        products.unit_id AS product_unit,

        pri.id AS return_item_id,
        pri.quantity AS item_quantity,
        pri.unit_cost AS item_unit_cost,
        pri.total AS item_total,



        units.name As units_name,

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


      LEFT JOIN products
        ON products.id = pri.product_id



      LEFT JOIN units
        ON units.id = products.unit_id  
      ${whereClause}

      GROUP BY
        pr.id,
        pr.return_date,
        s.supplier_name,
        p.invoice_number,
        products.name,
        units.name,
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


export async function getPurchaseReturnById(returnId) {
  try {
    if (!returnId) {
      return {
        success: false,
        message: "Purchase return ID is required",
      };
    }

    // =========================
    // GET PURCHASE RETURN
    // =========================

    const [returns] = await db.query(
      `
      SELECT
        pr.id,
        pr.purchase_id,
        pr.supplier_id,
        pr.branch_id,
        pr.return_date,
        pr.reason,
        pr.refund_method,
        pr.subtotal,
        pr.discount,
        pr.tax,
        pr.total,
        pr.notes,
        pr.status,
        pr.created_by,
        pr.created_at,
        pr.updated_at,

        s.supplier_name AS supplier,
        p.invoice_number AS purchase_order

      FROM purchase_returns pr

      LEFT JOIN suppliers s
        ON s.id = pr.supplier_id

      LEFT JOIN purchases p
        ON p.id = pr.purchase_id

      WHERE pr.id = ?

      LIMIT 1
      `,
      [returnId]
    );

    if (returns.length === 0) {
      return {
        success: false,
        message: "Purchase return not found",
      };
    }

    const purchaseReturn = returns[0];

    // =========================
    // GET RETURN ITEMS
    // =========================

    const [items] = await db.query(
      `
      SELECT
        pri.id,
        pri.return_id,
        pri.product_id,
        pri.quantity,
        pri.unit_price,
        pri.total,

        products.name AS product_name,
        products.sku,
        products.unit_id,

        units.name AS unit_name

      FROM purchase_return_items pri

      LEFT JOIN products
        ON products.id = pri.product_id

      LEFT JOIN units
        ON units.id = products.unit_id

      WHERE pri.return_id = ?

      ORDER BY pri.id ASC
      `,
      [returnId]
    );

    return {
      success: true,

      data: {
        ...purchaseReturn,
        items,
      },
    };

  } catch (error) {
    console.error(
      "Get purchase return by ID error:",
      error
    );

    return {
      success: false,
      message: "Failed to fetch purchase return",
      data: null,
    };
  }
}


// Add this to services/purchases/purchaseReturnService.js
// (it already has the "use server" directive and the `db` import).
//
// ASSUMPTIONS: table `purchase_returns` with primary key `id` and columns
// return_date, reason, status, quantity. Rename to match your schema.
// If quantity lives in an items table instead, update that table too.



export async function updatePurchaseReturn({
  return_id,
  return_date,
  reason,
  notes,
  refund_method,
  status,
  item_product_id,
  item_quantity,
  item_unit_cost,
}) {
  let connection;

  try {
    // ==========================================
    // VALIDATION
    // ==========================================

    if (!return_id) {
      return {
        success: false,
        message: "Return ID is required",
      };
    }

    if (!return_date) {
      return {
        success: false,
        message: "Return date is required",
      };
    }

    if (!["Pending", "Completed", "Rejected"].includes(status)) {
      return {
        success: false,
        message: "Invalid status",
      };
    }

    if (!item_product_id) {
      return {
        success: false,
        message: "Product is required",
      };
    }

    if (!item_quantity || Number(item_quantity) <= 0) {
      return {
        success: false,
        message: "A valid quantity is required",
      };
    }

    if (
      item_unit_cost === undefined ||
      item_unit_cost === null ||
      Number(item_unit_cost) < 0
    ) {
      return {
        success: false,
        message: "A valid unit cost is required",
      };
    }

    const quantity = Number(item_quantity);
    const unitCost = Number(item_unit_cost);

    // ==========================================
    // CALCULATE TOTAL
    // ==========================================

    const total = quantity * unitCost;

    // ==========================================
    // START TRANSACTION
    // ==========================================

    connection = await db.getConnection();

    await connection.beginTransaction();

    // ==========================================
    // LOCK PURCHASE RETURN
    // ==========================================

    const [returnRows] = await connection.query(
      `
        SELECT id, status
        FROM purchase_returns
        WHERE id = ?
        FOR UPDATE
      `,
      [return_id]
    );

    if (returnRows.length === 0) {
      await connection.rollback();

      return {
        success: false,
        message: "Purchase return not found",
      };
    }

    if (returnRows[0].status !== "Pending") {
      await connection.rollback();

      return {
        success: false,
        message: "Only pending purchase returns can be edited",
      };
    }

    // ==========================================
    // VERIFY PRODUCT EXISTS
    // ==========================================

    const [productRows] = await connection.query(
      `
        SELECT id
        FROM products
        WHERE id = ?
      `,
      [item_product_id]
    );

    if (productRows.length === 0) {
      await connection.rollback();

      return {
        success: false,
        message: "Product not found",
      };
    }

    // ==========================================
    // UPDATE PURCHASE RETURN
    // ==========================================

    await connection.query(
      `
        UPDATE purchase_returns
        SET
          return_date = ?,
          reason = ?,
          notes = ?,
          refund_method = ?,
          status = ?,
          total_quantity = ?,
          subtotal = ?
        WHERE id = ?
      `,
      [
        return_date,
        reason?.trim() || null,
        notes?.trim() || null,
        refund_method?.trim() || null,
        status,
        quantity,
        total,
        return_id,
      ]
    );

    // ==========================================
    // UPDATE RETURN ITEM
    // ==========================================

    const [itemResult] = await connection.query(
      `
        UPDATE purchase_return_items
        SET
          product_id = ?,
          quantity = ?,
          unit_cost = ?,
          total = ?
        WHERE return_id = ?
      `,
      [
        item_product_id,
        quantity,
        unitCost,
        total,
        return_id,
      ]
    );

    // ==========================================
    // IF NO EXISTING ITEM, INSERT IT
    // ==========================================

    if (itemResult.affectedRows === 0) {
      await connection.query(
        `
          INSERT INTO purchase_return_items (
            return_id,
            product_id,
            quantity,
            unit_cost,
            total
          )
          VALUES (?, ?, ?, ?, ?)
        `,
        [
          return_id,
          item_product_id,
          quantity,
          unitCost,
          total,
        ]
      );
    }

    // ==========================================
    // COMMIT
    // ==========================================

    await connection.commit();

    return {
      success: true,
      message: "Purchase return updated successfully",
      total_quantity: quantity,
      total,
    };
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error(
          "Rollback error:",
          rollbackError
        );
      }
    }

    console.error(
      "Update purchase return error:",
      error
    );

    return {
      success: false,
      message: "Failed to update purchase return",
    };
  } finally {
    if (connection) {
      connection.release();
    }
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


