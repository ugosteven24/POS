"use client";

import React, { useState } from "react";
import { FolderTree, Save } from "lucide-react";
import Swal from "sweetalert2";
import { createBrands } from "@/services/brands/get";
import "./add-brand.css";

const initialFormData = {
  name: "",
  description: "",
  status: "active",
};

const BUTTON_COLOR = "#356bd8";

export default function AddBrand() {
  const [formData, setFormData] = useState(initialFormData);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!formData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Brand name is required",
        text: "Please enter a name for the brand.",
        confirmButtonColor: BUTTON_COLOR,
      });
      return;
    }

    try {
      setSaving(true);

      const result = await createBrands({
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status,
      });

      if (!result?.success) {
        Swal.fire({
          icon: "error",
          title: "Could not save brand",
          text: result?.message || "Failed to create brand.",
          confirmButtonColor: BUTTON_COLOR,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Brand created",
        text: result.message || "Brand created successfully.",
        confirmButtonColor: BUTTON_COLOR,
      });

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error creating brand:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Failed to create brand. Please try again.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-category-page content-wrapper">
      {/* HEADER */}
      <div className="add-category-header">
        <div className="add-category-title">
          <div>
            <h1>Add Brand</h1>
            <p>Create a new brand for organizing your products.</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="category-form"
            className="save-btn"
            disabled={saving}
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Brand"}
          </button>
        </div>
      </div>

      {/* FORM */}
      <form
        id="category-form"
        className="category-form"
        onSubmit={handleSubmit}
      >
        <div className="category-content">
          {/* LEFT */}
          <div className="category-main">
            <section className="category-card">
              <div className="card-heading">
                <div className="card-icon">
                  <FolderTree size={19} />
                </div>

                <div>
                  <h2>Brand Information</h2>
                  <p>Enter the basic information for this brand.</p>
                </div>
              </div>

              <div className="divider" />

              <div className="form-group">
                <label>
                  Brand Name<span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Samsung"
                  required
                />

                <small>
                  Choose a clear and recognizable name for your brand.
                </small>
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this brand..."
                  rows="6"
                />

                <small>
                  A short description helps administrators understand the
                  purpose of this brand.
                </small>
              </div>

              <div className="form-group">
                <label>Status</label>

                <div className="status-options">
                  <label
                    className={`status-option ${
                      formData.status === "active" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === "active"}
                      onChange={handleChange}
                    />

                    <div>
                      <strong>Active</strong>
                      <span>Products can be assigned to this brand.</span>
                    </div>
                  </label>

                  <label
                    className={`status-option ${
                      formData.status === "inactive" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === "inactive"}
                      onChange={handleChange}
                    />

                    <div>
                      <strong>Inactive</strong>
                      <span>Hide this brand from active selections.</span>
                    </div>
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="category-sidebar">
            {/* PREVIEW */}
            <section className="category-card">
              <h2 className="preview-title">Brand Preview</h2>

              <div className="category-preview">
                <div className="preview-image">
                  <FolderTree size={23} />
                </div>

                <div>
                  <strong>{formData.name || "Brand Name"}</strong>
                  <span>{formData.description || "Brand description"}</span>
                </div>
              </div>

              <div className="preview-status">
                <span>Status</span>

                <strong
                  className={
                    formData.status === "active" ? "active" : "inactive"
                  }
                >
                  {formData.status}
                </strong>
              </div>
            </section>

            {/* TIP */}
            <div className="category-tip">
              <strong>Brand tip</strong>

              <p>
                Keep brands simple and specific. This makes it easier for
                cashiers to find products during a sale.
              </p>
            </div>
          </aside>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="mobile-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button type="submit" className="save-btn" disabled={saving}>
            <Save size={17} />
            {saving ? "Saving..." : "Save Brand"}
          </button>
        </div>
      </form>
    </div>
  );
}