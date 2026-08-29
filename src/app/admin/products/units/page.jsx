
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Ruler,
  Package,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  Save,
} from "lucide-react";

import "./units.css";

const initialUnits = [
  {
    id: 1,
    name: "Piece",
    shortName: "pc",
    description: "Individual item or product",
    products: 126,
    status: "Active",
    createdAt: "12 Aug 2026",
  },
  {
    id: 2,
    name: "Box",
    shortName: "box",
    description: "Products sold by the box",
    products: 38,
    status: "Active",
    createdAt: "10 Aug 2026",
  },
  {
    id: 3,
    name: "Carton",
    shortName: "ctn",
    description: "Products sold by carton",
    products: 24,
    status: "Active",
    createdAt: "08 Aug 2026",
  },
  {
    id: 4,
    name: "Kilogram",
    shortName: "kg",
    description: "Products measured by weight",
    products: 17,
    status: "Active",
    createdAt: "05 Aug 2026",
  },
  {
    id: 5,
    name: "Gram",
    shortName: "g",
    description: "Small quantities measured by weight",
    products: 9,
    status: "Active",
    createdAt: "03 Aug 2026",
  },
  {
    id: 6,
    name: "Liter",
    shortName: "L",
    description: "Products measured by volume",
    products: 14,
    status: "Active",
    createdAt: "01 Aug 2026",
  },
  {
    id: 7,
    name: "Pack",
    shortName: "pk",
    description: "Products grouped and sold as a pack",
    products: 21,
    status: "Active",
    createdAt: "29 Jul 2026",
  },
  {
    id: 8,
    name: "Dozen",
    shortName: "dz",
    description: "A group of twelve items",
    products: 6,
    status: "Inactive",
    createdAt: "25 Jul 2026",
  },
];

export default function Units() {
  const [units, setUnits] = useState(initialUnits);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingUnit, setEditingUnit] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    description: "",
    status: "Active",
  });

  /* =========================
     FILTER UNITS
  ========================== */

  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        unit.name.toLowerCase().includes(searchValue) ||
        unit.shortName.toLowerCase().includes(searchValue) ||
        unit.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        unit.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [units, search, statusFilter]);

  /* =========================
     STATISTICS
  ========================== */

  const totalUnits = units.length;

  const activeUnits = units.filter(
    (unit) => unit.status === "Active"
  ).length;

  const inactiveUnits = units.filter(
    (unit) => unit.status === "Inactive"
  ).length;

  const totalProducts = units.reduce(
    (total, unit) => total + unit.products,
    0
  );

  /* =========================
     OPEN ADD MODAL
  ========================== */

  const openAddModal = () => {
    setEditingUnit(null);

    setFormData({
      name: "",
      shortName: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };

  /* =========================
     OPEN EDIT MODAL
  ========================== */

  const openEditModal = (unit) => {
    setEditingUnit(unit);

    setFormData({
      name: unit.name,
      shortName: unit.shortName,
      description: unit.description,
      status: unit.status,
    });

    setShowModal(true);
  };

  /* =========================
     CLOSE MODAL
  ========================== */

  const closeModal = () => {
    setShowModal(false);
    setEditingUnit(null);
  };

  /* =========================
     HANDLE INPUT
  ========================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =========================
     SAVE UNIT
  ========================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    if (!formData.shortName.trim()) {
      return;
    }

    if (editingUnit) {
      setUnits((current) =>
        current.map((unit) =>
          unit.id === editingUnit.id
            ? {
                ...unit,
                name: formData.name.trim(),
                shortName: formData.shortName
                  .trim()
                  .toLowerCase(),
                description:
                  formData.description.trim(),
                status: formData.status,
              }
            : unit
        )
      );
    } else {
      const newUnit = {
        id: Date.now(),
        name: formData.name.trim(),
        shortName: formData.shortName
          .trim()
          .toLowerCase(),
        description: formData.description.trim(),
        products: 0,
        status: formData.status,
        createdAt: new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
      };

      setUnits((current) => [newUnit, ...current]);
    }

    closeModal();
  };

  /* =========================
     DELETE UNIT
  ========================== */

  const deleteUnit = (id) => {
    const unit = units.find(
      (item) => item.id === id
    );

    if (!unit) return;

    if (unit.products > 0) {
      alert(
        `You cannot delete "${unit.name}" because it is currently assigned to ${unit.products} products.`
      );

      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${unit.name}"?`
    );

    if (!confirmed) return;

    setUnits((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="units-page  content-wrapper">

      {/* =================================
          HEADER
      ================================= */}

      <div className="units-header">

        <div>

          <div className="units-breadcrumb">

            <span>Products</span>

            <span>/</span>

            <strong>Units</strong>

          </div>

          <h1>Product Units</h1>

          <p>
            Manage the units used to measure and sell
            your products.
          </p>

        </div>


        <button
          className="add-unit-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Unit
        </button>

      </div>


      {/* =================================
          STATISTICS
      ================================= */}

      <div className="unit-stats">

        <div className="unit-stat-card">

          <div className="unit-stat-icon blue">
            <Ruler size={21} />
          </div>

          <div>

            <span>Total Units</span>

            <h2>{totalUnits}</h2>

            <small>
              All registered units
            </small>

          </div>

        </div>


        <div className="unit-stat-card">

          <div className="unit-stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>

            <span>Active</span>

            <h2>{activeUnits}</h2>

            <small>
              Currently active
            </small>

          </div>

        </div>


        <div className="unit-stat-card">

          <div className="unit-stat-icon orange">
            <XCircle size={21} />
          </div>

          <div>

            <span>Inactive</span>

            <h2>{inactiveUnits}</h2>

            <small>
              Disabled units
            </small>

          </div>

        </div>


        <div className="unit-stat-card">

          <div className="unit-stat-icon purple">
            <Package size={21} />
          </div>

          <div>

            <span>Products</span>

            <h2>{totalProducts}</h2>

            <small>
              Using these units
            </small>

          </div>

        </div>

      </div>


      {/* =================================
          MAIN TABLE CARD
      ================================= */}

      <div className="units-card">

        {/* TOOLBAR */}

        <div className="units-toolbar">

          <div className="unit-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search units..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="unit-filter">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>


        {/* TABLE */}

        <div className="units-table-wrapper">

          <table className="units-table">

            <thead>

              <tr>

                <th>UNIT</th>

                <th>SHORT NAME</th>

                <th>DESCRIPTION</th>

                <th>PRODUCTS</th>

                <th>STATUS</th>

                <th>CREATED</th>

                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {filteredUnits.map((unit) => (

                <tr key={unit.id}>

                  {/* UNIT */}

                  <td>

                    <div className="unit-info">

                      <div className="unit-avatar">
                        <Ruler size={18} />
                      </div>

                      <div>

                        <strong>
                          {unit.name}
                        </strong>

                        <small>
                          UNIT-
                          {String(unit.id).padStart(
                            4,
                            "0"
                          )}
                        </small>

                      </div>

                    </div>

                  </td>


                  {/* SHORT NAME */}

                  <td>

                    <span className="unit-short-name">
                      {unit.shortName}
                    </span>

                  </td>


                  {/* DESCRIPTION */}

                  <td>

                    <span className="unit-description">
                      {unit.description ||
                        "No description"}
                    </span>

                  </td>


                  {/* PRODUCTS */}

                  <td>

                    <div className="unit-product-count">

                      <strong>
                        {unit.products}
                      </strong>

                      <span>
                        products
                      </span>

                    </div>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`unit-status ${unit.status.toLowerCase()}`}
                    >

                      {unit.status ===
                      "Active" ? (
                        <CheckCircle2
                          size={13}
                        />
                      ) : (
                        <XCircle size={13} />
                      )}

                      {unit.status}

                    </span>

                  </td>


                  {/* CREATED */}

                  <td>

                    <span className="unit-created">
                      {unit.createdAt}
                    </span>

                  </td>


                  {/* ACTIONS */}

                  <td>

                    <div className="unit-actions">

                      <button
                        title="View products"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        title="Edit unit"
                        onClick={() =>
                          openEditModal(unit)
                        }
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        title="Delete unit"
                        className="delete-unit"
                        onClick={() =>
                          deleteUnit(unit.id)
                        }
                      >
                        <Trash2 size={16} />
                      </button>

                      <button title="More">
                        <MoreVertical size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* EMPTY */}

          {filteredUnits.length === 0 && (

            <div className="units-empty">

              <div className="empty-unit-icon">
                <Ruler size={29} />
              </div>

              <h3>
                No units found
              </h3>

              <p>
                Try changing your search or
                status filter.
              </p>

            </div>

          )}

        </div>


        {/* FOOTER */}

        <div className="units-footer">

          <span>

            Showing{" "}

            <strong>
              {filteredUnits.length}
            </strong>{" "}

            of{" "}

            <strong>
              {units.length}
            </strong>{" "}

            units

          </span>


          <div className="unit-pagination">

            <button>
              <ChevronLeft size={16} />
            </button>

            <button className="active">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <span>...</span>

            <button>
              5
            </button>

            <button>
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>


      {/* =================================
          ADD / EDIT MODAL
      ================================= */}

      {showModal && (

        <div className="unit-modal-overlay">

          <div className="unit-modal">

            {/* MODAL HEADER */}

            <div className="unit-modal-header">

              <div>

                <h2>

                  {editingUnit
                    ? "Edit Unit"
                    : "Add Unit"}

                </h2>

                <p>

                  {editingUnit
                    ? "Update the unit information."
                    : "Create a new product unit."}

                </p>

              </div>


              <button
                type="button"
                className="close-unit-modal"
                onClick={closeModal}
              >

                <X size={19} />

              </button>

            </div>


            {/* FORM */}

            <form onSubmit={handleSubmit}>

              <div className="unit-modal-body">

                <div className="unit-form-row">

                  <div className="unit-form-group">

                    <label>

                      Unit Name
                      <span>*</span>

                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Piece"
                      required
                      autoFocus
                    />

                  </div>


                  <div className="unit-form-group">

                    <label>

                      Short Name
                      <span>*</span>

                    </label>

                    <input
                      type="text"
                      name="shortName"
                      value={formData.shortName}
                      onChange={handleChange}
                      placeholder="e.g. pc"
                      maxLength={10}
                      required
                    />

                  </div>

                </div>


                <div className="unit-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe how this unit is used..."
                    rows="4"
                  />

                </div>


                <div className="unit-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
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


                {/* EXAMPLE */}

                <div className="unit-example">

                  <div className="unit-example-icon">
                    <Ruler size={17} />
                  </div>

                  <div>

                    <strong>
                      Unit example
                    </strong>

                    <p>

                      {formData.name ||
                        "Piece"}{" "}

                      will be displayed as{" "}

                      <b>
                        {formData.shortName ||
                          "pc"}
                      </b>{" "}

                      when products are listed.

                    </p>

                  </div>

                </div>

              </div>


              {/* MODAL FOOTER */}

              <div className="unit-modal-footer">

                <button
                  type="button"
                  className="unit-modal-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="unit-modal-save"
                >

                  <Save size={16} />

                  {editingUnit
                    ? "Update Unit"
                    : "Create Unit"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

