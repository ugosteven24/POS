
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
  Monitor,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  X,
  Save,
  RotateCcw,
  UserPlus,
} from "lucide-react";

import "./add-cashier.css";

export default function AddCashierPage() {
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
    register: "",
    shift: "",
    status: "Active",
    pin: "",
    notes: "",
  });

  const [permissions, setPermissions] = useState({
    processSales: true,
    applyDiscount: false,
    voidSales: false,
    processReturns: false,
    viewProducts: true,
    viewCustomers: true,
    openRegister: true,
    closeRegister: true,
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

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      register: "",
      shift: "",
      status: "Active",
      pin: "",
      notes: "",
    });

    setPermissions({
      processSales: true,
      applyDiscount: false,
      voidSales: false,
      processReturns: false,
      viewProducts: true,
      viewCustomers: true,
      openRegister: true,
      closeRegister: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.password &&
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    if (form.pin && form.pin.length !== 4) {
      alert("Cashier PIN must be exactly 4 digits.");
      return;
    }

    console.log({
      ...form,
      permissions,
    });

    alert("Cashier created successfully.");
  };

  return (
    <div className="add-cashier-page content-wrapper">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="add-cashier-header">

        <div className="add-cashier-heading">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              window.history.back()
            }
          >
            <ArrowLeft size={14} />
          </button>

          <div>
            <h1>Add Cashier</h1>

            <p>
              Create a cashier account and configure
              their POS access.
            </p>
          </div>

        </div>

        <div className="header-status">

          <span className="status-dot" />

          New cashier

        </div>

      </div>


      <form onSubmit={handleSubmit}>

        <div className="add-cashier-layout">

          {/* =====================================
              LEFT COLUMN
          ===================================== */}

          <div className="add-cashier-main">

            {/* ===================================
                PERSONAL INFORMATION
            =================================== */}

            <section className="cashier-form-card">

              <div className="form-card-header">

                <div className="form-section-icon blue">
                  <User size={15} />
                </div>

                <div>

                  <h2>Personal Information</h2>

                  <p>
                    Basic information about the
                    cashier.
                  </p>

                </div>

              </div>


              <div className="form-card-body">

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      First Name
                      <span>*</span>
                    </label>

                    <div className="input-wrapper">

                      <User size={13} />

                      <input
                        type="text"
                        name="firstName"
                        placeholder="e.g. David"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  <div className="form-group">

                    <label>
                      Last Name
                      <span>*</span>
                    </label>

                    <div className="input-wrapper">

                      <User size={13} />

                      <input
                        type="text"
                        name="lastName"
                        placeholder="e.g. Okoro"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </div>


                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Email Address
                      <span>*</span>
                    </label>

                    <div className="input-wrapper">

                      <Mail size={13} />

                      <input
                        type="email"
                        name="email"
                        placeholder="cashier@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>


                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <div className="input-wrapper">

                      <Phone size={13} />

                      <input
                        type="tel"
                        name="phone"
                        placeholder="+234 800 000 0000"
                        value={form.phone}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </section>


            {/* ===================================
                LOGIN INFORMATION
            =================================== */}

            <section className="cashier-form-card">

              <div className="form-card-header">

                <div className="form-section-icon purple">
                  <Lock size={15} />
                </div>

                <div>

                  <h2>Login Credentials</h2>

                  <p>
                    Credentials the cashier will
                    use to access the POS.
                  </p>

                </div>

              </div>


              <div className="form-card-body">

                <div className="form-group">

                  <label>
                    Username
                    <span>*</span>
                  </label>

                  <div className="input-wrapper">

                    <User size={13} />

                    <input
                      type="text"
                      name="username"
                      placeholder="e.g. david.okoro"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <small>
                    The cashier will use this username
                    to sign into the POS.
                  </small>

                </div>


                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Password
                      <span>*</span>
                    </label>

                    <div className="input-wrapper">

                      <Lock size={13} />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        placeholder="Create password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />

                      <button
                        type="button"
                        className="input-icon-button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={13} />
                        ) : (
                          <Eye size={13} />
                        )}
                      </button>

                    </div>

                  </div>


                  <div className="form-group">

                    <label>
                      Confirm Password
                      <span>*</span>
                    </label>

                    <div className="input-wrapper">

                      <Lock size={13} />

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        placeholder="Repeat password"
                        value={
                          form.confirmPassword
                        }
                        onChange={handleChange}
                        required
                      />

                      <button
                        type="button"
                        className="input-icon-button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={13} />
                        ) : (
                          <Eye size={13} />
                        )}
                      </button>

                    </div>

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Cashier PIN
                  </label>

                  <div className="input-wrapper pin-input">

                    <Lock size={13} />

                    <input
                      type="password"
                      name="pin"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="••••"
                      value={form.pin}
                      onChange={(e) => {
                        const value =
                          e.target.value.replace(
                            /\D/g,
                            ""
                          );

                        setForm((current) => ({
                          ...current,
                          pin: value,
                        }));
                      }}
                    />

                  </div>

                  <small>
                    Optional 4-digit PIN for quick
                    cashier actions.
                  </small>

                </div>

              </div>

            </section>


            {/* ===================================
                REGISTER & SHIFT
            =================================== */}

            <section className="cashier-form-card">

              <div className="form-card-header">

                <div className="form-section-icon orange">
                  <Monitor size={15} />
                </div>

                <div>

                  <h2>Register & Shift</h2>

                  <p>
                    Assign the cashier to a POS
                    register and working shift.
                  </p>

                </div>

              </div>


              <div className="form-card-body">

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      POS Register
                      <span>*</span>
                    </label>

                    <div className="select-wrapper">

                      <Monitor size={13} />

                      <select
                        name="register"
                        value={form.register}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select register
                        </option>

                        <option value="Register 01">
                          Register 01
                        </option>

                        <option value="Register 02">
                          Register 02
                        </option>

                        <option value="Register 03">
                          Register 03
                        </option>

                        <option value="Register 04">
                          Register 04
                        </option>

                        <option value="Register 05">
                          Register 05
                        </option>

                        <option value="Register 06">
                          Register 06
                        </option>

                        <option value="Register 07">
                          Register 07
                        </option>

                      </select>

                    </div>

                  </div>


                  <div className="form-group">

                    <label>
                      Shift
                      <span>*</span>
                    </label>

                    <div className="select-wrapper">

                      <Clock3 size={13} />

                      <select
                        name="shift"
                        value={form.shift}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select shift
                        </option>

                        <option value="Morning">
                          Morning
                        </option>

                        <option value="Afternoon">
                          Afternoon
                        </option>

                        <option value="Evening">
                          Evening
                        </option>

                        <option value="Night">
                          Night
                        </option>

                      </select>

                    </div>

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Account Status
                  </label>

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
                          form.status ===
                          "Active"
                        }
                        onChange={handleChange}
                      />

                      <span className="radio-dot" />

                      <div>

                        <strong>
                          Active
                        </strong>

                        <small>
                          Cashier can access
                          the POS.
                        </small>

                      </div>

                    </label>


                    <label
                      className={`status-option ${
                        form.status ===
                        "Inactive"
                          ? "selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={
                          form.status ===
                          "Inactive"
                        }
                        onChange={handleChange}
                      />

                      <span className="radio-dot" />

                      <div>

                        <strong>
                          Inactive
                        </strong>

                        <small>
                          Access will be
                          disabled.
                        </small>

                      </div>

                    </label>

                  </div>

                </div>

              </div>

            </section>


            {/* ===================================
                PERMISSIONS
            =================================== */}

            <section className="cashier-form-card">

              <div className="form-card-header">

                <div className="form-section-icon green">
                  <ShieldCheck size={15} />
                </div>

                <div>

                  <h2>Cashier Permissions</h2>

                  <p>
                    Control what this cashier can
                    do inside the POS.
                  </p>

                </div>

              </div>


              <div className="form-card-body">

                <div className="permissions-grid">

                  <Permission
                    label="Process Sales"
                    description="Create and complete sales"
                    checked={
                      permissions.processSales
                    }
                    onChange={() =>
                      togglePermission(
                        "processSales"
                      )
                    }
                  />

                  <Permission
                    label="Apply Discounts"
                    description="Apply product discounts"
                    checked={
                      permissions.applyDiscount
                    }
                    onChange={() =>
                      togglePermission(
                        "applyDiscount"
                      )
                    }
                  />

                  <Permission
                    label="Void Sales"
                    description="Cancel completed sales"
                    checked={
                      permissions.voidSales
                    }
                    onChange={() =>
                      togglePermission(
                        "voidSales"
                      )
                    }
                  />

                  <Permission
                    label="Process Returns"
                    description="Process customer returns"
                    checked={
                      permissions.processReturns
                    }
                    onChange={() =>
                      togglePermission(
                        "processReturns"
                      )
                    }
                  />

                  <Permission
                    label="View Products"
                    description="View product information"
                    checked={
                      permissions.viewProducts
                    }
                    onChange={() =>
                      togglePermission(
                        "viewProducts"
                      )
                    }
                  />

                  <Permission
                    label="View Customers"
                    description="View customer records"
                    checked={
                      permissions.viewCustomers
                    }
                    onChange={() =>
                      togglePermission(
                        "viewCustomers"
                      )
                    }
                  />

                  <Permission
                    label="Open Register"
                    description="Open a register shift"
                    checked={
                      permissions.openRegister
                    }
                    onChange={() =>
                      togglePermission(
                        "openRegister"
                      )
                    }
                  />

                  <Permission
                    label="Close Register"
                    description="Close a register shift"
                    checked={
                      permissions.closeRegister
                    }
                    onChange={() =>
                      togglePermission(
                        "closeRegister"
                      )
                    }
                  />

                </div>

              </div>

            </section>


            {/* ===================================
                NOTES
            =================================== */}

            <section className="cashier-form-card">

              <div className="form-card-header">

                <div className="form-section-icon gray">
                  <UserPlus size={15} />
                </div>

                <div>

                  <h2>Additional Information</h2>

                  <p>
                    Optional notes about this
                    cashier.
                  </p>

                </div>

              </div>


              <div className="form-card-body">

                <div className="form-group">

                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    rows="4"
                    placeholder="Add any notes about this cashier..."
                    value={form.notes}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </section>

          </div>


          {/* =====================================
              RIGHT SIDEBAR
          ===================================== */}

          <aside className="add-cashier-sidebar">

            {/* PREVIEW */}

            <div className="cashier-preview-card">

              <div className="preview-header">
                <span>
                  CASHIER PREVIEW
                </span>

                <CheckCircle2 size={13} />
              </div>


              <div className="preview-profile">

                <div className="preview-avatar">

                  {form.firstName
                    ? form.firstName
                        .charAt(0)
                        .toUpperCase()
                    : "C"}

                  {form.lastName
                    ? form.lastName
                        .charAt(0)
                        .toUpperCase()
                    : ""}

                </div>

                <h3>

                  {form.firstName ||
                  form.lastName
                    ? `${form.firstName} ${form.lastName}`
                    : "New Cashier"}

                </h3>

                <span>
                  {form.username
                    ? `@${form.username}`
                    : "@username"}
                </span>

              </div>


              <div className="preview-details">

                <div>

                  <span>REGISTER</span>

                  <strong>
                    {form.register ||
                      "Not assigned"}
                  </strong>

                </div>


                <div>

                  <span>SHIFT</span>

                  <strong>
                    {form.shift ||
                      "Not assigned"}
                  </strong>

                </div>


                <div>

                  <span>STATUS</span>

                  <strong
                    className={
                      form.status ===
                      "Active"
                        ? "preview-active"
                        : "preview-inactive"
                    }
                  >
                    {form.status}
                  </strong>

                </div>

              </div>

            </div>


            {/* ACCESS SUMMARY */}

            <div className="access-summary-card">

              <div className="access-summary-header">

                <ShieldCheck size={14} />

                <div>

                  <strong>
                    Access Summary
                  </strong>

                  <span>
                    Enabled permissions
                  </span>

                </div>

              </div>


              <div className="access-list">

                {Object.entries(
                  permissions
                )
                  .filter(([, value]) => value)
                  .map(([key]) => {

                    const labels = {
                      processSales:
                        "Process Sales",
                      applyDiscount:
                        "Apply Discounts",
                      voidSales:
                        "Void Sales",
                      processReturns:
                        "Process Returns",
                      viewProducts:
                        "View Products",
                      viewCustomers:
                        "View Customers",
                      openRegister:
                        "Open Register",
                      closeRegister:
                        "Close Register",
                    };

                    return (
                      <div
                        key={key}
                        className="access-item"
                      >
                        <CheckCircle2
                          size={11}
                        />

                        <span>
                          {labels[key]}
                        </span>
                      </div>
                    );
                  })}

              </div>

            </div>


            {/* SECURITY NOTICE */}

            <div className="security-notice">

              <Lock size={14} />

              <div>

                <strong>
                  Account Security
                </strong>

                <p>
                  The cashier should never share
                  their password or PIN with
                  another employee.
                </p>

              </div>

            </div>

          </aside>

        </div>


        {/* =======================================
            FOOTER ACTIONS
        ======================================= */}

        <div className="add-cashier-footer">

          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              window.history.back()
            }
          >
            <X size={13} />
            Cancel
          </button>


          <div className="footer-right">

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
              className="save-cashier-button"
            >
              <Save size={13} />
              Create Cashier
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}


/* ==========================================
   PERMISSION COMPONENT
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

      <span className="custom-checkbox">
        {checked && (
          <CheckCircle2 size={12} />
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

