
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  FolderTree,
  Save,
  ImagePlus,
  X,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { createCategory } from "@/services/categories/get";
import "./add-category.css";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const [image, setImage] = useState(null);
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files?.[0];

  //   if (!file) return;

  //   setImage({
  //     file,
  //     preview: URL.createObjectURL(file),
  //   });
  // };

  // const removeImage = () => {
  //   if (image?.preview) {
  //     URL.revokeObjectURL(image.preview);
  //   }

  //   setImage(null);
  // };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name.trim()) {
    toast.error?.("Category name is required");
    return;
  }

  try {
    const result = await createCategory({
      name: formData.name,
      description: formData.description,
      status: formData.status,
    });

    if (!result?.success) {
      toast.error?.(
        result?.message || "Failed to create category"
      );
      return;
    }

    toast.success?.(
      result.message || "Category created successfully"
    );

    // Reset form
    setFormData({
      name: "",
      description: "",
      status: "active",
    });

    removeImage();

  } catch (error) {
    console.error("Error creating category:", error);

    toast.error?.("Failed to create category");
  }
};



  return (
    <div className="add-category-page content-wrapper">

      {/* HEADER */}

      <div className="add-category-header">

        <div className="add-category-title">

          {/* <button
            type="button"
            className="save-btn"
            onClick={() => {
              document
                .getElementById("category-form")
                .requestSubmit();
            }}
          >
            <ArrowLeft size={18} />
          </button> */}

          <div>

            {/* <div className="breadcrumb">
              <span>Products</span>
              <span>/</span>
              <span>Categories</span>
              <span>/</span>
              <strong>Add Category</strong>
            </div> */}

            <h1>Add Category</h1>

            <p>
              Create a new category for organizing
              your products.
            </p>

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
          >
            <Save size={17} />
            Save Category
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
                  <h2>
                    Category Information
                  </h2>

                  <p>
                    Enter the basic information
                    for this category.
                  </p>
                </div>

              </div>


              <div className="divider" />


              <div className="form-group">

                <label>
                  Category Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Smartphones"
                  required
                />

                <small>
                  Choose a clear and recognizable
                  name for your category.
                </small>

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what type of products belong to this category..."
                  rows="6"
                />

                <small>
                  A short description helps
                  administrators understand the
                  purpose of this category.
                </small>

              </div>


              <div className="form-group">

                <label>
                  Status
                </label>

                <div className="status-options">

                  <label
                    className={`status-option ${formData.status === "active"
                      ? "selected"
                      : ""
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

                      <span>
                        Products can be assigned to this category.
                      </span>
                    </div>
                  </label>


                  <label
                    className={`status-option ${formData.status === "inactive"
                        ? "selected"
                        : ""
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

                      <span>
                        Hide this category from active selections.
                      </span>
                    </div>
                  </label>

                </div>

              </div>

            </section>

          </div>


          {/* RIGHT */}

          <aside className="category-sidebar">

            {/* <section className="category-card">

              <div className="sidebar-heading">

                <div>

                  <h2>
                    Category Image
                  </h2>

                  <p>
                    Optional
                  </p>

                </div>

              </div>


              {image ? (

                <div className="category-image-preview">

                  <img
                    src={image.preview}
                    alt="Category preview"
                  />

                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </button>

                </div>

              ) : (

                <label
                  htmlFor="category-image"
                  className="category-upload"
                >

                  <div className="upload-icon">
                    <ImagePlus size={23} />
                  </div>

                  <strong>
                    Upload category image
                  </strong>

                  <span>
                    PNG, JPG or WEBP
                  </span>

                  <small>
                    Maximum size: 2MB
                  </small>

                  <input
                    id="category-image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={
                      handleImageChange
                    }
                  />

                </label>

              )}

            </section> */}


            {/* PREVIEW */}

            <section className="category-card">

              <h2 className="preview-title">
                Category Preview
              </h2>

              <div className="category-preview">

                <div className="preview-image">

                  {image ? (

                    <img
                      src={image.preview}
                      alt=""
                    />

                  ) : (

                    <FolderTree size={23} />

                  )}

                </div>

                <div>

                  <strong>
                    {formData.name ||
                      "Category Name"}
                  </strong>

                  <span>
                    {formData.description ||
                      "Category description"}
                  </span>

                </div>

              </div>

              <div className="preview-status">

                <span>
                  Status
                </span>

                <strong
                  className={
                    formData.status ===
                      "Active"
                      ? "active"
                      : "inactive"
                  }
                >
                  {formData.status}
                </strong>

              </div>

            </section>


            {/* TIP */}

            <div className="category-tip">

              <strong>
                Category tip
              </strong>

              <p>
                Keep categories simple and
                specific. This makes it easier
                for cashiers to find products
                during a sale.
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

          <button
            type="submit"
            className="save-btn"
            onClick={() => alert("BUTTON CLICKED")}
          >
            <Save size={17} />
            Save Category
          </button>

        </div>

      </form>

    </div>
  );
}

