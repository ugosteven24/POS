"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useActionState
} from "react";
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
import { CreatePurchases } from "@/services/purchases/create";
import "./new-purchase.css";
import  getSuppliers  from "@/services/suppliers/get";
import { GetallData, searchProducts} from "@/services/products/get"
import toast from "react-hot-toast";
// ==========================================
// COMPONENT
// ==========================================
const initialState = {
  success: false,
  message: "",
};

export default function NewPurchase() {

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [branches, setBranches] = useState([]); // FIX: was missing, caused ReferenceError

  const [loadError, setLoadError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [supplierId, setSupplierId] = useState("");
  const [warehouse, setWarehouse] = useState("Main Store");

  const [purchaseDate, setPurchaseDate] = useState("2026-08-29");
  const [reference, setReference] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [amountPaid, setAmountPaid] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  const [state, formAction, saving] = useActionState(CreatePurchases, initialState);
  // ==========================================
  // MONEY
  // ==========================================


  // ========================================
  // LOAD Suppliers
  // ========================================
  async function loadallsuppliers() {
    const data = await getSuppliers();
    setSuppliers(data);

  }
  useEffect(() => {

    async function loadData() {
      loadallsuppliers()

    }


    loadallsuppliers();

  }, []);
  const money = (value) => `₦${Number(value || 0).toLocaleString()}`;

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return [];

    return products.filter(
      (product) =>
        product.name?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        product.barcode?.toLowerCase().includes(query)
    );
    // FIX: `products` was missing from deps, so the search ran against a stale
    // (often empty) product list once data arrived asynchronously.
  }, [search, products]);


  const handleSearch = async (value) => {

    setSearch(value);

    const result = await searchProducts({
      search: value,
      limit: 20,
    });

    if (result.success) {
      setProducts(result.data);
      setNextCursor(result.nextCursor);
      setHasMore(result.hasMore);
    }

  };

  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const addProduct = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          unitCost: product.purchasePrice,
        },
      ]);
    }

    setSearch("");
    setShowProducts(false);
  };

  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const updateQuantity = (id, quantity) => {
    if (quantity === "") {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: "" }
            : item
        )
      );

      return;
    }

    const value = Number(quantity);

    if (!Number.isFinite(value) || value < 1) {
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: value }
          : item
      )
    );
  };

  //=================================
  ///LOAD ALL PRODUCTS
  //======================
  async function loadallproducts() {
    const data = await GetallData();
    setProducts(data);

  }


  useEffect(() => {
    loadallproducts()

  }, [])

  const categoryOptions = useMemo(() => {
    return [
      {
        name: "All Suppliers",
        id: "",
      },

      ...suppliers.map((supplier) => ({
        name: supplier.name,
        id: supplier.id,
      })),
    ];
  }, [suppliers]);
  // ==========================================
  // UPDATE COST
  // ==========================================

  const updateCost = (id, unitCost) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, unitCost: Number(unitCost) || 0 }
          : item
      )
    );
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const removeProduct = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0) * Number(item.unitCost || 0),
    0
  );

  const total = Math.max(
    0,
    subtotal - Number(discount || 0) + Number(shipping || 0)
  );

  const balance = Math.max(0, total - Number(amountPaid || 0));

  // ==========================================
  // RESET
  // ==========================================

  const resetPurchase = () => {
    setSupplierId(""); // FIX: previously reset an unused `supplier` field, so the
    // supplier dropdown never actually cleared on Reset.
    setWarehouse("Main Store");
    setReference("");
    setPaymentMethod("Cash");
    setNotes("");
    setPaymentStatus("Unpaid");
    setAmountPaid(0);
    setDiscount(0);
    setShipping(0);
    setNotes("");
    setCart([]);
    setSearch("");
  };

  // ==========================================
  // SAVE PURCHASE
  // ==========================================

  const savePurchase = () => {
    // FIX: validation previously checked an unused `supplier` string state
    // that was never populated by the form, so this always failed.
    if (!supplierId) {
      alert("Please select a supplier.");
      return;
    }

   

    if (cart.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    // FIX: don't rely on `amountPaid` state right after calling setAmountPaid
    // (state updates aren't synchronous) — compute the final value locally.
    const finalAmountPaid =
      paymentStatus === "Paid"
        ? total
        : paymentStatus === "Unpaid"
          ? 0
          : Number(amountPaid || 0);
    const finalBalance = Math.max(0, total - finalAmountPaid);

    if (paymentStatus === "Paid") {
      setAmountPaid(total);
    }

    const selectedSupplier = suppliers.find((s) => s.id === supplierId);

    console.log({
      supplierId,
      supplierName: selectedSupplier?.name,
      warehouse,
      purchaseDate,
      reference,
      items: cart,
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod,
      paymentStatus,
      amountPaid: finalAmountPaid,
      balance: finalBalance,
      notes,
    });

    alert("Purchase created successfully.");
  };

  // ==========================================
  // LOAD DATA
  // ==========================================






  return (
    <div className="new-purchase-page content-wrapper">

      {/* ======================================
          PAGE HEADER
      ====================================== */}


      <div className="new-purchase-header">
        <div>
          <button className="back-button" onClick={() => window.history.back()}>
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
          <button className="reset-purchase" onClick={resetPurchase}>
            <RotateCcw size={14} />
            Reset
          </button>


          <button
            type="submit"
            form="product-form"
            className="save-purchase"
            disabled={
              saving

            }
          >

            <Save size={17} />

            {saving
              ? "Saving..."
              : "Save Purchase"}

          </button>
        </div>
      </div>

      {loadError && (
        <div className="purchase-load-error" role="alert">
          {loadError}
        </div>
      )}

      {/* ======================================
          MAIN GRID
      ====================================== */}
      {state?.success && (
        toast.success(state.message || "Purchase created successfully.")
      )}

      {state?.success === false && state?.message && (
        toast.error(state.message || "Failed to create purchase.")
      )}
      <form
        id="product-form"
        className="product-form"
        action={formAction}
      >
        <div className="new-purchase-layout">

          {/* ====================================
            LEFT CONTENT
        ==================================== */}

          <div className="purchase-main-column">

            {/* ==================================
              PURCHASE INFORMATION
          ================================== */}

            <div className="purchase-card">
              <div className="purchase-card-header">
                <div>
                  <h2>Purchase Information</h2>
                  <p>Enter the basic purchase information.</p>
                </div>
                <FileText size={17} />
              </div>

              <div className="purchase-form-grid">

                {/* SUPPLIER */}
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

                {/* WAREHOUSE */}
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

                {/* DATE */}
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

                {/* REFERENCE */}
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

            {/* ==================================
              PRODUCTS
          ================================== */}

            <div className="purchase-card products-card">
              <div className="purchase-card-header">
                <div>
                  <h2>Products</h2>
                  <p>Add the products you received from the supplier.</p>
                </div>
                <Package size={17} />
              </div>

              {/* PRODUCT SEARCH */}
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
                  />

                  {search && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setShowProducts(false);
                      }}
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* SEARCH RESULTS */}
                {showProducts && search && filteredProducts.length > 0 && (
                  <div className="product-search-results">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        className="product-result"
                        onClick={() => addProduct(product)}
                      >
                        <div className="product-result-icon">
                          <Package size={15} />
                        </div>

                        <div className="product-result-info">
                          <strong>{product.name}</strong>
                          <span>
                            SKU: {product.sku} • Stock: {product.stock}
                          </span>
                        </div>

                        <div className="product-result-price">
                          {money(product.purchasePrice)}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CART TABLE */}
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
                                <strong>{item.name}</strong>
                                <span>{item.sku}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="quantity-control">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
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
                                  updateQuantity(item.id, item.quantity + 1)
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
                                value={item.unitCost}
                                onChange={(e) =>
                                  updateCost(item.id, e.target.value)
                                }
                              />
                            </div>
                          </td>

                          <td>
                            <strong className="item-subtotal">
                              {money(item.quantity * item.unitCost)}
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
                  <span>Search for products above to add them to this purchase.</span>
                </div>
              )}
            </div>

            {/* ==================================
              NOTES
          ================================== */}

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

            {/* ==================================
              PURCHASE SUMMARY
          ================================== */}

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
                  <label>Payment Method</label>
                  <div className="select-wrapper">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option>Cash</option>
                      <option>Bank Transfer</option>
                      <option>POS</option>
                      <option>Card</option>
                    </select>
                    <ChevronDown size={12} />
                  </div>
                </div>

                <div className="payment-field">
                  <label>Payment Status</label>
                  <div className="select-wrapper">
                    <select
                      value={paymentStatus}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPaymentStatus(value);

                        if (value === "Paid") {
                          setAmountPaid(total);
                        }

                        if (value === "Unpaid") {
                          setAmountPaid(0);
                        }
                      }}
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
                      value={amountPaid}
                      disabled={paymentStatus === "Unpaid"}
                      onChange={(e) => setAmountPaid(e.target.value)}
                    />
                  </div>
                </div>

                <div className="payment-balance">
                  <span>Balance Due</span>
                  <strong>{money(balance)}</strong>
                </div>
              </div>

              {/* SAVE */}
              <button className="summary-save-button" onClick={savePurchase}>
                <CheckCircle2 size={15} />
                Save Purchase
              </button>
            </div>

            {/* ==================================
              PURCHASE WORKFLOW
          ================================== */}

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
        <input
          type="hidden"
          name="branch_id"
          value=""
        />

        <input
          type="hidden"
          name="supplier_id"
          value={supplierId}
        />

        <input
          type="hidden"
          name="invoice_number"
          value={reference}
        />

        <input
          type="hidden"
          name="subtotal"
          value={subtotal}
        />

        <input
          type="hidden"
          name="discount"
          value={discount}
        />

        <input
          type="hidden"
          name="tax"
          value="0"
        />

        <input
          type="hidden"
          name="total"
          value={total}
        />

        <input
          type="hidden"
          name="paid_amount"
          value={
            paymentStatus === "Paid"
              ? total
              : paymentStatus === "Unpaid"
                ? 0
                : amountPaid
          }
        />

        <input
          type="hidden"
          name="due_amount"
          value={balance}
        />

        <input
          type="hidden"
          name="status"
          value={paymentStatus}
        />

        <input
          type="hidden"
          name="purchase_date"
          value={purchaseDate}
        />

        <input
          type="hidden"
          name="items"
          value={JSON.stringify(cart)}
        />
      </form>
    </div>
  );
}