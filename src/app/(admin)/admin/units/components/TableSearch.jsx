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
import EditModal from "../components/EditCategoryModal";
import ViewCateModal from "../components/ViewModal";
import {
  getUnits,
  fetchUnits,
  stausUnits,
  deactivateUnits,
  updateUnits,
} from "@/services/units/get";

export default function TableUnits() {
  const toast = useToast();

  // ========================================
  // STATE
  // ========================================

  const [units, setUnits] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  // ========================================
  // EDIT MODAL STATE
  // ========================================

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUnits, setSelectedUnits] = useState(null);

  const [editName, setEditName] = useState("");
  const [editShortName, setEditShortName] = useState("");
  const [editabbreviation, setAbbreviation] = useState("");
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

  async function loadUnits() {
    try {
      setLoading(true);

      const data = await getUnits();

      setUnits(data || []);

    } catch (error) {
      console.error("Error loading Units:", error);

      toast.error?.("Failed to load Units");

      setUnits([]);

    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // SEARCH CATEGORIES
  // ========================================

  async function fetchloadUnits(searchValue) {
    try {
      setLoading(true);

      const data = await fetchUnits(searchValue);

      setUnits(data || []);

    } catch (error) {
      console.error("Error searching Units:", error);

      toast.error?.("Failed to search Units");

      setUnits([]);

    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // FILTER BY STATUS
  // ========================================

  async function statusloadUnits(statusValue) {
    try {
      setLoading(true);

      const data = await stausUnits(statusValue);

      setUnits(data || []);

    } catch (error) {
      console.error("Error filtering brands:", error);

      toast.error?.("Failed to filter brands");

      setUnits([]);

    } finally {
      setLoading(false);
    }
  }


  const openDeleteModal = (brands) => {
    setSelectedUnits(brands);
    setShowDeleteModal(true);
  };

  const handleDeleteUnits = async () => {
    if (!selectedUnits) {
      return;
    }

    try {
      setDeleting(true);

      const result = await deactivateUnits(
        selectedUnits.id
      );

      if (!result?.success) {
        toast.error?.(
          result?.message || "Failed to delete Units"
        );

        return;
      }

      toast.success?.(
        result.message || "Units deleted successfully"
      );

      // Close modal
      setShowDeleteModal(false);

      // Clear selected category
      setSelectedUnits(null);

      // Refresh categories
      await loadUnits();

    } catch (error) {
      console.error(
        "Error deleting Units:",
        error
      );

      toast.error?.(
        "Failed to delete Units"
      );

    } finally {
      setDeleting(false);
    }
  };
  // ========================================
  // INITIAL LOAD
  // ========================================


  const openEditModal = (units) => {
    setSelectedUnits(units);

    setEditName(units.name || "");
    setAbbreviation(units.abbreviation || "");
    setEditShortName(units.short_name || "");
    setEditDescription(units.description || "");
    setEditStatus(units.status?.toLowerCase() || "active");

    setShowEditModal(true);
  };

  const openViewModal = (units) => {
    setSelectedUnits(units);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedUnits(null);
  };
  useEffect(() => {
    loadUnits();
  }, []);

  // ========================================
  // SEARCH CHANGE
  // ========================================

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      loadUnits();
      return;
    }

    fetchloadUnits(value);
  };

  // ========================================
  // STATUS CHANGE
  // ========================================

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setStatusFilter(value);

    if (value === "all") {
      loadUnits();
      return;
    }

    statusloadUnits(value);
  };

  // ========================================
  // OPEN EDIT MODAL
  // ========================================



  // ========================================
  // CLOSE EDIT MODAL
  // ========================================

  const handleCloseEditModal = () => {
    setShowEditModal(false);

    setSelectedUnits(null);

    setEditName("");

    setEditDescription("");

    setEditStatus("active");
  };

  // ========================================
  // SAVE EDIT
  // ========================================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!selectedUnits.id) {
      return;
    }

    if (!selectedUnits.name.trim()) {
      toast.error?.("units name is required");
      return;
    }

    try {
      setSaving(true);

      const result = await updateUnits({
        id: selectedUnits.id,
        name: editName,
        description: editDescription,
        status: editStatus,
      });

      if (!result?.success) {
        toast.error?.(
          result?.message || "Failed to update brands"
        );
        return;
      }

      toast.success?.(
        result.message || "units updated successfully"
      );

      handleCloseEditModal();

      await loadUnits();

    } catch (error) {
      console.error("Error updating units:", error);

      toast.error?.("Failed to update units");

    } finally {
      setSaving(false);
    }
  };
  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="units-card">

      {/* ========================================
          TOOLBAR
      ======================================== */}

      <div className="units-toolbar">

        <div className="unit-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search units..."
            value={search}
            onChange={handleSearchChange}
          />

        </div>

        <div className="unit-filter">

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

      <div className="unit-table-wrapper">

        {loading ? (

          <div className="units-empty">

            <div className="empty-units-icon">
              <FolderTree size={29} />
            </div>

            <h3>
              Loading units...
            </h3>

            <p>
              Please wait.
            </p>

          </div>

        ) : units.length === 0 ? (

          <div className="unit-empty">

            <div className="empty-unit-icon">
              <FolderTree size={29} />
            </div>

            <h3>
              No units found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <table className="units-table">

            <thead>

              <tr>

                <th>UNITS</th>

                <th>DESCRIPTION</th>

                <th>PRODUCTS</th>

                <th>STATUS</th>

                <th>CREATED</th>

                <th>ACTIONS</th>

              </tr>

            </thead>

            <tbody>

              {units.map((units) => (

                <tr key={units.id}>

                  {/* units */}

                  <td>

                    <div className="unit-info">

                      <div className="unit-avatar">
                        <FolderTree size={18} />
                      </div>

                      <div>

                        <strong>
                          {units.name}
                        </strong>

                        <small>
                          CAT-
                          {String(units.id).padStart(4, "0")}
                        </small>

                      </div>

                    </div>

                  </td>

                  {/* DESCRIPTION */}

                  <td>

                    <span className="unit-description">

                      {units.description ||
                        "No description"}

                    </span>

                  </td>

                  {/* PRODUCTS */}

                  <td>

                    <div className="product-count">

                      <strong>
                        {units.products ?? 0}
                      </strong>

                      <span>
                        products
                      </span>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className={`unit-status ${units.status?.toLowerCase()}`}
                    >

                      {units.status?.toLowerCase() ===
                        "active" ? (

                        <CheckCircle2 size={13} />

                      ) : (

                        <XCircle size={13} />

                      )}

                      {units.status}

                    </span>

                  </td>

                  {/* CREATED */}

                  <td>

                    <span className="created-date">
                      {units.createdAt}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="unit-actions">

                      {/* VIEW */}

                      <button
                        type="button"
                        title="View products"
                        onClick={() => openViewModal(units)}
                      >
                        <Eye size={16} />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() => {
                          openEditModal(units);

                        }}
                      >
                        <Pencil size={16} />
                      </button>
                      {/* DELETE */}

                      <button
                        type="button"
                        title="Delete unit"
                        className="delete-brands"
                        onClick={() => openDeleteModal(units)}
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

          title="Delete units?"

          message={
            selectedUnits
              ? `Are you sure you want to delete "${selectedUnits.name}"?`
              : "Are you sure you want to delete this brands?"
          }

          confirmText={deleting ? "Deleting..." : "Delete"}

          cancelText="Cancel"

          onCancel={() => {
            if (!deleting) {
              setShowDeleteModal(false);
              setSelectedUnits(null);
            }
          }}

          onConfirm={handleDeleteUnits}
        />
      </div>



      {/* ========================================
          EDIT CATEGORY MODAL
      ======================================== */}

      {showEditModal && (
        <EditModal
          category={selectedUnits}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
          title="Units"
          editName={editName}
          editShortName={editShortName}
          setEditShortName={setEditShortName}
          editabbreviation={editabbreviation}
          setAbbreviation={setAbbreviation}
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
          category={selectedUnits}
          title="Units"
          onClose={handleCloseViewModal}
        />
      )}


    </div>
  );
}

