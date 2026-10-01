import React from 'react'
import Link from "next/link";
import {
 
  Plus,

  Building2,

} from "lucide-react";
export default function Topheader(){
  return (
   <>
    {/* ======================================
          HEADER
      ====================================== */}

      <div className="suppliers-header">

        <div>

          <div className="suppliers-title-row">

            <div className="suppliers-title-icon">
              <Building2 size={19} />
            </div>

            <div>

              <h1>
                Purchase Suppliers
              </h1>

              <p>
                Manage suppliers and track
                your purchase relationships.
              </p>

            </div>

          </div>

        </div>


        <Link
          className="add-supplier-btn"
          href={"/admin/suppliers/add"}
        >
          <Plus size={15} />
          Add Supplier
        </Link>

      </div>

   </>
  )
}
