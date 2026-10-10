"use server";

import fs from "fs/promises";
import path from "path";
// Keep whatever db import your other services use:
import db from "@/lib/db";

const IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const fail = (message) => ({ success: false, message });

// Empty string / null -> null, otherwise a number.
const optionalId = (value) => (value ? Number(value) : null);

export async function createProduct(prevState, formData) {
  let imagePath = null;
  let savedFile = null;
  let connection;

  try {
    // ========================================
    // GET FORM DATA (names match AddProduct.jsx)
    // ========================================

    const name = formData.get("productName");
    const sku = formData.get("sku");
    const barcode = formData.get("barcode");
    const description = formData.get("description");

    const category_id = formData.get("category");
    const brand_id = formData.get("brand");
    const unit_id = formData.get("unit");
    const tax_id = formData.get("tax");
    const branch_id = formData.get("branch");
    const supplier_id = formData.get("supplier");

    const cost_price = formData.get("costPrice");
    const selling_price = formData.get("sellingPrice");
    const stock_quantity = formData.get("stockQuantity");
    const reorder_level = formData.get("reorderLevel");

    // An unchecked checkbox is not sent at all; a checked one sends "on".
    const trackInventory = formData.get("trackInventory") === "on" ? 1 : 0;

    const status = formData.get("status");
    const image = formData.get("image");

    // ========================================
    // VALIDATION
    // ========================================

    if (!name?.toString().trim()) return fail("Product name is required.");
    if (!sku?.toString().trim()) return fail("SKU is required.");
    if (!category_id) return fail("Category is required.");
    if (!unit_id) return fail("Unit is required.");
    if(!supplier_id) return fail("Supplier is required.");

    if (cost_price === null || cost_price === "")
      return fail("Cost price is required.");

    if (selling_price === null || selling_price === "")
      return fail("Selling price is required.");

    const productName = name.toString().trim();
    const productSKU = sku.toString().trim();
    const productBarcode = barcode?.toString().trim() || null;
    const productDescription = description?.toString().trim() || null;

    const categoryId = Number(category_id);
    const brandId = optionalId(brand_id);
    const unitId = Number(unit_id);
    const taxId = optionalId(tax_id);
    const branchId = optionalId(branch_id);

    const costPrice = Number(cost_price);
    const sellingPrice = Number(selling_price);
    const reorderLevel = reorder_level ? Number(reorder_level) : 0;
    const stockQuantity = stock_quantity ? Number(stock_quantity) : 0;

    // The product list and the deactivate API both use lowercase.
    const productStatus = status === "inactive" ? "inactive" : "active";

    if (!Number.isFinite(costPrice) || costPrice < 0)
      return fail("Invalid cost price.");

    if (!Number.isFinite(sellingPrice) || sellingPrice < 0)
      return fail("Invalid selling price.");

    if (!Number.isFinite(reorderLevel) || reorderLevel < 0)
      return fail("Invalid reorder level.");

    if (!Number.isFinite(stockQuantity) || stockQuantity < 0)
      return fail("Invalid initial stock.");

    // ========================================
    // DUPLICATES
    // ========================================

    const [existingSKU] = await db.execute(
      `SELECT id FROM products WHERE sku = ? LIMIT 1`,
      [productSKU]
    );

    if (existingSKU.length > 0)
      return fail("A product with this SKU already exists.");

    if (productBarcode) {
      const [existingBarcode] = await db.execute(
        `SELECT id FROM products WHERE barcode = ? LIMIT 1`,
        [productBarcode]
      );

      if (existingBarcode.length > 0)
        return fail("A product with this barcode already exists.");
    }

    // ========================================
    // CHECK RELATED RECORDS
    // ========================================

    const exists = async (table, id) => {
      const [rows] = await db.execute(
        `SELECT id FROM ${table} WHERE id = ? LIMIT 1`,
        [id]
      );
      return rows.length > 0;
    };

    if (!(await exists("categories", categoryId)))
      return fail("Selected category does not exist.");

    if (brandId !== null && !(await exists("brands", brandId)))
      return fail("Selected brand does not exist.");

    if (!(await exists("units", unitId)))
      return fail("Selected unit does not exist.");

    if (taxId !== null && !(await exists("taxes", taxId)))
      return fail("Selected tax does not exist.");

    if (supplier_id !== null && !(await exists("suppliers", supplier_id)))
      return fail("Selected supplier does not exist.");

    // ========================================
    // BRANCH (inventory rows belong to a branch)
    // ========================================



    if (branchId !== null && !(await exists("branches", branchId)))
      return fail("Selected branch does not exist.");

    // ========================================
    // IMAGE UPLOAD
    // ========================================

    if (image && typeof image === "object" && image.size > 0) {
      if (image.size > 2 * 1024 * 1024)
        return fail("Product image must not exceed 2MB.");

      // The extension comes from the validated MIME type, never from the
      // uploaded file name.
      const extension = IMAGE_TYPES[image.type];

      if (!extension)
        return fail("Only JPG, PNG and WEBP images are allowed.");

      const uploadDirectory = path.join(
        process.cwd(),
        "public",
        "uploads",
        "products"
      );

      await fs.mkdir(uploadDirectory, { recursive: true });

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}.${extension}`;

      savedFile = path.join(uploadDirectory, fileName);

      await fs.writeFile(savedFile, Buffer.from(await image.arrayBuffer()));

      imagePath = `/uploads/products/${fileName}`;
    }

    // ========================================
    // INSERT PRODUCT + INVENTORY (one transaction)
    // ========================================

    connection = await db.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `
      INSERT INTO products
      (
        category_id,
        brand_id,
        unit_id,
        tax_id,
        supplier_id,
        name,
        sku,
        barcode,
        description,
        image,
        cost_price,
        selling_price,
        reorder_level,
        track_inventory,
        status,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `,
      [
        categoryId,
        brandId,
        unitId,
        taxId,
        supplier_id,
        productName,
        productSKU,
        productBarcode,
        productDescription,
        imagePath,
        costPrice,
        sellingPrice,
        reorderLevel,
        trackInventory,
        productStatus,
      ]
    );

    // Stock is only kept when the product is tracked.
    const initialQuantity = trackInventory ? stockQuantity : 0;

    await connection.execute(
      `
      INSERT INTO inventories
        (branch_id, product_id, quantity, reserved_quantity, reorder_level, updated_at)
      VALUES (?, ?, ?, 0, ?, NOW())
      `,
      [branchId, result.insertId, initialQuantity, reorderLevel]
    );

    await connection.commit();

    return {
      success: true,
      message: "Product created successfully.",
      product: {
        id: result.insertId,
        name: productName,
        sku: productSKU,
        barcode: productBarcode,
        image: imagePath,
        status: productStatus,
        stock: initialQuantity,
      },
    };
  } catch (error) {
    if (connection) {
      await connection.rollback().catch(() => {});
    }

    // Don't leave an orphan image behind if the insert failed.
    if (savedFile) {
      await fs.unlink(savedFile).catch(() => {});
    }

    if (error?.code === "ER_DUP_ENTRY") {
      return fail("A product with this SKU or barcode already exists.");
    }

    console.error("Create product error:", error);

    return fail("Failed to create product.");
  } finally {
    if (connection) connection.release();
  }
}