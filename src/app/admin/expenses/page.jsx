
"use client";

import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  CalendarDays,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Receipt,
  Wallet,
  TrendingUp,
  Clock3,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import "./expenses.css";

const expenses = [
  {
    id: "EXP-0001",
    title: "Shop Electricity",
    category: "Utilities",
    description: "Monthly electricity bill",
    amount: 85000,
    paymentMethod: "Cash",
    date: "2026-08-28",
    status: "Paid",
    createdBy: "Admin",
  },
  {
    id: "EXP-0002",
    title: "Internet Subscription",
    category: "Utilities",
    description: "Business internet subscription",
    amount: 35000,
    paymentMethod: "Bank Transfer",
    date: "2026-08-27",
    status: "Paid",
    createdBy: "Admin",
  },
  {
    id: "EXP-0003",
    title: "Transportation",
    category: "Transport",
    description: "Product delivery transportation",
    amount: 18000,
    paymentMethod: "Cash",
    date: "2026-08-26",
    status: "Paid",
    createdBy: "Cashier",
  },
  {
    id: "EXP-0004",
    title: "Office Supplies",
    category: "Office Supplies",
    description: "Receipt papers and stationery",
    amount: 12500,
    paymentMethod: "Cash",
    date: "2026-08-25",
    status: "Paid",
    createdBy: "Admin",
  },
  {
    id: "EXP-0005",
    title: "Generator Fuel",
    category: "Fuel",
    description: "Fuel purchase for generator",
    amount: 42000,
    paymentMethod: "Cash",
    date: "2026-08-24",
    status: "Paid",
    createdBy: "Manager",
  },
  {
    id: "EXP-0006",
    title: "Shop Maintenance",
    category: "Maintenance",
    description: "Air conditioner maintenance",
    amount: 55000,
    paymentMethod: "Bank Transfer",
    date: "2026-08-22",
    status: "Pending",
    createdBy: "Manager",
  },
  {
    id: "EXP-0007",
    title: "Staff Welfare",
    category: "Staff",
    description: "Staff welfare expenses",
    amount: 25000,
    paymentMethod: "Cash",
    date: "2026-08-20",
    status: "Paid",
    createdBy: "Admin",
  },
  {
    id: "EXP-0008",
    title: "Advertising",
    category: "Marketing",
    description: "Social media advertising",
    amount: 30000,
    paymentMethod: "Bank Transfer",
    date: "2026-08-18",
    status: "Paid",
    createdBy: "Admin",
  },
  {
    id: "EXP-0009",
    title: "Cleaning Services",
    category: "Cleaning",
    description: "Weekly shop cleaning",
    amount: 10000,
    paymentMethod: "Cash",
    date: "2026-08-16",
    status: "Paid",
    createdBy: "Manager",
  },
  {
    id: "EXP-0010",
    title: "Equipment Repair",
    category: "Maintenance",
    description: "POS printer repair",
    amount: 22000,
    paymentMethod: "Cash",
    date: "2026-08-15",
    status: "Pending",
    createdBy: "Admin",
  },
];

const categories = [
  "All Categories",
  "Utilities",
  "Transport",
  "Office Supplies",
  "Fuel",
  "Maintenance",
  "Staff",
  "Marketing",
  "Cleaning",
];

const paymentMethods = [
  "All Payment Methods",
  "Cash",
  "Bank Transfer",
  "Card",
];

export default function AllExpensesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [paymentMethod, setPaymentMethod] = useState(
    "All Payment Methods"
  );
  const [status, setStatus] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("This Month");
  const [page, setPage] = useState(1);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchMatch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        expense.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        expense.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All Categories" ||
        expense.category === category;

      const paymentMatch =
        paymentMethod === "All Payment Methods" ||
        expense.paymentMethod === paymentMethod;

      const statusMatch =
        status === "All Status" ||
        expense.status === status;

      return (
        searchMatch &&
        categoryMatch &&
        paymentMatch &&
        statusMatch
      );
    });
  }, [search, category, paymentMethod, status]);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const paidExpenses = expenses
    .filter((expense) => expense.status === "Paid")
    .reduce((total, expense) => total + expense.amount, 0);

  const pendingExpenses = expenses
    .filter((expense) => expense.status === "Pending")
    .reduce((total, expense) => total + expense.amount, 0);

  const averageExpense =
    expenses.length > 0
      ? totalExpenses / expenses.length
      : 0;

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setPaymentMethod("All Payment Methods");
    setStatus("All Status");
    setDateFilter("This Month");
  };

  return (
    <div className="expenses-page  content-wrapper">

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


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div className="expense-summary">

        <div className="summary-card">

          <div className="summary-top">
            <div className="summary-icon blue">
              <Receipt size={17} />
            </div>

            <span className="summary-label">
              TOTAL EXPENSES
            </span>
          </div>

          <div className="summary-value">
            {formatCurrency(totalExpenses)}
          </div>

          <div className="summary-footer">
            <TrendingUp size={11} />
            <span>
              {expenses.length} expense records
            </span>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-top">
            <div className="summary-icon green">
              <Wallet size={17} />
            </div>

            <span className="summary-label">
              PAID EXPENSES
            </span>
          </div>

          <div className="summary-value">
            {formatCurrency(paidExpenses)}
          </div>

          <div className="summary-footer green-text">
            <span>
              Completed payments
            </span>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-top">
            <div className="summary-icon orange">
              <Clock3 size={17} />
            </div>

            <span className="summary-label">
              PENDING
            </span>
          </div>

          <div className="summary-value">
            {formatCurrency(pendingExpenses)}
          </div>

          <div className="summary-footer orange-text">
            <span>
              Awaiting payment
            </span>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-top">
            <div className="summary-icon purple">
              <TrendingUp size={17} />
            </div>

            <span className="summary-label">
              AVERAGE EXPENSE
            </span>
          </div>

          <div className="summary-value">
            {formatCurrency(
              Math.round(averageExpense)
            )}
          </div>

          <div className="summary-footer">
            <span>
              Per expense record
            </span>
          </div>

        </div>

      </div>


      {/* =========================================
          TABLE CARD
      ========================================= */}

      <div className="expenses-card">

        {/* TOOLBAR */}

        <div className="expenses-toolbar">

          <div className="toolbar-title">
            <h2>All Expenses</h2>

            <span>
              {filteredExpenses.length} records
            </span>
          </div>


          <div className="toolbar-controls">

            {/* SEARCH */}

            <div className="expense-search">

              <Search size={13} />

              <input
                type="text"
                placeholder="Search expenses..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="clear-search"
                >
                  <X size={11} />
                </button>
              )}

            </div>


            {/* DATE */}

            <div className="select-wrapper">

              <CalendarDays size={12} />

              <select
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
              >
                <option>This Month</option>
                <option>Today</option>
                <option>This Week</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>

            </div>


            {/* FILTER */}

            <button
              className="filter-button"
              onClick={() => {
                document
                  .querySelector(".advanced-filters")
                  ?.classList.toggle("show");
              }}
            >
              <Filter size={13} />
              Filters
            </button>

          </div>

        </div>


        {/* ADVANCED FILTERS */}

        <div className="advanced-filters">

          <div className="filter-field">

            <label>Category</label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>


          <div className="filter-field">

            <label>Payment Method</label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            >
              {paymentMethods.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>


          <div className="filter-field">

            <label>Status</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>

          </div>


          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear filters
          </button>

        </div>


        {/* ======================================
            TABLE
        ====================================== */}

        <div className="table-wrapper">

          <table className="expenses-table">

            <thead>

              <tr>

                <th>
                  EXPENSE
                </th>

                <th>
                  CATEGORY
                </th>

                <th>
                  DATE
                </th>

                <th>
                  PAYMENT METHOD
                </th>

                <th>
                  AMOUNT
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  CREATED BY
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredExpenses.length > 0 ? (
                filteredExpenses.map(
                  (expense) => (

                    <tr key={expense.id}>

                      {/* EXPENSE */}

                      <td>

                        <div className="expense-info">

                          <div className="expense-icon">
                            <Receipt size={14} />
                          </div>

                          <div>

                            <strong>
                              {expense.title}
                            </strong>

                            <span>
                              {expense.id}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td>

                        <span className="category-badge">
                          {expense.category}
                        </span>

                      </td>


                      {/* DATE */}

                      <td>

                        <span className="date-text">
                          {formatDate(expense.date)}
                        </span>

                      </td>


                      {/* PAYMENT */}

                      <td>

                        <span className="payment-method">
                          {expense.paymentMethod}
                        </span>

                      </td>


                      {/* AMOUNT */}

                      <td>

                        <strong className="amount">
                          {formatCurrency(
                            expense.amount
                          )}
                        </strong>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${
                            expense.status === "Paid"
                              ? "paid"
                              : "pending"
                          }`}
                        >
                          <i></i>
                          {expense.status}
                        </span>

                      </td>


                      {/* CREATED BY */}

                      <td>

                        <span className="created-by">
                          {expense.createdBy}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <div className="action-wrapper">

                          <button className="action-button">
                            <MoreHorizontal
                              size={15}
                            />
                          </button>

                          <div className="action-menu">

                            <button>
                              <Eye size={12} />
                              View
                            </button>

                            <button>
                              <Pencil size={12} />
                              Edit
                            </button>

                            <button className="delete">
                              <Trash2 size={12} />
                              Delete
                            </button>

                          </div>

                        </div>

                      </td>

                    </tr>

                  )
                )
              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-state"
                  >

                    <div className="empty-icon">
                      <Receipt size={20} />
                    </div>

                    <strong>
                      No expenses found
                    </strong>

                    <span>
                      Try adjusting your search
                      or filters.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ======================================
            PAGINATION
        ====================================== */}

        <div className="table-footer">

          <div className="showing-text">
            Showing{" "}
            <strong>
              {filteredExpenses.length > 0
                ? 1
                : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {filteredExpenses.length}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredExpenses.length}
            </strong>{" "}
            expenses
          </div>


          <div className="pagination">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((prev) =>
                  Math.max(1, prev - 1)
                )
              }
            >
              <ChevronLeft size={13} />
            </button>

            <button className="active-page">
              {page}
            </button>

            <button
              onClick={() =>
                setPage((prev) => prev + 1)
              }
            >
              <ChevronRight size={13} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

