
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  FolderTree,
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

import "./categories.css";

const initialCategories = [
  {
    id: 1,
    name: "Smartphones",
    description: "Mobile phones and smartphones",
    products: 48,
    status: "Active",
    createdAt: "12 Aug 2026",
  },
  {
    id: 2,
    name: "Laptops",
    description: "Laptops and notebook computers",
    products: 24,
    status: "Active",
    createdAt: "10 Aug 2026",
  },
  {
    id: 3,
    name: "Computer Accessories",
    description: "Computer peripherals and accessories",
    products: 86,
    status: "Active",
    createdAt: "08 Aug 2026",
  },
  {
    id: 4,
    name: "Accessories",
    description: "Phone and electronic accessories",
    products: 73,
    status: "Active",
    createdAt: "05 Aug 2026",
  },
  {
    id: 5,
    name: "Chargers",
    description: "Phone and device chargers",
    products: 35,
    status: "Active",
    createdAt: "03 Aug 2026",
  },
  {
    id: 6,
    name: "Power Banks",
    description: "Portable power banks",
    products: 21,
    status: "Active",
    createdAt: "01 Aug 2026",
  },
  {
    id: 7,
    name: "Speakers",
    description: "Bluetooth and portable speakers",
    products: 18,
    status: "Active",
    createdAt: "29 Jul 2026",
  },
  {
    id: 8,
    name: "Televisions",
    description: "Smart TVs and television sets",
    products: 12,
    status: "Inactive",
    createdAt: "25 Jul 2026",
  },
];

export default function Categories() {
  const [categories, setCategories] =
    useState(initialCategories);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });


  /* =========================
     FILTER
  ========================== */

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        category.name
          .toLowerCase()
          .includes(searchValue) ||
        category.description
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        category.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    categories,
    search,
    statusFilter,
  ]);


  /* =========================
     STATS
  ========================== */

  const totalCategories =
    categories.length;

  const activeCategories =
    categories.filter(
      (item) => item.status === "Active"
    ).length;

  const inactiveCategories =
    categories.filter(
      (item) => item.status === "Inactive"
    ).length;

  const totalProducts =
    categories.reduce(
      (total, item) =>
        total + item.products,
      0
    );


  /* =========================
     MODAL
  ========================== */

  const openAddModal = () => {

    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };


  const openEditModal = (category) => {

    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    });

    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };


  /* =========================
     FORM
  ========================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }


    if (editingCategory) {

      setCategories((current) =>
        current.map((category) =>
          category.id ===
          editingCategory.id
            ? {
                ...category,
                name:
                  formData.name.trim(),
                description:
                  formData.description.trim(),
                status:
                  formData.status,
              }
            : category
        )
      );

    } else {

      const newCategory = {
        id:
          Date.now(),
        name:
          formData.name.trim(),
        description:
          formData.description.trim(),
        products: 0,
        status:
          formData.status,
        createdAt:
          new Date().toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),
      };

      setCategories((current) => [
        newCategory,
        ...current,
      ]);
    }

    closeModal();
  };


  /* =========================
     DELETE
  ========================== */

  const deleteCategory = (id) => {

    const category =
      categories.find(
        (item) => item.id === id
      );

    if (!category) return;


    if (category.products > 0) {

      alert(
        `You cannot delete "${category.name}" because it contains ${category.products} products.`
      );

      return;
    }


    const confirmed =
      window.confirm(
        "Are you sure you want to delete this category?"
      );

    if (!confirmed) return;


    setCategories((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };


  return (
    <div className="categories-page content-wrapper">

      {/* =========================
          HEADER
      ========================== */}

      <div className="categories-header">

        <div>

          <div className="categories-breadcrumb">

            <span>Products</span>

            <span>/</span>

            <strong>
              Categories
            </strong>

          </div>

          <h1>
            Product Categories
          </h1>

          <p>
            Organize your products into
            categories for easier inventory
            management.
          </p>

        </div>


        <button
          className="add-category-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>


      {/* =========================
          STAT CARDS
      ========================== */}

      <div className="category-stats">

        <div className="category-stat-card">

          <div className="category-stat-icon blue">
            <FolderTree size={21} />
          </div>

          <div>
            <span>
              Total Categories
            </span>

            <h2>
              {totalCategories}
            </h2>

            <small>
              All categories
            </small>
          </div>

        </div>


        <div className="category-stat-card">

          <div className="category-stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>
              Active
            </span>

            <h2>
              {activeCategories}
            </h2>

            <small>
              Currently active
            </small>
          </div>

        </div>


        <div className="category-stat-card">

          <div className="category-stat-icon orange">
            <XCircle size={21} />
          </div>

          <div>
            <span>
              Inactive
            </span>

            <h2>
              {inactiveCategories}
            </h2>

            <small>
              Disabled categories
            </small>
          </div>

        </div>


        <div className="category-stat-card">

          <div className="category-stat-icon purple">
            <Package size={21} />
          </div>

          <div>
            <span>
              Products
            </span>

            <h2>
              {totalProducts}
            </h2>

            <small>
              Across all categories
            </small>
          </div>

        </div>

      </div>


      {/* =========================
          MAIN CARD
      ========================== */}

      <div className="categories-card">

        {/* TOOLBAR */}

        <div className="categories-toolbar">

          <div className="category-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>


          <div className="category-filter">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
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

        <div className="categories-table-wrapper">

          <table className="categories-table">

            <thead>

              <tr>

                <th>
                  CATEGORY
                </th>

                <th>
                  DESCRIPTION
                </th>

                <th>
                  PRODUCTS
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  CREATED
                </th>

                <th>
                  ACTIONS
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCategories.map(
                (category) => (

                  <tr
                    key={category.id}
                  >

                    {/* CATEGORY */}

                    <td>

                      <div className="category-info">

                        <div className="category-avatar">
                          <FolderTree
                            size={18}
                          />
                        </div>

                        <div>

                          <strong>
                            {category.name}
                          </strong>

                          <small>
                            CAT-
                            {String(
                              category.id
                            ).padStart(
                              4,
                              "0"
                            )}
                          </small>

                        </div>

                      </div>

                    </td>


                    {/* DESCRIPTION */}

                    <td>

                      <span className="category-description">
                        {category.description ||
                          "No description"}
                      </span>

                    </td>


                    {/* PRODUCTS */}

                    <td>

                      <div className="product-count">

                        <strong>
                          {category.products}
                        </strong>

                        <span>
                          products
                        </span>

                      </div>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`category-status ${category.status.toLowerCase()}`}
                      >

                        {category.status ===
                        "Active" ? (
                          <CheckCircle2
                            size={13}
                          />
                        ) : (
                          <XCircle
                            size={13}
                          />
                        )}

                        {category.status}

                      </span>

                    </td>


                    {/* CREATED */}

                    <td>

                      <span className="created-date">
                        {category.createdAt}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td>

                      <div className="category-actions">

                        <button
                          title="View products"
                        >
                          <Eye
                            size={16}
                          />
                        </button>

                        <button
                          title="Edit category"
                          onClick={() =>
                            openEditModal(
                              category
                            )
                          }
                        >
                          <Pencil
                            size={16}
                          />
                        </button>

                        <button
                          title="Delete category"
                          className="delete-category"
                          onClick={() =>
                            deleteCategory(
                              category.id
                            )
                          }
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                        <button
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


          {/* EMPTY */}

          {filteredCategories.length ===
            0 && (

            <div className="categories-empty">

              <div className="empty-category-icon">
                <FolderTree
                  size={29}
                />
              </div>

              <h3>
                No categories found
              </h3>

              <p>
                Try changing your search
                or filter.
              </p>

            </div>

          )}

        </div>


        {/* FOOTER */}

        <div className="categories-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredCategories.length}
            </strong>{" "}
            of{" "}
            <strong>
              {categories.length}
            </strong>{" "}
            categories
          </span>


          <div className="category-pagination">

            <button>
              <ChevronLeft
                size={16}
              />
            </button>

            <button className="active">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <span>
              ...
            </span>

            <button>
              5
            </button>

            <button>
              <ChevronRight
                size={16}
              />
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          ADD / EDIT MODAL
      ========================== */}

      {showModal && (

        <div className="category-modal-overlay">

          <div className="category-modal">

            <div className="category-modal-header">

              <div>

                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p>
                  {editingCategory
                    ? "Update category information."
                    : "Create a new product category."}
                </p>

              </div>


              <button
                className="close-modal"
                onClick={closeModal}
                type="button"
              >
                <X size={19} />
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
            >

              <div className="modal-body">

                <div className="modal-form-group">

                  <label>
                    Category Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Smartphones"
                    required
                    autoFocus
                  />

                </div>


                <div className="modal-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Describe this category..."
                    rows="4"
                  />

                </div>


                <div className="modal-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
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


              <div className="category-modal-footer">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save"
                >
                  <Save size={16} />

                  {editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

