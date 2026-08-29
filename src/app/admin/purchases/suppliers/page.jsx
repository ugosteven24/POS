
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

import "./purchase-suppliers.css";


// ==========================================
// SAMPLE DATA
// ==========================================

const supplierData = [
  {
    id: 1,
    name: "Oraimo Nigeria",
    company: "Oraimo Trading Ltd.",
    phone: "0803 421 9087",
    email: "sales@oraimo.ng",
    address: "Ikeja, Lagos",
    purchases: 38,
    totalPurchased: 4850000,
    balance: 320000,
    status: "Active",
  },
  {
    id: 2,
    name: "Tech Accessories Ltd",
    company: "Tech Accessories Ltd.",
    phone: "0806 332 1172",
    email: "info@techaccessories.ng",
    address: "Computer Village, Lagos",
    purchases: 27,
    totalPurchased: 2980000,
    balance: 185000,
    status: "Active",
  },
  {
    id: 3,
    name: "Samsung Distributor",
    company: "Samsung Electronics",
    phone: "0814 555 8210",
    email: "orders@samsungdist.ng",
    address: "Victoria Island, Lagos",
    purchases: 19,
    totalPurchased: 8120000,
    balance: 0,
    status: "Active",
  },
  {
    id: 4,
    name: "HP Distributor",
    company: "HP Nigeria Distribution",
    phone: "0802 731 4418",
    email: "sales@hpdistribution.ng",
    address: "Ikeja, Lagos",
    purchases: 14,
    totalPurchased: 6450000,
    balance: 450000,
    status: "Active",
  },
  {
    id: 5,
    name: "JBL Distributor",
    company: "JBL Audio Nigeria",
    phone: "0703 812 9921",
    email: "jbl@audionigeria.ng",
    address: "Lekki, Lagos",
    purchases: 11,
    totalPurchased: 1780000,
    balance: 0,
    status: "Active",
  },
  {
    id: 6,
    name: "Kingston Distributor",
    company: "Kingston Technology",
    phone: "0810 442 1830",
    email: "kingston@techdist.ng",
    address: "Yaba, Lagos",
    purchases: 8,
    totalPurchased: 925000,
    balance: 75000,
    status: "Active",
  },
  {
    id: 7,
    name: "Computer World Ltd",
    company: "Computer World Nigeria",
    phone: "0809 712 6401",
    email: "contact@computerworld.ng",
    address: "Wuse, Abuja",
    purchases: 6,
    totalPurchased: 1320000,
    balance: 210000,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Mobile Hub Nigeria",
    company: "Mobile Hub Distribution",
    phone: "0705 341 2268",
    email: "mobilehub@gmail.com",
    address: "Onitsha, Anambra",
    purchases: 4,
    totalPurchased: 870000,
    balance: 0,
    status: "Inactive",
  },
];


// ==========================================
// COMPONENT
// ==========================================

export default function PurchaseSuppliers() {

  const [suppliers, setSuppliers] =
    useState(supplierData);

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

  const [supplierForm, setSupplierForm] =
    useState({
      name: "",
      company: "",
      phone: "",
      email: "",
      address: "",
      status: "Active",
    });


  const ITEMS_PER_PAGE = 6;


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
        supplier.name
          .toLowerCase()
          .includes(query) ||
        supplier.company
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

  const totalPages =
    Math.ceil(
      filteredSuppliers.length /
        ITEMS_PER_PAGE
    );

  const paginatedSuppliers =
    filteredSuppliers.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage *
        ITEMS_PER_PAGE
    );


  // ==========================================
  // STATISTICS
  // ==========================================

  const totalSuppliers =
    suppliers.length;

  const activeSuppliers =
    suppliers.filter(
      (supplier) =>
        supplier.status === "Active"
    ).length;

  const totalPurchases =
    suppliers.reduce(
      (sum, supplier) =>
        sum + supplier.totalPurchased,
      0
    );

  const outstandingBalance =
    suppliers.reduce(
      (sum, supplier) =>
        sum + supplier.balance,
      0
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


  const deleteSupplier = () => {

    setSuppliers(
      suppliers.filter(
        (supplier) =>
          supplier.id !==
          selectedSupplier.id
      )
    );

    setShowDeleteModal(false);
    setSelectedSupplier(null);
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

    <div className="suppliers-page content-wrapper">


      {/* ======================================
          HEADER
      ====================================== */}

      <div className="suppliers-header">

        <div>

          <div className="suppliers-title-row">

            <div className="suppliers-title-icon">
              <Building2 size={19} />
            </div>

            <div>

              <h1>
                Purchase Suppliers
              </h1>

              <p>
                Manage suppliers and track
                your purchase relationships.
              </p>

            </div>

          </div>

        </div>


        <button
          className="add-supplier-btn"
          onClick={openAddSupplier}
        >
          <Plus size={15} />
          Add Supplier
        </button>

      </div>


      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="supplier-stat-grid">


        <div className="supplier-stat-card">

          <div className="supplier-stat-icon blue">
            <Users size={17} />
          </div>

          <div>

            <span>
              Total Suppliers
            </span>

            <strong>
              {totalSuppliers}
            </strong>

          </div>

        </div>


        <div className="supplier-stat-card">

          <div className="supplier-stat-icon green">
            <CheckCircle2 size={17} />
          </div>

          <div>

            <span>
              Active Suppliers
            </span>

            <strong>
              {activeSuppliers}
            </strong>

          </div>

        </div>


        <div className="supplier-stat-card">

          <div className="supplier-stat-icon purple">
            <ShoppingCart size={17} />
          </div>

          <div>

            <span>
              Total Purchases
            </span>

            <strong>
              {money(totalPurchases)}
            </strong>

          </div>

        </div>


        <div className="supplier-stat-card">

          <div className="supplier-stat-icon orange">
            <Wallet size={17} />
          </div>

          <div>

            <span>
              Outstanding Balance
            </span>

            <strong>
              {money(outstandingBalance)}
            </strong>

          </div>

        </div>

      </div>


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

                  <tr key={supplier.id}>


                    {/* SUPPLIER */}

                    <td>

                      <div className="supplier-name-cell">

                        <div className="supplier-avatar">
                          {getInitials(
                            supplier.name
                          )}
                        </div>

                        <div>

                          <strong>
                            {supplier.name}
                          </strong>

                          <span>
                            {supplier.company}
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
                        {supplier.purchases}
                      </span>

                    </td>


                    {/* TOTAL */}

                    <td>

                      <strong className="total-purchased">
                        {money(
                          supplier.totalPurchased
                        )}
                      </strong>

                    </td>


                    {/* BALANCE */}

                    <td>

                      <span
                        className={
                          supplier.balance > 0
                            ? "supplier-balance due"
                            : "supplier-balance paid"
                        }
                      >
                        {supplier.balance > 0
                          ? money(
                              supplier.balance
                            )
                          : "₦0"}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`supplier-status ${
                          supplier.status ===
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
                  selectedSupplier.name
                )}
              </div>

              <div>

                <h3>
                  {selectedSupplier.name}
                </h3>

                <span>
                  {selectedSupplier.company}
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
                  {selectedSupplier.purchases}
                </strong>

              </div>

              <div>

                <span>
                  Total Purchased
                </span>

                <strong>
                  {money(
                    selectedSupplier.totalPurchased
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Outstanding
                </span>

                <strong
                  className={
                    selectedSupplier.balance >
                    0
                      ? "outstanding"
                      : "cleared"
                  }
                >
                  {money(
                    selectedSupplier.balance
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
                {selectedSupplier.name}
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
                  deleteSupplier
                }
              >
                <Trash2 size={13} />
                Delete Supplier
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

