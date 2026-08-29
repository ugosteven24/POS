
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Award,
  Package,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  Save,
} from "lucide-react";

import "./brands.css";

const initialBrands = [
  {
    id: 1,
    name: "Samsung",
    description: "Samsung electronics and mobile devices",
    products: 42,
    status: "Active",
    createdAt: "12 Aug 2026",
  },
  {
    id: 2,
    name: "Apple",
    description: "Apple phones, computers and accessories",
    products: 31,
    status: "Active",
    createdAt: "10 Aug 2026",
  },
  {
    id: 3,
    name: "HP",
    description: "HP laptops, printers and computers",
    products: 27,
    status: "Active",
    createdAt: "08 Aug 2026",
  },
  {
    id: 4,
    name: "Oraimo",
    description: "Mobile accessories and smart devices",
    products: 38,
    status: "Active",
    createdAt: "05 Aug 2026",
  },
  {
    id: 5,
    name: "Anker",
    description: "Chargers, power banks and accessories",
    products: 24,
    status: "Active",
    createdAt: "03 Aug 2026",
  },
  {
    id: 6,
    name: "Logitech",
    description: "Computer peripherals and accessories",
    products: 18,
    status: "Active",
    createdAt: "01 Aug 2026",
  },
  {
    id: 7,
    name: "JBL",
    description: "Wireless and portable audio products",
    products: 16,
    status: "Active",
    createdAt: "29 Jul 2026",
  },
  {
    id: 8,
    name: "Sony",
    description: "Consumer electronics and entertainment",
    products: 11,
    status: "Inactive",
    createdAt: "25 Jul 2026",
  },
];

export default function Brands() {
  const [brands, setBrands] = useState(initialBrands);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingBrand, setEditingBrand] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  /* =========================
     FILTER
  ========================== */

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        brand.name.toLowerCase().includes(searchValue) ||
        brand.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        brand.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [brands, search, statusFilter]);

  /* =========================
     STATS
  ========================== */

  const totalBrands = brands.length;

  const activeBrands = brands.filter(
    (brand) => brand.status === "Active"
  ).length;

  const inactiveBrands = brands.filter(
    (brand) => brand.status === "Inactive"
  ).length;

  const totalProducts = brands.reduce(
    (total, brand) => total + brand.products,
    0
  );

  /* =========================
     ADD BRAND
  ========================== */

  const openAddModal = () => {
    setEditingBrand(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };

  /* =========================
     EDIT BRAND
  ========================== */

  const openEditModal = (brand) => {
    setEditingBrand(brand);

    setFormData({
      name: brand.name,
      description: brand.description,
      status: brand.status,
    });

    setShowModal(true);
  };

  /* =========================
     CLOSE MODAL
  ========================== */

  const closeModal = () => {
    setShowModal(false);
    setEditingBrand(null);
  };

  /* =========================
     FORM CHANGE
  ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =========================
     SAVE BRAND
  ========================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    if (editingBrand) {
      setBrands((current) =>
        current.map((brand) =>
          brand.id === editingBrand.id
            ? {
                ...brand,
                name: formData.name.trim(),
                description: formData.description.trim(),
                status: formData.status,
              }
            : brand
        )
      );
    } else {
      const newBrand = {
        id: Date.now(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        products: 0,
        status: formData.status,
        createdAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      setBrands((current) => [newBrand, ...current]);
    }

    closeModal();
  };

  /* =========================
     DELETE BRAND
  ========================== */

  const deleteBrand = (id) => {
    const brand = brands.find((item) => item.id === id);

    if (!brand) return;

    if (brand.products > 0) {
      alert(
        `You cannot delete "${brand.name}" because it contains ${brand.products} products.`
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this brand?"
    );

    if (!confirmed) return;

    setBrands((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="brands-page content-wrapper">

      {/* =========================
          HEADER
      ========================== */}

      <div className="brands-header">

        <div>

          <div className="brands-breadcrumb">
            <span>Products</span>
            <span>/</span>
            <strong>Brands</strong>
          </div>

          <h1>Product Brands</h1>

          <p>
            Manage the brands associated with your
            products and inventory.
          </p>

        </div>

        <button
          className="add-brand-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Brand
        </button>

      </div>


      {/* =========================
          STATS
      ========================== */}

      <div className="brand-stats">

        <div className="brand-stat-card">

          <div className="brand-stat-icon blue">
            <Award size={21} />
          </div>

          <div>
            <span>Total Brands</span>

            <h2>{totalBrands}</h2>

            <small>All registered brands</small>
          </div>

        </div>


        <div className="brand-stat-card">

          <div className="brand-stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Active</span>

            <h2>{activeBrands}</h2>

            <small>Currently active</small>
          </div>

        </div>


        <div className="brand-stat-card">

          <div className="brand-stat-icon orange">
            <XCircle size={21} />
          </div>

          <div>
            <span>Inactive</span>

            <h2>{inactiveBrands}</h2>

            <small>Disabled brands</small>
          </div>

        </div>


        <div className="brand-stat-card">

          <div className="brand-stat-icon purple">
            <Package size={21} />
          </div>

          <div>
            <span>Products</span>

            <h2>{totalProducts}</h2>

            <small>Across all brands</small>
          </div>

        </div>

      </div>


      {/* =========================
          MAIN CARD
      ========================== */}

      <div className="brands-card">

        {/* TOOLBAR */}

        <div className="brands-toolbar">

          <div className="brand-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="brand-filter">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>


        {/* TABLE */}

        <div className="brands-table-wrapper">

          <table className="brands-table">

            <thead>

              <tr>

                <th>BRAND</th>

                <th>DESCRIPTION</th>

                <th>PRODUCTS</th>

                <th>STATUS</th>

                <th>CREATED</th>

                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {filteredBrands.map((brand) => (

                <tr key={brand.id}>

                  {/* BRAND */}

                  <td>

                    <div className="brand-info">

                      <div className="brand-avatar">
                        <Award size={18} />
                      </div>

                      <div>

                        <strong>
                          {brand.name}
                        </strong>

                        <small>
                          BRAND-
                          {String(brand.id).padStart(4, "0")}
                        </small>

                      </div>

                    </div>

                  </td>


                  {/* DESCRIPTION */}

                  <td>

                    <span className="brand-description">
                      {brand.description ||
                        "No description"}
                    </span>

                  </td>


                  {/* PRODUCTS */}

                  <td>

                    <div className="brand-product-count">

                      <strong>
                        {brand.products}
                      </strong>

                      <span>products</span>

                    </div>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`brand-status ${brand.status.toLowerCase()}`}
                    >

                      {brand.status === "Active" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <XCircle size={13} />
                      )}

                      {brand.status}

                    </span>

                  </td>


                  {/* CREATED */}

                  <td>

                    <span className="brand-created">
                      {brand.createdAt}
                    </span>

                  </td>


                  {/* ACTIONS */}

                  <td>

                    <div className="brand-actions">

                      <button
                        title="View products"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        title="Edit brand"
                        onClick={() =>
                          openEditModal(brand)
                        }
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        title="Delete brand"
                        className="delete-brand"
                        onClick={() =>
                          deleteBrand(brand.id)
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


          {/* EMPTY STATE */}

          {filteredBrands.length === 0 && (

            <div className="brands-empty">

              <div className="empty-brand-icon">
                <Award size={29} />
              </div>

              <h3>No brands found</h3>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>


        {/* FOOTER */}

        <div className="brands-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredBrands.length}
            </strong>{" "}
            of{" "}
            <strong>
              {brands.length}
            </strong>{" "}
            brands
          </span>


          <div className="brand-pagination">

            <button>
              <ChevronLeft size={16} />
            </button>

            <button className="active">
              1
            </button>

            <button>2</button>

            <button>3</button>

            <span>...</span>

            <button>5</button>

            <button>
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          ADD / EDIT MODAL
      ========================== */}

      {showModal && (

        <div className="brand-modal-overlay">

          <div className="brand-modal">

            <div className="brand-modal-header">

              <div>

                <h2>
                  {editingBrand
                    ? "Edit Brand"
                    : "Add Brand"}
                </h2>

                <p>
                  {editingBrand
                    ? "Update brand information."
                    : "Create a new product brand."}
                </p>

              </div>


              <button
                type="button"
                className="close-brand-modal"
                onClick={closeModal}
              >
                <X size={19} />
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="brand-modal-body">

                <div className="brand-form-group">

                  <label>
                    Brand Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Samsung"
                    required
                    autoFocus
                  />

                </div>


                <div className="brand-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe this brand..."
                    rows="4"
                  />

                </div>


                <div className="brand-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>


              <div className="brand-modal-footer">

                <button
                  type="button"
                  className="brand-modal-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="brand-modal-save"
                >
                  <Save size={16} />

                  {editingBrand
                    ? "Update Brand"
                    : "Create Brand"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

