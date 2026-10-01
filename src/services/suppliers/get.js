"use server";

import db from "@/lib/db";

export default async function getSuppliers() {
  try {

    const [suppliers] = await db.execute(`
      SELECT *
      FROM suppliers
      WHERE status = 'Active'
      ORDER BY supplier_name ASC
    `);

    return suppliers;
   

  } catch (error) {

    console.error("Get suppliers error:", error);

    return [];
  }
}



export async function createSupplier(formData) {
  try {
    const supplierName = formData.get("supplierName")?.trim();
    const companyName = formData.get("companyName")?.trim() || null;
    const phone = formData.get("phone")?.trim();
    const alternatePhone =
      formData.get("alternatePhone")?.trim() || null;

    const email = formData.get("email")?.trim() || null;

    const address = formData.get("address")?.trim() || null;
    const city = formData.get("city")?.trim() || null;
    const state = formData.get("state")?.trim() || null;
    const country =
      formData.get("country")?.trim() || "Nigeria";

    const taxNumber =
      formData.get("taxNumber")?.trim() || null;

    const paymentTerms =
      formData.get("paymentTerms") || "Due on Receipt";

    const openingBalance =
      Number(formData.get("openingBalance")) || 0;

    const balanceType =
      formData.get("balanceType") || "Payable";

    const status =
      formData.get("status") || "Active";

    const notes =
      formData.get("notes")?.trim() || null;

    // Server-side validation
    if (!supplierName) {
      return {
        success: false,
        message: "Supplier name is required",
      };
    }

    if (!phone) {
      return {
        success: false,
        message: "Phone number is required",
      };
    }

    if (openingBalance < 0) {
      return {
        success: false,
        message: "Opening balance cannot be negative",
      };
    }

    const sql = `
      INSERT INTO suppliers (
        supplier_name,
        company_name,
        phone,
        alternate_phone,
        email,
        address,
        city,
        state,
        country,
        tax_number,
        payment_terms,
        opening_balance,
        balance_type,
        status,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      supplierName,
      companyName,
      phone,
      alternatePhone,
      email,
      address,
      city,
      state,
      country,
      taxNumber,
      paymentTerms,
      openingBalance,
      balanceType,
      status,
      notes,
    ];

    const [result] = await db.execute(sql, values);

    return {
      success: true,
      message: "Supplier created successfully",
      supplierId: result.insertId,
    };
  } catch (error) {
    console.error("CREATE SUPPLIER ERROR:", error);

    return {
      success: false,
      message: "Failed to create supplier",
    };
  }
}