"use server";

import db from "@/lib/db";



export async function getbranches(){

  const[row] = await db.query(`

     SELECT
        *
      FROM branches
      WHERE status = 'active'
      ORDER BY name ASC
    `)

    return row

}