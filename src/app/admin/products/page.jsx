
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  Pencil,
  Trash2,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import "./all-products.css";

const productsData = [
  {
    id: 1,
    sku: "SKU-10001",
    name: "Samsung Galaxy A15",
    category: "Smartphones",
    price: 285000,
    costPrice: 250000,
    stock: 24,
    status: "In Stock",
    barcode: "8806095234567",
    supplier: "Samsung Nigeria",
  },
  {
    id: 2,
    sku: "SKU-10002",
    name: "Apple AirPods Pro",
    category: "Accessories",
    price: 385000,
    costPrice: 340000,
    stock: 8,
    status: "Low Stock",
    barcode: "194253123456",
    supplier: "Apple Distributor",
  },
  {
    id: 3,
    sku: "SKU-10003",
    name: "HP Wireless Mouse",
    category: "Computer Accessories",
    price: 12000,
    costPrice: 8500,
    stock: 56,
    status: "In Stock",
    barcode: "0193015123456",
    supplier: "HP Nigeria",
  },
  {
    id: 4,
    sku: "SKU-10004",
    name: "Oraimo Power Bank 20,000mAh",
    category: "Power Banks",
    price: 32000,
    costPrice: 25000,
    stock: 17,
    status: "In Stock",
    barcode: "6971952434567",
    supplier: "Oraimo",
  },
  {
    id: 5,
    sku: "SKU-10005",
    name: "USB-C Fast Charger",
    category: "Chargers",
    price: 18500,
    costPrice: 13000,
    stock: 4,
    status: "Low Stock",
    barcode: "6971234567890",
    supplier: "Anker Distributor",
  },
  {
    id: 6,
    sku: "SKU-10006",
    name: "Logitech K120 Keyboard",
    category: "Computer Accessories",
    price: 28000,
    costPrice: 21000,
    stock: 32,
    status: "In Stock",
    barcode: "097855098765",
    supplier: "Logitech Nigeria",
  },
  {
    id: 7,
    sku: "SKU-10007",
    name: "Samsung 43\" Smart TV",
    category: "Televisions",
    price: 580000,
    costPrice: 510000,
    stock: 0,
    status: "Out of Stock",
    barcode: "8806096123456",
    supplier: "Samsung Nigeria",
  },
  {
    id: 8,
    sku: "SKU-10008",
    name: "JBL Flip 6 Speaker",
    category: "Speakers",
    price: 165000,
    costPrice: 135000,
    stock: 13,
    status: "In Stock",
    barcode: "6925281998765",
    supplier: "JBL Distributor",
  },
  {
    id: 9,
    sku: "SKU-10009",
    name: "Oraimo FreePods 4",
    category: "Accessories",
    price: 45000,
    costPrice: 35000,
    stock: 7,
    status: "Low Stock",
    barcode: "6971952987654",
    supplier: "Oraimo",
  },
  {
    id: 10,
    sku: "SKU-10010",
    name: "Dell Latitude 5420",
    category: "Laptops",
    price: 785000,
    costPrice: 690000,
    stock: 15,
    status: "In Stock",
    barcode: "884116387654",
    supplier: "Dell Nigeria",
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function AllProducts() {
  const [products, setProducts] = useState(productsData);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stockStatus, setStockStatus] = useState("All Status");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const categories = [
    "All Categories",
    ...new Set(productsData.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.sku.toLowerCase().includes(searchValue) ||
        product.barcode.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      const matchesStatus =
        stockStatus === "All Status" ||
        product.status === stockStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [products, search, category, stockStatus]);

  const totalProducts = products.length;

  const inStock = products.filter(
    (product) => product.status === "In Stock"
  ).length;

  const lowStock = products.filter(
    (product) => product.status === "Low Stock"
  ).length;

  const outOfStock = products.filter(
    (product) => product.status === "Out of Stock"
  ).length;

  const totalInventoryValue = products.reduce(
    (total, product) =>
      total + product.costPrice * product.stock,
    0
  );

  const toggleProduct = (id) => {
    setSelectedProducts((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    if (
      selectedProducts.length === filteredProducts.length
    ) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(
        filteredProducts.map((product) => product.id)
      );
    }
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );

    setSelectedProducts((current) =>
      current.filter((productId) => productId !== id)
    );
  };

  const getStatusIcon = (status) => {
    if (status === "In Stock") {
      return <CheckCircle2 size={13} />;
    }

    if (status === "Low Stock") {
      return <AlertTriangle size={13} />;
    }

    return <XCircle size={13} />;
  };

  return (
    <div className="products-page content-wrapper">

      {/* =========================
          HEADER
      ========================== */}

      <div className="products-header">

        <div>
          <div className="products-breadcrumb">
            <span>Dashboard</span>
            <span>/</span>
            <strong>Products</strong>
          </div>

          <h1>All Products</h1>

          <p>
            Manage your products, inventory and pricing.
          </p>
        </div>


        <div className="header-actions">

          <button className="export-btn">
            <Download size={17} />
            Export
          </button>

          <Link className="add-product-btn"
           href="/admin/products/add">
            <Plus size={18} />
            
            Add Product
          </Link>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================== */}

      <div className="products-stats">

        <div className="product-stat-card">

          <div className="product-stat-icon blue">
            <Package size={21} />
          </div>

          <div>
            <span>Total Products</span>
            <h2>{totalProducts}</h2>
            <small>All products</small>
          </div>

        </div>


        <div className="product-stat-card">

          <div className="product-stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>In Stock</span>
            <h2>{inStock}</h2>
            <small>Available products</small>
          </div>

        </div>


        <div className="product-stat-card">

          <div className="product-stat-icon orange">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Low Stock</span>
            <h2>{lowStock}</h2>
            <small>Needs restocking</small>
          </div>

        </div>


        <div className="product-stat-card">

          <div className="product-stat-icon red">
            <XCircle size={21} />
          </div>

          <div>
            <span>Out of Stock</span>
            <h2>{outOfStock}</h2>
            <small>Currently unavailable</small>
          </div>

        </div>


        <div className="product-stat-card inventory-value">

          <div className="product-stat-icon purple">
            <span>₦</span>
          </div>

          <div>
            <span>Inventory Value</span>
            <h2>
              {formatCurrency(totalInventoryValue)}
            </h2>
            <small>At cost price</small>
          </div>

        </div>

      </div>


      {/* =========================
          PRODUCTS CARD
      ========================== */}

      <div className="products-card">

        {/* TOOLBAR */}

        <div className="products-toolbar">

          <div className="products-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search product, SKU or barcode..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="products-filters">

            <div className="product-filter">

              <Filter size={16} />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={14} />

            </div>


            <div className="product-filter">

              <select
                value={stockStatus}
                onChange={(e) =>
                  setStockStatus(e.target.value)
                }
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>

              <ChevronDown size={14} />

            </div>

          </div>

        </div>


        {/* BULK ACTION BAR */}

        {selectedProducts.length > 0 && (

          <div className="bulk-action-bar">

            <span>
              <strong>
                {selectedProducts.length}
              </strong>{" "}
              product
              {selectedProducts.length > 1
                ? "s"
                : ""}{" "}
              selected
            </span>

            <div>

              <button>
                <Pencil size={15} />
                Edit
              </button>

              <button className="danger">
                <Trash2 size={15} />
                Delete
              </button>

            </div>

          </div>

        )}


        {/* TABLE */}

        <div className="products-table-wrapper">

          <table className="products-table">

            <thead>

              <tr>

                <th className="checkbox-column">

                  <input
                    type="checkbox"
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProducts.length ===
                        filteredProducts.length
                    }
                    onChange={toggleAll}
                  />

                </th>

                <th>PRODUCT</th>
                <th>SKU</th>
                <th>CATEGORY</th>
                <th>SELLING PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
                <th>SUPPLIER</th>
                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {filteredProducts.map((product) => (

                <tr key={product.id}>

                  <td>

                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(
                        product.id
                      )}
                      onChange={() =>
                        toggleProduct(product.id)
                      }
                    />

                  </td>


                  {/* PRODUCT */}

                  <td>

                    <div className="product-info">

                      <div className="product-image">

                        <Package size={20} />

                      </div>

                      <div>

                        <strong>
                          {product.name}
                        </strong>

                        <small>
                          {product.barcode}
                        </small>

                      </div>

                    </div>

                  </td>


                  {/* SKU */}

                  <td>

                    <span className="sku">
                      {product.sku}
                    </span>

                  </td>


                  {/* CATEGORY */}

                  <td>

                    <span className="category-tag">
                      {product.category}
                    </span>

                  </td>


                  {/* PRICE */}

                  <td>

                    <div className="price-info">

                      <strong>
                        {formatCurrency(
                          product.price
                        )}
                      </strong>

                      <small>
                        Cost:{" "}
                        {formatCurrency(
                          product.costPrice
                        )}
                      </small>

                    </div>

                  </td>


                  {/* STOCK */}

                  <td>

                    <div className="stock-value">

                      <strong>
                        {product.stock}
                      </strong>

                      <span>units</span>

                    </div>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`product-status ${product.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >

                      {getStatusIcon(product.status)}

                      {product.status}

                    </span>

                  </td>


                  {/* SUPPLIER */}

                  <td>

                    <span className="supplier">
                      {product.supplier}
                    </span>

                  </td>


                  {/* ACTIONS */}

                  <td>

                    <div className="product-actions">

                      <button title="View">

                        <Eye size={16} />

                      </button>

                      <button title="Edit">

                        <Pencil size={16} />

                      </button>

                      <button
                        title="Delete"
                        className="delete-action"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >

                        <Trash2 size={16} />

                      </button>

                      <button title="More">

                        <MoreVertical size={16} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredProducts.length === 0 && (

            <div className="products-empty">

              <div className="empty-product-icon">
                <Package size={30} />
              </div>

              <h3>No products found</h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          )}

        </div>


        {/* =========================
            FOOTER
        ========================== */}

        <div className="products-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredProducts.length}
            </strong>{" "}
            of{" "}
            <strong>
              {products.length}
            </strong>{" "}
            products
          </span>


          <div className="products-pagination">

            <button>
              <ChevronLeft size={16} />
            </button>

            <button className="active">
              1
            </button>

            <button>2</button>

            <button>3</button>

            <span>...</span>

            <button>10</button>

            <button>
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

