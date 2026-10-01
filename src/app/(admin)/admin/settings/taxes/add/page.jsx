
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Percent,
  Save,
  RotateCcw,
  Info,
  CheckCircle2,
} from "lucide-react";

import "./add-tax.css";

export default function AddTaxPage() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    rate: "",
    pricing: "Exclusive",
    description: "",
    isDefault: false,
    status: true,
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Tax name is required.";
    }

    if (!form.code.trim()) {
      newErrors.code = "Tax code is required.";
    }

    if (form.rate === "") {
      newErrors.rate = "Tax rate is required.";
    } else if (
      Number(form.rate) < 0 ||
      Number(form.rate) > 100
    ) {
      newErrors.rate =
        "Tax rate must be between 0 and 100.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const taxData = {
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      rate: Number(form.rate),
      pricing: form.pricing,
      description: form.description.trim(),
      isDefault: form.isDefault,
      status: form.status,
    };

    console.log("Tax Data:", taxData);

    // Connect your POST API here.
    // Example:
    //
    // await fetch("/api/taxes", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(taxData),
    // });

    alert("Tax rate added successfully.");
  };

  const handleReset = () => {
    setForm({
      name: "",
      code: "",
      rate: "",
      pricing: "Exclusive",
      description: "",
      isDefault: false,
      status: true,
    });

    setErrors({});
  };

  return (
    <div className="add-tax-page content-wrapper">

      {/* HEADER */}
      <div className="add-tax-header">

        <div className="header-left">

          <Link
            href="/admin/settings/tax"
            className="back-button"
          >
            <ArrowLeft size={14} />
          </Link>

          <div>
            <div className="breadcrumb">
              Settings
              <span>/</span>
              Tax
              <span>/</span>
              Add
            </div>

            <h1>Add Tax Rate</h1>

            <p>
              Create a new tax rate for your POS.
            </p>
          </div>

        </div>

      </div>


      {/* CONTENT */}
      <form
        className="tax-form-layout"
        onSubmit={handleSubmit}
      >

        {/* LEFT COLUMN */}
        <div className="form-main">

          {/* BASIC INFORMATION */}
          <section className="form-card">

            <div className="card-header">

              <div className="card-icon">
                <Percent size={14} />
              </div>

              <div>
                <h2>Tax Information</h2>

                <p>
                  Enter the basic details of this
                  tax rate.
                </p>
              </div>

            </div>


            <div className="card-body">

              <div className="form-grid">

                {/* TAX NAME */}
                <div className="form-field">

                  <label>
                    Tax Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. VAT"
                    value={form.name}
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value
                      )
                    }
                  />

                  {errors.name && (
                    <small className="error">
                      {errors.name}
                    </small>
                  )}

                </div>


                {/* TAX CODE */}
                <div className="form-field">

                  <label>
                    Tax Code
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. VAT"
                    value={form.code}
                    onChange={(e) =>
                      updateField(
                        "code",
                        e.target.value
                          .toUpperCase()
                      )
                    }
                  />

                  {errors.code && (
                    <small className="error">
                      {errors.code}
                    </small>
                  )}

                  <small className="field-help">
                    A short unique identifier.
                  </small>

                </div>


                {/* TAX RATE */}
                <div className="form-field">

                  <label>
                    Tax Rate
                    <span>*</span>
                  </label>

                  <div className="input-suffix">

                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="7.5"
                      value={form.rate}
                      onChange={(e) =>
                        updateField(
                          "rate",
                          e.target.value
                        )
                      }
                    />

                    <span>%</span>

                  </div>

                  {errors.rate && (
                    <small className="error">
                      {errors.rate}
                    </small>
                  )}

                </div>


                {/* PRICING */}
                <div className="form-field">

                  <label>
                    Pricing Type
                  </label>

                  <select
                    value={form.pricing}
                    onChange={(e) =>
                      updateField(
                        "pricing",
                        e.target.value
                      )
                    }
                  >
                    <option value="Exclusive">
                      Tax Exclusive
                    </option>

                    <option value="Inclusive">
                      Tax Inclusive
                    </option>
                  </select>

                  <small className="field-help">
                    Choose whether tax is already
                    included in the product price.
                  </small>

                </div>


                {/* DESCRIPTION */}
                <div className="form-field full">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Enter a description for this tax..."
                    value={form.description}
                    onChange={(e) =>
                      updateField(
                        "description",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </div>

          </section>


          {/* OPTIONS */}
          <section className="form-card">

            <div className="card-header">

              <div className="card-icon">
                <CheckCircle2 size={14} />
              </div>

              <div>
                <h2>Tax Options</h2>

                <p>
                  Configure how this tax behaves
                  in the POS.
                </p>
              </div>

            </div>


            <div className="card-body">

              {/* DEFAULT */}
              <label className="option-row">

                <div className="custom-checkbox">

                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) =>
                      updateField(
                        "isDefault",
                        e.target.checked
                      )
                    }
                  />

                  <span />

                </div>

                <div className="option-content">

                  <strong>
                    Set as default tax
                  </strong>

                  <small>
                    Automatically select this tax
                    when creating taxable products.
                  </small>

                </div>

              </label>


              {/* STATUS */}
              <label className="option-row">

                <div className="custom-checkbox">

                  <input
                    type="checkbox"
                    checked={form.status}
                    onChange={(e) =>
                      updateField(
                        "status",
                        e.target.checked
                      )
                    }
                  />

                  <span />

                </div>

                <div className="option-content">

                  <strong>
                    Active tax rate
                  </strong>

                  <small>
                    Allow this tax rate to be used
                    during sales and purchases.
                  </small>

                </div>

              </label>

            </div>

          </section>


          {/* ACTIONS */}
          <div className="form-actions">

            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              <RotateCcw size={12} />
              Reset
            </button>

            <div className="action-right">

              <Link
                href="/admin/settings/tax"
                className="cancel-button"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="save-button"
              >
                <Save size={12} />
                Save Tax Rate
              </button>

            </div>

          </div>

        </div>


        {/* RIGHT COLUMN */}
        <aside className="form-sidebar">

          {/* PREVIEW */}
          <section className="preview-card">

            <div className="preview-header">
              <h2>Tax Preview</h2>

              <span>
                Live
              </span>
            </div>


            <div className="preview-body">

              <div className="preview-tax-icon">
                <Percent size={18} />
              </div>

              <h3>
                {form.name || "Tax Name"}
              </h3>

              <p>
                {form.code || "TAX"}
              </p>


              <div className="preview-rate">

                <strong>
                  {form.rate || "0"}
                  <small>%</small>
                </strong>

                <span>
                  {form.pricing === "Inclusive"
                    ? "Tax Inclusive"
                    : "Tax Exclusive"}
                </span>

              </div>


              <div className="preview-example">

                <div>
                  <span>
                    Product price
                  </span>

                  <strong>
                    ₦10,000.00
                  </strong>
                </div>

                <div>
                  <span>
                    Tax
                  </span>

                  <strong>
                    {form.rate
                      ? `₦${(
                          10000 *
                          (Number(form.rate) /
                            100)
                        ).toLocaleString(
                          "en-NG",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}`
                      : "₦0.00"}
                  </strong>
                </div>

                <div className="example-total">
                  <span>
                    Total
                  </span>

                  <strong>
                    {form.rate
                      ? `₦${(
                          10000 +
                          10000 *
                            (Number(form.rate) /
                              100)
                        ).toLocaleString(
                          "en-NG",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}`
                      : "₦10,000.00"}
                  </strong>
                </div>

              </div>

            </div>

          </section>


          {/* INFORMATION */}
          <section className="info-card">

            <div className="info-icon">
              <Info size={13} />
            </div>

            <div>

              <h3>
                Tax-inclusive vs exclusive
              </h3>

              <p>
                <strong>Exclusive:</strong> Tax is
                added to the product price at
                checkout.
              </p>

              <p>
                <strong>Inclusive:</strong> The
                displayed product price already
                contains the tax amount.
              </p>

            </div>

          </section>

        </aside>

      </form>

    </div>
  );
}

