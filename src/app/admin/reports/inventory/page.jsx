
"use client";

import React, { useMemo, useState } from "react";
import {
  Download,
  RefreshCw,
  Filter,
  Search,
  Package,
  Boxes,
  AlertTriangle,
  CircleOff,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import "./inventory-report.css";

const inventoryData = [
  {
    id: 1,
    product: "Premium Indomie Noodles",
    sku: "IND-001",
    category: "Food",
    unit: "Pack",
    stock: 145,
    minStock: 40,
    costPrice: 420,
    sellingPrice: 550,
    stockValue: 60900,
    status: "In Stock",
    movement: 34,
  },
  {
    id: 2,
    product: "Peak Full Cream Milk",
    sku: "MIL-002",
    category: "Beverages",
    unit: "Tin",
    stock: 68,
    minStock: 30,
    costPrice: 1100,
    sellingPrice: 1450,
    stockValue: 74800,
    status: "In Stock",
    movement: 12,
  },
  {
    id: 3,
    product: "Golden Penny Spaghetti",
    sku: "SPA-003",
    category: "Food",
    unit: "Pack",
    stock: 18,
    minStock: 25,
    costPrice: 700,
    sellingPrice: 900,
    stockValue: 12600,
    status: "Low Stock",
    movement: 8,
  },
  {
    id: 4,
    product: "Dettol Antiseptic",
    sku: "DET-004",
    category: "Personal Care",
    unit: "Bottle",
    stock: 0,
    minStock: 20,
    costPrice: 1350,
    sellingPrice: 1750,
    stockValue: 0,
    status: "Out of Stock",
    movement: -4,
  },
  {
    id: 5,
    product: "Coca-Cola 50cl",
    sku: "COC-005",
    category: "Beverages",
    unit: "Bottle",
    stock: 210,
    minStock: 50,
    costPrice: 320,
    sellingPrice: 450,
    stockValue: 67200,
    status: "In Stock",
    movement: 46,
  },
  {
    id: 6,
    product: "Ariel Washing Powder",
    sku: "ARI-006",
    category: "Household",
    unit: "Pack",
    stock: 31,
    minStock: 30,
    costPrice: 950,
    sellingPrice: 1200,
    stockValue: 29450,
    status: "In Stock",
    movement: 5,
  },
  {
    id: 7,
    product: "Milo Chocolate Drink",
    sku: "MIL-007",
    category: "Beverages",
    unit: "Tin",
    stock: 14,
    minStock: 25,
    costPrice: 1800,
    sellingPrice: 2200,
    stockValue: 25200,
    status: "Low Stock",
    movement: -7,
  },
  {
    id: 8,
    product: "Detergent Bar Soap",
    sku: "SOP-008",
    category: "Household",
    unit: "Piece",
    stock: 95,
    minStock: 30,
    costPrice: 280,
    sellingPrice: 400,
    stockValue: 26600,
    status: "In Stock",
    movement: 22,
  },
];

const categoryData = [
  {
    category: "Food",
    units: 163,
    value: 73500,
    percentage: 31,
  },
  {
    category: "Beverages",
    units: 292,
    value: 167200,
    percentage: 39,
  },
  {
    category: "Household",
    units: 126,
    value: 56050,
    percentage: 13,
  },
  {
    category: "Personal Care",
    units: 76,
    value: 61200,
    percentage: 17,
  },
];

const movementData = [
  {
    date: "Aug 29, 2026",
    product: "Premium Indomie Noodles",
    type: "Sale",
    quantity: -12,
    reference: "SAL-10482",
    user: "Cashier 01",
  },
  {
    date: "Aug 29, 2026",
    product: "Coca-Cola 50cl",
    type: "Purchase",
    quantity: 60,
    reference: "PO-00281",
    user: "Admin",
  },
  {
    date: "Aug 28, 2026",
    product: "Peak Full Cream Milk",
    type: "Sale",
    quantity: -8,
    reference: "SAL-10479",
    user: "Cashier 02",
  },
  {
    date: "Aug 28, 2026",
    product: "Milo Chocolate Drink",
    type: "Adjustment",
    quantity: -5,
    reference: "ADJ-00124",
    user: "Manager",
  },
  {
    date: "Aug 27, 2026",
    product: "Golden Penny Spaghetti",
    type: "Purchase",
    quantity: 30,
    reference: "PO-00277",
    user: "Admin",
  },
];

export default function InventoryReportPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stockStatus, setStockStatus] = useState("All Status");
  const [dateRange, setDateRange] = useState("This Month");
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount) =>
    `₦${amount.toLocaleString("en-NG")}`;

  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) => {
      const matchesSearch =
        `${item.product} ${item.sku} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        item.category === category;

      const matchesStatus =
        stockStatus === "All Status" ||
        item.status === stockStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, category, stockStatus]);

  return (
    <div className="inventory-report-page content-wrapper">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="inventory-header">

        <div>
          <h1>Inventory Report</h1>

          <p>
            Monitor stock levels, inventory value and stock movement.
          </p>
        </div>

        <div className="inventory-header-actions">

          <button className="inventory-refresh">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="inventory-export">
            <Download size={13} />
            Export Report
          </button>

        </div>

      </div>


      {/* ==========================================
          FILTER BAR
      ========================================== */}

      <div className="inventory-filter-card">

        <div className="inventory-filter-heading">

          <div className="inventory-filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Report Filters</strong>

            <span>
              Filter inventory information.
            </span>
          </div>

        </div>


        <div className="inventory-filters">

          <div className="inventory-select">

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

            <ChevronDown size={11} />

          </div>


          <div className="inventory-select">

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>All Categories</option>
              <option>Food</option>
              <option>Beverages</option>
              <option>Household</option>
              <option>Personal Care</option>
            </select>

            <ChevronDown size={11} />

          </div>


          <div className="inventory-select">

            <select
              value={stockStatus}
              onChange={(e) =>
                setStockStatus(e.target.value)
              }
            >
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>

            <ChevronDown size={11} />

          </div>

        </div>

      </div>


      {/* ==========================================
          KPI CARDS
      ========================================== */}

      <div className="inventory-kpis">

        <div className="inventory-kpi">

          <div className="inventory-kpi-top">

            <div className="inventory-kpi-icon blue">
              <Package size={16} />
            </div>

            <span>TOTAL PRODUCTS</span>

          </div>

          <strong>1,248</strong>

          <div className="inventory-kpi-change positive">
            <ArrowUpRight size={11} />
            6.4%
            <small>vs last month</small>
          </div>

        </div>


        <div className="inventory-kpi">

          <div className="inventory-kpi-top">

            <div className="inventory-kpi-icon purple">
              <Boxes size={16} />
            </div>

            <span>STOCK UNITS</span>

          </div>

          <strong>8,426</strong>

          <div className="inventory-kpi-change positive">
            <ArrowUpRight size={11} />
            8.7%
            <small>vs last month</small>
          </div>

        </div>


        <div className="inventory-kpi">

          <div className="inventory-kpi-top">

            <div className="inventory-kpi-icon green">
              <TrendingUp size={16} />
            </div>

            <span>INVENTORY VALUE</span>

          </div>

          <strong>₦4.86M</strong>

          <div className="inventory-kpi-change positive">
            <ArrowUpRight size={11} />
            11.2%
            <small>vs last month</small>
          </div>

        </div>


        <div className="inventory-kpi">

          <div className="inventory-kpi-top">

            <div className="inventory-kpi-icon orange">
              <AlertTriangle size={16} />
            </div>

            <span>LOW STOCK</span>

          </div>

          <strong>37</strong>

          <div className="inventory-kpi-change negative">
            <ArrowUpRight size={11} />
            4.8%
            <small>needs attention</small>
          </div>

        </div>


        <div className="inventory-kpi">

          <div className="inventory-kpi-top">

            <div className="inventory-kpi-icon red">
              <CircleOff size={16} />
            </div>

            <span>OUT OF STOCK</span>

          </div>

          <strong>12</strong>

          <div className="inventory-kpi-change negative">
            <ArrowDownRight size={11} />
            2.1%
            <small>vs last month</small>
          </div>

        </div>

      </div>


      {/* ==========================================
          SUMMARY GRID
      ========================================== */}

      <div className="inventory-summary-grid">

        {/* STOCK VALUE */}

        <div className="inventory-card stock-value-card">

          <div className="inventory-card-header">

            <div>
              <h2>Inventory Valuation</h2>
              <p>Current inventory value by cost.</p>
            </div>

            <MoreHorizontal
              size={15}
              className="inventory-more"
            />

          </div>


          <div className="valuation-body">

            <div className="valuation-total">
              <span>Total Stock Value</span>

              <strong>
                ₦4,860,250
              </strong>

              <small>
                Based on current cost prices
              </small>
            </div>


            <div className="valuation-row">

              <span>Cost of Stock</span>

              <strong>
                ₦4,860,250
              </strong>

            </div>


            <div className="valuation-row">

              <span>Potential Sales Value</span>

              <strong className="sales-value">
                ₦6,142,800
              </strong>

            </div>


            <div className="valuation-row">

              <span>Potential Gross Profit</span>

              <strong className="profit-value">
                ₦1,282,550
              </strong>

            </div>


            <div className="valuation-margin">

              <span>Potential Margin</span>

              <strong>20.9%</strong>

            </div>

          </div>

        </div>


        {/* CATEGORY BREAKDOWN */}

        <div className="inventory-card category-card">

          <div className="inventory-card-header">

            <div>
              <h2>Stock by Category</h2>
              <p>Inventory distribution.</p>
            </div>

            <MoreHorizontal
              size={15}
              className="inventory-more"
            />

          </div>


          <div className="category-body">

            {categoryData.map((item) => (

              <div
                className="category-item"
                key={item.category}
              >

                <div className="category-item-top">

                  <span>
                    {item.category}
                  </span>

                  <strong>
                    {formatCurrency(item.value)}
                  </strong>

                </div>


                <div className="category-track">

                  <i
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  ></i>

                </div>


                <div className="category-bottom">

                  <span>
                    {item.units} units
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
          TABS
      ========================================== */}

      <div className="inventory-tabs-card">

        <div className="inventory-tabs">

          <button
            className={
              activeTab === "overview"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("overview")
            }
          >
            Stock Overview
          </button>

          <button
            className={
              activeTab === "movement"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("movement")
            }
          >
            Stock Movement
          </button>

        </div>


        {activeTab === "overview" ? (

          <>

            {/* TABLE HEADER */}

            <div className="inventory-table-toolbar">

              <div>
                <h2>Inventory Overview</h2>

                <p>
                  Current stock position for all products.
                </p>
              </div>


              <div className="inventory-search">

                <Search size={12} />

                <input
                  type="text"
                  placeholder="Search product or SKU..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>


            {/* INVENTORY TABLE */}

            <div className="inventory-table-wrapper">

              <table className="inventory-table">

                <thead>

                  <tr>
                    <th>PRODUCT</th>
                    <th>SKU</th>
                    <th>CATEGORY</th>
                    <th>STOCK</th>
                    <th>COST PRICE</th>
                    <th>SELLING PRICE</th>
                    <th>STOCK VALUE</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {filteredInventory.map((item) => (

                    <tr key={item.id}>

                      <td>

                        <div className="inventory-product">

                          <div className="inventory-product-image">
                            {item.product.charAt(0)}
                          </div>

                          <div>
                            <strong>
                              {item.product}
                            </strong>

                            <span>
                              {item.unit}
                            </span>
                          </div>

                        </div>

                      </td>


                      <td>
                        <span className="sku">
                          {item.sku}
                        </span>
                      </td>


                      <td>
                        <span className="inventory-category">
                          {item.category}
                        </span>
                      </td>


                      <td>

                        <div className="stock-cell">

                          <strong>
                            {item.stock}
                          </strong>

                          <small>
                            min. {item.minStock}
                          </small>

                        </div>

                      </td>


                      <td>
                        {formatCurrency(item.costPrice)}
                      </td>


                      <td>
                        <strong className="selling-price">
                          {formatCurrency(item.sellingPrice)}
                        </strong>
                      </td>


                      <td>

                        <strong className="stock-value">
                          {formatCurrency(item.stockValue)}
                        </strong>

                      </td>


                      <td>

                        {item.status === "In Stock" && (
                          <span className="stock-status in-stock">
                            <i></i>
                            In Stock
                          </span>
                        )}

                        {item.status === "Low Stock" && (
                          <span className="stock-status low-stock">
                            <i></i>
                            Low Stock
                          </span>
                        )}

                        {item.status === "Out of Stock" && (
                          <span className="stock-status out-stock">
                            <i></i>
                            Out of Stock
                          </span>
                        )}

                      </td>


                      <td>

                        <button className="inventory-action">
                          <MoreHorizontal size={14} />
                        </button>

                      </td>

                    </tr>

                  ))}


                  {filteredInventory.length === 0 && (

                    <tr>

                      <td
                        colSpan="9"
                        className="inventory-empty"
                      >
                        No inventory items found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* TABLE FOOTER */}

            <div className="inventory-table-footer">

              <span>
                Showing{" "}
                <strong>
                  {filteredInventory.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {inventoryData.length}
                </strong>{" "}
                products
              </span>


              <div className="inventory-pagination">

                <button>
                  <ChevronLeft size={12} />
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
                  4
                </button>

                <button>
                  <ChevronRight size={12} />
                </button>

              </div>

            </div>

          </>

        ) : (

          /* ======================================
             STOCK MOVEMENT
          ====================================== */

          <>

            <div className="inventory-table-toolbar">

              <div>
                <h2>Stock Movement</h2>

                <p>
                  Recent inventory transactions.
                </p>
              </div>


              <button className="movement-filter">
                <Filter size={11} />
                Filter Movement
              </button>

            </div>


            <div className="inventory-table-wrapper">

              <table className="inventory-table movement-table">

                <thead>

                  <tr>
                    <th>DATE</th>
                    <th>PRODUCT</th>
                    <th>TYPE</th>
                    <th>QUANTITY</th>
                    <th>REFERENCE</th>
                    <th>USER</th>
                    <th></th>
                  </tr>

                </thead>


                <tbody>

                  {movementData.map((item, index) => (

                    <tr key={index}>

                      <td>
                        {item.date}
                      </td>


                      <td>

                        <strong className="movement-product">
                          {item.product}
                        </strong>

                      </td>


                      <td>

                        <span
                          className={`movement-type ${
                            item.type
                              .toLowerCase()
                              .replace(" ", "-")
                          }`}
                        >
                          {item.type}
                        </span>

                      </td>


                      <td>

                        <strong
                          className={
                            item.quantity > 0
                              ? "quantity-positive"
                              : "quantity-negative"
                          }
                        >
                          {item.quantity > 0
                            ? `+${item.quantity}`
                            : item.quantity}
                        </strong>

                      </td>


                      <td>
                        <span className="reference">
                          {item.reference}
                        </span>
                      </td>


                      <td>
                        {item.user}
                      </td>


                      <td>

                        <button className="inventory-action">
                          <MoreHorizontal size={14} />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            <div className="inventory-table-footer">

              <span>
                Showing{" "}
                <strong>5</strong>{" "}
                recent movements
              </span>

              <div className="inventory-pagination">

                <button>
                  <ChevronLeft size={12} />
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
                  <ChevronRight size={12} />
                </button>

              </div>

            </div>

          </>

        )}

      </div>


      {/* ==========================================
          STOCK ALERT
      ========================================== */}

      <div className="inventory-alert">

        <div className="inventory-alert-icon">
          <AlertTriangle size={15} />
        </div>

        <div>

          <strong>
            Inventory attention required
          </strong>

          <p>
            You currently have <b>37 products</b> below
            their minimum stock level and{" "}
            <b>12 products</b> completely out of stock.
          </p>

        </div>

        <button>
          View Low Stock
        </button>

      </div>

    </div>
  );
}

