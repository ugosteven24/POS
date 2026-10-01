
"use server";

import db from "@/lib/db";

export async function getSalesStats() {
  const [rows] = await db.execute(`
    SELECT

      /* Total sales today */
      COALESCE(
        SUM(
          CASE
            WHEN status = 'completed'
            AND DATE(sale_date) = CURDATE()
            THEN total
            ELSE 0
          END
        ),
        0
      ) AS total_sales,

      /* Yesterday */
      COALESCE(
        SUM(
          CASE
            WHEN status = 'completed'
            AND DATE(sale_date) = CURDATE() - INTERVAL 1 DAY
            THEN total
            ELSE 0
          END
        ),
        0
      ) AS yesterday_sales,

      /* Cash */
      COALESCE(
        SUM(
          CASE
            WHEN status = 'completed'
            AND DATE(sale_date) = CURDATE()
            AND payment_method = 'cash'
            THEN total
            ELSE 0
          END
        ),
        0
      ) AS cash_sales,

      /* POS */
      COALESCE(
        SUM(
          CASE
            WHEN status = 'completed'
            AND DATE(sale_date) = CURDATE()
            AND payment_method = 'pos'
            THEN total
            ELSE 0
          END
        ),
        0
      ) AS pos_sales,

      /* Transfer */
      COALESCE(
        SUM(
          CASE
            WHEN status = 'completed'
            AND DATE(sale_date) = CURDATE()
            AND payment_method = 'transfer'
            THEN total
            ELSE 0
          END
        ),
        0
      ) AS transfer_sales

    FROM sales
  `);

  const data = rows[0];

  const totalSales = Number(data.total_sales);
  const yesterdaySales = Number(data.yesterday_sales);

  const cashSales = Number(data.cash_sales);
  const posSales = Number(data.pos_sales);
  const transferSales = Number(data.transfer_sales);

  const salesTrend =
    yesterdaySales > 0
      ? ((totalSales - yesterdaySales) / yesterdaySales) * 100
      : 0;

  return {
    total_sales: totalSales,
    yesterday_sales: yesterdaySales,

    cash_sales: cashSales,
    pos_sales: posSales,
    transfer_sales: transferSales,

    sales_trend: Number(salesTrend.toFixed(1)),

    cash_percentage:
      totalSales > 0
        ? Number(((cashSales / totalSales) * 100).toFixed(1))
        : 0,

    pos_percentage:
      totalSales > 0
        ? Number(((posSales / totalSales) * 100).toFixed(1))
        : 0,

    transfer_percentage:
      totalSales > 0
        ? Number(((transferSales / totalSales) * 100).toFixed(1))
        : 0,
  };
}


export async function getSales({
  search = "",
  payment = "all",
  status = "all",
  date = "",
  page = 1,
  limit = 8,
} = {}) {
  try {
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];

    /* =========================================
       SEARCH
    ========================================= */

    if (search.trim()) {
      conditions.push(`
        (
          s.invoice_number LIKE ?
          OR CONCAT(c.name) LIKE ?
          OR CONCAT(u.first_name, ' ', u.last_name) LIKE ?
          OR c.name LIKE ?
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


    /* =========================================
       PAYMENT
    ========================================= */

    if (payment !== "all") {
      conditions.push(`
        s.payment_method = ?
      `);

      params.push(payment);
    }


    /* =========================================
       STATUS
    ========================================= */

    if (status !== "all") {

      let dbStatus = status;

      /*
        Your UI uses:

        Paid
        Pending
        Returned

        Your database may use:

        completed
        pending
        returned
      */

      if (status === "paid") {
        dbStatus = "completed";
      }

      conditions.push(`
        s.status = ?
      `);

      params.push(dbStatus);
    }


    /* =========================================
       DATE
    ========================================= */

    if (date) {
      conditions.push(`
        DATE(s.sale_date) = ?
      `);

      params.push(date);
    }


    /* =========================================
       WHERE
    ========================================= */

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";


    /* =========================================
       SALES
    ========================================= */

    const [rows] = await db.execute(
      `
      SELECT

        s.id,

        s.invoice_number AS invoice,

        COALESCE(
          c.name,
          CONCAT(
            c.name,
            ' ',
            c.name
          ),
          'Walk-in Customer'
        ) AS customer,

        COALESCE(
          CONCAT(
            u.first_name,
            ' ',
            u.last_name
          ),
          'Unknown Cashier'
        ) AS cashier,

        s.sale_date,

        DATE_FORMAT(
          s.sale_date,
          '%d %b %Y'
        ) AS sale_date_formatted,

        DATE_FORMAT(
          s.sale_date,
          '%h:%i %p'
        ) AS sale_time,

        s.total,

        s.payment_method AS payment,

        s.status

      FROM sales s

      LEFT JOIN customers c
        ON c.id = s.customer_id

      LEFT JOIN users u
        ON u.id = s.cashier_id

      ${whereClause}

      ORDER BY s.sale_date DESC

      LIMIT ? OFFSET ?
      `,
      [
        ...params,
        Number(limit),
        Number(offset),
      ]
    );


    /* =========================================
       TOTAL RECORDS
    ========================================= */

    const [countRows] = await db.execute(
      `
      SELECT COUNT(*) AS total

      FROM sales s

      LEFT JOIN customers c
        ON c.id = s.customer_id

      LEFT JOIN users u
        ON u.id = s.cashier_id

      ${whereClause}
      `,
      params
    );


    const total = Number(
      countRows[0]?.total || 0
    );

    const totalPages = Math.ceil(
      total / limit
    );


    /* =========================================
       FORMAT DATA FOR UI
    ========================================= */

    const sales = rows.map((sale) => {

      let displayStatus = sale.status;

      if (sale.status === "completed") {
        displayStatus = "Paid";
      }

      if (sale.status === "pending") {
        displayStatus = "Pending";
      }

      if (sale.status === "returned") {
        displayStatus = "Returned";
      }


      let displayPayment =
        sale.payment;

      if (sale.payment === "cash") {
        displayPayment = "Cash";
      }

      if (sale.payment === "pos") {
        displayPayment = "POS";
      }

      if (sale.payment === "transfer") {
        displayPayment = "Transfer";
      }


      return {
        id: sale.id,

        invoice: sale.invoice,

        customer: sale.customer,

        cashier: sale.cashier,

        date: sale.sale_date_formatted,

        time: sale.sale_time,

        total: Number(sale.total),

        payment: displayPayment,

        status: displayStatus,
      };

    });


    return {
      success: true,

      sales,

      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
    };


  } catch (error) {

    console.error(
      "GET SALES ERROR:",
      error
    );

    return {
      success: false,

      message:
        "Failed to fetch sales.",

      sales: [],

      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: 0,
        totalPages: 0,
      },
    };

  }
}



