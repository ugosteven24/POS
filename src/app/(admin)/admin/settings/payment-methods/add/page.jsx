
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  WalletCards,
  Save,
  RotateCcw,
  Info,
  CheckCircle2,
} from "lucide-react";

import "./add-payment-method.css";

export default function AddPaymentMethodPage() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "Cash",
    description: "",
    transactionFee: "0",
    feeType: "Percentage",
    status: true,
    isDefault: false,
    allowRefund: true,
    requireReference: false,
    showAtCheckout: true,
  });

  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Payment Method:", form);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const resetForm = () => {
    setForm({
      name: "",
      code: "",
      type: "Cash",
      description: "",
      transactionFee: "0",
      feeType: "Percentage",
      status: true,
      isDefault: false,
      allowRefund: true,
      requireReference: false,
      showAtCheckout: true,
    });
  };

  return (
    <div className="add-payment-page content-wrapper">

      {/* HEADER */}

      <div className="add-payment-header">

        <div className="header-left">

          <Link
            href="/admin/settings/payment-methods"
            className="back-button"
          >
            <ArrowLeft size={13} />
          </Link>

          <div>

            <div className="breadcrumb">
              Settings
              <span>/</span>
              Payment Methods
              <span>/</span>
              Add
            </div>

            <h1>Add Payment Method</h1>

            <p>
              Create a payment option that cashiers
              can use when processing sales.
            </p>

          </div>

        </div>

      </div>


      {/* SUCCESS */}

      {saved && (
        <div className="success-alert">

          <CheckCircle2 size={14} />

          <div>

            <strong>
              Payment method saved
            </strong>

            <span>
              The payment method has been created successfully.
            </span>

          </div>

        </div>
      )}


      <form onSubmit={handleSubmit}>

        <div className="add-payment-layout">

          {/* ==================================
              MAIN FORM
          ================================== */}

          <div className="add-payment-main">

            {/* BASIC INFORMATION */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-icon">
                  <CreditCard size={14} />
                </div>

                <div>

                  <h2>
                    Basic Information
                  </h2>

                  <p>
                    Enter the basic details for this
                    payment method.
                  </p>

                </div>

              </div>


              <div className="card-body">

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
                        updateField(
                          "name",
                          e.target.value
                        )
                      }
                    />

                  </FormField>


                  <FormField
                    label="Payment Code"
                    required
                  >

                    <input
                      type="text"
                      placeholder="e.g. CASH"
                      value={form.code}
                      onChange={(e) =>
                        updateField(
                          "code",
                          e.target.value
                            .toUpperCase()
                        )
                      }
                    />

                    <small>
                      A unique short code used internally.
                    </small>

                  </FormField>


                  <FormField
                    label="Payment Type"
                    required
                  >

                    <select
                      value={form.type}
                      onChange={(e) =>
                        updateField(
                          "type",
                          e.target.value
                        )
                      }
                    >
                      <option>Cash</option>
                      <option>Card</option>
                      <option>Bank Transfer</option>
                      <option>Mobile Money</option>
                      <option>Credit</option>
                      <option>Other</option>
                    </select>

                  </FormField>


                  <FormField
                    label="Status"
                  >

                    <div className="status-select">

                      <button
                        type="button"
                        className={
                          form.status
                            ? "status-option selected"
                            : "status-option"
                        }
                        onClick={() =>
                          updateField(
                            "status",
                            true
                          )
                        }
                      >
                        <span className="radio">
                          {form.status && "✓"}
                        </span>

                        Active
                      </button>


                      <button
                        type="button"
                        className={
                          !form.status
                            ? "status-option selected"
                            : "status-option"
                        }
                        onClick={() =>
                          updateField(
                            "status",
                            false
                          )
                        }
                      >
                        <span className="radio">
                          {!form.status && "✓"}
                        </span>

                        Inactive
                      </button>

                    </div>

                  </FormField>


                  <FormField
                    label="Description"
                  >

                    <textarea
                      rows="4"
                      placeholder="Describe this payment method..."
                      value={form.description}
                      onChange={(e) =>
                        updateField(
                          "description",
                          e.target.value
                        )
                      }
                    />

                  </FormField>

                </div>

              </div>

            </section>


            {/* FEES */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-icon">
                  <WalletCards size={14} />
                </div>

                <div>

                  <h2>
                    Transaction Fee
                  </h2>

                  <p>
                    Configure any fee charged when
                    this payment method is used.
                  </p>

                </div>

              </div>


              <div className="card-body">

                <div className="fee-grid">

                  <FormField
                    label="Fee Amount"
                  >

                    <div className="fee-input">

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.transactionFee}
                        onChange={(e) =>
                          updateField(
                            "transactionFee",
                            e.target.value
                          )
                        }
                      />

                      <span>
                        {form.feeType ===
                        "Percentage"
                          ? "%"
                          : "₦"}
                      </span>

                    </div>

                  </FormField>


                  <FormField
                    label="Fee Type"
                  >

                    <select
                      value={form.feeType}
                      onChange={(e) =>
                        updateField(
                          "feeType",
                          e.target.value
                        )
                      }
                    >
                      <option>
                        Percentage
                      </option>

                      <option>
                        Fixed Amount
                      </option>
                    </select>

                  </FormField>

                </div>

              </div>

            </section>


            {/* CHECKOUT */}

            <section className="form-card">

              <div className="card-header">

                <div className="card-icon">
                  <CreditCard size={14} />
                </div>

                <div>

                  <h2>
                    Checkout Behavior
                  </h2>

                  <p>
                    Control how this payment method
                    behaves during checkout.
                  </p>

                </div>

              </div>


              <div className="card-body">

                <SettingToggle
                  title="Show at Checkout"
                  description="Display this payment method to cashiers when completing a sale."
                  checked={form.showAtCheckout}
                  onChange={(value) =>
                    updateField(
                      "showAtCheckout",
                      value
                    )
                  }
                />


                <SettingToggle
                  title="Allow Refunds"
                  description="Allow transactions paid with this method to be refunded."
                  checked={form.allowRefund}
                  onChange={(value) =>
                    updateField(
                      "allowRefund",
                      value
                    )
                  }
                />


                <SettingToggle
                  title="Require Payment Reference"
                  description="Require the cashier to enter a transaction or payment reference."
                  checked={form.requireReference}
                  onChange={(value) =>
                    updateField(
                      "requireReference",
                      value
                    )
                  }
                />


                <SettingToggle
                  title="Set as Default"
                  description="Automatically select this payment method when a new sale is started."
                  checked={form.isDefault}
                  onChange={(value) =>
                    updateField(
                      "isDefault",
                      value
                    )
                  }
                />

              </div>

            </section>

          </div>


          {/* ==================================
              SIDEBAR
          ================================== */}

          <aside className="add-payment-sidebar">

            {/* PREVIEW */}

            <div className="preview-card">

              <div className="preview-title">
                <span>
                  PAYMENT METHOD PREVIEW
                </span>
              </div>


              <div className="payment-preview">

                <PaymentIcon
                  type={form.type}
                />

                <div>

                  <strong>
                    {form.name ||
                      "Payment Method"}
                  </strong>

                  <span>
                    {form.description ||
                      "Payment method description"}
                  </span>

                </div>

              </div>


              <div className="preview-divider" />


              <div className="preview-row">

                <span>Code</span>

                <b>
                  {form.code || "—"}
                </b>

              </div>


              <div className="preview-row">

                <span>Type</span>

                <b>
                  {form.type}
                </b>

              </div>


              <div className="preview-row">

                <span>Transaction Fee</span>

                <b>
                  {form.transactionFee || "0"}
                  {form.feeType ===
                  "Percentage"
                    ? "%"
                    : " ₦"}
                </b>

              </div>


              <div className="preview-row">

                <span>Status</span>

                <b
                  className={
                    form.status
                      ? "green"
                      : "gray"
                  }
                >
                  {form.status
                    ? "Active"
                    : "Inactive"}
                </b>

              </div>

            </div>


            {/* PAYMENT TYPES */}

            <div className="types-card">

              <div className="types-title">
                Payment Types
              </div>

              <PaymentType
                icon={<Banknote size={12} />}
                title="Cash"
                text="Physical cash"
              />

              <PaymentType
                icon={<CreditCard size={12} />}
                title="Card"
                text="POS or debit card"
              />

              <PaymentType
                icon={<Building2 size={12} />}
                title="Bank Transfer"
                text="Direct bank payment"
              />

              <PaymentType
                icon={<Smartphone size={12} />}
                title="Mobile Money"
                text="Mobile wallet payment"
              />

            </div>


            {/* INFO */}

            <div className="info-card">

              <Info size={13} />

              <div>

                <strong>
                  Payment method tip
                </strong>

                <p>
                  Keep payment codes short and
                  unique. Cashiers will see the
                  payment name during checkout.
                </p>

              </div>

            </div>

          </aside>

        </div>


        {/* ACTION BAR */}

        <div className="form-actions">

          <Link
            href="/admin/settings/payment-methods"
            className="cancel-button"
          >
            Cancel
          </Link>


          <button
            type="button"
            className="reset-button"
            onClick={resetForm}
          >
            <RotateCcw size={12} />
            Reset
          </button>


          <button
            type="submit"
            className="save-button"
          >
            <Save size={12} />
            Save Payment Method
          </button>

        </div>

      </form>

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
   TOGGLE
========================================== */

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="setting-toggle">

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
   PAYMENT ICON
========================================== */

function PaymentIcon({ type }) {
  const icons = {
    Cash: <Banknote size={15} />,
    Card: <CreditCard size={15} />,
    "Bank Transfer": <Building2 size={15} />,
    "Mobile Money": <Smartphone size={15} />,
    Credit: <WalletCards size={15} />,
    Other: <CreditCard size={15} />,
  };

  return (
    <div className="preview-icon">
      {icons[type] || (
        <CreditCard size={15} />
      )}
    </div>
  );
}


/* ==========================================
   PAYMENT TYPE
========================================== */

function PaymentType({
  icon,
  title,
  text,
}) {
  return (
    <div className="payment-type">

      <div className="type-icon">
        {icon}
      </div>

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {text}
        </span>

      </div>

    </div>
  );
}

