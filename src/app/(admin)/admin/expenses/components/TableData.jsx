"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  CalendarDays,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Receipt,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { getExpenses } from "@/services/expenses/expenses";
import { getExpensesCategorys } from "@/services/expenses/expenses";
import { getpayment } from "@/services/paymentMethod/paymentService";

const ITEMS_PER_PAGE = 6;

// Accept either [..] or { data: [..] } from the service
const toArray = (value) =>
  Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : [];

// Local-time YYYY-MM-DD (avoids toISOString() shifting the day by timezone)
const fmtDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

// Turn the dropdown label into { date_from, date_to } (inclusive)
const getDateParams = (filter) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();

  switch (filter) {
    case "Today":
      return { date_from: fmtDate(now), date_to: fmtDate(now) };

    case "This Week": {
      const sinceMonday = (now.getDay() + 6) % 7; // week starts Monday
      return {
        date_from: fmtDate(new Date(y, m, d - sinceMonday)),
        date_to: fmtDate(new Date(y, m, d - sinceMonday + 6)),
      };
    }

    case "This Month":
      return {
        date_from: fmtDate(new Date(y, m, 1)),
        date_to: fmtDate(new Date(y, m + 1, 0)),
      };

    case "Last Month":
      return {
        date_from: fmtDate(new Date(y, m - 1, 1)),
        date_to: fmtDate(new Date(y, m, 0)),
      };

    case "This Year":
      return {
        date_from: fmtDate(new Date(y, 0, 1)),
        date_to: fmtDate(new Date(y, 11, 31)),
      };

    default: // "All Time"
      return { date_from: null, date_to: null };
  }
};

export default function TableData() {
  // ---------- selected filter values ----------
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState(""); // "" = all
  const [paymentMethodId, setPaymentMethodId] = useState(""); // "" = all
  const [status, setStatus] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("This Month");
  const [showFilters, setShowFilters] = useState(false);

  // ---------- dropdown option lists ----------
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // ---------- table data ----------
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search so we don't call the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Load dropdown options once
  useEffect(() => {
    let cancelled = false;

    const loadLookups = async () => {
      try {
        const [cats, pays] = await Promise.all([
          getExpensesCategorys(),
          getpayment(),
        ]);

        if (cancelled) return;

        setCategories(toArray(cats));
        setPaymentMethods(toArray(pays));
      } catch (error) {
        console.error("Load filter options error:", error);
      }
    };

    loadLookups();

    return () => {
      cancelled = true;
    };
  }, []);

  // Go back to page 1 whenever a filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, status, categoryId, paymentMethodId, dateFilter]);

  // Fetch expenses from the server
  useEffect(() => {
    let cancelled = false;

    const loadExpenses = async () => {
      try {
        setLoading(true);

        const result = await getExpenses({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: debouncedSearch,
          status,
          category_id: categoryId || null,
          payment_method_id: paymentMethodId || null,
          ...getDateParams(dateFilter),
        });

        if (cancelled) return;

        if (result?.success) {
          setExpenses(result.data || []);
          setTotalExpenses(result.pagination?.total || 0);
          setTotalPages(result.pagination?.totalPages || 0);
        } else {
          setExpenses([]);
          setTotalExpenses(0);
          setTotalPages(0);
        }
      } catch (error) {
        if (cancelled) return;
        console.error("Load expenses error:", error);
        setExpenses([]);
        setTotalExpenses(0);
        setTotalPages(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadExpenses();

    return () => {
      cancelled = true;
    };
  }, [
    currentPage,
    debouncedSearch,
    status,
    categoryId,
    paymentMethodId,
    dateFilter,
  ]);

  const formatCurrency = (amount) => {
    return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryId("");
    setPaymentMethodId("");
    setStatus("All Status");
    setDateFilter("This Month");
  };

  // "Showing X to Y of Z"
  const rangeStart =
    totalExpenses === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = Math.min(
    (currentPage - 1) * ITEMS_PER_PAGE + expenses.length,
    totalExpenses
  );

  return (
    <div className="expenses-card">
      {/* TOOLBAR */}
      <div className="expenses-toolbar">
        <div className="toolbar-title">
          <h2>All Expenses</h2>
          <span>{totalExpenses} records</span>
        </div>

        <div className="toolbar-controls">
          {/* SEARCH */}
          <div className="expense-search">
            <Search size={13} />

            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
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
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option>This Month</option>
              <option>Today</option>
              <option>This Week</option>
              <option>Last Month</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>

          {/* FILTER */}
          <button
            type="button"
            className="filter-button"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Filter size={13} />
            Filters
          </button>
        </div>
      </div>

      {/* ADVANCED FILTERS */}
      <div className={`advanced-filters ${showFilters ? "show" : ""}`}>
        <div className="filter-field">
          <label>Category</label>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label>Payment Method</label>

          <select
            value={paymentMethodId}
            onChange={(e) => setPaymentMethodId(e.target.value)}
          >
            <option value="">All Payment Methods</option>
            {paymentMethods.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label>Status</label>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </div>

        <button type="button" className="clear-filters" onClick={clearFilters}>
          Clear filters
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>EXPENSE</th>
              <th>CATEGORY</th>
              <th>DATE</th>
              <th>PAYMENT METHOD</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>CREATED BY</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="empty-state">
                  <span>Loading expenses...</span>
                </td>
              </tr>
            ) : expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  {/* EXPENSE */}
                  <td>
                    <div className="expense-info">
                      <div className="expense-icon">
                        <Receipt size={14} />
                      </div>

                      <div>
                        <strong>{expense.title}</strong>
                        <span>{expense.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td>
                    <span className="category-badge">{expense.category}</span>
                  </td>

                  {/* DATE */}
                  <td>
                    <span className="date-text">{formatDate(expense.date)}</span>
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
                      {formatCurrency(expense.amount)}
                    </strong>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`status-badge ${
                        expense.status === "Paid" ? "paid" : "pending"
                      }`}
                    >
                      <i></i>
                      {expense.status}
                    </span>
                  </td>

                  {/* CREATED BY */}
                  <td>
                    <span className="created-by">{expense.createdBy}</span>
                  </td>

                  {/* ACTION */}
                  <td>
                    <div className="action-wrapper">
                      <button type="button" className="action-button">
                        <MoreHorizontal size={15} />
                      </button>

                      <div className="action-menu">
                        <button type="button">
                          <Eye size={12} />
                          View
                        </button>

                        <button type="button">
                          <Pencil size={12} />
                          Edit
                        </button>

                        <button type="button" className="delete">
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="empty-state">
                  <div className="empty-icon">
                    <Receipt size={20} />
                  </div>

                  <strong>No expenses found</strong>

                  <span>Try adjusting your search or filters.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="table-footer">
        <div className="showing-text">
          Showing <strong>{rangeStart}</strong> to <strong>{rangeEnd}</strong>{" "}
          of <strong>{totalExpenses}</strong> expenses
        </div>

        <div className="pagination">
          <button
            type="button"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeft size={13} />
          </button>

          <button type="button" className="active-page">
            {currentPage}
          </button>

          <button
            type="button"
            disabled={currentPage >= totalPages || loading}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}