
"use client";

import React, { useMemo, useState } from "react";
import {
  Download,
  RefreshCw,
  Filter,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  ShoppingBag,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./profit-loss.css";

const monthlyData = [
  {
    month: "Mar 2026",
    revenue: 6840000,
    cogs: 4260000,
    grossProfit: 2580000,
    expenses: 930000,
    netProfit: 1650000,
    margin: 24.1,
  },
  {
    month: "Apr 2026",
    revenue: 7350000,
    cogs: 4490000,
    grossProfit: 2860000,
    expenses: 980000,
    netProfit: 1880000,
    margin: 25.6,
  },
  {
    month: "May 2026",
    revenue: 7920000,
    cogs: 4780000,
    grossProfit: 3140000,
    expenses: 1040000,
    netProfit: 2100000,
    margin: 26.5,
  },
  {
    month: "Jun 2026",
    revenue: 8460000,
    cogs: 5040000,
    grossProfit: 3420000,
    expenses: 1110000,
    netProfit: 2310000,
    margin: 27.3,
  },
  {
    month: "Jul 2026",
    revenue: 9180000,
    cogs: 5480000,
    grossProfit: 3700000,
    expenses: 1180000,
    netProfit: 2520000,
    margin: 27.5,
  },
  {
    month: "Aug 2026",
    revenue: 9640000,
    cogs: 5710000,
    grossProfit: 3930000,
    expenses: 1260000,
    netProfit: 2670000,
    margin: 27.7,
  },
];

const expenseData = [
  {
    name: "Staff Salaries",
    amount: 480000,
    percentage: 38.1,
  },
  {
    name: "Rent & Utilities",
    amount: 275000,
    percentage: 21.8,
  },
  {
    name: "Transportation",
    amount: 168000,
    percentage: 13.3,
  },
  {
    name: "Marketing",
    amount: 145000,
    percentage: 11.5,
  },
  {
    name: "Maintenance",
    amount: 102000,
    percentage: 8.1,
  },
  {
    name: "Other Expenses",
    amount: 90000,
    percentage: 7.2,
  },
];

const productProfitData = [
  {
    product: "Premium Indomie Noodles",
    category: "Food",
    revenue: 820000,
    cost: 584000,
    profit: 236000,
    margin: 28.8,
  },
  {
    product: "Peak Full Cream Milk",
    category: "Beverages",
    revenue: 695000,
    cost: 472000,
    profit: 223000,
    margin: 32.1,
  },
  {
    product: "Golden Penny Spaghetti",
    category: "Food",
    revenue: 612000,
    cost: 429000,
    profit: 183000,
    margin: 29.9,
  },
  {
    product: "Dettol Antiseptic",
    category: "Personal Care",
    revenue: 548000,
    cost: 381000,
    profit: 167000,
    margin: 30.5,
  },
  {
    product: "Coca-Cola 50cl",
    category: "Beverages",
    revenue: 426000,
    cost: 312000,
    profit: 114000,
    margin: 26.8,
  },
];

export default function ProfitLossPage() {
  const [dateRange, setDateRange] = useState("This Month");
  const [branch, setBranch] = useState("All Branches");
  const [search, setSearch] = useState("");

  const formatCurrency = (amount) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const totalRevenue = 9640000;
  const totalCOGS = 5710000;
  const grossProfit = 3930000;
  const operatingExpenses = 1260000;
  const netProfit = 2670000;

  const grossMargin =
    (grossProfit / totalRevenue) * 100;

  const netMargin =
    (netProfit / totalRevenue) * 100;

  const filteredProducts = useMemo(() => {
    return productProfitData.filter((item) =>
      `${item.product} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="profit-loss-page content-wrapper">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="pl-header">

        <div>
          <h1>Profit & Loss</h1>

          <p>
            Monitor revenue, expenses and profitability.
          </p>
        </div>

        <div className="pl-header-actions">

          <button className="pl-refresh-btn">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="pl-export-btn">
            <Download size={13} />
            Export Report
          </button>

        </div>

      </div>


      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="pl-filter-card">

        <div className="pl-filter-title">

          <div className="pl-filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Report Filters</strong>

            <span>
              Select the period and branch to analyze.
            </span>
          </div>

        </div>


        <div className="pl-filters">

          <div className="pl-select">

            <CalendarDays size={12} />

            <select
              value={dateRange}
              onChange={(e) =>
                setDateRange(e.target.value)
              }
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
              <option>Last Year</option>
            </select>

          </div>


          <div className="pl-select">

            <select
              value={branch}
              onChange={(e) =>
                setBranch(e.target.value)
              }
            >
              <option>All Branches</option>
              <option>Main Branch</option>
              <option>Branch 2</option>
              <option>Branch 3</option>
            </select>

          </div>

        </div>

      </div>


      {/* ==========================================
          PROFITABILITY KPI CARDS
      ========================================== */}

      <div className="pl-kpis">

        <div className="pl-kpi-card">

          <div className="pl-kpi-top">

            <div className="pl-kpi-icon revenue">
              <TrendingUp size={16} />
            </div>

            <span>REVENUE</span>

          </div>

          <strong className="pl-kpi-value">
            {formatCurrency(totalRevenue)}
          </strong>

          <div className="pl-kpi-change positive">
            <ArrowUpRight size={11} />
            <b>14.6%</b>
            <small>vs previous period</small>
          </div>

        </div>


        <div className="pl-kpi-card">

          <div className="pl-kpi-top">

            <div className="pl-kpi-icon cost">
              <ShoppingBag size={16} />
            </div>

            <span>COST OF GOODS SOLD</span>

          </div>

          <strong className="pl-kpi-value">
            {formatCurrency(totalCOGS)}
          </strong>

          <div className="pl-kpi-change negative">
            <ArrowUpRight size={11} />
            <b>9.2%</b>
            <small>vs previous period</small>
          </div>

        </div>


        <div className="pl-kpi-card">

          <div className="pl-kpi-top">

            <div className="pl-kpi-icon gross">
              <DollarSign size={16} />
            </div>

            <span>GROSS PROFIT</span>

          </div>

          <strong className="pl-kpi-value">
            {formatCurrency(grossProfit)}
          </strong>

          <div className="pl-kpi-change positive">
            <ArrowUpRight size={11} />
            <b>18.3%</b>
            <small>
              {grossMargin.toFixed(1)}% margin
            </small>
          </div>

        </div>


        <div className="pl-kpi-card highlight">

          <div className="pl-kpi-top">

            <div className="pl-kpi-icon net">
              <Wallet size={16} />
            </div>

            <span>NET PROFIT</span>

          </div>

          <strong className="pl-kpi-value">
            {formatCurrency(netProfit)}
          </strong>

          <div className="pl-kpi-change positive">
            <ArrowUpRight size={11} />
            <b>16.8%</b>
            <small>
              {netMargin.toFixed(1)}% margin
            </small>
          </div>

        </div>

      </div>


      {/* ==========================================
          P&L SUMMARY
      ========================================== */}

      <div className="pl-main-grid">

        <div className="pl-card pl-summary-card">

          <div className="pl-card-header">

            <div>
              <h2>Profit & Loss Summary</h2>

              <p>
                Financial performance for the selected period.
              </p>
            </div>

            <span className="period-label">
              {dateRange}
            </span>

          </div>


          <div className="pl-summary-body">

            <div className="pl-summary-row revenue-row">

              <div className="summary-label">

                <span className="summary-dot revenue-dot"></span>

                <div>
                  <strong>Sales Revenue</strong>
                  <small>Gross sales generated</small>
                </div>

              </div>

              <strong>
                {formatCurrency(totalRevenue)}
              </strong>

            </div>


            <div className="pl-summary-row deduction">

              <div className="summary-label">

                <span className="summary-dot cost-dot"></span>

                <div>
                  <strong>Cost of Goods Sold</strong>
                  <small>Cost of inventory sold</small>
                </div>

              </div>

              <strong>
                ({formatCurrency(totalCOGS)})
              </strong>

            </div>


            <div className="pl-summary-divider"></div>


            <div className="pl-summary-row gross-row">

              <div className="summary-label">

                <span className="summary-dot gross-dot"></span>

                <div>
                  <strong>Gross Profit</strong>
                  <small>
                    Revenue − Cost of Goods Sold
                  </small>
                </div>

              </div>

              <strong>
                {formatCurrency(grossProfit)}
              </strong>

            </div>


            <div className="pl-margin-row">

              <span>Gross Profit Margin</span>

              <div className="margin-track">
                <div
                  style={{
                    width: `${grossMargin}%`,
                  }}
                ></div>
              </div>

              <strong>
                {grossMargin.toFixed(1)}%
              </strong>

            </div>


            <div className="pl-summary-row deduction expense-row">

              <div className="summary-label">

                <span className="summary-dot expense-dot"></span>

                <div>
                  <strong>Operating Expenses</strong>
                  <small>Business operating costs</small>
                </div>

              </div>

              <strong>
                ({formatCurrency(operatingExpenses)})
              </strong>

            </div>


            <div className="pl-summary-divider"></div>


            <div className="pl-net-profit">

              <div>

                <span>NET PROFIT</span>

                <small>
                  Gross Profit − Operating Expenses
                </small>

              </div>

              <strong>
                {formatCurrency(netProfit)}
              </strong>

            </div>


            <div className="pl-net-margin">

              <span>Net Profit Margin</span>

              <strong>
                {netMargin.toFixed(1)}%
              </strong>

            </div>

          </div>

        </div>


        {/* ======================================
            PROFIT TREND
        ====================================== */}

        <div className="pl-card pl-trend-card">

          <div className="pl-card-header">

            <div>
              <h2>Profit Trend</h2>

              <p>
                Monthly revenue and net profit.
              </p>
            </div>

            <MoreHorizontal
              size={15}
              className="pl-more"
            />

          </div>


          <div className="pl-trend-legend">

            <span>
              <i className="legend-revenue"></i>
              Revenue
            </span>

            <span>
              <i className="legend-profit"></i>
              Net Profit
            </span>

          </div>


          <div className="pl-line-chart">

            <div className="pl-y-axis">

              <span>₦10M</span>
              <span>₦7.5M</span>
              <span>₦5M</span>
              <span>₦2.5M</span>
              <span>₦0</span>

            </div>


            <div className="pl-chart-content">

              <div className="pl-chart-grid">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>


              <div className="pl-chart-lines">

                <svg
                  viewBox="0 0 600 220"
                  preserveAspectRatio="none"
                >

                  <polyline
                    points="
                      15,80
                      125,68
                      235,55
                      345,43
                      455,27
                      585,18
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <polyline
                    points="
                      15,177
                      125,169
                      235,158
                      345,147
                      455,136
                      585,127
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="profit-line"
                  />

                </svg>


                <div className="chart-dots revenue-dots">

                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>

                </div>


                <div className="chart-dots profit-dots">

                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>

                </div>

              </div>


              <div className="pl-x-axis">

                {monthlyData.map((item) => (
                  <span key={item.month}>
                    {item.month.replace(" 2026", "")}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          EXPENSE BREAKDOWN
      ========================================== */}

      <div className="pl-card expense-card">

        <div className="pl-card-header">

          <div>
            <h2>Operating Expenses</h2>

            <p>
              Breakdown of expenses for the selected period.
            </p>
          </div>

          <strong className="expense-total">
            {formatCurrency(operatingExpenses)}
          </strong>

        </div>


        <div className="expense-content">

          <div className="expense-bars">

            {expenseData.map((expense) => (

              <div
                className="expense-item"
                key={expense.name}
              >

                <div className="expense-info">

                  <span>
                    {expense.name}
                  </span>

                  <strong>
                    {formatCurrency(expense.amount)}
                  </strong>

                </div>

                <div className="expense-track">

                  <div
                    style={{
                      width: `${expense.percentage}%`,
                    }}
                  ></div>

                </div>

                <span className="expense-percentage">
                  {expense.percentage}%
                </span>

              </div>

            ))}

          </div>


          <div className="expense-total-box">

            <span>Total Expenses</span>

            <strong>
              {formatCurrency(operatingExpenses)}
            </strong>

            <small>
              {(
                (operatingExpenses / totalRevenue) *
                100
              ).toFixed(1)}
              % of revenue
            </small>

          </div>

        </div>

      </div>


      {/* ==========================================
          PRODUCT PROFITABILITY
      ========================================== */}

      <div className="pl-card product-profit-card">

        <div className="pl-table-header">

          <div>
            <h2>Product Profitability</h2>

            <p>
              Products generating the highest profit.
            </p>
          </div>


          <div className="pl-search">

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        <div className="pl-table-wrapper">

          <table className="pl-table">

            <thead>

              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>REVENUE</th>
                <th>COST</th>
                <th>GROSS PROFIT</th>
                <th>MARGIN</th>
                <th></th>
              </tr>

            </thead>


            <tbody>

              {filteredProducts.map((item) => (

                <tr key={item.product}>

                  <td>

                    <div className="pl-product">

                      <div className="pl-product-icon">
                        {item.product.charAt(0)}
                      </div>

                      <strong>
                        {item.product}
                      </strong>

                    </div>

                  </td>


                  <td>
                    <span className="category-text">
                      {item.category}
                    </span>
                  </td>


                  <td>
                    <strong className="revenue-text">
                      {formatCurrency(item.revenue)}
                    </strong>
                  </td>


                  <td>
                    <span className="cost-text">
                      {formatCurrency(item.cost)}
                    </span>
                  </td>


                  <td>
                    <strong className="profit-text">
                      {formatCurrency(item.profit)}
                    </strong>
                  </td>


                  <td>

                    <div className="margin-cell">

                      <span>
                        {item.margin}%
                      </span>

                      <div className="mini-margin">
                        <i
                          style={{
                            width: `${item.margin}%`,
                          }}
                        ></i>
                      </div>

                    </div>

                  </td>


                  <td>

                    <button className="pl-table-action">
                      <MoreHorizontal size={14} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        <div className="pl-table-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredProducts.length}
            </strong>{" "}
            of{" "}
            <strong>
              {productProfitData.length}
            </strong>{" "}
            products
          </span>


          <div className="pl-pagination">

            <button>
              <ChevronLeft size={13} />
            </button>

            <button className="active">
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


      {/* ==========================================
          MONTHLY P&L
      ========================================== */}

      <div className="pl-card monthly-card">

        <div className="pl-card-header">

          <div>
            <h2>Monthly Profit & Loss</h2>

            <p>
              Historical financial performance.
            </p>
          </div>

          <button className="monthly-view-btn">
            Monthly
            <ChevronDown size={11} />
          </button>

        </div>


        <div className="monthly-table-wrapper">

          <table className="monthly-table">

            <thead>

              <tr>
                <th>PERIOD</th>
                <th>REVENUE</th>
                <th>COGS</th>
                <th>GROSS PROFIT</th>
                <th>OPERATING EXPENSES</th>
                <th>NET PROFIT</th>
                <th>MARGIN</th>
              </tr>

            </thead>


            <tbody>

              {monthlyData.map((item) => (

                <tr key={item.month}>

                  <td>
                    <strong>
                      {item.month}
                    </strong>
                  </td>

                  <td>
                    {formatCurrency(item.revenue)}
                  </td>

                  <td className="monthly-cost">
                    {formatCurrency(item.cogs)}
                  </td>

                  <td className="monthly-gross">
                    {formatCurrency(item.grossProfit)}
                  </td>

                  <td>
                    {formatCurrency(item.expenses)}
                  </td>

                  <td className="monthly-profit">
                    {formatCurrency(item.netProfit)}
                  </td>

                  <td>

                    <span className="margin-badge">
                      {item.margin}%
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

