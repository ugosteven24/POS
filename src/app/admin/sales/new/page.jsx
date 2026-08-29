
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import "./new-sale.css"

import {
  FaArrowLeft,
  FaBarcode,
  FaSearch,
  FaPlus,
  FaMinus,
  FaTrash,
  FaUser,
  FaUserPlus,
  FaMoneyBillWave,
  FaCreditCard,
  FaExchangeAlt,
  FaReceipt,
  FaShoppingCart,
  FaTimes,
  FaKeyboard,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

import "./new-sale.css";


/* ============================================================
   DEMO PRODUCTS
============================================================ */

const products = [
  {
    id: 1,
    name: "Indomie Instant Noodles",
    sku: "IND-001",
    barcode: "4800012345678",
    price: 850,
    stock: 120,
    category: "Groceries",
  },
  {
    id: 2,
    name: "Peak Full Cream Milk",
    sku: "PKM-002",
    barcode: "4800012345679",
    price: 4200,
    stock: 45,
    category: "Beverages",
  },
  {
    id: 3,
    name: "Coca Cola 50cl",
    sku: "COC-003",
    barcode: "4800012345680",
    price: 700,
    stock: 200,
    category: "Beverages",
  },
  {
    id: 4,
    name: "Golden Penny Spaghetti",
    sku: "GPS-004",
    barcode: "4800012345681",
    price: 1200,
    stock: 80,
    category: "Groceries",
  },
  {
    id: 5,
    name: "Dettol Antiseptic 250ml",
    sku: "DET-005",
    barcode: "4800012345682",
    price: 2500,
    stock: 35,
    category: "Health & Beauty",
  },
  {
    id: 6,
    name: "Ariel Detergent 900g",
    sku: "ARL-006",
    barcode: "4800012345683",
    price: 5800,
    stock: 28,
    category: "Household",
  },
  {
    id: 7,
    name: "Milo Chocolate 500g",
    sku: "MIL-007",
    barcode: "4800012345684",
    price: 6200,
    stock: 40,
    category: "Beverages",
  },
  {
    id: 8,
    name: "Bread Large",
    sku: "BRD-008",
    barcode: "4800012345685",
    price: 1800,
    stock: 25,
    category: "Bakery",
  },
];


/* ============================================================
   CUSTOMERS
============================================================ */

const customers = [
  {
    id: 1,
    name: "Walk-in Customer",
    phone: "",
  },
  {
    id: 2,
    name: "Michael Obi",
    phone: "08031234567",
  },
  {
    id: 3,
    name: "Grace Okafor",
    phone: "08069876543",
  },
  {
    id: 4,
    name: "Chinedu Ltd",
    phone: "08055555555",
  },
];


export default function NewSale() {

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [customer, setCustomer] = useState(customers[0].id);

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [discount, setDiscount] = useState(0);

  const [amountReceived, setAmountReceived] = useState("");

  const [showProducts, setShowProducts] = useState(false);

  const [showCustomerModal, setShowCustomerModal] =
    useState(false);


  /* ==========================================================
     CURRENCY
  ========================================================== */

  const currency = (amount) => {

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  };


  /* ==========================================================
     SEARCH PRODUCTS
  ========================================================== */

  const filteredProducts = useMemo(() => {

    if (!search.trim()) {
      return products;
    }

    const value = search.toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(value) ||
      product.sku.toLowerCase().includes(value) ||
      product.barcode.includes(value)
    );

  }, [search]);


  /* ==========================================================
     ADD PRODUCT TO CART
  ========================================================== */

  const addToCart = (product) => {

    setCart((currentCart) => {

      const existing = currentCart.find(
        (item) => item.id === product.id
      );


      if (existing) {

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        );

      }


      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

    setSearch("");
    setShowProducts(false);

  };


  /* ==========================================================
     CHANGE QUANTITY
  ========================================================== */

  const updateQuantity = (id, quantity) => {

    if (quantity <= 0) {

      removeFromCart(id);

      return;

    }


    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                quantity,
                item.stock
              ),
            }
          : item
      )
    );

  };


  /* ==========================================================
     REMOVE PRODUCT
  ========================================================== */

  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );

  };


  /* ==========================================================
     TOTALS
  ========================================================== */

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const tax = 0;


  const discountAmount = Math.min(
    Number(discount) || 0,
    subtotal
  );


  const total = subtotal + tax - discountAmount;


  const received =
    Number(amountReceived) || 0;


  const change =
    received > total
      ? received - total
      : 0;


  /* ==========================================================
     CHECKOUT
  ========================================================== */

  const completeSale = () => {

    if (cart.length === 0) {

      alert("Please add at least one product.");

      return;

    }


    if (
      paymentMethod === "Cash" &&
      received < total
    ) {

      alert("Amount received is less than the total.");

      return;

    }


    alert("Sale completed successfully!");

  };


  return (

    <div className="new-sale-page content-wrapper">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sale-header">


        <div className="sale-header-left">

          <Link
            href="/admin/sales"
            className="back-button"
          >

            <FaArrowLeft />

          </Link>


          <div>

            <div className="sale-breadcrumb">

              <Link href="/admin/dashboard">
                Dashboard
              </Link>

              <span>/</span>

              <Link href="/admin/sales">
                Sales
              </Link>

              <span>/</span>

              <span>New Sale</span>

            </div>


            <h1>
              New Sale
            </h1>

          </div>

        </div>


        <div className="sale-header-right">

          <div className="invoice-number">

            <span>
              Invoice
            </span>

            <strong>
              #INV-10026
            </strong>

          </div>

        </div>

      </header>



      {/* ======================================================
          MAIN POS AREA
      ====================================================== */}

      <main className="pos-layout">


        {/* ====================================================
            LEFT / MAIN AREA
        ==================================================== */}

        <section className="pos-main">


          {/* CUSTOMER */}

          <div className="customer-bar">

            <div className="customer-info">

              <div className="customer-icon">
                <FaUser />
              </div>


              <div>

                <span>
                  Customer
                </span>

                <strong>

                  {
                    customers.find(
                      (item) =>
                        item.id === Number(customer)
                    )?.name
                  }

                </strong>

              </div>

            </div>


            <div className="customer-actions">

              <select
                value={customer}
                onChange={(e) =>
                  setCustomer(e.target.value)
                }
              >

                {customers.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>

                ))}

              </select>


              <button
                className="add-customer-btn"
                onClick={() =>
                  setShowCustomerModal(true)
                }
              >

                <FaUserPlus />

                New Customer

              </button>

            </div>

          </div>



          {/* PRODUCT SEARCH */}

          <div className="product-search-card">


            <div className="search-heading">

              <div>

                <h2>
                  Add Products
                </h2>

                <span>
                  Search by product name, SKU or barcode
                </span>

              </div>


              <span className="keyboard-hint">

                <FaKeyboard />

                F2

              </span>

            </div>


            <div className="product-search">

              <FaSearch />

              <input
                autoFocus
                type="text"
                placeholder="Search product or scan barcode..."
                value={search}
                onFocus={() =>
                  setShowProducts(true)
                }
                onChange={(e) => {

                  setSearch(e.target.value);
                  setShowProducts(true);

                }}
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    const product =
                      filteredProducts[0];

                    if (product) {
                      addToCart(product);
                    }

                  }

                }}
              />


              <span className="barcode-icon">
                <FaBarcode />
              </span>

            </div>


            {/* SEARCH RESULTS */}

            {showProducts && search && (

              <div className="product-results">

                {filteredProducts.length > 0 ? (

                  filteredProducts.map((product) => (

                    <button
                      key={product.id}
                      className="product-result"
                      onClick={() =>
                        addToCart(product)
                      }
                    >

                      <div className="product-result-icon">
                        <FaShoppingCart />
                      </div>


                      <div className="product-result-info">

                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          SKU: {product.sku}
                        </span>

                      </div>


                      <div className="product-result-stock">

                        <span>
                          {product.stock} in stock
                        </span>

                        <strong>
                          {currency(product.price)}
                        </strong>

                      </div>

                    </button>

                  ))

                ) : (

                  <div className="no-products">
                    No products found
                  </div>

                )}

              </div>

            )}

          </div>



          {/* CART */}

          <div className="cart-card">


            <div className="cart-header">

              <div>

                <h2>
                  Cart
                </h2>

                <span>
                  {cart.length} product(s)
                </span>

              </div>


              {cart.length > 0 && (

                <button
                  className="clear-cart"
                  onClick={() => setCart([])}
                >

                  Clear cart

                </button>

              )}

            </div>



            {cart.length > 0 ? (

              <div className="cart-table-wrapper">

                <table className="cart-table">

                  <thead>

                    <tr>

                      <th>
                        Product
                      </th>

                      <th>
                        Price
                      </th>

                      <th>
                        Quantity
                      </th>

                      <th>
                        Total
                      </th>

                      <th>
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {cart.map((item) => (

                      <tr key={item.id}>


                        {/* PRODUCT */}

                        <td>

                          <div className="cart-product">

                            <div className="cart-product-image">
                              <FaShoppingCart />
                            </div>

                            <div>

                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                SKU: {item.sku}
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* PRICE */}

                        <td>

                          <span className="cart-price">
                            {currency(item.price)}
                          </span>

                        </td>


                        {/* QUANTITY */}

                        <td>

                          <div className="quantity-control">

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                            >

                              <FaMinus />

                            </button>


                            <span>
                              {item.quantity}
                            </span>


                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                            >

                              <FaPlus />

                            </button>

                          </div>

                        </td>


                        {/* TOTAL */}

                        <td>

                          <strong className="cart-total">
                            {currency(
                              item.price *
                              item.quantity
                            )}
                          </strong>

                        </td>


                        {/* DELETE */}

                        <td>

                          <button
                            className="delete-item"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                          >

                            <FaTrash />

                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="empty-cart">

                <div className="empty-cart-icon">
                  <FaShoppingCart />
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Search for a product above to start a sale.
                </p>

              </div>

            )}

          </div>


        </section>



        {/* ====================================================
            RIGHT CHECKOUT PANEL
        ==================================================== */}

        <aside className="checkout-panel">


          {/* SUMMARY */}

          <div className="checkout-section">

            <div className="checkout-title">

              <h2>
                Order Summary
              </h2>

            </div>


            <div className="summary-lines">

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  {currency(subtotal)}
                </strong>

              </div>


              <div>

                <span>
                  Tax
                </span>

                <strong>
                  {currency(tax)}
                </strong>

              </div>


              <div className="discount-line">

                <span>
                  Discount
                </span>

                <div className="discount-input">

                  <span>
                    ₦
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(e.target.value)
                    }
                  />

                </div>

              </div>

            </div>


            <div className="grand-total">

              <span>
                Total
              </span>

              <strong>
                {currency(total)}
              </strong>

            </div>

          </div>



          {/* PAYMENT */}

          <div className="checkout-section payment-section">

            <div className="checkout-title">

              <h2>
                Payment Method
              </h2>

            </div>


            <div className="payment-methods">


              <button
                className={
                  paymentMethod === "Cash"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() =>
                  setPaymentMethod("Cash")
                }
              >

                <FaMoneyBillWave />

                <span>
                  Cash
                </span>

                {paymentMethod === "Cash" && (
                  <FaCheck className="payment-check" />
                )}

              </button>


              <button
                className={
                  paymentMethod === "POS"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() =>
                  setPaymentMethod("POS")
                }
              >

                <FaCreditCard />

                <span>
                  POS
                </span>

                {paymentMethod === "POS" && (
                  <FaCheck className="payment-check" />
                )}

              </button>


              <button
                className={
                  paymentMethod === "Transfer"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() =>
                  setPaymentMethod("Transfer")
                }
              >

                <FaExchangeAlt />

                <span>
                  Transfer
                </span>

                {paymentMethod === "Transfer" && (
                  <FaCheck className="payment-check" />
                )}

              </button>

            </div>


            {/* CASH RECEIVED */}

            {paymentMethod === "Cash" && (

              <div className="cash-section">

                <label>
                  Amount Received
                </label>

                <div className="amount-input">

                  <span>
                    ₦
                  </span>

                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={amountReceived}
                    onChange={(e) =>
                      setAmountReceived(
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="quick-amounts">

                  {[1000, 5000, 10000, 20000].map(
                    (amount) => (

                      <button
                        key={amount}
                        onClick={() =>
                          setAmountReceived(
                            amount
                          )
                        }
                      >

                        ₦
                        {amount.toLocaleString()}

                      </button>

                    )
                  )}

                </div>


                <div className="change-row">

                  <span>
                    Change
                  </span>

                  <strong>
                    {currency(change)}
                  </strong>

                </div>

              </div>

            )}

          </div>



          {/* ACTIONS */}

          <div className="checkout-actions">

            <button
              className="hold-sale-btn"
              disabled={cart.length === 0}
            >

              Hold Sale

            </button>


            <button
              className="complete-sale-btn"
              onClick={completeSale}
            >

              <FaReceipt />

              Complete Sale

            </button>

          </div>


          <div className="checkout-note">

            <FaKeyboard />

            <span>
              Press <strong>F4</strong> to complete sale
            </span>

          </div>

        </aside>

      </main>



      {/* ======================================================
          NEW CUSTOMER MODAL
      ====================================================== */}

      {showCustomerModal && (

        <div className="modal-overlay">

          <div className="customer-modal">

            <div className="modal-header">

              <div>

                <h2>
                  New Customer
                </h2>

                <span>
                  Add a customer to this sale
                </span>

              </div>


              <button
                onClick={() =>
                  setShowCustomerModal(false)
                }
              >

                <FaTimes />

              </button>

            </div>


            <div className="customer-form">

              <div className="form-group">

                <label>
                  Customer Name
                </label>

                <input
                  type="text"
                  placeholder="Enter customer name"
                />

              </div>


              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="080XXXXXXXX"
                />

              </div>


              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="customer@email.com"
                />

              </div>

            </div>


            <div className="modal-actions">

              <button
                className="modal-cancel"
                onClick={() =>
                  setShowCustomerModal(false)
                }
              >

                Cancel

              </button>


              <button
                className="modal-save"
                onClick={() =>
                  setShowCustomerModal(false)
                }
              >

                Save Customer

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

