"use client";

import React, { useState } from "react";
import { Save, Ruler } from "lucide-react";
import { createUnits } from "@/services/units/get";
import Swal from "sweetalert2";
import "./add-units.css";

const BUTTON_COLOR = "#4f46e5"; // <-- add this

const initialFormData = {
  name: "",
  short_name: "",
  description: "",
  status: "active",
};

export default function AddUnit() {


  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

  };


  // ==========================================================
  // SUBMIT
  // ==========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!formData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Units name is required",
        text: "Please enter a name for the unit.",
        confirmButtonColor: BUTTON_COLOR,
      });
      return;
    }

    try {
      setSaving(true);

      const result = await createUnits({
        name: formData.name.trim(),

        short_name:
          formData.short_name
            .trim()
            .toLowerCase(),

        description:
          formData.description.trim(),

        status:
          formData.status,

      });

      if (!result?.success) {
        Swal.fire({
          icon: "error",
          title: "Could not save unit",
          text: result?.message || "Failed to create unit.",
          confirmButtonColor: BUTTON_COLOR,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Unit created",
        text: result.message || "Unit created successfully.",
        confirmButtonColor: BUTTON_COLOR,
      });

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error creating unit:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Failed to create unit. Please try again.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } finally {
      setSaving(false);
    }
  };



  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <div className="add-category-page content-wrapper">


      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="add-category-header">

        <div className="add-category-title">

          <div>

            <h1>
              Add Unit
            </h1>

            <p>
              Create a new unit for measuring
              your products.
            </p>

          </div>

        </div>


        {/* HEADER ACTIONS */}

        <div className="header-actions">

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
            form="unit-form"
            className="save-btn"
            disabled={saving}
          >

            <Save size={17} />

            {saving ? "Saving..." : "Save Units"}

          </button>

        </div>

      </div>



      {/* ======================================================
          FORM
      ======================================================= */}

      <form
        id="unit-form"
        className="category-form"
        onSubmit={handleSubmit}
      >

        <div className="category-content">


          {/* ==================================================
              LEFT
          =================================================== */}

          <div className="category-main">

            <section className="category-card">


              {/* CARD HEADING */}

              <div className="card-heading">

                <div className="card-icon">

                  <Ruler size={19} />

                </div>


                <div>

                  <h2>
                    Unit Information
                  </h2>

                  <p>
                    Enter the basic information
                    for this unit.
                  </p>

                </div>

              </div>


              <div className="divider" />


              {/* =================================================
                  UNIT NAME
              ================================================= */}

              <div className="form-group">

                <label>

                  Unit Name

                  <span>*</span>

                </label>


                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Kilogram"
                  required
                />


                <small>

                  Enter the full name of the
                  measurement unit.

                </small>

              </div>



              {/* =================================================
                  SHORT CODE
              ================================================= */}

              <div className="form-group">

                <label>

                  Short Code

                  <span>*</span>

                </label>


                <input
                  type="text"
                  name="short_name"
                  value={formData.short_code}
                  onChange={handleChange}
                  placeholder="e.g. kg"
                  maxLength={20}
                  required
                />


                <small>

                  A short abbreviation used when
                  displaying product quantities.

                </small>

              </div>



              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="form-group">

                <label>
                  Description
                </label>


                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this unit..."
                  rows="5"
                />


                <small>

                  Optional description to help
                  administrators understand this unit.

                </small>

              </div>



              {/* =================================================
                  STATUS
              ================================================= */}

              <div className="form-group">

                <label>
                  Status
                </label>


                <div className="status-options">


                  {/* ACTIVE */}

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
                      checked={
                        formData.status ===
                        "active"
                      }
                      onChange={handleChange}
                    />


                    <div>

                      <strong>
                        Active
                      </strong>

                      <span>
                        This unit can be assigned
                        to products.
                      </span>

                    </div>

                  </label>



                  {/* INACTIVE */}

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
                      checked={
                        formData.status ===
                        "inactive"
                      }
                      onChange={handleChange}
                    />


                    <div>

                      <strong>
                        Inactive
                      </strong>

                      <span>
                        Hide this unit from
                        active selections.
                      </span>

                    </div>

                  </label>

                </div>

              </div>

            </section>

          </div>



          {/* ==================================================
              RIGHT SIDEBAR
          =================================================== */}

          <aside className="category-sidebar">


            {/* =================================================
                PREVIEW
            ================================================= */}

            <section className="category-card">

              <h2 className="preview-title">
                Unit Preview
              </h2>


              <div className="category-preview">


                <div className="preview-image">

                  <Ruler size={23} />

                </div>


                <div>

                  <strong>

                    {formData.name ||
                      "Unit Name"}

                  </strong>


                  <span>

                    {formData.short_code
                      ? `Code: ${formData.short_code}`
                      : "Unit code"}

                  </span>

                </div>

              </div>



              {/* DESCRIPTION */}

              <div
                style={{
                  marginTop: "15px",
                }}
              >

                <span>

                  {formData.description ||
                    "Unit description"}

                </span>

              </div>



              {/* STATUS */}

              <div className="preview-status">

                <span>
                  Status
                </span>


                <strong
                  className={
                    formData.status ===
                      "active"
                      ? "active"
                      : "inactive"
                  }
                >

                  {formData.status ===
                    "active"
                    ? "Active"
                    : "Inactive"}

                </strong>

              </div>

            </section>



            {/* =================================================
                TIP
            ================================================= */}

            <div className="category-tip">

              <strong>
                Unit tip
              </strong>


              <p>

                Keep units consistent across
                your products. Examples include
                Piece, Kilogram, Litre, Carton,
                Box and Dozen.

              </p>

            </div>

          </aside>

        </div>



        {/* ====================================================
            MOBILE ACTIONS
        ===================================================== */}

        <div className="mobile-actions">

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
            disabled={saving}
          >

            <Save size={17} />

             {saving ? "Saving..." : "Save Units"}

          </button>

        </div>

      </form>

    </div>

  );

}

