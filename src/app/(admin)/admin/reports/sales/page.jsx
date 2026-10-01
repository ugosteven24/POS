
"use client";

import React, { useMemo, useState } from "react";
import {
  Download,
  CalendarDays,
  Filter,
  RefreshCw,
  TrendingUp,
  Receipt,
  ShoppingCart,
  CreditCard,
  Banknote,
  Wallet,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

import "./sales-report.css";

const salesData = [
  {
    id: "SALE-10482",
    date: "2026-08-29",
    cashier: "John Peter",
    customer: "Walk-in Customer",
    items: 5,
    payment: "Cash",
    subtotal: 145000,
    discount: 5000,
    tax: 10500,
    total: 150500,
    status: "Completed",
  },
  {
    id: "SALE-10481",
    date: "2026-08-29",
    cashier: "Mary James",
    customer: "Emeka Stores",
    items: 8,
    payment: "Bank Transfer",
    subtotal: 285000,
    discount: 10000,
    tax: 20500,
    total: 295500,
    status: "Completed",
  },
  {
    id: "SALE-10480",
    date: "2026-08-29",
    cashier: "John Peter",
    customer: "Walk-in Customer",
    items: 3,
    payment: "Card",
    subtotal: 98000,
    discount: 0,
    tax: 7350,
    total: 105350,
    status: "Completed",
  },
  {
    id: "SALE-10479",
    date: "2026-08-28",
    cashier: "David Okoro",
    customer: "Ikechukwu Ltd",
    items: 12,
    payment: "Bank Transfer",
    subtotal: 420000,
    discount: 20000,
    tax: 30000,
    total: 430000,
    status: "Completed",
  },
  {
    id: "SALE-10478",
    date: "2026-08-28",
    cashier: "Mary James",
    customer: "Walk-in Customer",
    items: 4,
    payment: "Cash",
    subtotal: 76000,
    discount: 3000,
    tax: 5475,
    total: 78475,
    status: "Completed",
  },
  {
    id: "SALE-10477",
    date: "2026-08-27",
    cashier: "John Peter",
    customer: "Chinedu Ventures",
    items: 15,
    payment: "Card",
    subtotal: 510000,
    discount: 15000,
    tax: 37125,
    total: 532125,
    status: "Completed",
  },
  {
    id: "SALE-10476",
    date: "2026-08-27",
    cashier: "David Okoro",
    customer: "Walk-in Customer",
    items: 6,
    payment: "Cash",
    subtotal: 125000,
    discount: 5000,
    tax: 9000,
    total: 129000,
    status: "Completed",
  },
  {
    id: "SALE-10475",
    date: "2026-08-26",
    cashier: "Mary James",
    customer: "Blessing Stores",
    items: 9,
    payment: "Bank Transfer",
    subtotal: 330000,
    discount: 10000,
    tax: 24000,
    total: 344000,
    status: "Completed",
  },
  {
    id: "SALE-10474",
    date: "2026-08-26",
    cashier: "John Peter",
    customer: "Walk-in Customer",
    items: 2,
    payment: "Cash",
    subtotal: 45000,
    discount: 0,
    tax: 3375,
    total: 48375,
    status: "Completed",
  },
  {
    id: "SALE-10473",
    date: "2026-08-25",
    cashier: "David Okoro",
    customer: "Kings Enterprise",
    items: 11,
    payment: "Card",
    subtotal: 275000,
    discount: 7500,
    tax: 20062,
    total: 287562,
    status: "Completed",
  },
];

const chartData = [
  { day: "24 Aug", value: 420000 },
  { day: "25 Aug", value: 680000 },
  { day: "26 Aug", value: 590000 },
  { day: "27 Aug", value: 820000 },
  { day: "28 Aug", value: 735000 },
  { day: "29 Aug", value: 940000 },
];

const topProducts = [
  {
    name: "Premium Indomie Noodles",
    category: "Food",
    quantity: 248,
    sales: 496000,
  },
  {
    name: "Peak Full Cream Milk",
    category: "Beverages",
    quantity: 184,
    sales: 368000,
  },
  {
    name: "Golden Penny Spaghetti",
    category: "Food",
    quantity: 157,
    sales: 314000,
  },
  {
    name: "Dettol Antiseptic",
    category: "Personal Care",
    quantity: 132,
    sales: 264000,
  },
  {
    name: "Coca-Cola 50cl",
    category: "Beverages",
    quantity: 121,
    sales: 181500,
  },
];

const cashiers = [
  "All Cashiers",
  "John Peter",
  "Mary James",
  "David Okoro",
];

const payments = [
  "All Payment Methods",
  "Cash",
  "Card",
  "Bank Transfer",
];

export default function SalesReportPage() {
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [cashier, setCashier] = useState("All Cashiers");
  const [payment, setPayment] = useState("All Payment Methods");
  const [search, setSearch] = useState("");

  const formatCurrency = (amount) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
      const searchMatch =
        sale.id.toLowerCase().includes(search.toLowerCase()) ||
        sale.customer.toLowerCase().includes(search.toLowerCase()) ||
        sale.cashier.toLowerCase().includes(search.toLowerCase());

      const cashierMatch =
        cashier === "All Cashiers" ||
        sale.cashier === cashier;

      const paymentMatch =
        payment === "All Payment Methods" ||
        sale.payment === payment;

      return searchMatch && cashierMatch && paymentMatch;
    });
  }, [search, cashier, payment]);

  const totalSales = salesData.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalOrders = salesData.length;

  const totalItems = salesData.reduce(
    (sum, sale) => sum + sale.items,
    0
  );

  const averageOrder =
    totalOrders > 0
      ? Math.round(totalSales / totalOrders)
      : 0;

  const maxChartValue = Math.max(
    ...chartData.map((item) => item.value)
  );

  return (
    <div className="sales-report-page content-wrapper">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="sales-report-header">

        <div>
          <h1>Sales Report</h1>

          <p>
            Analyze sales performance and transaction activity.
          </p>
        </div>

        <div className="sales-header-actions">

          <button className="secondary-btn">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="export-sales-btn">
            <Download size={13} />
            Export Report
          </button>

        </div>

      </div>


      {/* ==========================================
          REPORT FILTERS
      ========================================== */}

      <div className="report-filter-card">

        <div className="filter-title">

          <div className="filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Report Filters</strong>

            <span>
              Customize the sales report period
            </span>
          </div>

        </div>


        <div className="report-filters">

          <div className="report-select">

            <CalendarDays size={12} />

            <select
              value={dateRange}
              onChange={(e) =>
                setDateRange(e.target.value)
              }
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>

          </div>


          <div className="report-select">

            <select
              value={cashier}
              onChange={(e) =>
                setCashier(e.target.value)
              }
            >
              {cashiers.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>


          <div className="report-select">

            <CreditCard size={12} />

            <select
              value={payment}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            >
              {payments.map((item) => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

        </div>

      </div>


      {/* ==========================================
          KPI CARDS
      ========================================== */}

      <div className="sales-kpis">

        <div className="sales-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon blue">
              <TrendingUp size={16} />
            </div>

            <span className="kpi-label">
              TOTAL SALES
            </span>

          </div>

          <div className="kpi-value">
            {formatCurrency(totalSales)}
          </div>

          <div className="kpi-change positive">
            <ArrowUpRight size={11} />
            <strong>12.8%</strong>
            <span>vs previous period</span>
          </div>

        </div>


        <div className="sales-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon green">
              <Receipt size={16} />
            </div>

            <span className="kpi-label">
              TOTAL ORDERS
            </span>

          </div>

          <div className="kpi-value">
            {totalOrders}
          </div>

          <div className="kpi-change positive">
            <ArrowUpRight size={11} />
            <strong>8.4%</strong>
            <span>vs previous period</span>
          </div>

        </div>


        <div className="sales-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon orange">
              <ShoppingCart size={16} />
            </div>

            <span className="kpi-label">
              ITEMS SOLD
            </span>

          </div>

          <div className="kpi-value">
            {totalItems}
          </div>

          <div className="kpi-change positive">
            <ArrowUpRight size={11} />
            <strong>15.2%</strong>
            <span>vs previous period</span>
          </div>

        </div>


        <div className="sales-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon purple">
              <Wallet size={16} />
            </div>

            <span className="kpi-label">
              AVG. ORDER VALUE
            </span>

          </div>

          <div className="kpi-value">
            {formatCurrency(averageOrder)}
          </div>

          <div className="kpi-change negative">
            <ArrowDownRight size={11} />
            <strong>2.1%</strong>
            <span>vs previous period</span>
          </div>

        </div>

      </div>


      {/* ==========================================
          CHART + PAYMENT BREAKDOWN
      ========================================== */}

      <div className="report-middle-grid">

        {/* SALES TREND */}

        <div className="report-card sales-chart-card">

          <div className="report-card-header">

            <div>
              <h2>Sales Trend</h2>

              <p>
                Revenue generated during the selected period.
              </p>
            </div>

            <div className="chart-total">
              {formatCurrency(totalSales)}
            </div>

          </div>


          <div className="sales-chart">

            <div className="chart-y-axis">

              <span>₦1M</span>
              <span>₦750K</span>
              <span>₦500K</span>
              <span>₦250K</span>
              <span>₦0</span>

            </div>


            <div className="chart-area">

              <div className="chart-grid-lines">

                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>

              </div>


              <div className="bars">

                {chartData.map((item) => {

                  const height =
                    (item.value / maxChartValue) *
                    100;

                  return (
                    <div
                      className="chart-column"
                      key={item.day}
                    >

                      <div className="bar-value">
                        ₦
                        {Math.round(
                          item.value / 1000
                        )}
                        K
                      </div>

                      <div className="bar-track">

                        <div
                          className="sales-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        ></div>

                      </div>

                      <span className="bar-label">
                        {item.day}
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </div>


        {/* PAYMENT BREAKDOWN */}

        <div className="report-card payment-card">

          <div className="report-card-header">

            <div>
              <h2>Payment Breakdown</h2>

              <p>
                Sales by payment method.
              </p>
            </div>

            <MoreHorizontal
              size={16}
              className="more-icon"
            />

          </div>


          <div className="payment-summary">

            <div className="payment-total">
              <span>Total Collected</span>

              <strong>
                {formatCurrency(totalSales)}
              </strong>
            </div>


            <div className="payment-progress">

              <div
                className="payment-progress-cash"
                style={{ width: "42%" }}
              ></div>

              <div
                className="payment-progress-transfer"
                style={{ width: "38%" }}
              ></div>

              <div
                className="payment-progress-card"
                style={{ width: "20%" }}
              ></div>

            </div>


            <div className="payment-list">

              <div className="payment-row">

                <div className="payment-name">

                  <span className="payment-dot cash"></span>

                  <span>Cash</span>

                </div>

                <div>
                  <strong>
                    {formatCurrency(3820000)}
                  </strong>

                  <small>42%</small>
                </div>

              </div>


              <div className="payment-row">

                <div className="payment-name">

                  <span className="payment-dot transfer"></span>

                  <span>Bank Transfer</span>

                </div>

                <div>
                  <strong>
                    {formatCurrency(3450000)}
                  </strong>

                  <small>38%</small>
                </div>

              </div>


              <div className="payment-row">

                <div className="payment-name">

                  <span className="payment-dot card"></span>

                  <span>Card</span>

                </div>

                <div>
                  <strong>
                    {formatCurrency(1810000)}
                  </strong>

                  <small>20%</small>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          TOP PRODUCTS
      ========================================== */}

      <div className="report-card top-products-card">

        <div className="report-card-header">

          <div>
            <h2>Top Selling Products</h2>

            <p>
              Products generating the highest sales.
            </p>
          </div>

          <button className="view-all-btn">
            View All
            <ChevronDown size={12} />
          </button>

        </div>


        <div className="top-products-list">

          {topProducts.map((product, index) => (

            <div
              className="top-product-row"
              key={product.name}
            >

              <div className="product-rank">
                {String(index + 1).padStart(2, "0")}
              </div>


              <div className="product-placeholder">
                {product.name.charAt(0)}
              </div>


              <div className="product-name">

                <strong>
                  {product.name}
                </strong>

                <span>
                  {product.category}
                </span>

              </div>


              <div className="product-quantity">

                <span>
                  Quantity Sold
                </span>

                <strong>
                  {product.quantity}
                </strong>

              </div>


              <div className="product-sales">

                <span>
                  Sales
                </span>

                <strong>
                  {formatCurrency(product.sales)}
                </strong>

              </div>


              <div className="product-arrow">
                <ArrowUpRight size={14} />
              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ==========================================
          SALES TABLE
      ========================================== */}

      <div className="report-card sales-table-card">

        <div className="sales-table-header">

          <div>
            <h2>Sales Transactions</h2>

            <p>
              Detailed transaction report.
            </p>
          </div>


          <div className="table-search">

            <input
              type="text"
              placeholder="Search transaction..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        <div className="sales-table-wrapper">

          <table className="sales-report-table">

            <thead>

              <tr>
                <th>TRANSACTION</th>
                <th>DATE</th>
                <th>CASHIER</th>
                <th>CUSTOMER</th>
                <th>ITEMS</th>
                <th>PAYMENT</th>
                <th>DISCOUNT</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th></th>
              </tr>

            </thead>


            <tbody>

              {filteredSales.map((sale) => (

                <tr key={sale.id}>

                  <td>

                    <strong className="transaction-id">
                      {sale.id}
                    </strong>

                  </td>


                  <td>
                    <span className="table-date">
                      {formatDate(sale.date)}
                    </span>
                  </td>


                  <td>

                    <div className="cashier-cell">

                      <div className="cashier-avatar">
                        {sale.cashier.charAt(0)}
                      </div>

                      <span>
                        {sale.cashier}
                      </span>

                    </div>

                  </td>


                  <td>
                    <span className="customer-name">
                      {sale.customer}
                    </span>
                  </td>


                  <td>
                    <span className="items-count">
                      {sale.items}
                    </span>
                  </td>


                  <td>

                    <span
                      className={`payment-badge ${sale.payment
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {sale.payment}
                    </span>

                  </td>


                  <td>

                    <span className="discount-value">
                      {sale.discount > 0
                        ? `₦${sale.discount.toLocaleString(
                            "en-NG"
                          )}`
                        : "—"}
                    </span>

                  </td>


                  <td>

                    <strong className="table-total">
                      {formatCurrency(sale.total)}
                    </strong>

                  </td>


                  <td>

                    <span className="completed-badge">
                      <i></i>
                      {sale.status}
                    </span>

                  </td>


                  <td>

                    <button className="table-action">
                      <MoreHorizontal size={14} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* ======================================
            TABLE FOOTER
        ====================================== */}

        <div className="sales-table-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredSales.length}
            </strong>{" "}
            of{" "}
            <strong>
              {salesData.length}
            </strong>{" "}
            transactions
          </span>


          <div className="report-pagination">

            <button>
              <ChevronLeft size={13} />
            </button>

            <button className="current-page">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <button>
              <ChevronRight size={13} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

