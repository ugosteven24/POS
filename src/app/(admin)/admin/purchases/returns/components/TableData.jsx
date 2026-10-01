
"use client";

import React, { useEffect, useState } from "react";
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
  X,
} from "lucide-react";
import "./modal.css"
import {
  getPurchaseReturns,
  deletePurchaseReturn,
} from "@/services/purchases/purchaseReturnService";

import { useToast } from "@/components/Toast";
import ConfirmModal from "@/components/DeleteConfirmModal";

const formatCurrency = (amount) => {
  return `₦${Number(amount || 0).toLocaleString("en-NG")}`;
};



export default function TableData() {
  const router = useRouter();

  // ==========================================
  // DATA
  // ==========================================

  const [returnsData, setReturnsData] = useState([]);

  // ==========================================
  // FILTERS
  // ==========================================
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // ==========================================
  // PAGINATION
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);

  const rowsPerPage = 6;

  // ==========================================
  // UI
  // ==========================================

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [selectedReturn, setSelectedReturn] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [showViewModal, setShowViewModal] =
    useState(false);

  // ==========================================
  // LOAD DATA
  // ==========================================

  const loadReturns = async () => {
    try {
      setLoading(true);

      const result = await getPurchaseReturns({
        page: currentPage,
        limit: rowsPerPage,
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
      console.error(
        "Failed to load purchase returns:",
        error
      );

      setReturnsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReturns();
  }, [
    currentPage,
    search,
    statusFilter,
    reasonFilter,
    dateFilter,
  ]);

  // ==========================================
  // STATUS
  // ==========================================

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
  // VIEW
  // ==========================================

  const handleView = (purchaseReturn) => {
    setSelectedReturn(purchaseReturn);
    setShowViewModal(true);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (purchaseReturn) => {
    if (!purchaseReturn?.return_id) {
      return;
    }

    router.push(
      `/admin/purchases/returns/${purchaseReturn.return_id}/edit`
    );
  };

  // ==========================================
  // DELETE MODAL
  // ==========================================

  const confirmDelete = (purchaseReturn) => {
    setSelectedReturn(purchaseReturn);
    setShowDeleteModal(true);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async () => {
    if (!selectedReturn?.return_id) {
      return;
    }

    try {
      setDeleteLoading(true);

      const result = await deletePurchaseReturn(
        selectedReturn.return_id
      );

      if (!result.success) {
        console.error(result.message);
        return;
      }

      // Close modal
      setShowDeleteModal(false);
      setSelectedReturn(null);

      // Reload current page
      await loadReturns();

    } catch (error) {
      console.error(
        "Failed to delete purchase return:",
        error
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // ==========================================
  // RESET FILTERS
  // ==========================================

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setReasonFilter("All");
    setDateFilter("");
    setCurrentPage(1);
  };

  // ==========================================
  // PAGINATION
  // ==========================================

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const dateString =
      typeof date === "string"
        ? date.slice(0, 10)
        : new Date(date)
            .toISOString()
            .slice(0, 10);

    const [year, month, day] =
      dateString.split("-");

    if (!year || !month || !day) {
      return "-";
    }

    return `${day}/${month}/${year}`;
  };

  // ==========================================
  // CLOSE VIEW
  // ==========================================

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedReturn(null);
  };

  // ==========================================
  // CLOSE DELETE
  // ==========================================

  const closeDeleteModal = () => {
    if (deleteLoading) {
      return;
    }

    setShowDeleteModal(false);
    setSelectedReturn(null);
  };

  return (
    <div className="returns-card">

      {/* ======================================
          TOOLBAR
      ====================================== */}

      <div className="returns-toolbar">

        {/* SEARCH */}

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

        {/* FILTERS */}

        <div className="toolbar-filters">

          {/* STATUS */}

          <div className="filter-select">

            <Filter size={14} />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">
                All Status
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

          </div>

          {/* REASON */}

          <select
            className="normal-filter"
            value={reasonFilter}
            onChange={(e) => {
              setReasonFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">
              All Reasons
            </option>

            <option value="Damaged goods">
              Damaged goods
            </option>

            <option value="Wrong items">
              Wrong items
            </option>

            <option value="Expired products">
              Expired products
            </option>

            <option value="Quality issue">
              Quality issue
            </option>

            <option value="Excess stock">
              Excess stock
            </option>
          </select>

          {/* DATE */}

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

          {/* RESET */}

          <button
            className="reset-filter"
            onClick={resetFilters}
          >
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
              <th>ITEMS</th>
              <th>QTY</th>
              <th>RETURN VALUE</th>
              <th>REASON</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>

          </thead>

          <tbody>

            {/* LOADING */}

            {loading ? (

              <tr>

                <td
                  colSpan="10"
                  className="empty-state"
                >
                  Loading purchase returns...
                </td>

              </tr>

            ) : returnsData.length > 0 ? (

              returnsData.map((item) => (

                <tr key={item.return_id}>

                  {/* RETURN ID */}

                  <td>

                    <span className="return-id">
                      #{item.return_id}
                    </span>

                  </td>

                  {/* DATE */}

                  <td>

                    <span className="date-text">
                      {formatDate(
                        item.return_date
                      )}
                    </span>

                  </td>

                  {/* SUPPLIER */}

                  <td>

                    <div className="supplier-cell">

                      <div className="supplier-avatar">

                        {item.supplier
                          ? item.supplier
                              .charAt(0)
                              .toUpperCase()
                          : "S"}

                      </div>

                      <div>

                        <strong>
                          {item.supplier ||
                            "Unknown"}
                        </strong>

                      </div>

                    </div>

                  </td>

                  {/* PURCHASE ORDER */}

                  <td>

                    <span className="po-reference">
                      {item.purchase_order ||
                        "-"}
                    </span>

                  </td>

                  {/* ITEMS */}

                  <td>

                    <span className="items-count">
                      {item.items || 0}
                    </span>

                  </td>

                  {/* QUANTITY */}

                  <td>

                    <span className="quantity">
                      {item.quantity || 0}
                    </span>

                  </td>

                  {/* VALUE */}

                  <td>

                    <strong className="return-amount">
                      {formatCurrency(
                        item.return_value
                      )}
                    </strong>

                  </td>

                  {/* REASON */}

                  <td>

                    <span className="reason">
                      {item.reason || "-"}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className={`return-status ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(
                        item.status
                      )}

                      {item.status}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="row-actions">

                      {/* VIEW */}

                      <button
                        className="view-btn"
                        title="View return"
                        onClick={() =>
                          handleView(item)
                        }
                      >
                        <Eye size={15} />
                      </button>

                     

                      {/* DELETE */}

                      <button
                        className="view-btn"
                        title="Delete return"
                        onClick={() =>
                          confirmDelete(item)
                        }
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              /* EMPTY */

              <tr>

                <td
                  colSpan="10"
                  className="empty-state"
                >

                  <Package size={28} />

                  <strong>
                    No purchase returns found
                  </strong>

                  <span>
                    Try changing your search
                    or filters.
                  </span>

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
            {totalReturns === 0
              ? 0
              : (currentPage - 1) *
                  rowsPerPage +
                1}
          </strong>

          {" "}to{" "}

          <strong>
            {Math.min(
              currentPage * rowsPerPage,
              totalReturns
            )}
          </strong>

          {" "}of{" "}

          <strong>
            {totalReturns}
          </strong>

          {" "}returns

        </div>

        <div className="pagination">

          {/* PREVIOUS */}

          <button
            disabled={currentPage === 1}
            onClick={() =>
              goToPage(
                currentPage - 1
              )
            }
          >
            <ChevronLeft size={15} />
          </button>

          {/* PAGE NUMBERS */}

          {Array.from(
            {
              length: totalPages,
            },
            (_, index) =>
              index + 1
          ).map((page) => (

            <button
              key={page}
              className={
                currentPage === page
                  ? "active"
                  : ""
              }
              onClick={() =>
                goToPage(page)
              }
            >
              {page}
            </button>

          ))}

          {/* NEXT */}

          <button
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              goToPage(
                currentPage + 1
              )
            }
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
      
                title="Delete Category?"
      
                message={
                  selectedReturn
                    ? `Are you sure you want to delete "?`
                    : "Are you sure you want to delete this Records?"
                }
      
                confirmText={deleting ? "Deleting..." : "Delete"}
      
                cancelText="Cancel"
      
                onCancel={() => {
                  if (!deleting) {
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

  <div
    className="confirm-modal-overlay"
    onMouseDown={closeViewModal}
  >

    <div
      className="purchase-return-modal"
      onMouseDown={(e) => e.stopPropagation()}
    >

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="purchase-return-header">

        <div>
          <h2>
            Purchase Return Details
          </h2>

          <p>
            Purchase return account overview.
          </p>
        </div>

        <button
          type="button"
          className="purchase-return-close"
          onClick={closeViewModal}
        >
          <X size={20} />
        </button>

      </div>


      {/* ======================================
          RETURN PROFILE
      ====================================== */}

      <div className="purchase-return-profile">

        <div className="purchase-return-avatar">
          <Package size={25} />
        </div>

        <div>

          <h3>
            Return #{selectedReturn.return_id}
          </h3>

          <span>
            {selectedReturn.supplier ||
              "Unknown Supplier"}
          </span>

        </div>

      </div>


      {/* ======================================
          DETAILS
      ====================================== */}

      <div className="purchase-return-details">

        <div className="return-detail">

          <span>
            Return Date
          </span>

          <strong>
            {formatDate(
              selectedReturn.return_date
            )}
          </strong>

        </div>


        <div className="return-detail">

          <span>
            Purchase Order
          </span>

          <strong>
            {selectedReturn.purchase_order || "-"}
          </strong>

        </div>


        <div className="return-detail">

          <span>
            Supplier
          </span>

          <strong>
            {selectedReturn.supplier ||
              "Unknown Supplier"}
          </strong>

        </div>


        <div className="return-detail">

          <span>
            Reason
          </span>

          <strong>
            {selectedReturn.reason || "-"}
          </strong>

        </div>


        <div className="return-detail">

          <span>
            Items
          </span>

          <strong>
            {selectedReturn.items || 0}
          </strong>

        </div>


        <div className="return-detail">

          <span>
            Quantity
          </span>

          <strong>
            {selectedReturn.quantity || 0}
          </strong>

        </div>


        <div className="return-detail">

          <span>
            Status
          </span>

          <strong
            className={`return-modal-status ${getStatusClass(
              selectedReturn.status
            )}`}
          >
            {getStatusIcon(
              selectedReturn.status
            )}

            {selectedReturn.status}
          </strong>

        </div>


        <div className="return-detail">

          <span>
            Return Value
          </span>

          <strong className="return-modal-value">
            {formatCurrency(
              selectedReturn.return_value
            )}
          </strong>

        </div>

      </div>


      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="purchase-return-footer">

        <button
          type="button"
          className="purchase-return-edit"
          onClick={() => {
            closeViewModal();

            router.push(
              `/purchases/purchase-returns/edit/${selectedReturn.return_id}`
            );
          }}
        >
          <Pencil size={16} />
          Edit Purchase Return
        </button>

      </div>

    </div>

  </div>

)}


    </div>
  );
}

