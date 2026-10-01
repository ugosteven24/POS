'use client'

import React from 'react'
import { useState } from 'react';

import {
    Plus,
    Receipt,
} from "lucide-react";
export default function Topheader() {
    const [showModal, setShowModal] = useState(false);

    const [editingCategory, setEditingCategory] = useState(null);
    const handleAdd = () => {

        setEditingCategory(null);

        setShowModal(true);
    };
    return (
        <>
            {/* ==================================================
          HEADER
      ================================================== */}

            <div className="expense-categories-header">

                <div className="expense-categories-title">

                    <div className="expense-categories-title-icon">
                        <Receipt size={19} />
                    </div>

                    <div>
                        <h1>
                            Expense Categories
                        </h1>

                        <p>
                            Organize and manage your business expenses
                        </p>
                    </div>

                </div>


             
               
            </div>
        </>
    )
}
