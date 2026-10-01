
"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Power,
  Banknote,
  Smartphone,
  Building2,
  WalletCards,
  CheckCircle2,
  XCircle,
  X,
  Save,
} from "lucide-react";

import "./payment-methods.css";

const initialMethods = [
  {
    id: 1,
    name: "Cash",
    code: "CASH",
    description: "Cash payment at the counter",
    type: "Cash",
    icon: "cash",
    status: "Active",
    default: true,
    fee: "0",
  },
  {
    id: 2,
    name: "POS / Card",
    code: "CARD",
    description: "Payment through POS terminal or debit card",
    type: "Card",
    icon: "card",
    status: "Active",
    default: false,
    fee: "0",
  },
  {
    id: 3,
    name: "Bank Transfer",
    code: "TRANSFER",
    description: "Customer pays directly into the business bank account",
    type: "Bank",
    icon: "bank",
    status: "Active",
    default: false,
    fee: "0",
  },
  {
    id: 4,
    name: "Mobile Money",
    code: "MOBILE",
    description: "Mobile wallet or mobile money payment",
    type: "Mobile",
    icon: "mobile",
    status: "Active",
    default: false,
    fee: "0",
  },
  {
    id: 5,
    name: "Credit",
    code: "CREDIT",
    description: "Customer purchases now and pays later",
    type: "Credit",
    icon: "credit",
    status: "Inactive",
    default: false,
    fee: "0",
  },
];

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState(initialMethods);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingMethod, setEditingMethod] = useState(null);

  const [menuId, setMenuId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    type: "Cash",
    fee: "0",
    default: false,
  });

  const filteredMethods = methods.filter((method) => {
    const value = search.toLowerCase();

    return (
      method.name.toLowerCase().includes(value) ||
      method.code.toLowerCase().includes(value) ||
      method.type.toLowerCase().includes(value)
    );
  });

  const openAddModal = () => {
    setEditingMethod(null);

    setForm({
      name: "",
      code: "",
      description: "",
      type: "Cash",
      fee: "0",
      default: false,
    });

    setShowModal(true);
  };

  const openEditModal = (method) => {
    setEditingMethod(method);

    setForm({
      name: method.name,
      code: method.code,
      description: method.description,
      type: method.type,
      fee: method.fee,
      default: method.default,
    });

    setMenuId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMethod(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (editingMethod) {
      setMethods((prev) =>
        prev.map((method) =>
          method.id === editingMethod.id
            ? {
                ...method,
                ...form,
              }
            : form.default
              ? {
                  ...method,
                  default: false,
                }
              : method
        )
      );
    } else {
      const newMethod = {
        id: Date.now(),
        name: form.name,
        code: form.code || form.name
          .toUpperCase()
          .replace(/\s+/g, "_"),
        description: form.description,
        type: form.type,
        icon: getIconType(form.type),
        status: "Active",
        default: form.default,
        fee: form.fee,
      };

      setMethods((prev) =>
        form.default
          ? [
              ...prev.map((method) => ({
                ...method,
                default: false,
              })),
              newMethod,
            ]
          : [...prev, newMethod]
      );
    }

    closeModal();
  };

  const toggleStatus = (id) => {
    setMethods((prev) =>
      prev.map((method) =>
        method.id === id
          ? {
              ...method,
              status:
                method.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : method
      )
    );

    setMenuId(null);
  };

  const deleteMethod = (id) => {
    const method = methods.find(
      (item) => item.id === id
    );

    if (!method) return;

    if (method.default) {
      alert("The default payment method cannot be deleted.");
      return;
    }

    setMethods((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setMenuId(null);
  };

  const setDefault = (id) => {
    setMethods((prev) =>
      prev.map((method) => ({
        ...method,
        default: method.id === id,
      }))
    );

    setMenuId(null);
  };

  const activeCount = methods.filter(
    (method) => method.status === "Active"
  ).length;

  const inactiveCount = methods.filter(
    (method) => method.status === "Inactive"
  ).length;

  const defaultMethod = methods.find(
    (method) => method.default
  );

  return (
    <div className="payment-page content-wrapper">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="payment-header">

        <div className="payment-header-icon">
          <CreditCard size={17} />
        </div>

        <div className="payment-heading">

          <div className="payment-breadcrumb">
            Settings
            <span>/</span>
            Payment Methods
          </div>

          <h1>Payment Methods</h1>

          <p>
            Manage the payment methods available
            at checkout.
          </p>

        </div>

        <button
          className="add-payment-btn"
          onClick={openAddModal}
        >
          <Plus size={13} />
          Add Payment Method
        </button>

      </div>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="payment-stats">

        <StatCard
          label="Total Methods"
          value={methods.length}
          icon={<CreditCard size={14} />}
        />

        <StatCard
          label="Active"
          value={activeCount}
          icon={<CheckCircle2 size={14} />}
        />

        <StatCard
          label="Inactive"
          value={inactiveCount}
          icon={<XCircle size={14} />}
        />

        <StatCard
          label="Default Method"
          value={defaultMethod?.name || "None"}
          icon={<WalletCards size={14} />}
          text
        />

      </div>


      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="payment-card">

        <div className="payment-card-top">

          <div>
            <h2>Payment Methods</h2>

            <p>
              Methods shown to cashiers when
              completing a sale.
            </p>
          </div>

          <div className="payment-search">

            <Search size={12} />

            <input
              type="text"
              placeholder="Search payment methods..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        {/* TABLE */}

        <div className="payment-table-wrapper">

          <table className="payment-table">

            <thead>

              <tr>
                <th>PAYMENT METHOD</th>
                <th>CODE</th>
                <th>TYPE</th>
                <th>FEE</th>
                <th>DEFAULT</th>
                <th>STATUS</th>
                <th></th>
              </tr>

            </thead>

            <tbody>

              {filteredMethods.length > 0 ? (
                filteredMethods.map((method) => (

                  <tr key={method.id}>

                    <td>

                      <div className="method-cell">

                        <PaymentIcon
                          type={method.icon}
                        />

                        <div>

                          <strong>
                            {method.name}
                          </strong>

                          <span>
                            {method.description}
                          </span>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="method-code">
                        {method.code}
                      </span>

                    </td>


                    <td>

                      <span className="type-text">
                        {method.type}
                      </span>

                    </td>


                    <td>

                      <span className="fee-value">
                        {method.fee}%
                      </span>

                    </td>


                    <td>

                      {method.default ? (
                        <span className="default-badge">
                          Default
                        </span>
                      ) : (
                        <button
                          className="make-default"
                          onClick={() =>
                            setDefault(method.id)
                          }
                        >
                          Make default
                        </button>
                      )}

                    </td>


                    <td>

                      <span
                        className={`status-badge ${
                          method.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        <span className="status-dot" />
                        {method.status}
                      </span>

                    </td>


                    <td className="actions-cell">

                      <button
                        className="more-btn"
                        onClick={() =>
                          setMenuId(
                            menuId === method.id
                              ? null
                              : method.id
                          )
                        }
                      >
                        <MoreVertical size={14} />
                      </button>


                      {menuId === method.id && (

                        <div className="action-menu">

                          <button
                            onClick={() =>
                              openEditModal(method)
                            }
                          >
                            <Pencil size={11} />
                            Edit
                          </button>


                          <button
                            onClick={() =>
                              toggleStatus(method.id)
                            }
                          >
                            <Power size={11} />
                            {method.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>


                          {!method.default && (
                            <button
                              onClick={() =>
                                setDefault(method.id)
                              }
                            >
                              <CheckCircle2 size={11} />
                              Set as default
                            </button>
                          )}


                          {!method.default && (
                            <button
                              className="danger"
                              onClick={() =>
                                deleteMethod(method.id)
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

                    <div>
                      <CreditCard size={22} />

                      <strong>
                        No payment methods found
                      </strong>

                      <span>
                        Try another search or add
                        a new payment method.
                      </span>
                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}

        <div className="payment-card-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredMethods.length}
            </strong>{" "}
            of{" "}
            <strong>
              {methods.length}
            </strong>{" "}
            payment methods
          </span>

          <span>
            Active methods are available at POS checkout.
          </span>

        </div>

      </div>


      {/* =====================================
          INFO
      ===================================== */}

      <div className="payment-info">

        <div className="info-icon">
          <CreditCard size={13} />
        </div>

        <div>

          <strong>
            Payment methods and checkout
          </strong>

          <p>
            Only active payment methods will appear
            to cashiers during checkout. The default
            method will be selected automatically
            when a new sale is created.
          </p>

        </div>

      </div>


      {/* =====================================
          MODAL
      ===================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onMouseDown={closeModal}
        >

          <div
            className="payment-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  {editingMethod
                    ? "Edit Payment Method"
                    : "Add Payment Method"}
                </h2>

                <p>
                  Configure the payment option
                  available at checkout.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                <X size={14} />
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="modal-body">

                <div className="form-grid">

                  <FormField
                    label="Payment Method Name"
                    required
                  >

                    <input
                      type="text"
                      placeholder="e.g. Cash"
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
                    label="Method Code"
                  >

                    <input
                      type="text"
                      placeholder="e.g. CASH"
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
                    label="Payment Type"
                    required
                  >

                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          type: e.target.value,
                        })
                      }
                    >
                      <option>Cash</option>
                      <option>Card</option>
                      <option>Bank</option>
                      <option>Mobile</option>
                      <option>Credit</option>
                      <option>Other</option>
                    </select>

                  </FormField>


                  <FormField
                    label="Transaction Fee"
                  >

                    <div className="percentage-input">

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.fee}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            fee: e.target.value,
                          })
                        }
                      />

                      <span>%</span>

                    </div>

                  </FormField>


                  <div className="form-field full">

                    <label>
                      Description
                    </label>

                    <textarea
                      rows="3"
                      placeholder="Describe this payment method..."
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


                <label className="default-option">

                  <input
                    type="checkbox"
                    checked={form.default}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        default: e.target.checked,
                      })
                    }
                  />

                  <span className="custom-checkbox">
                    {form.default && "✓"}
                  </span>

                  <div>

                    <strong>
                      Set as default payment method
                    </strong>

                    <span>
                      This method will be automatically
                      selected when starting a sale.
                    </span>

                  </div>

                </label>

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
                  className="modal-save-btn"
                >
                  <Save size={12} />

                  {editingMethod
                    ? "Save Changes"
                    : "Add Payment Method"}
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
   STAT CARD
========================================== */

function StatCard({
  label,
  value,
  icon,
  text,
}) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong className={text ? "stat-text" : ""}>
          {value}
        </strong>

      </div>

    </div>
  );
}


/* ==========================================
   PAYMENT ICON
========================================== */

function PaymentIcon({ type }) {
  const icons = {
    cash: <Banknote size={14} />,
    card: <CreditCard size={14} />,
    bank: <Building2 size={14} />,
    mobile: <Smartphone size={14} />,
    credit: <WalletCards size={14} />,
  };

  return (
    <div className="method-icon">
      {icons[type] || <CreditCard size={14} />}
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
   ICON TYPE
========================================== */

function getIconType(type) {
  const map = {
    Cash: "cash",
    Card: "card",
    Bank: "bank",
    Mobile: "mobile",
    Credit: "credit",
  };

  return map[type] || "card";
}

