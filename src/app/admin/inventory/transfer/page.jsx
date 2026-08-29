
"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eye,
  History,
  Package,
  Search,
  Truck,
  User,
  X,
  XCircle,
} from "lucide-react";

import "./stock-transfer.css";

const locations = [
  {
    id: 1,
    name: "Main Store",
    type: "Store",
  },
  {
    id: 2,
    name: "Central Warehouse",
    type: "Warehouse",
  },
  {
    id: 3,
    name: "Branch - Owerri",
    type: "Branch",
  },
  {
    id: 4,
    name: "Branch - Port Harcourt",
    type: "Branch",
  },
];

const products = [
  {
    id: 1,
    name: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    category: "Mobile Phones",
    stock: {
      1: 24,
      2: 70,
      3: 12,
      4: 5,
    },
  },
  {
    id: 2,
    name: "iPhone 15 128GB",
    sku: "IPH-15-128",
    category: "Mobile Phones",
    stock: {
      1: 8,
      2: 35,
      3: 6,
      4: 3,
    },
  },
  {
    id: 3,
    name: "Oraimo Power Bank 20000mAh",
    sku: "ORA-PB-20K",
    category: "Accessories",
    stock: {
      1: 47,
      2: 120,
      3: 20,
      4: 15,
    },
  },
  {
    id: 4,
    name: "HP 15 Core i5 Laptop",
    sku: "HP-15-I5-16",
    category: "Laptops",
    stock: {
      1: 3,
      2: 18,
      3: 4,
      4: 2,
    },
  },
  {
    id: 5,
    name: "Logitech M185 Wireless Mouse",
    sku: "LOG-M185",
    category: "Computer Accessories",
    stock: {
      1: 12,
      2: 60,
      3: 8,
      4: 7,
    },
  },
  {
    id: 6,
    name: "JBL Flip 6 Speaker",
    sku: "JBL-FLIP6",
    category: "Audio",
    stock: {
      1: 16,
      2: 42,
      3: 10,
      4: 4,
    },
  },
];

const initialTransfers = [
  {
    id: 1,
    reference: "TRF-20260828-001",
    product: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    quantity: 10,
    from: "Central Warehouse",
    to: "Main Store",
    status: "Completed",
    user: "Admin",
    date: "Aug 28, 2026 09:42 AM",
  },
  {
    id: 2,
    reference: "TRF-20260828-002",
    product: "iPhone 15 128GB",
    sku: "IPH-15-128",
    quantity: 5,
    from: "Central Warehouse",
    to: "Branch - Owerri",
    status: "Pending",
    user: "John Doe",
    date: "Aug 28, 2026 08:16 AM",
  },
  {
    id: 3,
    reference: "TRF-20260827-003",
    product: "JBL Flip 6 Speaker",
    sku: "JBL-FLIP6",
    quantity: 8,
    from: "Main Store",
    to: "Branch - Port Harcourt",
    status: "Completed",
    user: "Admin",
    date: "Aug 27, 2026 04:35 PM",
  },
  {
    id: 4,
    reference: "TRF-20260827-004",
    product: "HP 15 Core i5 Laptop",
    sku: "HP-15-I5-16",
    quantity: 2,
    from: "Central Warehouse",
    to: "Main Store",
    status: "Cancelled",
    user: "Admin",
    date: "Aug 27, 2026 11:20 AM",
  },
];

export default function StockTransfer() {
  const [transferList, setTransferList] =
    useState(initialTransfers);

  const [selectedProductId, setSelectedProductId] =
    useState("");

  const [sourceLocation, setSourceLocation] =
    useState("");

  const [destinationLocation, setDestinationLocation] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showDetails, setShowDetails] =
    useState(null);

  const selectedProduct = products.find(
    (product) =>
      product.id === Number(selectedProductId)
  );

  const availableStock =
    selectedProduct && sourceLocation
      ? selectedProduct.stock[
          Number(sourceLocation)
        ] || 0
      : 0;

  const transferQuantity =
    Number(quantity) || 0;

  const filteredProducts = useMemo(() => {
    const search =
      productSearch
        .toLowerCase()
        .trim();

    if (!search) return products;

    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(search) ||
        product.sku
          .toLowerCase()
          .includes(search)
    );
  }, [productSearch]);

  const filteredTransfers = useMemo(() => {
    if (statusFilter === "All") {
      return transferList;
    }

    return transferList.filter(
      (transfer) =>
        transfer.status === statusFilter
    );
  }, [transferList, statusFilter]);

  const destinationStock =
    selectedProduct && destinationLocation
      ? selectedProduct.stock[
          Number(destinationLocation)
        ] || 0
      : 0;

  /*
   * CREATE TRANSFER
   */

  const handleTransfer = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    if (!sourceLocation) {
      alert("Please select the source location.");
      return;
    }

    if (!destinationLocation) {
      alert(
        "Please select the destination location."
      );
      return;
    }

    if (
      sourceLocation === destinationLocation
    ) {
      alert(
        "Source and destination locations cannot be the same."
      );
      return;
    }

    if (
      !quantity ||
      Number(quantity) <= 0
    ) {
      alert(
        "Please enter a valid transfer quantity."
      );
      return;
    }

    if (
      Number(quantity) > availableStock
    ) {
      alert(
        `Only ${availableStock} units are available at the source location.`
      );
      return;
    }

    const reference =
      `TRF-${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${String(
        transferList.length + 1
      ).padStart(3, "0")}`;

    const newTransfer = {
      id: Date.now(),
      reference,
      product: selectedProduct.name,
      sku: selectedProduct.sku,
      quantity: Number(quantity),
      from: locations.find(
        (location) =>
          location.id ===
          Number(sourceLocation)
      )?.name,
      to: locations.find(
        (location) =>
          location.id ===
          Number(destinationLocation)
      )?.name,
      status: "Pending",
      user: "Admin",
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };

    setTransferList([
      newTransfer,
      ...transferList,
    ]);

    setSuccessMessage(
      `Transfer ${reference} created successfully.`
    );

    resetForm();

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  /*
   * RESET FORM
   */

  const resetForm = () => {
    setSelectedProductId("");
    setSourceLocation("");
    setDestinationLocation("");
    setQuantity("");
    setProductSearch("");
    setNotes("");
  };

  /*
   * COMPLETE TRANSFER
   */

  const completeTransfer = (id) => {
    setTransferList(
      transferList.map((transfer) =>
        transfer.id === id
          ? {
              ...transfer,
              status: "Completed",
            }
          : transfer
      )
    );

    setSuccessMessage(
      "Stock transfer marked as completed."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  /*
   * CANCEL TRANSFER
   */

  const cancelTransfer = (id) => {
    setTransferList(
      transferList.map((transfer) =>
        transfer.id === id
          ? {
              ...transfer,
              status: "Cancelled",
            }
          : transfer
      )
    );

    setSuccessMessage(
      "Stock transfer cancelled."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <div className="transfer-page  content-wrapper">

      {/* ====================================
          HEADER
      ==================================== */}

      <div className="transfer-header">

        <div>

          <div className="transfer-breadcrumb">

            <span>Inventory</span>

            <span>/</span>

            <strong>Stock Transfer</strong>

          </div>

          <h1>Stock Transfer</h1>

          <p>
            Move inventory between your stores,
            branches, and warehouses.
          </p>

        </div>

        <div className="transfer-header-user">

          <div className="transfer-user-avatar">
            <User size={16} />
          </div>

          <div>

            <strong>Admin</strong>

            <span>
              Inventory Manager
            </span>

          </div>

        </div>

      </div>


      {/* ====================================
          SUCCESS MESSAGE
      ==================================== */}

      {successMessage && (

        <div className="transfer-success">

          <CheckCircle2 size={18} />

          <span>
            {successMessage}
          </span>

          <button
            onClick={() =>
              setSuccessMessage("")
            }
          >
            <X size={15} />
          </button>

        </div>

      )}


      {/* ====================================
          MAIN CONTENT
      ==================================== */}

      <div className="transfer-main-grid">

        {/* ==================================
            CREATE TRANSFER
        ================================== */}

        <div className="transfer-form-card">

          <div className="transfer-card-header">

            <div className="transfer-card-icon">
              <ArrowRightLeft size={19} />
            </div>

            <div>

              <h2>
                Create Stock Transfer
              </h2>

              <p>
                Transfer products between
                locations.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleTransfer}
            className="transfer-form"
          >

            {/* PRODUCT */}

            <div className="transfer-field">

              <label>
                Product
                <span>*</span>
              </label>

              <div className="transfer-product-search">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search product by name or SKU..."
                  value={productSearch}
                  onChange={(e) =>
                    setProductSearch(
                      e.target.value
                    )
                  }
                />

              </div>

              <select
                value={selectedProductId}
                onChange={(e) =>
                  setSelectedProductId(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select product
                </option>

                {filteredProducts.map(
                  (product) => (

                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name} —{" "}
                      {product.sku}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* PRODUCT INFO */}

            {selectedProduct && (

              <div className="transfer-product-info">

                <div className="transfer-product-left">

                  <div className="transfer-product-icon">
                    <Package size={20} />
                  </div>

                  <div>

                    <strong>
                      {selectedProduct.name}
                    </strong>

                    <span>
                      SKU:{" "}
                      {selectedProduct.sku}
                    </span>

                    <small>
                      {selectedProduct.category}
                    </small>

                  </div>

                </div>

                <div className="transfer-available">

                  <span>
                    Available
                  </span>

                  <strong>
                    {sourceLocation
                      ? availableStock
                      : "--"}
                  </strong>

                  <small>
                    units
                  </small>

                </div>

              </div>

            )}


            {/* LOCATIONS */}

            <div className="transfer-locations">

              <div className="transfer-field">

                <label>
                  From
                  <span>*</span>
                </label>

                <div className="location-select">

                  <Building2 size={15} />

                  <select
                    value={sourceLocation}
                    onChange={(e) =>
                      setSourceLocation(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Source location
                    </option>

                    {locations.map(
                      (location) => (

                        <option
                          key={location.id}
                          value={location.id}
                          disabled={
                            String(
                              location.id
                            ) ===
                            String(
                              destinationLocation
                            )
                          }
                        >
                          {location.name}
                        </option>

                      )
                    )}

                  </select>

                </div>

              </div>


              <div className="transfer-location-arrow">

                <ArrowRight size={17} />

              </div>


              <div className="transfer-field">

                <label>
                  To
                  <span>*</span>
                </label>

                <div className="location-select">

                  <Building2 size={15} />

                  <select
                    value={destinationLocation}
                    onChange={(e) =>
                      setDestinationLocation(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Destination location
                    </option>

                    {locations.map(
                      (location) => (

                        <option
                          key={location.id}
                          value={location.id}
                          disabled={
                            String(
                              location.id
                            ) ===
                            String(
                              sourceLocation
                            )
                          }
                        >
                          {location.name}
                        </option>

                      )
                    )}

                  </select>

                </div>

              </div>

            </div>


            {/* STOCK PREVIEW */}

            {selectedProduct &&
              sourceLocation &&
              destinationLocation && (

                <div className="location-stock-preview">

                  <div>

                    <span>
                      {locations.find(
                        (l) =>
                          l.id ===
                          Number(
                            sourceLocation
                          )
                      )?.name}
                    </span>

                    <strong>
                      {availableStock}
                    </strong>

                    <small>
                      Current stock
                    </small>

                  </div>

                  <div className="preview-transfer-arrow">

                    <Truck size={18} />

                    <ArrowRight size={15} />

                  </div>

                  <div>

                    <span>
                      {locations.find(
                        (l) =>
                          l.id ===
                          Number(
                            destinationLocation
                          )
                      )?.name}
                    </span>

                    <strong>
                      {destinationStock}
                    </strong>

                    <small>
                      Current stock
                    </small>

                  </div>

                </div>

              )}


            {/* QUANTITY */}

            <div className="transfer-field">

              <label>
                Transfer Quantity
                <span>*</span>
              </label>

              <div className="transfer-quantity">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        0,
                        transferQuantity - 1
                      )
                    )
                  }
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  max={availableStock}
                  placeholder="0"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.min(
                        availableStock,
                        transferQuantity + 1
                      )
                    )
                  }
                >
                  +
                </button>

              </div>

              {sourceLocation &&
                selectedProduct && (

                  <div className="quantity-help">

                    Maximum available:
                    <strong>
                      {availableStock}
                    </strong>

                  </div>

                )}

            </div>


            {/* TRANSFER RESULT */}

            {selectedProduct &&
              sourceLocation &&
              destinationLocation &&
              quantity && (

                <div className="transfer-result">

                  <div>

                    <span>
                      Source after transfer
                    </span>

                    <strong>
                      {Math.max(
                        0,
                        availableStock -
                          transferQuantity
                      )}
                    </strong>

                  </div>

                  <div className="transfer-result-arrow">
                    <ArrowRight size={17} />
                  </div>

                  <div>

                    <span>
                      Destination after transfer
                    </span>

                    <strong>
                      {destinationStock +
                        transferQuantity}
                    </strong>

                  </div>

                </div>

              )}


            {/* NOTES */}

            <div className="transfer-field">

              <label>
                Transfer Notes
                <small>
                  Optional
                </small>
              </label>

              <textarea
                rows="4"
                placeholder="Add notes about this transfer..."
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
              />

            </div>


            {/* ACTIONS */}

            <div className="transfer-actions">

              <button
                type="button"
                className="transfer-cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="transfer-submit-btn"
              >
                <ArrowRightLeft size={16} />
                Create Transfer
              </button>

            </div>

          </form>

        </div>


        {/* ==================================
            RIGHT SUMMARY
        ================================== */}

        <div className="transfer-sidebar">

          {/* SUMMARY */}

          <div className="transfer-summary-card">

            <div className="transfer-summary-header">

              <div>

                <h3>
                  Transfer Summary
                </h3>

                <p>
                  Review before creating.
                </p>

              </div>

              <ArrowRightLeft size={17} />

            </div>


            <div className="summary-line">

              <span>
                Product
              </span>

              <strong>
                {selectedProduct
                  ? selectedProduct.name
                  : "—"}
              </strong>

            </div>


            <div className="summary-line">

              <span>
                From
              </span>

              <strong>
                {sourceLocation
                  ? locations.find(
                      (l) =>
                        l.id ===
                        Number(
                          sourceLocation
                        )
                    )?.name
                  : "—"}
              </strong>

            </div>


            <div className="summary-line">

              <span>
                To
              </span>

              <strong>
                {destinationLocation
                  ? locations.find(
                      (l) =>
                        l.id ===
                        Number(
                          destinationLocation
                        )
                    )?.name
                  : "—"}
              </strong>

            </div>


            <div className="summary-line">

              <span>
                Quantity
              </span>

              <strong>
                {quantity || "0"}
              </strong>

            </div>


            <div className="summary-divider" />


            <div className="summary-total">

              <span>
                Transfer Status
              </span>

              <div className="pending-badge">
                <span />
                Pending
              </div>

            </div>

          </div>


          {/* QUICK STATS */}

          <div className="transfer-stats-card">

            <h3>
              Transfer Overview
            </h3>

            <div className="transfer-stat">

              <div className="stat-icon pending">
                <ClipboardList size={16} />
              </div>

              <div>

                <span>
                  Pending Transfers
                </span>

                <strong>
                  {
                    transferList.filter(
                      (item) =>
                        item.status ===
                        "Pending"
                    ).length
                  }
                </strong>

              </div>

            </div>


            <div className="transfer-stat">

              <div className="stat-icon completed">
                <CheckCircle2 size={16} />
              </div>

              <div>

                <span>
                  Completed
                </span>

                <strong>
                  {
                    transferList.filter(
                      (item) =>
                        item.status ===
                        "Completed"
                    ).length
                  }
                </strong>

              </div>

            </div>


            <div className="transfer-stat">

              <div className="stat-icon cancelled">
                <XCircle size={16} />
              </div>

              <div>

                <span>
                  Cancelled
                </span>

                <strong>
                  {
                    transferList.filter(
                      (item) =>
                        item.status ===
                        "Cancelled"
                    ).length
                  }
                </strong>

              </div>

            </div>

          </div>


          {/* DATE */}

          <div className="transfer-date-card">

            <CalendarDays size={17} />

            <div>

              <span>
                Today's Date
              </span>

              <strong>
                {new Date().toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* ====================================
          TRANSFER HISTORY
      ==================================== */}

      <div className="transfer-history-card">

        <div className="transfer-history-header">

          <div className="transfer-history-title">

            <div className="history-icon">
              <History size={17} />
            </div>

            <div>

              <h2>
                Transfer History
              </h2>

              <p>
                View and manage inventory
                transfers.
              </p>

            </div>

          </div>


          <div className="history-filter">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Transfers
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

            <ChevronDown size={13} />

          </div>

        </div>


        <div className="transfer-table-wrapper">

          <table className="transfer-table">

            <thead>

              <tr>

                <th>REFERENCE</th>

                <th>PRODUCT</th>

                <th>QUANTITY</th>

                <th>FROM</th>

                <th>TO</th>

                <th>STATUS</th>

                <th>USER</th>

                <th>DATE</th>

                <th>ACTION</th>

              </tr>

            </thead>

            <tbody>

              {filteredTransfers.map(
                (transfer) => (

                  <tr key={transfer.id}>

                    <td>

                      <span className="transfer-reference">
                        {transfer.reference}
                      </span>

                    </td>


                    <td>

                      <div className="table-product">

                        <div className="table-product-icon">
                          <Package size={15} />
                        </div>

                        <div>

                          <strong>
                            {transfer.product}
                          </strong>

                          <span>
                            {transfer.sku}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>

                      <strong className="table-quantity">
                        {transfer.quantity}
                      </strong>

                    </td>


                    <td>

                      <div className="location-cell">

                        <Building2 size={13} />

                        <span>
                          {transfer.from}
                        </span>

                      </div>

                    </td>


                    <td>

                      <div className="location-cell">

                        <ArrowRight size={12} />

                        <span>
                          {transfer.to}
                        </span>

                      </div>

                    </td>


                    <td>

                      <span
                        className={`transfer-status ${transfer.status.toLowerCase()}`}
                      >

                        {transfer.status ===
                        "Completed" && (
                          <Check size={11} />
                        )}

                        {transfer.status ===
                        "Pending" && (
                          <ClipboardList
                            size={11}
                          />
                        )}

                        {transfer.status ===
                        "Cancelled" && (
                          <X size={11} />
                        )}

                        {transfer.status}

                      </span>

                    </td>


                    <td>

                      <div className="table-user">

                        <div className="table-user-icon">
                          <User size={11} />
                        </div>

                        <span>
                          {transfer.user}
                        </span>

                      </div>

                    </td>


                    <td>

                      <span className="table-date">
                        {transfer.date}
                      </span>

                    </td>


                    <td>

                      <div className="table-actions">

                        <button
                          title="View"
                          onClick={() =>
                            setShowDetails(
                              transfer
                            )
                          }
                        >
                          <Eye size={14} />
                        </button>


                        {transfer.status ===
                          "Pending" && (

                          <>

                            <button
                              title="Complete"
                              className="complete-action"
                              onClick={() =>
                                completeTransfer(
                                  transfer.id
                                )
                              }
                            >
                              <Check
                                size={14}
                              />
                            </button>

                            <button
                              title="Cancel"
                              className="cancel-action"
                              onClick={() =>
                                cancelTransfer(
                                  transfer.id
                                )
                              }
                            >
                              <X size={14} />
                            </button>

                          </>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}

              {filteredTransfers.length ===
                0 && (

                <tr>

                  <td
                    colSpan="9"
                    className="empty-transfer"
                  >

                    <ArrowRightLeft
                      size={25}
                    />

                    <span>
                      No transfers found.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}

        <div className="transfer-history-footer">

          <span>
            Showing{" "}
            {filteredTransfers.length}{" "}
            transfers
          </span>

          <div className="transfer-pagination">

            <button>
              <ChevronLeft size={14} />
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
              <ChevronRight size={14} />
            </button>

          </div>

        </div>

      </div>


      {/* ====================================
          DETAILS MODAL
      ==================================== */}

      {showDetails && (

        <div
          className="transfer-modal-overlay"
          onClick={() =>
            setShowDetails(null)
          }
        >

          <div
            className="transfer-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Transfer Details
                </h2>

                <span>
                  {showDetails.reference}
                </span>

              </div>

              <button
                onClick={() =>
                  setShowDetails(null)
                }
              >
                <X size={17} />
              </button>

            </div>


            <div className="modal-status-row">

              <span>
                Status
              </span>

              <span
                className={`transfer-status ${showDetails.status.toLowerCase()}`}
              >
                {showDetails.status}
              </span>

            </div>


            <div className="modal-product">

              <div className="modal-product-icon">
                <Package size={21} />
              </div>

              <div>

                <strong>
                  {showDetails.product}
                </strong>

                <span>
                  SKU: {showDetails.sku}
                </span>

              </div>

            </div>


            <div className="modal-route">

              <div>

                <small>
                  FROM
                </small>

                <strong>
                  {showDetails.from}
                </strong>

              </div>

              <ArrowRight size={18} />

              <div>

                <small>
                  TO
                </small>

                <strong>
                  {showDetails.to}
                </strong>

              </div>

            </div>


            <div className="modal-info-grid">

              <div>

                <span>
                  Quantity
                </span>

                <strong>
                  {showDetails.quantity}
                  {" units"}
                </strong>

              </div>

              <div>

                <span>
                  Created By
                </span>

                <strong>
                  {showDetails.user}
                </strong>

              </div>

              <div>

                <span>
                  Date
                </span>

                <strong>
                  {showDetails.date}
                </strong>

              </div>

              <div>

                <span>
                  Reference
                </span>

                <strong>
                  {showDetails.reference}
                </strong>

              </div>

            </div>


            <div className="modal-footer">

              <button
                onClick={() =>
                  setShowDetails(null)
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

