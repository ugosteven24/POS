
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Package,
  Truck,
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CalendarDays,
  User,
  Building2,
  MoreHorizontal,
  Download,
  Printer,
} from "lucide-react";

import "./purchase-orders.css";

const initialOrders = [
  {
    id: "PO-2026-00125",
    supplier: "Samsung Distributor",
    date: "Aug 27, 2026",
    expectedDate: "Sep 02, 2026",
    items: 8,
    quantity: 42,
    amount: 4250000,
    status: "Pending",
    createdBy: "Admin",
  },
  {
    id: "PO-2026-00124",
    supplier: "Apple Distributor",
    date: "Aug 26, 2026",
    expectedDate: "Sep 01, 2026",
    items: 5,
    quantity: 18,
    amount: 6850000,
    status: "Ordered",
    createdBy: "John Admin",
  },
  {
    id: "PO-2026-00123",
    supplier: "Oraimo Nigeria",
    date: "Aug 24, 2026",
    expectedDate: "Aug 29, 2026",
    items: 12,
    quantity: 85,
    amount: 1250000,
    status: "Received",
    createdBy: "Admin",
  },
  {
    id: "PO-2026-00122",
    supplier: "HP Distributor",
    date: "Aug 22, 2026",
    expectedDate: "Aug 28, 2026",
    items: 6,
    quantity: 15,
    amount: 7350000,
    status: "Ordered",
    createdBy: "John Admin",
  },
  {
    id: "PO-2026-00121",
    supplier: "Logitech Distributor",
    date: "Aug 20, 2026",
    expectedDate: "Aug 26, 2026",
    items: 9,
    quantity: 56,
    amount: 980000,
    status: "Received",
    createdBy: "Admin",
  },
  {
    id: "PO-2026-00120",
    supplier: "JBL Distributor",
    date: "Aug 19, 2026",
    expectedDate: "Aug 25, 2026",
    items: 4,
    quantity: 20,
    amount: 1850000,
    status: "Cancelled",
    createdBy: "Admin",
  },
  {
    id: "PO-2026-00119",
    supplier: "Tech Accessories Ltd",
    date: "Aug 18, 2026",
    expectedDate: "Aug 24, 2026",
    items: 15,
    quantity: 120,
    amount: 1450000,
    status: "Received",
    createdBy: "John Admin",
  },
  {
    id: "PO-2026-00118",
    supplier: "Kingston Distributor",
    date: "Aug 15, 2026",
    expectedDate: "Aug 21, 2026",
    items: 7,
    quantity: 35,
    amount: 1120000,
    status: "Pending",
    createdBy: "Admin",
  },
];

const suppliers = [
  "Samsung Distributor",
  "Apple Distributor",
  "Oraimo Nigeria",
  "HP Distributor",
  "Logitech Distributor",
  "JBL Distributor",
  "Tech Accessories Ltd",
  "Kingston Distributor",
];

const products = [
  {
    id: 1,
    name: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    price: 720000,
  },
  {
    id: 2,
    name: "iPhone 15 128GB",
    sku: "IPH-15-128",
    price: 810000,
  },
  {
    id: 3,
    name: "Oraimo Power Bank 20000mAh",
    sku: "ORA-PB-20K",
    price: 25000,
  },
  {
    id: 4,
    name: "HP 15 Core i5 Laptop",
    sku: "HP-15-I5-16",
    price: 700000,
  },
  {
    id: 5,
    name: "Logitech M185 Wireless Mouse",
    sku: "LOG-M185",
    price: 14000,
  },
];

export default function PurchaseOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [supplierFilter, setSupplierFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [showMenu, setShowMenu] =
    useState(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  const itemsPerPage = 6;

  /*
   * CREATE ORDER FORM
   */

  const [form, setForm] = useState({
    supplier: "",
    expectedDate: "",
    notes: "",
  });

  const [orderItems, setOrderItems] =
    useState([]);

  /*
   * FILTER
   */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.supplier
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        order.status === statusFilter;

      const supplierMatch =
        supplierFilter === "All" ||
        order.supplier === supplierFilter;

      return (
        searchMatch &&
        statusMatch &&
        supplierMatch
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    supplierFilter,
  ]);

  /*
   * PAGINATION
   */

  const totalPages = Math.ceil(
    filteredOrders.length /
      itemsPerPage
  );

  const paginatedOrders =
    filteredOrders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  /*
   * STATISTICS
   */

  const pendingCount =
    orders.filter(
      (order) =>
        order.status === "Pending"
    ).length;

  const orderedCount =
    orders.filter(
      (order) =>
        order.status === "Ordered"
    ).length;

  const receivedCount =
    orders.filter(
      (order) =>
        order.status === "Received"
    ).length;

  const totalPurchaseValue =
    orders
      .filter(
        (order) =>
          order.status !== "Cancelled"
      )
      .reduce(
        (total, order) =>
          total + order.amount,
        0
      );

  /*
   * MONEY
   */

  const formatMoney = (amount) =>
    `₦${amount.toLocaleString()}`;

  /*
   * ADD PRODUCT TO ORDER
   */

  const addProduct = () => {
    const product = products[0];

    setOrderItems([
      ...orderItems,
      {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        sku: product.sku,
        quantity: 1,
        price: product.price,
      },
    ]);
  };

  /*
   * UPDATE ITEM
   */

  const updateItem = (
    id,
    field,
    value
  ) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "quantity" ||
                field === "price"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  };

  /*
   * REMOVE ITEM
   */

  const removeItem = (id) => {
    setOrderItems(
      orderItems.filter(
        (item) => item.id !== id
      )
    );
  };

  /*
   * TOTAL
   */

  const orderTotal = orderItems.reduce(
    (total, item) =>
      total +
      item.quantity * item.price,
    0
  );

  /*
   * CREATE PURCHASE ORDER
   */

  const createOrder = (e) => {
    e.preventDefault();

    if (
      !form.supplier ||
      orderItems.length === 0
    ) {
      alert(
        "Select a supplier and add at least one product."
      );
      return;
    }

    const newOrder = {
      id: `PO-2026-${String(
        orders.length + 126
      ).padStart(5, "0")}`,
      supplier: form.supplier,
      date: "Aug 28, 2026",
      expectedDate:
        form.expectedDate ||
        "Not specified",
      items: orderItems.length,
      quantity: orderItems.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),
      amount: orderTotal,
      status: "Pending",
      createdBy: "Admin",
    };

    setOrders([
      newOrder,
      ...orders,
    ]);

    setForm({
      supplier: "",
      expectedDate: "",
      notes: "",
    });

    setOrderItems([]);
    setShowCreateModal(false);

    setSuccessMessage(
      `${newOrder.id} has been created successfully.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  /*
   * CHANGE STATUS
   */

  const updateStatus = (
    orderId,
    status
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    );

    setShowMenu(null);

    setSuccessMessage(
      `Purchase order ${orderId} is now ${status.toLowerCase()}.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  /*
   * DELETE
   */

  const deleteOrder = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this purchase order?"
      )
    ) {
      return;
    }

    setOrders(
      orders.filter(
        (order) => order.id !== id
      )
    );

    setShowMenu(null);

    setSuccessMessage(
      "Purchase order deleted successfully."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  return (
    <div className="purchase-page  content-wrapper">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="purchase-header">

        <div>

          <div className="purchase-breadcrumb">

            <span>Inventory</span>
            <span>/</span>

            <strong>
              Purchase Orders
            </strong>

          </div>

          <div className="purchase-title-row">

            <div className="purchase-title-icon">
              <FileText size={20} />
            </div>

            <div>

              <h1>
                Purchase Orders
              </h1>

              <p>
                Create and manage supplier
                purchase orders.
              </p>

            </div>

          </div>

        </div>


        <button
          className="create-po-btn"
          onClick={() =>
            setShowCreateModal(true)
          }
        >
          <Plus size={15} />
          Create Purchase Order
        </button>

      </div>


      {/* =====================================
          SUCCESS
      ===================================== */}

      {successMessage && (

        <div className="purchase-success">

          <CheckCircle2 size={16} />

          <span>
            {successMessage}
          </span>

          <button
            onClick={() =>
              setSuccessMessage("")
            }
          >
            <X size={14} />
          </button>

        </div>

      )}


      {/* =====================================
          STATS
      ===================================== */}

      <div className="purchase-stats">

        <div className="purchase-stat">

          <div className="purchase-stat-icon blue">
            <FileText size={18} />
          </div>

          <div>
            <span>Total Orders</span>

            <strong>
              {orders.length}
            </strong>

            <small>
              Purchase orders
            </small>
          </div>

        </div>


        <div className="purchase-stat">

          <div className="purchase-stat-icon orange">
            <Clock3 size={18} />
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {pendingCount}
            </strong>

            <small>
              Awaiting processing
            </small>
          </div>

        </div>


        <div className="purchase-stat">

          <div className="purchase-stat-icon purple">
            <Truck size={18} />
          </div>

          <div>
            <span>Ordered</span>

            <strong>
              {orderedCount}
            </strong>

            <small>
              On the way
            </small>
          </div>

        </div>


        <div className="purchase-stat">

          <div className="purchase-stat-icon green">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <span>Received</span>

            <strong>
              {receivedCount}
            </strong>

            <small>
              Successfully received
            </small>
          </div>

        </div>


        <div className="purchase-stat total-value">

          <div className="purchase-stat-icon teal">
            <Package size={18} />
          </div>

          <div>
            <span>Purchase Value</span>

            <strong>
              {formatMoney(
                totalPurchaseValue
              )}
            </strong>

            <small>
              Excluding cancelled orders
            </small>
          </div>

        </div>

      </div>


      {/* =====================================
          FILTER BAR
      ===================================== */}

      <div className="purchase-filter-bar">

        <div className="purchase-search">

          <Search size={15} />

          <input
            type="text"
            placeholder="Search PO number or supplier..."
            value={search}
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


        <div className="purchase-select">

          <span>Status</span>

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

            <option value="Pending">
              Pending
            </option>

            <option value="Ordered">
              Ordered
            </option>

            <option value="Received">
              Received
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          <ChevronDown size={12} />

        </div>


        <div className="purchase-select">

          <span>Supplier</span>

          <select
            value={supplierFilter}
            onChange={(e) => {
              setSupplierFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >

            <option value="All">
              All Suppliers
            </option>

            {suppliers.map(
              (supplier) => (
                <option
                  key={supplier}
                  value={supplier}
                >
                  {supplier}
                </option>
              )
            )}

          </select>

          <ChevronDown size={12} />

        </div>

      </div>


      {/* =====================================
          TABLE
      ===================================== */}

      <div className="purchase-table-card">

        <div className="purchase-table-heading">

          <div>

            <h2>
              Purchase Orders
            </h2>

            <p>
              Manage supplier orders and
              incoming inventory.
            </p>

          </div>

          <div className="po-count">
            {filteredOrders.length} orders
          </div>

        </div>


        <div className="purchase-table-wrapper">

          <table className="purchase-table">

            <thead>

              <tr>

                <th>PO NUMBER</th>

                <th>SUPPLIER</th>

                <th>ORDER DATE</th>

                <th>EXPECTED</th>

                <th>ITEMS</th>

                <th>TOTAL</th>

                <th>STATUS</th>

                <th>CREATED BY</th>

                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {paginatedOrders.map(
                (order) => (

                  <tr key={order.id}>

                    <td>

                      <div className="po-number">

                        <div className="po-icon">
                          <FileText
                            size={14}
                          />
                        </div>

                        <strong>
                          {order.id}
                        </strong>

                      </div>

                    </td>


                    <td>

                      <div className="supplier-cell">

                        <div>
                          <Building2
                            size={14}
                          />
                        </div>

                        <span>
                          {order.supplier}
                        </span>

                      </div>

                    </td>


                    <td>

                      <div className="date-cell">

                        <CalendarDays
                          size={12}
                        />

                        {order.date}

                      </div>

                    </td>


                    <td>

                      <span className="expected-date">
                        {order.expectedDate}
                      </span>

                    </td>


                    <td>

                      <div className="items-cell">

                        <strong>
                          {order.items}
                        </strong>

                        <span>
                          {order.quantity} units
                        </span>

                      </div>

                    </td>


                    <td>

                      <strong className="po-total">
                        {formatMoney(
                          order.amount
                        )}
                      </strong>

                    </td>


                    <td>

                      <span
                        className={`po-status ${order.status.toLowerCase()}`}
                      >

                        {order.status ===
                          "Pending" && (
                          <Clock3 size={11} />
                        )}

                        {order.status ===
                          "Ordered" && (
                          <Truck size={11} />
                        )}

                        {order.status ===
                          "Received" && (
                          <CheckCircle2
                            size={11}
                          />
                        )}

                        {order.status ===
                          "Cancelled" && (
                          <XCircle
                            size={11}
                          />
                        )}

                        {order.status}

                      </span>

                    </td>


                    <td>

                      <div className="created-by">

                        <div>
                          <User size={11} />
                        </div>

                        {order.createdBy}

                      </div>

                    </td>


                    <td>

                      <div className="po-actions">

                        <button
                          title="View"
                          onClick={() =>
                            setSelectedOrder(
                              order
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
                                order.id
                                ? null
                                : order.id
                            )
                          }
                        >
                          <MoreHorizontal
                            size={14}
                          />
                        </button>


                        {showMenu ===
                          order.id && (

                          <div className="po-action-menu">

                            <button
                              onClick={() => {
                                setSelectedOrder(
                                  order
                                );
                                setShowMenu(null);
                              }}
                            >
                              <Eye size={13} />
                              View Details
                            </button>


                            {order.status ===
                              "Pending" && (

                              <button
                                onClick={() =>
                                  updateStatus(
                                    order.id,
                                    "Ordered"
                                  )
                                }
                              >
                                <Truck size={13} />
                                Mark as Ordered
                              </button>

                            )}


                            {order.status ===
                              "Ordered" && (

                              <button
                                onClick={() =>
                                  updateStatus(
                                    order.id,
                                    "Received"
                                  )
                                }
                              >
                                <CheckCircle2
                                  size={13}
                                />
                                Receive Stock
                              </button>

                            )}


                            {order.status !==
                              "Received" &&
                              order.status !==
                                "Cancelled" && (

                              <button
                                onClick={() =>
                                  updateStatus(
                                    order.id,
                                    "Cancelled"
                                  )
                                }
                              >
                                <XCircle size={13} />
                                Cancel Order
                              </button>

                            )}


                            <button
                              className="delete-menu"
                              onClick={() =>
                                deleteOrder(
                                  order.id
                                )
                              }
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


              {paginatedOrders.length ===
                0 && (

                <tr>

                  <td
                    colSpan="9"
                    className="purchase-empty"
                  >

                    <FileText size={28} />

                    <strong>
                      No purchase orders found
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


        {/* =================================
            PAGINATION
        ================================= */}

        <div className="purchase-pagination">

          <span>
            Showing{" "}
            {paginatedOrders.length} of{" "}
            {filteredOrders.length} orders
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
          CREATE PURCHASE ORDER MODAL
      ===================================== */}

      {showCreateModal && (

        <div
          className="po-modal-overlay"
          onClick={() =>
            setShowCreateModal(false)
          }
        >

          <div
            className="create-po-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="po-modal-header">

              <div>

                <div className="po-modal-icon">
                  <Plus size={17} />
                </div>

                <div>

                  <h2>
                    Create Purchase Order
                  </h2>

                  <span>
                    Create a new order for
                    your supplier.
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                <X size={16} />
              </button>

            </div>


            <form
              onSubmit={createOrder}
              className="create-po-form"
            >

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Supplier
                    <span>*</span>
                  </label>

                  <div className="form-select">

                    <Building2 size={14} />

                    <select
                      value={form.supplier}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          supplier:
                            e.target.value,
                        })
                      }
                    >

                      <option value="">
                        Select supplier
                      </option>

                      {suppliers.map(
                        (supplier) => (
                          <option
                            key={supplier}
                            value={supplier}
                          >
                            {supplier}
                          </option>
                        )
                      )}

                    </select>

                    <ChevronDown
                      size={12}
                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Expected Delivery
                  </label>

                  <div className="form-input-icon">

                    <CalendarDays
                      size={14}
                    />

                    <input
                      type="date"
                      value={
                        form.expectedDate
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          expectedDate:
                            e.target.value,
                        })
                      }
                    />

                  </div>

                </div>

              </div>


              {/* PRODUCTS */}

              <div className="order-products-header">

                <div>

                  <h3>
                    Order Items
                  </h3>

                  <span>
                    Add products you want
                    to purchase.
                  </span>

                </div>

                <button
                  type="button"
                  onClick={addProduct}
                >
                  <Plus size={13} />
                  Add Product
                </button>

              </div>


              <div className="order-items">

                {orderItems.length ===
                  0 && (

                  <div className="no-order-items">

                    <Package size={22} />

                    <span>
                      No products added
                    </span>

                    <button
                      type="button"
                      onClick={addProduct}
                    >
                      Add your first product
                    </button>

                  </div>

                )}


                {orderItems.map(
                  (item) => (

                    <div
                      className="order-item"
                      key={item.id}
                    >

                      <div className="order-item-product">

                        <div>
                          <Package
                            size={15}
                          />
                        </div>

                        <section>

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.sku}
                          </span>

                        </section>

                      </div>


                      <div className="item-field">

                        <label>
                          Qty
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={
                            item.quantity
                          }
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "quantity",
                              e.target.value
                            )
                          }
                        />

                      </div>


                      <div className="item-field price-field">

                        <label>
                          Unit Cost
                        </label>

                        <input
                          type="number"
                          min="0"
                          value={
                            item.price
                          }
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "price",
                              e.target.value
                            )
                          }
                        />

                      </div>


                      <div className="item-total">

                        <label>
                          Total
                        </label>

                        <strong>
                          {formatMoney(
                            item.quantity *
                              item.price
                          )}
                        </strong>

                      </div>


                      <button
                        type="button"
                        className="remove-item"
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                      >
                        <Trash2
                          size={14}
                        />
                      </button>

                    </div>

                  )
                )}

              </div>


              {/* NOTES */}

              <div className="form-group">

                <label>
                  Notes
                </label>

                <textarea
                  rows="3"
                  placeholder="Add notes or special instructions..."
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                />

              </div>


              {/* TOTAL */}

              <div className="create-po-total">

                <span>
                  Purchase Order Total
                </span>

                <strong>
                  {formatMoney(
                    orderTotal
                  )}
                </strong>

              </div>


              <div className="create-po-footer">

                <button
                  type="button"
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                >
                  Cancel
                </button>

                <button type="submit">
                  <FileText size={14} />
                  Create Purchase Order
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          VIEW ORDER MODAL
      ===================================== */}

      {selectedOrder && (

        <div
          className="po-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="view-po-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="po-modal-header">

              <div>

                <div className="po-modal-icon">
                  <FileText size={17} />
                </div>

                <div>

                  <h2>
                    {selectedOrder.id}
                  </h2>

                  <span>
                    Purchase order details
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                <X size={16} />
              </button>

            </div>


            <div className="view-po-content">

              <div className="view-po-top">

                <div>

                  <span>
                    SUPPLIER
                  </span>

                  <strong>
                    {selectedOrder.supplier}
                  </strong>

                </div>

                <div>

                  <span>
                    ORDER DATE
                  </span>

                  <strong>
                    {selectedOrder.date}
                  </strong>

                </div>

                <div>

                  <span>
                    EXPECTED DELIVERY
                  </span>

                  <strong>
                    {selectedOrder.expectedDate}
                  </strong>

                </div>

                <div>

                  <span>
                    STATUS
                  </span>

                  <span
                    className={`po-status ${selectedOrder.status.toLowerCase()}`}
                  >
                    {selectedOrder.status}
                  </span>

                </div>

              </div>


              <div className="view-order-summary">

                <div>

                  <span>
                    Items
                  </span>

                  <strong>
                    {selectedOrder.items}
                  </strong>

                </div>

                <div>

                  <span>
                    Quantity
                  </span>

                  <strong>
                    {selectedOrder.quantity}
                  </strong>

                </div>

                <div>

                  <span>
                    Created By
                  </span>

                  <strong>
                    {selectedOrder.createdBy}
                  </strong>

                </div>

                <div>

                  <span>
                    Total
                  </span>

                  <strong>
                    {formatMoney(
                      selectedOrder.amount
                    )}
                  </strong>

                </div>

              </div>


              <div className="view-po-note">

                <FileText size={14} />

                <span>
                  This purchase order contains{" "}
                  {selectedOrder.items}{" "}
                  product items with a
                  total quantity of{" "}
                  {selectedOrder.quantity}{" "}
                  units.
                </span>

              </div>

            </div>


            <div className="view-po-footer">

              <button
                onClick={() =>
                  alert(
                    "Printing purchase order..."
                  )
                }
              >
                <Printer size={14} />
                Print
              </button>

              <button
                onClick={() =>
                  alert(
                    "Preparing purchase order PDF..."
                  )
                }
              >
                <Download size={14} />
                Download

              </button>

              <button
                className="close-view-btn"
                onClick={() =>
                  setSelectedOrder(null)
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

