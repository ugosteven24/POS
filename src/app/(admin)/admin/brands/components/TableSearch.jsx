
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

import ConfirmModal from "@/components/DeleteConfirmModal";
import EditModal from "@/components/EditCategoryModal";
import ViewCateModal from "@/components/ViewModal";
import {
  getBrands,
  fetchBrands,
  stausBrands,
  deactivateBrands,
  updateBrands,
} from "@/services/brands/get";

export default function TableBrands() {


  // ========================================
  // STATE
  // ========================================

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  // ========================================
  // EDIT MODAL STATE
  // ========================================

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(null);

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

  async function loadBrands() {
    try {
      setLoading(true);

      const data = await getBrands();

      setBrands(data || []);

    } catch (error) {
      console.error("Error loading brands:", error);

    

      setBrands([]);

    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // SEARCH CATEGORIES
  // ========================================

  async function fetchloadBrands(searchValue) {
    try {
      setLoading(true);

      const data = await fetchBrands(searchValue);

      setBrands(data || []);

    } catch (error) {
      console.error("Error searching brands:", error);

    

      setBrands([]);

    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // FILTER BY STATUS
  // ========================================

  async function statusloadBrands(statusValue) {
    try {
      setLoading(true);

      const data = await stausBrands(statusValue);

      setBrands(data || []);

    } catch (error) {
      console.error("Error filtering brands:", error);

     
      

      setBrands([]);

    } finally {
      setLoading(false);
    }
  }


  const openDeleteModal = (brands) => {
    setSelectedBrand(brands);
    setShowDeleteModal(true);
  };

  const handleDeleteBrand = async () => {
    if (!selectedBrand) {
      return;
    }

    try {
      setDeleting(true);

      const result = await deactivateBrands(
        selectedBrand.id
      );

      if (!result?.success) {
       
        
        return;
      }

 

      // Close modal
      setShowDeleteModal(false);

      // Clear selected category
      setSelectedBrand(null);

      // Refresh categories
      await loadBrands();

    } catch (error) {
      console.error(
        "Error deleting brands:",
        error
      );

     
    } finally {
      setDeleting(false);
    }
  };
  // ========================================
  // INITIAL LOAD
  // ========================================


  const openEditModal = (brands) => {
    setSelectedBrand(brands);

    setEditName(brands.name || "");
    setEditDescription(brands.description || "");
    setEditStatus(brands.status?.toLowerCase() || "active");

    setShowEditModal(true);
  };

  const openViewModal = (brands) => {
    setSelectedBrand(brands);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedBrand(null);
  };
  useEffect(() => {
    loadBrands();
  }, []);

  // ========================================
  // SEARCH CHANGE
  // ========================================

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      loadBrands();
      return;
    }

    fetchloadBrands(value);
  };

  // ========================================
  // STATUS CHANGE
  // ========================================

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setStatusFilter(value);

    if (value === "all") {
      loadBrands();
      return;
    }

    statusloadBrands(value);
  };

  // ========================================
  // OPEN EDIT MODAL
  // ========================================



  // ========================================
  // CLOSE EDIT MODAL
  // ========================================

  const handleCloseEditModal = () => {
    setShowEditModal(false);

    setSelectedBrand(null);

    setEditName("");

    setEditDescription("");

    setEditStatus("active");
  };

  // ========================================
  // SAVE EDIT
  // ========================================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!selectedBrand.id) {
      return;
    }

    if (!selectedBrand.name.trim()) {
     
      return;
    }

    try {
      setSaving(true);

      const result = await updateBrands({
        id: selectedBrand.id,
        name: editName,
        description: editDescription,
        status: editStatus,
      });

      if (!result?.success) {
       
        return;
      }

    

      handleCloseEditModal();

      await loadBrands();

    } catch (error) {
      console.error("Error updating category:", error);

    

    } finally {
      setSaving(false);
    }
  };
  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="brands-card">

      {/* ========================================
          TOOLBAR
      ======================================== */}

      <div className="brands-toolbar">

        <div className="brand-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={handleSearchChange}
          />

        </div>

        <div className="brand-filter">

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

      <div className="brand-table-wrapper">

        {loading ? (

          <div className="brands-empty">

            <div className="empty-brands-icon">
              <FolderTree size={29} />
            </div>

            <h3>
              Loading brands...
            </h3>

            <p>
              Please wait.
            </p>

          </div>

        ) : brands.length === 0 ? (

          <div className="brand-empty">

            <div className="empty-brand-icon">
              <FolderTree size={29} />
            </div>

            <h3>
              No brands found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <table className="brands-table">

            <thead>

              <tr>

                <th>BRAND</th>

                <th>DESCRIPTION</th>

              

                <th>STATUS</th>

                <th>CREATED</th>

                <th>ACTIONS</th>

              </tr>

            </thead>

            <tbody>

              {brands.map((brands) => (

                <tr key={brands.id}>

                  {/* BRAND */}

                  <td>

                    <div className="brand-info">

                      <div className="brand-avatar">
                        <FolderTree size={18} />
                      </div>

                      <div>

                        <strong>
                          {brands.name}
                        </strong>

                        <small>
                          CAT-
                          {String(brands.id).padStart(4, "0")}
                        </small>

                      </div>

                    </div>

                  </td>

                  {/* DESCRIPTION */}

                  <td>

                    <span className="brand-description">

                      {brands.description ||
                        "No description"}

                    </span>

                  </td>

                  {/* PRODUCTS */}

                 

                  {/* STATUS */}

                  <td>

                    <span
                      className={`brand-status ${brands.status?.toLowerCase()}`}
                    >

                      {brands.status?.toLowerCase() ===
                        "active" ? (

                        <CheckCircle2 size={13} />

                      ) : (

                        <XCircle size={13} />

                      )}

                      {brands.status}

                    </span>

                  </td>

                  {/* CREATED */}

                  <td>

                    <span className="created-date">
                      {Date(brands.created_at).toLocaleLowerCase()}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="brand-actions">

                      {/* VIEW */}

                      <button
                        type="button"
                        title="View products"
                        onClick={() => openViewModal(brands)}
                      >
                        <Eye size={16} />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => {
                          openEditModal(brands);

                        }}
                      >
                        <Pencil size={16} />
                      </button>
                      {/* DELETE */}

                      <button
                        type="button"
                        title="Delete brands"
                        className="delete-brands"
                        onClick={() => openDeleteModal(brands)}
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

          title="Delete brands?"

          message={
            selectedBrand
              ? `Are you sure you want to delete "${selectedBrand.name}"?`
              : "Are you sure you want to delete this brands?"
          }

          confirmText={deleting ? "Deleting..." : "Delete"}

          cancelText="Cancel"

          onCancel={() => {
            if (!deleting) {
              setShowDeleteModal(false);
              setSelectedBrand(null);
            }
          }}

          onConfirm={handleDeleteBrand}
        />
      </div>



      {/* ========================================
          EDIT CATEGORY MODAL
      ======================================== */}

      {showEditModal && (
        <EditModal
          category={selectedBrand}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
          title="Brands"
          editName={editName}
          setEditName={setEditName}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          saving={saving}
        />
      )}






      {showViewModal && (
        <ViewCateModal
          category={selectedBrand}
          title="Brands"
          onClose={handleCloseViewModal}
        />
      )}


    </div>
  );
}

