'use client';

import Link from "next/link";

import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaBox,
  FaExchangeAlt,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaChartLine,
  FaReceipt,
  FaCalendarAlt,
  FaUserTie,
  FaCreditCard,
  FaTruck,
  FaUndo,
  FaWarehouse,
  FaArrowRight,
} from "react-icons/fa";
import "./dashboard.css"

// ======================================================
// MOCK DATA
// Replace with live data from your services layer
// ======================================================

const stats = [
  {
    key: "sales",
    label: "Today's Sales",
    value: "₦1,245,500",
    trend: 12.5,
    trendLabel: "vs. yesterday",
    icon: FaShoppingCart,
    tone: "forest",
    href: "/admin/sales",
    linkLabel: "View sales",
  },
  {
    key: "profit",
    label: "Today's Profit",
    value: "₦385,200",
    trend: 8.3,
    trendLabel: "vs. yesterday",
    icon: FaMoneyBillWave,
    tone: "gold",
    href: "/admin/reports/profit-loss",
    linkLabel: "View profit",
  },
  {
    key: "products",
    label: "Total Products",
    value: "2,548",
    note: "37 products low in stock",
    icon: FaBox,
    tone: "slate",
    href: "/admin/products",
    linkLabel: "Manage products",
  },
  {
    key: "customers",
    label: "Customers",
    value: "1,842",
    note: "28 new this month",
    icon: FaUsers,
    tone: "steel",
    href: "/admin/customers",
    linkLabel: "View customers",
  },
];

const paymentMethods = [
  { key: "cash", label: "Cash", amount: "₦542,000", icon: FaMoneyBillWave },
  { key: "pos", label: "POS", amount: "₦486,500", icon: FaCreditCard },
  { key: "transfer", label: "Transfer", amount: "₦217,000", icon: FaExchangeAlt },
];

const recentSales = [
  { invoice: "#INV-10025", customer: "Walk-in Customer", cashier: "John", amount: "₦85,500", payment: "POS", status: "Paid" },
  { invoice: "#INV-10024", customer: "Michael Obi", cashier: "Sarah", amount: "₦42,300", payment: "Cash", status: "Paid" },
  { invoice: "#INV-10023", customer: "Chinedu Ltd", cashier: "John", amount: "₦125,000", payment: "Transfer", status: "Paid" },
  { invoice: "#INV-10022", customer: "Grace Okafor", cashier: "Sarah", amount: "₦18,700", payment: "Cash", status: "Pending" },
  { invoice: "#INV-10021", customer: "Walk-in Customer", cashier: "Michael", amount: "₦67,200", payment: "POS", status: "Paid" },
];

const lowStock = [
  { name: "Indomie Noodles", sku: "IND-001", left: 5, level: "critical" },
  { name: "Peak Milk 400g", sku: "PM-400", left: 8, level: "low" },
  { name: "Golden Penny Spaghetti", sku: "GPS-001", left: 12, level: "low" },
  { name: "Milo 500g", sku: "MIL-500", left: 3, level: "critical" },
];

const topProducts = [
  { name: "Indomie Noodles", sold: 428, revenue: "₦214,000" },
  { name: "Peak Milk", sold: 315, revenue: "₦157,500" },
  { name: "Coca-Cola 50cl", sold: 287, revenue: "₦143,500" },
  { name: "Golden Penny Spaghetti", sold: 243, revenue: "₦121,500" },
];

const cashierPerformance = [
  { name: "John", sales: 38, amount: "₦385,200" },
  { name: "Sarah", sales: 31, amount: "₦312,500" },
  { name: "Michael", sales: 27, amount: "₦276,800" },
];

const quickLinks = [
  { label: "Products", href: "/admin/products", icon: FaBox, tone: "slate" },
  { label: "Inventory", href: "/admin/inventory", icon: FaWarehouse, tone: "forest" },
  { label: "Purchases", href: "/admin/purchases", icon: FaTruck, tone: "steel" },
  { label: "Returns", href: "/admin/sales/returns", icon: FaUndo, tone: "brick" },
];


export default function Dashboard() {

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-page content-wrapper">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>
          <p>Here's how your store is performing today.</p>
        </div>

        <div className="dashboard-date">
          <FaCalendarAlt size={13} />
          {today}
        </div>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="dashboard-stats">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="dashboard-stat-card" key={stat.key}>

              <div className="dashboard-stat-top">

                <div className={`dashboard-stat-icon ${stat.tone}`}>
                  <Icon size={16} />
                </div>

                {typeof stat.trend === "number" && (
                  <span
                    className={`dashboard-stat-trend ${
                      stat.trend >= 0 ? "up" : "down"
                    }`}
                  >
                    {stat.trend >= 0 ? (
                      <FaArrowUp size={9} />
                    ) : (
                      <FaArrowDown size={9} />
                    )}
                    {Math.abs(stat.trend)}%
                  </span>
                )}

              </div>

              <strong className="dashboard-stat-value">
                {stat.value}
              </strong>

              <span className="dashboard-stat-label">
                {stat.label}
              </span>

              <span className="dashboard-stat-note">
                {stat.trendLabel ? stat.trendLabel : stat.note}
              </span>

              <Link
                href={stat.href}
                className="dashboard-stat-link"
              >
                {stat.linkLabel}
                <FaArrowRight size={10} />
              </Link>

            </div>
          );
        })}

      </div>


      {/* =====================================================
          SALES OVERVIEW + PAYMENT METHODS
      ===================================================== */}

      <div className="dashboard-grid-2 wide-left">


        {/* SALES OVERVIEW */}

        <section className="dashboard-panel">

          <div className="dashboard-panel-header">

            <h3>
              <FaChartLine size={14} />
              Sales Overview
            </h3>

            <button type="button" className="dashboard-panel-tool">
              <FaCalendarAlt size={12} />
            </button>

          </div>

          <div className="dashboard-chart-placeholder">

            <FaChartLine size={38} />

            <h4>Sales chart</h4>

            <p>
              Connect your sales data to display daily, weekly
              and monthly trends here.
            </p>

          </div>

          <div className="dashboard-panel-footer">

            <div>
              <strong>₦8.4M</strong>
              <span>This month</span>
            </div>

            <div>
              <strong>₦23.8M</strong>
              <span>This quarter</span>
            </div>

            <div>
              <strong>₦86.2M</strong>
              <span>This year</span>
            </div>

          </div>

        </section>


        {/* PAYMENT METHODS */}

        <section className="dashboard-panel">

          <div className="dashboard-panel-header">
            <h3>
              <FaCreditCard size={14} />
              Payment Methods
            </h3>
          </div>

          <div className="dashboard-payment-list">

            {paymentMethods.map((method) => {
              const Icon = method.icon;

              return (
                <div className="dashboard-payment-row" key={method.key}>

                  <div className="dashboard-payment-name">
                    <Icon size={13} />
                    {method.label}
                  </div>

                  <strong>{method.amount}</strong>

                </div>
              );
            })}

            <div className="dashboard-payment-total">
              <span>Total</span>
              <strong>₦1,245,500</strong>
            </div>

          </div>

        </section>

      </div>


      {/* =====================================================
          RECENT SALES + LOW STOCK
      ===================================================== */}

      <div className="dashboard-grid-2 wide-left">


        {/* RECENT SALES */}

        <section className="dashboard-panel no-pad">

          <div className="dashboard-panel-header">

            <h3>
              <FaReceipt size={14} />
              Recent Sales
            </h3>

            <Link href="/admin/sales" className="dashboard-panel-link">
              View all
            </Link>

          </div>

          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Cashier</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {recentSales.map((sale) => (
                  <tr key={sale.invoice}>
                    <td className="dashboard-cell-strong">{sale.invoice}</td>
                    <td>{sale.customer}</td>
                    <td>{sale.cashier}</td>
                    <td className="dashboard-cell-amount">{sale.amount}</td>
                    <td>{sale.payment}</td>
                    <td>
                      <span
                        className={`dashboard-badge ${
                          sale.status === "Paid" ? "paid" : "pending"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* LOW STOCK */}

        <section className="dashboard-panel no-pad">

          <div className="dashboard-panel-header">

            <h3>
              <FaExclamationTriangle size={13} />
              Low Stock
            </h3>

            <Link href="/admin/inventory/low-stock" className="dashboard-panel-link">
              View all
            </Link>

          </div>

          <ul className="dashboard-stock-list">

            {lowStock.map((item) => (
              <li key={item.sku}>

                <div>
                  <strong>{item.name}</strong>
                  <span>SKU: {item.sku}</span>
                </div>

                <span className={`dashboard-stock-badge ${item.level}`}>
                  {item.left} left
                </span>

              </li>
            ))}

          </ul>

        </section>

      </div>


      {/* =====================================================
          TOP PRODUCTS + CASHIER PERFORMANCE
      ===================================================== */}

      <div className="dashboard-grid-2">


        {/* TOP PRODUCTS */}

        <section className="dashboard-panel no-pad">

          <div className="dashboard-panel-header">
            <h3>
              <FaBox size={13} />
              Top Selling Products
            </h3>
          </div>

          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>

                {topProducts.map((product) => (
                  <tr key={product.name}>
                    <td className="dashboard-cell-strong">{product.name}</td>
                    <td>{product.sold}</td>
                    <td className="dashboard-cell-amount">{product.revenue}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* CASHIER PERFORMANCE */}

        <section className="dashboard-panel no-pad">

          <div className="dashboard-panel-header">
            <h3>
              <FaUserTie size={13} />
              Cashier Performance
            </h3>
          </div>

          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Cashier</th>
                  <th>Sales</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>

                {cashierPerformance.map((cashier) => (
                  <tr key={cashier.name}>
                    <td className="dashboard-cell-strong">{cashier.name}</td>
                    <td>{cashier.sales}</td>
                    <td className="dashboard-cell-amount">{cashier.amount}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>


      {/* =====================================================
          QUICK LINKS
      ===================================================== */}

      <section className="dashboard-panel">

        <div className="dashboard-panel-header">
          <h3>Quick Links</h3>
        </div>

        <div className="dashboard-quicklinks">

          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                href={link.href}
                key={link.label}
                className={`dashboard-quicklink ${link.tone}`}
              >
                <Icon size={14} />
                {link.label}
              </Link>
            );
          })}

        </div>

      </section>


    </div>
  );
}
