"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  Ban,
  MoreVertical,
} from "lucide-react";

import Link from "next/link";

import "./all-products.css";

import { useToast } from "@/components/Toast";
import ConfirmModal from "@/components/DeleteConfirmModal";
import { GetallData, getProductStats, searchProducts, getProductsByCategory } from "@/services/products/get"
import { getCategories } from "@/services/categories/get";

// ============================================================
// FORMAT CURRENCY
// ============================================================

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
};


// ============================================================
// PRODUCTS PAGE
// ============================================================

export default function AllProducts() {

  const [stats, setStats] = useState({
    total_products: 0,
    in_stock: 0,
    low_stock: 0,
    out_of_stock: 0,
  });

  const toast = useToast();
  // ==========================================================
  // PRODUCTS
  // ==========================================================

  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // ==========================================================
  // CATEGORIES
  // ==========================================================

  const [categories, setCategories] = useState([]);

  async function loadallproducts() {
    const data = await GetallData();
    setProducts(data);

  }

  useEffect(() => {

    async function loadStats() {

      try {

        const data = await getProductStats();

        console.log("PRODUCT STATS:", data);

        setStats(data);

      } catch (error) {

        console.error(
          "Failed to load product statistics:",
          error
        );

      }

    }

    loadStats();

  }, []);

  useEffect(() => {
    loadallproducts()

  }, [])

  const loadProducts = async () => {

    if (loading) return;

    setLoading(true);

    try {

      const result = await searchProducts(
        search,
        null
      );


      if (!result.success) {
        console.error(result.message);
        return;
      }


      setProducts(result.data);

      setNextCursor(
        result.nextCursor
      );

      setHasMore(
        result.hasMore
      );

    } catch (error) {

      console.error(
        "Failed to load products:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    loadProducts();

  }, []);
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

  // ========================================
  // LOAD DROPDOWN DATA
  // ========================================
  async function loadallcategories() {
    const data = await getCategories();
    setCategories(data);

  }
  useEffect(() => {

    async function loadData() {
      loadallcategories()

    }


    loadData();

  }, []);


  async function handleCategoryChange(e) {
    const categoryId = e.target.value;
    const result = await getProductsByCategory(categoryId);
    const alldata = await GetallData();
    if (categoryId === "") {
      setProducts(alldata);
      return;
    } else {
      setProducts(result);
    }



    console.log(categoryId);


  }

  // ==========================================================
  // INITIAL LOADING
  // ==========================================================

  const [loading, setLoading] = useState(false);


  // ==========================================================
  // LOADING MORE
  // ==========================================================

  const [loadingMore, setLoadingMore] = useState(false);


  // ==========================================================
  // HAS MORE PRODUCTS
  // ==========================================================

  const [hasMore, setHasMore] = useState(true);


  // ==========================================================
  // NEXT CURSOR
  // ==========================================================

  const [nextCursor, setNextCursor] = useState(null);


  // ==========================================================
  // SEARCH
  // ==========================================================

  const [search, setSearch] = useState("");


  // ==========================================================
  // CATEGORY
  // ==========================================================

  const [category, setCategory] = useState("All Categories");


  // ==========================================================
  // STOCK STATUS
  // ==========================================================

  const [stockStatus, setStockStatus] = useState("All Status");




  // ==========================================================
  // SELECTED PRODUCTS
  // ==========================================================

  const [selectedProducts, setSelectedProducts] = useState([]);


  // ==========================================================
  // DELETE MODAL
  // ==========================================================

  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const [selectedProduct, setSelectedProduct] = useState(null);


  // ==========================================================
  // INFINITE SCROLL REF
  // ==========================================================

  const loadMoreRef = useRef(null);




  const categoryOptions = useMemo(() => {
    return [
      {
        name: "All Categories",
        id: "",
      },

      ...categories.map((category) => ({
        name: category.name,
        id: category.id,
      })),
    ];
  }, [categories]);


  // ==========================================================
  // STATISTICS
  // ==========================================================



  // ==========================================================
  // SELECT PRODUCT
  // ==========================================================

  const toggleProduct = (id) => {

    setSelectedProducts(
      (current) =>

        current.includes(id)

          ? current.filter(
            (item) =>
              item !== id
          )

          : [
            ...current,
            id,
          ]
    );

  };


  // ==========================================================
  // SELECT ALL
  // ==========================================================

  const toggleAll = () => {

    if (
      selectedProducts.length ===
      products.length
    ) {

      setSelectedProducts([]);

    } else {

      setSelectedProducts(
        products.map(
          (product) =>
            product.id
        )
      );

    }

  };


  // ==========================================================
  // STATUS ICON
  // ==========================================================

  const getStatusIcon =
    (status) => {

      if (
        status ===
        "In Stock"
      ) {

        return (
          <CheckCircle2
            size={13}
          />
        );

      }


      if (
        status ===
        "Low Stock"
      ) {

        return (
          <AlertTriangle
            size={13}
          />
        );

      }


      return (
        <XCircle
          size={13}
        />
      );

    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="products-page content-wrapper">


      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="products-header">

        <div>

          <div className="products-breadcrumb">

            <span>
              Dashboard
            </span>

            <span>
              /
            </span>

            <strong>
              Products
            </strong>

          </div>


          <h1>
            All Products
          </h1>


          <p>
            Manage your products,
            inventory and pricing.
          </p>

        </div>


        <div className="header-actions">

          <button
            type="button"
            className="export-btn"
          >

            <Download size={17} />

            Export

          </button>


          <Link
            className="add-product-btn"
            href="/admin/products/add"
          >

            <Plus size={18} />

            Add Product

          </Link>

        </div>

      </div>


      {/* ====================================================
          STATISTICS
      ==================================================== */}

      <div className="products-stats">


        <div className="product-stat-card">

          <div className="product-stat-icon blue">

            <Package size={21} />

          </div>


          <div>

            <span>
              Products Loaded
            </span>

            <h2>
              {stats?.total_products || 0}
            </h2>

            <small>
              Loaded products
            </small>

          </div>

        </div>


        <div className="product-stat-card">

          <div className="product-stat-icon green">

            <CheckCircle2 size={21} />

          </div>


          <div>

            <span>
              In Stock
            </span>

            <h2>
              {stats?.in_stock || 0}
            </h2>

            <small>
              Loaded products
            </small>

          </div>

        </div>


        <div className="product-stat-card">

          <div className="product-stat-icon orange">

            <AlertTriangle size={21} />

          </div>


          <div>

            <span>
              Low Stock
            </span>

            <h2>
              {stats?.low_stock || 0}
            </h2>

            <small>
              Needs restocking
            </small>

          </div>

        </div>


        <div className="product-stat-card">

          <div className="product-stat-icon red">

            <XCircle size={21} />

          </div>


          <div>

            <span>
              Out of Stock
            </span>

            <h2>
              {stats?.out_of_stock || 0}
            </h2>

            <small>
              Loaded products
            </small>

          </div>

        </div>


        <div className="product-stat-card inventory-value">

          <div className="product-stat-icon purple">

            <span>
              ₦
            </span>

          </div>


          <div>

            <span>
              Inventory Value
            </span>

            <h2>
              {/* {formatCurrency(
                totalInventoryValue
              )} */}
            </h2>

            <small>
              Loaded products at cost
            </small>

          </div>

        </div>

      </div>


      {/* ====================================================
          PRODUCTS CARD
      ==================================================== */}

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
              onChange={(e) => handleSearch(e.target.value)}
            />

          </div>


          <div className="products-filters">


            {/* CATEGORY */}

            <div className="product-filter">

              <Filter size={16} />

              <select onChange={handleCategoryChange}>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <ChevronDown size={14} />

            </div>


            {/* STATUS */}

            <div className="product-filter">

              <select
                value={stockStatus}
                onChange={(e) => {

                  setStockStatus(
                    e.target.value
                  );

                }}
              >

                <option>
                  All Status
                </option>

                <option>
                  In Stock
                </option>

                <option>
                  Low Stock
                </option>

                <option>
                  Out of Stock
                </option>

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

              <strong>
                {
                  selectedProducts.length
                }
              </strong>{" "}

              product
              {
                selectedProducts.length > 1
                  ? "s"
                  : ""
              }{" "}

              selected

            </span>


            <div>

              <button type="button">

                <Pencil size={15} />

                Edit

              </button>


              <button
                type="button"
                className="danger"
              >

                <Trash2 size={15} />

                Delete

              </button>

            </div>

          </div>

        )}


        {/* ==================================================
            TABLE
        ================================================== */}

        <div className="products-table-wrapper">


          {/* =================================================
              INITIAL LOADING
          ================================================= */}

          {loading ? (

            <div className="products-empty">

              <div className="empty-product-icon">

                <Package size={30} />

              </div>

              <h3>
                Loading products...
              </h3>

              <p>
                Please wait.
              </p>

            </div>

          ) : (

            <>

              <table className="products-table">

                <thead>

                  <tr>

                    <th className="checkbox-column">

                      <input
                        type="checkbox"
                        checked={
                          products.length > 0 &&
                          selectedProducts.length ===
                          products.length
                        }
                        onChange={
                          toggleAll
                        }
                      />

                    </th>


                    <th>
                      PRODUCT
                    </th>


                    <th>
                      SKU
                    </th>


                    <th>
                      CATEGORY
                    </th>


                    <th>
                      SELLING PRICE
                    </th>


                    <th>
                      STOCK
                    </th>


                    <th>
                      STATUS
                    </th>


                    <th>
                      BRAND
                    </th>


                    <th>
                      ACTIONS
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map(
                    (product) => (

                      <tr
                        key={
                          product.id
                        }
                      >


                        {/* CHECKBOX */}

                        <td>

                          <input
                            type="checkbox"
                            checked={
                              selectedProducts.includes(
                                product.id
                              )
                            }
                            onChange={() =>
                              toggleProduct(
                                product.id
                              )
                            }
                          />

                        </td>


                        {/* PRODUCT */}

                        <td>

                          <div className="product-info">

                            <div>

                              <strong>
                                {
                                  product.product_name
                                }
                              </strong>


                              <small>
                                {
                                  product.barcode ||
                                  "No barcode"
                                }
                              </small>

                            </div>

                          </div>

                        </td>


                        {/* SKU */}

                        <td>

                          <span className="sku">

                            {
                              product.sku
                            }

                          </span>

                        </td>


                        {/* CATEGORY */}

                        <td>

                          <span className="category-tag">

                            {
                              product.category_name
                            }

                          </span>

                        </td>


                        {/* PRICE */}

                        <td>

                          <div className="price-info">

                            <strong>

                              {
                                formatCurrency(
                                  product.selling_price
                                )
                              }

                            </strong>


                            <small>

                              Cost:{" "}

                              {
                                formatCurrency(
                                  product.cost_price
                                )
                              }

                            </small>

                          </div>

                        </td>


                        {/* STOCK */}

                        <td>

                          <div className="stock-value">

                            <strong>
                              {
                                product.reorder_level
                              }
                            </strong>

                            <span>
                              units
                            </span>

                          </div>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`product-status ${product.status ===
                              "active"
                              ? "status-active"
                              : "status-inactive"
                              }`}
                          >

                            {product.status ===
                              "active" ? (
                              <CheckCircle2
                                size={10}
                              />
                            ) : (
                              <Ban
                                size={10}
                              />
                            )}

                            {product.status}

                          </span>

                        </td>


                        {/* BRAND */}

                        <td>

                          <span className="supplier">

                            {
                              product.brand_name ||
                              "N/A"
                            }

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="product-actions">

                            <button
                              type="button"
                              title="View"
                            >

                              <Eye size={16} />

                            </button>


                            <Link
                              title="Edit"
                              href={`/admin/products/edit/${product.id}`}
                            >

                              <Pencil size={16} />

                            </Link>


                            <button
                              type="button"
                              title="Delete"
                              className="delete-action"
                              onClick={() => {

                                setSelectedProduct(
                                  product
                                );

                                setShowDeleteModal(
                                  true
                                );

                              }}
                            >

                              <Trash2 size={16} />

                            </button>


                            <button
                              type="button"
                              title="More"
                            >

                              <MoreVertical
                                size={16}
                              />

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>


              {/* =================================================
                  NO PRODUCTS
              ================================================= */}

              {products.length === 0 && (

                <div className="products-empty">

                  <div className="empty-product-icon">

                    <Package size={30} />

                  </div>


                  <h3>
                    No products found
                  </h3>


                  <p>
                    Try changing your
                    search or filters.
                  </p>

                </div>

              )}


              {/* =================================================
                  INFINITE SCROLL LOADER
              ================================================= */}

              <div
                ref={loadMoreRef}
                className="products-load-more"
              >

                {loadingMore && (

                  <div className="products-loading-more">

                    <Package
                      size={18}
                    />

                    <span>
                      Loading more products...
                    </span>

                  </div>

                )}


                {!loadingMore &&
                  hasMore &&
                  products.length > 0 && (

                    <span>
                      Scroll down to load more
                    </span>

                  )}


                {!hasMore &&
                  products.length > 0 && (

                    <span>
                      All products loaded
                    </span>

                  )}

              </div>

            </>

          )}


          {/* =================================================
              CONFIRM MODAL
          ================================================= */}

          <ConfirmModal

            isOpen={
              showDeleteModal
            }

            title="Deactivate Product?"

            message={`Are you sure you want to deactivate "${selectedProduct?.name}"?`}

            confirmText="Deactivate"

            cancelText="Cancel"


            onCancel={() => {

              setShowDeleteModal(
                false
              );

              setSelectedProduct(
                null
              );

            }}


            onConfirm={async () => {

              try {

                const response =
                  await fetch(
                    "/api/products/update",
                    {
                      method: "PUT",

                      headers: {
                        "Content-Type":
                          "application/json",
                      },

                      body:
                        JSON.stringify({
                          table:
                            "products",

                          id:
                            selectedProduct.id,

                          data: {
                            status:
                              "inactive",
                          },

                        }),
                    }
                  );


                const result =
                  await response.json();


                if (!response.ok) {

                  throw new Error(
                    result.message ||
                    "Failed to deactivate product."
                  );

                }


                // Remove product from UI

                setProducts(
                  (current) =>
                    current.filter(
                      (product) =>
                        product.id !==
                        selectedProduct.id
                    )
                );


                setSelectedProducts(
                  (current) =>
                    current.filter(
                      (id) =>
                        id !==
                        selectedProduct.id
                    )
                );


                setShowDeleteModal(
                  false
                );

                setSelectedProduct(
                  null
                );


                toast.success(
                  "Product deactivated successfully."
                );

              } catch (error) {

                console.error(
                  error
                );

                toast.error(
                  error.message ||
                  "Failed to deactivate product."
                );

              }

            }}

          />

        </div>


        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="products-footer">

          <span>

            Showing{" "}

            <strong>
              {products.length}
            </strong>{" "}

            products

          </span>


          <div className="products-scroll-status">

            {loadingMore ? (

              <span>
                Loading...
              </span>

            ) : hasMore ? (

              <span>
                More products available
              </span>

            ) : (

              <span>
                End of products
              </span>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}