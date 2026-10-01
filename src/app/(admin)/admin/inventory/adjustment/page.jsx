
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Package,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ClipboardList,
  CalendarDays,
  User,
  CheckCircle2,
  X,
  History,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./stock-adjustment.css";

const products = [
  {
    id: 1,
    name: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    category: "Mobile Phones",
    stock: 24,
    unit: "Piece",
  },
  {
    id: 2,
    name: "iPhone 15 128GB",
    sku: "IPH-15-128",
    category: "Mobile Phones",
    stock: 8,
    unit: "Piece",
  },
  {
    id: 3,
    name: "Oraimo Power Bank 20000mAh",
    sku: "ORA-PB-20K",
    category: "Accessories",
    stock: 47,
    unit: "Piece",
  },
  {
    id: 4,
    name: "HP 15 Core i5 Laptop",
    sku: "HP-15-I5-16",
    category: "Laptops",
    stock: 3,
    unit: "Piece",
  },
  {
    id: 5,
    name: "Logitech M185 Wireless Mouse",
    sku: "LOG-M185",
    category: "Computer Accessories",
    stock: 0,
    unit: "Piece",
  },
  {
    id: 6,
    name: "JBL Flip 6 Speaker",
    sku: "JBL-FLIP6",
    category: "Audio",
    stock: 16,
    unit: "Piece",
  },
  {
    id: 7,
    name: "Anker 20W Fast Charger",
    sku: "ANK-20W-CH",
    category: "Chargers",
    stock: 5,
    unit: "Piece",
  },
  {
    id: 8,
    name: "Samsung Galaxy A55",
    sku: "SAM-A55-256",
    category: "Mobile Phones",
    stock: 19,
    unit: "Piece",
  },
];

const initialHistory = [
  {
    id: 1,
    product: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    type: "Added",
    quantity: 10,
    before: 14,
    after: 24,
    reason: "New Stock",
    user: "Admin",
    date: "Aug 28, 2026 09:42 AM",
  },
  {
    id: 2,
    product: "iPhone 15 128GB",
    sku: "IPH-15-128",
    type: "Removed",
    quantity: 2,
    before: 10,
    after: 8,
    reason: "Damaged",
    user: "John Doe",
    date: "Aug 28, 2026 08:16 AM",
  },
  {
    id: 3,
    product: "JBL Flip 6 Speaker",
    sku: "JBL-FLIP6",
    type: "Added",
    quantity: 5,
    before: 11,
    after: 16,
    reason: "New Stock",
    user: "Admin",
    date: "Aug 27, 2026 04:35 PM",
  },
  {
    id: 4,
    product: "Anker 20W Fast Charger",
    sku: "ANK-20W-CH",
    type: "Removed",
    quantity: 3,
    before: 8,
    after: 5,
    reason: "Stock Correction",
    user: "Admin",
    date: "Aug 27, 2026 11:20 AM",
  },
];

export default function StockAdjustment() {
  const [productList, setProductList] =
    useState(products);

  const [history, setHistory] =
    useState(initialHistory);

  const [selectedProductId, setSelectedProductId] =
    useState("");

  const [adjustmentType, setAdjustmentType] =
    useState("add");

  const [quantity, setQuantity] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const selectedProduct = productList.find(
    (product) =>
      product.id === Number(selectedProductId)
  );

  const filteredProducts = useMemo(() => {
    const value =
      productSearch.toLowerCase().trim();

    if (!value) return productList;

    return productList.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(value) ||
        product.sku
          .toLowerCase()
          .includes(value)
    );
  }, [productSearch, productList]);

  /*
   * Calculate what the stock will become
   */

  const adjustmentQuantity =
    Number(quantity) || 0;

  let newStock = selectedProduct
    ? selectedProduct.stock
    : 0;

  if (selectedProduct) {
    if (adjustmentType === "add") {
      newStock =
        selectedProduct.stock +
        adjustmentQuantity;
    }

    if (adjustmentType === "remove") {
      newStock = Math.max(
        0,
        selectedProduct.stock -
          adjustmentQuantity
      );
    }

    if (adjustmentType === "set") {
      newStock = adjustmentQuantity;
    }
  }

  const difference = selectedProduct
    ? newStock - selectedProduct.stock
    : 0;

  /*
   * Submit adjustment
   */

  const handleAdjustment = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    if (
      !quantity ||
      Number(quantity) < 0
    ) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!reason) {
      alert("Please select an adjustment reason.");
      return;
    }

    if (
      adjustmentType === "remove" &&
      Number(quantity) > selectedProduct.stock
    ) {
      alert(
        "You cannot remove more stock than is currently available."
      );
      return;
    }

    const beforeStock =
      selectedProduct.stock;

    const updatedProducts =
      productList.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              stock: newStock,
            }
          : product
      );

    setProductList(updatedProducts);

    const newHistoryItem = {
      id: Date.now(),
      product: selectedProduct.name,
      sku: selectedProduct.sku,
      type:
        adjustmentType === "add"
          ? "Added"
          : adjustmentType === "remove"
          ? "Removed"
          : "Adjusted",
      quantity: Number(quantity),
      before: beforeStock,
      after: newStock,
      reason,
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

    setHistory([
      newHistoryItem,
      ...history,
    ]);

    setSuccessMessage(
      `Stock successfully adjusted. ${selectedProduct.name} now has ${newStock} ${selectedProduct.unit}(s).`
    );

    setQuantity("");
    setReason("");
    setNotes("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const resetForm = () => {
    setSelectedProductId("");
    setAdjustmentType("add");
    setQuantity("");
    setReason("");
    setNotes("");
    setProductSearch("");
  };

  return (
    <div className="adjustment-page  content-wrapper">

      {/* =================================
          HEADER
      ================================= */}

      <div className="adjustment-header">

        <div>

          <div className="adjustment-breadcrumb">

            <span>Inventory</span>

            <span>/</span>

            <strong>Stock Adjustment</strong>

          </div>

          <h1>Stock Adjustment</h1>

          <p>
            Increase, decrease, or correct your
            inventory stock levels.
          </p>

        </div>

        <div className="adjustment-header-user">

          <div className="adjustment-user-icon">
            <User size={16} />
          </div>

          <div>
            <strong>Admin</strong>
            <span>Inventory Manager</span>
          </div>

        </div>

      </div>


      {/* =================================
          SUCCESS MESSAGE
      ================================= */}

      {successMessage && (

        <div className="adjustment-success">

          <CheckCircle2 size={19} />

          <span>
            {successMessage}
          </span>

          <button
            onClick={() =>
              setSuccessMessage("")
            }
          >
            <X size={16} />
          </button>

        </div>

      )}


      <div className="adjustment-layout">

        {/* =================================
            LEFT - FORM
        ================================= */}

        <div className="adjustment-form-card">

          <div className="adjustment-card-header">

            <div className="adjustment-card-icon">
              <ClipboardList size={19} />
            </div>

            <div>

              <h2>
                Adjust Inventory
              </h2>

              <p>
                Make changes to product stock.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleAdjustment}
            className="adjustment-form"
          >

            {/* PRODUCT */}

            <div className="adjustment-field">

              <label>
                Product
                <span>*</span>
              </label>

              <div className="product-selector">

                <div className="product-search">

                  <Search size={16} />

                  <input
                    type="text"
                    placeholder="Search product..."
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
                    Select a product
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

            </div>


            {/* CURRENT STOCK */}

            {selectedProduct && (

              <div className="current-stock-box">

                <div className="current-stock-product">

                  <div className="current-product-icon">
                    <Package size={20} />
                  </div>

                  <div>

                    <strong>
                      {selectedProduct.name}
                    </strong>

                    <span>
                      SKU: {selectedProduct.sku}
                    </span>

                  </div>

                </div>

                <div className="current-stock-number">

                  <span>
                    Current Stock
                  </span>

                  <strong>
                    {selectedProduct.stock}
                  </strong>

                  <small>
                    {selectedProduct.unit}
                    {selectedProduct.stock !==
                    1
                      ? "s"
                      : ""}
                  </small>

                </div>

              </div>

            )}


            {/* ADJUSTMENT TYPE */}

            <div className="adjustment-field">

              <label>
                Adjustment Type
                <span>*</span>
              </label>

              <div className="adjustment-types">

                {/* ADD */}

                <button
                  type="button"
                  className={`adjustment-type ${
                    adjustmentType === "add"
                      ? "selected add"
                      : ""
                  }`}
                  onClick={() =>
                    setAdjustmentType("add")
                  }
                >

                  <div className="adjustment-type-icon">
                    <Plus size={18} />
                  </div>

                  <div>

                    <strong>
                      Add Stock
                    </strong>

                    <span>
                      Increase inventory
                    </span>

                  </div>

                </button>


                {/* REMOVE */}

                <button
                  type="button"
                  className={`adjustment-type ${
                    adjustmentType === "remove"
                      ? "selected remove"
                      : ""
                  }`}
                  onClick={() =>
                    setAdjustmentType("remove")
                  }
                >

                  <div className="adjustment-type-icon">
                    <Minus size={18} />
                  </div>

                  <div>

                    <strong>
                      Remove Stock
                    </strong>

                    <span>
                      Decrease inventory
                    </span>

                  </div>

                </button>


                {/* SET */}

                <button
                  type="button"
                  className={`adjustment-type ${
                    adjustmentType === "set"
                      ? "selected set"
                      : ""
                  }`}
                  onClick={() =>
                    setAdjustmentType("set")
                  }
                >

                  <div className="adjustment-type-icon">
                    <ClipboardList size={17} />
                  </div>

                  <div>

                    <strong>
                      Set Stock
                    </strong>

                    <span>
                      Set exact quantity
                    </span>

                  </div>

                </button>

              </div>

            </div>


            {/* QUANTITY */}

            <div className="adjustment-field">

              <label>
                {adjustmentType === "set"
                  ? "New Stock Quantity"
                  : "Quantity"}

                <span>*</span>
              </label>

              <div className="quantity-input">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        0,
                        adjustmentQuantity - 1
                      )
                    )
                  }
                >
                  <Minus size={15} />
                </button>

                <input
                  type="number"
                  min="0"
                  value={quantity}
                  placeholder="0"
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
                      adjustmentQuantity + 1
                    )
                  }
                >
                  <Plus size={15} />
                </button>

              </div>

            </div>


            {/* PREVIEW */}

            {selectedProduct && (
              <div className="stock-preview">

                <div className="stock-preview-item">

                  <span>
                    Current Stock
                  </span>

                  <strong>
                    {selectedProduct.stock}
                  </strong>

                </div>

                <div className="preview-arrow">

                  {difference >= 0 ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}

                </div>

                <div className="stock-preview-item">

                  <span>
                    Adjustment
                  </span>

                  <strong
                    className={
                      difference > 0
                        ? "increase"
                        : difference < 0
                        ? "decrease"
                        : ""
                    }
                  >
                    {difference > 0
                      ? `+${difference}`
                      : difference}
                  </strong>

                </div>

                <div className="preview-equals">
                  =
                </div>

                <div className="stock-preview-item final">

                  <span>
                    New Stock
                  </span>

                  <strong>
                    {newStock}
                  </strong>

                </div>

              </div>
            )}


            {/* REASON */}

            <div className="adjustment-field">

              <label>
                Reason
                <span>*</span>
              </label>

              <select
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value)
                }
              >

                <option value="">
                  Select reason
                </option>

                <option value="New Stock">
                  New Stock
                </option>

                <option value="Purchase">
                  Purchase
                </option>

                <option value="Damaged">
                  Damaged
                </option>

                <option value="Expired">
                  Expired
                </option>

                <option value="Lost">
                  Lost
                </option>

                <option value="Stock Correction">
                  Stock Correction
                </option>

                <option value="Returned">
                  Customer Return
                </option>

                <option value="Internal Use">
                  Internal Use
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* NOTES */}

            <div className="adjustment-field">

              <label>
                Notes
                <small>
                  Optional
                </small>
              </label>

              <textarea
                rows="4"
                placeholder="Add additional information about this adjustment..."
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
              />

            </div>


            {/* ACTIONS */}

            <div className="adjustment-form-actions">

              <button
                type="button"
                className="adjustment-cancel"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="adjustment-submit"
              >
                <CheckCircle2 size={16} />
                Save Adjustment
              </button>

            </div>

          </form>

        </div>


        {/* =================================
            RIGHT - INFORMATION
        ================================= */}

        <div className="adjustment-side">

          {/* QUICK SUMMARY */}

          <div className="adjustment-info-card">

            <div className="adjustment-info-header">

              <h3>
                Adjustment Summary
              </h3>

              <ClipboardList size={17} />

            </div>


            <div className="summary-row">

              <span>
                Product
              </span>

              <strong>
                {selectedProduct
                  ? selectedProduct.name
                  : "—"}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                SKU
              </span>

              <strong>
                {selectedProduct
                  ? selectedProduct.sku
                  : "—"}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Adjustment
              </span>

              <strong>

                {adjustmentType === "add"
                  ? "Add Stock"
                  : adjustmentType ===
                    "remove"
                  ? "Remove Stock"
                  : "Set Stock"}

              </strong>

            </div>


            <div className="summary-row">

              <span>
                Quantity
              </span>

              <strong>
                {quantity || "0"}
              </strong>

            </div>


            <div className="summary-divider" />


            <div className="summary-final">

              <span>
                Resulting Stock
              </span>

              <strong>
                {selectedProduct
                  ? newStock
                  : "0"}
              </strong>

            </div>

          </div>


          {/* GUIDELINE */}

          <div className="adjustment-info-card">

            <div className="adjustment-info-header">

              <h3>
                Stock Adjustment Guide
              </h3>

            </div>

            <div className="guide-item">

              <div className="guide-number">
                1
              </div>

              <p>
                Select the product you want to
                adjust.
              </p>

            </div>

            <div className="guide-item">

              <div className="guide-number">
                2
              </div>

              <p>
                Choose whether to add, remove,
                or set the stock quantity.
              </p>

            </div>

            <div className="guide-item">

              <div className="guide-number">
                3
              </div>

              <p>
                Enter a clear reason for the
                adjustment.
              </p>

            </div>

            <div className="guide-item">

              <div className="guide-number">
                4
              </div>

              <p>
                Save the adjustment. The action
                will be recorded in the history.
              </p>

            </div>

          </div>


          {/* DATE */}

          <div className="adjustment-date-card">

            <CalendarDays size={17} />

            <div>

              <span>
                Adjustment Date
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


      {/* =================================
          HISTORY
      ================================= */}

      <div className="adjustment-history-card">

        <div className="history-header">

          <div>

            <div className="history-title">

              <div className="history-icon">
                <History size={17} />
              </div>

              <div>

                <h2>
                  Recent Adjustments
                </h2>

                <p>
                  Track recent inventory changes.
                </p>

              </div>

            </div>

          </div>

          <button>
            View All History
          </button>

        </div>


        <div className="history-table-wrapper">

          <table className="history-table">

            <thead>

              <tr>

                <th>PRODUCT</th>

                <th>TYPE</th>

                <th>QUANTITY</th>

                <th>STOCK BEFORE</th>

                <th>STOCK AFTER</th>

                <th>REASON</th>

                <th>USER</th>

                <th>DATE</th>

              </tr>

            </thead>

            <tbody>

              {history.map((item) => (

                <tr key={item.id}>

                  <td>

                    <div className="history-product">

                      <div className="history-product-icon">
                        <Package size={16} />
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


                  <td>

                    <span
                      className={`history-type ${
                        item.type.toLowerCase()
                      }`}
                    >

                      {item.type ===
                      "Added" ? (
                        <Plus size={12} />
                      ) : item.type ===
                        "Removed" ? (
                        <Minus size={12} />
                      ) : (
                        <ClipboardList
                          size={12}
                        />
                      )}

                      {item.type}

                    </span>

                  </td>


                  <td>

                    <strong
                      className={
                        item.type ===
                        "Added"
                          ? "history-increase"
                          : item.type ===
                            "Removed"
                          ? "history-decrease"
                          : ""
                      }
                    >

                      {item.type ===
                      "Added"
                        ? "+"
                        : item.type ===
                          "Removed"
                        ? "-"
                        : ""}

                      {item.quantity}

                    </strong>

                  </td>


                  <td>
                    <span className="history-stock">
                      {item.before}
                    </span>
                  </td>


                  <td>
                    <strong className="history-stock-after">
                      {item.after}
                    </strong>
                  </td>


                  <td>
                    <span className="history-reason">
                      {item.reason}
                    </span>
                  </td>


                  <td>

                    <div className="history-user">

                      <div className="history-user-icon">
                        <User size={12} />
                      </div>

                      <span>
                        {item.user}
                      </span>

                    </div>

                  </td>


                  <td>
                    <span className="history-date">
                      {item.date}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        <div className="history-footer">

          <span>
            Showing {history.length} recent
            adjustments
          </span>

          <div className="history-pagination">

            <button>
              <ChevronLeft size={15} />
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
              <ChevronRight size={15} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

