
"use client";

import React, { useMemo, useState } from "react";
import {
  Download,
  RefreshCw,
  Filter,
  Search,
  Users,
  ShoppingCart,
  Banknote,
  CreditCard,
  Receipt,
  RotateCcw,
  Percent,
  TrendingUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  CalendarDays,
  Eye,
} from "lucide-react";

import "./cashiers-report.css";

const cashiers = [
  {
    id: 1,
    name: "David Okoro",
    code: "CSH-001",
    sales: 4850000,
    transactions: 342,
    cash: 2180000,
    card: 1720000,
    transfer: 950000,
    refunds: 85000,
    discounts: 42000,
    avgSale: 14181,
    status: "Active",
  },
  {
    id: 2,
    name: "Grace Eze",
    code: "CSH-002",
    sales: 4265000,
    transactions: 298,
    cash: 1950000,
    card: 1420000,
    transfer: 895000,
    refunds: 62000,
    discounts: 35000,
    avgSale: 14312,
    status: "Active",
  },
  {
    id: 3,
    name: "Michael James",
    code: "CSH-003",
    sales: 3780000,
    transactions: 264,
    cash: 1640000,
    card: 1280000,
    transfer: 860000,
    refunds: 94000,
    discounts: 28000,
    avgSale: 14318,
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Williams",
    code: "CSH-004",
    sales: 3215000,
    transactions: 231,
    cash: 1420000,
    card: 1095000,
    transfer: 700000,
    refunds: 48000,
    discounts: 21000,
    avgSale: 13918,
    status: "Active",
  },
  {
    id: 5,
    name: "John Peters",
    code: "CSH-005",
    sales: 2875000,
    transactions: 205,
    cash: 1240000,
    card: 980000,
    transfer: 655000,
    refunds: 76000,
    discounts: 19000,
    avgSale: 14024,
    status: "Offline",
  },
  {
    id: 6,
    name: "Daniel Obi",
    code: "CSH-006",
    sales: 2640000,
    transactions: 188,
    cash: 1150000,
    card: 875000,
    transfer: 615000,
    refunds: 32000,
    discounts: 16000,
    avgSale: 14043,
    status: "Active",
  },
];

const dailySales = [
  { day: "Mon", sales: 510000 },
  { day: "Tue", sales: 625000 },
  { day: "Wed", sales: 580000 },
  { day: "Thu", sales: 745000 },
  { day: "Fri", sales: 820000 },
  { day: "Sat", sales: 945000 },
  { day: "Sun", sales: 690000 },
];

const paymentMethods = [
  {
    name: "Cash",
    amount: 9580000,
    percentage: 43,
  },
  {
    name: "Card",
    amount: 7370000,
    percentage: 33,
  },
  {
    name: "Transfer",
    amount: 4675000,
    percentage: 21,
  },
  {
    name: "Other",
    amount: 685000,
    percentage: 3,
  },
];

export default function CashiersReportPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Cashiers");
  const [dateRange, setDateRange] = useState("This Month");
  const [activeTab, setActiveTab] = useState("performance");

  const formatCurrency = (amount) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const filteredCashiers = useMemo(() => {
    return cashiers.filter((cashier) => {
      const searchMatch =
        `${cashier.name} ${cashier.code}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        status === "All Cashiers" ||
        cashier.status === status;

      return searchMatch && statusMatch;
    });
  }, [search, status]);

  const totalSales = cashiers.reduce(
    (sum, cashier) => sum + cashier.sales,
    0
  );

  const totalTransactions = cashiers.reduce(
    (sum, cashier) => sum + cashier.transactions,
    0
  );

  const totalRefunds = cashiers.reduce(
    (sum, cashier) => sum + cashier.refunds,
    0
  );

  const totalDiscounts = cashiers.reduce(
    (sum, cashier) => sum + cashier.discounts,
    0
  );

  const maxDailySales = Math.max(
    ...dailySales.map((item) => item.sales)
  );

  return (
    <div className="cashiers-report-page content-wrapper">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="cashiers-header">

        <div>
          <h1>Cashiers Report</h1>

          <p>
            Monitor cashier performance, sales activity and payment collections.
          </p>
        </div>

        <div className="cashiers-header-actions">

          <button className="cashiers-refresh">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="cashiers-export">
            <Download size={13} />
            Export Report
          </button>

        </div>

      </div>


      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="cashiers-filter-card">

        <div className="cashiers-filter-heading">

          <div className="cashiers-filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Report Filters</strong>

            <span>
              Select a reporting period and cashier status.
            </span>
          </div>

        </div>


        <div className="cashiers-filters">

          <div className="cashiers-select">

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


          <div className="cashiers-select">

            <Users size={12} />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>All Cashiers</option>
              <option>Active</option>
              <option>Offline</option>
            </select>

            <ChevronDown size={10} />

          </div>

        </div>

      </div>


      {/* ==========================================
          KPI CARDS
      ========================================== */}

      <div className="cashiers-kpis">

        <div className="cashier-kpi">

          <div className="cashier-kpi-top">

            <div className="cashier-kpi-icon blue">
              <Banknote size={16} />
            </div>

            <span>TOTAL SALES</span>

          </div>

          <strong>
            {formatCurrency(totalSales)}
          </strong>

          <div className="cashier-kpi-change positive">
            <TrendingUp size={11} />
            8.4%
            <small>vs last month</small>
          </div>

        </div>


        <div className="cashier-kpi">

          <div className="cashier-kpi-top">

            <div className="cashier-kpi-icon green">
              <ShoppingCart size={16} />
            </div>

            <span>TRANSACTIONS</span>

          </div>

          <strong>
            {totalTransactions.toLocaleString()}
          </strong>

          <div className="cashier-kpi-change positive">
            <TrendingUp size={11} />
            11.2%
            <small>vs last month</small>
          </div>

        </div>


        <div className="cashier-kpi">

          <div className="cashier-kpi-top">

            <div className="cashier-kpi-icon purple">
              <Users size={16} />
            </div>

            <span>ACTIVE CASHIERS</span>

          </div>

          <strong>5</strong>

          <div className="cashier-kpi-change">
            6 registered
            <small>total cashiers</small>
          </div>

        </div>


        <div className="cashier-kpi">

          <div className="cashier-kpi-top">

            <div className="cashier-kpi-icon orange">
              <RotateCcw size={16} />
            </div>

            <span>REFUNDS</span>

          </div>

          <strong>
            {formatCurrency(totalRefunds)}
          </strong>

          <div className="cashier-kpi-change negative">
            <TrendingUp size={11} />
            2.7%
            <small>of total sales</small>
          </div>

        </div>


        <div className="cashier-kpi">

          <div className="cashier-kpi-top">

            <div className="cashier-kpi-icon red">
              <Percent size={16} />
            </div>

            <span>DISCOUNTS</span>

          </div>

          <strong>
            {formatCurrency(totalDiscounts)}
          </strong>

          <div className="cashier-kpi-change negative">
            0.8%
            <small>of total sales</small>
          </div>

        </div>

      </div>


      {/* ==========================================
          ANALYTICS
      ========================================== */}

      <div className="cashiers-analysis-grid">

        {/* SALES CHART */}

        <div className="cashiers-card cashiers-chart-card">

          <div className="cashiers-card-header">

            <div>
              <h2>Daily Sales Performance</h2>

              <p>
                Combined cashier sales for the selected period.
              </p>
            </div>

            <MoreHorizontal
              size={15}
              className="cashiers-more"
            />

          </div>


          <div className="cashiers-chart">

            <div className="cashier-y-axis">

              <span>₦1M</span>
              <span>₦800K</span>
              <span>₦600K</span>
              <span>₦400K</span>
              <span>₦200K</span>
              <span>₦0</span>

            </div>


            <div className="cashier-chart-content">

              <div className="cashier-chart-lines">

                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>

              </div>


              <div className="cashier-chart-bars">

                {dailySales.map((item) => {

                  const height =
                    (item.sales / maxDailySales) *
                    100;

                  return (
                    <div
                      className="cashier-chart-column"
                      key={item.day}
                    >

                      <div className="cashier-bar-area">

                        <div
                          className="cashier-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        >

                          <span>
                            {formatCurrency(item.sales)}
                          </span>

                        </div>

                      </div>

                      <small>
                        {item.day}
                      </small>

                    </div>
                  );

                })}

              </div>

            </div>

          </div>

        </div>


        {/* PAYMENT METHODS */}

        <div className="cashiers-card">

          <div className="cashiers-card-header">

            <div>
              <h2>Payment Collection</h2>

              <p>
                Sales collected by payment method.
              </p>
            </div>

            <MoreHorizontal
              size={15}
              className="cashiers-more"
            />

          </div>


          <div className="payment-method-list">

            {paymentMethods.map((method, index) => (

              <div
                className="payment-method-item"
                key={method.name}
              >

                <div className="payment-method-top">

                  <div className="payment-method-name">

                    <div className="payment-method-number">
                      {index + 1}
                    </div>

                    <span>
                      {method.name}
                    </span>

                  </div>

                  <strong>
                    {formatCurrency(method.amount)}
                  </strong>

                </div>


                <div className="payment-progress">

                  <i
                    style={{
                      width: `${method.percentage}%`,
                    }}
                  ></i>

                </div>


                <div className="payment-bottom">

                  <span>
                    {method.percentage}% of collections
                  </span>

                  <small>
                    {method.percentage}%
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ==========================================
          TOP PERFORMER
      ========================================== */}

      <div className="top-cashier-card">

        <div className="top-cashier-left">

          <div className="top-cashier-icon">
            <TrendingUp size={17} />
          </div>

          <div>

            <span>TOP PERFORMING CASHIER</span>

            <strong>
              David Okoro
            </strong>

          </div>

        </div>


        <div className="top-cashier-stat">

          <span>Total Sales</span>

          <strong>
            ₦4,850,000
          </strong>

        </div>


        <div className="top-cashier-stat">

          <span>Transactions</span>

          <strong>
            342
          </strong>

        </div>


        <div className="top-cashier-stat">

          <span>Avg. Sale</span>

          <strong>
            ₦14,181
          </strong>

        </div>


        <div className="top-cashier-badge">
          #1 Cashier
        </div>

      </div>


      {/* ==========================================
          CASHIER TABLE
      ========================================== */}

      <div className="cashiers-table-card">

        <div className="cashiers-tabs">

          <button
            className={
              activeTab === "performance"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("performance")
            }
          >
            Cashier Performance
          </button>

          <button
            className={
              activeTab === "payments"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("payments")
            }
          >
            Payment Breakdown
          </button>

        </div>


        {activeTab === "performance" ? (

          <>

            <div className="cashiers-table-toolbar">

              <div>
                <h2>Cashier Performance</h2>

                <p>
                  Detailed performance for every cashier.
                </p>
              </div>


              <div className="cashiers-search">

                <Search size={12} />

                <input
                  type="text"
                  placeholder="Search cashier..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="cashiers-table-wrapper">

              <table className="cashiers-table">

                <thead>

                  <tr>
                    <th>CASHIER</th>
                    <th>SALES</th>
                    <th>TRANSACTIONS</th>
                    <th>CASH</th>
                    <th>CARD</th>
                    <th>TRANSFER</th>
                    <th>REFUNDS</th>
                    <th>DISCOUNTS</th>
                    <th>AVG. SALE</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {filteredCashiers.map(
                    (cashier, index) => (

                      <tr key={cashier.id}>

                        <td>

                          <div className="cashier-profile">

                            <div className="cashier-avatar">
                              {cashier.name
                                .split(" ")
                                .map((word) =>
                                  word[0]
                                )
                                .join("")}
                            </div>

                            <div>

                              <strong>
                                {cashier.name}
                              </strong>

                              <span>
                                {cashier.code}
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <strong className="cashier-sales">
                            {formatCurrency(
                              cashier.sales
                            )}
                          </strong>

                        </td>


                        <td>

                          <span className="transaction-count">
                            {cashier.transactions}
                          </span>

                        </td>


                        <td>
                          {formatCurrency(
                            cashier.cash
                          )}
                        </td>


                        <td>
                          {formatCurrency(
                            cashier.card
                          )}
                        </td>


                        <td>
                          {formatCurrency(
                            cashier.transfer
                          )}
                        </td>


                        <td>

                          <span className="refund-value">
                            {formatCurrency(
                              cashier.refunds
                            )}
                          </span>

                        </td>


                        <td>

                          <span className="discount-value">
                            {formatCurrency(
                              cashier.discounts
                            )}
                          </span>

                        </td>


                        <td>

                          <strong className="average-sale">
                            {formatCurrency(
                              cashier.avgSale
                            )}
                          </strong>

                        </td>


                        <td>

                          <span
                            className={`cashier-status ${cashier.status.toLowerCase()}`}
                          >
                            <i></i>
                            {cashier.status}
                          </span>

                        </td>


                        <td>

                          <button className="cashier-action">
                            <MoreHorizontal
                              size={14}
                            />
                          </button>

                        </td>

                      </tr>

                    )
                  )}


                  {filteredCashiers.length === 0 && (

                    <tr>

                      <td
                        colSpan="11"
                        className="cashier-empty"
                      >
                        No cashiers found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            <div className="cashiers-table-footer">

              <span>
                Showing{" "}
                <strong>
                  {filteredCashiers.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {cashiers.length}
                </strong>{" "}
                cashiers
              </span>


              <div className="cashiers-pagination">

                <button>
                  <ChevronLeft size={12} />
                </button>

                <button className="active">
                  1
                </button>

                <button>2</button>
                <button>3</button>

                <button>
                  <ChevronRight size={12} />
                </button>

              </div>

            </div>

          </>

        ) : (

          /* ======================================
             PAYMENT BREAKDOWN
          ====================================== */

          <>

            <div className="cashiers-table-toolbar">

              <div>
                <h2>Payment Breakdown</h2>

                <p>
                  Payment collection by individual cashier.
                </p>
              </div>

            </div>


            <div className="cashiers-table-wrapper">

              <table className="cashiers-table">

                <thead>

                  <tr>
                    <th>CASHIER</th>
                    <th>TOTAL SALES</th>
                    <th>CASH</th>
                    <th>CARD</th>
                    <th>TRANSFER</th>
                    <th>TOTAL COLLECTED</th>
                    <th>REFUNDS</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {cashiers.map((cashier) => {

                    const collected =
                      cashier.cash +
                      cashier.card +
                      cashier.transfer;

                    return (

                      <tr key={cashier.id}>

                        <td>

                          <div className="cashier-profile">

                            <div className="cashier-avatar">
                              {cashier.name
                                .split(" ")
                                .map((word) =>
                                  word[0]
                                )
                                .join("")}
                            </div>

                            <div>

                              <strong>
                                {cashier.name}
                              </strong>

                              <span>
                                {cashier.code}
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>
                          {formatCurrency(
                            cashier.sales
                          )}
                        </td>


                        <td>
                          {formatCurrency(
                            cashier.cash
                          )}
                        </td>


                        <td>
                          {formatCurrency(
                            cashier.card
                          )}
                        </td>


                        <td>
                          {formatCurrency(
                            cashier.transfer
                          )}
                        </td>


                        <td>

                          <strong className="cashier-sales">
                            {formatCurrency(
                              collected
                            )}
                          </strong>

                        </td>


                        <td>

                          <span className="refund-value">
                            {formatCurrency(
                              cashier.refunds
                            )}
                          </span>

                        </td>


                        <td>

                          <button className="cashier-action">
                            <Eye size={13} />
                          </button>

                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            </div>

          </>

        )}

      </div>


      {/* ==========================================
          FOOTER NOTE
      ========================================== */}

      <div className="cashiers-report-note">

        <Receipt size={14} />

        <div>

          <strong>
            Cashier report summary
          </strong>

          <p>
            Figures shown are based on recorded sales,
            refunds, discounts and payment collections
            for the selected reporting period.
          </p>

        </div>

      </div>

    </div>
  );
}

