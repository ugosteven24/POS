
"use server";

import db from "@/lib/db";

export async function CreatePurchases(prevState, formData) {
  try {
    const branchId = formData.get("branch_id");
    const supplierId = formData.get("supplier_id");
    const paymentMethodId = formData.get("payment_method");
    const invoiceNumber = formData.get("invoice_number");
    const notes = formData.get("notes");
    const subtotal = Number(formData.get("subtotal") || 0);
    const discount = Number(formData.get("discount") || 0);
    const tax = Number(formData.get("tax") || 0);
    const shipping = Number(formData.get("shipping") || 0);
    const total = Number(formData.get("total") || 0);
    const paidAmount = Number(formData.get("paid_amount") || 0);
    const dueAmount = Number(formData.get("due_amount") || 0);
    const status = formData.get("status");
    const purchaseDate = formData.get("purchase_date");

    // Cart is sent as JSON
    const items = JSON.parse(formData.get("items") || "[]");

    if (!supplierId) {
      return {
        success: false,
        message: "Please select a supplier.",
      };
    }

    if (!items.length) {
      return {
        success: false,
        message: "Please add at least one product.",
      };
    }

    // ==========================================
    // INSERT PURCHASE
    // ==========================================

    const [purchaseResult] = await db.execute(
      `
      INSERT INTO purchases (
        branch_id,
        supplier_id,
        payment_method_id,
        invoice_number,
        notes,
        subtotal,
        discount,
        tax,
        shipping,
        total,
        paid_amount,
        due_amount,
        status,
        purchase_date,
        created_by,
        created_at
      )
      VALUES (?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      `,
      [
        branchId || 1,
        supplierId,
        paymentMethodId || null,
        invoiceNumber || null,
        notes,
        subtotal,
        discount,
        tax,
        shipping,
        total,
        paidAmount,
        dueAmount,
        status,
        purchaseDate,
        null, // replace with logged-in user ID
      ]
    );

    const purchaseId = purchaseResult.insertId;

    // ==========================================
    // INSERT PURCHASE ITEMS
    // ==========================================

    for (const item of items) {
      await db.execute(
        `
        INSERT INTO purchase_items (
          purchase_id,
          product_id,
          quantity,
          unit_cost,
          discount,
          tax,
          total
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          purchaseId,
          item.id,
          Number(item.quantity),
          Number(item.unitCost),
          discount,
          tax,
          Number(item.quantity) * Number(item.unitCost),
        ]
      );
    }

    return {
      success: true,
      message: "Purchase created successfully.",
      purchaseId,
    };

  } catch (error) {
    console.error("Create purchase error:", error);

    return {
      success: false,
      message: "Failed to create purchase.",
    };
  }
}








export default async function getPurchaseStats() {
  try {
    const [rows] = await db.query(`
      SELECT
        COUNT(*) AS total,

        SUM(
          CASE
            WHEN status = 'Received' THEN 1
            ELSE 0
          END
        ) AS received,

        SUM(
          CASE
            WHEN status = 'Pending' THEN 1
            ELSE 0
          END
        ) AS pending,

        COALESCE(SUM(total), 0) AS purchaseValue,

        COALESCE(SUM(due_amount), 0) AS outstanding

      FROM purchases
    `);

    return rows[0];

  } catch (error) {
    console.error("getPurchaseStats:", error);

    return {
      total: 0,
      received: 0,
      pending: 0,
      purchaseValue: 0,
      outstanding: 0,
    };
  }
}




export async function getPurchases({
  page = 1,
  limit = 20,
  search = "",
  status = "All",
  payment = "All",
  date = "All",
  branchId = "All",
}) {
  try {
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];

    // =========================================================
    // SEARCH
    // =========================================================

    if (search.trim()) {
      conditions.push(`
        (
          CAST(p.id AS CHAR) LIKE ?
          OR p.invoice_number LIKE ?
          OR s.name LIKE ?
          OR p.created_by LIKE ?
        )
      `);

      const searchValue = `%${search.trim()}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue,
        searchValue
      );
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

    if (payment !== "All") {
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
    }

    // =========================================================
    // DATE
    // =========================================================

    if (date === "Today") {
      conditions.push(`
        DATE(p.purchase_date) = CURDATE()
      `);
    }

    if (date === "Yesterday") {
      conditions.push(`
        DATE(p.purchase_date) =
        CURDATE() - INTERVAL 1 DAY
      `);
    }

    // =========================================================
    // BRANCH
    // =========================================================

    if (branchId !== "All") {
      conditions.push(`
        p.branch_id = ?
      `);

      params.push(branchId);
    }

    // =========================================================
    // WHERE
    // =========================================================

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    // =========================================================
    // PURCHASES
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


        -- SUPPLIER

        s.name AS supplier_name,

        s.phone AS supplier_phone,


        -- BRANCH

        b.name AS warehouse_name,


        -- ITEMS

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

        s.name,

        s.phone,

        b.name


      ORDER BY
        p.created_at DESC


      LIMIT ? OFFSET ?
      `,
      [
        ...params,
        Number(limit),
        Number(offset),
      ]
    );

    // =========================================================
    // HAS MORE
    // =========================================================

    const hasMore =
      rows.length === Number(limit);

    return {
      success: true,

      purchases: rows,

      pagination: {
        page: Number(page),
        limit: Number(limit),
        hasMore,
      },
    };

  } catch (error) {

    console.error(
      "Get purchases error:",
      error
    );

    return {
      success: false,

      purchases: [],

      pagination: {
        page,
        limit,
        hasMore: false,
      },

      message:
        "Failed to fetch purchases.",
    };
  }
}