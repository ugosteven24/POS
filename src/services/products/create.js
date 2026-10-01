"use server";

import db from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export async function createProduct(prevstate,formData) {

  try {

    // ========================================
    // GET FORM DATA
    // ========================================

    const name = formData.get("productName");
    const sku = formData.get("sku");
    const barcode = formData.get("barcode");

    const category_id = formData.get("category");
    const brand_id = formData.get("brand");
    const unit_id = formData.get("unit");
    const tax_id = formData.get("tax");
    const supplier_id = formData.get("supplier");

    const description = formData.get("description");

    const cost_price = formData.get("costPrice");
    const selling_price = formData.get("sellingPrice");

    const reorder_level = formData.get("reorderLevel");

    const track_inventory = formData.get("track_intrackInventoryventory");

    const status = formData.get("status");

    const image = formData.get("image");


    // ========================================
    // VALIDATION
    // ========================================

    if (!name?.toString().trim()) {
      return {
        success: false,
        message: "Product name is required.",
      };
    }

    if (!sku?.toString().trim()) {
      return {
        success: false,
        message: "SKU is required.",
      };
    }

    if (!category_id) {
      return {
        success: false,
        message: "Category is required.",
      };
    }

    if (
      cost_price === null ||
      cost_price === ""
    ) {
      return {
        success: false,
        message: "Cost price is required.",
      };
    }

    if (
      selling_price === null ||
      selling_price === ""
    ) {
      return {
        success: false,
        message: "Selling price is required.",
      };
    }


    // ========================================
    // CLEAN DATA
    // ========================================

    const productName =
      name.toString().trim();

    const productSKU =
      sku.toString().trim();

    const productBarcode =
      barcode?.toString().trim() || null;

    const productDescription =
      description?.toString().trim() || null;

    const categoryId =
      Number(category_id);

    const brandId =
      brand_id
        ? Number(brand_id)
        : null;

    const unitId =
      unit_id
        ? Number(unit_id)
        : null;

    const taxId =
      tax_id
        ? Number(tax_id)
        : null;

    const supplierId =
      supplier_id
        ? Number(supplier_id)
        : null;

    const costPrice =
      Number(cost_price);

    const sellingPrice =
      Number(selling_price);

    const reorderLevel =
      reorder_level
        ? Number(reorder_level)
        : 0;

    const trackInventory =
      track_inventory === "0"
        ? 0
        : 1;

    const productStatus =
      status === "Inactive"
        ? "Inactive"
        : "Active";


    // ========================================
    // NUMBER VALIDATION
    // ========================================

    if (
      !Number.isFinite(costPrice) ||
      costPrice < 0
    ) {
      return {
        success: false,
        message: "Invalid cost price.",
      };
    }

    if (
      !Number.isFinite(sellingPrice) ||
      sellingPrice < 0
    ) {
      return {
        success: false,
        message: "Invalid selling price.",
      };
    }

    if (
      !Number.isFinite(reorderLevel) ||
      reorderLevel < 0
    ) {
      return {
        success: false,
        message: "Invalid reorder level.",
      };
    }


    // ========================================
    // CHECK DUPLICATE SKU
    // ========================================

    const [existingSKU] =
      await db.execute(
        `
        SELECT id
        FROM products
        WHERE sku = ?
        LIMIT 1
        `,
        [productSKU]
      );

    if (existingSKU.length > 0) {

      return {
        success: false,
        message:
          "A product with this SKU already exists.",
      };
    }


    // ========================================
    // CHECK DUPLICATE BARCODE
    // ========================================

    if (productBarcode) {

      const [existingBarcode] =
        await db.execute(
          `
          SELECT id
          FROM products
          WHERE barcode = ?
          LIMIT 1
          `,
          [productBarcode]
        );

      if (existingBarcode.length > 0) {

        return {
          success: false,
          message:
            "A product with this barcode already exists.",
        };
      }
    }


    // ========================================
    // CHECK CATEGORY
    // ========================================

    const [category] =
      await db.execute(
        `
        SELECT id
        FROM categories
        WHERE id = ?
        LIMIT 1
        `,
        [categoryId]
      );

    if (category.length === 0) {

      return {
        success: false,
        message:
          "Selected category does not exist.",
      };
    }


    // ========================================
    // CHECK BRAND
    // ========================================

    if (brandId !== null) {

      const [brand] =
        await db.execute(
          `
          SELECT id
          FROM brands
          WHERE id = ?
          LIMIT 1
          `,
          [brandId]
        );

      if (brand.length === 0) {

        return {
          success: false,
          message:
            "Selected brand does not exist.",
        };
      }
    }


    // ========================================
    // CHECK UNIT
    // ========================================

    if (unitId !== null) {

      const [unit] =
        await db.execute(
          `
          SELECT id
          FROM units
          WHERE id = ?
          LIMIT 1
          `,
          [unitId]
        );

      if (unit.length === 0) {

        return {
          success: false,
          message:
            "Selected unit does not exist.",
        };
      }
    }


    // ========================================
    // CHECK TAX
    // ========================================

    if (taxId !== null) {

      const [tax] =
        await db.execute(
          `
          SELECT id
          FROM taxes
          WHERE id = ?
          LIMIT 1
          `,
          [taxId]
        );

      if (tax.length === 0) {

        return {
          success: false,
          message:
            "Selected tax does not exist.",
        };
      }
    }


    // ========================================
    // CHECK SUPPLIER
    // ========================================

    if (supplierId !== null) {

      const [supplier] =
        await db.execute(
          `
          SELECT id
          FROM suppliers
          WHERE id = ?
          LIMIT 1
          `,
          [supplierId]
        );

      if (supplier.length === 0) {

        return {
          success: false,
          message:
            "Selected supplier does not exist.",
        };
      }
    }


    // ========================================
    // IMAGE UPLOAD
    // ========================================

    let imagePath = null;

    if (
      image &&
      typeof image === "object" &&
      image.size > 0
    ) {

      // Maximum 2MB

      if (
        image.size >
        2 * 1024 * 1024
      ) {

        return {
          success: false,
          message:
            "Product image must not exceed 2MB.",
        };
      }


      // Allowed types

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (
        !allowedTypes.includes(
          image.type
        )
      ) {

        return {
          success: false,
          message:
            "Only JPG, PNG and WEBP images are allowed.",
        };
      }


      // ========================================
      // UPLOAD DIRECTORY
      // ========================================

      const uploadDirectory =
        path.join(
          process.cwd(),
          "public",
          "uploads",
          "products"
        );

      await fs.mkdir(
        uploadDirectory,
        {
          recursive: true,
        }
      );


      // ========================================
      // FILE EXTENSION
      // ========================================

      const extension =
        image.name
          .split(".")
          .pop()
          .toLowerCase();


      // ========================================
      // UNIQUE FILE NAME
      // ========================================

      const fileName =
        `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 10)}.${extension}`;


      const filePath =
        path.join(
          uploadDirectory,
          fileName
        );


      // ========================================
      // SAVE FILE
      // ========================================

      const buffer =
        Buffer.from(
          await image.arrayBuffer()
        );

      await fs.writeFile(
        filePath,
        buffer
      );


      imagePath =
        `/uploads/products/${fileName}`;
    }


    // ========================================
    // INSERT PRODUCT
    // ========================================

    const [result] =
      await db.execute(
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
        VALUES
        (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, NOW(), NOW()
        )
        `,
        [
          categoryId,
          brandId,
          unitId,
          taxId,
          supplierId,
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


    // ========================================
    // SUCCESS
    // ========================================

    return {

      success: true,

      message:
        "Product created successfully.",

      product: {
        id: result.insertId,

        category_id: categoryId,
        brand_id: brandId,
        unit_id: unitId,
        tax_id: taxId,
        supplier_id: supplierId,

        name: productName,
        sku: productSKU,
        barcode: productBarcode,

        description:
          productDescription,

        image: imagePath,

        cost_price: costPrice,
        selling_price: sellingPrice,

        reorder_level:
          reorderLevel,

        track_inventory:
          trackInventory,

        status:
          productStatus,
      },

    };

  } catch (error) {

    console.error(
      "Create product error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to create product.",
    };
  }
}