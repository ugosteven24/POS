"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  Package,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Filter,
  Trash2,
  Pencil,
  Save,
  X,
} from "lucide-react";
import "./modal.css";
import "./edit-return-modal.css";
import {
  getPurchaseReturns,
  deletePurchaseReturn,
  updatePurchaseReturn,
} from "@/services/purchases/purchaseReturnService";
import getSuppliers from "@/services/suppliers/get";
import ConfirmModal from "@/components/DeleteConfirmModal";
import { getpayment } from "@/services/paymentMethod/paymentService";

// ==========================================
// CONSTANTS & HELPERS
// ==========================================

const ROWS_PER_PAGE = 6;

const STATUS_OPTIONS = ["Pending", "Completed", "Rejected"];

const REASON_OPTIONS = [
  "Damaged goods",
  "Wrong items",
  "Expired products",
  "Quality issue",
  "Excess stock",
];

const formatCurrency = (amount) =>
  `₦${Number(amount || 0).toLocaleString("en-NG")}`;

const formatDate = (date) => {
  if (!date) return "-";

  const dateString =
    typeof date === "string"
      ? date.slice(0, 10)
      : new Date(date).toISOString().slice(0, 10);

  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return "-";

  return `${day}/${month}/${year}`;
};

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return "status-completed";
    case "Pending":
      return "status-pending";
    case "Rejected":
      return "status-rejected";
    default:
      return "";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 size={13} />;
    case "Pending":
      return <Clock3 size={13} />;
    case "Rejected":
      return <XCircle size={13} />;
    default:
      return null;
  }
};

// ==========================================
// COMPONENT
// ==========================================

export default function TableData() {
  const router = useRouter();

  // ---------- Data ----------
  const [returnsData, setReturnsData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // ---------- Filters ----------
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // ---------- Pagination ----------
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);

  // ---------- UI ----------
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // ---------- Edit form ----------
  const [returnDate, setReturnDate] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [reason, setReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");
  const [returnItems, setReturnItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ==========================================
  // LOAD DATA
  // ==========================================

  // Suppliers and payment methods rarely change: load once.
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [suppliersData, paymentData] = await Promise.all([
          getSuppliers(),
          getpayment(),
        ]);
        setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);
        setPaymentMethods(Array.isArray(paymentData) ? paymentData : []);
      } catch (error) {
        console.error("Failed to load suppliers/payment methods:", error);
      }
    };

    loadLookups();
  }, []);

  const loadReturns = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getPurchaseReturns({
        page: currentPage,
        limit: ROWS_PER_PAGE,
        search,
        status: statusFilter,
        reason: reasonFilter,
        date: dateFilter,
      });

      if (result.success) {
        setReturnsData(result.data || []);
        setTotalPages(result.totalPages || 0);
        setTotalReturns(result.total || 0);
      } else {
        console.error(result.message);
        setReturnsData([]);
        setTotalPages(0);
        setTotalReturns(0);
      }
    } catch (error) {
      console.error("Failed to load purchase returns:", error);
      setReturnsData([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter, reasonFilter, dateFilter]);

  useEffect(() => {
    loadReturns();
  }, [loadReturns]);

  // ==========================================
  // VIEW
  // ==========================================

  const handleView = (purchaseReturn) => {
    setSelectedReturn(purchaseReturn);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedReturn(null);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (row) => {
    const quantity = Number( row.item_quantity ?? 0);

    // The list row may not include the unit cost, so fall back to
    // return value / quantity. This is display only: the server
    // recalculates the price from the original purchase.
    const unitCost =
      row.item_unit_cost != null
        ? Number(row.item_unit_cost)
        : quantity > 0
        ? Number(row.return_value || 0) / quantity
        : 0;

    setSelectedReturn(row);
    setReturnDate(row.return_date ? String(row.return_date).slice(0, 10) : "");
    setSupplierId(row.supplier_id ? String(row.supplier_id) : "");
    setReason(row.reason || "");
    setNotes(row.notes || "");
    setRefundMethod(row.refund_method ? String(row.refund_method) : "");
    setStatus(row.status || "Pending");
    setSubmitError("");

    setReturnItems([
      {
        id: row.item_id ?? row.return_id,
        product_id: row.product_id,
        product_name: row.product_name,
        product_sku: row.product_sku ?? row.sku,
        units_name:row.units_name,
        purchase_quantity: row.purchase_quantity,
        quantity,
        unit_cost: unitCost,
      },
    ]);

    setShowEditModal(true);
  };

  const closeEditModal = () => {
    if (saving) return;
    setShowEditModal(false);
    setSelectedReturn(null);
    setReturnItems([]);
    setSubmitError("");
  };

  const updateItemQuantity = (id, value) => {
    setReturnItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(value) } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedReturn?.return_id) return;

    setSubmitError("");

    if (!returnDate) {
      setSubmitError("Select a return date.");
      return;
    }

    if (returnItems.some((item) => !(item.quantity > 0))) {
      setSubmitError("Each product needs a quantity of at least 1.");
      return;
    }

    if (!returnItems[0]?.product_id) {
      setSubmitError("This return has no product to update.");
      return;
    }

    try {
      setSaving(true);

      const result = await updatePurchaseReturn({
        return_id: selectedReturn.return_id,
        return_date: returnDate,
        reason,
        notes,
        refund_method: refundMethod,
        status,
        item_product_id: returnItems[0]?.product_id,
        item_quantity: Number(returnItems[0]?.quantity),
        item_unit_cost: Number(returnItems[0]?.unit_cost),
      });

      if (!result?.success) {
        setSubmitError(result?.message || "Failed to update purchase return.");
        return;
      }

      setShowEditModal(false);
      setSelectedReturn(null);
      setReturnItems([]);
      await loadReturns();
    } catch (error) {
      console.error("Update purchase return error:", error);
      setSubmitError("Something went wrong while updating the return.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const confirmDelete = (purchaseReturn) => {
    setSelectedReturn(purchaseReturn);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedReturn?.return_id) return;

    try {
      setDeleteLoading(true);

      const result = await deletePurchaseReturn(selectedReturn.return_id);

      if (!result.success) {
        console.error(result.message);
        return;
      }

      setShowDeleteModal(false);
      setSelectedReturn(null);
      await loadReturns();
    } catch (error) {
      console.error("Failed to delete purchase return:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // ==========================================
  // FILTERS & PAGINATION
  // ==========================================

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setReasonFilter("All");
    setDateFilter("");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Keep the saved reason selectable even if it isn't in the fixed list.
  const reasonChoices =
    reason && !REASON_OPTIONS.includes(reason)
      ? [reason, ...REASON_OPTIONS]
      : REASON_OPTIONS;

  const editTotal = returnItems.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.unit_cost),
    0
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="returns-card">
      {/* ======================================
          TOOLBAR
      ====================================== */}
      <div className="returns-toolbar">
        <div className="search-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search return ID, supplier or PO..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="toolbar-filters">
          <div className="filter-select">
            <Filter size={14} />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <select
            className="normal-filter"
            value={reasonFilter}
            onChange={(e) => {
              setReasonFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Reasons</option>
            {REASON_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <div className="date-filter">
            <CalendarDays size={14} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button className="reset-filter" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </div>

      {/* ======================================
          TABLE
      ====================================== */}
      <div className="table-container">
        <table className="returns-table">
          <thead>
            <tr>
              <th>RETURN ID</th>
              <th>DATE</th>
              <th>SUPPLIER</th>
              <th>PURCHASE ORDER</th>
              <th>PRODUCT</th>
              <th>QTY</th>
              <th>RETURN VALUE</th>
              <th>REASON</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="empty-state">
                  Loading purchase returns...
                </td>
              </tr>
            ) : returnsData.length > 0 ? (
              returnsData.map((item) => (
                <tr key={item.return_id}>
                  <td>
                    <span className="return-id">#{item.return_id}</span>
                  </td>

                  <td>
                    <span className="date-text">
                      {formatDate(item.return_date)}
                    </span>
                  </td>

                  <td>
                    <div className="supplier-cell">
                      <div className="supplier-avatar">
                        {item.supplier
                          ? item.supplier.charAt(0).toUpperCase()
                          : "S"}
                      </div>
                      <div>
                        <strong>{item.supplier || "Unknown"}</strong>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="po-reference">
                      {item.purchase_order || "-"}
                    </span>
                  </td>

                  <td>
                    <span className="product-name">
                      {item.product_name || "-"}
                    </span>
                  </td>

                  <td>
                    <span className="quantity">
                      {item.purchase_return_quantity || 0}
                      {item.units_name && ` ${item.units_name}`}
                    </span>
                  </td>

                  <td>
                    <strong className="return-amount">
                      {formatCurrency(item.return_value)}
                    </strong>
                  </td>

                  <td>
                    <span className="reason">{item.reason || "-"}</span>
                  </td>

                  <td>
                    <span
                      className={`return-status ${getStatusClass(item.status)}`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="row-actions">
                      <button
                        className="view-btn"
                        title="View return"
                        onClick={() => handleView(item)}
                      >
                        <Eye size={15} />
                      </button>

                      {item.status === "Pending" && (
                        <button
                          className="view-btn"
                          title="Edit return"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil size={15} />
                        </button>
                      )}

                      <button
                        className="view-btn"
                        title="Delete return"
                        onClick={() => confirmDelete(item)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="empty-state">
                  <Package size={28} />
                  <strong>No purchase returns found</strong>
                  <span>Try changing your search or filters.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ======================================
          FOOTER
      ====================================== */}
      <div className="table-footer">
        <div className="results-info">
          Showing{" "}
          <strong>
            {totalReturns === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1}
          </strong>{" "}
          to{" "}
          <strong>{Math.min(currentPage * ROWS_PER_PAGE, totalReturns)}</strong>{" "}
          of <strong>{totalReturns}</strong> returns
        </div>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            <ChevronLeft size={15} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => goToPage(currentPage + 1)}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ======================================
          DELETE MODAL
      ====================================== */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Purchase Return?"
        message={
          selectedReturn
            ? `Are you sure you want to delete return #${selectedReturn.return_id}? This cannot be undone.`
            : "Are you sure you want to delete this record?"
        }
        confirmText={deleteLoading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onCancel={() => {
          if (!deleteLoading) {
            setShowDeleteModal(false);
            setSelectedReturn(null);
          }
        }}
        onConfirm={handleDelete}
      />

      {/* ======================================
          VIEW MODAL
      ====================================== */}
      {showViewModal && selectedReturn && (
        <div className="confirm-modal-overlay" onMouseDown={closeViewModal}>
          <div
            className="purchase-return-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="purchase-return-header">
              <div>
                <h2>Purchase Return Details</h2>
                <p>Purchase return account overview.</p>
              </div>

              <button
                type="button"
                className="purchase-return-close"
                onClick={closeViewModal}
              >
                <X size={20} />
              </button>
            </div>

            <div className="purchase-return-profile">
              <div className="purchase-return-avatar">
                <Package size={25} />
              </div>
              <div>
                <h3>Return #{selectedReturn.return_id}</h3>
                <span>{selectedReturn.supplier || "Unknown Supplier"}</span>
              </div>
            </div>

            <div className="purchase-return-details">
              <div className="return-detail">
                <span>Return Date</span>
                <strong>{formatDate(selectedReturn.return_date)}</strong>
              </div>

              <div className="return-detail">
                <span>Purchase Order</span>
                <strong>{selectedReturn.purchase_order || "-"}</strong>
              </div>

              <div className="return-detail">
                <span>Supplier</span>
                <strong>{selectedReturn.supplier || "Unknown Supplier"}</strong>
              </div>

              <div className="return-detail">
                <span>Product</span>
                <strong>{selectedReturn.product_name || "-"}</strong>
              </div>

              <div className="return-detail">
                <span>Reason</span>
                <strong>{selectedReturn.reason || "-"}</strong>
              </div>

              <div className="return-detail">
                <span>Items</span>
                <strong>{selectedReturn.items || 0}</strong>
              </div>

              <div className="return-detail">
                <span>Quantity</span>
                <strong>{selectedReturn.quantity || 0}</strong>
              </div>

              <div className="return-detail">
                <span>Status</span>
                <strong
                  className={`return-modal-status ${getStatusClass(
                    selectedReturn.status
                  )}`}
                >
                  {getStatusIcon(selectedReturn.status)}
                  {selectedReturn.status}
                </strong>
              </div>

              <div className="return-detail">
                <span>Return Value</span>
                <strong className="return-modal-value">
                  {formatCurrency(selectedReturn.return_value)}
                </strong>
              </div>
            </div>

            {selectedReturn.status === "Pending" && (
              <div className="purchase-return-footer">
                <button
                  type="button"
                  className="purchase-return-edit"
                  onClick={() => {
                    const target = selectedReturn;
                    closeViewModal();
                    handleEdit(target);
                  }}
                >
                  <Pencil size={16} />
                  Edit Purchase Return
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================
          EDIT MODAL
      ====================================== */}
      {showEditModal && selectedReturn && (
        <div className="confirm-modal-overlay" onMouseDown={closeEditModal}>
          <div
            className="purchase-return-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="purchase-return-header">
              <div>
                <h2>Edit Purchase Return</h2>
                <p>Return #{selectedReturn.return_id}</p>
              </div>

              <button
                type="button"
                className="purchase-return-close"
                onClick={closeEditModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* RETURN INFORMATION */}
              <div className="form-section">
                <h2>Return Information</h2>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Return Date</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Supplier</label>
                    <select
                      value={supplierId}
                      disabled
                      onChange={(e) => setSupplierId(e.target.value)}
                    >
                      <option value="">Select supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={String(supplier.id)}>
                          {supplier.supplier_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Reason</label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option value="">Select reason</option>
                      {reasonChoices.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Refund Method</label>
                    <select
                      value={refundMethod}
                      onChange={(e) => setRefundMethod(e.target.value)}
                    >
                      <option value="">Select payment method</option>
                      {paymentMethods.map((payment) => (
                        <option key={payment.id} value={String(payment.id)}>
                          {payment.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* RETURN ITEMS */}
              <div className="form-section">
                <div className="section-header">
                  <div>
                    <h2>Returned Products</h2>
                    <p>Products being returned to the supplier.</p>
                  </div>
                </div>

                <div className="return-items-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {returnItems.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="empty-state">
                            No products on this return.
                          </td>
                        </tr>
                      ) : (
                        returnItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.product_name || "-"}</td>
                            <td>{item.product_sku || "-"}</td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItemQuantity(item.id, e.target.value)
                                }
                              />
                            </td>
                            <td>{formatCurrency(item.unit_cost)}</td>
                            <td>
                              {formatCurrency(
                                Number(item.quantity) * Number(item.unit_cost)
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional information..."
                    rows={4}
                  />
                </div>
              </div>

              {/* TOTAL */}
              <div className="return-summary">
                <div className="grand-total">
                  <span>Total return value</span>
                  <strong>{formatCurrency(editTotal)}</strong>
                </div>
              </div>

              {submitError && <p className="form-error">{submitError}</p>}

              {/* ACTIONS */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeEditModal}
                  disabled={saving}
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={saving}
                >
                  <Save size={16} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}