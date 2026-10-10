"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  Package,
  CheckCircle2,
  ChevronDown,
  Ban,
  X,
} from "lucide-react";

import ConfirmModal from "@/components/DeleteConfirmModal";
import {
  GetallData,
  searchProducts,
  getProductsByCategory,
} from "@/services/products/get";
import { getCategories } from "@/services/categories/get";
import "./modal.css";

// ============================================================
// HELPERS
// ============================================================

const STOCK_FILTERS = ["All Status", "In Stock", "Low Stock", "Out of Stock"];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

// Accepts either a plain array or a { success, data } style response.
const toArray = (value) =>
  Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : [];

const getStock = (product) => Number(product.stock ?? product.quantity ?? 0);

const getStockState = (product) => {
  const stock = getStock(product);
  const reorder = Number(product.reorder_level || 0);

  if (stock <= 0) return "Out of Stock";
  if (stock <= reorder) return "Low Stock";
  return "In Stock";
};

// ============================================================
// PRODUCTS PAGE
// ============================================================

export default function TableData() {

  // ---------- Data ----------
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // ---------- Filters ----------
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stockStatus, setStockStatus] = useState("All Status");

  // ---------- Selection & modals ----------
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);
  const [deleteIds, setDeleteIds] = useState(null); // null = modal closed
  const [deactivating, setDeactivating] = useState(false);

  const requestId = useRef(0);

  // ==========================================================
  // DEBOUNCE SEARCH
  // ==========================================================

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // ==========================================================
  // LOAD CATEGORIES (once)
  // ==========================================================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategories(toArray(await getCategories()));
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);

  // ==========================================================
  // LOAD PRODUCTS (one loader for search + category)
  // ==========================================================

  const loadProducts = useCallback(async () => {
    const currentRequest = ++requestId.current;
    const query = debouncedSearch.trim();

    try {
      setLoading(true);
      setLoadError("");

      let list = [];

      if (categoryId) {
        list = toArray(await getProductsByCategory(categoryId));

        if (query) {
          const q = query.toLowerCase();
          list = list.filter(
            (product) =>
              product.product_name?.toLowerCase().includes(q) ||
              product.sku?.toLowerCase().includes(q) ||
              product.barcode?.toLowerCase().includes(q)
          );
        }
      } else if (query) {
        const result = await searchProducts({ search: query, limit: 50 });

        if (!result?.success) {
          throw new Error(result?.message || "Search failed");
        }

        list = toArray(result);
      } else {
        list = toArray(await GetallData());
      }

      // Ignore responses from older, slower requests.
      if (currentRequest !== requestId.current) return;

      setProducts(list);
      setSelectedProducts([]);
    } catch (error) {
      if (currentRequest !== requestId.current) return;

      console.error("Failed to load products:", error);
      setProducts([]);
      setLoadError("Could not load products. Please try again.");
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, [debouncedSearch, categoryId]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ==========================================================
  // VISIBLE PRODUCTS (stock filter is applied here)
  // ==========================================================

  const visibleProducts = useMemo(() => {
    if (stockStatus === "All Status") return products;
    return products.filter((product) => getStockState(product) === stockStatus);
  }, [products, stockStatus]);

  const categoryOptions = useMemo(
    () => [
      { id: "", name: "All Categories" },
      ...categories.map((c) => ({ id: String(c.id), name: c.name })),
    ],
    [categories]
  );

  // ==========================================================
  // SELECTION
  // ==========================================================

  const toggleProduct = (id) => {
    setSelectedProducts((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const allSelected =
    visibleProducts.length > 0 &&
    visibleProducts.every((product) => selectedProducts.includes(product.id));

  const toggleAll = () => {
    setSelectedProducts(allSelected ? [] : visibleProducts.map((p) => p.id));
  };

  // ==========================================================
  // DEACTIVATE (single or bulk)
  // ==========================================================

  const deactivateProducts = async () => {
    if (!deleteIds || deleteIds.length === 0) return;

    try {
      setDeactivating(true);

      const results = await Promise.allSettled(
        deleteIds.map(async (id) => {
          const response = await fetch("/api/products/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table: "products",
              id,
              data: { status: "inactive" },
            }),
          });

          const result = await response.json().catch(() => ({}));

          if (!response.ok) {
            throw new Error(result.message || "Failed to deactivate product.");
          }

          return id;
        })
      );

      const succeeded = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);
      const failed = results.length - succeeded.length;

      if (succeeded.length > 0) {
        setProducts((current) =>
          current.filter((product) => !succeeded.includes(product.id))
        );
        setSelectedProducts((current) =>
          current.filter((id) => !succeeded.includes(id))
        );
   
      }

      if (failed > 0) {
 
      }
    } catch (error) {
      console.error(error);

    } finally {
      setDeactivating(false);
      setDeleteIds(null);
    }
  };

  const deleteMessage = (() => {
    if (!deleteIds) return "";

    if (deleteIds.length === 1) {
      const product = products.find((p) => p.id === deleteIds[0]);
      return `Are you sure you want to deactivate "${
        product?.product_name || "this product"
      }"?`;
    }

    return `Are you sure you want to deactivate ${deleteIds.length} products?`;
  })();

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="products-card">
      {/* ==================================================
          TOOLBAR
      ================================================== */}
      <div className="products-toolbar">
        <div className="products-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search product, SKU or barcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="products-filters">
          {/* CATEGORY */}
          <div className="product-filter">
            <Filter size={16} />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option.id || "all"} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>

          {/* STOCK STATUS */}
          <div className="product-filter">
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
            >
              {STOCK_FILTERS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* ==================================================
          BULK ACTION BAR
      ================================================== */}
      {selectedProducts.length > 0 && (
        <div className="bulk-action-bar">
          <span>
            <strong>{selectedProducts.length}</strong> product
            {selectedProducts.length > 1 ? "s" : ""} selected
          </span>

          <div>
            <button
              type="button"
              className="danger"
              onClick={() => setDeleteIds(selectedProducts)}
            >
              <Trash2 size={15} />
              Deactivate
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          TABLE
      ================================================== */}
      <div className="products-table-wrapper">
        {loading && products.length === 0 ? (
          <div className="products-empty">
            <div className="empty-product-icon">
              <Package size={30} />
            </div>
            <h3>Loading products...</h3>
            <p>Please wait.</p>
          </div>
        ) : (
          <>
            <table className="products-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                    />
                  </th>
                  <th>PRODUCT</th>
                  <th>SKU</th>
                  <th>CATEGORY</th>
                  <th>SELLING PRICE</th>
                  <th>STOCK</th>
                  <th>STATUS</th>
                  <th>BRAND</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map((product) => {
                  const stockState = getStockState(product);

                  return (
                    <tr key={product.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                        />
                      </td>

                      <td>
                        <div className="product-info">
                          <div>
                            <strong>{product.product_name}</strong>
                            <small>{product.barcode || "No barcode"}</small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="sku">{product.sku}</span>
                      </td>

                      <td>
                        <span className="category-tag">
                          {product.category_name}
                        </span>
                      </td>

                      <td>
                        <div className="price-info">
                          <strong>{formatCurrency(product.selling_price)}</strong>
                          <small>Cost: {formatCurrency(product.cost_price)}</small>
                        </div>
                      </td>

                      <td>
                        <div className="stock-value">
                          <strong>{getStock(product)}</strong>
                          <span>
                            units
                            {stockState !== "In Stock" && ` · ${stockState}`}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`product-status ${
                            product.status === "active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {product.status === "active" ? (
                            <CheckCircle2 size={10} />
                          ) : (
                            <Ban size={10} />
                          )}
                          {product.status}
                        </span>
                      </td>

                      <td>
                        <span className="supplier">
                          {product.brand_name || "N/A"}
                        </span>
                      </td>

                      <td>
                        <div className="product-actions">
                          <button
                            type="button"
                            title="View"
                            onClick={() => setViewProduct(product)}
                          >
                            <Eye size={16} />
                          </button>

                          {/* <Link
                            href={`/products/edit/${product.id}`}
                            title="Edit"
                            className="product-edit-link"
                          >
                            <Pencil size={16} />
                          </Link> */}

                          <button
                            type="button"
                            title="Deactivate"
                            className="delete-action"
                            onClick={() => setDeleteIds([product.id])}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {visibleProducts.length === 0 && (
              <div className="products-empty">
                <div className="empty-product-icon">
                  <Package size={30} />
                </div>
                <h3>{loadError ? "Something went wrong" : "No products found"}</h3>
                <p>{loadError || "Try changing your search or filters."}</p>
              </div>
            )}
          </>
        )}

        {/* =================================================
            DEACTIVATE CONFIRM
        ================================================= */}
        <ConfirmModal
          isOpen={deleteIds !== null}
          title="Deactivate Product?"
          message={deleteMessage}
          confirmText={deactivating ? "Deactivating..." : "Deactivate"}
          cancelText="Cancel"
          onCancel={() => {
            if (!deactivating) setDeleteIds(null);
          }}
          onConfirm={deactivateProducts}
        />

        {/* =================================================
            VIEW PRODUCT MODAL
        ================================================= */}
        {viewProduct && (
          <div
            className="purchase-modal-overlay"
            onMouseDown={() => setViewProduct(null)}
          >
            <div
              className="purchase-details-modal"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="purchase-modal-header">
                <div>
                  <div className="purchase-modal-icon">
                    <Package size={17} />
                  </div>
                  <div>
                    <h2>Product Details</h2>
                    <span>{viewProduct.sku || viewProduct.barcode}</span>
                  </div>
                </div>

                <button
                  type="button"
                  title="Close"
                  onClick={() => setViewProduct(null)}
                >
                  <X size={16} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="purchase-modal-content">
                {/* PRODUCT */}
                <div className="product-modal-section">
                  <div className="product-modal-heading">Product</div>
                  <div className="purchase-modal-details">
                    {[
                      ["Name", viewProduct.product_name || "-"],
                      ["SKU", viewProduct.sku || "-"],
                      ["Barcode", viewProduct.product_barcode || "No barcode"],
                      ["Category", viewProduct.category_name || "-"],
                      ["Brand", viewProduct.brand_name || "N/A"],
                      ["Status", viewProduct.status || "-"],
                    ].map(([label, value]) => (
                      <div className="purchase-modal-detail" key={label}>
                        <small>{label}</small>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PRICING */}
                <div className="product-modal-section">
                  <div className="product-modal-heading">Pricing</div>
                  <div className="purchase-modal-details">
                    {[
                      [
                        "Selling price",
                        formatCurrency(viewProduct.selling_price),
                      ],
                      ["Cost price", formatCurrency(viewProduct.cost_price)],
                      [
                        "Profit per unit",
                        formatCurrency(
                          Number(viewProduct.selling_price || 0) -
                            Number(viewProduct.cost_price || 0)
                        ),
                      ],
                    ].map(([label, value]) => (
                      <div className="purchase-modal-detail" key={label}>
                        <small>{label}</small>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* STOCK */}
                <div className="product-modal-section">
                  <div className="product-modal-heading">Stock</div>
                  <div className="purchase-modal-details">
                    {[
                      ["In stock", `${getStock(viewProduct)} units`],
                      ["Reorder level", `${viewProduct.reorder_level ?? 0} units`],
                      ["Stock status", getStockState(viewProduct)],
                    ].map(([label, value]) => (
                      <div className="purchase-modal-detail" key={label}>
                        <small>{label}</small>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="product-modal-footer">
                <button
                  type="button"
                  className="product-modal-btn"
                  onClick={() => setViewProduct(null)}
                >
                  Close
                </button>

                {/* <Link
                  href={`/products/edit/${viewProduct.id}`}
                  className="product-modal-btn primary"
                >
                  <Pencil size={13} />
                  Edit Product
                </Link> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================
          FOOTER
      ==================================================== */}
      <div className="products-footer">
        <span>
          Showing <strong>{visibleProducts.length}</strong> product
          {visibleProducts.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}