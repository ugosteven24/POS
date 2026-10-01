import db from "@/lib/db";


// ============================================================
// CREATE BRAND
// ============================================================

export async function createBrand({
  name,
  description = null,
  status = "active",
}) {

  const brandName =
    name?.toString().trim();

  const brandDescription =
    description?.toString().trim() || null;

  const brandStatus =
    status?.toString().toLowerCase() === "inactive"
      ? "inactive"
      : "active";


  // ==========================================================
  // VALIDATION
  // ==========================================================

  if (!brandName) {
    throw new Error(
      "Brand name is required."
    );
  }


  // ==========================================================
  // CHECK DUPLICATE
  // ==========================================================

  const [existing] =
    await db.execute(
      `
      SELECT id
      FROM brands
      WHERE LOWER(name) = LOWER(?)
      LIMIT 1
      `,
      [
        brandName,
      ]
    );


  if (existing.length > 0) {

    const error = new Error(
      "A brand with this name already exists."
    );

    error.code = "DUPLICATE_BRAND";

    throw error;
  }


  // ==========================================================
  // INSERT
  // ==========================================================

  const [result] =
    await db.execute(
      `
      INSERT INTO brands
      (
        name,
        description,
        status
      )
      VALUES
      (?, ?, ?)
      `,
      [
        brandName,
        brandDescription,
        brandStatus,
      ]
    );


  // ==========================================================
  // RETURN CREATED BRAND
  // ==========================================================

  return {
    id: result.insertId,

    name: brandName,

    description:
      brandDescription,

    status:
      brandStatus,
  };

}



// ============================================================
// GET ALL BRANDS
// ============================================================

export async function getBrands() {

  const [rows] =
    await db.execute(
      `
      SELECT
        id,
        name,
        description,
        status,
        created_at,
        updated_at

      FROM brands

      ORDER BY id DESC
      `
    );


  return rows;
}



// ============================================================
// GET BRAND BY ID
// ============================================================

export async function getBrandById(id) {

  const [rows] =
    await db.execute(
      `
      SELECT
        id,
        name,
        description,
        status,
        created_at,
        updated_at

      FROM brands

      WHERE id = ?

      LIMIT 1
      `,
      [
        id,
      ]
    );


  return rows[0] || null;
}

export async function fetchBrands() {

  const [brands] = await db.execute(`
    SELECT
      b.id,
      b.name,
      b.description,
      b.status,
      b.created_at,
      b.updated_at,
      COUNT(p.id) AS products

    FROM brands b

    LEFT JOIN products p
      ON p.brand_id = b.id

    GROUP BY
      b.id,
      b.name,
      b.description,
      b.status,
      b.created_at,
      b.updated_at

    ORDER BY b.id DESC
  `);

  return brands;
}

// ============================================================
// UPDATE BRAND
// ============================================================

export async function updateBrand(
  id,
  {
    name,
    description,
    status,
  }
) {

  const fields = [];
  const values = [];


  // ==========================================================
  // NAME
  // ==========================================================

  if (name !== undefined) {

    const brandName =
      name.toString().trim();


    if (!brandName) {
      throw new Error(
        "Brand name cannot be empty."
      );
    }


    // Check duplicate name
    const [existing] =
      await db.execute(
        `
        SELECT id
        FROM brands
        WHERE LOWER(name) = LOWER(?)
        AND id != ?
        LIMIT 1
        `,
        [
          brandName,
          id,
        ]
      );


    if (existing.length > 0) {

      const error = new Error(
        "A brand with this name already exists."
      );

      error.code =
        "DUPLICATE_BRAND";

      throw error;
    }


    fields.push(
      "name = ?"
    );

    values.push(
      brandName
    );

  }


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  if (description !== undefined) {

    fields.push(
      "description = ?"
    );

    values.push(
      description?.toString().trim() || null
    );

  }


  // ==========================================================
  // STATUS
  // ==========================================================

  if (status !== undefined) {

    const brandStatus =
      status.toString().toLowerCase() ===
      "inactive"
        ? "inactive"
        : "active";


    fields.push(
      "status = ?"
    );

    values.push(
      brandStatus
    );

  }


  // ==========================================================
  // NOTHING TO UPDATE
  // ==========================================================

  if (fields.length === 0) {

    throw new Error(
      "No fields provided for update."
    );

  }


  // ==========================================================
  // UPDATE
  // ==========================================================

  values.push(id);


  const [result] =
    await db.execute(
      `
      UPDATE brands

      SET
        ${fields.join(", ")}

      WHERE id = ?
      `,
      values
    );


  // ==========================================================
  // CHECK RECORD
  // ==========================================================

  if (
    result.affectedRows === 0
  ) {

    const error = new Error(
      "Brand not found."
    );

    error.code =
      "BRAND_NOT_FOUND";

    throw error;
  }


  return {
    id,
    affectedRows:
      result.affectedRows,
  };

}



// ============================================================
// DEACTIVATE BRAND
// ============================================================

export async function deactivateBrand(id) {

  const [result] =
    await db.execute(
      `
      UPDATE brands

      SET
        status = 'inactive'

      WHERE id = ?
      `,
      [
        id,
      ]
    );


  if (
    result.affectedRows === 0
  ) {

    const error = new Error(
      "Brand not found."
    );

    error.code =
      "BRAND_NOT_FOUND";

    throw error;
  }


  return {
    id,
    status: "inactive",
  };

}



// ============================================================
// ACTIVATE BRAND
// ============================================================

export async function activateBrand(id) {

  const [result] =
    await db.execute(
      `
      UPDATE brands

      SET
        status = 'active'

      WHERE id = ?
      `,
      [
        id,
      ]
    );


  if (
    result.affectedRows === 0
  ) {

    const error = new Error(
      "Brand not found."
    );

    error.code =
      "BRAND_NOT_FOUND";

    throw error;
  }


  return {
    id,
    status: "active",
  };

}