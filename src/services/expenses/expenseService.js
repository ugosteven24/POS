'use server'
import db from "@/lib/db";



export async function getExpenseCategoryStats() {
  const [row] = await db.query(`
    SELECT COUNT(*) AS total,
    SUM(status ='active')
    AS active,
    SUM(status='inactive') AS inactive 
    FROM expense_categories`);

  return row[0]
}
export async function createExpenseCategory(data) {
  try {
    const {
      name,
      description,
      status = "Active",
    } = data;

    if (!name?.trim()) {
      return {
        success: false,
        message: "Category name is required",
      };
    }

    const [result] = await db.query(
      `
      INSERT INTO expense_categories
      (
        name,
        description,
        status,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, NOW(), NOW())
      `,
      [
        name.trim(),
        description?.trim() || null,
        status,
      ]
    );

    return {
      success: true,
      message: "Expense category created successfully",
      id: result.insertId,
    };

  } catch (error) {
    console.error("Create expense category error:", error);

    return {
      success: false,
      message: "Failed to create expense category",
    };
  }
}


export async function updateExpenseCategory(data) {
  try {
    const {
      id,
      name,
      description,
      status,
    } = data;

    if (!id) {
      return {
        success: false,
        message: "Category ID is required",
      };
    }

    if (!name?.trim()) {
      return {
        success: false,
        message: "Category name is required",
      };
    }

    const [result] = await db.query(
      `
      UPDATE expense_categories
      SET
        name = ?,
        description = ?,
        status = ?,
        updated_at = NOW()
      WHERE id = ?
      `,
      [
        name.trim(),
        description?.trim() || null,
        status || "Active",
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Expense category not found",
      };
    }

    return {
      success: true,
      message: "Expense category updated successfully",
    };

  } catch (error) {
    console.error("Update expense category error:", error);

    return {
      success: false,
      message: "Failed to update expense category",
    };
  }
}


export async function fetchExpenseCategories({
  page = 1,
  limit = 10,
  search = "",
  status = "All",
} = {}) {
  try {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    let whereClause = `
      WHERE status != 'Deleted'
    `;

    const params = [];

    // Search
    if (search.trim()) {
      whereClause += `
        AND (
          name LIKE ?
          OR description LIKE ?
        )
      `;

      const searchValue = `%${search.trim()}%`;

      params.push(
        searchValue,
        searchValue
      );
    }

    // Status
    if (status !== "All") {
      whereClause += `
        AND status = ?
      `;

      params.push(status);
    }


    // ==========================================
    // GET DATA
    // ==========================================

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        description,
        status,
        created_at,
        updated_at
      FROM expense_categories
      ${whereClause}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [
        ...params,
        limitNumber,
        offset,
      ]
    );


    // ==========================================
    // GET TOTAL
    // ==========================================

    const [countRows] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM expense_categories
      ${whereClause}
      `,
      params
    );


    const total = Number(
      countRows[0]?.total || 0
    );

    const totalPages = Math.ceil(
      total / limitNumber
    );


    return {
      success: true,

      data: rows,

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages,
        hasNextPage:
          pageNumber < totalPages,
        hasPreviousPage:
          pageNumber > 1,
      },
    };


  } catch (error) {

    console.error(
      "Get expense categories error:",
      error
    );

    return {
      success: false,

      message:
        "Failed to get expense categories",

      data: [],

      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

export async function getExpenseCategoryById(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "Category ID is required",
      };
    }

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        description,
        status,
        created_at,
        updated_at
      FROM expense_categories
      WHERE id = ?
      AND status != 'Deleted'
      LIMIT 1
      `,
      [id]
    );

    if (rows.length === 0) {
      return {
        success: false,
        message: "Expense category not found",
      };
    }

    return {
      success: true,
      data: rows[0],
    };

  } catch (error) {
    console.error("Get expense category error:", error);

    return {
      success: false,
      message: "Failed to get expense category",
    };
  }
}


export async function deleteExpenseCategory(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "Category ID is required",
      };
    }

    const [result] = await db.query(
      `
      UPDATE expense_categories
      SET
        status = 'Deleted',
        updated_at = NOW()
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Expense category not found",
      };
    }

    return {
      success: true,
      message: "Expense category deleted successfully",
    };

  } catch (error) {
    console.error("Delete expense category error:", error);

    return {
      success: false,
      message: "Failed to delete expense category",
    };
  }
}


