
"use client";

import React, { useMemo, useState } from "react";
import {
  Download,
  RefreshCw,
  Filter,
  Search,
  ShoppingCart,
  Wallet,
  CreditCard,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Building2,
  Package,
} from "lucide-react";

import "./purchase-report.css";

const purchases = [
  {
    id: 1,
    invoice: "PUR-10482",
    supplier: "Global Foods Ltd",
    date: "Aug 29, 2026",
    items: 18,
    quantity: 245,
    subtotal: 485000,
    discount: 10000,
    tax: 0,
    total: 475000,
    paid: 475000,
    balance: 0,
    status: "Paid",
  },
  {
    id: 2,
    invoice: "PUR-10481",
    supplier: "Prime Distributors",
    date: "Aug 28, 2026",
    items: 12,
    quantity: 168,
    subtotal: 328000,
    discount: 8000,
    tax: 0,
    total: 320000,
    paid: 250000,
    balance: 70000,
    status: "Partial",
  },
  {
    id: 3,
    invoice: "PUR-10480",
    supplier: "Mega Wholesale",
    date: "Aug 27, 2026",
    items: 26,
    quantity: 392,
    subtotal: 735000,
    discount: 15000,
    tax: 0,
    total: 720000,
    paid: 720000,
    balance: 0,
    status: "Paid",
  },
  {
    id: 4,
    invoice: "PUR-10479",
    supplier: "Eastern Supplies",
    date: "Aug 25, 2026",
    items: 9,
    quantity: 114,
    subtotal: 198000,
    discount: 3000,
    tax: 0,
    total: 195000,
    paid: 0,
    balance: 195000,
    status: "Unpaid",
  },
  {
    id: 5,
    invoice: "PUR-10478",
    supplier: "Global Foods Ltd",
    date: "Aug 23, 2026",
    items: 15,
    quantity: 206,
    subtotal: 420000,
    discount: 7000,
    tax: 0,
    total: 413000,
    paid: 413000,
    balance: 0,
    status: "Paid",
  },
  {
    id: 6,
    invoice: "PUR-10477",
    supplier: "Prime Distributors",
    date: "Aug 21, 2026",
    items: 20,
    quantity: 301,
    subtotal: 568000,
    discount: 8000,
    tax: 0,
    total: 560000,
    paid: 450000,
    balance: 110000,
    status: "Partial",
  },
  {
    id: 7,
    invoice: "PUR-10476",
    supplier: "Mega Wholesale",
    date: "Aug 19, 2026",
    items: 11,
    quantity: 157,
    subtotal: 287000,
    discount: 5000,
    tax: 0,
    total: 282000,
    paid: 282000,
    balance: 0,
    status: "Paid",
  },
  {
    id: 8,
    invoice: "PUR-10475",
    supplier: "Eastern Supplies",
    date: "Aug 17, 2026",
    items: 8,
    quantity: 96,
    subtotal: 174000,
    discount: 4000,
    tax: 0,
    total: 170000,
    paid: 170000,
    balance: 0,
    status: "Paid",
  },
];

const supplierData = [
  {
    name: "Global Foods Ltd",
    purchases: 18,
    amount: 1248000,
    percentage: 27,
  },
  {
    name: "Prime Distributors",
    purchases: 15,
    amount: 980000,
    percentage: 21,
  },
  {
    name: "Mega Wholesale",
    purchases: 13,
    amount: 875000,
    percentage: 19,
  },
  {
    name: "Eastern Supplies",
    purchases: 10,
    amount: 694000,
    percentage: 15,
  },
  {
    name: "Other Suppliers",
    purchases: 21,
    amount: 820000,
    percentage: 18,
  },
];

const monthlyData = [
  { month: "Mar", amount: 2850000 },
  { month: "Apr", amount: 3240000 },
  { month: "May", amount: 3910000 },
  { month: "Jun", amount: 3680000 },
  { month: "Jul", amount: 4210000 },
  { month: "Aug", amount: 4682000 },
];

export default function PurchaseReportPage() {
  const [search, setSearch] = useState("");
  const [supplier, setSupplier] = useState("All Suppliers");
  const [status, setStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("This Month");
  const [activeTab, setActiveTab] = useState("purchases");

  const formatCurrency = (amount) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      const searchMatch =
        `${purchase.invoice} ${purchase.supplier}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const supplierMatch =
        supplier === "All Suppliers" ||
        purchase.supplier === supplier;

      const statusMatch =
        status === "All Status" ||
        purchase.status === status;

      return (
        searchMatch &&
        supplierMatch &&
        statusMatch
      );
    });
  }, [search, supplier, status]);

  const maxMonthlyValue = Math.max(
    ...monthlyData.map((item) => item.amount)
  );

  return (
    <div className="purchase-report-page content-wrapper">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="purchase-header">

        <div>
          <h1>Purchase Report</h1>

          <p>
            Analyze purchases, supplier spending and payment obligations.
          </p>
        </div>

        <div className="purchase-header-actions">

          <button className="purchase-refresh">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="purchase-export">
            <Download size={13} />
            Export Report
          </button>

        </div>

      </div>


      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="purchase-filter-card">

        <div className="purchase-filter-heading">

          <div className="purchase-filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Report Filters</strong>

            <span>
              Filter purchase information.
            </span>
          </div>

        </div>


        <div className="purchase-filters">

          <div className="purchase-select">

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


          <div className="purchase-select">

            <Building2 size={12} />

            <select
              value={supplier}
              onChange={(e) =>
                setSupplier(e.target.value)
              }
            >
              <option>All Suppliers</option>
              <option>Global Foods Ltd</option>
              <option>Prime Distributors</option>
              <option>Mega Wholesale</option>
              <option>Eastern Supplies</option>
            </select>

            <ChevronDown size={10} />

          </div>


          <div className="purchase-select">

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

      <div className="purchase-kpis">

        <div className="purchase-kpi">

          <div className="purchase-kpi-top">

            <div className="purchase-kpi-icon blue">
              <ShoppingCart size={16} />
            </div>

            <span>TOTAL PURCHASES</span>

          </div>

          <strong>₦4.68M</strong>

          <div className="purchase-kpi-change positive">
            <ArrowUpRight size={11} />
            11.2%
            <small>vs last month</small>
          </div>

        </div>


        <div className="purchase-kpi">

          <div className="purchase-kpi-top">

            <div className="purchase-kpi-icon green">
              <Wallet size={16} />
            </div>

            <span>AMOUNT PAID</span>

          </div>

          <strong>₦4.02M</strong>

          <div className="purchase-kpi-change positive">
            <ArrowUpRight size={11} />
            8.4%
            <small>vs last month</small>
          </div>

        </div>


        <div className="purchase-kpi">

          <div className="purchase-kpi-top">

            <div className="purchase-kpi-icon orange">
              <CreditCard size={16} />
            </div>

            <span>OUTSTANDING</span>

          </div>

          <strong>₦660K</strong>

          <div className="purchase-kpi-change negative">
            <ArrowUpRight size={11} />
            6.7%
            <small>to suppliers</small>
          </div>

        </div>


        <div className="purchase-kpi">

          <div className="purchase-kpi-top">

            <div className="purchase-kpi-icon purple">
              <Package size={16} />
            </div>

            <span>ITEMS PURCHASED</span>

          </div>

          <strong>1,842</strong>

          <div className="purchase-kpi-change positive">
            <ArrowUpRight size={11} />
            13.5%
            <small>vs last month</small>
          </div>

        </div>


        <div className="purchase-kpi">

          <div className="purchase-kpi-top">

            <div className="purchase-kpi-icon red">
              <RotateCcw size={16} />
            </div>

            <span>PURCHASE RETURNS</span>

          </div>

          <strong>₦82,500</strong>

          <div className="purchase-kpi-change negative">
            <ArrowDownRight size={11} />
            3.2%
            <small>vs last month</small>
          </div>

        </div>

      </div>


      {/* ==========================================
          ANALYTICS GRID
      ========================================== */}

      <div className="purchase-analysis-grid">

        {/* MONTHLY PURCHASES */}

        <div className="purchase-card purchase-chart-card">

          <div className="purchase-card-header">

            <div>
              <h2>Purchase Spending</h2>

              <p>
                Monthly purchase expenditure.
              </p>
            </div>

            <MoreHorizontal
              size={15}
              className="purchase-more"
            />

          </div>


          <div className="purchase-chart">

            <div className="chart-y-axis">

              <span>₦5M</span>
              <span>₦4M</span>
              <span>₦3M</span>
              <span>₦2M</span>
              <span>₦1M</span>
              <span>₦0</span>

            </div>


            <div className="chart-content">

              <div className="chart-lines">

                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>

              </div>


              <div className="chart-bars">

                {monthlyData.map((item) => {

                  const height =
                    (item.amount /
                      maxMonthlyValue) *
                    100;

                  return (
                    <div
                      className="chart-column"
                      key={item.month}
                    >

                      <div className="chart-bar-area">

                        <div
                          className="chart-bar"
                          style={{
                            height: `${height}%`,
                          }}
                          title={formatCurrency(
                            item.amount
                          )}
                        >
                          <span>
                            {formatCurrency(
                              item.amount
                            )}
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


        {/* TOP SUPPLIERS */}

        <div className="purchase-card suppliers-card">

          <div className="purchase-card-header">

            <div>
              <h2>Top Suppliers</h2>

              <p>
                Suppliers by purchase value.
              </p>
            </div>

            <MoreHorizontal
              size={15}
              className="purchase-more"
            />

          </div>


          <div className="supplier-list">

            {supplierData.map((item, index) => (

              <div
                className="supplier-item"
                key={item.name}
              >

                <div className="supplier-item-top">

                  <div className="supplier-name">

                    <div className="supplier-avatar">
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


                <div className="supplier-progress">

                  <i
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  ></i>

                </div>


                <div className="supplier-bottom">

                  <span>
                    {item.purchases} purchases
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
          PAYMENT SUMMARY
      ========================================== */}

      <div className="payment-summary">

        <div className="payment-summary-item">

          <div className="payment-summary-icon paid">
            <Wallet size={14} />
          </div>

          <div>
            <span>Paid Purchases</span>
            <strong>₦4,020,000</strong>
          </div>

          <div className="payment-percentage">
            85.9%
          </div>

        </div>


        <div className="payment-summary-item">

          <div className="payment-summary-icon partial">
            <CreditCard size={14} />
          </div>

          <div>
            <span>Partially Paid</span>
            <strong>₦380,000</strong>
          </div>

          <div className="payment-percentage">
            8.1%
          </div>

        </div>


        <div className="payment-summary-item">

          <div className="payment-summary-icon unpaid">
            <CreditCard size={14} />
          </div>

          <div>
            <span>Unpaid Purchases</span>
            <strong>₦280,000</strong>
          </div>

          <div className="payment-percentage">
            6.0%
          </div>

        </div>


        <div className="payment-summary-item">

          <div className="payment-summary-icon returns">
            <RotateCcw size={14} />
          </div>

          <div>
            <span>Purchase Returns</span>
            <strong>₦82,500</strong>
          </div>

          <div className="payment-percentage">
            1.8%
          </div>

        </div>

      </div>


      {/* ==========================================
          TABS
      ========================================== */}

      <div className="purchase-table-card">

        <div className="purchase-tabs">

          <button
            className={
              activeTab === "purchases"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("purchases")
            }
          >
            Purchase Transactions
          </button>

          <button
            className={
              activeTab === "suppliers"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("suppliers")
            }
          >
            Supplier Summary
          </button>

        </div>


        {activeTab === "purchases" ? (

          <>

            <div className="purchase-table-toolbar">

              <div>
                <h2>Purchase Transactions</h2>

                <p>
                  Detailed list of purchase transactions.
                </p>
              </div>


              <div className="purchase-search">

                <Search size={12} />

                <input
                  type="text"
                  placeholder="Search invoice or supplier..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="purchase-table-wrapper">

              <table className="purchase-table">

                <thead>

                  <tr>
                    <th>INVOICE</th>
                    <th>DATE</th>
                    <th>SUPPLIER</th>
                    <th>ITEMS</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>BALANCE</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {filteredPurchases.map((purchase) => (

                    <tr key={purchase.id}>

                      <td>

                        <span className="purchase-invoice">
                          {purchase.invoice}
                        </span>

                      </td>


                      <td>
                        {purchase.date}
                      </td>


                      <td>

                        <div className="purchase-supplier">

                          <div className="supplier-small-icon">
                            <Building2 size={11} />
                          </div>

                          <strong>
                            {purchase.supplier}
                          </strong>

                        </div>

                      </td>


                      <td>
                        {purchase.items}
                      </td>


                      <td>
                        {purchase.quantity}
                      </td>


                      <td>

                        <strong className="purchase-total">
                          {formatCurrency(
                            purchase.total
                          )}
                        </strong>

                      </td>


                      <td>

                        <span className="paid-amount">
                          {formatCurrency(
                            purchase.paid
                          )}
                        </span>

                      </td>


                      <td>

                        <span
                          className={
                            purchase.balance > 0
                              ? "balance-amount"
                              : "balance-zero"
                          }
                        >
                          {formatCurrency(
                            purchase.balance
                          )}
                        </span>

                      </td>


                      <td>

                        <span
                          className={`purchase-status ${purchase.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          <i></i>
                          {purchase.status}
                        </span>

                      </td>


                      <td>

                        <button className="purchase-action">
                          <MoreHorizontal size={14} />
                        </button>

                      </td>

                    </tr>

                  ))}


                  {filteredPurchases.length === 0 && (

                    <tr>

                      <td
                        colSpan="10"
                        className="purchase-empty"
                      >
                        No purchase transactions found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            <div className="purchase-table-footer">

              <span>
                Showing{" "}
                <strong>
                  {filteredPurchases.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {purchases.length}
                </strong>{" "}
                purchases
              </span>


              <div className="purchase-pagination">

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
             SUPPLIER SUMMARY
          ====================================== */

          <>

            <div className="purchase-table-toolbar">

              <div>
                <h2>Supplier Purchase Summary</h2>

                <p>
                  Purchase performance by supplier.
                </p>
              </div>

            </div>


            <div className="purchase-table-wrapper">

              <table className="purchase-table supplier-summary-table">

                <thead>

                  <tr>
                    <th>SUPPLIER</th>
                    <th>PURCHASES</th>
                    <th>TOTAL PURCHASE VALUE</th>
                    <th>SHARE</th>
                    <th>PERFORMANCE</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {supplierData.map((item) => (

                    <tr key={item.name}>

                      <td>

                        <div className="purchase-supplier">

                          <div className="supplier-small-icon">
                            <Building2 size={11} />
                          </div>

                          <strong>
                            {item.name}
                          </strong>

                        </div>

                      </td>


                      <td>
                        {item.purchases}
                      </td>


                      <td>

                        <strong className="purchase-total">
                          {formatCurrency(item.amount)}
                        </strong>

                      </td>


                      <td>
                        {item.percentage}%
                      </td>


                      <td>

                        <div className="supplier-performance">

                          <div>
                            <i
                              style={{
                                width: `${item.percentage * 3}%`,
                              }}
                            ></i>
                          </div>

                          <span>
                            {item.percentage >= 20
                              ? "High"
                              : "Normal"}
                          </span>

                        </div>

                      </td>


                      <td>

                        <button className="purchase-action">
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

      <div className="purchase-alert">

        <div className="purchase-alert-icon">
          <CreditCard size={15} />
        </div>

        <div>

          <strong>
            Supplier payments require attention
          </strong>

          <p>
            You currently have{" "}
            <b>₦660,000</b> in outstanding supplier
            balances across active purchase invoices.
          </p>

        </div>

        <button>
          View Payables
        </button>

      </div>

    </div>
  );
}

