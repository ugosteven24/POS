
"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Save,
  RotateCcw,
} from "lucide-react";

import "./add-role.css";

const permissionGroups = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Access the POS dashboard and business overview.",
    permissions: [
      { id: "dashboard.view", label: "View Dashboard" },
    ],
  },

  {
    id: "sales",
    name: "Sales",
    description: "Control sales transactions and sales management.",
    permissions: [
      { id: "sales.view", label: "View Sales" },
      { id: "sales.create", label: "Create Sale" },
      { id: "sales.edit", label: "Edit Sale" },
      { id: "sales.delete", label: "Delete Sale" },
      { id: "sales.return", label: "Return Sale" },
      { id: "sales.discount", label: "Apply Discount" },
      { id: "sales.void", label: "Void Sale" },
    ],
  },

  {
    id: "products",
    name: "Products",
    description: "Manage products, categories, brands and units.",
    permissions: [
      { id: "products.view", label: "View Products" },
      { id: "products.create", label: "Add Product" },
      { id: "products.edit", label: "Edit Product" },
      { id: "products.delete", label: "Delete Product" },
      { id: "products.categories", label: "Manage Categories" },
      { id: "products.brands", label: "Manage Brands" },
      { id: "products.units", label: "Manage Units" },
    ],
  },

  {
    id: "inventory",
    name: "Inventory",
    description: "Manage stock levels and inventory movements.",
    permissions: [
      { id: "inventory.view", label: "View Stock" },
      { id: "inventory.adjust", label: "Stock Adjustment" },
      { id: "inventory.transfer", label: "Stock Transfer" },
      { id: "inventory.history", label: "Stock History" },
      { id: "inventory.low_stock", label: "View Low Stock" },
    ],
  },

  {
    id: "purchases",
    name: "Purchases",
    description: "Manage purchase orders, suppliers and returns.",
    permissions: [
      { id: "purchases.view", label: "View Purchases" },
      { id: "purchases.create", label: "Create Purchase" },
      { id: "purchases.edit", label: "Edit Purchase" },
      { id: "purchases.delete", label: "Delete Purchase" },
      { id: "purchases.return", label: "Purchase Return" },
      { id: "purchases.suppliers", label: "Manage Suppliers" },
    ],
  },

  {
    id: "customers",
    name: "Customers",
    description: "Manage customer records and information.",
    permissions: [
      { id: "customers.view", label: "View Customers" },
      { id: "customers.create", label: "Add Customer" },
      { id: "customers.edit", label: "Edit Customer" },
      { id: "customers.delete", label: "Delete Customer" },
    ],
  },

  {
    id: "expenses",
    name: "Expenses",
    description: "Manage business expenses and expense records.",
    permissions: [
      { id: "expenses.view", label: "View Expenses" },
      { id: "expenses.create", label: "Add Expense" },
      { id: "expenses.edit", label: "Edit Expense" },
      { id: "expenses.delete", label: "Delete Expense" },
    ],
  },

  {
    id: "reports",
    name: "Reports",
    description: "Access business, sales and financial reports.",
    permissions: [
      { id: "reports.sales", label: "Sales Report" },
      { id: "reports.purchase", label: "Purchase Report" },
      { id: "reports.inventory", label: "Inventory Report" },
      { id: "reports.profit_loss", label: "Profit & Loss Report" },
      { id: "reports.expenses", label: "Expenses Report" },
      { id: "reports.cashiers", label: "Cashiers Report" },
    ],
  },

  {
    id: "users",
    name: "Users",
    description: "Manage system users, cashiers and roles.",
    permissions: [
      { id: "users.view", label: "View Users" },
      { id: "users.create", label: "Add User" },
      { id: "users.edit", label: "Edit User" },
      { id: "users.delete", label: "Delete User" },
      { id: "users.cashiers", label: "Manage Cashiers" },
      { id: "users.roles", label: "Manage Roles" },
    ],
  },

  {
    id: "settings",
    name: "Settings",
    description: "Manage system and business configuration.",
    permissions: [
      { id: "settings.business", label: "Business Settings" },
      { id: "settings.general", label: "General Settings" },
      { id: "settings.system", label: "System Settings" },
    ],
  },
];

export default function AddRolePage() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const [permissions, setPermissions] =
    useState([]);

  const [expandedGroups, setExpandedGroups] =
    useState(
      permissionGroups.map((group) => group.id)
    );

  const [errors, setErrors] = useState({});

  const selectedCount = permissions.length;

  const totalPermissions = useMemo(() => {
    return permissionGroups.reduce(
      (total, group) =>
        total + group.permissions.length,
      0
    );
  }, []);

  const isGroupSelected = (group) => {
    return group.permissions.every((permission) =>
      permissions.includes(permission.id)
    );
  };

  const isGroupPartiallySelected = (group) => {
    const selected = group.permissions.filter(
      (permission) =>
        permissions.includes(permission.id)
    ).length;

    return (
      selected > 0 &&
      selected < group.permissions.length
    );
  };

  const togglePermission = (permissionId) => {
    setPermissions((current) => {
      if (current.includes(permissionId)) {
        return current.filter(
          (id) => id !== permissionId
        );
      }

      return [...current, permissionId];
    });
  };

  const toggleGroup = (group) => {
    const groupIds = group.permissions.map(
      (permission) => permission.id
    );

    const allSelected = groupIds.every((id) =>
      permissions.includes(id)
    );

    if (allSelected) {
      setPermissions((current) =>
        current.filter(
          (id) => !groupIds.includes(id)
        )
      );
    } else {
      setPermissions((current) => [
        ...new Set([
          ...current,
          ...groupIds,
        ]),
      ]);
    }
  };

  const toggleExpanded = (groupId) => {
    setExpandedGroups((current) =>
      current.includes(groupId)
        ? current.filter(
            (id) => id !== groupId
          )
        : [...current, groupId]
    );
  };

  const selectAll = () => {
    const allIds = permissionGroups.flatMap(
      (group) =>
        group.permissions.map(
          (permission) => permission.id
        )
    );

    setPermissions(allIds);
  };

  const clearAll = () => {
    setPermissions([]);
  };

  const resetForm = () => {
    setRoleName("");
    setDescription("");
    setStatus("Active");
    setPermissions([]);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!roleName.trim()) {
      newErrors.roleName =
        "Role name is required.";
    }

    if (roleName.trim().length > 50) {
      newErrors.roleName =
        "Role name cannot exceed 50 characters.";
    }

    if (permissions.length === 0) {
      newErrors.permissions =
        "Select at least one permission.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const roleData = {
      name: roleName.trim(),
      description: description.trim(),
      status,
      permissions,
    };

    console.log("Role to save:", roleData);

    /*
      Later this can become:

      await fetch("/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleData),
      });
    */

    alert("Role created successfully.");
  };

  return (
    <div className="add-role-page content-wrapper">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="add-role-header">

        <div className="header-left">

          <button
            className="back-btn"
            onClick={() =>
              (window.location.href =
                "/admin/users/roles")
            }
          >
            <ArrowLeft size={14} />
          </button>

          <div>

            <div className="breadcrumb">
              Users
              <span>/</span>
              Roles
              <span>/</span>
              <strong>Add Role</strong>
            </div>

            <h1>
              Add New Role
            </h1>

            <p>
              Create a custom role and define
              its system permissions.
            </p>

          </div>

        </div>

      </div>


      <form onSubmit={handleSubmit}>

        {/* ========================================
            ROLE INFORMATION
        ======================================== */}

        <div className="role-info-card">

          <div className="section-heading">

            <div className="section-icon">
              <ShieldCheck size={15} />
            </div>

            <div>

              <h2>
                Role Information
              </h2>

              <p>
                Basic information about this role.
              </p>

            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>
                Role Name
                <span>*</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Sales Manager"
                value={roleName}
                onChange={(e) =>
                  setRoleName(e.target.value)
                }
                className={
                  errors.roleName
                    ? "input-error"
                    : ""
                }
              />

              {errors.roleName && (
                <small className="error-text">
                  {errors.roleName}
                </small>
              )}

            </div>


            <div className="form-group">

              <label>
                Status
              </label>

              <div className="status-options">

                <button
                  type="button"
                  className={
                    status === "Active"
                      ? "status-option selected"
                      : "status-option"
                  }
                  onClick={() =>
                    setStatus("Active")
                  }
                >
                  <span className="radio">
                    {status === "Active" && (
                      <span />
                    )}
                  </span>

                  Active
                </button>


                <button
                  type="button"
                  className={
                    status === "Inactive"
                      ? "status-option selected"
                      : "status-option"
                  }
                  onClick={() =>
                    setStatus("Inactive")
                  }
                >
                  <span className="radio">
                    {status === "Inactive" && (
                      <span />
                    )}
                  </span>

                  Inactive
                </button>

              </div>

            </div>


            <div className="form-group full">

              <label>
                Description
                <small>
                  Optional
                </small>
              </label>

              <textarea
                rows={3}
                placeholder="Describe what this role is responsible for..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>


        {/* ========================================
            PERMISSIONS
        ======================================== */}

        <div className="permissions-card">

          <div className="permissions-header">

            <div className="section-heading">

              <div className="section-icon">
                <ShieldCheck size={15} />
              </div>

              <div>

                <h2>
                  Permissions
                </h2>

                <p>
                  Choose what this role can
                  access and manage.
                </p>

              </div>

            </div>


            <div className="permission-summary">

              <strong>
                {selectedCount}
              </strong>

              <span>
                / {totalPermissions}
                {" "}
                selected
              </span>

            </div>

          </div>


          {/* ====================================
              PERMISSION ACTIONS
          ==================================== */}

          <div className="permission-actions">

            <div>

              <span>
                Select permissions for this
                role
              </span>

            </div>

            <div className="permission-action-buttons">

              <button
                type="button"
                onClick={selectAll}
              >
                <Check size={11} />
                Select All
              </button>

              <button
                type="button"
                onClick={clearAll}
              >
                <RotateCcw size={10} />
                Clear All
              </button>

            </div>

          </div>


          {errors.permissions && (
            <div className="permission-error">
              {errors.permissions}
            </div>
          )}


          {/* ====================================
              GROUPS
          ==================================== */}

          <div className="permission-groups">

            {permissionGroups.map(
              (group) => {

                const expanded =
                  expandedGroups.includes(
                    group.id
                  );

                const selected =
                  isGroupSelected(group);

                const partial =
                  isGroupPartiallySelected(
                    group
                  );

                return (
                  <div
                    className="permission-group"
                    key={group.id}
                  >

                    {/* GROUP HEADER */}

                    <div
                      className="permission-group-header"
                    >

                      <div className="group-left">

                        <button
                          type="button"
                          className={
                            selected
                              ? "group-checkbox checked"
                              : partial
                              ? "group-checkbox partial"
                              : "group-checkbox"
                          }
                          onClick={() =>
                            toggleGroup(group)
                          }
                        >

                          {selected && (
                            <Check
                              size={10}
                            />
                          )}

                          {partial &&
                            !selected && (
                              <span />
                            )}

                        </button>


                        <button
                          type="button"
                          className="group-title-button"
                          onClick={() =>
                            toggleExpanded(
                              group.id
                            )
                          }
                        >

                          <div>

                            <strong>
                              {group.name}
                            </strong>

                            <span>
                              {group.description}
                            </span>

                          </div>

                        </button>

                      </div>


                      <div className="group-right">

                        <span className="group-count">
                          {
                            group.permissions.filter(
                              (permission) =>
                                permissions.includes(
                                  permission.id
                                )
                            ).length
                          }
                          /
                          {group.permissions.length}
                        </span>

                        <button
                          type="button"
                          className="expand-btn"
                          onClick={() =>
                            toggleExpanded(
                              group.id
                            )
                          }
                        >
                          {expanded ? (
                            <ChevronUp
                              size={13}
                            />
                          ) : (
                            <ChevronDown
                              size={13}
                            />
                          )}
                        </button>

                      </div>

                    </div>


                    {/* PERMISSIONS */}

                    {expanded && (
                      <div className="permission-list">

                        {group.permissions.map(
                          (permission) => {

                            const checked =
                              permissions.includes(
                                permission.id
                              );

                            return (
                              <label
                                className={
                                  checked
                                    ? "permission-item checked"
                                    : "permission-item"
                                }
                                key={
                                  permission.id
                                }
                              >

                                <input
                                  type="checkbox"
                                  checked={
                                    checked
                                  }
                                  onChange={() =>
                                    togglePermission(
                                      permission.id
                                    )
                                  }
                                />

                                <span className="custom-checkbox">
                                  {checked && (
                                    <Check
                                      size={9}
                                    />
                                  )}
                                </span>

                                <span>
                                  {
                                    permission.label
                                  }
                                </span>

                              </label>
                            );
                          }
                        )}

                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* ========================================
            BOTTOM ACTIONS
        ======================================== */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              (window.location.href =
                "/admin/users/roles")
            }
          >
            Cancel
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={resetForm}
          >
            <RotateCcw size={11} />
            Reset
          </button>

          <button
            type="submit"
            className="save-role-btn"
          >
            <Save size={12} />
            Create Role
          </button>

        </div>

      </form>

    </div>
  );
}

