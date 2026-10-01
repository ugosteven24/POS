import React from 'react'
import {
  Search,
  Plus,
  Users,

  Download,

} from "lucide-react";

export default function Topheader(){
  return (
    <>
       {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="customers-header ">

        <div className="customers-title">

          <div className="customers-title-icon">
            <Users size={19} />
          </div>

          <div>
            <h1>All Customers</h1>

            <p>
              Manage your customers and view their purchase history.
            </p>
          </div>

        </div>


        <div className="customers-header-actions">

          <button className="export-btn">
            <Download size={14} />
            Export
          </button>

          <button
            className="add-customer-btn"
            onClick={() =>
              (window.location.href =
                "/admin/customers/add")
            }
          >
            <Plus size={14} />
            Add Customer
          </button>

        </div>

      </div>
    </>
  )
}

