
"use client";

import React, { useMemo, useState } from "react";
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

import "./new-purchase.css";


// ==========================================
// SAMPLE DATA
// ==========================================

const products = [
  {
    id: 1,
    name: "Oraimo FreePods 4",
    sku: "ORA-FP4-BLK",
    barcode: "6972774750011",
    stock: 18,
    purchasePrice: 18500,
    image: null,
  },
  {
    id: 2,
    name: "Logitech M185 Wireless Mouse",
    sku: "LOG-M185-BLK",
    barcode: "097855089928",
    stock: 12,
    purchasePrice: 12500,
    image: null,
  },
  {
    id: 3,
    name: "HP 15 Laptop",
    sku: "HP-15-FC001",
    barcode: "198122345671",
    stock: 5,
    purchasePrice: 585000,
    image: null,
  },
  {
    id: 4,
    name: "Samsung Galaxy A15",
    sku: "SAM-A15-128",
    barcode: "8806095123456",
    stock: 8,
    purchasePrice: 285000,
    image: null,
  },
  {
    id: 5,
    name: "JBL Tune 510BT",
    sku: "JBL-510BT-BLK",
    barcode: "6925281987654",
    stock: 14,
    purchasePrice: 32000,
    image: null,
  },
  {
    id: 6,
    name: "Kingston 128GB Flash Drive",
    sku: "KIN-128-USB",
    barcode: "740617298765",
    stock: 32,
    purchasePrice: 10500,
    image: null,
  },
  {
    id: 7,
    name: "Samsung 25W Fast Charger",
    sku: "SAM-25W-CHG",
    barcode: "8806094987651",
    stock: 21,
    purchasePrice: 13500,
    image: null,
  },
  {
    id: 8,
    name: "Oraimo PowerBox 40",
    sku: "ORA-PB40",
    barcode: "6972774750098",
    stock: 16,
    purchasePrice: 28000,
    image: null,
  },
];

const suppliers = [
  "Oraimo Nigeria",
  "Logitech Distributor",
  "Samsung Distributor",
  "HP Distributor",
  "JBL Distributor",
  "Kingston Distributor",
  "Tech Accessories Ltd",
];


// ==========================================
// COMPONENT
// ==========================================

export default function NewPurchase() {

  const [supplier, setSupplier] = useState("");

  const [warehouse, setWarehouse] =
    useState("Main Store");

  const [purchaseDate, setPurchaseDate] =
    useState("2026-08-29");

  const [reference, setReference] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [paymentStatus, setPaymentStatus] =
    useState("Unpaid");

  const [amountPaid, setAmountPaid] =
    useState(0);

  const [discount, setDiscount] =
    useState(0);

  const [shipping, setShipping] =
    useState(0);

  const [notes, setNotes] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [cart, setCart] =
    useState([]);

  const [showProducts, setShowProducts] =
    useState(false);


  // ==========================================
  // MONEY
  // ==========================================

  const money = (value) =>
    `₦${Number(value).toLocaleString()}`;


  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = useMemo(() => {

    const query =
      search.toLowerCase().trim();

    if (!query) return [];

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(query) ||
      product.sku
        .toLowerCase()
        .includes(query) ||
      product.barcode
        .toLowerCase()
        .includes(query)
    );

  }, [search]);


  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const addProduct = (product) => {

    const existing =
      cart.find(
        (item) =>
          item.id === product.id
      );

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          unitCost:
            product.purchasePrice,
        },
      ]);

    }

    setSearch("");
    setShowProducts(false);

  };


  // ==========================================
  // UPDATE QUANTITY
  // ==========================================

  const updateQuantity = (
    id,
    quantity
  ) => {

    if (quantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );

  };


  // ==========================================
  // UPDATE COST
  // ==========================================

  const updateCost = (
    id,
    unitCost
  ) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              unitCost:
                Number(unitCost) || 0,
            }
          : item
      )
    );

  };


  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const removeProduct = (id) => {

    setCart(
      cart.filter(
        (item) =>
          item.id !== id
      )
    );

  };


  // ==========================================
  // CALCULATIONS
  // ==========================================

  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        item.quantity *
          item.unitCost,
      0
    );

  const total =
    Math.max(
      0,
      subtotal -
        Number(discount || 0) +
        Number(shipping || 0)
    );

  const balance =
    Math.max(
      0,
      total -
        Number(amountPaid || 0)
    );


  // ==========================================
  // RESET
  // ==========================================

  const resetPurchase = () => {

    setSupplier("");
    setWarehouse("Main Store");
    setReference("");
    setPaymentMethod("Cash");
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

    if (!supplier) {
      alert("Please select a supplier.");
      return;
    }

    if (cart.length === 0) {
      alert(
        "Please add at least one product."
      );
      return;
    }

    if (paymentStatus === "Paid") {
      setAmountPaid(total);
    }

    console.log({
      supplier,
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
      amountPaid,
      balance,
      notes,
    });

    alert(
      "Purchase created successfully."
    );

  };


  return (

    <div className="new-purchase-page content-wrapper">


      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="new-purchase-header">

        <div>

          <button
            className="back-button"
            onClick={() =>
              window.history.back()
            }
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <div className="new-purchase-heading">

            <div className="new-purchase-heading-icon">
              <ShoppingCart size={19} />
            </div>

            <div>

              <h1>
                New Purchase
              </h1>

              <p>
                Create a new inventory purchase
                from a supplier.
              </p>

            </div>

          </div>

        </div>


        <div className="new-purchase-actions">

          <button
            className="reset-purchase"
            onClick={resetPurchase}
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <button
            className="save-purchase"
            onClick={savePurchase}
          >
            <Save size={14} />
            Save Purchase
          </button>

        </div>

      </div>


      {/* ======================================
          MAIN GRID
      ====================================== */}

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

                <h2>
                  Purchase Information
                </h2>

                <p>
                  Enter the basic purchase
                  information.
                </p>

              </div>

              <FileText size={17} />

            </div>


            <div className="purchase-form-grid">


              {/* SUPPLIER */}

              <div className="purchase-field">

                <label>
                  Supplier
                  <span>*</span>
                </label>

                <div className="select-wrapper">

                  <User size={14} />

                  <select
                    value={supplier}
                    onChange={(e) =>
                      setSupplier(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select supplier
                    </option>

                    {suppliers.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>

                  <ChevronDown
                    size={13}
                  />

                </div>

              </div>


              {/* WAREHOUSE */}

              <div className="purchase-field">

                <label>
                  Receive Into
                  <span>*</span>
                </label>

                <div className="select-wrapper">

                  <Warehouse size={14} />

                  <select
                    value={warehouse}
                    onChange={(e) =>
                      setWarehouse(
                        e.target.value
                      )
                    }
                  >

                    <option>
                      Main Store
                    </option>

                    <option>
                      Warehouse
                    </option>

                    <option>
                      Branch Store
                    </option>

                  </select>

                  <ChevronDown
                    size={13}
                  />

                </div>

              </div>


              {/* DATE */}

              <div className="purchase-field">

                <label>
                  Purchase Date
                  <span>*</span>
                </label>

                <div className="input-icon">

                  <CalendarDays
                    size={14}
                  />

                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) =>
                      setPurchaseDate(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* REFERENCE */}

              <div className="purchase-field">

                <label>
                  Reference / Invoice No.
                </label>

                <div className="input-icon">

                  <FileText
                    size={14}
                  />

                  <input
                    type="text"
                    value={reference}
                    placeholder="e.g. INV-00981"
                    onChange={(e) =>
                      setReference(
                        e.target.value
                      )
                    }
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

                <h2>
                  Products
                </h2>

                <p>
                  Add the products you received
                  from the supplier.
                </p>

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
                  onFocus={() =>
                    setShowProducts(true)
                  }
                  onChange={(e) => {
                    setSearch(
                      e.target.value
                    );
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

              {showProducts &&
                search &&
                filteredProducts.length >
                  0 && (

                <div className="product-search-results">

                  {filteredProducts.map(
                    (product) => (

                      <button
                        key={product.id}
                        className="product-result"
                        onClick={() =>
                          addProduct(
                            product
                          )
                        }
                      >

                        <div className="product-result-icon">
                          <Package size={15} />
                        </div>

                        <div className="product-result-info">

                          <strong>
                            {product.name}
                          </strong>

                          <span>
                            SKU: {product.sku}
                            {" • "}
                            Stock: {product.stock}
                          </span>

                        </div>

                        <div className="product-result-price">
                          {money(
                            product.purchasePrice
                          )}
                        </div>

                      </button>

                    )
                  )}

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

                    {cart.map(
                      (item) => (

                        <tr
                          key={item.id}
                        >

                          <td>

                            <div className="purchase-product">

                              <div className="purchase-product-icon">
                                <Package
                                  size={15}
                                />
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

                            <div className="quantity-control">

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity -
                                      1
                                  )
                                }
                              >
                                <Minus
                                  size={11}
                                />
                              </button>

                              <input
                                value={
                                  item.quantity
                                }
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    Number(
                                      e.target
                                        .value
                                    )
                                  )
                                }
                              />

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity +
                                      1
                                  )
                                }
                              >
                                <Plus
                                  size={11}
                                />
                              </button>

                            </div>

                          </td>


                          <td>

                            <div className="cost-input">

                              <span>₦</span>

                              <input
                                type="number"
                                value={
                                  item.unitCost
                                }
                                onChange={(e) =>
                                  updateCost(
                                    item.id,
                                    e.target.value
                                  )
                                }
                              />

                            </div>

                          </td>


                          <td>

                            <strong className="item-subtotal">

                              {money(
                                item.quantity *
                                  item.unitCost
                              )}

                            </strong>

                          </td>


                          <td>

                            <button
                              className="remove-product"
                              onClick={() =>
                                removeProduct(
                                  item.id
                                )
                              }
                            >
                              <Trash2
                                size={14}
                              />
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="empty-purchase-items">

                <div className="empty-cart-icon">
                  <ShoppingCart
                    size={22}
                  />
                </div>

                <strong>
                  No products added
                </strong>

                <span>
                  Search for products above
                  to add them to this purchase.
                </span>

              </div>

            )}

          </div>


          {/* ==================================
              NOTES
          ================================== */}

          <div className="purchase-card">

            <div className="purchase-card-header">

              <div>

                <h2>
                  Purchase Notes
                </h2>

                <p>
                  Add any additional information
                  about this purchase.
                </p>

              </div>

              <StickyNote size={17} />

            </div>


            <textarea
              className="purchase-notes"
              value={notes}
              placeholder="Write notes about this purchase..."
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
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

                <h2>
                  Purchase Summary
                </h2>

                <span>
                  {cart.length} product
                  {cart.length !== 1
                    ? "s"
                    : ""}
                </span>

              </div>

            </div>


            <div className="summary-lines">

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  {money(subtotal)}
                </strong>

              </div>


              <div className="summary-input-row">

                <span>
                  Discount
                </span>

                <div className="small-money-input">

                  <span>₦</span>

                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="summary-input-row">

                <span>
                  Shipping
                </span>

                <div className="small-money-input">

                  <span>₦</span>

                  <input
                    type="number"
                    min="0"
                    value={shipping}
                    onChange={(e) =>
                      setShipping(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </div>


            <div className="summary-total">

              <span>
                Grand Total
              </span>

              <strong>
                {money(total)}
              </strong>

            </div>


            {/* PAYMENT */}

            <div className="payment-section">

              <div className="payment-heading">

                <CreditCard
                  size={13}
                />

                Payment

              </div>


              <div className="payment-field">

                <label>
                  Payment Method
                </label>

                <div className="select-wrapper">

                  <select
                    value={
                      paymentMethod
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  >

                    <option>
                      Cash
                    </option>

                    <option>
                      Bank Transfer
                    </option>

                    <option>
                      POS
                    </option>

                    <option>
                      Card
                    </option>

                  </select>

                  <ChevronDown
                    size={12}
                  />

                </div>

              </div>


              <div className="payment-field">

                <label>
                  Payment Status
                </label>

                <div className="select-wrapper">

                  <select
                    value={
                      paymentStatus
                    }
                    onChange={(e) => {

                      const value =
                        e.target.value;

                      setPaymentStatus(
                        value
                      );

                      if (
                        value === "Paid"
                      ) {
                        setAmountPaid(
                          total
                        );
                      }

                      if (
                        value ===
                        "Unpaid"
                      ) {
                        setAmountPaid(
                          0
                        );
                      }

                    }}
                  >

                    <option>
                      Unpaid
                    </option>

                    <option>
                      Partial
                    </option>

                    <option>
                      Paid
                    </option>

                  </select>

                  <ChevronDown
                    size={12}
                  />

                </div>

              </div>


              <div className="payment-field">

                <label>
                  Amount Paid
                </label>

                <div className="paid-input">

                  <span>
                    ₦
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={
                      amountPaid
                    }
                    disabled={
                      paymentStatus ===
                      "Unpaid"
                    }
                    onChange={(e) =>
                      setAmountPaid(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <div className="payment-balance">

                <span>
                  Balance Due
                </span>

                <strong>
                  {money(balance)}
                </strong>

              </div>

            </div>


            {/* SAVE */}

            <button
              className="summary-save-button"
              onClick={savePurchase}
            >
              <CheckCircle2
                size={15}
              />
              Save Purchase
            </button>

          </div>


          {/* ==================================
              PURCHASE INFO
          ================================== */}

          <div className="purchase-card quick-info-card">

            <div className="quick-info-title">
              <Truck size={14} />
              Purchase Workflow
            </div>


            <div className="workflow-item">

              <div className="workflow-number">
                1
              </div>

              <div>

                <strong>
                  Select supplier
                </strong>

                <span>
                  Choose the supplier you're
                  purchasing from.
                </span>

              </div>

            </div>


            <div className="workflow-item">

              <div className="workflow-number">
                2
              </div>

              <div>

                <strong>
                  Add products
                </strong>

                <span>
                  Enter quantities and actual
                  purchase costs.
                </span>

              </div>

            </div>


            <div className="workflow-item">

              <div className="workflow-number">
                3
              </div>

              <div>

                <strong>
                  Complete payment
                </strong>

                <span>
                  Record what was paid to the
                  supplier.
                </span>

              </div>

            </div>


            <div className="workflow-item">

              <div className="workflow-number">
                4
              </div>

              <div>

                <strong>
                  Save purchase
                </strong>

                <span>
                  Stock will be updated after
                  receiving.
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

