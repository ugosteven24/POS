"use server";

import db from "@/lib/db";
import { Rows } from "lucide-react";

export async function getCategories() {
  try {

    const [categories] = await db.query(`
      SELECT
        *
      FROM categories
      WHERE status = 'active'
      ORDER BY name ASC
    `);

    return categories;

  } catch (error) {

    console.error(
      "Get categories error:",
      error
    );

    return {
      success: false,
      categories: [],
      message: "Failed to load categories.",
    };
  }
}


export async function fetchCategories(search = ""){

  try{
    
    let sql =`
    SELECT * 
    FROM categories
    WHERE name LIKE ?`;


    const params = [`%${search}%`];

    const [rows] = await db.execute(sql, params);
    return rows;

  }catch(error){

  }

}

export async function stausCategories(status){

  try{
    
    let sql =`
    SELECT * 
    FROM categories
    WHERE status = ?`;


    const params = [status];

  

  

    const [rows] = await db.execute(sql, params);
    return rows || [];

  }catch(error){

  }

}


export default async function getCategoryStats(){
  const [row]= await db.query(`
    SELECT COUNT(*) AS total,
    SUM(status ='active')
    AS active,
    SUM(status='inactive') AS inactive 
    FROM categories`);

    return row[0]
}





export async function updateCategory({
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
        UPDATE categories
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
        message: "Category not found",
      };
    }

    return {
      success: true,
      message: "Category updated successfully",
    };

  } catch (error) {
    console.error("Update category error:", error);

    return {
      success: false,
      message: "Failed to update category",
    };
  }
}


export async function deactivateCategory(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "Category ID is required",
      };
    }

    const [result] = await db.query(
      `
        UPDATE categories
        SET status = 'delete'
        WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    return {
      success: true,
      message: "Category deactivated successfully",
    };

  } catch (error) {
    console.error("Deactivate category error:", error);

    return {
      success: false,
      message: "Failed to deactivate category",
    };
  }
}



export async function createCategory({
  name,
  description,
  status,
}) {
  try {
    if (!name?.trim()) {
      return {
        success: false,
        message: "Category name is required",
      };
    }

    const [result] = await db.query(
      `
        INSERT INTO categories
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
      message: "Category created successfully",
      id: result.insertId,
    };

  } catch (error) {
    console.error("Create category error:", error);

    return {
      success: false,
      message: "Failed to create category",
    };
  }
}