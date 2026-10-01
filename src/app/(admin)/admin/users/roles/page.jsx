
"use client";

import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  ShieldCheck,
  Users,
  MoreVertical,
  Eye,
  Pencil,
  Copy,
  Trash2,
  CheckCircle2,
  Lock,
  ChevronDown,
  X,
  SlidersHorizontal,
} from "lucide-react";

import "./roles.css";

const initialRoles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full access to all system modules and settings.",
    users: 2,
    permissions: 38,
    status: "Active",
    protected: true,
    color: "blue",
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage daily operations, sales, inventory and reports.",
    users: 4,
    permissions: 27,
    status: "Active",
    protected: true,
    color: "purple",
  },
  {
    id: 3,
    name: "Cashier",
    description: "Process sales, manage customers and handle POS transactions.",
    users: 8,
    permissions: 12,
    status: "Active",
    protected: true,
    color: "green",
  },
  {
    id: 4,
    name: "Accountant",
    description: "Access financial records, expenses, purchases and reports.",
    users: 2,
    permissions: 18,
    status: "Active",
    protected: false,
    color: "orange",
  },
  {
    id: 5,
    name: "Inventory Staff",
    description: "Manage products, stock movements and inventory records.",
    users: 5,
    permissions: 14,
    status: "Active",
    protected: false,
    color: "teal",
  },
  {
    id: 6,
    name: "Sales Staff",
    description: "Access sales and customer management features.",
    users: 3,
    permissions: 9,
    status: "Active",
    protected: false,
    color: "pink",
  },
  {
    id: 7,
    name: "Auditor",
    description: "Read-only access to reports and transaction records.",
    users: 1,
    permissions: 8,
    status: "Inactive",
    protected: false,
    color: "gray",
  },
];

const permissionGroups = [
  {
    name: "Dashboard",
    permissions: ["View Dashboard"],
  },
  {
    name: "Sales",
    permissions: [
      "View Sales",
      "Create Sale",
      "Edit Sale",
      "Delete Sale",
      "Return Sale",
    ],
  },
  {
    name: "Products",
    permissions: [
      "View Products",
      "Add Product",
      "Edit Product",
      "Delete Product",
    ],
  },
  {
    name: "Inventory",
    permissions: [
      "View Stock",
      "Stock Adjustment",
      "Stock Transfer",
      "Stock History",
    ],
  },
  {
    name: "Purchases",
    permissions: [
      "View Purchases",
      "Create Purchase",
      "Edit Purchase",
      "Purchase Return",
    ],
  },
  {
    name: "Customers",
    permissions: [
      "View Customers",
      "Add Customer",
      "Edit Customer",
      "Delete Customer",
    ],
  },
  {
    name: "Expenses",
    permissions: [
      "View Expenses",
      "Add Expense",
      "Edit Expense",
      "Delete Expense",
    ],
  },
  {
    name: "Reports",
    permissions: [
      "Sales Report",
      "Purchase Report",
      "Inventory Report",
      "Profit & Loss",
      "Expenses Report",
      "Cashiers Report",
    ],
  },
  {
    name: "Users",
    permissions: [
      "View Users",
      "Add User",
      "Edit User",
      "Delete User",
      "Manage Roles",
    ],
  },
  {
    name: "Settings",
    permissions: [
      "General Settings",
      "Business Settings",
      "System Settings",
    ],
  },
];

export default function UserRolesPage() {
  const [roles, setRoles] = useState(initialRoles);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [activeMenu, setActiveMenu] =
    useState(null);

  const [selectedRole, setSelectedRole] =
    useState(null);

  const [showDelete, setShowDelete] =
    useState(false);

  const [showPermissions, setShowPermissions] =
    useState(false);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesSearch =
        role.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        role.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        role.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [roles, search, statusFilter]);

  const totalUsers = roles.reduce(
    (sum, role) => sum + role.users,
    0
  );

  const activeRoles = roles.filter(
    (role) => role.status === "Active"
  ).length;

  const customRoles = roles.filter(
    (role) => !role.protected
  ).length;

  const openDelete = (role) => {
    setSelectedRole(role);
    setShowDelete(true);
    setActiveMenu(null);
  };

  const deleteRole = () => {
    if (!selectedRole) return;

    setRoles((current) =>
      current.filter(
        (role) =>
          role.id !== selectedRole.id
      )
    );

    setShowDelete(false);
    setSelectedRole(null);
  };

  const duplicateRole = (role) => {
    const duplicated = {
      ...role,
      id: Date.now(),
      name: `${role.name} Copy`,
      users: 0,
      protected: false,
    };

    setRoles((current) => [
      ...current,
      duplicated,
    ]);

    setActiveMenu(null);
  };

  return (
    <div
      className="roles-page content-wrapper"
      onClick={() => setActiveMenu(null)}
    >

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="roles-header">

        <div>

          <div className="breadcrumb">
            Users
            <span>/</span>
            Roles
          </div>

          <h1>User Roles</h1>

          <p>
            Manage user roles and control
            access to your POS system.
          </p>

        </div>


        <button
          className="add-role-btn"
          onClick={() =>
            (window.location.href =
              "/admin/users/roles/add")
          }
        >
          <Plus size={14} />
          Add Role
        </button>

      </div>


      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="roles-stats">

        <StatCard
          icon={<ShieldCheck size={15} />}
          label="Total Roles"
          value={roles.length}
          detail="System roles"
          type="blue"
        />

        <StatCard
          icon={<CheckCircle2 size={15} />}
          label="Active Roles"
          value={activeRoles}
          detail="Currently enabled"
          type="green"
        />

        <StatCard
          icon={<Users size={15} />}
          label="Assigned Users"
          value={totalUsers}
          detail="Across all roles"
          type="purple"
        />

        <StatCard
          icon={<SlidersHorizontal size={15} />}
          label="Custom Roles"
          value={customRoles}
          detail="Created by admin"
          type="orange"
        />

      </div>


      {/* ======================================
          MAIN CARD
      ====================================== */}

      <div className="roles-card">

        {/* TOOLBAR */}

        <div className="roles-toolbar">

          <div className="roles-search">

            <Search size={13} />

            <input
              type="text"
              placeholder="Search roles..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="toolbar-right">

            <div className="filter-select">

              <SlidersHorizontal size={11} />

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

              <ChevronDown size={11} />

            </div>

          </div>

        </div>


        {/* TABLE */}

        <div className="roles-table-wrapper">

          <table className="roles-table">

            <thead>

              <tr>

                <th>
                  ROLE
                </th>

                <th>
                  DESCRIPTION
                </th>

                <th>
                  USERS
                </th>

                <th>
                  PERMISSIONS
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  TYPE
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredRoles.length > 0 ? (
                filteredRoles.map(
                  (role) => (
                    <tr key={role.id}>

                      {/* ROLE */}

                      <td>

                        <div className="role-cell">

                          <div
                            className={`role-icon ${role.color}`}
                          >
                            <ShieldCheck
                              size={14}
                            />
                          </div>

                          <div>

                            <strong>
                              {role.name}
                            </strong>

                            {role.protected && (
                              <span className="protected-icon">
                                <Lock size={8} />
                              </span>
                            )}

                          </div>

                        </div>

                      </td>


                      {/* DESCRIPTION */}

                      <td>

                        <span className="description">

                          {role.description}

                        </span>

                      </td>


                      {/* USERS */}

                      <td>

                        <div className="user-count">

                          <Users size={11} />

                          {role.users}

                        </div>

                      </td>


                      {/* PERMISSIONS */}

                      <td>

                        <button
                          className="permission-link"
                          onClick={() => {
                            setSelectedRole(
                              role
                            );
                            setShowPermissions(
                              true
                            );
                          }}
                        >
                          {role.permissions}
                          {" "}
                          permissions
                        </button>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge ${
                            role.status ===
                            "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span />
                          {role.status}
                        </span>

                      </td>


                      {/* TYPE */}

                      <td>

                        {role.protected ? (
                          <span className="type-badge system">
                            System
                          </span>
                        ) : (
                          <span className="type-badge custom">
                            Custom
                          </span>
                        )}

                      </td>


                      {/* ACTION */}

                      <td>

                        <div
                          className="action-wrapper"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          <button
                            className="action-btn"
                            onClick={() =>
                              setActiveMenu(
                                activeMenu ===
                                  role.id
                                  ? null
                                  : role.id
                              )
                            }
                          >
                            <MoreVertical
                              size={14}
                            />
                          </button>


                          {activeMenu ===
                            role.id && (
                            <div className="action-menu">

                              <button
                                onClick={() => {
                                  setSelectedRole(
                                    role
                                  );
                                  setShowPermissions(
                                    true
                                  );
                                  setActiveMenu(
                                    null
                                  );
                                }}
                              >
                                <Eye size={12} />
                                View Role
                              </button>


                              <button
                                onClick={() =>
                                  (window.location.href =
                                    `/admin/users/roles/edit/${role.id}`)
                                }
                              >
                                <Pencil size={12} />
                                Edit Role
                              </button>


                              <button
                                onClick={() =>
                                  duplicateRole(
                                    role
                                  )
                                }
                              >
                                <Copy size={12} />
                                Duplicate
                              </button>


                              {!role.protected && (
                                <>
                                  <div className="menu-divider" />

                                  <button
                                    className="danger"
                                    onClick={() =>
                                      openDelete(
                                        role
                                      )
                                    }
                                  >
                                    <Trash2
                                      size={12}
                                    />
                                    Delete Role
                                  </button>
                                </>
                              )}

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
                    colSpan="7"
                    className="empty-row"
                  >

                    <ShieldCheck
                      size={24}
                    />

                    <strong>
                      No roles found
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


        {/* FOOTER */}

        <div className="roles-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredRoles.length}
            </strong>{" "}
            of{" "}
            <strong>
              {roles.length}
            </strong>{" "}
            roles
          </span>

        </div>

      </div>


      {/* ======================================
          PERMISSION MODAL
      ====================================== */}

      {showPermissions &&
        selectedRole && (
          <div
            className="modal-overlay"
            onClick={() =>
              setShowPermissions(false)
            }
          >

            <div
              className="permission-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <div className="modal-role-icon">
                    <ShieldCheck size={16} />
                  </div>

                  <div>

                    <h2>
                      {selectedRole.name}
                    </h2>

                    <p>
                      {selectedRole.permissions}
                      {" "}
                      permissions assigned
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setShowPermissions(false)
                  }
                >
                  <X size={15} />
                </button>

              </div>


              <div className="modal-body">

                {permissionGroups.map(
                  (group) => (
                    <div
                      className="permission-group"
                      key={group.name}
                    >

                      <div className="permission-group-title">

                        <strong>
                          {group.name}
                        </strong>

                        <span>
                          {group.permissions.length}
                        </span>

                      </div>


                      <div className="permission-items">

                        {group.permissions.map(
                          (permission) => (
                            <div
                              className="permission-item"
                              key={permission}
                            >

                              <CheckCircle2
                                size={11}
                              />

                              <span>
                                {permission}
                              </span>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )
                )}

              </div>


              <div className="modal-footer">

                <button
                  className="modal-close"
                  onClick={() =>
                    setShowPermissions(false)
                  }
                >
                  Close
                </button>

                {!selectedRole.protected && (
                  <button
                    className="modal-edit"
                    onClick={() =>
                      (window.location.href =
                        `/admin/users/roles/edit/${selectedRole.id}`)
                    }
                  >
                    <Pencil size={12} />
                    Edit Role
                  </button>
                )}

              </div>

            </div>

          </div>
        )}


      {/* ======================================
          DELETE MODAL
      ====================================== */}

      {showDelete &&
        selectedRole && (
          <div className="modal-overlay">

            <div className="delete-modal">

              <div className="delete-icon">
                <Trash2 size={17} />
              </div>

              <h2>
                Delete Role?
              </h2>

              <p>
                Are you sure you want to delete
                <strong>
                  {" "}
                  {selectedRole.name}
                </strong>
                ? This action cannot be undone.
              </p>

              {selectedRole.users > 0 && (
                <div className="delete-warning">
                  This role is currently assigned
                  to {selectedRole.users} user
                  {selectedRole.users > 1
                    ? "s"
                    : ""}.
                </div>
              )}

              <div className="delete-actions">

                <button
                  onClick={() => {
                    setShowDelete(false);
                    setSelectedRole(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="confirm-delete"
                  onClick={deleteRole}
                >
                  Delete Role
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
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div className="stat-content">

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

