
"use client";

import React, { useMemo, useState } from "react";
import {
  Download,
  RefreshCw,
  Filter,
  Search,
  Wallet,
  CreditCard,
  Clock3,
  Receipt,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  CalendarDays,
  Tag,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import "./expenses-report.css";

const expenses = [
  {
    id: 1,
    reference: "EXP-00842",
    date: "Aug 29, 2026",
    title: "Store Electricity",
    category: "Utilities",
    vendor: "EEDC",
    paymentMethod: "Bank Transfer",
    amount: 185000,
    status: "Paid",
  },
  {
    id: 2,
    reference: "EXP-00841",
    date: "Aug 28, 2026",
    title: "Staff Transportation",
    category: "Transport",
    vendor: "Internal",
    paymentMethod: "Cash",
    amount: 45000,
    status: "Paid",
  },
  {
    id: 3,
    reference: "EXP-00840",
    date: "Aug 27, 2026",
    title: "Office Internet",
    category: "Internet",
    vendor: "Spectranet",
    paymentMethod: "Bank Transfer",
    amount: 38000,
    status: "Paid",
  },
  {
    id: 4,
    reference: "EXP-00839",
    date: "Aug 26, 2026",
    title: "Shop Cleaning",
    category: "Maintenance",
    vendor: "CleanPro Services",
    paymentMethod: "Cash",
    amount: 25000,
    status: "Paid",
  },
  {
    id: 5,
    reference: "EXP-00838",
    date: "Aug 25, 2026",
    title: "Printer Toner",
    category: "Office Supplies",
    vendor: "PrintHub",
    paymentMethod: "Cash",
    amount: 32000,
    status: "Paid",
  },
  {
    id: 6,
    reference: "EXP-00837",
    date: "Aug 23, 2026",
    title: "Generator Fuel",
    category: "Utilities",
    vendor: "TotalEnergies",
    paymentMethod: "Cash",
    amount: 95000,
    status: "Paid",
  },
  {
    id: 7,
    reference: "EXP-00836",
    date: "Aug 21, 2026",
    title: "Equipment Repair",
    category: "Maintenance",
    vendor: "TechFix",
    paymentMethod: "Bank Transfer",
    amount: 120000,
    status: "Partial",
  },
  {
    id: 8,
    reference: "EXP-00835",
    date: "Aug 20, 2026",
    title: "Store Security",
    category: "Security",
    vendor: "SecureGuard",
    paymentMethod: "Bank Transfer",
    amount: 75000,
    status: "Unpaid",
  },
  {
    id: 9,
    reference: "EXP-00834",
    date: "Aug 18, 2026",
    title: "Delivery Fuel",
    category: "Transport",
    vendor: "Internal",
    paymentMethod: "Cash",
    amount: 42000,
    status: "Paid",
  },
  {
    id: 10,
    reference: "EXP-00833",
    date: "Aug 16, 2026",
    title: "Stationery",
    category: "Office Supplies",
    vendor: "OfficeMart",
    paymentMethod: "Cash",
    amount: 18500,
    status: "Paid",
  },
];

const categoryData = [
  {
    name: "Utilities",
    amount: 842000,
    percentage: 28,
  },
  {
    name: "Maintenance",
    amount: 615000,
    percentage: 21,
  },
  {
    name: "Transport",
    amount: 485000,
    percentage: 16,
  },
  {
    name: "Staff",
    amount: 420000,
    percentage: 14,
  },
  {
    name: "Office Supplies",
    amount: 315000,
    percentage: 11,
  },
  {
    name: "Other",
    amount: 295000,
    percentage: 10,
  },
];

const monthlyData = [
  { month: "Mar", amount: 2180000 },
  { month: "Apr", amount: 2450000 },
  { month: "May", amount: 2710000 },
  { month: "Jun", amount: 2520000 },
  { month: "Jul", amount: 2840000 },
  { month: "Aug", amount: 2972000 },
];

export default function ExpensesReportPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("This Month");
  const [activeTab, setActiveTab] = useState("expenses");

  const formatCurrency = (amount) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchMatch =
        `${expense.reference} ${expense.title} ${expense.vendor}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All Categories" ||
        expense.category === category;

      const statusMatch =
        status === "All Status" ||
        expense.status === status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [search, category, status]);

  const maxMonthlyValue = Math.max(
    ...monthlyData.map((item) => item.amount)
  );

  return (
    <div className="expenses-report-page content-wrapper">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="expenses-header">

        <div>
          <h1>Expenses Report</h1>

          <p>
            Monitor business expenses, spending patterns and outstanding payments.
          </p>
        </div>

        <div className="expenses-header-actions">

          <button className="expenses-refresh">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="expenses-export">
            <Download size={13} />
            Export Report
          </button>

        </div>

      </div>


      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="expenses-filter-card">

        <div className="expenses-filter-heading">

          <div className="expenses-filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Report Filters</strong>

            <span>
              Filter expenses by date, category and payment status.
            </span>
          </div>

        </div>


        <div className="expenses-filters">

          <div className="expenses-select">

            <CalendarDays size={12} />

            <select
              value={dateRange}
              onChange={(e) =>
                setDateRange(e.target.value)
              }
            >
              <option>This Month</option>
              <option>Today</option>
              <option>This Week</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>

            <ChevronDown size={10} />

          </div>


          <div className="expenses-select">

            <Tag size={12} />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>All Categories</option>
              <option>Utilities</option>
              <option>Maintenance</option>
              <option>Transport</option>
              <option>Staff</option>
              <option>Office Supplies</option>
              <option>Security</option>
              <option>Internet</option>
            </select>

            <ChevronDown size={10} />

          </div>


          <div className="expenses-select">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>All Status</option>
              <option>Paid</option>
              <option>Partial</option>
              <option>Unpaid</option>
            </select>

            <ChevronDown size={10} />

          </div>

        </div>

      </div>


      {/* ==========================================
          KPI CARDS
      ========================================== */}

      <div className="expenses-kpis">

        <div className="expenses-kpi">

          <div className="expenses-kpi-top">

            <div className="expenses-kpi-icon blue">
              <Wallet size={16} />
            </div>

            <span>TOTAL EXPENSES</span>

          </div>

          <strong>₦2.97M</strong>

          <div className="expenses-kpi-change negative">
            <ArrowUpRight size={11} />
            4.6%
            <small>vs last month</small>
          </div>

        </div>


        <div className="expenses-kpi">

          <div className="expenses-kpi-top">

            <div className="expenses-kpi-icon green">
              <CreditCard size={16} />
            </div>

            <span>AMOUNT PAID</span>

          </div>

          <strong>₦2.68M</strong>

          <div className="expenses-kpi-change positive">
            <ArrowUpRight size={11} />
            6.2%
            <small>vs last month</small>
          </div>

        </div>


        <div className="expenses-kpi">

          <div className="expenses-kpi-top">

            <div className="expenses-kpi-icon orange">
              <Clock3 size={16} />
            </div>

            <span>OUTSTANDING</span>

          </div>

          <strong>₦292K</strong>

          <div className="expenses-kpi-change negative">
            <ArrowUpRight size={11} />
            8.4%
            <small>to be paid</small>
          </div>

        </div>


        <div className="expenses-kpi">

          <div className="expenses-kpi-top">

            <div className="expenses-kpi-icon purple">
              <Receipt size={16} />
            </div>

            <span>EXPENSE ENTRIES</span>

          </div>

          <strong>184</strong>

          <div className="expenses-kpi-change positive">
            <ArrowUpRight size={11} />
            12.1%
            <small>vs last month</small>
          </div>

        </div>


        <div className="expenses-kpi">

          <div className="expenses-kpi-top">

            <div className="expenses-kpi-icon red">
              <TrendingUp size={16} />
            </div>

            <span>AVG. EXPENSE</span>

          </div>

          <strong>₦16,152</strong>

          <div className="expenses-kpi-change negative">
            <ArrowUpRight size={11} />
            3.8%
            <small>per entry</small>
          </div>

        </div>

      </div>


      {/* ==========================================
          ANALYTICS
      ========================================== */}

      <div className="expenses-analysis-grid">

        {/* MONTHLY EXPENSES */}

        <div className="expenses-card expenses-chart-card">

          <div className="expenses-card-header">

            <div>
              <h2>Expense Spending</h2>

              <p>
                Monthly business expenditure.
              </p>
            </div>

            <MoreHorizontal
              size={15}
              className="expenses-more"
            />

          </div>


          <div className="expenses-chart">

            <div className="expense-y-axis">

              <span>₦3M</span>
              <span>₦2.5M</span>
              <span>₦2M</span>
              <span>₦1.5M</span>
              <span>₦1M</span>
              <span>₦0</span>

            </div>


            <div className="expense-chart-content">

              <div className="expense-chart-lines">

                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>

              </div>


              <div className="expense-chart-bars">

                {monthlyData.map((item) => {

                  const height =
                    (item.amount /
                      maxMonthlyValue) *
                    100;

                  return (
                    <div
                      className="expense-chart-column"
                      key={item.month}
                    >

                      <div className="expense-bar-area">

                        <div
                          className="expense-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        >

                          <span>
                            {formatCurrency(item.amount)}
                          </span>

                        </div>

                      </div>

                      <small>
                        {item.month}
                      </small>

                    </div>
                  );

                })}

              </div>

            </div>

          </div>

        </div>


        {/* EXPENSE CATEGORIES */}

        <div className="expenses-card categories-card">

          <div className="expenses-card-header">

            <div>
              <h2>Expense Categories</h2>

              <p>
                Spending distribution by category.
              </p>
            </div>

            <MoreHorizontal
              size={15}
              className="expenses-more"
            />

          </div>


          <div className="category-list">

            {categoryData.map((item, index) => (

              <div
                className="category-item"
                key={item.name}
              >

                <div className="category-item-top">

                  <div className="category-name">

                    <div className="category-number">
                      {index + 1}
                    </div>

                    <span>
                      {item.name}
                    </span>

                  </div>

                  <strong>
                    {formatCurrency(item.amount)}
                  </strong>

                </div>


                <div className="category-progress">

                  <i
                    style={{
                      width: `${item.percentage * 3.2}%`,
                    }}
                  ></i>

                </div>


                <div className="category-bottom">

                  <span>
                    {item.percentage}% of expenses
                  </span>

                  <small>
                    {item.percentage}%
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ==========================================
          PAYMENT BREAKDOWN
      ========================================== */}

      <div className="expense-payment-summary">

        <div className="expense-payment-item">

          <div className="expense-payment-icon paid">
            <Wallet size={14} />
          </div>

          <div>
            <span>Paid Expenses</span>
            <strong>₦2,680,000</strong>
          </div>

          <div className="expense-payment-percent">
            90.2%
          </div>

        </div>


        <div className="expense-payment-item">

          <div className="expense-payment-icon partial">
            <CreditCard size={14} />
          </div>

          <div>
            <span>Partially Paid</span>
            <strong>₦172,000</strong>
          </div>

          <div className="expense-payment-percent">
            5.8%
          </div>

        </div>


        <div className="expense-payment-item">

          <div className="expense-payment-icon unpaid">
            <Clock3 size={14} />
          </div>

          <div>
            <span>Unpaid Expenses</span>
            <strong>₦120,000</strong>
          </div>

          <div className="expense-payment-percent">
            4.0%
          </div>

        </div>


        <div className="expense-payment-item">

          <div className="expense-payment-icon average">
            <Receipt size={14} />
          </div>

          <div>
            <span>Highest Category</span>
            <strong>Utilities</strong>
          </div>

          <div className="expense-payment-percent">
            28%
          </div>

        </div>

      </div>


      {/* ==========================================
          TRANSACTIONS
      ========================================== */}

      <div className="expenses-table-card">

        <div className="expenses-tabs">

          <button
            className={
              activeTab === "expenses"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("expenses")
            }
          >
            Expense Transactions
          </button>

          <button
            className={
              activeTab === "categories"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("categories")
            }
          >
            Category Summary
          </button>

        </div>


        {activeTab === "expenses" ? (

          <>

            <div className="expenses-table-toolbar">

              <div>
                <h2>Expense Transactions</h2>

                <p>
                  Detailed list of business expenses.
                </p>
              </div>


              <div className="expenses-search">

                <Search size={12} />

                <input
                  type="text"
                  placeholder="Search expense, vendor or reference..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="expenses-table-wrapper">

              <table className="expenses-table">

                <thead>

                  <tr>
                    <th>REFERENCE</th>
                    <th>DATE</th>
                    <th>EXPENSE</th>
                    <th>CATEGORY</th>
                    <th>VENDOR</th>
                    <th>PAYMENT METHOD</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {filteredExpenses.map((expense) => (

                    <tr key={expense.id}>

                      <td>

                        <span className="expense-reference">
                          {expense.reference}
                        </span>

                      </td>


                      <td>
                        {expense.date}
                      </td>


                      <td>

                        <div className="expense-title">

                          <div className="expense-title-icon">
                            <Receipt size={11} />
                          </div>

                          <strong>
                            {expense.title}
                          </strong>

                        </div>

                      </td>


                      <td>

                        <span className="expense-category">
                          {expense.category}
                        </span>

                      </td>


                      <td>

                        <div className="expense-vendor">

                          <Building2 size={11} />

                          <span>
                            {expense.vendor}
                          </span>

                        </div>

                      </td>


                      <td>
                        {expense.paymentMethod}
                      </td>


                      <td>

                        <strong className="expense-amount">
                          {formatCurrency(expense.amount)}
                        </strong>

                      </td>


                      <td>

                        <span
                          className={`expense-status ${expense.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          <i></i>
                          {expense.status}
                        </span>

                      </td>


                      <td>

                        <button className="expense-action">
                          <MoreHorizontal size={14} />
                        </button>

                      </td>

                    </tr>

                  ))}


                  {filteredExpenses.length === 0 && (

                    <tr>

                      <td
                        colSpan="9"
                        className="expense-empty"
                      >
                        No expenses found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            <div className="expenses-table-footer">

              <span>
                Showing{" "}
                <strong>
                  {filteredExpenses.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {expenses.length}
                </strong>{" "}
                expenses
              </span>


              <div className="expenses-pagination">

                <button>
                  <ChevronLeft size={12} />
                </button>

                <button className="active">
                  1
                </button>

                <button>2</button>
                <button>3</button>
                <button>4</button>

                <button>
                  <ChevronRight size={12} />
                </button>

              </div>

            </div>

          </>

        ) : (

          /* ======================================
             CATEGORY SUMMARY
          ====================================== */

          <>

            <div className="expenses-table-toolbar">

              <div>
                <h2>Category Summary</h2>

                <p>
                  Expense performance grouped by category.
                </p>
              </div>

            </div>


            <div className="expenses-table-wrapper">

              <table className="expenses-table category-summary-table">

                <thead>

                  <tr>
                    <th>CATEGORY</th>
                    <th>TOTAL ENTRIES</th>
                    <th>TOTAL AMOUNT</th>
                    <th>SHARE</th>
                    <th>RANK</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {categoryData.map((item, index) => (

                    <tr key={item.name}>

                      <td>

                        <div className="expense-title">

                          <div className="expense-title-icon">
                            <Tag size={11} />
                          </div>

                          <strong>
                            {item.name}
                          </strong>

                        </div>

                      </td>


                      <td>
                        {index === 0
                          ? 42
                          : index === 1
                            ? 31
                            : index === 2
                              ? 28
                              : index === 3
                                ? 24
                                : index === 4
                                  ? 21
                                  : 18}
                      </td>


                      <td>

                        <strong className="expense-amount">
                          {formatCurrency(item.amount)}
                        </strong>

                      </td>


                      <td>
                        {item.percentage}%
                      </td>


                      <td>

                        <span className="category-rank">
                          #{index + 1}
                        </span>

                      </td>


                      <td>

                        <button className="expense-action">
                          <MoreHorizontal size={14} />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </>

        )}

      </div>


      {/* ==========================================
          ALERT
      ========================================== */}

      <div className="expenses-alert">

        <div className="expenses-alert-icon">
          <Clock3 size={15} />
        </div>

        <div>

          <strong>
            Outstanding expenses require attention
          </strong>

          <p>
            There are currently{" "}
            <b>₦292,000</b> in partially paid and
            unpaid expenses.
          </p>

        </div>

        <button>
          View Outstanding
        </button>

      </div>

    </div>
  );
}

