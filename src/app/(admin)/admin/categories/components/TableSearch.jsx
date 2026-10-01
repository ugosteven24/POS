
"use client";

import React, { useEffect, useState } from "react";

import {
  Search,
  FolderTree,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  MoreVertical,
  X,
  Save,
} from "lucide-react";

import { useToast } from "@/components/Toast";
import ConfirmModal from "@/components/DeleteConfirmModal";
import EditModal from "@/components/EditCategoryModal";
import ViewCateModal from "@/components/ViewModal";
import {
  getCategories,
  fetchCategories,
  stausCategories,
  deactivateCategory,
  updateCategory,
} from "@/services/categories/get";

export default function TableCategories() {
  const toast = useToast();

  // ========================================
  // STATE
  // ========================================

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  // ========================================
  // EDIT MODAL STATE
  // ========================================

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [editName, setEditName] = useState("");

  const [editDescription, setEditDescription] = useState("");

  const [editStatus, setEditStatus] = useState("active");
  const [createdStatus, setcreatedStatus] = useState("");

  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  // ========================================
  // GET ALL CATEGORIES
  // ========================================

  async function loadCategories() {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data || []);

    } catch (error) {
      console.error("Error loading categories:", error);

      toast.error?.("Failed to load categories");

      setCategories([]);

    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // SEARCH CATEGORIES
  // ========================================

  async function fetchloadCategories(searchValue) {
    try {
      setLoading(true);

      const data = await fetchCategories(searchValue);

      setCategories(data || []);

    } catch (error) {
      console.error("Error searching categories:", error);

      toast.error?.("Failed to search categories");

      setCategories([]);

    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // FILTER BY STATUS
  // ========================================

  async function statusloadCategories(statusValue) {
    try {
      setLoading(true);

      const data = await stausCategories(statusValue);

      setCategories(data || []);

    } catch (error) {
      console.error("Error filtering categories:", error);

      toast.error?.("Failed to filter categories");

      setCategories([]);

    } finally {
      setLoading(false);
    }
  }


  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
      return;
    }

    try {
      setDeleting(true);

      const result = await deactivateCategory(
        selectedCategory.id
      );

      if (!result?.success) {
        toast.error?.(
          result?.message || "Failed to delete category"
        );

        return;
      }

      toast.success?.(
        result.message || "Category deleted successfully"
      );

      // Close modal
      setShowDeleteModal(false);

      // Clear selected category
      setSelectedCategory(null);

      // Refresh categories
      await loadCategories();

    } catch (error) {
      console.error(
        "Error deleting category:",
        error
      );

      toast.error?.(
        "Failed to delete category"
      );

    } finally {
      setDeleting(false);
    }
  };
  // ========================================
  // INITIAL LOAD
  // ========================================


  const openEditModal = (category) => {
    setSelectedCategory(category);

    setEditName(category.name || "");
    setEditDescription(category.description || "");
    setEditStatus(category.status?.toLowerCase() || "active");

    setShowEditModal(true);
  };

  const openViewModal = (category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedCategory(null);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  // ========================================
  // SEARCH CHANGE
  // ========================================

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      loadCategories();
      return;
    }

    fetchloadCategories(value);
  };

  // ========================================
  // STATUS CHANGE
  // ========================================

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setStatusFilter(value);

    if (value === "all") {
      loadCategories();
      return;
    }

    statusloadCategories(value);
  };

  // ========================================
  // OPEN EDIT MODAL
  // ========================================



  // ========================================
  // CLOSE EDIT MODAL
  // ========================================

  const handleCloseEditModal = () => {
    setShowEditModal(false);

    setSelectedCategory(null);

    setEditName("");

    setEditDescription("");

    setEditStatus("active");
  };

  // ========================================
  // SAVE EDIT
  // ========================================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!selectedCategory.id) {
      return;
    }

    if (!selectedCategory.name.trim()) {
      toast.error?.("Category name is required");
      return;
    }

    try {
      setSaving(true);

      const result = await updateCategory({
        id: selectedCategory.id,
        name: editName,
        description: editDescription,
        status: editStatus,
      });

      if (!result?.success) {
        toast.error?.(
          result?.message || "Failed to update category"
        );
        return;
      }

      toast.success?.(
        result.message || "Category updated successfully"
      );

      handleCloseEditModal();

      await loadCategories();

    } catch (error) {
      console.error("Error updating category:", error);

      toast.error?.("Failed to update category");

    } finally {
      setSaving(false);
    }
  };
  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="categories-card">

      {/* ========================================
          TOOLBAR
      ======================================== */}

      <div className="categories-toolbar">

        <div className="category-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={handleSearchChange}
          />

        </div>

        <div className="category-filter">

          <select
            value={statusFilter}
            onChange={handleStatusChange}
          >

            <option value="all">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>

      {/* ========================================
          TABLE
      ======================================== */}

      <div className="categories-table-wrapper">

        {loading ? (

          <div className="categories-empty">

            <div className="empty-category-icon">
              <FolderTree size={29} />
            </div>

            <h3>
              Loading categories...
            </h3>

            <p>
              Please wait.
            </p>

          </div>

        ) : categories.length === 0 ? (

          <div className="categories-empty">

            <div className="empty-category-icon">
              <FolderTree size={29} />
            </div>

            <h3>
              No categories found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <table className="categories-table">

            <thead>

              <tr>

                <th>CATEGORY</th>
{/* 
                <th>DESCRIPTION</th> */}

             

                <th>STATUS</th>

                <th>CREATED</th>

                <th>ACTIONS</th>

              </tr>

            </thead>

            <tbody>

              {categories.map((category) => (

                <tr key={category.id}>

                  {/* CATEGORY */}

                  <td>

                    <div className="category-info">

                      <div className="category-avatar">
                        <FolderTree size={18} />
                      </div>

                      <div>

                        <strong>
                          {category.name}
                        </strong>

                        <small>
                          CAT-
                          {String(category.id).padStart(4, "0")}
                        </small>

                      </div>

                    </div>

                  </td>

                  {/* DESCRIPTION */}

                  {/* <td>

                    <span className="category-description">

                      {category.description ||
                        "No description"}

                    </span>

                  </td> */}

                  {/* PRODUCTS */}

              
                  {/* STATUS */}

                  <td>

                    <span
                      className={`category-status ${category.status?.toLowerCase()}`}
                    >

                      {category.status?.toLowerCase() ===
                        "active" ? (

                        <CheckCircle2 size={13} />

                      ) : (

                        <XCircle size={13} />

                      )}

                      {category.status}

                    </span>

                  </td>

                  {/* CREATED */}

                  <td>

                    <span className="created-date">
                      {Date(category.created_at).toLocaleLowerCase()}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="category-actions">

                      {/* VIEW */}

                      <button
                        type="button"
                        title="View products"
                        onClick={() => openViewModal(category)}
                      >
                        <Eye size={16} />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => {
                          openEditModal(category);

                        }}
                      >
                        <Pencil size={16} />
                      </button>
                      {/* DELETE */}

                      <button
                        type="button"
                        title="Delete category"
                        className="delete-category"
                        onClick={() => openDeleteModal(category)}
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* MORE */}

                      <button
                        type="button"
                        title="More"
                      >
                        <MoreVertical size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}
        <ConfirmModal
          isOpen={showDeleteModal}

          title="Delete Category?"

          message={
            selectedCategory
              ? `Are you sure you want to delete "${selectedCategory.name}"?`
              : "Are you sure you want to delete this category?"
          }

          confirmText={deleting ? "Deleting..." : "Delete"}

          cancelText="Cancel"

          onCancel={() => {
            if (!deleting) {
              setShowDeleteModal(false);
              setSelectedCategory(null);
            }
          }}

          onConfirm={handleDeleteCategory}
        />
      </div>



      {/* ========================================
          EDIT CATEGORY MODAL
      ======================================== */}

      {showEditModal && (
        <EditModal
          category={selectedCategory}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
          editName={editName}
          setEditName={setEditName}
          title="Categories"
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          saving={saving}
        />
      )}





      //////////////////ViewCateModal...........

      {showViewModal && (
        <ViewCateModal
          category={selectedCategory}
          title="Categories"
          onClose={handleCloseViewModal}
        />
      )}


    </div>
  );
}

