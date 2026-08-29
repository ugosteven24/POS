
"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Search,
  Plus,
  Trash2,
  Package,
  Building2,
  FileText,
  CalendarDays,
  CreditCard,
  Save,
  X,
  Minus,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

import "./new-purchase-return.css";

const purchaseOptions = [
  {
    id: "PO-000891",
    supplier: "ABC Distributors Ltd",
    date: "Aug 28, 2026",
    amount: 1250000,
  },
  {
    id: "PO-000876",
    supplier: "Global Foods Nigeria",
    date: "Aug 27, 2026",
    amount: 890000,
  },
  {
    id: "PO-000851",
    supplier: "Prime Wholesale",
    date: "Aug 25, 2026",
    amount: 675000,
  },
];

const productOptions = [
  {
    id: 1,
    name: "Coca Cola 50cl",
    sku: "SKU-10021",
    purchasePrice: 450,
    available: 48,
  },
  {
    id: 2,
    name: "Peak Milk 400g",
    sku: "SKU-10032",
    purchasePrice: 3200,
    available: 25,
  },
  {
    id: 3,
    name: "Golden Penny Spaghetti",
    sku: "SKU-10044",
    purchasePrice: 950,
    available: 35,
  },
  {
    id: 4,
    name: "Indomie Chicken Noodles",
    sku: "SKU-10051",
    purchasePrice: 720,
    available: 60,
  },
  {
    id: 5,
    name: "Dettol Antiseptic 250ml",
    sku: "SKU-10065",
    purchasePrice: 1850,
    available: 18,
  },
];

const formatCurrency = (value) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;

export default function NewPurchaseReturn() {
  const [purchaseSearch, setPurchaseSearch] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] =
    useState(false);

  const [returnItems, setReturnItems] = useState([]);

  const [returnReason, setReturnReason] =
    useState("Damaged goods");

  const [returnDate, setReturnDate] = useState(
    "2026-08-29"
  );

  const [refundMethod, setRefundMethod] =
    useState("Supplier Credit");

  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});

  const filteredPurchases = useMemo(() => {
    if (!purchaseSearch.trim()) return purchaseOptions;

    return purchaseOptions.filter(
      (purchase) =>
        purchase.id
          .toLowerCase()
          .includes(purchaseSearch.toLowerCase()) ||
        purchase.supplier
          .toLowerCase()
          .includes(purchaseSearch.toLowerCase())
    );
  }, [purchaseSearch]);

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return productOptions;

    return productOptions.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(productSearch.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(productSearch.toLowerCase())
    );
  }, [productSearch]);

  const subtotal = returnItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const totalQuantity = returnItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const selectPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setPurchaseSearch(purchase.id);
    setErrors((prev) => ({
      ...prev,
      purchase: "",
    }));
  };

  const addProduct = (product) => {
    const existing = returnItems.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setReturnItems((items) =>
        items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  item.available
                ),
              }
            : item
        )
      );
    } else {
      setReturnItems((items) => [
        ...items,
        {
          ...product,
          quantity: 1,
          price: product.purchasePrice,
          reason: returnReason,
        },
      ]);
    }

    setProductSearch("");
    setShowProductDropdown(false);

    setErrors((prev) => ({
      ...prev,
      items: "",
    }));
  };

  const updateQuantity = (id, value) => {
    setReturnItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(Number(value), item.available)
              ),
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setReturnItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQuantity = (id) => {
    setReturnItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                item.available
              ),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setReturnItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const updateItemReason = (id, reason) => {
    setReturnItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              reason,
            }
          : item
      )
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!selectedPurchase) {
      newErrors.purchase =
        "Select the original purchase order.";
    }

    if (returnItems.length === 0) {
      newErrors.items =
        "Add at least one product to the return.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const payload = {
      purchaseId: selectedPurchase.id,
      supplier: selectedPurchase.supplier,
      returnDate,
      reason: returnReason,
      refundMethod,
      items: returnItems,
      subtotal,
      totalQuantity,
      notes,
    };

    console.log("Purchase Return:", payload);

    alert("Purchase return saved successfully.");
  };

  return (
    <div className="new-return-page  content-wrapper">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="new-return-header">

        <div className="new-return-title">

          <button
            className="back-btn"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={15} />
          </button>

          <div className="page-title-icon">
            <RotateCcw size={18} />
          </div>

          <div>
            <h1>New Purchase Return</h1>

            <p>
              Return products to a supplier from a previous purchase.
            </p>
          </div>

        </div>


        <div className="header-buttons">

          <button
            className="header-cancel"
            onClick={() => window.history.back()}
          >
            <X size={14} />
            Cancel
          </button>

          <button
            className="header-save"
            onClick={handleSave}
          >
            <Save size={14} />
            Save Return
          </button>

        </div>

      </div>


      {/* =====================================
          MAIN LAYOUT
      ===================================== */}

      <div className="new-return-layout">


        {/* =================================
            LEFT CONTENT
        ================================= */}

        <div className="return-main">


          {/* PURCHASE INFORMATION */}

          <section className="return-card">

            <div className="card-heading">

              <div className="heading-icon blue">
                <FileText size={15} />
              </div>

              <div>
                <h2>Purchase Information</h2>
                <p>
                  Select the purchase from which products are being returned.
                </p>
              </div>

            </div>


            <div className="card-body">

              <div className="purchase-grid">

                <div className="form-field">

                  <label>
                    Original Purchase Order
                    <span>*</span>
                  </label>

                  <div className="purchase-search">

                    <Search size={13} />

                    <input
                      value={purchaseSearch}
                      onChange={(e) => {
                        setPurchaseSearch(e.target.value);
                        setSelectedPurchase(null);
                      }}
                      placeholder="Search purchase order or supplier..."
                    />

                    <ChevronDown size={13} />

                  </div>


                  {purchaseSearch &&
                    !selectedPurchase && (
                      <div className="purchase-dropdown">

                        {filteredPurchases.map(
                          (purchase) => (

                            <button
                              key={purchase.id}
                              className="purchase-option"
                              onClick={() =>
                                selectPurchase(
                                  purchase
                                )
                              }
                            >

                              <div className="purchase-option-icon">
                                <FileText size={14} />
                              </div>

                              <div className="purchase-option-info">

                                <strong>
                                  {purchase.id}
                                </strong>

                                <span>
                                  {purchase.supplier}
                                </span>

                              </div>

                              <div className="purchase-option-right">

                                <strong>
                                  {formatCurrency(
                                    purchase.amount
                                  )}
                                </strong>

                                <span>
                                  {purchase.date}
                                </span>

                              </div>

                            </button>

                          )
                        )}

                      </div>
                    )}

                  {errors.purchase && (
                    <small className="error-message">
                      {errors.purchase}
                    </small>
                  )}

                </div>


                <div className="form-field">

                  <label>
                    Return Date
                  </label>

                  <div className="date-input">

                    <CalendarDays size={13} />

                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) =>
                        setReturnDate(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>


              {selectedPurchase && (

                <div className="selected-purchase">

                  <div className="selected-purchase-icon">
                    <Building2 size={16} />
                  </div>

                  <div className="selected-purchase-info">

                    <span>Supplier</span>

                    <strong>
                      {selectedPurchase.supplier}
                    </strong>

                  </div>

                  <div className="selected-purchase-info">

                    <span>Purchase Order</span>

                    <strong>
                      {selectedPurchase.id}
                    </strong>

                  </div>

                  <div className="selected-purchase-info">

                    <span>Purchase Date</span>

                    <strong>
                      {selectedPurchase.date}
                    </strong>

                  </div>

                  <div className="selected-purchase-info amount">

                    <span>Purchase Total</span>

                    <strong>
                      {formatCurrency(
                        selectedPurchase.amount
                      )}
                    </strong>

                  </div>

                </div>

              )}

            </div>

          </section>


          {/* PRODUCTS */}

          <section className="return-card">

            <div className="card-heading">

              <div className="heading-icon green">
                <Package size={15} />
              </div>

              <div>
                <h2>Products to Return</h2>
                <p>
                  Add the products and quantities being returned.
                </p>
              </div>

            </div>


            <div className="card-body products-body">

              <div className="product-search-container">

                <Search size={14} />

                <input
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(
                      e.target.value
                    );
                    setShowProductDropdown(true);
                  }}
                  onFocus={() =>
                    setShowProductDropdown(true)
                  }
                  placeholder="Search products by name or SKU..."
                />

                <button
                  className="add-product-button"
                  type="button"
                  onClick={() =>
                    setShowProductDropdown(
                      !showProductDropdown
                    )
                  }
                >
                  <Plus size={13} />
                  Add Product
                </button>


                {showProductDropdown && (
                  <div className="product-dropdown">

                    {filteredProducts.map(
                      (product) => (

                        <button
                          key={product.id}
                          type="button"
                          className="product-option"
                          onClick={() =>
                            addProduct(product)
                          }
                        >

                          <div className="product-option-image">
                            <Package size={14} />
                          </div>

                          <div className="product-option-info">

                            <strong>
                              {product.name}
                            </strong>

                            <span>
                              {product.sku}
                            </span>

                          </div>

                          <div className="product-option-price">

                            <strong>
                              {formatCurrency(
                                product.purchasePrice
                              )}
                            </strong>

                            <span>
                              {product.available} available
                            </span>

                          </div>

                        </button>

                      )
                    )}

                  </div>
                )}

              </div>


              {errors.items && (
                <div className="items-error">

                  <AlertCircle size={13} />

                  {errors.items}

                </div>
              )}


              {returnItems.length === 0 ? (

                <div className="empty-products">

                  <div className="empty-product-icon">
                    <Package size={25} />
                  </div>

                  <strong>
                    No products added
                  </strong>

                  <span>
                    Search and add products that you want to return.
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setShowProductDropdown(true)
                    }
                  >
                    <Plus size={13} />
                    Add Product
                  </button>

                </div>

              ) : (

                <div className="products-table-wrapper">

                  <table className="products-table">

                    <thead>

                      <tr>
                        <th>PRODUCT</th>
                        <th>PURCHASE PRICE</th>
                        <th>RETURN QTY</th>
                        <th>REASON</th>
                        <th>TOTAL</th>
                        <th></th>
                      </tr>

                    </thead>

                    <tbody>

                      {returnItems.map((item) => (

                        <tr key={item.id}>

                          <td>

                            <div className="product-cell">

                              <div className="table-product-icon">
                                <Package size={13} />
                              </div>

                              <div>

                                <strong>
                                  {item.name}
                                </strong>

                                <span>
                                  {item.sku}
                                </span>

                              </div>

                            </div>

                          </td>


                          <td>

                            <span className="price">
                              {formatCurrency(
                                item.price
                              )}
                            </span>

                          </td>


                          <td>

                            <div className="quantity-control">

                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                              >
                                <Minus size={11} />
                              </button>

                              <input
                                type="number"
                                min="1"
                                max={item.available}
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    e.target.value
                                  )
                                }
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                              >
                                <Plus size={11} />
                              </button>

                            </div>

                            <small>
                              Max: {item.available}
                            </small>

                          </td>


                          <td>

                            <select
                              value={item.reason}
                              onChange={(e) =>
                                updateItemReason(
                                  item.id,
                                  e.target.value
                                )
                              }
                            >

                              <option>
                                Damaged goods
                              </option>

                              <option>
                                Wrong items
                              </option>

                              <option>
                                Expired products
                              </option>

                              <option>
                                Quality issue
                              </option>

                              <option>
                                Excess stock
                              </option>

                            </select>

                          </td>


                          <td>

                            <strong className="line-total">
                              {formatCurrency(
                                item.quantity *
                                  item.price
                              )}
                            </strong>

                          </td>


                          <td>

                            <button
                              type="button"
                              className="remove-item"
                              onClick={() =>
                                removeItem(
                                  item.id
                                )
                              }
                            >
                              <Trash2 size={14} />
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </section>


          {/* NOTES */}

          <section className="return-card">

            <div className="card-heading">

              <div className="heading-icon purple">
                <FileText size={15} />
              </div>

              <div>
                <h2>Return Notes</h2>
                <p>
                  Add additional information about this return.
                </p>
              </div>

            </div>


            <div className="card-body">

              <textarea
                className="return-notes"
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="Enter notes or additional information..."
                rows="4"
              />

            </div>

          </section>

        </div>


        {/* =================================
            RIGHT SIDEBAR
        ================================= */}

        <aside className="return-sidebar">


          {/* RETURN SUMMARY */}

          <section className="summary-card">

            <div className="summary-heading">

              <div className="summary-icon">
                <RotateCcw size={15} />
              </div>

              <div>
                <h2>Return Summary</h2>
                <span>
                  Review return details
                </span>
              </div>

            </div>


            <div className="summary-content">

              <div className="summary-row">

                <span>
                  Products
                </span>

                <strong>
                  {returnItems.length}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Total Quantity
                </span>

                <strong>
                  {totalQuantity}
                </strong>

              </div>


              <div className="summary-divider"></div>


              <div className="summary-total">

                <span>
                  Return Value
                </span>

                <strong>
                  {formatCurrency(subtotal)}
                </strong>

              </div>

            </div>

          </section>


          {/* RETURN DETAILS */}

          <section className="return-details-card">

            <div className="side-heading">
              <CreditCard size={14} />
              <strong>Return Details</strong>
            </div>


            <div className="side-form-field">

              <label>
                Return Reason
              </label>

              <select
                value={returnReason}
                onChange={(e) =>
                  setReturnReason(
                    e.target.value
                  )
                }
              >

                <option>
                  Damaged goods
                </option>

                <option>
                  Wrong items
                </option>

                <option>
                  Expired products
                </option>

                <option>
                  Quality issue
                </option>

                <option>
                  Excess stock
                </option>

              </select>

            </div>


            <div className="side-form-field">

              <label>
                Refund Method
              </label>

              <select
                value={refundMethod}
                onChange={(e) =>
                  setRefundMethod(
                    e.target.value
                  )
                }
              >

                <option>
                  Supplier Credit
                </option>

                <option>
                  Cash Refund
                </option>

                <option>
                  Bank Transfer
                </option>

                <option>
                  Deduct from Invoice
                </option>

              </select>

            </div>

          </section>


          {/* SUPPLIER */}

          <section className="supplier-info-card">

            <div className="side-heading">
              <Building2 size={14} />
              <strong>Supplier</strong>
            </div>


            {selectedPurchase ? (

              <>

                <div className="supplier-display">

                  <div className="supplier-avatar">
                    {selectedPurchase.supplier
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <strong>
                      {selectedPurchase.supplier}
                    </strong>

                    <span>
                      {selectedPurchase.id}
                    </span>

                  </div>

                </div>

              </>

            ) : (

              <div className="no-supplier">

                <Building2 size={17} />

                <span>
                  Select a purchase order to see supplier information.
                </span>

              </div>

            )}

          </section>


          {/* SAVE */}

          <button
            className="save-return-button"
            onClick={handleSave}
          >
            <Save size={14} />
            Save Purchase Return
          </button>


          <button
            className="cancel-return-button"
            onClick={() =>
              window.history.back()
            }
          >
            Cancel

          </button>

        </aside>

      </div>

    </div>
  );
}

