"use client";

import React, { useEffect, useMemo, useState, useActionState } from "react";
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  Trash2,
  Package,
  Truck,
  User,
  CalendarDays,
  FileText,
  CreditCard,
  ChevronDown,
  X,
  Save,
  RotateCcw,
  ShoppingCart,
  Warehouse,
  StickyNote,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { CreatePurchases } from "@/services/purchases/create";
import getSuppliers from "@/services/suppliers/get";
import { GetallData } from "@/services/products/get";
import { getpayment } from "@/services/paymentMethod/paymentService";
import { getbranches } from "@/services/branch/branchService";
import { getTaxes } from "@/services/taxes/get";
import "./new-purchase.css";
// add
import Swal from "sweetalert2";

const BUTTON_COLOR = "#4f46e5";
// ==========================================
// HELPERS
// ==========================================

const initialState = { success: false, message: "" };

const money = (value) => `₦${Number(value || 0).toLocaleString("en-NG")}`;

const todayLocal = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

// ==========================================
// COMPONENT
// ==========================================

export default function NewPurchase() {
  // ---------- Data ----------
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [branches, setBranches] = useState([]);
  const [taxes, setTaxes] = useState([]);
  // ---------- Form ----------
  const [supplierId, setSupplierId] = useState("");
  const [paymentMethodID, setPaymentMethodID] = useState("");
  const [branchId, setBranchId] = useState("");
  const [taxId, setTaxId] = useState("");

  const [warehouse, setWarehouse] = useState("Main Store");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [reference, setReference] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [amountPaid, setAmountPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  const [state, formAction, saving] = useActionState(
    CreatePurchases,
    initialState
  );

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    setPurchaseDate(todayLocal());

    const loadData = async () => {
      try {
        const [suppliersData, productsData, paymentMethodsData, branchesData, taxesData] = await Promise.all([
          getSuppliers(),
          GetallData(),
          getpayment(),
          getbranches(),
          getTaxes(),
        ]);
        setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
        setPaymentMethod(Array.isArray(paymentMethodsData) ? paymentMethodsData : []);
        setBranches(Array.isArray(branchesData) ? branchesData : []);
        setTaxes(Array.isArray(taxesData) ? taxesData : []);
      } catch (error) {
        console.error("Failed to load purchase data:", error);
        setLoadError("Could not load suppliers or products. Please refresh.");
      }
    };

    loadData();
  }, []);

  // ==========================================
  // SERVER RESULT -> TOAST (never during render)
  // ==========================================

useEffect(() => {
  if (state?.success) {
    Swal.fire({
      icon: "success",
      title: "Purchase created",
      text: state.message || "Purchase created successfully.",
      confirmButtonColor: BUTTON_COLOR,
    });
    resetPurchase();
  } else if (state?.message) {
       Swal.fire({
        icon: "error",
        title: "Could not save product",
        text: state.message,
        confirmButtonText: "Try again",
        confirmButtonColor: "#356bd8",
      });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [state]);

  // ==========================================
  // PRODUCT SEARCH
  // ==========================================

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return [];

    return products
      .filter(
        (product) =>
          (product.product_name ?? product.name)
            ?.toLowerCase()
            .includes(query) ||
          product.sku?.toLowerCase().includes(query) ||
          (product.barcode ?? product.product_barcode)
            ?.toLowerCase()
            .includes(query)
      )
      .slice(0, 10);
  }, [search, products]);

  // ==========================================
  // CART
  // ==========================================

  const addProduct = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          product_name: product.product_name ?? product.name,
          sku: product.sku,
          product_barcode: product.barcode ?? product.product_barcode,
          quantity: 1,
          unitCost: Number(product.cost_price ?? product.purchase_price ?? 0),
        },
      ];
    });

    setSearch("");
    setShowProducts(false);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === "") {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: "" } : item))
      );
      return;
    }

    const value = Number(quantity);
    if (!Number.isFinite(value) || value < 1) return;

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  const updateCost = (id, unitCost) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unitCost: Number(unitCost) || 0 } : item
      )
    );
  };

  const removeProduct = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.unitCost || 0),
    0
  );

  const total = Math.max(
    0,
    subtotal - Number(discount || 0) + Number(shipping || 0)
  );

  // Derived, so it stays correct when the total changes after choosing "Paid".
  const paidAmount =
    paymentStatus === "Paid"
      ? total
      : paymentStatus === "Unpaid"
        ? 0
        : Math.min(Number(amountPaid || 0), total);

  const balance = Math.max(0, total - paidAmount);

  // ==========================================
  // RESET
  // ==========================================

  const resetPurchase = () => {
    setSupplierId("");
    setWarehouse("Main Store");
    setPurchaseDate(todayLocal());
    setReference("");
    setPaymentMethodID("");
    setPaymentStatus("Unpaid");
    setAmountPaid(0);
    setDiscount(0);
    setShipping(0);
    setNotes("");
    setCart([]);
    setSearch("");
    setShowProducts(false);
  };

  // ==========================================
  // VALIDATE BEFORE THE SERVER ACTION RUNS
  // ==========================================

  const handleSubmit = (e) => {
    const fail = (message) => {
      e.preventDefault();
      toast.error(message);
    };

    if (!supplierId) return fail("Please select a supplier.");
    if (!purchaseDate) return fail("Please choose a purchase date.");
    if (cart.length === 0) return fail("Please add at least one product.");
    if (cart.some((item) => !(Number(item.quantity) > 0)))
      return fail("Every product needs a quantity of at least 1.");
    if (paymentStatus === "Partial" && !(paidAmount > 0))
      return fail("Enter the amount paid for a partial payment.");
  };

  const itemsPayload = cart.map((item) => ({
    id: item.id,
    product_id: item.id,
    quantity: Number(item.quantity),
    unitCost: Number(item.unitCost),
    subtotal: Number(item.quantity) * Number(item.unitCost),
  }));

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="new-purchase-page content-wrapper">
      {/* ======================================
          PAGE HEADER
      ====================================== */}
      <div className="new-purchase-header">
        <div>
          <button
            type="button"
            className="back-button"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <div className="new-purchase-heading">
            <div className="new-purchase-heading-icon">
              <ShoppingCart size={19} />
            </div>
            <div>
              <h1>New Purchase</h1>
              <p>Create a new inventory purchase from a supplier.</p>
            </div>
          </div>
        </div>

        <div className="new-purchase-actions">
          <button
            type="button"
            className="reset-purchase"
            onClick={resetPurchase}
            disabled={saving}
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <button
            type="submit"
            form="product-form"
            className="save-purchase"
            disabled={saving}
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Purchase"}
          </button>
        </div>
      </div>

      {loadError && (
        <div className="purchase-load-error" role="alert">
          {loadError}
        </div>
      )}

      {/* ======================================
          FORM
      ====================================== */}
      <form
        id="product-form"
        className="product-form"
        action={formAction}
        onSubmit={handleSubmit}
      >
        <div className="new-purchase-layout">
          {/* ====================================
              LEFT CONTENT
          ==================================== */}
          <div className="purchase-main-column">
            {/* PURCHASE INFORMATION */}
            <div className="purchase-card">
              <div className="purchase-card-header">
                <div>
                  <h2>Purchase Information</h2>
                  <p>Enter the basic purchase information.</p>
                </div>
                <FileText size={17} />
              </div>

              <div className="purchase-form-grid">
                <div className="purchase-field">
                  <label>
                    Supplier<span>*</span>
                  </label>
                  <div className="select-wrapper">
                    <User size={14} />
                    <select
                      value={supplierId}
                      onChange={(e) => setSupplierId(e.target.value)}
                    >
                      <option value="">Select supplier</option>
                      {suppliers.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.supplier_name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={13} />
                  </div>
                </div>


                <div className="purchase-field">
                  <label>
                    Branches<span>*</span>
                  </label>
                  <div className="select-wrapper">
                    <User size={14} />
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                    >
                      <option value="">Select branch</option>
                      {branches.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={13} />
                  </div>
                </div>
                <div className="purchase-field">
                  <label>
                    Receive Into<span>*</span>
                  </label>
                  <div className="select-wrapper">
                    <Warehouse size={14} />
                    <select
                      value={warehouse}
                      onChange={(e) => setWarehouse(e.target.value)}
                    >
                      <option>Main Store</option>
                      <option>Warehouse</option>
                      <option>Branch Store</option>
                    </select>
                    <ChevronDown size={13} />
                  </div>
                </div>

                <div className="purchase-field">
                  <label>
                    Purchase Date<span>*</span>
                  </label>
                  <div className="input-icon">
                    <CalendarDays size={14} />
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="purchase-field">
                  <label>Reference / Invoice No.</label>
                  <div className="input-icon">
                    <FileText size={14} />
                    <input
                      type="text"
                      value={reference}
                      placeholder="e.g. INV-00981"
                      onChange={(e) => setReference(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="purchase-card products-card">
              <div className="purchase-card-header">
                <div>
                  <h2>Products</h2>
                  <p>Add the products you received from the supplier.</p>
                </div>
                <Package size={17} />
              </div>

              <div className="product-search-container">
                <div className="product-search">
                  <Search size={16} />
                  <input
                    type="text"
                    value={search}
                    placeholder="Search product by name, SKU or barcode..."
                    onFocus={() => setShowProducts(true)}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowProducts(true);
                    }}
                    onKeyDown={(e) => {
                      // Enter in the search box must not submit the purchase.
                      if (e.key === "Enter") e.preventDefault();
                    }}
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setShowProducts(false);
                      }}
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {showProducts && search && filteredProducts.length > 0 && (
                  <div className="product-search-results">
                    {filteredProducts.map((product) => (
                      <button
                        type="button"
                        key={product.id}
                        className="product-result"
                        onClick={() => addProduct(product)}
                      >
                        <div className="product-result-icon">
                          <Package size={15} />
                        </div>

                        <div className="product-result-info">
                          <strong>{product.product_name ?? product.name}</strong>
                          <span>
                            SKU: {product.sku} • Stock: {product.stock}
                          </span>
                        </div>

                        <div className="product-result-price">
                          {money(product.cost_price ?? product.purchase_price)}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 ? (
                <div className="purchase-items-wrapper">
                  <table className="purchase-items-table">
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>QTY</th>
                        <th>UNIT COST</th>
                        <th>SUBTOTAL</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="purchase-product">
                              <div className="purchase-product-icon">
                                <Package size={15} />
                              </div>
                              <div>
                                <strong>{item.product_name}</strong>
                                <span>{item.product_barcode || item.sku}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="quantity-control">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Number(item.quantity || 0) - 1
                                  )
                                }
                              >
                                <Minus size={11} />
                              </button>

                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, e.target.value)
                                }
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Number(item.quantity || 0) + 1
                                  )
                                }
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                          </td>

                          <td>
                            <div className="cost-input">
                              <span>₦</span>
                              <input
                                type="number"
                                min="0"
                                readOnly={true}
                                step="0.01"
                                value={item.unitCost}
                                onChange={(e) =>
                                  updateCost(item.id, e.target.value)
                                }
                              />
                            </div>
                          </td>

                          <td>
                            <strong className="item-subtotal">
                              {money(
                                Number(item.quantity || 0) *
                                Number(item.unitCost || 0)
                              )}
                            </strong>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="remove-product"
                              onClick={() => removeProduct(item.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-purchase-items">
                  <div className="empty-cart-icon">
                    <ShoppingCart size={22} />
                  </div>
                  <strong>No products added</strong>
                  <span>
                    Search for products above to add them to this purchase.
                  </span>
                </div>
              )}
            </div>

            {/* NOTES */}
            <div className="purchase-card">
              <div className="purchase-card-header">
                <div>
                  <h2>Purchase Notes</h2>
                  <p>Add any additional information about this purchase.</p>
                </div>
                <StickyNote size={17} />
              </div>

              <textarea
                name="notes"
                className="purchase-notes"
                value={notes}
                placeholder="Write notes about this purchase..."
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* ====================================
              RIGHT SIDEBAR
          ==================================== */}
          <div className="purchase-side-column">
            <div className="purchase-card summary-card">
              <div className="summary-title">
                <div className="summary-title-icon">
                  <CreditCard size={16} />
                </div>
                <div>
                  <h2>Purchase Summary</h2>
                  <span>
                    {cart.length} product{cart.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="summary-lines">
                <div>
                  <span>Subtotal</span>
                  <strong>{money(subtotal)}</strong>
                </div>

                <div className="summary-input-row">
                  <span>Discount</span>
                  <div className="small-money-input">
                    <span>₦</span>
                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="summary-input-row">
                  <span>Shipping</span>
                  <div className="small-money-input">
                    <span>₦</span>
                    <input
                      type="number"
                      min="0"
                      value={shipping}
                      onChange={(e) => setShipping(e.target.value)}
                    />
                  </div>
                </div>

                <div className="summary-input-row">
                  <span>Tax</span>
                  <div className="select-wrapper small-money-input">
                    <select
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                    >
                      <option value="">Select Tax</option>
                      {taxes.map((tax) => (
                        <option key={tax.id} value={tax.id}>
                          {tax.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={12} />
                  </div>
                </div>
                </div>

              <div className="summary-total">
                <span>Grand Total</span>
                <strong>{money(total)}</strong>
              </div>

              {/* PAYMENT */}
              <div className="payment-section">
                <div className="payment-heading">
                  <CreditCard size={13} />
                  Payment
                </div>

                <div className="payment-field">
                  <label>Payment Method </label>
                  <div className="select-wrapper">
                    <select
                      value={paymentMethodID}
                      onChange={(e) => setPaymentMethodID(e.target.value)}
                    >
                      {paymentMethod.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={12} />
                  </div>
                </div>

                <div className="payment-field">
                  <label>Payment Status</label>
                  <div className="select-wrapper">
                    <select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                      <option>Unpaid</option>
                      <option>Partial</option>
                      <option>Paid</option>
                    </select>
                    <ChevronDown size={12} />
                  </div>
                </div>

                <div className="payment-field">
                  <label>Amount Paid</label>
                  <div className="paid-input">
                    <span>₦</span>
                    <input
                      type="number"
                      min="0"
                      value={
                        paymentStatus === "Partial" ? amountPaid : paidAmount
                      }
                      disabled={paymentStatus !== "Partial"}
                      onChange={(e) => setAmountPaid(e.target.value)}
                    />
                  </div>
                </div>

                <div className="payment-balance">
                  <span>Balance Due</span>
                  <strong>{money(balance)}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="summary-save-button"
                disabled={saving}
              >
                <CheckCircle2 size={15} />
                {saving ? "Saving..." : "Save Purchase"}
              </button>
            </div>

            <div className="purchase-card quick-info-card">
              <div className="quick-info-title">
                <Truck size={14} />
                Purchase Workflow
              </div>

              <div className="workflow-item">
                <div className="workflow-number">1</div>
                <div>
                  <strong>Select supplier</strong>
                  <span>Choose the supplier you're purchasing from.</span>
                </div>
              </div>

              <div className="workflow-item">
                <div className="workflow-number">2</div>
                <div>
                  <strong>Add products</strong>
                  <span>Enter quantities and actual purchase costs.</span>
                </div>
              </div>

              <div className="workflow-item">
                <div className="workflow-number">3</div>
                <div>
                  <strong>Complete payment</strong>
                  <span>Record what was paid to the supplier.</span>
                </div>
              </div>

              <div className="workflow-item">
                <div className="workflow-number">4</div>
                <div>
                  <strong>Save purchase</strong>
                  <span>Stock will be updated after receiving.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================
            VALUES SENT TO THE SERVER ACTION
        ==================================== */}
        <input type="hidden" name="branch_id" value={branchId} />
        <input type="hidden" name="warehouse" value={warehouse} />
        <input type="hidden" name="supplier_id" value={supplierId} />
        <input type="hidden" name="invoice_number" value={reference} />
        <input type="hidden" name="purchase_date" value={purchaseDate} />
        <input type="hidden" name="subtotal" value={subtotal} />
        <input type="hidden" name="discount" value={Number(discount || 0)} />
        <input type="hidden" name="shipping" value={Number(shipping || 0)} />
        <input type="hidden" name="tax" value={taxId} />
        <input type="hidden" name="total" value={total} />
        <input type="hidden" name="payment_method" value={paymentMethodID} />
        <input type="hidden" name="paid_amount" value={paidAmount} />
        <input type="hidden" name="due_amount" value={balance} />
        <input type="hidden" name="status" value={paymentStatus} />
        <input type="hidden" name="items" value={JSON.stringify(itemsPayload)} />
      </form>
    </div>
  );
}