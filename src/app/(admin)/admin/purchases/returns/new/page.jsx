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
import { useActionState } from "react";
import "./new-purchase-return.css";
import { getPurchasesAll } from "@/services/purchases/get";
import { GetallData, searchProducts } from "@/services/products/get";
import { createPurchaseReturn } from "@/services/purchases/purchaseReturnService";
import { useEffect } from "react";

const formatCurrency = (value) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;

const initialState = {
  success: false,
  message: "",
  purchaseReturnId: null,
};

export default function NewPurchaseReturn() {
  const [purchaseOptions, setPurchaseOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [purchaseSearch, setPurchaseSearch] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const [returnItems, setReturnItems] = useState([]);

  const [returnReason, setReturnReason] = useState("Damaged goods");

  const [returnDate, setReturnDate] = useState("2026-08-29");

  const [refundMethod, setRefundMethod] = useState("Supplier Credit");

  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});
  const [selectedcustomerPurchaseID, setSelectedcustomerPurchaseID] =
    useState("");
  const [
    selectedcustomerPurchaseSupplierID,
    setSelectedcustomerPurchaseSupplierID,
  ] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [state, formAction, pending] = useActionState(
    createPurchaseReturn,
    initialState,
  );

  async function getdataPurchases() {
    const data = await getPurchasesAll();
    setPurchaseOptions(data);
  }

  useEffect(() => {
    getdataPurchases();
  }, []);

  ///////////////////products////////////////
  async function getdataProducts() {
    const data = await GetallData();
    setProductOptions(data);
  }

  useEffect(() => {
    getdataProducts();
  }, []);

  const filteredPurchases = useMemo(() => {
    if (!purchaseSearch) return purchaseOptions;

    return purchaseOptions.filter(
      (purchase) =>
        purchase.id
          .toString()
          .toLowerCase()
          .includes(purchaseSearch.toString()) ||
        purchase.supplier_name
          .toLowerCase()
          .includes(purchaseSearch.toString()),
    );
  }, [purchaseSearch]);

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return productOptions;

    return productOptions.filter(
      (product) =>
        product.product_name
          .toLowerCase()
          .includes(productSearch.toString().toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(productSearch.toString().toLowerCase()),
    );
  }, [productSearch]);

  const subtotal = returnItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const totalQuantity = returnItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const selectPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setPurchaseSearch(purchase.id);
    setSelectedcustomerPurchaseID(purchase.id);
    setSelectedcustomerPurchaseSupplierID(purchase.supplier_id);
    setErrors((prev) => ({
      ...prev,
      purchase: "",
    }));
  };

  const addProduct = (product) => {
    const existing = returnItems.find((item) => item.id === product.product_id);

    if (existing) {
      setReturnItems((items) =>
        items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.cost_price),
              }
            : item,
        ),
      );
    } else {
      setReturnItems((items) => [
        ...items,
        {
          ...product,
          quantity: 1,
          price: product.cost_price,
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
                Math.min(Number(value), item.stock_quantity),
              ),
            }
          : item,
      ),
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
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const increaseQuantity = (id) => {
    setReturnItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock_quantity),
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setReturnItems((items) => items.filter((item) => item.id !== id));
  };

  const updateItemReason = (id, reason) => {
    setReturnItems(
      (items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                reason,
              }
            : item,
        ),
      setReturnReason(reason),
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!selectedPurchase) {
      newErrors.purchase = "Select the original purchase order.";
    }

    if (returnItems.length === 0) {
      newErrors.items = "Add at least one product to the return.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate) return;

    const payload = {
      purchaseId: selectedcustomerPurchaseID,
      supplierId: selectedcustomerPurchaseSupplierID,
      returnDate: returnDate,
      reason: returnReason,
      refundMethod: refundMethod,
      items: returnItems,
      subtotal: subtotal,
      totalQuantity: totalQuantity,
      notes: notes,
    };

    const result = await createPurchaseReturn(payload);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Purchase return saved successfully.");

    console.log("Purchase Return ID:", result.purchaseReturnId);
  };

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="payload"
        value={JSON.stringify({
          purchaseId: selectedcustomerPurchaseID,
          supplierId: selectedcustomerPurchaseSupplierID,
          returnDate,
          reason: returnReason,
          refundMethod,
          items: returnItems,
          subtotal,
          totalQuantity,
          notes,
        })}
      />
      <div className="new-return-page  content-wrapper">
        {/* =====================================
          PAGE HEADER
      ===================================== */}

        <div className="new-return-header">
          <div className="new-return-title">
            <button className="back-btn" onClick={() => window.history.back()}>
              <ArrowLeft size={15} />
            </button>
            <div></div>

            <div className="page-title-icon">
              <RotateCcw size={18} />
            </div>

            <div>
              <h1>New Purchase Return</h1>

              <p>Return products to a supplier from a previous purchase.</p>
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

            <button type="submit" className="header-save" disabled={pending}>
              {pending ? "Saving..." : "Save Return"}
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
                   <h1 className="text-[red]">{state.message}</h1>
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
                        value={purchaseSearch.supplier_name}
                        onChange={(e) => {
                          setPurchaseSearch(e.target.value);
                          setSelectedPurchase(null);
                        }}
                        placeholder="Search purchase order or supplier..."
                      />

                      <ChevronDown size={13} />
                    </div>

                    {purchaseSearch && !selectedPurchase && (
                      <div className="purchase-dropdown">
                        {filteredPurchases.map((purchase) => (
                          <button
                            key={purchase.id}
                            className="purchase-option"
                            onClick={() => selectPurchase(purchase)}
                          >
                            <div className="purchase-option-icon">
                              <FileText size={14} />
                            </div>

                            <div className="purchase-option-info">
                              <span>{purchase.supplier_name}</span>
                              <strong>{purchase.company_name}</strong>
                            </div>

                            <div className="purchase-option-right">
                              <strong>{formatCurrency(purchase.amount)}</strong>

                              <span>
                                {Date(purchase.created_at).toLocaleString()}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {errors.purchase && (
                      <small className="error-message">{errors.purchase}</small>
                    )}
                  </div>

                  <div className="form-field">
                    <label>Return Date</label>

                    <div className="date-input">
                      <CalendarDays size={13} />

                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
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

                      <strong>{selectedPurchase.supplier_name}</strong>
                      <strong>{selectedPurchase.company_name}</strong>
                    </div>

                    <div className="selected-purchase-info">
                      <span>Purchase payment terms</span>

                      <strong>{selectedPurchase.payment_terms}</strong>
                    </div>

                    <div className="selected-purchase-info">
                      <span>Purchase Date</span>

                      <strong>
                        {Date(selectedPurchase.date).toLocaleString()}
                      </strong>
                    </div>

                    <div className="selected-purchase-info amount">
                      <span>Purchase Total</span>

                      <strong>{formatCurrency(selectedPurchase.amount)}</strong>
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
                  <p>Add the products and quantities being returned.</p>
                </div>
              </div>

              <div className="card-body products-body">
                <div className="product-search-container">
                  <Search size={14} />

                  <input
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setShowProductDropdown(true);
                    }}
                    onFocus={() => setShowProductDropdown(true)}
                    placeholder="Search products by name or SKU..."
                  />

                  <button
                    className="add-product-button"
                    type="button"
                    onClick={() => setShowProductDropdown(!showProductDropdown)}
                  >
                    <Plus size={13} />
                    Add Product
                  </button>

                  {showProductDropdown && (
                    <div className="product-dropdown">
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          className="product-option"
                          onClick={() => addProduct(product)}
                        >
                          <div className="product-option-image">
                            <Package size={14} />
                          </div>

                          <div className="product-option-info">
                            <strong>{product.product_name}</strong>

                            <span>{product.sku}</span>
                          </div>

                          <div className="product-option-price">
                            <strong>
                              {formatCurrency(product.cost_price)}
                            </strong>

                            <span>{product.stock_quantity} stock_quantity</span>
                          </div>
                        </button>
                      ))}
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

                    <strong>No products added</strong>

                    <span>
                      Search and add products that you want to return.
                    </span>

                    <button
                      type="button"
                      onClick={() => setShowProductDropdown(true)}
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
                                  <strong>{item.product_name}</strong>

                                  <span>{item.sku}</span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="price">
                                {formatCurrency(item.cost_price)}
                              </span>
                            </td>

                            <td>
                              <div className="quantity-control">
                                <button
                                  type="button"
                                  onClick={() => decreaseQuantity(item.id)}
                                >
                                  <Minus size={11} />
                                </button>

                                <input
                                  type="number"
                                  min="1"
                                  // max={item.stock_quantity}
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(item.id, e.target.value)
                                  }
                                />

                                <button
                                  type="button"
                                  onClick={() => increaseQuantity(item.id)}
                                >
                                  <Plus size={11} />
                                </button>
                              </div>

                              <small>Max: {item.stock_quantity}</small>
                            </td>

                            <td>
                              <select
                                value={item.reason}
                                onChange={(e) =>
                                  updateItemReason(item.id, e.target.value)
                                }
                              >
                                <option>Damaged goods</option>

                                <option>Wrong items</option>

                                <option>Expired products</option>

                                <option>Quality issue</option>

                                <option>Excess stock</option>
                              </select>
                            </td>

                            <td>
                              <strong className="line-total">
                                {formatCurrency(item.quantity * item.price)}
                              </strong>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="remove-item"
                                onClick={() => removeItem(item.id)}
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
                  <p>Add additional information about this return.</p>
                </div>
              </div>

              <div className="card-body">
                <textarea
                  className="return-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                  <span>Review return details</span>
                </div>
              </div>

              <div className="summary-content">
                <div className="summary-row">
                  <span>Products</span>

                  <strong>{returnItems.length}</strong>
                </div>

                <div className="summary-row">
                  <span>Total Quantity</span>

                  <strong>{totalQuantity}</strong>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Return Value</span>

                  <strong>{formatCurrency(subtotal)}</strong>
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
                <label>Return Reason</label>

                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                >
                  <option>Damaged goods</option>

                  <option>Wrong items</option>

                  <option>Expired products</option>

                  <option>Quality issue</option>

                  <option>Excess stock</option>
                </select>
              </div>

              <div className="side-form-field">
                <label>Refund Method</label>

                <select
                  value={refundMethod}
                  onChange={(e) => setRefundMethod(e.target.value)}
                >
                  <option>Supplier Credit</option>

                  <option>Cash Refund</option>

                  <option>Bank Transfer</option>

                  <option>Deduct from Invoice</option>
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
                  <div className="supplier-display ">
                    <div className="supplier-avatar">
                      {selectedPurchase.supplier_name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex flex-col">
                      <strong>{selectedPurchase.supplier_name}</strong>

                      <span>{selectedPurchase.company_name}</span>
                      <span>{selectedPurchase.phone}</span>
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

            <button className="save-return-button" type="submit">
              <Save size={14} />
              Save Purchase Return
            </button>

            <button
              className="cancel-return-button"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </aside>
        </div>
      </div>
    </form>
  );
}
