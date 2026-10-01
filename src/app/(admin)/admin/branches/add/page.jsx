
"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Hash,
  Globe2,
  Save,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

import "./add-branch.css";

export default function AddBranchPage() {
  const [form, setForm] = useState({
    branchName: "",
    branchCode: "",
    manager: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
    status: "Active",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (name, value) => {
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

    if (!form.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
    }

    if (!form.branchCode.trim()) {
      newErrors.branchCode = "Branch code is required";
    }

    if (!form.manager.trim()) {
      newErrors.manager = "Manager is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("New branch:", form);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3500);
  };

  const resetForm = () => {
    setForm({
      branchName: "",
      branchCode: "",
      manager: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "Nigeria",
      postalCode: "",
      status: "Active",
      description: "",
    });

    setErrors({});
  };

  return (
    <div className="add-branch-page content-wrapper">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div className="page-header-left">

          <button
            type="button"
            className="back-btn"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={14} />
          </button>

          <div>
            <div className="breadcrumb">
              <span>Branches</span>
              <b>/</b>
              <strong>Add Branch</strong>
            </div>

            <h1>Add Branch</h1>

            <p>
              Create and configure a new business branch.
            </p>
          </div>

        </div>

      </div>


      {/* SUCCESS */}

      {submitted && (
        <div className="success-alert">

          <div className="success-icon">
            <CheckCircle2 size={14} />
          </div>

          <div>
            <strong>Branch created successfully</strong>
            <span>
              The branch has been added to your business.
            </span>
          </div>

        </div>
      )}


      <form onSubmit={handleSubmit}>

        <div className="content-grid">

          {/* ======================================
              MAIN FORM
          ====================================== */}

          <div className="form-column">

            {/* BRANCH DETAILS */}

            <section className="form-section">

              <SectionHeader
                icon={<Building2 size={14} />}
                title="Branch Details"
                description="Basic information about the branch."
              />

              <div className="section-content">

                <div className="fields-grid">

                  <Field
                    label="Branch Name"
                    required
                    error={errors.branchName}
                  >
                    <Input
                      icon={<Building2 size={12} />}
                      name="branchName"
                      value={form.branchName}
                      onChange={updateField}
                      placeholder="e.g. Ikeja Branch"
                    />
                  </Field>


                  <Field
                    label="Branch Code"
                    required
                    error={errors.branchCode}
                  >
                    <Input
                      icon={<Hash size={12} />}
                      name="branchCode"
                      value={form.branchCode}
                      onChange={updateField}
                      placeholder="e.g. BR-009"
                    />
                  </Field>


                  <Field label="Status">

                    <select
                      value={form.status}
                      onChange={(e) =>
                        updateField(
                          "status",
                          e.target.value
                        )
                      }
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>

                  </Field>


                  <Field label="Description">

                    <input
                      type="text"
                      value={form.description}
                      onChange={(e) =>
                        updateField(
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Short branch description"
                    />

                  </Field>

                </div>

              </div>

            </section>


            {/* CONTACT */}

            <section className="form-section">

              <SectionHeader
                icon={<Phone size={14} />}
                title="Contact Information"
                description="How customers and staff can contact this branch."
              />

              <div className="section-content">

                <div className="fields-grid">

                  <Field
                    label="Phone Number"
                    required
                    error={errors.phone}
                  >
                    <Input
                      icon={<Phone size={12} />}
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="+234 800 000 0000"
                    />
                  </Field>


                  <Field
                    label="Email Address"
                    error={errors.email}
                  >
                    <Input
                      icon={<Mail size={12} />}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="branch@company.com"
                    />
                  </Field>

                </div>

              </div>

            </section>


            {/* LOCATION */}

            <section className="form-section">

              <SectionHeader
                icon={<MapPin size={14} />}
                title="Branch Location"
                description="Physical address of the branch."
              />

              <div className="section-content">

                <div className="fields-grid">

                  <Field
                    label="Street Address"
                    required
                    full
                    error={errors.address}
                  >
                    <Input
                      icon={<MapPin size={12} />}
                      name="address"
                      value={form.address}
                      onChange={updateField}
                      placeholder="Enter street address"
                    />
                  </Field>


                  <Field
                    label="City"
                    required
                    error={errors.city}
                  >
                    <Input
                      name="city"
                      value={form.city}
                      onChange={updateField}
                      placeholder="e.g. Ikeja"
                    />
                  </Field>


                  <Field
                    label="State"
                    required
                    error={errors.state}
                  >
                    <Input
                      name="state"
                      value={form.state}
                      onChange={updateField}
                      placeholder="e.g. Lagos"
                    />
                  </Field>


                  <Field label="Country">

                    <div className="input-with-icon">

                      <Globe2 size={12} />

                      <select
                        value={form.country}
                        onChange={(e) =>
                          updateField(
                            "country",
                            e.target.value
                          )
                        }
                      >
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                        <option>South Africa</option>
                      </select>

                    </div>

                  </Field>


                  <Field label="Postal Code">

                    <Input
                      name="postalCode"
                      value={form.postalCode}
                      onChange={updateField}
                      placeholder="e.g. 100001"
                    />

                  </Field>

                </div>

              </div>

            </section>


            {/* MANAGER */}

            <section className="form-section">

              <SectionHeader
                icon={<User size={14} />}
                title="Branch Manager"
                description="Assign the person responsible for this branch."
              />

              <div className="section-content">

                <div className="fields-grid">

                  <Field
                    label="Manager Name"
                    required
                    error={errors.manager}
                  >
                    <Input
                      icon={<User size={12} />}
                      name="manager"
                      value={form.manager}
                      onChange={updateField}
                      placeholder="Enter manager name"
                    />
                  </Field>

                </div>

              </div>

            </section>

          </div>


          {/* ======================================
              RIGHT SIDEBAR
          ====================================== */}

          <aside className="side-column">

            {/* PREVIEW */}

            <div className="preview-card">

              <div className="card-title">
                <div>
                  <h2>Branch Preview</h2>
                  <p>How the branch will appear.</p>
                </div>
              </div>


              <div className="preview-top">

                <div className="preview-logo">
                  <Building2 size={18} />
                </div>

                <div>

                  <strong>
                    {form.branchName ||
                      "Branch Name"}
                  </strong>

                  <span>
                    {form.branchCode ||
                      "BR-000"}
                  </span>

                </div>

              </div>


              <div className="preview-status">

                <span>Status</span>

                <b
                  className={
                    form.status === "Active"
                      ? "active"
                      : "inactive"
                  }
                >
                  <i />
                  {form.status}
                </b>

              </div>


              <div className="preview-details">

                <PreviewRow
                  icon={<User size={11} />}
                  label="Manager"
                  value={
                    form.manager ||
                    "Not assigned"
                  }
                />

                <PreviewRow
                  icon={<Phone size={11} />}
                  label="Phone"
                  value={
                    form.phone ||
                    "Not provided"
                  }
                />

                <PreviewRow
                  icon={<MapPin size={11} />}
                  label="Location"
                  value={
                    form.city && form.state
                      ? `${form.city}, ${form.state}`
                      : "Not provided"
                  }
                />

                <PreviewRow
                  icon={<Mail size={11} />}
                  label="Email"
                  value={
                    form.email ||
                    "Not provided"
                  }
                />

              </div>

            </div>


            {/* GUIDELINES */}

            <div className="guidelines-card">

              <h2>Branch Setup</h2>

              <div className="guideline">

                <div className="number">
                  01
                </div>

                <div>
                  <strong>
                    Use a unique code
                  </strong>

                  <span>
                    Each branch should have
                    its own unique identifier.
                  </span>
                </div>

              </div>


              <div className="guideline">

                <div className="number">
                  02
                </div>

                <div>
                  <strong>
                    Assign a manager
                  </strong>

                  <span>
                    The manager can oversee
                    branch operations.
                  </span>
                </div>

              </div>


              <div className="guideline">

                <div className="number">
                  03
                </div>

                <div>
                  <strong>
                    Verify the location
                  </strong>

                  <span>
                    Make sure the address
                    is accurate.
                  </span>
                </div>

              </div>

            </div>

          </aside>

        </div>


        {/* ACTION BAR */}

        <div className="action-bar">

          <button
            type="button"
            className="reset-btn"
            onClick={resetForm}
          >
            <RotateCcw size={12} />
            Reset
          </button>


          <div className="action-right">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                window.history.back()
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              <Save size={12} />
              Save Branch
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}


/* ==========================================
   SECTION HEADER
========================================== */

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="section-header">

      <div className="section-icon">
        {icon}
      </div>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

    </div>
  );
}


/* ==========================================
   FIELD
========================================== */

function Field({
  label,
  required,
  error,
  children,
  full,
}) {
  return (
    <div
      className={`field ${
        full ? "field-full" : ""
      }`}
    >

      <label>
        {label}

        {required && (
          <em>*</em>
        )}
      </label>

      {children}

      {error && (
        <small className="error">
          {error}
        </small>
      )}

    </div>
  );
}


/* ==========================================
   INPUT
========================================== */

function Input({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="input-with-icon">

      {icon}

      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) =>
          onChange(
            name,
            e.target.value
          )
        }
        placeholder={placeholder}
      />

    </div>
  );
}


/* ==========================================
   PREVIEW ROW
========================================== */

function PreviewRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="preview-row">

      <div className="preview-row-icon">
        {icon}
      </div>

      <div>

        <span>{label}</span>

        <strong>{value}</strong>

      </div>

    </div>
  );
}

