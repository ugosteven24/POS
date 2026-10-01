
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  CheckCircle2,
  X,
  Save,
  RotateCcw,
  UserPlus,
  KeyRound,
} from "lucide-react";

import "./add-user.css";

export default function AddUserPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    branch: "",
    status: "Active",
    employeeId: "",
    notes: "",
  });

  const [permissions, setPermissions] = useState({
    dashboard: true,
    sales: false,
    products: false,
    inventory: false,
    purchases: false,
    customers: false,
    expenses: false,
    reports: false,
    users: false,
    settings: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const togglePermission = (name) => {
    setPermissions((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;

    setForm((current) => ({
      ...current,
      role,
    }));

    /*
      Optional role presets.
      You can later replace this with
      permissions fetched from MySQL.
    */

    if (role === "Administrator") {
      setPermissions({
        dashboard: true,
        sales: true,
        products: true,
        inventory: true,
        purchases: true,
        customers: true,
        expenses: true,
        reports: true,
        users: true,
        settings: true,
      });
    }

    if (role === "Manager") {
      setPermissions({
        dashboard: true,
        sales: true,
        products: true,
        inventory: true,
        purchases: true,
        customers: true,
        expenses: true,
        reports: true,
        users: false,
        settings: false,
      });
    }

    if (role === "Cashier") {
      setPermissions({
        dashboard: true,
        sales: true,
        products: true,
        inventory: false,
        purchases: false,
        customers: true,
        expenses: false,
        reports: false,
        users: false,
        settings: false,
      });
    }

    if (role === "Accountant") {
      setPermissions({
        dashboard: true,
        sales: true,
        products: false,
        inventory: false,
        purchases: true,
        customers: true,
        expenses: true,
        reports: true,
        users: false,
        settings: false,
      });
    }

    if (role === "Inventory Staff") {
      setPermissions({
        dashboard: true,
        sales: false,
        products: true,
        inventory: true,
        purchases: true,
        customers: false,
        expenses: false,
        reports: true,
        users: false,
        settings: false,
      });
    }
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      branch: "",
      status: "Active",
      employeeId: "",
      notes: "",
    });

    setPermissions({
      dashboard: true,
      sales: false,
      products: false,
      inventory: false,
      purchases: false,
      customers: false,
      expenses: false,
      reports: false,
      users: false,
      settings: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    if (!form.role) {
      alert("Please select a user role.");
      return;
    }

    console.log({
      ...form,
      permissions,
    });

    alert("User created successfully.");
  };

  const activePermissionCount =
    Object.values(permissions).filter(Boolean).length;

  return (
    <div className="add-user-page content-wrapper">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="add-user-header">

        <div className="add-user-title">

          <button
            type="button"
            className="back-button"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={14} />
          </button>

          <div>
            <h1>Add User</h1>

            <p>
              Create a new system user and configure
              their access.
            </p>
          </div>

        </div>

        <div className="new-user-badge">

          <span />

          New User

        </div>

      </div>


      <form onSubmit={handleSubmit}>

        <div className="add-user-layout">

          {/* =====================================
              MAIN CONTENT
          ===================================== */}

          <main className="add-user-main">

            {/* ===================================
                BASIC INFORMATION
            =================================== */}

            <section className="user-card">

              <div className="user-card-header">

                <div className="section-icon blue">
                  <User size={15} />
                </div>

                <div>
                  <h2>Basic Information</h2>

                  <p>
                    Enter the user's personal
                    information.
                  </p>
                </div>

              </div>


              <div className="user-card-body">

                <div className="form-row">

                  <FormInput
                    label="First Name"
                    name="firstName"
                    placeholder="e.g. Stephen"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    icon={<User size={13} />}
                  />

                  <FormInput
                    label="Last Name"
                    name="lastName"
                    placeholder="e.g. Okafor"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    icon={<User size={13} />}
                  />

                </div>


                <div className="form-row">

                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    icon={<Mail size={13} />}
                  />

                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                    icon={<Phone size={13} />}
                  />

                </div>


                <FormInput
                  label="Employee ID"
                  name="employeeId"
                  placeholder="e.g. EMP-00025"
                  value={form.employeeId}
                  onChange={handleChange}
                  icon={<KeyRound size={13} />}
                  help="Optional internal employee identification number."
                />

              </div>

            </section>


            {/* ===================================
                LOGIN
            =================================== */}

            <section className="user-card">

              <div className="user-card-header">

                <div className="section-icon purple">
                  <Lock size={15} />
                </div>

                <div>

                  <h2>Login Credentials</h2>

                  <p>
                    Credentials used to sign in to
                    the administration system.
                  </p>

                </div>

              </div>


              <div className="user-card-body">

                <FormInput
                  label="Username"
                  name="username"
                  placeholder="e.g. stephen"
                  value={form.username}
                  onChange={handleChange}
                  required
                  icon={<User size={13} />}
                  help="Username must be unique."
                />


                <div className="form-row">

                  <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Create password"
                    value={form.password}
                    onChange={handleChange}
                    show={showPassword}
                    setShow={setShowPassword}
                  />

                  <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    show={showConfirmPassword}
                    setShow={setShowConfirmPassword}
                  />

                </div>

              </div>

            </section>


            {/* ===================================
                ROLE & ACCESS
            =================================== */}

            <section className="user-card">

              <div className="user-card-header">

                <div className="section-icon green">
                  <ShieldCheck size={15} />
                </div>

                <div>

                  <h2>Role & Access</h2>

                  <p>
                    Assign a role and configure
                    system permissions.
                  </p>

                </div>

              </div>


              <div className="user-card-body">

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      User Role
                      <span>*</span>
                    </label>

                    <div className="select-wrapper">

                      <ShieldCheck size={13} />

                      <select
                        name="role"
                        value={form.role}
                        onChange={handleRoleChange}
                        required
                      >

                        <option value="">
                          Select user role
                        </option>

                        <option value="Administrator">
                          Administrator
                        </option>

                        <option value="Manager">
                          Manager
                        </option>

                        <option value="Cashier">
                          Cashier
                        </option>

                        <option value="Accountant">
                          Accountant
                        </option>

                        <option value="Inventory Staff">
                          Inventory Staff
                        </option>

                      </select>

                    </div>

                  </div>


                  <div className="form-group">

                    <label>
                      Branch
                    </label>

                    <div className="select-wrapper">

                      <Building2 size={13} />

                      <select
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select branch
                        </option>

                        <option value="Main Branch">
                          Main Branch
                        </option>

                        <option value="Branch 02">
                          Branch 02
                        </option>

                        <option value="Branch 03">
                          Branch 03
                        </option>

                        <option value="Branch 04">
                          Branch 04
                        </option>

                      </select>

                    </div>

                  </div>

                </div>


                <div className="permission-heading">

                  <div>
                    <strong>
                      Module Permissions
                    </strong>

                    <span>
                      Select the areas this user
                      can access.
                    </span>
                  </div>

                  <span className="permission-count">
                    {activePermissionCount}
                    {" "}
                    enabled
                  </span>

                </div>


                <div className="permissions-grid">

                  <Permission
                    label="Dashboard"
                    description="View dashboard"
                    checked={permissions.dashboard}
                    onChange={() =>
                      togglePermission("dashboard")
                    }
                  />

                  <Permission
                    label="Sales"
                    description="Manage sales"
                    checked={permissions.sales}
                    onChange={() =>
                      togglePermission("sales")
                    }
                  />

                  <Permission
                    label="Products"
                    description="Manage products"
                    checked={permissions.products}
                    onChange={() =>
                      togglePermission("products")
                    }
                  />

                  <Permission
                    label="Inventory"
                    description="Manage inventory"
                    checked={permissions.inventory}
                    onChange={() =>
                      togglePermission("inventory")
                    }
                  />

                  <Permission
                    label="Purchases"
                    description="Manage purchases"
                    checked={permissions.purchases}
                    onChange={() =>
                      togglePermission("purchases")
                    }
                  />

                  <Permission
                    label="Customers"
                    description="Manage customers"
                    checked={permissions.customers}
                    onChange={() =>
                      togglePermission("customers")
                    }
                  />

                  <Permission
                    label="Expenses"
                    description="Manage expenses"
                    checked={permissions.expenses}
                    onChange={() =>
                      togglePermission("expenses")
                    }
                  />

                  <Permission
                    label="Reports"
                    description="View reports"
                    checked={permissions.reports}
                    onChange={() =>
                      togglePermission("reports")
                    }
                  />

                  <Permission
                    label="Users"
                    description="Manage system users"
                    checked={permissions.users}
                    onChange={() =>
                      togglePermission("users")
                    }
                  />

                  <Permission
                    label="Settings"
                    description="Manage system settings"
                    checked={permissions.settings}
                    onChange={() =>
                      togglePermission("settings")
                    }
                  />

                </div>

              </div>

            </section>


            {/* ===================================
                ACCOUNT STATUS
            =================================== */}

            <section className="user-card">

              <div className="user-card-header">

                <div className="section-icon orange">
                  <CheckCircle2 size={15} />
                </div>

                <div>

                  <h2>Account Status</h2>

                  <p>
                    Control whether the user can
                    access the system.
                  </p>

                </div>

              </div>


              <div className="user-card-body">

                <div className="status-options">

                  <label
                    className={`status-option ${
                      form.status === "Active"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={
                        form.status === "Active"
                      }
                      onChange={handleChange}
                    />

                    <span className="radio-dot" />

                    <div>
                      <strong>
                        Active
                      </strong>

                      <small>
                        User can log in and
                        access assigned modules.
                      </small>
                    </div>

                  </label>


                  <label
                    className={`status-option ${
                      form.status === "Inactive"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={
                        form.status === "Inactive"
                      }
                      onChange={handleChange}
                    />

                    <span className="radio-dot" />

                    <div>
                      <strong>
                        Inactive
                      </strong>

                      <small>
                        User account will be
                        disabled.
                      </small>
                    </div>

                  </label>

                </div>

              </div>

            </section>


            {/* ===================================
                NOTES
            =================================== */}

            <section className="user-card">

              <div className="user-card-header">

                <div className="section-icon gray">
                  <UserPlus size={15} />
                </div>

                <div>

                  <h2>Additional Notes</h2>

                  <p>
                    Optional information about
                    this user.
                  </p>

                </div>

              </div>


              <div className="user-card-body">

                <div className="form-group">

                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Add notes about this user..."
                    rows={4}
                  />

                </div>

              </div>

            </section>

          </main>


          {/* =====================================
              RIGHT SIDEBAR
          ===================================== */}

          <aside className="add-user-sidebar">

            {/* USER PREVIEW */}

            <div className="user-preview-card">

              <div className="preview-top">

                <span>
                  USER PREVIEW
                </span>

                <CheckCircle2 size={13} />

              </div>


              <div className="preview-profile">

                <div className="preview-avatar">

                  {form.firstName ||
                  form.lastName ? (
                    <>
                      {form.firstName
                        ?.charAt(0)
                        .toUpperCase()}

                      {form.lastName
                        ?.charAt(0)
                        .toUpperCase()}
                    </>
                  ) : (
                    "U"
                  )}

                </div>


                <h3>

                  {form.firstName ||
                  form.lastName
                    ? `${form.firstName} ${form.lastName}`
                    : "New User"}

                </h3>


                <span>

                  {form.username
                    ? `@${form.username}`
                    : "@username"}

                </span>

              </div>


              <div className="preview-info">

                <div>
                  <span>ROLE</span>

                  <strong>
                    {form.role ||
                      "Not assigned"}
                  </strong>
                </div>


                <div>
                  <span>BRANCH</span>

                  <strong>
                    {form.branch ||
                      "Not assigned"}
                  </strong>
                </div>


                <div>
                  <span>STATUS</span>

                  <strong
                    className={
                      form.status === "Active"
                        ? "active-text"
                        : "inactive-text"
                    }
                  >
                    {form.status}
                  </strong>
                </div>

              </div>

            </div>


            {/* ROLE DESCRIPTION */}

            <div className="role-card">

              <div className="role-card-heading">

                <ShieldCheck size={14} />

                <div>

                  <strong>
                    Assigned Role
                  </strong>

                  <span>
                    Access level
                  </span>

                </div>

              </div>


              <div className="role-name">

                {form.role ? (
                  <>
                    <div className="role-symbol">
                      <ShieldCheck size={14} />
                    </div>

                    <div>

                      <strong>
                        {form.role}
                      </strong>

                      <span>
                        {activePermissionCount}
                        {" "}
                        permissions enabled
                      </span>

                    </div>
                  </>
                ) : (
                  <div className="empty-role">
                    Select a role to view
                    access level.
                  </div>
                )}

              </div>

            </div>


            {/* PERMISSION SUMMARY */}

            <div className="permission-summary">

              <div className="summary-heading">

                <span>
                  ACCESS SUMMARY
                </span>

                <strong>
                  {activePermissionCount}
                </strong>

              </div>


              <div className="summary-list">

                {Object.entries(permissions)
                  .filter(([, value]) => value)
                  .map(([key]) => {

                    const labels = {
                      dashboard: "Dashboard",
                      sales: "Sales",
                      products: "Products",
                      inventory: "Inventory",
                      purchases: "Purchases",
                      customers: "Customers",
                      expenses: "Expenses",
                      reports: "Reports",
                      users: "Users",
                      settings: "Settings",
                    };

                    return (
                      <div
                        className="summary-item"
                        key={key}
                      >
                        <CheckCircle2 size={11} />

                        <span>
                          {labels[key]}
                        </span>
                      </div>
                    );
                  })}

              </div>

            </div>


            {/* SECURITY */}

            <div className="security-card">

              <Lock size={14} />

              <div>

                <strong>
                  Security
                </strong>

                <p>
                  User passwords should never be
                  shared with other employees.
                </p>

              </div>

            </div>

          </aside>

        </div>


        {/* =======================================
            ACTION FOOTER
        ======================================= */}

        <div className="add-user-footer">

          <button
            type="button"
            className="cancel-button"
            onClick={() => window.history.back()}
          >
            <X size={13} />
            Cancel
          </button>


          <div className="footer-actions">

            <button
              type="button"
              className="reset-button"
              onClick={resetForm}
            >
              <RotateCcw size={12} />
              Reset
            </button>


            <button
              type="submit"
              className="create-user-button"
            >
              <Save size={13} />
              Create User
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}


/* ==========================================
   FORM INPUT
========================================== */

function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  icon,
  help,
}) {
  return (
    <div className="form-group">

      <label>
        {label}

        {required && <span>*</span>}
      </label>

      <div className="input-wrapper">

        {icon}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />

      </div>

      {help && <small>{help}</small>}

    </div>
  );
}


/* ==========================================
   PASSWORD INPUT
========================================== */

function PasswordInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  show,
  setShow,
}) {
  return (
    <div className="form-group">

      <label>
        {label}
        <span>*</span>
      </label>

      <div className="input-wrapper">

        <Lock size={13} />

        <input
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeOff size={13} />
          ) : (
            <Eye size={13} />
          )}
        </button>

      </div>

    </div>
  );
}


/* ==========================================
   PERMISSION
========================================== */

function Permission({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <label
      className={`permission-item ${
        checked ? "checked" : ""
      }`}
    >

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span className="permission-checkbox">

        {checked && (
          <CheckCircle2 size={11} />
        )}

      </span>


      <div>

        <strong>
          {label}
        </strong>

        <small>
          {description}
        </small>

      </div>

    </label>
  );
}

