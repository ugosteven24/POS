"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Plus,
    Users,
    UserCheck,
    UserX,
    Wallet,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    Phone,
    Mail,
    MapPin,
    Download,
    Filter,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";
import { getCustomers } from "@/services/customers/customerService";



const formatCurrency = (value) =>
    `₦${Number(value || 0).toLocaleString("en-NG")}`;

const getInitials = (name) =>
    name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

export default function AllCustomers() {
    const [customers, setCustomers] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [openMenu, setOpenMenu] = useState(null);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const ITEMS_PER_PAGE = 6;

    // NOTE: the server already handles search, status filtering, and
    // pagination (it receives page/limit/search/status), so we trust its
    // response directly instead of re-filtering/re-slicing on the client.
    const loadCustomers = async () => {
        const result = await getCustomers({
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            search,
            status: statusFilter,
        });

        if (result.success) {
            setCustomers(result.data);
            setTotalCustomers(result.total);
            setTotalPages(result.totalPages);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, [
        currentPage,
        search,
        statusFilter,
    ]);

    const deleteCustomer = () => {
        if (!customerToDelete) return;

        setCustomers((current) =>
            current.filter(
                (customer) =>
                    customer.id !== customerToDelete.id
            )
        );

        setShowDeleteModal(false);
        setCustomerToDelete(null);
    };

    const openDelete = (customer) => {
        setCustomerToDelete(customer);
        setShowDeleteModal(true);
        setOpenMenu(null);
    };



    return (
        <>
            {/* =====================================
          CUSTOMER TABLE CARD
      ===================================== */}

            <div className="customers-table-card">

                {/* TOOLBAR */}

                <div className="customers-toolbar">

                    <div className="toolbar-left">

                        <div className="customer-search">

                            <Search size={14} />

                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }
                                }
                            />

                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setCurrentPage(1);
                                    }}
                                >
                                    <X size={12} />
                                </button>
                            )}

                        </div>


                        <div className="status-filter">

                            <Filter size={12} />

                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value)
                                    setCurrentPage(1);
                                }
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


                    <div className="result-count">

                        Showing{" "}
                        <strong>
                            {customers.length}
                        </strong>{" "}
                        of {totalCustomers}

                    </div>

                </div>


                {/* TABLE */}

                <div className="customers-table-wrapper">

                    <table className="customers-table">

                        <thead>

                            <tr>

                                <th>
                                    CUSTOMER
                                </th>

                                <th>
                                    CONTACT
                                </th>

                                <th>
                                    PURCHASES
                                </th>

                                <th>
                                    TOTAL SPENT
                                </th>

                                <th>
                                    BALANCE
                                </th>

                                <th>
                                    STATUS
                                </th>

                                <th>
                                    JOINED
                                </th>

                                <th>
                                    ACTION
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {customers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="empty-table"
                                    >

                                        <div className="empty-icon">
                                            <Users size={23} />
                                        </div>

                                        <strong>
                                            No customers found
                                        </strong>

                                        <span>
                                            Try changing your search or filter.
                                        </span>

                                    </td>

                                </tr>

                            ) : (

                                customers.map(
                                    (customer) => (

                                        <tr key={customer.id}>

                                            {/* CUSTOMER */}

                                            <td>

                                                <div className="customer-profile">

                                                    <div className="customer-avatar">
                                                        {getInitials(
                                                            customer.name
                                                        )}
                                                    </div>

                                                    <div className="customer-name">

                                                        <strong>
                                                            {customer.name}
                                                        </strong>

                                                        <span>
                                                            CUST-
                                                            {String(
                                                                customer.id
                                                            ).padStart(
                                                                5,
                                                                "0"
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* CONTACT */}

                                            <td>

                                                <div className="contact-info">

                                                    <div>
                                                        <Phone size={10} />
                                                        <span>
                                                            {customer.phone}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <Mail size={10} />
                                                        <span>
                                                            {customer.email}
                                                        </span>
                                                    </div>

                                                </div>

                                            </td>


                                            {/* PURCHASES */}

                                            <td>

                                                <div className="purchase-count">
                                                    <strong>
                                                        {customer.purchases}
                                                    </strong>

                                                    <span>
                                                        orders
                                                    </span>
                                                </div>

                                            </td>


                                            {/* SPENT */}

                                            <td>

                                                <strong className="spent-value">
                                                    {formatCurrency(
                                                        customer.spent
                                                    )}
                                                </strong>

                                            </td>


                                            {/* BALANCE */}

                                            <td>

                                                {customer.balance > 0 ? (

                                                    <div className="balance-due">

                                                        <strong>
                                                            {formatCurrency(
                                                                customer.balance
                                                            )}
                                                        </strong>

                                                        <span>
                                                            Due
                                                        </span>

                                                    </div>

                                                ) : (

                                                    <span className="no-balance">
                                                        No balance
                                                    </span>

                                                )}

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`customer-status ${customer.status ===
                                                        "Active"
                                                        ? "active"
                                                        : "inactive"
                                                        }`}
                                                >

                                                    <i></i>

                                                    {customer.status}

                                                </span>

                                            </td>


                                            {/* JOINED */}

                                            <td>

                                                <span className="joined-date">
                                                    {customer.joined}
                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                <div
                                                    className="customer-actions"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >

                                                    <button
                                                        className="view-action"
                                                        title="View customer"
                                                        onClick={() =>
                                                            setSelectedCustomer(
                                                                customer
                                                            )
                                                        }
                                                    >
                                                        <Eye size={13} />
                                                    </button>


                                                    <button
                                                        className="more-action"
                                                        onClick={() =>
                                                            setOpenMenu(
                                                                openMenu ===
                                                                    customer.id
                                                                    ? null
                                                                    : customer.id
                                                            )
                                                        }
                                                    >
                                                        <MoreVertical
                                                            size={14}
                                                        />
                                                    </button>


                                                    {openMenu ===
                                                        customer.id && (

                                                            <div className="action-menu">

                                                                <button
                                                                    onClick={() =>
                                                                        setSelectedCustomer(
                                                                            customer
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye size={13} />
                                                                    View Customer
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                    (window.location.href =
                                                                        `/admin/customers/edit/${customer.id}`)
                                                                    }
                                                                >
                                                                    <Pencil size={13} />
                                                                    Edit Customer
                                                                </button>

                                                                <div></div>

                                                                <button
                                                                    className="delete-menu"
                                                                    onClick={() =>
                                                                        openDelete(
                                                                            customer
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 size={13} />
                                                                    Delete Customer
                                                                </button>

                                                            </div>

                                                        )}

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ====================================
            PAGINATION
        ==================================== */}

            {customers.length > 0 && (

                <div className="supplier-pagination">

                    <span>

                        Showing{" "}

                        <strong>
                            {Math.min(
                                (currentPage - 1) *
                                ITEMS_PER_PAGE +
                                1,
                                totalCustomers
                            )}
                        </strong>

                        {" - "}

                        <strong>
                            {Math.min(
                                currentPage *
                                ITEMS_PER_PAGE,
                                totalCustomers
                            )}
                        </strong>

                        {" of "}

                        <strong>
                            {totalCustomers}
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
            {/* =====================================
          CUSTOMER DETAILS MODAL
      ===================================== */}

            {selectedCustomer && (

                <div
                    className="customer-modal-overlay"
                    onClick={() =>
                        setSelectedCustomer(null)
                    }
                >

                    <div
                        className="customer-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <div>
                                <h2>
                                    Customer Details
                                </h2>

                                <span>
                                    Customer profile information
                                </span>
                            </div>

                            <button
                                onClick={() =>
                                    setSelectedCustomer(null)
                                }
                            >
                                <X size={15} />
                            </button>

                        </div>


                        <div className="modal-customer-profile">

                            <div className="modal-avatar">
                                {getInitials(
                                    selectedCustomer.name
                                )}
                            </div>

                            <div>

                                <h3>
                                    {selectedCustomer.name}
                                </h3>

                                <span>
                                    CUST-
                                    {String(
                                        selectedCustomer.id
                                    ).padStart(5, "0")}
                                </span>

                            </div>

                            <span
                                className={`customer-status ${selectedCustomer.status ===
                                    "Active"
                                    ? "active"
                                    : "inactive"
                                    }`}
                            >
                                <i></i>
                                {selectedCustomer.status}
                            </span>

                        </div>


                        <div className="modal-info-grid">

                            <div className="modal-info-item">

                                <Phone size={14} />

                                <div>
                                    <span>Phone</span>
                                    <strong>
                                        {selectedCustomer.phone}
                                    </strong>
                                </div>

                            </div>


                            <div className="modal-info-item">

                                <Mail size={14} />

                                <div>
                                    <span>Email</span>
                                    <strong>
                                        {selectedCustomer.email}
                                    </strong>
                                </div>

                            </div>


                            <div className="modal-info-item">

                                <MapPin size={14} />

                                <div>
                                    <span>Address</span>
                                    <strong>
                                        {selectedCustomer.address}
                                    </strong>
                                </div>

                            </div>


                            <div className="modal-info-item">

                                <Wallet size={14} />

                                <div>
                                    <span>Outstanding</span>
                                    <strong>
                                        {formatCurrency(
                                            selectedCustomer.balance
                                        )}
                                    </strong>
                                </div>

                            </div>

                        </div>


                        <div className="modal-stats">

                            <div>
                                <span>Total Purchases</span>
                                <strong>
                                    {selectedCustomer.purchases}
                                </strong>
                            </div>

                            <div>
                                <span>Total Spent</span>
                                <strong>
                                    {formatCurrency(
                                        selectedCustomer.spent
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>Customer Since</span>
                                <strong>
                                    {selectedCustomer.joined}
                                </strong>
                            </div>

                        </div>


                        <div className="modal-footer">

                            <button
                                className="modal-close"
                                onClick={() =>
                                    setSelectedCustomer(null)
                                }
                            >
                                Close
                            </button>

                            <button
                                className="modal-edit"
                                onClick={() =>
                                (window.location.href =
                                    `/admin/customers/edit/${selectedCustomer.id}`)
                                }
                            >
                                <Pencil size={13} />
                                Edit Customer
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================
          DELETE MODAL
      ===================================== */}

            {showDeleteModal && (

                <div
                    className="customer-modal-overlay"
                    onClick={() =>
                        setShowDeleteModal(false)
                    }
                >

                    <div
                        className="delete-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="delete-icon">
                            <Trash2 size={19} />
                        </div>

                        <h2>
                            Delete Customer?
                        </h2>

                        <p>
                            Are you sure you want to delete{" "}
                            <strong>
                                {customerToDelete?.name}
                            </strong>
                            ? This action cannot be undone.
                        </p>

                        <div className="delete-actions">

                            <button
                                onClick={() =>
                                    setShowDeleteModal(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete"
                                onClick={deleteCustomer}
                            >
                                Delete Customer
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}