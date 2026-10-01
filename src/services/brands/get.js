"use server";

import db from "@/lib/db";
import { Rows } from "lucide-react";

export async function getBrands() {
  try {

    const [brands] = await db.query(`
      SELECT
        *
      FROM brands
      WHERE status = 'active'
      ORDER BY name ASC
    `);

    return brands;

  } catch (error) {

    console.error(
      "Get brands error:",
      error
    );

    return {
      success: false,
      categories: [],
      message: "Failed to load categories.",
    };
  }
}


export async function fetchBrands(search = ""){

  try{
    
    let sql =`
    SELECT * 
    FROM brands
    WHERE name LIKE ?`;


    const params = [`%${search}%`];

    const [rows] = await db.execute(sql, params);
    return rows;

  }catch(error){

  }

}

export async function stausBrands(status){

  try{
    
    let sql =`
    SELECT * 
    FROM brands
    WHERE status = ?`;


    const params = [status];

  

  

    const [rows] = await db.execute(sql, params);
    return rows || [];

  }catch(error){

  }

}


export default async function getBrandsStats(){
  const [row]= await db.query(`
    SELECT COUNT(*) AS total,
    SUM(status ='active')
    AS active,
    SUM(status='inactive') AS inactive 
    FROM brands`);

    return row[0]
}





export async function updateBrands({
  id,
  name,
  description,
  status,
}) {
  try {
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
        UPDATE brands
        SET
          name = ?,
          description = ?,
          status = ?
        WHERE id = ?
      `,
      [
        name.trim(),
        description?.trim() || null,
        status,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "brands not found",
      };
    }

    return {
      success: true,
      message: "Category updated successfully",
    };

  } catch (error) {
    console.error("Update brands error:", error);

    return {
      success: false,
      message: "Failed to brands brands",
    };
  }
}


export async function deactivateBrands(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "brands ID is required",
      };
    }

    const [result] = await db.query(
      `
        UPDATE brands
        SET status = 'delete'
        WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "brands not found",
      };
    }

    return {
      success: true,
      message: "brands deactivated successfully",
    };

  } catch (error) {
    console.error("Deactivate brands error:", error);

    return {
      success: false,
      message: "Failed to deactivate brands",
    };
  }
}




export async function createBrands(prevState, formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");

    if (!name?.trim()) {
      return {
        success: false,
        message: "Brand name is required",
      };
    }

    const [result] = await db.query(
      `
        INSERT INTO brands
        (name, description, status)
        VALUES (?, ?, ?)
      `,
      [
        name.trim(),
        description?.trim() || null,
        status || "active",
      ]
    );

    return {
      success: true,
      message: "Brand created successfully",
      id: result.insertId,
    };

  } catch (error) {
    console.error("Create brand error:", error);

    return {
      success: false,
      message: "Failed to create brand",
    };
  }
}