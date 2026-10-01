
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  History,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  SlidersHorizontal,
  RotateCcw,
  Package,
  CalendarDays,
  User,
  Warehouse,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  FileText,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";

import "./stock-history.css";


const initialHistory = [
  {
    id: "STK-000184",
    date: "Aug 28, 2026",
    time: "10:42 AM",
    product: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    type: "Sale",
    quantity: -2,
    before: 16,
    after: 14,
    reference: "SALE-2026-00842",
    user: "Cashier 01",
    location: "Main Store",
    note: "Sold at POS",
  },
  {
    id: "STK-000183",
    date: "Aug 28, 2026",
    time: "09:55 AM",
    product: "Oraimo Power Bank 20000mAh",
    sku: "ORA-PB-20K",
    type: "Purchase",
    quantity: 30,
    before: 15,
    after: 45,
    reference: "PO-2026-00125",
    user: "Admin",
    location: "Main Store",
    note: "Purchase order received",
  },
  {
    id: "STK-000182",
    date: "Aug 28, 2026",
    time: "09:31 AM",
    product: "HP 15 Core i5 Laptop",
    sku: "HP-15-I5-16",
    type: "Adjustment",
    quantity: -1,
    before: 8,
    after: 7,
    reference: "ADJ-2026-0021",
    user: "Manager",
    location: "Main Store",
    note: "Damaged unit",
  },
  {
    id: "STK-000181",
    date: "Aug 27, 2026",
    time: "05:22 PM",
    product: "iPhone 15 128GB",
    sku: "IPH-15-128",
    type: "Transfer",
    quantity: -5,
    before: 20,
    after: 15,
    reference: "TRF-2026-0048",
    user: "Admin",
    location: "Main Store",
    note: "Transferred to Warehouse",
  },
  {
    id: "STK-000180",
    date: "Aug 27, 2026",
    time: "05:22 PM",
    product: "iPhone 15 128GB",
    sku: "IPH-15-128",
    type: "Transfer",
    quantity: 5,
    before: 8,
    after: 13,
    reference: "TRF-2026-0048",
    user: "Admin",
    location: "Warehouse",
    note: "Received from Main Store",
  },
  {
    id: "STK-000179",
    date: "Aug 27, 2026",
    time: "03:14 PM",
    product: "JBL Tune 510BT",
    sku: "JBL-510BT",
    type: "Sale",
    quantity: -3,
    before: 9,
    after: 6,
    reference: "SALE-2026-00831",
    user: "Cashier 02",
    location: "Main Store",
    note: "Sold at POS",
  },
  {
    id: "STK-000178",
    date: "Aug 27, 2026",
    time: "01:40 PM",
    product: "Logitech M185 Wireless Mouse",
    sku: "LOG-M185",
    type: "Purchase",
    quantity: 25,
    before: 10,
    after: 35,
    reference: "PO-2026-00124",
    user: "Admin",
    location: "Warehouse",
    note: "Purchase order received",
  },
  {
    id: "STK-000177",
    date: "Aug 27, 2026",
    time: "11:16 AM",
    product: "USB Type-C Cable",
    sku: "USB-C-1M",
    type: "Return",
    quantity: 2,
    before: 6,
    after: 8,
    reference: "RET-2026-0016",
    user: "Manager",
    location: "Main Store",
    note: "Customer returned items",
  },
  {
    id: "STK-000176",
    date: "Aug 26, 2026",
    time: "04:35 PM",
    product: "Samsung 25W Fast Charger",
    sku: "SAM-25W-CHR",
    type: "Sale",
    quantity: -4,
    before: 30,
    after: 26,
    reference: "SALE-2026-00812",
    user: "Cashier 01",
    location: "Main Store",
    note: "Sold at POS",
  },
  {
    id: "STK-000175",
    date: "Aug 26, 2026",
    time: "02:20 PM",
    product: "Kingston 256GB SSD",
    sku: "KIN-SSD-256",
    type: "Adjustment",
    quantity: 3,
    before: 7,
    after: 10,
    reference: "ADJ-2026-0020",
    user: "Manager",
    location: "Warehouse",
    note: "Physical stock count",
  },
  {
    id: "STK-000174",
    date: "Aug 26, 2026",
    time: "12:05 PM",
    product: "HP Wireless Keyboard",
    sku: "HP-KB-100",
    type: "Sale",
    quantity: -2,
    before: 14,
    after: 12,
    reference: "SALE-2026-00795",
    user: "Cashier 03",
    location: "Main Store",
    note: "Sold at POS",
  },
  {
    id: "STK-000173",
    date: "Aug 25, 2026",
    time: "10:48 AM",
    product: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    type: "Purchase",
    quantity: 10,
    before: 6,
    after: 16,
    reference: "PO-2026-00121",
    user: "Admin",
    location: "Main Store",
    note: "Purchase order received",
  },
];


const movementTypes = [
  "Sale",
  "Purchase",
  "Adjustment",
  "Transfer",
  "Return",
];


export default function StockHistory() {

  const [history, setHistory] =
    useState(initialHistory);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [locationFilter, setLocationFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedMovement, setSelectedMovement] =
    useState(null);

  const [showFilters, setShowFilters] =
    useState(false);

  const [showMenu, setShowMenu] =
    useState(null);

  const itemsPerPage = 8;


  /* =========================================
     FILTER
  ========================================= */

  const filteredHistory = useMemo(() => {

    return history.filter((item) => {

      const searchText =
        search.toLowerCase();

      const searchMatch =
        item.product
          .toLowerCase()
          .includes(searchText) ||
        item.sku
          .toLowerCase()
          .includes(searchText) ||
        item.reference
          .toLowerCase()
          .includes(searchText) ||
        item.user
          .toLowerCase()
          .includes(searchText);

      const typeMatch =
        typeFilter === "All" ||
        item.type === typeFilter;

      const locationMatch =
        locationFilter === "All" ||
        item.location === locationFilter;

      let dateMatch = true;

      if (dateFilter === "Today") {
        dateMatch =
          item.date === "Aug 28, 2026";
      }

      if (dateFilter === "Yesterday") {
        dateMatch =
          item.date === "Aug 27, 2026";
      }

      return (
        searchMatch &&
        typeMatch &&
        locationMatch &&
        dateMatch
      );

    });

  }, [
    history,
    search,
    typeFilter,
    locationFilter,
    dateFilter,
  ]);


  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.ceil(
    filteredHistory.length /
      itemsPerPage
  );

  const paginatedHistory =
    filteredHistory.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );


  /* =========================================
     STATISTICS
  ========================================= */

  const totalMovements =
    history.length;

  const stockIn =
    history
      .filter(
        (item) => item.quantity > 0
      )
      .reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

  const stockOut =
    Math.abs(
      history
        .filter(
          (item) => item.quantity < 0
        )
        .reduce(
          (total, item) =>
            total + item.quantity,
          0
        )
    );

  const salesMovements =
    history.filter(
      (item) => item.type === "Sale"
    ).length;

  const purchaseMovements =
    history.filter(
      (item) => item.type === "Purchase"
    ).length;


  /* =========================================
     FORMAT QUANTITY
  ========================================= */

  const formatQuantity = (quantity) => {

    if (quantity > 0) {
      return `+${quantity}`;
    }

    return quantity.toString();

  };


  /* =========================================
     MOVEMENT ICON
  ========================================= */

  const movementIcon = (type) => {

    switch (type) {

      case "Sale":
        return <ArrowUpFromLine size={14} />;

      case "Purchase":
        return <ArrowDownToLine size={14} />;

      case "Adjustment":
        return <SlidersHorizontal size={14} />;

      case "Transfer":
        return <ArrowLeftRight size={14} />;

      case "Return":
        return <RotateCcw size={14} />;

      default:
        return <History size={14} />;

    }

  };


  /* =========================================
     MOVEMENT CLASS
  ========================================= */

  const movementClass = (type) => {

    return type
      .toLowerCase()
      .replace(" ", "-");

  };


  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const clearFilters = () => {

    setSearch("");
    setTypeFilter("All");
    setLocationFilter("All");
    setDateFilter("All");
    setCurrentPage(1);

  };


  /* =========================================
     EXPORT
  ========================================= */

  const exportHistory = () => {

    const headers = [
      "ID",
      "Date",
      "Time",
      "Product",
      "SKU",
      "Type",
      "Quantity",
      "Before",
      "After",
      "Reference",
      "User",
      "Location",
    ];

    const rows =
      filteredHistory.map((item) => [
        item.id,
        item.date,
        item.time,
        item.product,
        item.sku,
        item.type,
        item.quantity,
        item.before,
        item.after,
        item.reference,
        item.user,
        item.location,
      ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "stock-history.csv";

    link.click();

    URL.revokeObjectURL(url);

  };


  return (

    <div className="stock-history-page  content-wrapper">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="stock-history-header">

        <div>

          <div className="stock-history-breadcrumb">

            <span>Inventory</span>

            <span>/</span>

            <strong>
              Stock History
            </strong>

          </div>


          <div className="stock-history-title">

            <div className="stock-history-title-icon">
              <History size={20} />
            </div>

            <div>

              <h1>
                Stock History
              </h1>

              <p>
                Track every inventory movement
                across your business.
              </p>

            </div>

          </div>

        </div>


        <div className="stock-history-header-actions">

          <button
            className="history-refresh"
            onClick={() =>
              setHistory([
                ...initialHistory,
              ])
            }
          >
            <RefreshCw size={14} />
            Refresh
          </button>


          <button
            className="history-export"
            onClick={exportHistory}
          >
            <Download size={14} />
            Export
          </button>

        </div>

      </div>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="history-stats  ">


        <div className="history-stat">

          <div className="history-stat-icon blue">
            <History size={18} />
          </div>

          <div>

            <span>
              Total Movements
            </span>

            <strong>
              {totalMovements}
            </strong>

            <small>
              All stock activities
            </small>

          </div>

        </div>


        <div className="history-stat">

          <div className="history-stat-icon green">
            <TrendingUp size={18} />
          </div>

          <div>

            <span>
              Stock In
            </span>

            <strong>
              +{stockIn}
            </strong>

            <small>
              Units added
            </small>

          </div>

        </div>


        <div className="history-stat">

          <div className="history-stat-icon red">
            <TrendingDown size={18} />
          </div>

          <div>

            <span>
              Stock Out
            </span>

            <strong>
              -{stockOut}
            </strong>

            <small>
              Units removed
            </small>

          </div>

        </div>


        <div className="history-stat">

          <div className="history-stat-icon purple">
            <ShoppingCartIcon />
          </div>

          <div>

            <span>
              Sales
            </span>

            <strong>
              {salesMovements}
            </strong>

            <small>
              Sales movements
            </small>

          </div>

        </div>


        <div className="history-stat">

          <div className="history-stat-icon orange">
            <Package size={18} />
          </div>

          <div>

            <span>
              Purchases
            </span>

            <strong>
              {purchaseMovements}
            </strong>

            <small>
              Purchase movements
            </small>

          </div>

        </div>

      </div>


      {/* =====================================
          FILTER BAR
      ===================================== */}

      <div className="history-filter-card">

        <div className="history-search">

          <Search size={15} />

          <input
            type="text"
            value={search}
            placeholder="Search product, SKU, reference or user..."
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {search && (

            <button
              onClick={() =>
                setSearch("")
              }
            >
              <X size={13} />
            </button>

          )}

        </div>


        <div className="history-filter-select">

          <CalendarDays size={13} />

          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >

            <option value="All">
              All Dates
            </option>

            <option value="Today">
              Today
            </option>

            <option value="Yesterday">
              Yesterday
            </option>

          </select>

          <ChevronDown size={12} />

        </div>


        <div className="history-filter-select">

          <Filter size={13} />

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >

            <option value="All">
              All Movements
            </option>

            {movementTypes.map(
              (type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              )
            )}

          </select>

          <ChevronDown size={12} />

        </div>


        <div className="history-filter-select">

          <Warehouse size={13} />

          <select
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >

            <option value="All">
              All Locations
            </option>

            <option value="Main Store">
              Main Store
            </option>

            <option value="Warehouse">
              Warehouse
            </option>

          </select>

          <ChevronDown size={12} />

        </div>


        <button
          className="clear-history-filter"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>


      {/* =====================================
          TABLE
      ===================================== */}

      <div className="history-table-card">

        <div className="history-table-header">

          <div>

            <h2>
              Inventory Movements
            </h2>

            <p>
              Complete record of stock
              changes.
            </p>

          </div>


          <div className="movement-count">
            {filteredHistory.length} movements
          </div>

        </div>


        <div className="history-table-wrapper">

          <table className="history-table">

            <thead>

              <tr>

                <th>DATE & TIME</th>

                <th>PRODUCT</th>

                <th>MOVEMENT</th>

                <th>QUANTITY</th>

                <th>STOCK LEVEL</th>

                <th>REFERENCE</th>

                <th>USER</th>

                <th>LOCATION</th>

                <th>ACTION</th>

              </tr>

            </thead>


            <tbody>

              {paginatedHistory.map(
                (item) => (

                  <tr key={item.id}>


                    {/* DATE */}

                    <td>

                      <div className="history-date">

                        <strong>
                          {item.date}
                        </strong>

                        <span>
                          {item.time}
                        </span>

                      </div>

                    </td>


                    {/* PRODUCT */}

                    <td>

                      <div className="history-product">

                        <div className="history-product-icon">
                          <Package
                            size={14}
                          />
                        </div>

                        <div>

                          <strong>
                            {item.product}
                          </strong>

                          <span>
                            {item.sku}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* MOVEMENT */}

                    <td>

                      <div
                        className={`movement-type ${movementClass(
                          item.type
                        )}`}
                      >

                        <div>
                          {movementIcon(
                            item.type
                          )}
                        </div>

                        <span>
                          {item.type}
                        </span>

                      </div>

                    </td>


                    {/* QUANTITY */}

                    <td>

                      <span
                        className={`history-quantity ${
                          item.quantity > 0
                            ? "positive"
                            : "negative"
                        }`}
                      >
                        {formatQuantity(
                          item.quantity
                        )}
                      </span>

                    </td>


                    {/* STOCK */}

                    <td>

                      <div className="stock-level">

                        <span>
                          {item.before}
                        </span>

                        <span className="stock-arrow">
                          →
                        </span>

                        <strong>
                          {item.after}
                        </strong>

                      </div>

                    </td>


                    {/* REFERENCE */}

                    <td>

                      <span className="history-reference">
                        {item.reference}
                      </span>

                    </td>


                    {/* USER */}

                    <td>

                      <div className="history-user">

                        <div>
                          <User size={11} />
                        </div>

                        <span>
                          {item.user}
                        </span>

                      </div>

                    </td>


                    {/* LOCATION */}

                    <td>

                      <div className="history-location">

                        <Warehouse
                          size={12}
                        />

                        {item.location}

                      </div>

                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="history-actions">

                        <button
                          title="View details"
                          onClick={() =>
                            setSelectedMovement(
                              item
                            )
                          }
                        >
                          <Eye size={14} />
                        </button>


                        <button
                          title="More"
                          onClick={() =>
                            setShowMenu(
                              showMenu ===
                                item.id
                                ? null
                                : item.id
                            )
                          }
                        >
                          <MoreHorizontal
                            size={14}
                          />
                        </button>


                        {showMenu ===
                          item.id && (

                          <div className="history-action-menu">

                            <button
                              onClick={() => {
                                setSelectedMovement(
                                  item
                                );
                                setShowMenu(null);
                              }}
                            >
                              <Eye size={13} />
                              View Movement
                            </button>

                            <button
                              onClick={() =>
                                alert(
                                  `Opening ${item.reference}`
                                )
                              }
                            >
                              <FileText size={13} />
                              View Reference
                            </button>

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}


              {paginatedHistory.length ===
                0 && (

                <tr>

                  <td
                    colSpan="9"
                    className="history-empty"
                  >

                    <History size={30} />

                    <strong>
                      No stock movements found
                    </strong>

                    <span>
                      Try changing your
                      search or filters.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =====================================
            PAGINATION
        ===================================== */}

        <div className="history-pagination">

          <span>
            Showing{" "}
            {paginatedHistory.length} of{" "}
            {filteredHistory.length} movements
          </span>


          <div>

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              <ChevronLeft size={14} />
            </button>


            {Array.from(
              {
                length: Math.max(
                  totalPages,
                  1
                ),
              },
              (_, index) => (

                <button
                  key={index}
                  className={
                    currentPage ===
                    index + 1
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }
                >
                  {index + 1}
                </button>

              )
            )}


            <button
              disabled={
                currentPage ===
                  totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              <ChevronRight size={14} />
            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          DETAILS MODAL
      ===================================== */}

      {selectedMovement && (

        <div
          className="history-modal-overlay"
          onClick={() =>
            setSelectedMovement(null)
          }
        >

          <div
            className="history-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="history-modal-header">

              <div>

                <div className="history-modal-icon">
                  {movementIcon(
                    selectedMovement.type
                  )}
                </div>

                <div>

                  <h2>
                    Stock Movement
                  </h2>

                  <span>
                    {selectedMovement.id}
                  </span>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedMovement(null)
                }
              >
                <X size={16} />
              </button>

            </div>


            <div className="history-details-content">


              <div className="movement-detail-status">

                <div
                  className={`movement-type ${movementClass(
                    selectedMovement.type
                  )}`}
                >
                  {movementIcon(
                    selectedMovement.type
                  )}

                  {selectedMovement.type}
                </div>


                <span
                  className={
                    selectedMovement.quantity >
                    0
                      ? "detail-positive"
                      : "detail-negative"
                  }
                >
                  {formatQuantity(
                    selectedMovement.quantity
                  )}{" "}
                  units
                </span>

              </div>


              <div className="movement-product-detail">

                <div className="detail-product-icon">
                  <Package size={20} />
                </div>

                <div>

                  <strong>
                    {selectedMovement.product}
                  </strong>

                  <span>
                    SKU:{" "}
                    {selectedMovement.sku}
                  </span>

                </div>

              </div>


              <div className="movement-stock-flow">

                <div>

                  <span>
                    Before
                  </span>

                  <strong>
                    {selectedMovement.before}
                  </strong>

                  <small>
                    units
                  </small>

                </div>


                <div className="flow-arrow">
                  →
                </div>


                <div>

                  <span>
                    After
                  </span>

                  <strong>
                    {selectedMovement.after}
                  </strong>

                  <small>
                    units
                  </small>

                </div>

              </div>


              <div className="movement-detail-grid">

                <div>

                  <span>
                    Date
                  </span>

                  <strong>
                    {selectedMovement.date}
                  </strong>

                </div>


                <div>

                  <span>
                    Time
                  </span>

                  <strong>
                    {selectedMovement.time}
                  </strong>

                </div>


                <div>

                  <span>
                    Reference
                  </span>

                  <strong>
                    {selectedMovement.reference}
                  </strong>

                </div>


                <div>

                  <span>
                    User
                  </span>

                  <strong>
                    {selectedMovement.user}
                  </strong>

                </div>


                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {selectedMovement.location}
                  </strong>

                </div>


                <div>

                  <span>
                    Note
                  </span>

                  <strong>
                    {selectedMovement.note}
                  </strong>

                </div>

              </div>

            </div>


            <div className="history-modal-footer">

              <button
                onClick={() =>
                  setSelectedMovement(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}


/*
 * Small helper component.
 * Keeps the statistics icon consistent.
 */

function ShoppingCartIcon() {

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="20" cy="20" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );

}

