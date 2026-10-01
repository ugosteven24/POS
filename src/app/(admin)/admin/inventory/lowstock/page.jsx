
"use client";
import Link from "next/link"
import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Truck,
  X,
  XCircle,
} from "lucide-react";

import "./low-stock.css";

const initialProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S24",
    sku: "SAM-S24-256",
    category: "Mobile Phones",
    unit: "Piece",
    stock: 4,
    reorderLevel: 10,
    price: 850000,
    supplier: "Samsung Distributor",
    status: "Critical",
  },
  {
    id: 2,
    name: "iPhone 15 128GB",
    sku: "IPH-15-128",
    category: "Mobile Phones",
    unit: "Piece",
    stock: 7,
    reorderLevel: 15,
    price: 920000,
    supplier: "Apple Distributor",
    status: "Low",
  },
  {
    id: 3,
    name: "Oraimo Power Bank 20000mAh",
    sku: "ORA-PB-20K",
    category: "Accessories",
    unit: "Piece",
    stock: 8,
    reorderLevel: 20,
    price: 32000,
    supplier: "Oraimo Nigeria",
    status: "Low",
  },
  {
    id: 4,
    name: "HP 15 Core i5 Laptop",
    sku: "HP-15-I5-16",
    category: "Laptops",
    unit: "Piece",
    stock: 2,
    reorderLevel: 8,
    price: 850000,
    supplier: "HP Distributor",
    status: "Critical",
  },
  {
    id: 5,
    name: "Logitech M185 Wireless Mouse",
    sku: "LOG-M185",
    category: "Computer Accessories",
    unit: "Piece",
    stock: 5,
    reorderLevel: 12,
    price: 18000,
    supplier: "Logitech Distributor",
    status: "Low",
  },
  {
    id: 6,
    name: "JBL Flip 6 Speaker",
    sku: "JBL-FLIP6",
    category: "Audio",
    unit: "Piece",
    stock: 3,
    reorderLevel: 10,
    price: 145000,
    supplier: "JBL Distributor",
    status: "Critical",
  },
  {
    id: 7,
    name: "USB-C Fast Charger 33W",
    sku: "USB-C-33W",
    category: "Accessories",
    unit: "Piece",
    stock: 9,
    reorderLevel: 15,
    price: 12500,
    supplier: "Tech Accessories Ltd",
    status: "Low",
  },
  {
    id: 8,
    name: "Kingston 256GB SSD",
    sku: "KNG-SSD-256",
    category: "Computer Accessories",
    unit: "Piece",
    stock: 6,
    reorderLevel: 10,
    price: 42000,
    supplier: "Kingston Distributor",
    status: "Low",
  },
  {
    id: 9,
    name: "Lenovo ThinkPad E14",
    sku: "LEN-E14-I5",
    category: "Laptops",
    unit: "Piece",
    stock: 1,
    reorderLevel: 5,
    price: 790000,
    supplier: "Lenovo Distributor",
    status: "Critical",
  },
  {
    id: 10,
    name: "Anker Bluetooth Speaker",
    sku: "ANK-SOUND-01",
    category: "Audio",
    unit: "Piece",
    stock: 7,
    reorderLevel: 12,
    price: 68000,
    supplier: "Anker Nigeria",
    status: "Low",
  },
];

export default function LowStock() {
  const [products, setProducts] =
    useState(initialProducts);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showRestock, setShowRestock] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(null);

  const [restockQuantity, setRestockQuantity] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 7;

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  /*
   * FILTER PRODUCTS
   */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    category,
    statusFilter,
  ]);

  /*
   * PAGINATION
   */

  const totalPages = Math.ceil(
    filteredProducts.length /
      itemsPerPage
  );

  const paginatedProducts =
    filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  /*
   * STATISTICS
   */

  const criticalCount =
    products.filter(
      (product) =>
        product.status === "Critical"
    ).length;

  const lowCount =
    products.filter(
      (product) =>
        product.status === "Low"
    ).length;

  const totalLowStock =
    products.reduce(
      (total, product) =>
        total + product.stock,
      0
    );

  const estimatedRestockValue =
    products.reduce(
      (total, product) =>
        total +
        Math.max(
          product.reorderLevel -
            product.stock,
          0
        ) *
          product.price,
      0
    );

  /*
   * RESTOCK
   */

  const handleRestock = (e) => {
    e.preventDefault();

    const amount =
      Number(restockQuantity);

    if (!amount || amount <= 0) {
      alert(
        "Please enter a valid quantity."
      );
      return;
    }

    setProducts(
      products.map((product) => {
        if (
          product.id !==
          showRestock.id
        ) {
          return product;
        }

        const newStock =
          product.stock + amount;

        let newStatus = "Low";

        if (
          newStock <=
          product.reorderLevel * 0.5
        ) {
          newStatus = "Critical";
        }

        if (
          newStock >
          product.reorderLevel
        ) {
          newStatus = "Normal";
        }

        return {
          ...product,
          stock: newStock,
          status: newStatus,
        };
      })
    );

    setSuccessMessage(
      `${showRestock.name} has been restocked with ${amount} units.`
    );

    setShowRestock(null);
    setRestockQuantity("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 4500);
  };

  /*
   * MARK AS RESOLVED
   */

  const markAsResolved = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              stock:
                product.reorderLevel + 1,
              status: "Normal",
            }
          : product
      )
    );

    setSuccessMessage(
      "Product stock level has been updated."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  /*
   * FORMAT MONEY
   */

  const formatMoney = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="low-stock-page content-wrapper">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="low-stock-header">

        <div>

          <div className="low-stock-breadcrumb">

            <span>Inventory</span>

            <span>/</span>

            <strong>
              Low Stock
            </strong>

          </div>

          <div className="low-stock-title-row">

            <div className="low-stock-title-icon">
              <AlertTriangle size={21} />
            </div>

            <div>

              <h1>
                Low Stock
              </h1>

              <p>
                Monitor products that need
                to be restocked.
              </p>

            </div>

          </div>

        </div>

        <Link
          className="low-stock-order-btn"
          href="/admin/inventory/lowstock/PurchaseOrders/"
          >
          <ShoppingCart size={15} />
          Create Purchase Order
        </Link>

      </div>


      {/* =====================================
          SUCCESS
      ===================================== */}

      {successMessage && (

        <div className="low-stock-success">

          <CheckCircle2 size={17} />

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
          STAT CARDS
      ===================================== */}

      <div className="low-stock-stats">

        <div className="low-stat-card">

          <div className="low-stat-icon total">
            <Package size={18} />
          </div>

          <div>

            <span>
              Low Stock Items
            </span>

            <strong>
              {products.length}
            </strong>

            <small>
              Products requiring attention
            </small>

          </div>

        </div>


        <div className="low-stat-card">

          <div className="low-stat-icon critical">
            <AlertTriangle size={18} />
          </div>

          <div>

            <span>
              Critical
            </span>

            <strong>
              {criticalCount}
            </strong>

            <small>
              Urgent restocking required
            </small>

          </div>

        </div>


        <div className="low-stat-card">

          <div className="low-stat-icon warning">
            <Bell size={18} />
          </div>

          <div>

            <span>
              Low Stock
            </span>

            <strong>
              {lowCount}
            </strong>

            <small>
              Below reorder level
            </small>

          </div>

        </div>


        <div className="low-stat-card">

          <div className="low-stat-icon value">
            <Truck size={18} />
          </div>

          <div>

            <span>
              Estimated Restock
            </span>

            <strong>
              {formatMoney(
                estimatedRestockValue
              )}
            </strong>

            <small>
              Estimated inventory cost
            </small>

          </div>

        </div>

      </div>


      {/* =====================================
          ALERT BANNER
      ===================================== */}

      {criticalCount > 0 && (

        <div className="critical-alert">

          <div className="critical-alert-icon">
            <AlertTriangle size={17} />
          </div>

          <div>

            <strong>
              {criticalCount} product
              {criticalCount > 1
                ? "s"
                : ""}{" "}
              critically low
            </strong>

            <span>
              These products are below 50%
              of their reorder level.
              Consider restocking them
              immediately.
            </span>

          </div>

          <button
            onClick={() => {
              setStatusFilter(
                "Critical"
              );
              setCurrentPage(1);
            }}
          >
            View Critical
          </button>

        </div>

      )}


      {/* =====================================
          FILTER BAR
      ===================================== */}

      <div className="low-stock-toolbar">

        <div className="low-stock-search">

          <Search size={15} />

          <input
            type="text"
            placeholder="Search product or SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          {search && (

            <button
              onClick={() => {
                setSearch("");
                setCurrentPage(1);
              }}
            >
              <X size={13} />
            </button>

          )}

        </div>


        <div className="low-filter">

          <Filter size={14} />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          >

            {categories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "All"
                    ? "All Categories"
                    : item}
                </option>
              )
            )}

          </select>

          <ChevronDown size={12} />

        </div>


        <div className="low-filter">

          <AlertTriangle size={14} />

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

            <option value="Critical">
              Critical
            </option>

            <option value="Low">
              Low
            </option>

          </select>

          <ChevronDown size={12} />

        </div>

      </div>


      {/* =====================================
          TABLE
      ===================================== */}

      <div className="low-stock-table-card">

        <div className="low-table-header">

          <div>

            <h2>
              Products Requiring Attention
            </h2>

            <p>
              Products currently below
              their reorder threshold.
            </p>

          </div>

          <div className="low-table-count">

            <Package size={13} />

            {filteredProducts.length}
            {" "}
            items

          </div>

        </div>


        <div className="low-table-wrapper">

          <table className="low-stock-table">

            <thead>

              <tr>

                <th>PRODUCT</th>

                <th>CATEGORY</th>

                <th>STOCK LEVEL</th>

                <th>REORDER LEVEL</th>

                <th>SHORTAGE</th>

                <th>STATUS</th>

                <th>SUPPLIER</th>

                <th>ACTIONS</th>

              </tr>

            </thead>

            <tbody>

              {paginatedProducts.map(
                (product) => {

                  const shortage =
                    Math.max(
                      product.reorderLevel -
                        product.stock,
                      0
                    );

                  const stockPercentage =
                    Math.min(
                      (product.stock /
                        product.reorderLevel) *
                        100,
                      100
                    );

                  return (

                    <tr key={product.id}>

                      {/* PRODUCT */}

                      <td>

                        <div className="low-product">

                          <div className="low-product-image">
                            <Package size={17} />
                          </div>

                          <div>

                            <strong>
                              {product.name}
                            </strong>

                            <span>
                              {product.sku}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td>

                        <span className="low-category">
                          {product.category}
                        </span>

                      </td>


                      {/* STOCK */}

                      <td>

                        <div className="stock-level">

                          <div className="stock-number">

                            <strong
                              className={
                                product.status ===
                                "Critical"
                                  ? "critical-number"
                                  : "low-number"
                              }
                            >
                              {product.stock}
                            </strong>

                            <span>
                              /{" "}
                              {product.reorderLevel}
                            </span>

                          </div>

                          <div className="stock-progress">

                            <div
                              className={
                                product.status ===
                                "Critical"
                                  ? "critical-progress"
                                  : "low-progress"
                              }
                              style={{
                                width: `${stockPercentage}%`,
                              }}
                            />

                          </div>

                        </div>

                      </td>


                      {/* REORDER */}

                      <td>

                        <span className="reorder-value">
                          {product.reorderLevel}
                        </span>

                        <small className="unit-label">
                          {product.unit}
                        </small>

                      </td>


                      {/* SHORTAGE */}

                      <td>

                        <div className="shortage">

                          <ArrowDown size={12} />

                          <strong>
                            {shortage}
                          </strong>

                          <span>
                            units
                          </span>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`stock-status ${product.status.toLowerCase()}`}
                        >

                          {product.status ===
                          "Critical" ? (
                            <AlertTriangle
                              size={11}
                            />
                          ) : (
                            <Bell size={11} />
                          )}

                          {product.status}

                        </span>

                      </td>


                      {/* SUPPLIER */}

                      <td>

                        <div className="supplier">

                          <span>
                            {product.supplier}
                          </span>

                        </div>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="low-actions">

                          <button
                            title="View Product"
                            onClick={() =>
                              setShowDetails(
                                product
                              )
                            }
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            title="Restock"
                            className="restock-action"
                            onClick={() =>
                              setShowRestock(
                                product
                              )
                            }
                          >
                            <Plus size={14} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                }
              )}


              {paginatedProducts.length ===
                0 && (

                <tr>

                  <td
                    colSpan="8"
                    className="low-empty"
                  >

                    <CheckCircle2
                      size={27}
                    />

                    <strong>
                      No low stock products
                    </strong>

                    <span>
                      All products are
                      currently above their
                      reorder levels.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================
            TABLE FOOTER
        ================================= */}

        <div className="low-table-footer">

          <span>

            Showing{" "}
            {paginatedProducts.length}{" "}
            of{" "}
            {filteredProducts.length}{" "}
            products

          </span>


          <div className="low-pagination">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  Math.max(
                    currentPage - 1,
                    1
                  )
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
                  Math.min(
                    currentPage + 1,
                    totalPages
                  )
                )
              }
            >
              <ChevronRight size={14} />
            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          RESTOCK MODAL
      ===================================== */}

      {showRestock && (

        <div
          className="low-modal-overlay"
          onClick={() =>
            setShowRestock(null)
          }
        >

          <div
            className="low-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="low-modal-header">

              <div>

                <div className="modal-icon restock">
                  <Plus size={17} />
                </div>

                <div>

                  <h2>
                    Restock Product
                  </h2>

                  <span>
                    Add inventory to this
                    product.
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowRestock(null)
                }
              >
                <X size={16} />
              </button>

            </div>


            <div className="modal-product-info">

              <div className="modal-product-icon">
                <Package size={18} />
              </div>

              <div>

                <strong>
                  {showRestock.name}
                </strong>

                <span>
                  SKU:{" "}
                  {showRestock.sku}
                </span>

              </div>

            </div>


            <div className="restock-current">

              <div>

                <span>
                  Current Stock
                </span>

                <strong>
                  {showRestock.stock}
                </strong>

              </div>

              <ArrowRight />

              <div>

                <span>
                  Reorder Level
                </span>

                <strong>
                  {showRestock.reorderLevel}
                </strong>

              </div>

            </div>


            <form
              onSubmit={handleRestock}
              className="restock-form"
            >

              <label>
                Quantity to Add
              </label>

              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={restockQuantity}
                onChange={(e) =>
                  setRestockQuantity(
                    e.target.value
                  )
                }
                autoFocus
              />

              <small>
                Suggested minimum:
                {" "}
                <strong>
                  {Math.max(
                    showRestock
                      .reorderLevel -
                      showRestock.stock,
                    1
                  )}
                  {" units"}
                </strong>
              </small>


              <div className="restock-preview">

                <span>
                  Stock after restock
                </span>

                <strong>
                  {showRestock.stock +
                    (Number(
                      restockQuantity
                    ) || 0)}
                </strong>

              </div>


              <div className="restock-modal-actions">

                <button
                  type="button"
                  onClick={() =>
                    setShowRestock(null)
                  }
                >
                  Cancel
                </button>

                <button type="submit">
                  <Plus size={14} />
                  Add Stock
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          DETAILS MODAL
      ===================================== */}

      {showDetails && (

        <div
          className="low-modal-overlay"
          onClick={() =>
            setShowDetails(null)
          }
        >

          <div
            className="low-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="low-modal-header">

              <div>

                <div className="modal-icon details">
                  <Package size={17} />
                </div>

                <div>

                  <h2>
                    Product Details
                  </h2>

                  <span>
                    Inventory information
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowDetails(null)
                }
              >
                <X size={16} />
              </button>

            </div>


            <div className="details-product">

              <div className="details-product-image">
                <Package size={23} />
              </div>

              <div>

                <h3>
                  {showDetails.name}
                </h3>

                <span>
                  {showDetails.sku}
                </span>

              </div>

              <span
                className={`stock-status ${showDetails.status.toLowerCase()}`}
              >
                {showDetails.status}
              </span>

            </div>


            <div className="details-grid">

              <div>

                <span>
                  Current Stock
                </span>

                <strong>
                  {showDetails.stock}
                </strong>

              </div>

              <div>

                <span>
                  Reorder Level
                </span>

                <strong>
                  {showDetails.reorderLevel}
                </strong>

              </div>

              <div>

                <span>
                  Shortage
                </span>

                <strong className="details-shortage">
                  {Math.max(
                    showDetails.reorderLevel -
                      showDetails.stock,
                    0
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Unit
                </span>

                <strong>
                  {showDetails.unit}
                </strong>

              </div>

              <div>

                <span>
                  Selling Price
                </span>

                <strong>
                  {formatMoney(
                    showDetails.price
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Category
                </span>

                <strong>
                  {showDetails.category}
                </strong>

              </div>

            </div>


            <div className="details-supplier">

              <span>
                Supplier
              </span>

              <strong>
                {showDetails.supplier}
              </strong>

            </div>


            <div className="details-modal-footer">

              <button
                onClick={() => {
                  setShowDetails(null);
                  setShowRestock(
                    showDetails
                  );
                }}
              >
                <Plus size={14} />
                Restock Product
              </button>

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

