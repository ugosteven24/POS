'use client'
import React from 'react'
import {
  Plus,
  Download,
} from "lucide-react";
export default function Topheader(){
  return (
    <>
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="expenses-header">

        <div>
          <h1>Expenses</h1>
          <p>
            Track and manage all business expenses.
          </p>
        </div>

        <div className="header-actions">

          <button className="export-btn">
            <Download size={14} />
            Export
          </button>

          <button
            className="add-expense-btn"
            onClick={() => {
              window.location.href =
                "/admin/expenses/add";
            }}
          >
            <Plus size={15} />
            Add Expense
          </button>

        </div>

      </div>

    
    </>
  )
}
