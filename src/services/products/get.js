"use server"
import db from "@/lib/db";
import fs from "fs/promises";
import path from "path";


export async function GetallData() {
     try {

    const [brands] = await db.execute(`
      SELECT

        p.id AS id,

        p.category_id,
        c.name AS category_name,

        p.brand_id,
        b.name AS brand_name,

        p.unit_id,
        u.name AS unit_name,

        p.tax_id,
        t.name AS tax_name,

         i.quantity AS stock_quantity,

        p.name AS product_name,
        
        p.sku,
        p.barcode AS product_barcode,
        p.description,

        p.cost_price AS cost_price,
        p.selling_price,

        p.reorder_level,
        p.track_inventory,

        p.status,

        p.created_at,
        p.updated_at

      FROM products p

      LEFT JOIN categories c
        ON p.category_id = c.id

      LEFT JOIN inventories i
        ON p.id = i.product_id

      LEFT JOIN brands b
        ON p.brand_id = b.id

      LEFT JOIN units u
        ON p.unit_id = u.id

      LEFT JOIN taxes t
        ON p.tax_id = t.id



      ORDER BY p.id DESC

      `
    );

    return brands;


  } catch (error) {

    console.error(
      "Get brands error:",
      error
    );

    return {
      success: false,
      brands: [],
      message: "Failed to load brands.",
    };
  }
}


export async function SearchallData(param) {
     try {

    const [brands] = await db.execute(   `
      SELECT

        p.id,

        p.category_id,
        c.name AS category_name,

        p.brand_id,
        b.name AS brand_name,

        p.unit_id,
        u.name AS unit_name,

        p.tax_id,
        t.name AS tax_name,

        p.name,
        p.sku,
        p.barcode,
        p.description,

        p.cost_price,
        p.selling_price,

        p.reorder_level,
        p.track_inventory,

        p.status,

        p.created_at,
        p.updated_at

      FROM products p

      WHERE

      LEFT JOIN categories c
        ON p.category_id = c.id

      LEFT JOIN brands b
        ON p.brand_id = b.id

      LEFT JOIN units u
        ON p.unit_id = u.id

      LEFT JOIN taxes t
        ON p.tax_id = t.id



      ORDER BY p.id DESC


      `,
      values);

    return brands;


  } catch (error) {

    console.error(
      "Get brands error:",
      error
    );

    return {
      success: false,
      brands: [],
      message: "Failed to load brands.",
    };
  }
}



// services/products/stats.js


export async function getProductStats() {

  const [rows] = await db.query(`
    SELECT
      COUNT(DISTINCT p.id) AS total_products,

      COUNT(
        DISTINCT CASE
          WHEN i.quantity > 0
          THEN p.id
        END
      ) AS in_stock,

      COUNT(
        DISTINCT CASE
          WHEN i.quantity > 0
           AND i.quantity <= i.reorder_level
          THEN p.id
        END
      ) AS low_stock,

      COUNT(
        DISTINCT CASE
          WHEN i.quantity <= 0
          THEN p.id
        END
      ) AS out_of_stock

    FROM products p

    LEFT JOIN inventories i
      ON i.product_id = p.id

    WHERE p.status = 'active'
  `);

  return rows[0];

}



export async function searchProducts({
  search = "",
  limit = 20,
  cursor = null,
}) {
  try {
    const params = [];

    let sql = `
      SELECT
        p.id,
        p.name,
        p.sku,
        p.barcode,
        p.cost_price,
        p.selling_price,
        p.status,

        c.name AS category,
        b.name AS brand,

        COALESCE(SUM(i.quantity), 0) AS stock

      FROM products p

      LEFT JOIN categories c
        ON c.id = p.category_id

      LEFT JOIN brands b
        ON b.id = p.brand_id

      LEFT JOIN inventories i
        ON i.product_id = p.id

      WHERE p.status = 'active'
    `;


    // ========================================
    // SEARCH
    // ========================================

    if (search.trim() !== "") {

      sql += `
        AND (
          p.name LIKE ?
          OR p.sku LIKE ?
          OR p.barcode LIKE ?
        )
      `;

      const searchValue = `%${search.trim()}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue
      );
    }


    // ========================================
    // CURSOR
    // ========================================

    if (cursor) {

      sql += `
        AND p.id < ?
      `;

      params.push(cursor);
    }


    // ========================================
    // GROUP
    // ========================================

    sql += `
      GROUP BY
        p.id,
        p.name,
        p.sku,
        p.barcode,
        p.cost_price,
        p.selling_price,
        p.status,
        c.name,
        b.name
    `;


    // ========================================
    // ORDER + LIMIT
    // ========================================

    sql += `
      ORDER BY p.id DESC
      LIMIT ?
    `;

    params.push(Number(limit));


    const [rows] = await db.query(
      sql,
      params
    );


    // ========================================
    // NEXT CURSOR
    // ========================================

    const nextCursor =
      rows.length === Number(limit)
        ? rows[rows.length - 1].id
        : null;


    return {
      success: true,
      data: rows,
      nextCursor,
      hasMore: nextCursor !== null,
    };


  } catch (error) {

    console.error(
      "Search products error:",
      error
    );

    return {
      success: false,
      message: "Failed to search products.",
      data: [],
      nextCursor: null,
      hasMore: false,
    };

  }
}





export async function getProductsByCategory(categoryId) {
  const [products] = await db.query(
    `
    SELECT *
    FROM products
    WHERE category_id = ?
    ORDER BY id DESC
    `,
    [categoryId]
  );

  return products;
}
