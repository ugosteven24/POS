
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Receipt,
  Save,
  X,
  Wallet,
  FileText,
  CalendarDays,
  Tag,
  CreditCard,
  User,
  CheckCircle2,
} from "lucide-react";

import "./add-expense.css";

export default function AddExpensePage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    paymentMethod: "",
    expenseDate: new Date().toISOString().split("T")[0],
    description: "",
    reference: "",
    status: "Paid",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Expense title is required";
    }

    if (!form.category) {
      newErrors.category = "Select an expense category";
    }

    if (!form.amount || Number(form.amount) <= 0) {
      newErrors.amount = "Enter a valid expense amount";
    }

    if (!form.paymentMethod) {
      newErrors.paymentMethod = "Select a payment method";
    }

    if (!form.expenseDate) {
      newErrors.expenseDate = "Select an expense date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    /*
      Connect this to your Next.js API later:

      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    */

    console.log("Expense:", form);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleCancel = () => {
    window.location.href = "/admin/expenses";
  };

  const formattedAmount = Number(
    form.amount || 0
  ).toLocaleString("en-NG");

  return (
    <div className="add-expense-page content-wrapper">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="add-expense-header">

        <div className="header-left">

          <button
            type="button"
            className="back-button"
            onClick={handleCancel}
          >
            <ArrowLeft size={15} />
          </button>

          <div className="header-icon">
            <Receipt size={18} />
          </div>

          <div>
            <h1>Add Expense</h1>
            <p>
              Record a new business expense.
            </p>
          </div>

        </div>


        <div className="header-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            <X size={13} />
            Cancel
          </button>

          <button
            type="submit"
            form="expense-form"
            className="save-button"
          >
            <Save size={13} />
            Save Expense
          </button>

        </div>

      </div>


      {/* =========================================
          SUCCESS MESSAGE
      ========================================= */}

      {saved && (

        <div className="success-message">

          <CheckCircle2 size={16} />

          <div>
            <strong>
              Expense recorded successfully
            </strong>

            <span>
              The expense has been added to your records.
            </span>
          </div>

        </div>

      )}


      {/* =========================================
          MAIN FORM
      ========================================= */}

      <form
        id="expense-form"
        className="expense-form"
        onSubmit={handleSubmit}
      >

        <div className="expense-layout">

          {/* ======================================
              MAIN COLUMN
          ====================================== */}

          <div className="expense-main">

            {/* --------------------------------------
                BASIC INFORMATION
            -------------------------------------- */}

            <section className="form-card">

              <div className="section-header">

                <div className="section-icon blue">
                  <Receipt size={15} />
                </div>

                <div>
                  <h2>Expense Information</h2>

                  <p>
                    Enter the basic details of the expense.
                  </p>
                </div>

              </div>


              <div className="form-body">

                <div className="form-grid two">

                  {/* TITLE */}

                  <div className="form-group">

                    <label>
                      Expense Title
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g. Electricity Bill"
                      className={
                        errors.title
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.title && (
                      <small className="error-text">
                        {errors.title}
                      </small>
                    )}

                  </div>


                  {/* CATEGORY */}

                  <div className="form-group">

                    <label>
                      Expense Category
                      <span>*</span>
                    </label>

                    <div className="select-input">

                      <Tag size={13} />

                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className={
                          errors.category
                            ? "select-error"
                            : ""
                        }
                      >

                        <option value="">
                          Select category
                        </option>

                        <option value="Utilities">
                          Utilities
                        </option>

                        <option value="Rent">
                          Rent
                        </option>

                        <option value="Transport">
                          Transport
                        </option>

                        <option value="Fuel">
                          Fuel
                        </option>

                        <option value="Office Supplies">
                          Office Supplies
                        </option>

                        <option value="Maintenance">
                          Maintenance
                        </option>

                        <option value="Staff">
                          Staff
                        </option>

                        <option value="Marketing">
                          Marketing
                        </option>

                        <option value="Cleaning">
                          Cleaning
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>

                    {errors.category && (
                      <small className="error-text">
                        {errors.category}
                      </small>
                    )}

                  </div>


                  {/* AMOUNT */}

                  <div className="form-group">

                    <label>
                      Expense Amount
                      <span>*</span>
                    </label>

                    <div
                      className={`amount-input ${
                        errors.amount
                          ? "input-error"
                          : ""
                      }`}
                    >

                      <span className="currency">
                        ₦
                      </span>

                      <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />

                    </div>

                    {errors.amount && (
                      <small className="error-text">
                        {errors.amount}
                      </small>
                    )}

                  </div>


                  {/* DATE */}

                  <div className="form-group">

                    <label>
                      Expense Date
                      <span>*</span>
                    </label>

                    <div
                      className={`input-with-icon ${
                        errors.expenseDate
                          ? "input-error"
                          : ""
                      }`}
                    >

                      <CalendarDays size={13} />

                      <input
                        type="date"
                        name="expenseDate"
                        value={form.expenseDate}
                        onChange={handleChange}
                      />

                    </div>

                    {errors.expenseDate && (
                      <small className="error-text">
                        {errors.expenseDate}
                      </small>
                    )}

                  </div>


                  {/* PAYMENT */}

                  <div className="form-group">

                    <label>
                      Payment Method
                      <span>*</span>
                    </label>

                    <div className="select-input">

                      <CreditCard size={13} />

                      <select
                        name="paymentMethod"
                        value={form.paymentMethod}
                        onChange={handleChange}
                        className={
                          errors.paymentMethod
                            ? "select-error"
                            : ""
                        }
                      >

                        <option value="">
                          Select payment method
                        </option>

                        <option value="Cash">
                          Cash
                        </option>

                        <option value="Bank Transfer">
                          Bank Transfer
                        </option>

                        <option value="Card">
                          Card
                        </option>

                        <option value="Mobile Money">
                          Mobile Money
                        </option>

                      </select>

                    </div>

                    {errors.paymentMethod && (
                      <small className="error-text">
                        {errors.paymentMethod}
                      </small>
                    )}

                  </div>


                  {/* STATUS */}

                  <div className="form-group">

                    <label>
                      Payment Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >

                      <option value="Paid">
                        Paid
                      </option>

                      <option value="Pending">
                        Pending
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            </section>


            {/* --------------------------------------
                DESCRIPTION
            -------------------------------------- */}

            <section className="form-card">

              <div className="section-header">

                <div className="section-icon purple">
                  <FileText size={15} />
                </div>

                <div>
                  <h2>Description</h2>

                  <p>
                    Add details explaining this expense.
                  </p>
                </div>

              </div>


              <div className="form-body">

                <div className="form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe what this expense was for..."
                    rows="5"
                  />

                </div>

              </div>

            </section>


            {/* --------------------------------------
                REFERENCE & NOTES
            -------------------------------------- */}

            <section className="form-card">

              <div className="section-header">

                <div className="section-icon green">
                  <FileText size={15} />
                </div>

                <div>
                  <h2>Reference & Notes</h2>

                  <p>
                    Store additional information for this expense.
                  </p>
                </div>

              </div>


              <div className="form-body">

                <div className="form-grid two">

                  <div className="form-group">

                    <label>
                      Reference Number
                    </label>

                    <input
                      type="text"
                      name="reference"
                      value={form.reference}
                      onChange={handleChange}
                      placeholder="e.g. INV-10245"
                    />

                    <small className="field-help">
                      Invoice, receipt or transaction reference.
                    </small>

                  </div>


                  <div className="form-group">

                    <label>
                      Recorded By
                    </label>

                    <div className="recorded-user">

                      <div className="user-icon">
                        <User size={13} />
                      </div>

                      <div>
                        <strong>
                          Admin
                        </strong>

                        <span>
                          Current user
                        </span>
                      </div>

                    </div>

                  </div>

                </div>


                <div className="form-group notes-group">

                  <label>
                    Internal Notes
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Add internal notes..."
                    rows="4"
                  />

                </div>

              </div>

            </section>


            {/* --------------------------------------
                BOTTOM ACTIONS
            -------------------------------------- */}

            <div className="bottom-actions">

              <button
                type="button"
                className="bottom-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bottom-save"
              >
                <Save size={14} />
                Save Expense
              </button>

            </div>

          </div>


          {/* ======================================
              RIGHT SIDEBAR
          ====================================== */}

          <aside className="expense-sidebar">

            {/* --------------------------------------
                EXPENSE PREVIEW
            -------------------------------------- */}

            <div className="preview-card">

              <div className="preview-header">
                <span>
                  EXPENSE PREVIEW
                </span>
              </div>


              <div className="preview-amount">

                <div className="preview-wallet">
                  <Wallet size={17} />
                </div>

                <span>
                  EXPENSE AMOUNT
                </span>

                <strong>
                  ₦{formattedAmount}
                </strong>

              </div>


              <div className="preview-divider"></div>


              <div className="preview-details">

                <div className="preview-detail">

                  <Receipt size={13} />

                  <div>
                    <span>Expense</span>

                    <strong>
                      {form.title ||
                        "Not specified"}
                    </strong>
                  </div>

                </div>


                <div className="preview-detail">

                  <Tag size={13} />

                  <div>
                    <span>Category</span>

                    <strong>
                      {form.category ||
                        "Not selected"}
                    </strong>
                  </div>

                </div>


                <div className="preview-detail">

                  <CreditCard size={13} />

                  <div>
                    <span>Payment Method</span>

                    <strong>
                      {form.paymentMethod ||
                        "Not selected"}
                    </strong>
                  </div>

                </div>


                <div className="preview-detail">

                  <CalendarDays size={13} />

                  <div>
                    <span>Date</span>

                    <strong>
                      {form.expenseDate
                        ? new Date(
                            form.expenseDate
                          ).toLocaleDateString(
                            "en-NG",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "Not selected"}
                    </strong>
                  </div>

                </div>

              </div>


              <div className="preview-divider"></div>


              <div className="preview-status">

                <span>
                  Payment Status
                </span>

                <strong
                  className={
                    form.status === "Paid"
                      ? "paid"
                      : "pending"
                  }
                >
                  <i></i>
                  {form.status}
                </strong>

              </div>

            </div>


            {/* --------------------------------------
                ACCOUNTING NOTICE
            -------------------------------------- */}

            <div className="notice-card">

              <div className="notice-icon">
                <Wallet size={14} />
              </div>

              <div>

                <strong>
                  Expense accounting
                </strong>

                <p>
                  Paid expenses will be included
                  in your expense reports and
                  deducted from the business cash
                  flow.
                </p>

              </div>

            </div>


            {/* --------------------------------------
                QUICK INFO
            -------------------------------------- */}

            <div className="quick-info">

              <div className="quick-info-row">

                <span>
                  Status
                </span>

                <strong
                  className={
                    form.status === "Paid"
                      ? "paid-text"
                      : "pending-text"
                  }
                >
                  {form.status}
                </strong>

              </div>


              <div className="quick-info-row">

                <span>
                  Amount
                </span>

                <strong>
                  ₦{formattedAmount}
                </strong>

              </div>

            </div>

          </aside>

        </div>

      </form>

    </div>
  );
}

