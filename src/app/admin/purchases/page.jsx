
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit3,
  Trash2,
  MoreHorizontal,
  Download,
  RefreshCw,
  ShoppingCart,
  Package,
  CheckCircle2,
  Clock3,
  XCircle,
  CreditCard,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Truck,
  CalendarDays,
  User,
  DollarSign,
} from "lucide-react";

import "./all-purchases.css";


const initialPurchases = [
  {
    id: "PO-2026-00125",
    date: "Aug 28, 2026",
    supplier: "Oraimo Nigeria",
    supplierPhone: "0803 456 7890",
    items: 8,
    quantity: 30,
    subtotal: 555000,
    discount: 10000,
    tax: 0,
    shipping: 5000,
    total: 550000,
    paid: 550000,
    balance: 0,
    payment: "Paid",
    status: "Received",
    createdBy: "Admin",
    warehouse: "Main Store",
  },
  {
    id: "PO-2026-00124",
    date: "Aug 27, 2026",
    supplier: "Logitech Distributor",
    supplierPhone: "0805 111 2244",
    items: 12,
    quantity: 25,
    subtotal: 262500,
    discount: 5000,
    tax: 0,
    shipping: 3500,
    total: 261000,
    paid: 150000,
    balance: 111000,
    payment: "Partial",
    status: "Received",
    createdBy: "Admin",
    warehouse: "Warehouse",
  },
  {
    id: "PO-2026-00123",
    date: "Aug 26, 2026",
    supplier: "Samsung Distributor",
    supplierPhone: "0802 333 1199",
    items: 6,
    quantity: 15,
    subtotal: 9300000,
    discount: 100000,
    tax: 0,
    shipping: 15000,
    total: 9215000,
    paid: 0,
    balance: 9215000,
    payment: "Unpaid",
    status: "Pending",
    createdBy: "Manager",
    warehouse: "Main Store",
  },
  {
    id: "PO-2026-00122",
    date: "Aug 25, 2026",
    supplier: "HP Distributor",
    supplierPhone: "0806 444 2288",
    items: 5,
    quantity: 8,
    subtotal: 5120000,
    discount: 50000,
    tax: 0,
    shipping: 10000,
    total: 5080000,
    paid: 5080000,
    balance: 0,
    payment: "Paid",
    status: "Received",
    createdBy: "Admin",
    warehouse: "Main Store",
  },
  {
    id: "PO-2026-00121",
    date: "Aug 25, 2026",
    supplier: "JBL Distributor",
    supplierPhone: "0807 555 3377",
    items: 4,
    quantity: 20,
    subtotal: 840000,
    discount: 0,
    tax: 0,
    shipping: 5000,
    total: 845000,
    paid: 400000,
    balance: 445000,
    payment: "Partial",
    status: "Received",
    createdBy: "Manager",
    warehouse: "Main Store",
  },
  {
    id: "PO-2026-00120",
    date: "Aug 24, 2026",
    supplier: "Apple Distributor",
    supplierPhone: "0808 222 4466",
    items: 3,
    quantity: 10,
    subtotal: 7500000,
    discount: 0,
    tax: 0,
    shipping: 20000,
    total: 7520000,
    paid: 0,
    balance: 7520000,
    payment: "Unpaid",
    status: "Pending",
    createdBy: "Admin",
    warehouse: "Main Store",
  },
  {
    id: "PO-2026-00119",
    date: "Aug 23, 2026",
    supplier: "Kingston Distributor",
    supplierPhone: "0809 777 5511",
    items: 7,
    quantity: 35,
    subtotal: 1575000,
    discount: 25000,
    tax: 0,
    shipping: 7000,
    total: 1557000,
    paid: 1557000,
    balance: 0,
    payment: "Paid",
    status: "Received",
    createdBy: "Admin",
    warehouse: "Warehouse",
  },
  {
    id: "PO-2026-00118",
    date: "Aug 22, 2026",
    supplier: "Tech Accessories Ltd",
    supplierPhone: "0810 888 6644",
    items: 15,
    quantity: 100,
    subtotal: 450000,
    discount: 10000,
    tax: 0,
    shipping: 3000,
    total: 443000,
    paid: 443000,
    balance: 0,
    payment: "Paid",
    status: "Received",
    createdBy: "Manager",
    warehouse: "Main Store",
  },
  {
    id: "PO-2026-00117",
    date: "Aug 21, 2026",
    supplier: "Samsung Distributor",
    supplierPhone: "0802 333 1199",
    items: 9,
    quantity: 22,
    subtotal: 4200000,
    discount: 50000,
    tax: 0,
    shipping: 12000,
    total: 4162000,
    paid: 4162000,
    balance: 0,
    payment: "Paid",
    status: "Received",
    createdBy: "Admin",
    warehouse: "Main Store",
  },
  {
    id: "PO-2026-00116",
    date: "Aug 20, 2026",
    supplier: "HP Distributor",
    supplierPhone: "0806 444 2288",
    items: 6,
    quantity: 12,
    subtotal: 2400000,
    discount: 0,
    tax: 0,
    shipping: 8000,
    total: 2408000,
    paid: 0,
    balance: 2408000,
    payment: "Unpaid",
    status: "Cancelled",
    createdBy: "Manager",
    warehouse: "Warehouse",
  },
];


export default function AllPurchases() {

  const [purchases, setPurchases] =
    useState(initialPurchases);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("All");

  const [warehouseFilter, setWarehouseFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedPurchase, setSelectedPurchase] =
    useState(null);

  const [showMenu, setShowMenu] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(null);

  const itemsPerPage = 8;


  /* =========================================
     MONEY
  ========================================= */

  const money = (value) =>
    `₦${value.toLocaleString()}`;


  /* =========================================
     FILTER
  ========================================= */

  const filteredPurchases = useMemo(() => {

    return purchases.filter((purchase) => {

      const query =
        search.toLowerCase().trim();

      const searchMatch =
        purchase.id
          .toLowerCase()
          .includes(query) ||
        purchase.supplier
          .toLowerCase()
          .includes(query) ||
        purchase.createdBy
          .toLowerCase()
          .includes(query);

      const statusMatch =
        statusFilter === "All" ||
        purchase.status === statusFilter;

      const paymentMatch =
        paymentFilter === "All" ||
        purchase.payment === paymentFilter;

      const warehouseMatch =
        warehouseFilter === "All" ||
        purchase.warehouse === warehouseFilter;

      let dateMatch = true;

      if (dateFilter === "Today") {
        dateMatch =
          purchase.date === "Aug 28, 2026";
      }

      if (dateFilter === "Yesterday") {
        dateMatch =
          purchase.date === "Aug 27, 2026";
      }

      return (
        searchMatch &&
        statusMatch &&
        paymentMatch &&
        warehouseMatch &&
        dateMatch
      );
    });

  }, [
    purchases,
    search,
    statusFilter,
    paymentFilter,
    warehouseFilter,
    dateFilter,
  ]);


  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPurchases.length /
        itemsPerPage
    )
  );

  const paginatedPurchases =
    filteredPurchases.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );


  /* =========================================
     STATISTICS
  ========================================= */

  const totalPurchases =
    purchases.length;

  const receivedPurchases =
    purchases.filter(
      (purchase) =>
        purchase.status === "Received"
    ).length;

  const pendingPurchases =
    purchases.filter(
      (purchase) =>
        purchase.status === "Pending"
    ).length;

  const totalPurchaseValue =
    purchases
      .filter(
        (purchase) =>
          purchase.status !== "Cancelled"
      )
      .reduce(
        (total, purchase) =>
          total + purchase.total,
        0
      );

  const totalOutstanding =
    purchases.reduce(
      (total, purchase) =>
        total + purchase.balance,
      0
    );


  /* =========================================
     DELETE
  ========================================= */

  const deletePurchase = () => {

    setPurchases((current) =>
      current.filter(
        (purchase) =>
          purchase.id !==
          showDeleteModal
      )
    );

    setShowDeleteModal(null);

  };


  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const clearFilters = () => {

    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setDateFilter("All");
    setWarehouseFilter("All");
    setCurrentPage(1);

  };


  /* =========================================
     EXPORT
  ========================================= */

  const exportPurchases = () => {

    const headers = [
      "Purchase ID",
      "Date",
      "Supplier",
      "Items",
      "Quantity",
      "Subtotal",
      "Discount",
      "Shipping",
      "Total",
      "Paid",
      "Balance",
      "Payment",
      "Status",
      "Created By",
      "Warehouse",
    ];

    const rows =
      filteredPurchases.map(
        (purchase) => [
          purchase.id,
          purchase.date,
          purchase.supplier,
          purchase.items,
          purchase.quantity,
          purchase.subtotal,
          purchase.discount,
          purchase.shipping,
          purchase.total,
          purchase.paid,
          purchase.balance,
          purchase.payment,
          purchase.status,
          purchase.createdBy,
          purchase.warehouse,
        ]
      );

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
      "purchases.csv";

    link.click();

    URL.revokeObjectURL(url);

  };


  return (

    <div className="purchases-page content-wrapper">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="purchases-header">

        <div>

          <div className="purchases-breadcrumb">
            <span>Purchases</span>
            <span>/</span>
            <strong>All Purchases</strong>
          </div>


          <div className="purchases-title">

            <div className="purchases-title-icon">
              <ShoppingCart size={20} />
            </div>

            <div>

              <h1>
                All Purchases
              </h1>

              <p>
                Manage purchase orders and
                inventory purchases.
              </p>

            </div>

          </div>

        </div>


        <div className="purchases-header-actions">

          <button
            className="purchase-refresh"
            onClick={() =>
              setPurchases([
                ...initialPurchases,
              ])
            }
          >
            <RefreshCw size={14} />
            Refresh
          </button>


          <button
            className="purchase-export"
            onClick={exportPurchases}
          >
            <Download size={14} />
            Export
          </button>


          <button
            className="purchase-add"
            onClick={() =>
              alert("Open New Purchase page")
            }
          >
            <Plus size={15} />
            New Purchase
          </button>

        </div>

      </div>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="purchase-stats">


        <div className="purchase-stat">

          <div className="purchase-stat-icon blue">
            <ShoppingCart size={18} />
          </div>

          <div>

            <span>
              Total Purchases
            </span>

            <strong>
              {totalPurchases}
            </strong>

            <small>
              All purchase records
            </small>

          </div>

        </div>


        <div className="purchase-stat">

          <div className="purchase-stat-icon green">
            <CheckCircle2 size={18} />
          </div>

          <div>

            <span>
              Received
            </span>

            <strong>
              {receivedPurchases}
            </strong>

            <small>
              Completed purchases
            </small>

          </div>

        </div>


        <div className="purchase-stat">

          <div className="purchase-stat-icon orange">
            <Clock3 size={18} />
          </div>

          <div>

            <span>
              Pending
            </span>

            <strong>
              {pendingPurchases}
            </strong>

            <small>
              Awaiting delivery
            </small>

          </div>

        </div>


        <div className="purchase-stat">

          <div className="purchase-stat-icon purple">
            <DollarSign size={18} />
          </div>

          <div>

            <span>
              Purchase Value
            </span>

            <strong>
              {money(totalPurchaseValue)}
            </strong>

            <small>
              Total received value
            </small>

          </div>

        </div>


        <div className="purchase-stat">

          <div className="purchase-stat-icon red">
            <CreditCard size={18} />
          </div>

          <div>

            <span>
              Outstanding
            </span>

            <strong>
              {money(totalOutstanding)}
            </strong>

            <small>
              Supplier balance
            </small>

          </div>

        </div>

      </div>


      {/* =====================================
          FILTERS
      ===================================== */}

      <div className="purchase-filter-card">


        <div className="purchase-search">

          <Search size={15} />

          <input
            value={search}
            placeholder="Search purchase ID, supplier..."
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


        <div className="purchase-filter-select">

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


        <div className="purchase-filter-select">

          <Package size={13} />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >

            <option value="All">
              All Status
            </option>

            <option value="Received">
              Received
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

          <ChevronDown size={12} />

        </div>


        <div className="purchase-filter-select">

          <CreditCard size={13} />

          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >

            <option value="All">
              All Payments
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Partial">
              Partial
            </option>

            <option value="Unpaid">
              Unpaid
            </option>

          </select>

          <ChevronDown size={12} />

        </div>


        <div className="purchase-filter-select">

          <Truck size={13} />

          <select
            value={warehouseFilter}
            onChange={(e) => {
              setWarehouseFilter(
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
          className="purchase-clear"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>


      {/* =====================================
          TABLE
      ===================================== */}

      <div className="purchase-table-card">


        <div className="purchase-table-header">

          <div>

            <h2>
              Purchase Records
            </h2>

            <p>
              View and manage all purchase
              transactions.
            </p>

          </div>


          <div className="purchase-count">
            {filteredPurchases.length} purchases
          </div>

        </div>


        <div className="purchase-table-wrapper">

          <table className="purchase-table">

            <thead>

              <tr>

                <th>PURCHASE</th>

                <th>DATE</th>

                <th>SUPPLIER</th>

                <th>ITEMS</th>

                <th>TOTAL</th>

                <th>PAYMENT</th>

                <th>STATUS</th>

                <th>LOCATION</th>

                <th>ACTION</th>

              </tr>

            </thead>


            <tbody>

              {paginatedPurchases.map(
                (purchase) => (

                  <tr
                    key={purchase.id}
                  >


                    {/* PURCHASE */}

                    <td>

                      <div className="purchase-id">

                        <div className="purchase-id-icon">
                          <FileText size={14} />
                        </div>

                        <div>

                          <strong>
                            {purchase.id}
                          </strong>

                          <span>
                            By {purchase.createdBy}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* DATE */}

                    <td>

                      <div className="purchase-date">

                        <strong>
                          {purchase.date}
                        </strong>

                        <span>
                          Purchase date
                        </span>

                      </div>

                    </td>


                    {/* SUPPLIER */}

                    <td>

                      <div className="purchase-supplier">

                        <strong>
                          {purchase.supplier}
                        </strong>

                        <span>
                          {purchase.supplierPhone}
                        </span>

                      </div>

                    </td>


                    {/* ITEMS */}

                    <td>

                      <div className="purchase-items">

                        <strong>
                          {purchase.items}
                        </strong>

                        <span>
                          {purchase.quantity} units
                        </span>

                      </div>

                    </td>


                    {/* TOTAL */}

                    <td>

                      <div className="purchase-total">

                        <strong>
                          {money(
                            purchase.total
                          )}
                        </strong>

                        {purchase.balance >
                          0 && (

                          <span>
                            Due{" "}
                            {money(
                              purchase.balance
                            )}
                          </span>

                        )}

                      </div>

                    </td>


                    {/* PAYMENT */}

                    <td>

                      <span
                        className={`payment-badge ${purchase.payment.toLowerCase()}`}
                      >

                        {purchase.payment ===
                          "Paid" && (
                          <CheckCircle2
                            size={11}
                          />
                        )}

                        {purchase.payment ===
                          "Partial" && (
                          <Clock3
                            size={11}
                          />
                        )}

                        {purchase.payment ===
                          "Unpaid" && (
                          <XCircle
                            size={11}
                          />
                        )}

                        {purchase.payment}

                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`purchase-status ${purchase.status.toLowerCase()}`}
                      >

                        {purchase.status ===
                          "Received" && (
                          <CheckCircle2
                            size={11}
                          />
                        )}

                        {purchase.status ===
                          "Pending" && (
                          <Clock3
                            size={11}
                          />
                        )}

                        {purchase.status ===
                          "Cancelled" && (
                          <XCircle
                            size={11}
                          />
                        )}

                        {purchase.status}

                      </span>

                    </td>


                    {/* LOCATION */}

                    <td>

                      <div className="purchase-location">

                        <Truck size={12} />

                        {purchase.warehouse}

                      </div>

                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="purchase-actions">

                        <button
                          title="View"
                          onClick={() =>
                            setSelectedPurchase(
                              purchase
                            )
                          }
                        >
                          <Eye size={14} />
                        </button>


                        <button
                          title="Edit"
                          onClick={() =>
                            alert(
                              `Edit ${purchase.id}`
                            )
                          }
                        >
                          <Edit3 size={13} />
                        </button>


                        <button
                          title="More"
                          onClick={() =>
                            setShowMenu(
                              showMenu ===
                                purchase.id
                                ? null
                                : purchase.id
                            )
                          }
                        >
                          <MoreHorizontal
                            size={14}
                          />
                        </button>


                        {showMenu ===
                          purchase.id && (

                          <div className="purchase-action-menu">

                            <button
                              onClick={() => {
                                setSelectedPurchase(
                                  purchase
                                );
                                setShowMenu(null);
                              }}
                            >
                              <Eye size={13} />
                              View Details
                            </button>

                            <button
                              onClick={() => {
                                alert(
                                  `Print ${purchase.id}`
                                );
                                setShowMenu(null);
                              }}
                            >
                              <FileText size={13} />
                              Print Purchase
                            </button>

                            <button
                              className="danger"
                              onClick={() => {
                                setShowDeleteModal(
                                  purchase.id
                                );
                                setShowMenu(null);
                              }}
                            >
                              <Trash2 size={13} />
                              Delete
                            </button>

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}


              {paginatedPurchases.length ===
                0 && (

                <tr>

                  <td
                    colSpan="9"
                    className="purchase-empty"
                  >

                    <ShoppingCart size={30} />

                    <strong>
                      No purchases found
                    </strong>

                    <span>
                      Try changing your search
                      or filters.
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

        <div className="purchase-pagination">

          <span>
            Showing{" "}
            {paginatedPurchases.length} of{" "}
            {filteredPurchases.length} purchases
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
                length: totalPages,
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
                totalPages
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
          PURCHASE DETAILS MODAL
      ===================================== */}

      {selectedPurchase && (

        <div
          className="purchase-modal-overlay"
          onClick={() =>
            setSelectedPurchase(null)
          }
        >

          <div
            className="purchase-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="purchase-modal-header">

              <div>

                <div className="purchase-modal-icon">
                  <FileText size={17} />
                </div>

                <div>

                  <h2>
                    Purchase Details
                  </h2>

                  <span>
                    {selectedPurchase.id}
                  </span>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedPurchase(null)
                }
              >
                <X size={16} />
              </button>

            </div>


            <div className="purchase-modal-content">


              {/* SUPPLIER */}

              <div className="purchase-detail-section">

                <div className="purchase-detail-heading">

                  <Truck size={14} />

                  Supplier

                </div>


                <div className="supplier-detail-box">

                  <div>

                    <strong>
                      {selectedPurchase.supplier}
                    </strong>

                    <span>
                      {selectedPurchase.supplierPhone}
                    </span>

                  </div>

                  <span>
                    {selectedPurchase.warehouse}
                  </span>

                </div>

              </div>


              {/* SUMMARY */}

              <div className="purchase-detail-section">

                <div className="purchase-detail-heading">

                  <Package size={14} />

                  Purchase Summary

                </div>


                <div className="purchase-summary-grid">

                  <div>
                    <span>
                      Items
                    </span>

                    <strong>
                      {selectedPurchase.items}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Quantity
                    </span>

                    <strong>
                      {selectedPurchase.quantity}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {money(
                        selectedPurchase.subtotal
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Discount
                    </span>

                    <strong>
                      {money(
                        selectedPurchase.discount
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Shipping
                    </span>

                    <strong>
                      {money(
                        selectedPurchase.shipping
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Total
                    </span>

                    <strong className="modal-total">
                      {money(
                        selectedPurchase.total
                      )}
                    </strong>
                  </div>

                </div>

              </div>


              {/* PAYMENT */}

              <div className="purchase-detail-section">

                <div className="purchase-detail-heading">

                  <CreditCard size={14} />

                  Payment

                </div>


                <div className="payment-summary">

                  <div>

                    <span>
                      Paid
                    </span>

                    <strong className="paid-value">
                      {money(
                        selectedPurchase.paid
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Balance
                    </span>

                    <strong className="balance-value">
                      {money(
                        selectedPurchase.balance
                      )}
                    </strong>

                  </div>


                  <span
                    className={`payment-badge ${selectedPurchase.payment.toLowerCase()}`}
                  >
                    {selectedPurchase.payment}
                  </span>

                </div>

              </div>


              {/* META */}

              <div className="purchase-meta-grid">

                <div>

                  <span>
                    Purchase Date
                  </span>

                  <strong>
                    {selectedPurchase.date}
                  </strong>

                </div>

                <div>

                  <span>
                    Created By
                  </span>

                  <strong>
                    {selectedPurchase.createdBy}
                  </strong>

                </div>

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {selectedPurchase.warehouse}
                  </strong>

                </div>

                <div>

                  <span>
                    Status
                  </span>

                  <strong>
                    {selectedPurchase.status}
                  </strong>

                </div>

              </div>

            </div>


            <div className="purchase-modal-footer">

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedPurchase(null)
                }
              >
                Close
              </button>

              <button
                className="modal-print-btn"
                onClick={() =>
                  alert(
                    `Printing ${selectedPurchase.id}`
                  )
                }
              >
                <FileText size={13} />
                Print Purchase
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          DELETE MODAL
      ===================================== */}

      {showDeleteModal && (

        <div
          className="purchase-modal-overlay"
          onClick={() =>
            setShowDeleteModal(null)
          }
        >

          <div
            className="purchase-delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="delete-icon">
              <Trash2 size={18} />
            </div>

            <h2>
              Delete Purchase?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {showDeleteModal}
              </strong>
              ? This action cannot be undone.
            </p>


            <div className="delete-actions">

              <button
                onClick={() =>
                  setShowDeleteModal(null)
                }
              >
                Cancel
              </button>

              <button
                className="delete-confirm"
                onClick={deletePurchase}
              >
                <Trash2 size={13} />
                Delete Purchase
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

