
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Power,
  Receipt,
  Percent,
  CheckCircle2,
  XCircle,
  X,
  Save,
  Info,
} from "lucide-react";

import "./tax.css";

const initialTaxes = [
  {
    id: 1,
    name: "VAT",
    code: "VAT",
    rate: "7.5",
    type: "Percentage",
    status: "Active",
    default: true,
    inclusive: false,
    description: "Value Added Tax",
  },
  {
    id: 2,
    name: "Zero Rated",
    code: "ZERO",
    rate: "0",
    type: "Percentage",
    status: "Active",
    default: false,
    inclusive: false,
    description: "Products with zero tax rate",
  },
  {
    id: 3,
    name: "Tax Exempt",
    code: "EXEMPT",
    rate: "0",
    type: "Percentage",
    status: "Active",
    default: false,
    inclusive: false,
    description: "Products exempt from tax",
  },
];

export default function TaxSettingsPage() {
  const [taxes, setTaxes] = useState(initialTaxes);

  const [search, setSearch] = useState("");

  const [menuId, setMenuId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [editingTax, setEditingTax] = useState(null);

  const [settings, setSettings] = useState({
    taxEnabled: true,
    defaultInclusive: false,
    showTaxOnReceipt: true,
    calculateTaxAutomatically: true,
  });

  const [form, setForm] = useState({
    name: "",
    code: "",
    rate: "",
    description: "",
    inclusive: false,
    default: false,
    status: true,
  });

  const filteredTaxes = taxes.filter((tax) => {
    const query = search.toLowerCase();

    return (
      tax.name.toLowerCase().includes(query) ||
      tax.code.toLowerCase().includes(query) ||
      tax.rate.includes(query)
    );
  });

  const activeTaxes = taxes.filter(
    (tax) => tax.status === "Active"
  ).length;

  const defaultTax = taxes.find(
    (tax) => tax.default
  );

  const updateSetting = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingTax(null);

    setForm({
      name: "",
      code: "",
      rate: "",
      description: "",
      inclusive: settings.defaultInclusive,
      default: false,
      status: true,
    });

    setShowModal(true);
  };

  const openEditModal = (tax) => {
    setEditingTax(tax);

    setForm({
      name: tax.name,
      code: tax.code,
      rate: tax.rate,
      description: tax.description,
      inclusive: tax.inclusive,
      default: tax.default,
      status: tax.status === "Active",
    });

    setMenuId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTax(null);
  };

  const saveTax = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (editingTax) {
      setTaxes((prev) =>
        prev.map((tax) => {
          if (tax.id === editingTax.id) {
            return {
              ...tax,
              name: form.name,
              code: form.code,
              rate: form.rate || "0",
              description: form.description,
              inclusive: form.inclusive,
              default: form.default,
              status: form.status
                ? "Active"
                : "Inactive",
            };
          }

          if (form.default) {
            return {
              ...tax,
              default: false,
            };
          }

          return tax;
        })
      );
    } else {
      const newTax = {
        id: Date.now(),
        name: form.name,
        code:
          form.code ||
          form.name
            .toUpperCase()
            .replace(/\s+/g, "_"),
        rate: form.rate || "0",
        type: "Percentage",
        description: form.description,
        inclusive: form.inclusive,
        default: form.default,
        status: form.status
          ? "Active"
          : "Inactive",
      };

      setTaxes((prev) => {
        if (form.default) {
          return [
            ...prev.map((tax) => ({
              ...tax,
              default: false,
            })),
            newTax,
          ];
        }

        return [...prev, newTax];
      });
    }

    closeModal();
  };

  const toggleTaxStatus = (id) => {
    setTaxes((prev) =>
      prev.map((tax) =>
        tax.id === id
          ? {
              ...tax,
              status:
                tax.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : tax
      )
    );

    setMenuId(null);
  };

  const setDefaultTax = (id) => {
    setTaxes((prev) =>
      prev.map((tax) => ({
        ...tax,
        default: tax.id === id,
      }))
    );

    setMenuId(null);
  };

  const deleteTax = (id) => {
    const tax = taxes.find(
      (item) => item.id === id
    );

    if (!tax) return;

    if (tax.default) {
      alert(
        "The default tax cannot be deleted. Set another tax as default first."
      );
      return;
    }

    setTaxes((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setMenuId(null);
  };

  return (
    <div className="tax-page content-wrapper">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="tax-header">

        <div className="tax-header-left">

          <Link
            href="/admin/settings"
            className="back-button"
          >
            <ArrowLeft size={13} />
          </Link>

          <div>

            <div className="breadcrumb">
              Settings
              <span>/</span>
              Tax
            </div>

            <h1>Tax Settings</h1>

            <p>
              Configure tax rates and how tax is
              calculated during sales.
            </p>

          </div>

        </div>

        <button
          className="add-tax-btn"
          onClick={openAddModal}
        >
          <Plus size={13} />
          Add Tax Rate
        </button>

      </div>


      {/* =====================================
          SUMMARY
      ===================================== */}

      <div className="tax-summary">

        <SummaryCard
          icon={<Receipt size={14} />}
          label="Tax Status"
          value={
            settings.taxEnabled
              ? "Enabled"
              : "Disabled"
          }
          status={settings.taxEnabled}
        />

        <SummaryCard
          icon={<Percent size={14} />}
          label="Tax Rates"
          value={taxes.length}
        />

        <SummaryCard
          icon={<CheckCircle2 size={14} />}
          label="Active Rates"
          value={activeTaxes}
        />

        <SummaryCard
          icon={<Receipt size={14} />}
          label="Default Tax"
          value={defaultTax?.name || "None"}
          text
        />

      </div>


      {/* =====================================
          GLOBAL TAX SETTINGS
      ===================================== */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-icon">
            <Receipt size={14} />
          </div>

          <div>

            <h2>
              Tax Configuration
            </h2>

            <p>
              Global tax behavior for your POS.
            </p>

          </div>

        </div>


        <div className="settings-body">

          <TaxToggle
            title="Enable Tax"
            description="Enable tax calculations throughout the POS."
            checked={settings.taxEnabled}
            onChange={(value) =>
              updateSetting(
                "taxEnabled",
                value
              )
            }
          />


          <TaxToggle
            title="Calculate Tax Automatically"
            description="Automatically calculate applicable tax when products are added to a sale."
            checked={
              settings.calculateTaxAutomatically
            }
            onChange={(value) =>
              updateSetting(
                "calculateTaxAutomatically",
                value
              )
            }
          />


          <TaxToggle
            title="Tax Inclusive Pricing"
            description="Treat product prices as already including tax."
            checked={settings.defaultInclusive}
            onChange={(value) =>
              updateSetting(
                "defaultInclusive",
                value
              )
            }
          />


          <TaxToggle
            title="Show Tax on Receipt"
            description="Display tax amounts and tax details on printed receipts."
            checked={settings.showTaxOnReceipt}
            onChange={(value) =>
              updateSetting(
                "showTaxOnReceipt",
                value
              )
            }
          />

        </div>

      </section>


      {/* =====================================
          TAX RATES
      ===================================== */}

      <section className="tax-table-card">

        <div className="table-header">

          <div>

            <h2>
              Tax Rates
            </h2>

            <p>
              Manage the tax rates available
              for products and sales.
            </p>

          </div>


          <div className="search-box">

            <Search size={12} />

            <input
              type="text"
              placeholder="Search tax rates..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        <div className="tax-table-wrapper">

          <table className="tax-table">

            <thead>

              <tr>
                <th>TAX NAME</th>
                <th>CODE</th>
                <th>RATE</th>
                <th>PRICING</th>
                <th>DEFAULT</th>
                <th>STATUS</th>
                <th></th>
              </tr>

            </thead>


            <tbody>

              {filteredTaxes.length > 0 ? (
                filteredTaxes.map((tax) => (

                  <tr key={tax.id}>

                    <td>

                      <div className="tax-name-cell">

                        <div className="tax-icon">
                          <Percent size={13} />
                        </div>

                        <div>

                          <strong>
                            {tax.name}
                          </strong>

                          <span>
                            {tax.description}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="tax-code">
                        {tax.code}
                      </span>

                    </td>


                    <td>

                      <strong className="tax-rate">
                        {tax.rate}%
                      </strong>

                    </td>


                    <td>

                      <span
                        className={
                          tax.inclusive
                            ? "pricing-badge inclusive"
                            : "pricing-badge exclusive"
                        }
                      >
                        {tax.inclusive
                          ? "Inclusive"
                          : "Exclusive"}
                      </span>

                    </td>


                    <td>

                      {tax.default ? (

                        <span className="default-badge">
                          Default
                        </span>

                      ) : (

                        <button
                          className="make-default"
                          onClick={() =>
                            setDefaultTax(
                              tax.id
                            )
                          }
                        >
                          Make default
                        </button>

                      )}

                    </td>


                    <td>

                      <span
                        className={
                          tax.status === "Active"
                            ? "status-badge active"
                            : "status-badge inactive"
                        }
                      >
                        <span className="status-dot" />

                        {tax.status}
                      </span>

                    </td>


                    <td className="actions-cell">

                      <button
                        className="more-btn"
                        onClick={() =>
                          setMenuId(
                            menuId === tax.id
                              ? null
                              : tax.id
                          )
                        }
                      >
                        <MoreVertical size={14} />
                      </button>


                      {menuId === tax.id && (

                        <div className="action-menu">

                          <button
                            onClick={() =>
                              openEditModal(tax)
                            }
                          >
                            <Pencil size={11} />
                            Edit
                          </button>


                          <button
                            onClick={() =>
                              toggleTaxStatus(
                                tax.id
                              )
                            }
                          >
                            <Power size={11} />

                            {tax.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>


                          {!tax.default && (

                            <button
                              onClick={() =>
                                setDefaultTax(
                                  tax.id
                                )
                              }
                            >
                              <CheckCircle2 size={11} />
                              Set as default
                            </button>

                          )}


                          {!tax.default && (

                            <button
                              className="danger"
                              onClick={() =>
                                deleteTax(
                                  tax.id
                                )
                              }
                            >
                              <Trash2 size={11} />
                              Delete
                            </button>

                          )}

                        </div>

                      )}

                    </td>

                  </tr>

                ))
              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-state"
                  >

                    <Percent size={22} />

                    <strong>
                      No tax rates found
                    </strong>

                    <span>
                      Try another search or add
                      a new tax rate.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        <div className="table-footer">

          Showing{" "}
          <strong>
            {filteredTaxes.length}
          </strong>{" "}
          of{" "}
          <strong>
            {taxes.length}
          </strong>{" "}
          tax rates

        </div>

      </section>


      {/* =====================================
          INFORMATION
      ===================================== */}

      <div className="tax-info">

        <div className="info-icon">
          <Info size={13} />
        </div>

        <div>

          <strong>
            Tax calculation
          </strong>

          <p>
            Tax-inclusive pricing means the displayed
            product price already contains tax. With
            tax-exclusive pricing, tax is added to the
            product price during checkout.
          </p>

        </div>

      </div>


      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onMouseDown={closeModal}
        >

          <div
            className="tax-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  {editingTax
                    ? "Edit Tax Rate"
                    : "Add Tax Rate"}
                </h2>

                <p>
                  Configure a tax rate for
                  your POS.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                <X size={14} />
              </button>

            </div>


            <form onSubmit={saveTax}>

              <div className="modal-body">

                <div className="modal-grid">

                  <FormField
                    label="Tax Name"
                    required
                  >

                    <input
                      type="text"
                      placeholder="e.g. VAT"
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                    />

                  </FormField>


                  <FormField
                    label="Tax Code"
                    required
                  >

                    <input
                      type="text"
                      placeholder="e.g. VAT"
                      value={form.code}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          code: e.target.value
                            .toUpperCase(),
                        })
                      }
                    />

                  </FormField>


                  <FormField
                    label="Tax Rate"
                    required
                  >

                    <div className="rate-input">

                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="7.5"
                        value={form.rate}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            rate: e.target.value,
                          })
                        }
                      />

                      <span>%</span>

                    </div>

                  </FormField>


                  <FormField
                    label="Pricing"
                  >

                    <select
                      value={
                        form.inclusive
                          ? "Inclusive"
                          : "Exclusive"
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          inclusive:
                            e.target.value ===
                            "Inclusive",
                        })
                      }
                    >
                      <option>
                        Exclusive
                      </option>

                      <option>
                        Inclusive
                      </option>

                    </select>

                  </FormField>


                  <div className="form-field full">

                    <label>
                      Description
                    </label>

                    <textarea
                      rows="3"
                      placeholder="Describe this tax..."
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description:
                            e.target.value,
                        })
                      }
                    />

                  </div>

                </div>


                <div className="modal-options">

                  <CheckboxOption
                    checked={form.default}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        default: value,
                      })
                    }
                    title="Set as default tax"
                    description="Automatically use this tax for new taxable products."
                  />


                  <CheckboxOption
                    checked={form.status}
                    onChange={(value) =>
                      setForm({
                        ...form,
                        status: value,
                      })
                    }
                    title="Active"
                    description="Make this tax available for use in the POS."
                  />

                </div>

              </div>


              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  <Save size={12} />

                  {editingTax
                    ? "Save Changes"
                    : "Add Tax Rate"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


/* ==========================================
   SUMMARY CARD
========================================== */

function SummaryCard({
  icon,
  label,
  value,
  status,
  text,
}) {
  return (
    <div className="summary-card">

      <div className="summary-icon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong
          className={
            text
              ? "summary-text"
              : status === true
                ? "summary-green"
                : ""
          }
        >
          {value}
        </strong>

      </div>

    </div>
  );
}


/* ==========================================
   TAX TOGGLE
========================================== */

function TaxToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="tax-toggle">

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>


      <button
        type="button"
        className={
          checked
            ? "toggle active"
            : "toggle"
        }
        onClick={() =>
          onChange(!checked)
        }
      >
        <span />
      </button>

    </div>
  );
}


/* ==========================================
   FORM FIELD
========================================== */

function FormField({
  label,
  required,
  children,
}) {
  return (
    <div className="form-field">

      <label>
        {label}

        {required && (
          <em>*</em>
        )}
      </label>

      {children}

    </div>
  );
}


/* ==========================================
   CHECKBOX OPTION
========================================== */

function CheckboxOption({
  checked,
  onChange,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className={
        checked
          ? "checkbox-option checked"
          : "checkbox-option"
      }
      onClick={() =>
        onChange(!checked)
      }
    >

      <span className="checkbox">
        {checked && "✓"}
      </span>

      <span>

        <strong>
          {title}
        </strong>

        <small>
          {description}
        </small>

      </span>

    </button>
  );
}

