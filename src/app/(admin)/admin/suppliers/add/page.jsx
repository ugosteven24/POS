
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  Wallet,
  X,
} from "lucide-react";

import "./add-supplier.css";
import { createSupplier } from "@/services/suppliers/get";

export default function AddSupplier() {
  const [form, setForm] = useState({
    supplierName: "",
    companyName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    taxNumber: "",
    paymentTerms: "Due on Receipt",
    openingBalance: "",
    balanceType: "Payable",
    status: "Active",
    notes: "",
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

  const validateForm = () => {
    const newErrors = {};

    if (!form.supplierName.trim()) {
      newErrors.supplierName = "Supplier name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const formData = new FormData(e.currentTarget);

  const result = await createSupplier(formData);

  if (result.success) {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);

    resetForm();
  } else {
    alert(result.message);
  }
};

  const resetForm = () => {
    setForm({
      supplierName: "",
      companyName: "",
      phone: "",
      alternatePhone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "Nigeria",
      taxNumber: "",
      paymentTerms: "Due on Receipt",
      openingBalance: "",
      balanceType: "Payable",
      status: "Active",
      notes: "",
    });

    setErrors({});
  };

  return (
    <div className="add-supplier-page content-wrapper">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="add-supplier-header">

        <div className="header-left">

          <button
            className="back-button"
            type="button"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={15} />
          </button>

          <div className="header-icon">
            <Building2 size={18} />
          </div>

          <div>
            <h1>Add Supplier</h1>

            <p>
              Create a new supplier account for purchases.
            </p>
          </div>

        </div>


        <div className="header-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={resetForm}
          >
            <X size={14} />
            Clear
          </button>

          <button
            type="submit"
            form="supplier-form"
            className="save-button"
          >
            <Save size={14} />
            Save Supplier
          </button>

        </div>

      </div>


      {/* ================================
          SUCCESS MESSAGE
      ================================= */}

      {saved && (
        <div className="success-message">

          <div className="success-check">
            ✓
          </div>

          <div>
            <strong>
              Supplier saved successfully
            </strong>

            <span>
              The supplier has been added to your supplier list.
            </span>
          </div>

        </div>
      )}


      {/* ================================
          FORM
      ================================= */}

      <form
        id="supplier-form"
        onSubmit={handleSubmit}
      >

        <div className="supplier-layout">


          {/* ============================
              LEFT COLUMN
          ============================= */}

          <div className="supplier-main">


            {/* BASIC INFORMATION */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-header-icon blue">
                  <Building2 size={15} />
                </div>

                <div>
                  <h2>
                    Basic Information
                  </h2>

                  <p>
                    General information about the supplier.
                  </p>
                </div>

              </div>


              <div className="form-content">

                <div className="form-grid">


                  <div className="field">

                    <label>
                      Supplier Name
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="supplierName"
                      value={form.supplierName}
                      onChange={handleChange}
                      placeholder="Enter supplier name"
                      className={
                        errors.supplierName
                          ? "input-error"
                          : ""
                      }
                    />

                    {errors.supplierName && (
                      <small className="error-text">
                        {errors.supplierName}
                      </small>
                    )}

                  </div>


                  <div className="field">

                    <label>
                      Company Name
                    </label>

                    <input
                      type="text"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                    />

                  </div>


                  <div className="field">

                    <label>
                      Tax / TIN Number
                    </label>

                    <input
                      type="text"
                      name="taxNumber"
                      value={form.taxNumber}
                      onChange={handleChange}
                      placeholder="Enter tax identification number"
                    />

                  </div>


                  <div className="field">

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


            {/* CONTACT INFORMATION */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-header-icon green">
                  <Phone size={15} />
                </div>

                <div>
                  <h2>
                    Contact Information
                  </h2>

                  <p>
                    How you can contact this supplier.
                  </p>
                </div>

              </div>


              <div className="form-content">

                <div className="form-grid">


                  <div className="field">

                    <label>
                      Phone Number
                      <span>*</span>
                    </label>

                    <div className="input-with-icon">

                      <Phone size={13} />

                      <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0800 000 0000"
                        className={
                          errors.phone
                            ? "input-error"
                            : ""
                        }
                      />

                    </div>

                    {errors.phone && (
                      <small className="error-text">
                        {errors.phone}
                      </small>
                    )}

                  </div>


                  <div className="field">

                    <label>
                      Alternate Phone
                    </label>

                    <div className="input-with-icon">

                      <Phone size={13} />

                      <input
                        type="text"
                        name="alternatePhone"
                        value={form.alternatePhone}
                        onChange={handleChange}
                        placeholder="0800 000 0000"
                      />

                    </div>

                  </div>


                  <div className="field full">

                    <label>
                      Email Address
                    </label>

                    <div className="input-with-icon">

                      <Mail size={13} />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="supplier@example.com"
                        className={
                          errors.email
                            ? "input-error"
                            : ""
                        }
                      />

                    </div>

                    {errors.email && (
                      <small className="error-text">
                        {errors.email}
                      </small>
                    )}

                  </div>

                </div>

              </div>

            </section>


            {/* ADDRESS */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-header-icon orange">
                  <MapPin size={15} />
                </div>

                <div>
                  <h2>
                    Address
                  </h2>

                  <p>
                    Supplier business location.
                  </p>
                </div>

              </div>


              <div className="form-content">

                <div className="form-grid">


                  <div className="field full">

                    <label>
                      Street Address
                    </label>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter complete supplier address"
                      rows="3"
                    />

                  </div>


                  <div className="field">

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


                  <div className="field">

                    <label>
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="e.g. Imo State"
                    />

                  </div>


                  <div className="field">

                    <label>
                      Country
                    </label>

                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                    >
                      <option>
                        Nigeria
                      </option>

                      <option>
                        Ghana
                      </option>

                      <option>
                        Kenya
                      </option>

                      <option>
                        South Africa
                      </option>

                      <option>
                        United Kingdom
                      </option>

                      <option>
                        United States
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            </section>


            {/* NOTES */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-header-icon purple">
                  <FileText size={15} />
                </div>

                <div>
                  <h2>
                    Additional Notes
                  </h2>

                  <p>
                    Add any additional information about this supplier.
                  </p>
                </div>

              </div>


              <div className="form-content">

                <div className="field">

                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Write notes about this supplier..."
                    rows="5"
                  />

                </div>

              </div>

            </section>

          </div>


          {/* ============================
              RIGHT COLUMN
          ============================= */}

          <aside className="supplier-sidebar">


            {/* PAYMENT */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-header-icon purple">
                  <CreditCard size={15} />
                </div>

                <div>
                  <h2>
                    Payment Settings
                  </h2>

                  <p>
                    Supplier payment terms.
                  </p>
                </div>

              </div>


              <div className="form-content">

                <div className="field">

                  <label>
                    Payment Terms
                  </label>

                  <select
                    name="paymentTerms"
                    value={form.paymentTerms}
                    onChange={handleChange}
                  >

                    <option>
                      Due on Receipt
                    </option>

                    <option>
                      Net 7
                    </option>

                    <option>
                      Net 15
                    </option>

                    <option>
                      Net 30
                    </option>

                    <option>
                      Net 60
                    </option>

                    <option>
                      Net 90
                    </option>

                  </select>

                </div>


                <div className="field">

                  <label>
                    Opening Balance
                  </label>

                  <div className="money-input">

                    <span>
                      ₦
                    </span>

                    <input
                      type="number"
                      min="0"
                      name="openingBalance"
                      value={form.openingBalance}
                      onChange={handleChange}
                      placeholder="0.00"
                    />

                  </div>

                </div>


                <div className="field">

                  <label>
                    Balance Type
                  </label>

                  <select
                    name="balanceType"
                    value={form.balanceType}
                    onChange={handleChange}
                  >

                    <option value="Payable">
                      Payable
                    </option>

                    <option value="Credit">
                      Credit
                    </option>

                  </select>

                </div>

              </div>

            </section>


            {/* ACCOUNT SUMMARY */}

            <section className="account-summary">

              <div className="summary-icon">
                <Wallet size={17} />
              </div>

              <div>

                <span>
                  Opening Balance
                </span>

                <strong>
                  ₦
                  {Number(
                    form.openingBalance || 0
                  ).toLocaleString()}
                </strong>

              </div>

            </section>


            {/* REQUIRED INFORMATION */}

            <section className="required-card">

              <div className="required-title">
                <User size={13} />

                <strong>
                  Required Information
                </strong>
              </div>

              <div className="required-item">
                <span className="required-dot"></span>
                Supplier name
              </div>

              <div className="required-item">
                <span className="required-dot"></span>
                Phone number
              </div>

              <div className="required-item optional">
                <span></span>
                Email is optional
              </div>

            </section>


            {/* SAVE BUTTON */}

            <button
              type="submit"
              className="sidebar-save"
            >
              <Save size={14} />
              Save Supplier
            </button>

          </aside>

        </div>

      </form>

    </div>
  );
}
