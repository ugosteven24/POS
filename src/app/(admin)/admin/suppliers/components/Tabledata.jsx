
"use client";

import React, { useMemo, useState } from "react";
import {
    Search,
    Plus,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    Phone,
    Mail,
    MapPin,
    Building2,
    Users,
    Wallet,
    ShoppingCart,
    X,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Clock3,
    Ban,
    Filter,
} from "lucide-react";

import { getSuppliers,deleteSupplierReturn } from "@/services/suppliers/supplierService";
import Link from "next/link";
import {useEffect} from "react";

// ==========================================
// SAMPLE DATA
// ==========================================






// ==========================================
// COMPONENT
// ==========================================

export default function Tabledata() {

    const [suppliers, setSuppliers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [openMenu, setOpenMenu] =
        useState(null);

    const [showSupplierModal, setShowSupplierModal] =
        useState(false);

    const [editingSupplier, setEditingSupplier] =
        useState(null);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedSupplier, setSelectedSupplier] =
        useState(null);

    const [showViewModal, setShowViewModal] =
        useState(false);
  const [totalPages, setTotalPages] = useState(0);
    const [supplierForm, setSupplierForm] =
        useState({
            name: "",
            company: "",
            phone: "",
            email: "",
            address: "",
            status: "Active",
        });

 const [totalReturns, setTotalReturns] = useState(0);
    const ITEMS_PER_PAGE = 6;

    const loadReturns = async () => {
        const result = await getSuppliers({
            page: currentPage,
            limit: 10,
            search,
            status: statusFilter,
        });

        if (result.success) {
            setSuppliers(result.data);
            setTotalReturns(result.total);
            setTotalPages(result.totalPages);
        }
    }

      useEffect(() => {
        loadReturns();
      }, [
        currentPage,
        search,
        statusFilter,
      ]);

    // ==========================================
    // FORMAT MONEY
    // ==========================================

    const money = (value) => {
        return `₦${Number(value).toLocaleString()}`;
    };


    // ==========================================
    // FILTER SUPPLIERS
    // ==========================================

    const filteredSuppliers = useMemo(() => {

        const query =
            search.toLowerCase().trim();

        return suppliers.filter((supplier) => {

            const matchesSearch =
                supplier.supplier_name
                    .toLowerCase()
                    .includes(query) ||
                supplier.company_name
                    .toLowerCase()
                    .includes(query) ||
                supplier.phone
                    .toLowerCase()
                    .includes(query) ||
                supplier.email
                    .toLowerCase()
                    .includes(query);

            const matchesStatus =
                statusFilter === "All" ||
                supplier.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    }, [
        suppliers,
        search,
        statusFilter,
    ]);


    // ==========================================
    // PAGINATION
    // ==========================================



    const paginatedSuppliers =
        filteredSuppliers.slice(
            (currentPage - 1) *
            ITEMS_PER_PAGE,
            currentPage *
            ITEMS_PER_PAGE
        );


  


    // ==========================================
    // OPEN ADD MODAL
    // ==========================================

    const openAddSupplier = () => {

        setEditingSupplier(null);

        setSupplierForm({
            name: "",
            company: "",
            phone: "",
            email: "",
            address: "",
            status: "Active",
        });

        setShowSupplierModal(true);
    };


    // ==========================================
    // OPEN EDIT MODAL
    // ==========================================

    const openEditSupplier = (supplier) => {

        setEditingSupplier(supplier);

        setSupplierForm({
            name: supplier.name,
            company: supplier.company,
            phone: supplier.phone,
            email: supplier.email,
            address: supplier.address,
            status: supplier.status,
        });

        setOpenMenu(null);
        setShowSupplierModal(true);
    };


    // ==========================================
    // SAVE SUPPLIER
    // ==========================================

    const saveSupplier = () => {

        if (
            !supplierForm.name.trim() ||
            !supplierForm.phone.trim()
        ) {
            alert(
                "Supplier name and phone are required."
            );
            return;
        }


        if (editingSupplier) {

            setSuppliers(
                suppliers.map((supplier) =>
                    supplier.id ===
                        editingSupplier.id
                        ? {
                            ...supplier,
                            ...supplierForm,
                        }
                        : supplier
                )
            );

        } else {

            const newSupplier = {
                id: Date.now(),
                ...supplierForm,
                purchases: 0,
                totalPurchased: 0,
                balance: 0,
            };

            setSuppliers([
                newSupplier,
                ...suppliers,
            ]);
        }


        setShowSupplierModal(false);
    };


    // ==========================================
    // DELETE
    // ==========================================

    const confirmDelete = (supplier) => {

        setSelectedSupplier(supplier);

        setOpenMenu(null);

        setShowDeleteModal(true);
    };


    const deleteSupplier = async (supplier) => {

        await deleteSupplierReturn(supplier);

        setShowDeleteModal(false);
        setSelectedSupplier(null);
         // Refresh categories
      await loadReturns();
    };


    // ==========================================
    // VIEW
    // ==========================================

    const viewSupplier = (supplier) => {

        setSelectedSupplier(supplier);

        setOpenMenu(null);

        setShowViewModal(true);
    };


    // ==========================================
    // AVATAR LETTERS
    // ==========================================

    const getInitials = (name) => {

        return name
            .split(" ")
            .slice(0, 2)
            .map((word) =>
                word.charAt(0)
            )
            .join("")
            .toUpperCase();
    };


    return (

        <>






            {/* ======================================
          TABLE CARD
      ====================================== */}

            <div className="suppliers-card">


                {/* TOOLBAR */}

                <div className="suppliers-toolbar">


                    <div className="supplier-search">

                        <Search size={15} />

                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            value={search}
                            onChange={(e) => {
                                setSearch(
                                    e.target.value
                                );
                                setCurrentPage(1);
                            }}
                        />

                        {search && (

                            <button
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                <X size={13} />
                            </button>

                        )}

                    </div>


                    <div className="supplier-filters">

                        <Filter size={13} />

                        <button
                            className={
                                statusFilter === "All"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                setStatusFilter("All");
                                setCurrentPage(1);
                            }}
                        >
                            All
                        </button>

                        <button
                            className={
                                statusFilter === "Active"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                setStatusFilter("Active");
                                setCurrentPage(1);
                            }}
                        >
                            Active
                        </button>

                        <button
                            className={
                                statusFilter === "Inactive"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                setStatusFilter("Inactive");
                                setCurrentPage(1);
                            }}
                        >
                            Inactive
                        </button>

                    </div>

                </div>


                {/* ====================================
            TABLE
        ==================================== */}

                <div className="supplier-table-wrapper">

                    <table className="supplier-table">

                        <thead>

                            <tr>

                                <th>
                                    SUPPLIER
                                </th>

                                <th>
                                    CONTACT
                                </th>

                                <th>
                                    LOCATION
                                </th>

                                <th>
                                    PURCHASES
                                </th>

                                <th>
                                    TOTAL PURCHASED
                                </th>

                                <th>
                                    BALANCE
                                </th>

                                <th>
                                    STATUS
                                </th>

                                <th>
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {paginatedSuppliers.map(
                                (supplier) => (

                                    <tr key={supplier.supplier_id}>


                                        {/* SUPPLIER */}

                                        <td>

                                            <div className="supplier-name-cell">

                                                <div className="supplier-avatar">
                                                    {getInitials(
                                                        supplier.supplier_name
                                                    )}
                                                </div>

                                                <div>

                                                    <strong>
                                                        {supplier.supplier_name}
                                                    </strong>

                                                    <span>
                                                        {supplier.company_name}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* CONTACT */}

                                        <td>

                                            <div className="contact-cell">

                                                <div>
                                                    <Phone
                                                        size={10}
                                                    />
                                                    {supplier.phone}
                                                </div>

                                                <div>
                                                    <Mail
                                                        size={10}
                                                    />
                                                    {supplier.email}
                                                </div>

                                            </div>

                                        </td>


                                        {/* LOCATION */}

                                        <td>

                                            <div className="location-cell">

                                                <MapPin
                                                    size={11}
                                                />

                                                {supplier.address}

                                            </div>

                                        </td>


                                        {/* PURCHASES */}

                                        <td>

                                            <span className="purchase-count">
                                                {supplier.purchase_count}
                                            </span>

                                        </td>


                                        {/* TOTAL */}

                                        <td>

                                            <strong className="total-purchased">
                                                {money(
                                                    supplier.total_purchase
                                                )}
                                            </strong>

                                        </td>


                                        {/* BALANCE */}

                                        <td>

                                            <span
                                                className={
                                                    supplier.opening_balance > 0
                                                        ? "supplier-balance due"
                                                        : "supplier-balance paid"
                                                }
                                            >
                                                {supplier.opening_balance > 0
                                                    ? money(
                                                        supplier.opening_balance
                                                    )
                                                    : "₦0"}
                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`supplier-status ${supplier.status ===
                                                        "Active"
                                                        ? "status-active"
                                                        : "status-inactive"
                                                    }`}
                                            >

                                                {supplier.status ===
                                                    "Active" ? (
                                                    <CheckCircle2
                                                        size={10}
                                                    />
                                                ) : (
                                                    <Ban
                                                        size={10}
                                                    />
                                                )}

                                                {supplier.status}

                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <div className="supplier-action">

                                                <button
                                                    onClick={() => {

                                                        setOpenMenu(
                                                            openMenu ===
                                                                supplier.id
                                                                ? null
                                                                : supplier.id
                                                        );

                                                    }}
                                                >
                                                    <MoreVertical
                                                        size={15}
                                                    />
                                                </button>


                                                {openMenu ===
                                                    supplier.id && (

                                                        <div className="supplier-dropdown">

                                                            <button
                                                                onClick={() =>
                                                                    viewSupplier(
                                                                        supplier
                                                                    )
                                                                }
                                                            >
                                                                <Eye size={13} />
                                                                View
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    openEditSupplier(
                                                                        supplier
                                                                    )
                                                                }
                                                            >
                                                                <Pencil
                                                                    size={13}
                                                                />
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="delete-action"
                                                                onClick={() =>
                                                                    confirmDelete(
                                                                        supplier
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={13}
                                                                />
                                                                Delete
                                                            </button>

                                                        </div>

                                                    )}

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>


                    {/* EMPTY */}

                    {paginatedSuppliers.length ===
                        0 && (

                            <div className="supplier-empty">

                                <div className="supplier-empty-icon">
                                    <Users size={22} />
                                </div>

                                <strong>
                                    No suppliers found
                                </strong>

                                <span>
                                    Try changing your search
                                    or filter.
                                </span>

                            </div>

                        )}

                </div>


                {/* ====================================
            PAGINATION
        ==================================== */}

                {filteredSuppliers.length > 0 && (

                    <div className="supplier-pagination">

                        <span>

                            Showing{" "}

                            <strong>
                                {Math.min(
                                    (currentPage - 1) *
                                    ITEMS_PER_PAGE +
                                    1,
                                    filteredSuppliers.length
                                )}
                            </strong>

                            {" - "}

                            <strong>
                                {Math.min(
                                    currentPage *
                                    ITEMS_PER_PAGE,
                                    filteredSuppliers.length
                                )}
                            </strong>

                            {" of "}

                            <strong>
                                {filteredSuppliers.length}
                            </strong>

                        </span>


                        <div className="pagination-buttons">

                            <button
                                disabled={
                                    currentPage === 1
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage - 1
                                    )
                                }
                            >
                                <ChevronLeft
                                    size={13}
                                />
                            </button>


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
                                            ? "current"
                                            : ""
                                    }
                                    onClick={() =>
                                        setCurrentPage(page)
                                    }
                                >
                                    {page}
                                </button>

                            ))}


                            <button
                                disabled={
                                    currentPage ===
                                    totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage + 1
                                    )
                                }
                            >
                                <ChevronRight
                                    size={13}
                                />
                            </button>

                        </div>

                    </div>

                )}

            </div>


            {/* ======================================
          ADD / EDIT MODAL
      ====================================== */}

            {showSupplierModal && (

                <div
                    className="modal-overlay"
                    onMouseDown={() =>
                        setShowSupplierModal(false)
                    }
                >

                    <div
                        className="supplier-modal"
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>

                                <h2>
                                    {editingSupplier
                                        ? "Edit Supplier"
                                        : "Add Supplier"}
                                </h2>

                                <p>
                                    {editingSupplier
                                        ? "Update supplier information."
                                        : "Add a new supplier to your system."}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setShowSupplierModal(
                                        false
                                    )
                                }
                            >
                                <X size={16} />
                            </button>

                        </div>


                        <div className="modal-body">

                            <div className="modal-form-grid">


                                <div className="modal-field full">

                                    <label>
                                        Supplier Name *
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. ABC Distributors"
                                        value={
                                            supplierForm.name
                                        }
                                        onChange={(e) =>
                                            setSupplierForm({
                                                ...supplierForm,
                                                name:
                                                    e.target.value,
                                            })
                                        }
                                    />

                                </div>


                                <div className="modal-field">

                                    <label>
                                        Company
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Company name"
                                        value={
                                            supplierForm.company
                                        }
                                        onChange={(e) =>
                                            setSupplierForm({
                                                ...supplierForm,
                                                company:
                                                    e.target.value,
                                            })
                                        }
                                    />

                                </div>


                                <div className="modal-field">

                                    <label>
                                        Phone *
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="0800 000 0000"
                                        value={
                                            supplierForm.phone
                                        }
                                        onChange={(e) =>
                                            setSupplierForm({
                                                ...supplierForm,
                                                phone:
                                                    e.target.value,
                                            })
                                        }
                                    />

                                </div>


                                <div className="modal-field">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="supplier@email.com"
                                        value={
                                            supplierForm.email
                                        }
                                        onChange={(e) =>
                                            setSupplierForm({
                                                ...supplierForm,
                                                email:
                                                    e.target.value,
                                            })
                                        }
                                    />

                                </div>


                                <div className="modal-field">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        value={
                                            supplierForm.status
                                        }
                                        onChange={(e) =>
                                            setSupplierForm({
                                                ...supplierForm,
                                                status:
                                                    e.target.value,
                                            })
                                        }
                                    >

                                        <option>
                                            Active
                                        </option>

                                        <option>
                                            Inactive
                                        </option>

                                    </select>

                                </div>


                                <div className="modal-field full">

                                    <label>
                                        Address
                                    </label>

                                    <textarea
                                        placeholder="Supplier address"
                                        value={
                                            supplierForm.address
                                        }
                                        onChange={(e) =>
                                            setSupplierForm({
                                                ...supplierForm,
                                                address:
                                                    e.target.value,
                                            })
                                        }
                                    />

                                </div>

                            </div>

                        </div>


                        <div className="modal-footer">

                            <button
                                className="modal-cancel"
                                onClick={() =>
                                    setShowSupplierModal(
                                        false
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="modal-save"
                                onClick={saveSupplier}
                            >
                                <CheckCircle2
                                    size={14}
                                />

                                {editingSupplier
                                    ? "Update Supplier"
                                    : "Add Supplier"}

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* ======================================
          VIEW MODAL
      ====================================== */}

            {showViewModal &&
                selectedSupplier && (

                    <div
                        className="modal-overlay"
                        onMouseDown={() =>
                            setShowViewModal(false)
                        }
                    >

                        <div
                            className="view-supplier-modal"
                            onMouseDown={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <div className="modal-header">

                                <div>

                                    <h2>
                                        Supplier Details
                                    </h2>

                                    <p>
                                        Supplier account overview.
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        setShowViewModal(
                                            false
                                        )
                                    }
                                >
                                    <X size={16} />
                                </button>

                            </div>


                            <div className="supplier-profile">

                                <div className="large-supplier-avatar">
                                    {getInitials(
                                        selectedSupplier.supplier_name
                                    )}
                                </div>

                                <div>

                                    <h3>
                                        {selectedSupplier.supplier_name}
                                    </h3>

                                    <span>
                                        {selectedSupplier.company_name}
                                    </span>

                                </div>

                            </div>


                            <div className="supplier-detail-grid">

                                <div>
                                    <span>
                                        Phone
                                    </span>
                                    <strong>
                                        {selectedSupplier.phone}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Email
                                    </span>
                                    <strong>
                                        {selectedSupplier.email}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Location
                                    </span>
                                    <strong>
                                        {selectedSupplier.address}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Status
                                    </span>
                                    <strong>
                                        {selectedSupplier.status}
                                    </strong>
                                </div>

                            </div>


                            <div className="supplier-financials">

                                <div>

                                    <span>
                                        Purchases
                                    </span>

                                    <strong>
                                        {selectedSupplier.purchase_count}
                                    </strong>

                                </div>

                                <div>

                                    <span>
                                        Total Purchased
                                    </span>

                                    <strong>
                                        {money(
                                            selectedSupplier.total_purchase
                                        )}
                                    </strong>

                                </div>

                                <div>

                                    <span>
                                        Outstanding
                                    </span>

                                    <strong
                                        className={
                                            selectedSupplier.opening_balance >
                                                0
                                                ? "outstanding"
                                                : "cleared"
                                        }
                                    >
                                        {money(
                                            selectedSupplier.opening_balance
                                        )}
                                    </strong>

                                </div>

                            </div>


                            <div className="view-modal-footer">

                                <button
                                    onClick={() => {
                                        setShowViewModal(
                                            false
                                        );
                                        openEditSupplier(
                                            selectedSupplier
                                        );
                                    }}
                                >
                                    <Pencil size={13} />
                                    Edit Supplier
                                </button>

                            </div>

                        </div>

                    </div>

                )}


            {/* ======================================
          DELETE MODAL
      ====================================== */}

            {showDeleteModal &&
                selectedSupplier && (

                    <div className="modal-overlay">

                        <div className="delete-modal">

                            <div className="delete-icon">
                                <Trash2 size={19} />
                            </div>

                            <h2>
                                Delete Supplier?
                            </h2>

                            <p>
                                Are you sure you want to delete{" "}
                                <strong>
                                    {selectedSupplier.supplier_name}
                                </strong>
                                ? This action cannot be undone.
                            </p>

                            <div className="delete-actions">

                                <button
                                    onClick={() =>
                                        setShowDeleteModal(
                                            false
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="confirm-delete"
                                    onClick={
                                        () => deleteSupplier(selectedSupplier.id)
                                    }
                                >
                                    <Trash2 size={13} />
                                    Delete Supplier
                                </button>

                            </div>

                        </div>

                    </div>

                )}

        </>
    );
}

