
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MapPin,
  Phone,
  Users,
  Package,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import "./branches.css";
import Link from "next/link";

const branches = [
  {
    id: 1,
    code: "BR-001",
    name: "Head Office",
    location: "Ikeja, Lagos",
    address: "24 Allen Avenue, Ikeja",
    manager: "John Okafor",
    phone: "+234 803 456 7890",
    email: "ikeja@retailpos.com",
    staff: 12,
    products: 1842,
    sales: "₦4,285,600",
    status: "Active",
    created: "Jan 12, 2026",
  },
  {
    id: 2,
    code: "BR-002",
    name: "Victoria Island",
    location: "Victoria Island, Lagos",
    address: "18 Adeola Odeku Street",
    manager: "Sarah Williams",
    phone: "+234 806 223 4512",
    email: "vi@retailpos.com",
    staff: 8,
    products: 1654,
    sales: "₦3,742,300",
    status: "Active",
    created: "Feb 04, 2026",
  },
  {
    id: 3,
    code: "BR-003",
    name: "Lekki Branch",
    location: "Lekki Phase 1, Lagos",
    address: "15 Admiralty Way, Lekki",
    manager: "Michael James",
    phone: "+234 805 889 2341",
    email: "lekki@retailpos.com",
    staff: 7,
    products: 1498,
    sales: "₦2,981,450",
    status: "Active",
    created: "Mar 18, 2026",
  },
  {
    id: 4,
    code: "BR-004",
    name: "Surulere Branch",
    location: "Surulere, Lagos",
    address: "11 Adeniran Ogunsanya Street",
    manager: "David Peter",
    phone: "+234 809 332 7712",
    email: "surulere@retailpos.com",
    staff: 6,
    products: 1287,
    sales: "₦2,154,800",
    status: "Active",
    created: "Apr 09, 2026",
  },
  {
    id: 5,
    code: "BR-005",
    name: "Port Harcourt Branch",
    location: "GRA, Port Harcourt",
    address: "32 Aba Road, GRA",
    manager: "Daniel Emmanuel",
    phone: "+234 807 442 1209",
    email: "ph@retailpos.com",
    staff: 9,
    products: 1722,
    sales: "₦3,120,700",
    status: "Active",
    created: "May 21, 2026",
  },
  {
    id: 6,
    code: "BR-006",
    name: "Owerri Branch",
    location: "Owerri, Imo",
    address: "7 Wetheral Road, Owerri",
    manager: "Peter Collins",
    phone: "+234 802 712 8890",
    email: "owerri@retailpos.com",
    staff: 5,
    products: 1043,
    sales: "₦1,632,400",
    status: "Active",
    created: "Jun 03, 2026",
  },
  {
    id: 7,
    code: "BR-007",
    name: "Abuja Branch",
    location: "Wuse 2, Abuja",
    address: "21 Aminu Kano Crescent",
    manager: "Grace Johnson",
    phone: "+234 810 621 7783",
    email: "abuja@retailpos.com",
    staff: 10,
    products: 1579,
    sales: "₦2,874,100",
    status: "Active",
    created: "Jul 12, 2026",
  },
  {
    id: 8,
    code: "BR-008",
    name: "Benin Branch",
    location: "Benin City, Edo",
    address: "9 Sapele Road, Benin City",
    manager: "Anthony Obi",
    phone: "+234 813 992 6104",
    email: "benin@retailpos.com",
    staff: 4,
    products: 921,
    sales: "₦1,204,600",
    status: "Inactive",
    created: "Jul 28, 2026",
  },
];

export default function BranchesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedBranch, setSelectedBranch] =
    useState(null);

  const [showDelete, setShowDelete] =
    useState(null);

  const [openMenu, setOpenMenu] =
    useState(null);

  const itemsPerPage = 6;

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const query = search.toLowerCase();

      const matchesSearch =
        branch.name
          .toLowerCase()
          .includes(query) ||
        branch.code
          .toLowerCase()
          .includes(query) ||
        branch.location
          .toLowerCase()
          .includes(query) ||
        branch.manager
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All Status" ||
        branch.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredBranches.length /
        itemsPerPage
    )
  );

  const visibleBranches =
    filteredBranches.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const activeBranches = branches.filter(
    (b) => b.status === "Active"
  ).length;

  const inactiveBranches = branches.filter(
    (b) => b.status === "Inactive"
  ).length;

  const totalStaff = branches.reduce(
    (total, branch) =>
      total + branch.staff,
    0
  );

  const totalProducts = branches.reduce(
    (total, branch) =>
      total + branch.products,
    0
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Status");
    setCurrentPage(1);
  };

  return (
    <div className="branches-page content-wrapper">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="branches-header">

        <div>

          <div className="branches-breadcrumb">
            Admin
            <span>/</span>
            Branches
          </div>

          <h1>
            All Branches
          </h1>

          <p>
            Manage your business locations,
            staff and branch operations.
          </p>

        </div>

        <Link
          className="add-branch-btn"
          href="/admin/branches/add"
        >
          <Plus size={13} />
          Add Branch
        </Link>

      </div>


      {/* =====================================
          STAT CARDS
      ===================================== */}

      <div className="branch-stats">

        <StatCard
          icon={<Building2 size={15} />}
          label="Total Branches"
          value={branches.length}
          detail="All locations"
          type="blue"
        />

        <StatCard
          icon={<CheckCircle2 size={15} />}
          label="Active Branches"
          value={activeBranches}
          detail="Currently operational"
          type="green"
        />

        <StatCard
          icon={<Users size={15} />}
          label="Total Staff"
          value={totalStaff}
          detail="Across all branches"
          type="purple"
        />

        <StatCard
          icon={<Package size={15} />}
          label="Total Products"
          value={totalProducts.toLocaleString()}
          detail="Branch inventory"
          type="orange"
        />

      </div>


      {/* =====================================
          TABLE CARD
      ===================================== */}

      <div className="branches-card">

        {/* TOOLBAR */}

        <div className="branches-toolbar">

          <div className="branch-search">

            <Search size={13} />

            <input
              type="text"
              placeholder="Search branches..."
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );
                setCurrentPage(1);
              }}
            />

          </div>


          <div className="branch-toolbar-right">

            <div className="branch-filter">

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(
                    e.target.value
                  );
                  setCurrentPage(1);
                }}
              >
                <option>
                  All Status
                </option>
                <option>
                  Active
                </option>
                <option>
                  Inactive
                </option>
              </select>

              <ChevronDown size={10} />

            </div>

            <button
              className="filter-button"
              onClick={resetFilters}
            >
              <Filter size={12} />
              Reset
            </button>

          </div>

        </div>


        {/* ===================================
            TABLE
        =================================== */}

        <div className="branches-table-wrapper">

          <table className="branches-table">

            <thead>

              <tr>

                <th>
                  BRANCH
                </th>

                <th>
                  LOCATION
                </th>

                <th>
                  MANAGER
                </th>

                <th>
                  CONTACT
                </th>

                <th>
                  STAFF
                </th>

                <th>
                  PRODUCTS
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {visibleBranches.length > 0 ? (

                visibleBranches.map(
                  (branch) => (

                    <tr key={branch.id}>

                      {/* BRANCH */}

                      <td>

                        <div className="branch-name">

                          <div className="branch-logo">
                            <Building2 size={13} />
                          </div>

                          <div>

                            <strong>
                              {branch.name}
                            </strong>

                            <span>
                              {branch.code}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* LOCATION */}

                      <td>

                        <div className="location-cell">

                          <MapPin size={11} />

                          <div>

                            <strong>
                              {branch.location}
                            </strong>

                            <span>
                              {branch.address}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* MANAGER */}

                      <td>

                        <div className="manager-cell">

                          <div className="manager-avatar">
                            {getInitials(
                              branch.manager
                            )}
                          </div>

                          <span>
                            {branch.manager}
                          </span>

                        </div>

                      </td>


                      {/* CONTACT */}

                      <td>

                        <div className="contact-cell">

                          <div>
                            <Phone size={9} />
                            <span>
                              {branch.phone}
                            </span>
                          </div>

                          <small>
                            {branch.email}
                          </small>

                        </div>

                      </td>


                      {/* STAFF */}

                      <td>

                        <span className="number-value">
                          {branch.staff}
                        </span>

                      </td>


                      {/* PRODUCTS */}

                      <td>

                        <span className="number-value">
                          {branch.products.toLocaleString()}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${
                            branch.status ===
                            "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >

                          <span className="status-dot" />

                          {branch.status}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <div className="action-wrapper">

                          <button
                            className="action-btn"
                            onClick={() =>
                              setSelectedBranch(
                                branch
                              )
                            }
                          >
                            <Eye size={11} />
                          </button>

                          <button
                            className="action-btn"
                            onClick={() =>
                              console.log(
                                "Edit",
                                branch.id
                              )
                            }
                          >
                            <Pencil size={11} />
                          </button>

                          <button
                            className="action-btn more"
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  branch.id
                                  ? null
                                  : branch.id
                              )
                            }
                          >
                            <MoreHorizontal
                              size={12}
                            />
                          </button>


                          {openMenu ===
                            branch.id && (
                            <div className="action-menu">

                              <button
                                onClick={() => {
                                  setSelectedBranch(
                                    branch
                                  );
                                  setOpenMenu(null);
                                }}
                              >
                                <Eye size={11} />
                                View Branch
                              </button>

                              <button
                                onClick={() => {
                                  console.log(
                                    "Edit",
                                    branch.id
                                  );
                                  setOpenMenu(null);
                                }}
                              >
                                <Pencil size={11} />
                                Edit Branch
                              </button>

                              <button
                                className="danger"
                                onClick={() => {
                                  setShowDelete(
                                    branch
                                  );
                                  setOpenMenu(null);
                                }}
                              >
                                <Trash2 size={11} />
                                Delete Branch
                              </button>

                            </div>
                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-branches"
                  >

                    <Building2 size={25} />

                    <strong>
                      No branches found
                    </strong>

                    <span>
                      Try changing your
                      search or filter.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ===================================
            FOOTER
        =================================== */}

        <div className="branches-footer">

          <span>

            Showing{" "}

            <strong>
              {filteredBranches.length === 0
                ? 0
                : (currentPage - 1) *
                    itemsPerPage +
                  1}
            </strong>

            {" - "}

            <strong>
              {Math.min(
                currentPage *
                  itemsPerPage,
                filteredBranches.length
              )}
            </strong>

            {" of "}

            <strong>
              {filteredBranches.length}
            </strong>

            {" branches"}

          </span>


          <div className="pagination">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  Math.max(
                    1,
                    currentPage - 1
                  )
                )
              }
            >
              <ChevronLeft size={12} />
            </button>


            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => i + 1
            )
              .slice(0, 5)
              .map((page) => (

                <button
                  key={page}
                  className={
                    page === currentPage
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
                  Math.min(
                    totalPages,
                    currentPage + 1
                  )
                )
              }
            >
              <ChevronRight size={12} />
            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          VIEW BRANCH MODAL
      ===================================== */}

      {selectedBranch && (

        <div
          className="branch-modal-overlay"
          onClick={() =>
            setSelectedBranch(null)
          }
        >

          <div
            className="branch-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div className="modal-branch-title">

                <div className="modal-branch-icon">
                  <Building2 size={16} />
                </div>

                <div>

                  <h2>
                    {selectedBranch.name}
                  </h2>

                  <span>
                    {selectedBranch.code}
                  </span>

                </div>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedBranch(null)
                }
              >
                <X size={14} />
              </button>

            </div>


            <div className="modal-body">

              <div className="modal-status-row">

                <span>
                  Branch Status
                </span>

                <span
                  className={`status-badge ${
                    selectedBranch.status ===
                    "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <span className="status-dot" />
                  {selectedBranch.status}
                </span>

              </div>


              <div className="modal-grid">

                <Info
                  label="Location"
                  value={
                    selectedBranch.location
                  }
                />

                <Info
                  label="Address"
                  value={
                    selectedBranch.address
                  }
                />

                <Info
                  label="Manager"
                  value={
                    selectedBranch.manager
                  }
                />

                <Info
                  label="Phone"
                  value={
                    selectedBranch.phone
                  }
                />

                <Info
                  label="Email"
                  value={
                    selectedBranch.email
                  }
                />

                <Info
                  label="Created"
                  value={
                    selectedBranch.created
                  }
                />

              </div>


              <div className="modal-metrics">

                <div>
                  <span>
                    Staff
                  </span>

                  <strong>
                    {selectedBranch.staff}
                  </strong>
                </div>

                <div>
                  <span>
                    Products
                  </span>

                  <strong>
                    {selectedBranch.products.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>
                    Sales
                  </span>

                  <strong>
                    {selectedBranch.sales}
                  </strong>
                </div>

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="modal-edit"
                onClick={() =>
                  console.log(
                    "Edit",
                    selectedBranch.id
                  )
                }
              >
                <Pencil size={11} />
                Edit Branch
              </button>

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedBranch(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          DELETE MODAL
      ===================================== */}

      {showDelete && (

        <div
          className="branch-modal-overlay"
          onClick={() =>
            setShowDelete(null)
          }
        >

          <div
            className="delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="delete-icon">
              <Trash2 size={17} />
            </div>

            <h2>
              Delete Branch?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {showDelete.name}
              </strong>
              ? This action cannot be
              undone.
            </p>

            <div className="delete-actions">

              <button
                className="cancel-delete"
                onClick={() =>
                  setShowDelete(null)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={() => {
                  console.log(
                    "Delete",
                    showDelete.id
                  );
                  setShowDelete(null);
                }}
              >
                Delete Branch
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ==========================================
   STAT CARD
========================================== */

function StatCard({
  icon,
  label,
  value,
  detail,
  type,
}) {
  return (
    <div className="branch-stat">

      <div className={`branch-stat-icon ${type}`}>
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {detail}
        </small>

      </div>

    </div>
  );
}


/* ==========================================
   INFO
========================================== */

function Info({ label, value }) {
  return (
    <div className="branch-info">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


/* ==========================================
   INITIALS
========================================== */

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

