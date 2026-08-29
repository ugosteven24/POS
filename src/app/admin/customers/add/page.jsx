
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  UserPlus,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  Save,
  X,
  CheckCircle2,
} from "lucide-react";

import "./add-customer.css";

export default function AddCustomer() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    customerType: "Individual",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    creditLimit: "",
    openingBalance: "",
    notes: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    /*
      Later, send the data to your Next.js API:

      await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    */

    console.log("Customer:", form);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleCancel = () => {
    window.location.href = "/admin/customers";
  };

  const customerName =
    `${form.firstName} ${form.lastName}`.trim();

  const initials = customerName
    ? customerName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "CU";

  return (
    <div className="add-customer-page content-wrapper">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="add-customer-header">

        <div className="header-left">

          <button
            className="back-button"
            onClick={handleCancel}
            type="button"
          >
            <ArrowLeft size={15} />
          </button>

          <div className="header-title">

            <div className="header-icon">
              <UserPlus size={18} />
            </div>

            <div>
              <h1>Add Customer</h1>

              <p>
                Create a new customer profile.
              </p>
            </div>

          </div>

        </div>


        <div className="header-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            <X size={13} />
            Cancel
          </button>

          <button
            type="submit"
            form="customer-form"
            className="save-button"
          >
            <Save size={13} />
            Save Customer
          </button>

        </div>

      </div>


      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}

      {saved && (

        <div className="success-message">

          <CheckCircle2 size={16} />

          <div>
            <strong>
              Customer created successfully
            </strong>

            <span>
              The customer has been added to your customer list.
            </span>
          </div>

        </div>

      )}


      <form
        id="customer-form"
        onSubmit={handleSubmit}
        className="customer-form"
      >

        <div className="form-layout">

          {/* ==================================
              LEFT COLUMN
          ================================== */}

          <div className="form-main">

            {/* CUSTOMER INFORMATION */}

            <section className="form-card">

              <div className="section-header">

                <div className="section-icon blue">
                  <User size={15} />
                </div>

                <div>
                  <h2>Customer Information</h2>

                  <p>
                    Basic information about the customer.
                  </p>
                </div>

              </div>


              <div className="form-body">

                <div className="form-grid two">

                  {/* FIRST NAME */}

                  <div className="form-group">

                    <label>
                      First Name
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className={
                        errors.firstName
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.firstName && (
                      <small className="error-text">
                        {errors.firstName}
                      </small>
                    )}

                  </div>


                  {/* LAST NAME */}

                  <div className="form-group">

                    <label>
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                    />

                  </div>


                  {/* PHONE */}

                  <div className="form-group">

                    <label>
                      Phone Number
                      <span>*</span>
                    </label>

                    <div
                      className={`input-with-icon ${
                        errors.phone
                          ? "input-error"
                          : ""
                      }`}
                    >

                      <Phone size={13} />

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0803 000 0000"
                      />

                    </div>

                    {errors.phone && (
                      <small className="error-text">
                        {errors.phone}
                      </small>
                    )}

                  </div>


                  {/* EMAIL */}

                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <div
                      className={`input-with-icon ${
                        errors.email
                          ? "input-error"
                          : ""
                      }`}
                    >

                      <Mail size={13} />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="customer@example.com"
                      />

                    </div>

                    {errors.email && (
                      <small className="error-text">
                        {errors.email}
                      </small>
                    )}

                  </div>


                  {/* CUSTOMER TYPE */}

                  <div className="form-group">

                    <label>
                      Customer Type
                    </label>

                    <select
                      name="customerType"
                      value={form.customerType}
                      onChange={handleChange}
                    >
                      <option value="Individual">
                        Individual
                      </option>

                      <option value="Business">
                        Business
                      </option>

                      <option value="Wholesale">
                        Wholesale
                      </option>

                      <option value="Corporate">
                        Corporate
                      </option>
                    </select>

                  </div>


                  {/* STATUS */}

                  <div className="form-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>

                  </div>

                </div>

              </div>

            </section>


            {/* ==================================
                ADDRESS
            ================================== */}

            <section className="form-card">

              <div className="section-header">

                <div className="section-icon green">
                  <MapPin size={15} />
                </div>

                <div>
                  <h2>Address Information</h2>

                  <p>
                    Customer location and address details.
                  </p>
                </div>

              </div>


              <div className="form-body">

                <div className="form-grid">

                  <div className="form-group full">

                    <label>
                      Street Address
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter street address"
                    />

                  </div>


                  <div className="form-grid three">

                    <div className="form-group">

                      <label>
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="e.g. Owerri"
                      />

                    </div>


                    <div className="form-group">

                      <label>
                        State
                      </label>

                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select state
                        </option>

                        <option value="Abia">
                          Abia
                        </option>

                        <option value="Anambra">
                          Anambra
                        </option>

                        <option value="Enugu">
                          Enugu
                        </option>

                        <option value="Imo">
                          Imo
                        </option>

                        <option value="Rivers">
                          Rivers
                        </option>

                        <option value="Lagos">
                          Lagos
                        </option>

                        <option value="FCT">
                          FCT
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>


                    <div className="form-group">

                      <label>
                        Postal Code
                      </label>

                      <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        placeholder="Postal code"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </section>


            {/* ==================================
                CREDIT
            ================================== */}

            <section className="form-card">

              <div className="section-header">

                <div className="section-icon orange">
                  <CreditCard size={15} />
                </div>

                <div>
                  <h2>Credit & Account</h2>

                  <p>
                    Configure customer credit settings.
                  </p>
                </div>

              </div>


              <div className="form-body">

                <div className="form-grid two">

                  <div className="form-group">

                    <label>
                      Credit Limit
                    </label>

                    <div className="currency-input">

                      <span>₦</span>

                      <input
                        type="number"
                        name="creditLimit"
                        value={form.creditLimit}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                      />

                    </div>

                    <small className="field-help">
                      Maximum amount this customer can owe.
                    </small>

                  </div>


                  <div className="form-group">

                    <label>
                      Opening Balance
                    </label>

                    <div className="currency-input">

                      <span>₦</span>

                      <input
                        type="number"
                        name="openingBalance"
                        value={form.openingBalance}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                      />

                    </div>

                    <small className="field-help">
                      Existing customer balance.
                    </small>

                  </div>

                </div>

              </div>

            </section>


            {/* ==================================
                NOTES
            ================================== */}

            <section className="form-card">

              <div className="section-header">

                <div className="section-icon purple">
                  <FileText size={15} />
                </div>

                <div>
                  <h2>Additional Information</h2>

                  <p>
                    Add optional notes about the customer.
                  </p>
                </div>

              </div>


              <div className="form-body">

                <div className="form-group">

                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Add notes about this customer..."
                    rows="5"
                  />

                </div>

              </div>

            </section>


            {/* BOTTOM ACTIONS */}

            <div className="bottom-actions">

              <button
                type="button"
                className="bottom-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bottom-save"
              >
                <Save size={14} />
                Save Customer
              </button>

            </div>

          </div>


          {/* ==================================
              RIGHT SIDEBAR
          ================================== */}

          <aside className="customer-preview">

            <div className="preview-card">

              <div className="preview-header">
                <span>
                  CUSTOMER PREVIEW
                </span>
              </div>


              <div className="preview-profile">

                <div className="preview-avatar">
                  {initials}
                </div>

                <h3>
                  {customerName ||
                    "New Customer"}
                </h3>

                <span>
                  {form.customerType}
                </span>

              </div>


              <div className="preview-divider"></div>


              <div className="preview-details">

                <div className="preview-detail">

                  <Phone size={12} />

                  <div>
                    <span>Phone</span>

                    <strong>
                      {form.phone ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>


                <div className="preview-detail">

                  <Mail size={12} />

                  <div>
                    <span>Email</span>

                    <strong>
                      {form.email ||
                        "Not provided"}
                    </strong>
                  </div>

                </div>


                <div className="preview-detail">

                  <MapPin size={12} />

                  <div>
                    <span>Location</span>

                    <strong>
                      {form.city ||
                        form.state
                        ? `${form.city || ""}${
                            form.city &&
                            form.state
                              ? ", "
                              : ""
                          }${form.state || ""}`
                        : "Not provided"}
                    </strong>
                  </div>

                </div>

              </div>


              <div className="preview-divider"></div>


              <div className="preview-account">

                <div>

                  <span>
                    Account Status
                  </span>

                  <strong
                    className={
                      form.status === "Active"
                        ? "active-text"
                        : "inactive-text"
                    }
                  >
                    <i></i>
                    {form.status}
                  </strong>

                </div>


                <div>

                  <span>
                    Credit Limit
                  </span>

                  <strong>
                    ₦
                    {Number(
                      form.creditLimit || 0
                    ).toLocaleString(
                      "en-NG"
                    )}
                  </strong>

                </div>

              </div>

            </div>


            {/* TIP */}

            <div className="info-box">

              <div className="info-box-icon">
                <UserPlus size={14} />
              </div>

              <div>

                <strong>
                  Customer accounts
                </strong>

                <p>
                  Customers can be selected during
                  checkout and their purchases will
                  automatically be linked to their account.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </form>

    </div>
  );
}

