"use server";

import db from "@/lib/db";


// ======================================================
// GET CUSTOMERS
// ======================================================

export async function getCustomers({
  page = 1,
  limit = 10,
  search = "",
  status = "All",
} = {}) {
  try {
    const currentPage = Number(page);
    const currentLimit = Number(limit);

    const offset =
      (currentPage - 1) * currentLimit;

    const conditions = [];
    const params = [];

    // ==================================================
    // HIDE DELETED CUSTOMERS
    // ==================================================

    conditions.push(`c.status != 'deleted'`);

    // ==================================================
    // SEARCH
    // ==================================================

    if (search.trim()) {
      conditions.push(`
        (
          c.name LIKE ?
          OR c.phone LIKE ?
          OR c.email LIKE ?
          OR c.address LIKE ?
        )
      `);

      const searchValue =
        `%${search.trim()}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue,
        searchValue
      );
    }

    // ==================================================
    // STATUS
    // ==================================================

    const statusValue =
      typeof status === "string"
        ? status
        : status?.value || "All";

    if (statusValue !== "All") {
      conditions.push(`c.status = ?`);
      params.push(statusValue.toLowerCase());
    }

    const whereClause = `
      WHERE ${conditions.join(" AND ")}
    `;

    // ==================================================
    // GET CUSTOMERS
    // ==================================================

    const [rows] = await db.query(
      `
      SELECT

        c.id,
        c.name,
        c.phone,
        c.email,
        c.address,
        c.status,
        c.created_at,

        -- ============================================
        -- NUMBER OF PURCHASES
        -- ============================================

        COUNT(
          CASE
            WHEN s.status NOT IN ('cancelled', 'returned')
            THEN s.id
          END
        ) AS purchases,

        -- ============================================
        -- TOTAL SPENT
        -- ============================================

        COALESCE(
          SUM(
            CASE
              WHEN s.status NOT IN ('cancelled', 'returned')
              THEN s.total
              ELSE 0
            END
          ),
          0
        ) AS spent,

        -- ============================================
        -- OUTSTANDING BALANCE
        -- ============================================

        COALESCE(
          SUM(
            CASE
              WHEN s.status NOT IN ('cancelled', 'returned')
              THEN
                GREATEST(
                  s.total - s.paid_amount,
                  0
                )
              ELSE 0
            END
          ),
          0
        ) AS balance

      FROM customers c

      LEFT JOIN sales s
        ON s.customer_id = c.id

      ${whereClause}

      GROUP BY
        c.id,
        c.name,
        c.phone,
        c.email,
        c.address,
        c.status,
        c.created_at

      ORDER BY c.id DESC

      LIMIT ? OFFSET ?
      `,
      [
        ...params,
        currentLimit,
        offset,
      ]
    );

    // ==================================================
    // COUNT CUSTOMERS
    // ==================================================

    const [countRows] = await db.query(
      `
      SELECT COUNT(*) AS total

      FROM customers c

      ${whereClause}
      `,
      params
    );

    const total = Number(
      countRows[0]?.total || 0
    );

    // ==================================================
    // FORMAT DATA FOR FRONTEND
    // ==================================================

    const data = rows.map((customer) => ({
      id: Number(customer.id),

      name: customer.name || "",

      phone: customer.phone || "",

      email: customer.email || "",

      address: customer.address || "",

      purchases: Number(
        customer.purchases || 0
      ),

      spent: Number(
        customer.spent || 0
      ),

      balance: Number(
        customer.balance || 0
      ),

      status:
        customer.status === "active"
          ? "Active"
          : "Inactive",

     
    }));

    return {
      success: true,

      data,

      total,

      page: currentPage,

      limit: currentLimit,

      totalPages: Math.ceil(
        total / currentLimit
      ),
    };

  } catch (error) {
    console.error(
      "Get customers error:",
      error
    );

    return {
      success: false,

      message: "Failed to fetch customers",

      data: [],

      total: 0,

      page: Number(page),

      limit: Number(limit),

      totalPages: 0,
    };
  }
}



// ======================================================
// CUSTOMER STATISTICS
// ======================================================

export async function getCustomerStats() {
  try {

    // ==================================================
    // CUSTOMER COUNT
    // ==================================================

    const [customerRows] =
      await db.query(`
        SELECT

          COUNT(*) AS total_customers,

          SUM(
            CASE
              WHEN status = 'active'
              THEN 1
              ELSE 0
            END
          ) AS active_customers,

          SUM(
            CASE
              WHEN status = 'inactive'
              THEN 1
              ELSE 0
            END
          ) AS inactive_customers

        FROM customers

        WHERE status != 'deleted'
      `);


    // ==================================================
    // TOTAL OUTSTANDING
    // ==================================================

    const [balanceRows] =
      await db.query(`
        SELECT

          COALESCE(
            SUM(
              GREATEST(
                s.total - s.paid_amount,
                0
              )
            ),
            0
          ) AS outstanding_balance

        FROM sales s

        INNER JOIN customers c
          ON c.id = s.customer_id

        WHERE
          c.status != 'deleted'

          AND s.status NOT IN (
            'cancelled',
            'returned'
          )
      `);


    const customerStats =
      customerRows[0] || {};

    const balanceStats =
      balanceRows[0] || {};


    return {
      success: true,

      data: {

        totalCustomers:
          Number(
            customerStats.total_customers || 0
          ),

        activeCustomers:
          Number(
            customerStats.active_customers || 0
          ),

        inactiveCustomers:
          Number(
            customerStats.inactive_customers || 0
          ),

        outstandingBalance:
          Number(
            balanceStats.outstanding_balance || 0
          ),
      },
    };

  } catch (error) {

    console.error(
      "Get customer stats error:",
      error
    );

    return {
      success: false,

      message:
        "Failed to fetch customer statistics",

      data: {
        totalCustomers: 0,
        activeCustomers: 0,
        inactiveCustomers: 0,
        outstandingBalance: 0,
      },
    };
  }
}




// ======================================================
// ADD CUSTOMER
// ======================================================




// ======================================================
// CREATE CUSTOMER
// ======================================================

export async function createCustomer({
  name,
  phone,
  email,
  address,
  city,
  state,
  postal_code,
  opening_balance,
  notes,
  customer_type,
  credit_limit,
  status = "active",
}) {
  try {

    // ================================================
    // VALIDATION
    // ================================================

    if (!name?.trim()) {
      return {
        success: false,
        message: "Customer name is required",
      };
    }


    // ================================================
    // NORMALIZE VALUES
    // ================================================

    const customerName = name.trim();

    const customerPhone =
      phone?.trim() || null;

    const customerEmail =
      email?.trim() || null;

    const customerAddress =
      address?.trim() || null;

    const customerCity =
      city?.trim() || null;

    const customerState =
      state?.trim() || null;

    const customerPostalCode =
      postal_code?.trim() || null;

    const customerNotes =
      notes?.trim() || null;

    const customerType =
      customer_type?.trim() || "regular";

    const customerOpeningBalance =
      Number(opening_balance || 0);

    const customerCreditLimit =
      Number(credit_limit || 0);

    const customerStatus =
      typeof status === "string"
        ? status.toLowerCase()
        : "active";


    // ================================================
    // INSERT CUSTOMER
    // ================================================

    const [result] = await db.query(
      `
      INSERT INTO customers (
        name,
        phone,
        email,
        address,
        city,
        state,
        postal_code,
        opening_balance,
        notes,
        customer_type,
        credit_limit,
        status,
        created_at,
        updated_at
      )

      VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        NOW(),
        NOW()
      )
      `,
      [
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        customerCity,
        customerState,
        customerPostalCode,
        customerOpeningBalance,
        customerNotes,
        customerType,
        customerCreditLimit,
        customerStatus,
      ]
    );


    // ================================================
    // SUCCESS
    // ================================================

    return {
      success: true,

      message: "Customer added successfully",

      data: {
        id: Number(result.insertId),
      },
    };


  } catch (error) {

    console.error(
      "Create customer error:",
      error
    );

    return {
      success: false,

      message: "Failed to add customer",
    };
  }
}