"use server";

import db from "@/lib/db";



export async function getpayment(){

  const[row] = await db.query(`

     SELECT
        *
      FROM payment_methods
      WHERE status = 'active'
      ORDER BY name ASC
    `)

    return row

}