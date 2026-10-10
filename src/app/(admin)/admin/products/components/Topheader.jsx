import React from 'react'
import {
  Plus,
  Download,
 
} from "lucide-react";
import Link from "next/link";
export default function Topheader(){
  return (
    <>
    
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="products-header">

        <div>

          <div className="products-breadcrumb">

            <span>
              Dashboard
            </span>

            <span>
              /
            </span>

            <strong>
              Products
            </strong>

          </div>


          <h1>
            All Products
          </h1>


          <p>
            Manage your products,
            inventory and pricing.
          </p>

        </div>


        <div className="header-actions">

          <button
            type="button"
            className="export-btn"
          >

            <Download size={17} />

            Export

          </button>


          <Link
            className="add-product-btn"
            href="/admin/products/add"
          >

            <Plus size={18} />

            Add Product

          </Link>

        </div>

      </div>
    </>
  )
}
