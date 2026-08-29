
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  CircleX,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import "./stock-overview.css";

const initialStock = [
  {
    id: 1,
    sku: "SAM-S24-256",
    name: "Samsung Galaxy S24",
    category: "Mobile Phones",
    unit: "Piece",
    stock: 24,
    reorderLevel: 10,
    costPrice: 720000,
    sellingPrice: 850000,
    value: 17280000,
    status: "In Stock",
    location: "Main Store",
  },
  {
    id: 2,
    sku: "IPH-15-128",
    name: "iPhone 15 128GB",
    category: "Mobile Phones",
    unit: "Piece",
    stock: 8,
    reorderLevel: 10,
    costPrice: 980000,
    sellingPrice: 1150000,
    value: 7840000,
    status: "Low Stock",
    location: "Main Store",
  },
  {
    id: 3,
    sku: "ORA-PB-20K",
    name: "Oraimo Power Bank 20000mAh",
    category: "Accessories",
    unit: "Piece",
    stock: 47,
    reorderLevel: 15,
    costPrice: 18000,
    sellingPrice: 25000,
    value: 846000,
    status: "In Stock",
    location: "Main Store",
  },
  {
    id: 4,
    sku: "HP-15-I5-16",
    name: "HP 15 Core i5 Laptop",
    category: "Laptops",
    unit: "Piece",
    stock: 3,
    reorderLevel: 5,
    costPrice: 650000,
    sellingPrice: 780000,
    value: 1950000,
    status: "Low Stock",
    location: "Computer Store",
  },
  {
    id: 5,
    sku: "LOG-M185",
    name: "Logitech M185 Wireless Mouse",
    category: "Computer Accessories",
    unit: "Piece",
    stock: 0,
    reorderLevel: 10,
    costPrice: 8500,
    sellingPrice: 12000,
    value: 0,
    status: "Out of Stock",
    location: "Main Store",
  },
  {
    id: 6,
    sku: "JBL-FLIP6",
    name: "JBL Flip 6 Speaker",
    category: "Audio",
    unit: "Piece",
    stock: 16,
    reorderLevel: 5,
    costPrice: 110000,
    sellingPrice: 145000,
    value: 1760000,
    status: "In Stock",
    location: "Main Store",
  },
  {
    id: 7,
    sku: "ANK-20W-CH",
    name: "Anker 20W Fast Charger",
    category: "Chargers",
    unit: "Piece",
    stock: 5,
    reorderLevel: 8,
    costPrice: 15000,
    sellingPrice: 22000,
    value: 75000,
    status: "Low Stock",
    location: "Main Store",
  },
  {
    id: 8,
    sku: "SAM-A55-256",
    name: "Samsung Galaxy A55",
    category: "Mobile Phones",
    unit: "Piece",
    stock: 19,
    reorderLevel: 8,
    costPrice: 430000,
    sellingPrice: 520000,
    value: 8170000,
    status: "In Stock",
    location: "Main Store",
  },
  {
    id: 9,
    sku: "HP-INK-680",
    name: "HP 680 Black Ink",
    category: "Printer Supplies",
    unit: "Piece",
    stock: 2,
    reorderLevel: 5,
    costPrice: 7500,
    sellingPrice: 10500,
    value: 15000,
    status: "Low Stock",
    location: "Computer Store",
  },
  {
    id: 10,
    sku: "USB-64GB-SD",
    name: "SanDisk 64GB USB Drive",
    category: "Storage",
    unit: "Piece",
    stock: 32,
    reorderLevel: 10,
    costPrice: 6500,
    sellingPrice: 9500,
    value: 208000,
    status: "In Stock",
    location: "Main Store",
  },
];

export default function StockOverview() {
  const [stock, setStock] = useState(initialStock);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [locationFilter, setLocationFilter] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  /* =================================
     STATISTICS
  ================================= */

  const totalProducts = stock.length;

  const totalQuantity = stock.reduce(
    (sum, item) => sum + item.stock,
    0
  );

  const totalStockValue = stock.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const lowStockItems = stock.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const outOfStockItems = stock.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  const inStockItems = stock.filter(
    (item) => item.status === "In Stock"
  ).length;

  /* =================================
     FILTER
  ================================= */

  const filteredStock = useMemo(() => {
    return stock.filter((item) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(searchValue) ||
        item.sku
          .toLowerCase()
          .includes(searchValue) ||
        item.category
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      const matchesLocation =
        locationFilter === "All" ||
        item.location === locationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesLocation
      );
    });
  }, [
    stock,
    search,
    statusFilter,
    categoryFilter,
    locationFilter,
  ]);

  /* =================================
     CATEGORIES
  ================================= */

  const categories = [
    "All",
    ...new Set(stock.map((item) => item.category)),
  ];

  const locations = [
    "All",
    ...new Set(stock.map((item) => item.location)),
  ];

  /* =================================
     CURRENCY
  ================================= */

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  /* =================================
     REFRESH
  ================================= */

  const refreshStock = () => {
    setStock([...stock]);
  };

  return (
    <div className="stock-page  content-wrapper">

      {/* =================================
          HEADER
      ================================= */}

      <div className="stock-header">

        <div>

          <div className="stock-breadcrumb">

            <span>Inventory</span>

            <span>/</span>

            <strong>Stock Overview</strong>

          </div>

          <h1>Stock Overview</h1>

          <p>
            Monitor your inventory levels, stock value,
            and products that need attention.
          </p>

        </div>


        <div className="stock-header-actions">

          <button
            className="stock-refresh-button"
            onClick={refreshStock}
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button className="stock-adjust-button">
            <ArrowUpFromLine size={16} />
            Adjust Stock
          </button>

        </div>

      </div>


      {/* =================================
          STATISTICS
      ================================= */}

      <div className="stock-stats">

        {/* TOTAL PRODUCTS */}

        <div className="stock-stat-card">

          <div className="stock-stat-top">

            <div className="stock-stat-icon blue">
              <Package size={20} />
            </div>

            <span className="stock-stat-change positive">
              <TrendingUp size={13} />
              8.4%
            </span>

          </div>

          <span className="stock-stat-label">
            Total Products
          </span>

          <h2>
            {totalProducts.toLocaleString()}
          </h2>

          <small>
            Products tracked in inventory
          </small>

        </div>


        {/* TOTAL QUANTITY */}

        <div className="stock-stat-card">

          <div className="stock-stat-top">

            <div className="stock-stat-icon purple">
              <Boxes size={20} />
            </div>

            <span className="stock-stat-change positive">
              <TrendingUp size={13} />
              5.2%
            </span>

          </div>

          <span className="stock-stat-label">
            Total Quantity
          </span>

          <h2>
            {totalQuantity.toLocaleString()}
          </h2>

          <small>
            Units currently available
          </small>

        </div>


        {/* STOCK VALUE */}

        <div className="stock-stat-card">

          <div className="stock-stat-top">

            <div className="stock-stat-icon green">
              <ArrowUpFromLine size={20} />
            </div>

            <span className="stock-stat-change positive">
              <TrendingUp size={13} />
              12.6%
            </span>

          </div>

          <span className="stock-stat-label">
            Stock Value
          </span>

          <h2>
            {formatCurrency(totalStockValue)}
          </h2>

          <small>
            Total inventory cost value
          </small>

        </div>


        {/* LOW STOCK */}

        <div className="stock-stat-card">

          <div className="stock-stat-top">

            <div className="stock-stat-icon orange">
              <AlertTriangle size={20} />
            </div>

            <span className="stock-stat-change negative">
              <TrendingDown size={13} />
              Attention
            </span>

          </div>

          <span className="stock-stat-label">
            Low Stock
          </span>

          <h2>
            {lowStockItems}
          </h2>

          <small>
            Products below reorder level
          </small>

        </div>


        {/* OUT OF STOCK */}

        <div className="stock-stat-card">

          <div className="stock-stat-top">

            <div className="stock-stat-icon red">
              <CircleX size={20} />
            </div>

          </div>

          <span className="stock-stat-label">
            Out of Stock
          </span>

          <h2>
            {outOfStockItems}
          </h2>

          <small>
            Products currently unavailable
          </small>

        </div>

      </div>


      {/* =================================
          STOCK ALERT
      ================================= */}

      {lowStockItems > 0 && (

        <div className="stock-alert">

          <div className="stock-alert-icon">
            <AlertTriangle size={19} />
          </div>

          <div className="stock-alert-content">

            <strong>
              Inventory needs attention
            </strong>

            <span>
              {lowStockItems} products are below
              their recommended reorder level and{" "}
              {outOfStockItems} are completely out
              of stock.
            </span>

          </div>

          <button>
            View Low Stock
          </button>

        </div>

      )}


      {/* =================================
          TABLE CARD
      ================================= */}

      <div className="stock-table-card">

        {/* TOOLBAR */}

        <div className="stock-toolbar">

          <div className="stock-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search product name, SKU..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="stock-toolbar-right">

            <button
              className={`filter-toggle ${
                showFilters ? "active" : ""
              }`}
              onClick={() =>
                setShowFilters(!showFilters)
              }
            >
              <Filter size={16} />
              Filters
            </button>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Stock Status
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Low Stock">
                Low Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>

            </select>

          </div>

        </div>


        {/* ADVANCED FILTERS */}

        {showFilters && (

          <div className="stock-filters">

            <div className="stock-filter-group">

              <label>
                Category
              </label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >

                {categories.map((category) => (

                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>

                ))}

              </select>

            </div>


            <div className="stock-filter-group">

              <label>
                Location
              </label>

              <select
                value={locationFilter}
                onChange={(e) =>
                  setLocationFilter(e.target.value)
                }
              >

                {locations.map((location) => (

                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>

                ))}

              </select>

            </div>


            <button
              className="clear-stock-filters"
              onClick={() => {
                setCategoryFilter("All");
                setLocationFilter("All");
                setStatusFilter("All");
                setSearch("");
              }}
            >
              Clear Filters
            </button>

          </div>

        )}


        {/* TABLE */}

        <div className="stock-table-wrapper">

          <table className="stock-table">

            <thead>

              <tr>

                <th>PRODUCT</th>

                <th>SKU</th>

                <th>CATEGORY</th>

                <th>STOCK</th>

                <th>REORDER LEVEL</th>

                <th>STOCK VALUE</th>

                <th>STATUS</th>

                <th>LOCATION</th>

                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {filteredStock.map((item) => {

                const stockPercentage =
                  item.reorderLevel > 0
                    ? Math.min(
                        100,
                        (item.stock /
                          (item.reorderLevel * 3)) *
                          100
                      )
                    : 100;

                return (

                  <tr key={item.id}>

                    {/* PRODUCT */}

                    <td>

                      <div className="stock-product">

                        <div className="stock-product-image">
                          <Package size={19} />
                        </div>

                        <div>

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.unit}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* SKU */}

                    <td>

                      <span className="stock-sku">
                        {item.sku}
                      </span>

                    </td>


                    {/* CATEGORY */}

                    <td>

                      <span className="stock-category">
                        {item.category}
                      </span>

                    </td>


                    {/* STOCK */}

                    <td>

                      <div className="stock-quantity">

                        <div className="stock-number">

                          <strong>
                            {item.stock}
                          </strong>

                          <span>
                            {item.unit}
                          </span>

                        </div>

                        <div className="stock-progress">

                          <div
                            className={`stock-progress-bar ${
                              item.status
                                .toLowerCase()
                                .replaceAll(
                                  " ",
                                  "-"
                                )
                            }`}
                            style={{
                              width: `${stockPercentage}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>


                    {/* REORDER LEVEL */}

                    <td>

                      <span className="reorder-level">

                        {item.reorderLevel}

                      </span>

                    </td>


                    {/* STOCK VALUE */}

                    <td>

                      <strong className="stock-value">
                        {formatCurrency(item.value)}
                      </strong>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`stock-status ${
                          item.status
                            .toLowerCase()
                            .replaceAll(
                              " ",
                              "-"
                            )
                        }`}
                      >

                        <span className="status-dot" />

                        {item.status}

                      </span>

                    </td>


                    {/* LOCATION */}

                    <td>

                      <span className="stock-location">
                        {item.location}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td>

                      <div className="stock-actions">

                        <button title="View product">
                          <Eye size={15} />
                        </button>

                        <button title="Adjust stock">
                          <Pencil size={15} />
                        </button>

                        <button title="More">
                          <MoreVertical
                            size={15}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>


          {/* EMPTY STATE */}

          {filteredStock.length === 0 && (

            <div className="stock-empty">

              <div className="stock-empty-icon">
                <Package size={29} />
              </div>

              <h3>
                No inventory found
              </h3>

              <p>
                Try changing your search or
                filter options.
              </p>

            </div>

          )}

        </div>


        {/* TABLE FOOTER */}

        <div className="stock-footer">

          <div className="stock-footer-info">

            Showing{" "}

            <strong>
              {filteredStock.length}
            </strong>{" "}

            of{" "}

            <strong>
              {stock.length}
            </strong>{" "}

            products

          </div>


          <div className="stock-pagination">

            <button>
              <ChevronLeft size={16} />
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

            <span>...</span>

            <button>
              8
            </button>

            <button>
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

