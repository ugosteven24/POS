"use server";

import db from "@/lib/db";
import { Rows } from "lucide-react";

export async function getUnits() {
  try {

    const [units] = await db.query(`
      SELECT
        *
      FROM units
      WHERE status = 'active'
      ORDER BY name ASC
    `);

    return units;

  } catch (error) {

    console.error(
      "Get units error:",
      error
    );

    return {
      success: false,
      categories: [],
      message: "Failed to load categories.",
    };
  }
}


export async function fetchUnits(search = ""){

  try{
    
    let sql =`
    SELECT * 
    FROM units
    WHERE name LIKE ?`;


    const params = [`%${search}%`];

    const [rows] = await db.execute(sql, params);
    return rows;

  }catch(error){

  }

}

export async function stausUnits(status){

  try{
    
    let sql =`
    SELECT * 
    FROM units
    WHERE status = ?`;


    const params = [status];

  

  

    const [rows] = await db.execute(sql, params);
    return rows || [];

  }catch(error){

  }

}


export default async function getUnitsStats(){
  const [row]= await db.query(`
    SELECT COUNT(*) AS total,
    SUM(status ='active')
    AS active,
    SUM(status='inactive') AS inactive 
    FROM units`);

    return row[0]
}





export async function updateUnits({
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
        UPDATE units
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
        message: "units not found",
      };
    }

    return {
      success: true,
      message: "units updated successfully",
    };

  } catch (error) {
    console.error("Update units error:", error);

    return {
      success: false,
      message: "Failed to units units",
    };
  }
}


export async function deactivateUnits(id) {
  try {
    if (!id) {
      return {
        success: false,
        message: "units ID is required",
      };
    }

    const [result] = await db.query(
      `
        UPDATE units
        SET status = 'delete'
        WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "units not found",
      };
    }

    return {
      success: true,
      message: "units deactivated successfully",
    };

  } catch (error) {
    console.error("Deactivate units error:", error);

    return {
      success: false,
      message: "Failed to deactivate units",
    };
  }
}



export async function createUnits({
  name,
  short_name,
  description,
  status,
}) {
  try {
    if (!name?.trim()) {
      return {
        success: false,
        message: "units name is required",
      };
    }

    const [result] = await db.query(
      `
        INSERT INTO units
        (name, short_name, description, status)
        VALUES (?, ?, ?, ?)
      `,
      [
        name.trim(),
        short_name?.trim() || null,
        description?.trim() || null,
        status || "active",
      ]
    );

    return {
      success: true,
      message: "units created successfully",
      id: result.insertId,
    };

  } catch (error) {
    console.error("Create units error:", error);

    return {
      success: false,
      message: "Failed to create units",
    };
  }
}