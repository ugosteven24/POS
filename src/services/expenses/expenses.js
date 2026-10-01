"use server";

import db from "@/lib/db";


// ======================================================
// CREATE EXPENSE
// ======================================================

export async function createExpense({
    // branch_id,
    category_id,
    title,
    description = "",
    amount,
    payment_method_id,
    expense_date,
    created_by,
    status,
}) {
    try {

        // if (!branch_id) {
        //     return {
        //         success: false,
        //         message: "Branch is required",
        //     };
        // }

        if (!category_id) {
            return {
                success: false,
                message: "Expense category is required",
            };
        }

        if (!title?.trim()) {
            return {
                success: false,
                message: "Expense title is required",
            };
        }

        if (!amount || Number(amount) <= 0) {
            return {
                success: false,
                message: "A valid expense amount is required",
            };
        }

        if (!payment_method_id) {
            return {
                success: false,
                message: "Payment method is required",
            };
        }

        if (!expense_date) {
            return {
                success: false,
                message: "Expense date is required",
            };
        }

        const [result] = await db.query(
            `
            INSERT INTO expenses (
              
                category_id,
                title,
                description,
                amount,
                payment_method_id,
                expense_date,
                created_by,
                status,
                created_at
            )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            `,
            [
                // branch_id,
                category_id,
                title.trim(),
                description?.trim() || null,
                Number(amount),
                payment_method_id,
                expense_date,
                created_by || null,
                status,
            ]
        );

        return {
            success: true,
            message: "Expense created successfully",
            id: result.insertId,
        };

    } catch (error) {

        console.error("Create expense error:", error);

        return {
            success: false,
            message: "Failed to create expense",
        };
    }
}


// ======================================================
// GET EXPENSES
// ======================================================



// Keep your existing "use server" directive and `db` import at the top of the file.

// Keep your existing "use server" directive and `db` import at the top of the file.

export async function getExpenses({
    page = 1,
    limit = 10,
    search = "",
    status = "All",
    category_id = null,
    branch_id = null,
    payment_method_id = null,
    date_from = null, // "YYYY-MM-DD"
    date_to = null,   // "YYYY-MM-DD"
}) {
    try {
        page = Math.max(1, Number(page));
        limit = Math.max(1, Number(limit));

        const offset = (page - 1) * limit;

        const conditions = [];
        const params = [];

        // Don't show deleted expenses
        conditions.push(`e.status != 'Deleted'`);

        // SEARCH
        if (search?.trim()) {
            conditions.push(`
                (
                    e.title LIKE ?
                    OR e.description LIKE ?
                    OR ec.name LIKE ?
                )
            `);

            const searchValue = `%${search.trim()}%`;
            params.push(searchValue, searchValue, searchValue);
        }

        // STATUS
        // FIX: the UI sends "All Status", which used to become `e.status = 'All Status'`
        // and match nothing. Treat any "All..." value as "no filter".
        if (status && !String(status).startsWith("All")) {
            conditions.push(`e.status = ?`);
            params.push(status);
        }

        // CATEGORY
        if (category_id) {
            conditions.push(`e.category_id = ?`);
            params.push(category_id);
        }

        // BRANCH
        if (branch_id) {
            conditions.push(`e.branch_id = ?`);
            params.push(branch_id);
        }

        // PAYMENT METHOD
        if (payment_method_id) {
            conditions.push(`e.payment_method_id = ?`);
            params.push(payment_method_id);
        }

        // DATE RANGE (inclusive; DATE() makes this work for DATE or DATETIME columns)
        if (date_from) {
            conditions.push(`DATE(e.expense_date) >= ?`);
            params.push(date_from);
        }

        if (date_to) {
            conditions.push(`DATE(e.expense_date) <= ?`);
            params.push(date_to);
        }

        const whereClause =
            conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

        // COUNT
        const [countRows] = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM expenses e
            LEFT JOIN expense_categories ec ON ec.id = e.category_id
            ${whereClause}
            `,
            params
        );

        const total = Number(countRows[0]?.total || 0);

        // DATA
        // ASSUMPTION: tables `payment_methods` (id, name) and `users` (id, name).
        // Rename to match your schema.
        const [rows] = await db.query(
            `
            SELECT
                e.id,
                e.branch_id,
                e.category_id,
                ec.name AS category_name,
                e.title,
                e.description,
                e.amount,
                e.payment_method_id,
                pm.name AS payment_method_name,
                e.expense_date,
                e.created_by,
           
                e.status,
                e.created_at
            FROM expenses e
            LEFT JOIN expense_categories ec ON ec.id = e.category_id
            LEFT JOIN payment_methods pm ON pm.id = e.payment_method_id
          
            ${whereClause}
            ORDER BY e.id DESC
            LIMIT ? OFFSET ?
            `,
            [...params, limit, offset]
        );

        // FIX: return plain objects using the field names the table component reads
        // (category, paymentMethod, date, createdBy). This also makes the result
        // safe to serialize back to the client (no DB row classes, Dates, or DECIMAL strings).
        const data = rows.map((r) => ({
            id: r.id,
            branchId: r.branch_id,
            categoryId: r.category_id,
            title: r.title,
            description: r.description ?? "",
            amount: Number(r.amount || 0),
            category: r.category_name ?? "Uncategorized",
            paymentMethod: r.payment_method_name ?? "-",
            date: r.expense_date ? new Date(r.expense_date).toISOString() : null,
            createdBy: r.created_by_name ?? String(r.created_by ?? "-"),
            status: r.status,
            createdAt: r.created_at ? new Date(r.created_at).toISOString() : null,
        }));

        return {
            success: true,
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.error("Get expenses error:", error);

        return {
            success: false,
            message: "Failed to get expenses",
            data: [],
            pagination: {
                total: 0,
                page,
                limit,
                totalPages: 0,
            },
        };
    }
}

// ======================================================
// GET SINGLE EXPENSE
// ======================================================

export async function getExpenseById(id) {

    try {

        const [rows] = await db.query(
            `
            SELECT
                e.id,
                e.branch_id,
                e.category_id,

                ec.name AS category_name,

                e.title,
                e.description,
                e.amount,

                e.payment_method_id,

                e.expense_date,
                e.created_by,
                e.status,
                e.created_at

            FROM expenses e

            LEFT JOIN expense_categories ec
                ON ec.id = e.category_id

            WHERE e.id = ?
            LIMIT 1
            `,
            [id]
        );


        if (rows.length === 0) {

            return {
                success: false,
                message: "Expense not found",
                data: null,
            };
        }


        return {
            success: true,
            data: rows[0],
        };

    } catch (error) {

        console.error(
            "Get expense error:",
            error
        );

        return {
            success: false,
            message: "Failed to get expense",
            data: null,
        };
    }
}


// ======================================================
// UPDATE EXPENSE
// ======================================================

export async function updateExpense({
    id,
    branch_id,
    category_id,
    title,
    description = "",
    amount,
    payment_method_id,
    expense_date,
    status,
}) {
    try {

        if (!id) {
            return {
                success: false,
                message: "Expense ID is required",
            };
        }

        if (!title?.trim()) {
            return {
                success: false,
                message: "Expense title is required",
            };
        }

        if (!amount || Number(amount) <= 0) {
            return {
                success: false,
                message: "A valid expense amount is required",
            };
        }


        const [result] = await db.query(
            `
            UPDATE expenses

            SET
                branch_id = ?,
                category_id = ?,
                title = ?,
                description = ?,
                amount = ?,
                payment_method_id = ?,
                expense_date = ?,
                status = ?

            WHERE id = ?
            `,
            [
                branch_id,
                category_id,
                title.trim(),
                description?.trim() || null,
                Number(amount),
                payment_method_id,
                expense_date,
                status,
                id,
            ]
        );


        if (result.affectedRows === 0) {

            return {
                success: false,
                message: "Expense not found or nothing changed",
            };
        }


        return {
            success: true,
            message: "Expense updated successfully",
        };

    } catch (error) {

        console.error(
            "Update expense error:",
            error
        );

        return {
            success: false,
            message: "Failed to update expense",
        };
    }
}


// ======================================================
// DELETE EXPENSE
// ======================================================

export async function deleteExpense(id) {

    try {

        if (!id) {

            return {
                success: false,
                message: "Expense ID is required",
            };
        }


        const [result] = await db.query(
            `
            UPDATE expenses

            SET status = 'Deleted'

            WHERE id = ?
            `,
            [id]
        );


        if (result.affectedRows === 0) {

            return {
                success: false,
                message: "Expense not found",
            };
        }


        return {
            success: true,
            message: "Expense deleted successfully",
        };

    } catch (error) {

        console.error(
            "Delete expense error:",
            error
        );

        return {
            success: false,
            message: "Failed to delete expense",
        };
    }
}


// ======================================================
// EXPENSE STATS
// ======================================================



// ======================================================
// EXPENSE STATS
// ======================================================

export async function getExpenseStats() {

    try {

        const [rows] = await db.query(`
            SELECT

                COUNT(*) AS total_expenses,

                COALESCE(
                    SUM(amount),
                    0
                ) AS total_amount,


                COUNT(
                    CASE
                        WHEN status = 'Pending'
                        THEN 1
                    END
                ) AS pending_expenses,


                COALESCE(
                    SUM(
                        CASE
                            WHEN status = 'Pending'
                            THEN amount
                            ELSE 0
                        END
                    ),
                    0
                ) AS pending_amount,


                COUNT(
                    CASE
                        WHEN status = 'Paid'
                        THEN 1
                    END
                ) AS paid_expenses,


                COALESCE(
                    SUM(
                        CASE
                            WHEN status = 'Paid'
                            THEN amount
                            ELSE 0
                        END
                    ),
                    0
                ) AS paid_amount,


                COUNT(
                    CASE
                        WHEN status = 'Cancelled'
                        THEN 1
                    END
                ) AS cancelled_expenses,


                COALESCE(
                    SUM(
                        CASE
                            WHEN status = 'Cancelled'
                            THEN amount
                            ELSE 0
                        END
                    ),
                    0
                ) AS cancelled_amount


            FROM expenses

            WHERE status != 'Deleted'
        `);


        const stats = rows[0] || {};


        return {

            success: true,

            data: {

                totalExpenses:
                    Number(
                        stats.total_expenses || 0
                    ),

                totalAmount:
                    Number(
                        stats.total_amount || 0
                    ),


                pendingExpenses:
                    Number(
                        stats.pending_expenses || 0
                    ),

                pendingAmount:
                    Number(
                        stats.pending_amount || 0
                    ),


                paidExpenses:
                    Number(
                        stats.paid_expenses || 0
                    ),

                paidAmount:
                    Number(
                        stats.paid_amount || 0
                    ),


                cancelledExpenses:
                    Number(
                        stats.cancelled_expenses || 0
                    ),

                cancelledAmount:
                    Number(
                        stats.cancelled_amount || 0
                    ),

            },

        };


    } catch (error) {

        console.error(
            "Get expense stats error:",
            error
        );


        return {

            success: false,

            message:
                "Failed to get expense statistics",

            data: {

                totalExpenses: 0,
                totalAmount: 0,

                pendingExpenses: 0,
                pendingAmount: 0,

                paidExpenses: 0,
                paidAmount: 0,

                cancelledExpenses: 0,
                cancelledAmount: 0,

            },

        };

    }

}

export async function getExpensesCategorys() {

    const [row] = await db.query(`

     SELECT
        *
      FROM expense_categories
      WHERE status = 'active'
      ORDER BY name ASC
    `)

    return row

}





// ======================================================
// FETCH EXPENSES
// ======================================================

export async function fetchExpenses({
    page = 1,
    limit = 10,
    search = "",
    category_id = "All",
    payment_method_id = "All",
    status = "All",
    dateFilter = "This Month",
} = {}) {

    try {

        page = Number(page) || 1;
        limit = Number(limit) || 10;

        const offset = (page - 1) * limit;

        const conditions = [
            `e.status != 'Deleted'`,
        ];

        const params = [];


        // ==================================================
        // SEARCH
        // ==================================================

        if (search.trim()) {

            conditions.push(`
                (
                    e.title LIKE ?
                    OR e.description LIKE ?
                    OR CAST(e.id AS CHAR) LIKE ?
                )
            `);

            const searchValue = `%${search.trim()}%`;

            params.push(
                searchValue,
                searchValue,
                searchValue
            );

        }


        // ==================================================
        // CATEGORY
        // ==================================================

        if (
            category_id &&
            category_id !== "All" &&
            category_id !== "All Categories"
        ) {

            conditions.push(`
                e.category_id = ?
            `);

            params.push(category_id);

        }


        // ==================================================
        // PAYMENT METHOD
        // ==================================================

        if (
            payment_method_id &&
            payment_method_id !== "All" &&
            payment_method_id !== "All Payment Methods"
        ) {

            conditions.push(`
                e.payment_method_id = ?
            `);

            params.push(payment_method_id);

        }


        // ==================================================
        // STATUS
        // ==================================================

        if (
            status &&
            status !== "All" &&
            status !== "All Status"
        ) {

            conditions.push(`
                e.status = ?
            `);

            params.push(status);

        }


        // ==================================================
        // DATE FILTER
        // ==================================================

        if (dateFilter && dateFilter !== "All") {

            switch (dateFilter) {

                case "Today":

                    conditions.push(`
                        DATE(e.expense_date) = CURDATE()
                    `);

                    break;


                case "This Week":

                    conditions.push(`
                        YEARWEEK(
                            e.expense_date,
                            1
                        ) = YEARWEEK(
                            CURDATE(),
                            1
                        )
                    `);

                    break;


                case "This Month":

                    conditions.push(`
                        YEAR(e.expense_date) = YEAR(CURDATE())
                        AND MONTH(e.expense_date) = MONTH(CURDATE())
                    `);

                    break;


                case "Last Month":

                    conditions.push(`
                        e.expense_date >=
                        DATE_FORMAT(
                            CURRENT_DATE - INTERVAL 1 MONTH,
                            '%Y-%m-01'
                        )

                        AND

                        e.expense_date <
                        DATE_FORMAT(
                            CURRENT_DATE,
                            '%Y-%m-01'
                        )
                    `);

                    break;


                case "This Year":

                    conditions.push(`
                        YEAR(e.expense_date) = YEAR(CURDATE())
                    `);

                    break;

            }

        }


        const whereClause = `
            WHERE ${conditions.join(" AND ")}
        `;


        // ==================================================
        // GET TOTAL
        // ==================================================

        const countParams = [...params];

        const [countRows] = await db.query(
            `
            SELECT COUNT(*) AS total

            FROM expenses e

            ${whereClause}
            `,
            countParams
        );


        const total = Number(
            countRows[0]?.total || 0
        );


        const totalPages = Math.ceil(
            total / limit
        );


        // ==================================================
        // GET EXPENSES
        // ==================================================

        const [rows] = await db.query(
            `
            SELECT

                e.id,

                e.branch_id,

                e.category_id,

                ec.name AS category_name,

                e.title,

                e.description,

                e.amount,

                e.payment_method_id,

                pm.name AS payment_method_name,

                e.expense_date,

                e.created_by,

                e.status,

                e.created_at

            FROM expenses e


            LEFT JOIN expense_categories ec
                ON ec.id = e.category_id


            LEFT JOIN payment_methods pm
                ON pm.id = e.payment_method_id


            ${whereClause}

            ORDER BY e.id DESC

            LIMIT ? OFFSET ?
            `,
            [
                ...params,
                limit,
                offset,
            ]
        );


        // ==================================================
        // FORMAT DATA
        // ==================================================

        const data = rows.map((expense) => ({

            id: expense.id,

            branch_id:
                expense.branch_id,

            category_id:
                expense.category_id,

            category:
                expense.category_name || "Uncategorized",

            title:
                expense.title,

            description:
                expense.description || "",

            amount:
                Number(expense.amount || 0),

            payment_method_id:
                expense.payment_method_id,

            paymentMethod:
                expense.payment_method_name ||
                "Unknown",

            date:
                expense.expense_date,

            expense_date:
                expense.expense_date,

            created_by:
                expense.created_by,

            createdBy:
                expense.created_by,

            status:
                expense.status,

            created_at:
                expense.created_at,

        }));


        return {

            success: true,

            data,

            pagination: {

                page,

                limit,

                total,

                totalPages,

                hasNextPage:
                    page < totalPages,

                hasPreviousPage:
                    page > 1,

            },

        };


    } catch (error) {

        console.error(
            "Fetch expenses error:",
            error
        );


        return {

            success: false,

            message:
                "Failed to fetch expenses",

            data: [],

            pagination: {

                page: 1,

                limit,

                total: 0,

                totalPages: 0,

                hasNextPage: false,

                hasPreviousPage: false,

            },

        };

    }

}