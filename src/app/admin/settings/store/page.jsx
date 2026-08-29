
"use client";

import { useState } from "react";
import {
  Store,
  ShoppingCart,
  Package,
  Receipt,
  CreditCard,
  Clock3,
  Save,
  RotateCcw,
  CheckCircle2,
  Info,
} from "lucide-react";

import "./store.css";

export default function StoreSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "Main Store",
    storeCode: "STORE-001",

    allowNegativeStock: false,
    autoUpdateStock: true,
    enableLowStockAlert: true,
    allowBackorders: false,

    allowDiscount: true,
    maxDiscount: "20",
    requireCustomer: false,
    allowPriceOverride: false,

    defaultPaymentMethod: "Cash",
    allowSplitPayment: true,
    allowCreditSale: false,

    autoPrintReceipt: true,
    showCustomerOnReceipt: true,
    showCashierOnReceipt: true,
    showBarcodeOnReceipt: true,

    enableHoldSale: true,
    enableReturn: true,
    returnDays: "7",

    openingTime: "08:00",
    closingTime: "20:00",

    roundTotal: false,
    roundMethod: "Nearest",
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveSettings = (e) => {
    e.preventDefault();

    console.log("Store settings:", settings);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const resetSettings = () => {
    setSettings({
      storeName: "Main Store",
      storeCode: "STORE-001",

      allowNegativeStock: false,
      autoUpdateStock: true,
      enableLowStockAlert: true,
      allowBackorders: false,

      allowDiscount: true,
      maxDiscount: "20",
      requireCustomer: false,
      allowPriceOverride: false,

      defaultPaymentMethod: "Cash",
      allowSplitPayment: true,
      allowCreditSale: false,

      autoPrintReceipt: true,
      showCustomerOnReceipt: true,
      showCashierOnReceipt: true,
      showBarcodeOnReceipt: true,

      enableHoldSale: true,
      enableReturn: true,
      returnDays: "7",

      openingTime: "08:00",
      closingTime: "20:00",

      roundTotal: false,
      roundMethod: "Nearest",
    });
  };

  return (
    <div className="store-settings-page content-wrapper">

      {/* HEADER */}

      <div className="store-settings-header">

        <div className="header-icon">
          <Store size={16} />
        </div>

        <div>
          <div className="breadcrumb">
            Settings
            <span>/</span>
            Store
          </div>

          <h1>Store Settings</h1>

          <p>
            Configure how your store operates,
            sells products and processes transactions.
          </p>
        </div>

      </div>


      {/* SUCCESS */}

      {saved && (
        <div className="success-message">

          <CheckCircle2 size={14} />

          <div>
            <strong>Store settings saved</strong>

            <span>
              Your store configuration has been updated successfully.
            </span>
          </div>

        </div>
      )}


      <form onSubmit={saveSettings}>

        <div className="store-layout">

          <main className="store-main">

            {/* STORE INFORMATION */}

            <SettingsSection
              icon={<Store size={14} />}
              title="Store Information"
              description="Basic configuration for this store."
            >

              <div className="form-grid">

                <Field label="Store Name">

                  <input
                    value={settings.storeName}
                    onChange={(e) =>
                      updateSetting(
                        "storeName",
                        e.target.value
                      )
                    }
                    placeholder="Enter store name"
                  />

                </Field>


                <Field label="Store Code">

                  <input
                    value={settings.storeCode}
                    onChange={(e) =>
                      updateSetting(
                        "storeCode",
                        e.target.value
                      )
                    }
                    placeholder="STORE-001"
                  />

                </Field>

              </div>

            </SettingsSection>


            {/* INVENTORY */}

            <SettingsSection
              icon={<Package size={14} />}
              title="Inventory Behavior"
              description="Control how sales affect your product inventory."
            >

              <Toggle
                title="Automatically Update Stock"
                description="Deduct sold quantities from inventory automatically after a completed sale."
                checked={settings.autoUpdateStock}
                onChange={(value) =>
                  updateSetting(
                    "autoUpdateStock",
                    value
                  )
                }
              />


              <Toggle
                title="Allow Negative Stock"
                description="Allow cashiers to sell products even when available stock reaches zero."
                checked={settings.allowNegativeStock}
                onChange={(value) =>
                  updateSetting(
                    "allowNegativeStock",
                    value
                  )
                }
              />


              <Toggle
                title="Low Stock Alerts"
                description="Show an alert when a product reaches its minimum stock level."
                checked={settings.enableLowStockAlert}
                onChange={(value) =>
                  updateSetting(
                    "enableLowStockAlert",
                    value
                  )
                }
              />


              <Toggle
                title="Allow Backorders"
                description="Allow products to be sold when there is insufficient stock."
                checked={settings.allowBackorders}
                onChange={(value) =>
                  updateSetting(
                    "allowBackorders",
                    value
                  )
                }
              />

            </SettingsSection>


            {/* SALES */}

            <SettingsSection
              icon={<ShoppingCart size={14} />}
              title="Sales & Checkout"
              description="Configure checkout rules for cashiers."
            >

              <Toggle
                title="Allow Discounts"
                description="Allow cashiers to apply discounts during checkout."
                checked={settings.allowDiscount}
                onChange={(value) =>
                  updateSetting(
                    "allowDiscount",
                    value
                  )
                }
              />

              <div className="inline-setting">

                <div>
                  <strong>
                    Maximum Discount
                  </strong>

                  <span>
                    Maximum discount percentage a cashier can apply.
                  </span>
                </div>

                <div className="small-input">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.maxDiscount}
                    onChange={(e) =>
                      updateSetting(
                        "maxDiscount",
                        e.target.value
                      )
                    }
                  />

                  <b>%</b>

                </div>

              </div>


              <Toggle
                title="Require Customer"
                description="Require a customer to be selected before completing a sale."
                checked={settings.requireCustomer}
                onChange={(value) =>
                  updateSetting(
                    "requireCustomer",
                    value
                  )
                }
              />


              <Toggle
                title="Allow Price Override"
                description="Allow authorized cashiers to change the selling price during checkout."
                checked={settings.allowPriceOverride}
                onChange={(value) =>
                  updateSetting(
                    "allowPriceOverride",
                    value
                  )
                }
              />


              <Toggle
                title="Enable Hold Sale"
                description="Allow cashiers to temporarily hold an unfinished transaction."
                checked={settings.enableHoldSale}
                onChange={(value) =>
                  updateSetting(
                    "enableHoldSale",
                    value
                  )
                }
              />

            </SettingsSection>


            {/* PAYMENT */}

            <SettingsSection
              icon={<CreditCard size={14} />}
              title="Payment"
              description="Configure default payment behavior."
            >

              <div className="form-grid">

                <Field label="Default Payment Method">

                  <select
                    value={settings.defaultPaymentMethod}
                    onChange={(e) =>
                      updateSetting(
                        "defaultPaymentMethod",
                        e.target.value
                      )
                    }
                  >
                    <option>Cash</option>
                    <option>Card</option>
                    <option>Bank Transfer</option>
                    <option>Mobile Money</option>
                  </select>

                </Field>

              </div>


              <Toggle
                title="Allow Split Payment"
                description="Allow a customer to pay one transaction using multiple payment methods."
                checked={settings.allowSplitPayment}
                onChange={(value) =>
                  updateSetting(
                    "allowSplitPayment",
                    value
                  )
                }
              />


              <Toggle
                title="Allow Credit Sales"
                description="Allow customers to complete a sale without paying the full amount immediately."
                checked={settings.allowCreditSale}
                onChange={(value) =>
                  updateSetting(
                    "allowCreditSale",
                    value
                  )
                }
              />

            </SettingsSection>


            {/* RECEIPT */}

            <SettingsSection
              icon={<Receipt size={14} />}
              title="Receipt Settings"
              description="Control what is displayed and printed on receipts."
            >

              <Toggle
                title="Automatically Print Receipt"
                description="Automatically send a completed transaction to the receipt printer."
                checked={settings.autoPrintReceipt}
                onChange={(value) =>
                  updateSetting(
                    "autoPrintReceipt",
                    value
                  )
                }
              />


              <Toggle
                title="Show Customer"
                description="Display the customer's name and details on the receipt."
                checked={settings.showCustomerOnReceipt}
                onChange={(value) =>
                  updateSetting(
                    "showCustomerOnReceipt",
                    value
                  )
                }
              />


              <Toggle
                title="Show Cashier"
                description="Display the cashier who processed the transaction."
                checked={settings.showCashierOnReceipt}
                onChange={(value) =>
                  updateSetting(
                    "showCashierOnReceipt",
                    value
                  )
                }
              />


              <Toggle
                title="Show Product Barcode"
                description="Display product barcodes on printed receipts."
                checked={settings.showBarcodeOnReceipt}
                onChange={(value) =>
                  updateSetting(
                    "showBarcodeOnReceipt",
                    value
                  )
                }
              />

            </SettingsSection>


            {/* RETURNS */}

            <SettingsSection
              icon={<RotateCcw size={14} />}
              title="Returns"
              description="Configure your store's return policy."
            >

              <Toggle
                title="Allow Sales Returns"
                description="Allow completed sales to be returned through the POS."
                checked={settings.enableReturn}
                onChange={(value) =>
                  updateSetting(
                    "enableReturn",
                    value
                  )
                }
              />


              <div className="inline-setting">

                <div>
                  <strong>
                    Return Period
                  </strong>

                  <span>
                    Number of days after purchase during which a return is allowed.
                  </span>
                </div>

                <div className="small-input">

                  <input
                    type="number"
                    min="0"
                    value={settings.returnDays}
                    onChange={(e) =>
                      updateSetting(
                        "returnDays",
                        e.target.value
                      )
                    }
                  />

                  <b>days</b>

                </div>

              </div>

            </SettingsSection>


            {/* STORE HOURS */}

            <SettingsSection
              icon={<Clock3 size={14} />}
              title="Store Hours"
              description="Set the normal operating hours for this store."
            >

              <div className="form-grid">

                <Field label="Opening Time">

                  <input
                    type="time"
                    value={settings.openingTime}
                    onChange={(e) =>
                      updateSetting(
                        "openingTime",
                        e.target.value
                      )
                    }
                  />

                </Field>


                <Field label="Closing Time">

                  <input
                    type="time"
                    value={settings.closingTime}
                    onChange={(e) =>
                      updateSetting(
                        "closingTime",
                        e.target.value
                      )
                    }
                  />

                </Field>

              </div>

            </SettingsSection>


            {/* ROUNDING */}

            <SettingsSection
              icon={<Info size={14} />}
              title="Transaction Rounding"
              description="Configure how transaction totals should be rounded."
            >

              <Toggle
                title="Round Transaction Total"
                description="Round the final transaction total before payment."
                checked={settings.roundTotal}
                onChange={(value) =>
                  updateSetting(
                    "roundTotal",
                    value
                  )
                }
              />


              <div className="form-grid">

                <Field label="Rounding Method">

                  <select
                    value={settings.roundMethod}
                    onChange={(e) =>
                      updateSetting(
                        "roundMethod",
                        e.target.value
                      )
                    }
                  >
                    <option>Nearest</option>
                    <option>Up</option>
                    <option>Down</option>
                  </select>

                </Field>

              </div>

            </SettingsSection>

          </main>


          {/* ====================================
              SIDEBAR
          ==================================== */}

          <aside className="store-sidebar">

            <div className="sidebar-card">

              <div className="sidebar-title">

                <Store size={13} />

                <div>
                  <strong>Store Settings</strong>

                  <span>
                    Store configuration
                  </span>
                </div>

              </div>


              <div className="sidebar-nav">

                <div className="sidebar-nav-item active">
                  <Store size={11} />
                  Store
                </div>

                <div className="sidebar-nav-item">
                  <ShoppingCart size={11} />
                  Sales
                </div>

                <div className="sidebar-nav-item">
                  <Package size={11} />
                  Inventory
                </div>

                <div className="sidebar-nav-item">
                  <Receipt size={11} />
                  Receipts
                </div>

                <div className="sidebar-nav-item">
                  <CreditCard size={11} />
                  Payments
                </div>

              </div>

            </div>


            {/* STORE STATUS */}

            <div className="status-card">

              <span className="status-label">
                CURRENT STORE
              </span>

              <div className="store-identity">

                <div className="store-avatar">
                  <Store size={15} />
                </div>

                <div>

                  <strong>
                    {settings.storeName}
                  </strong>

                  <span>
                    {settings.storeCode}
                  </span>

                </div>

              </div>


              <div className="status-row">

                <span>Operating hours</span>

                <b>
                  {settings.openingTime}
                  {" - "}
                  {settings.closingTime}
                </b>

              </div>


              <div className="status-row">

                <span>Returns</span>

                <b>
                  {settings.enableReturn
                    ? `${settings.returnDays} days`
                    : "Disabled"}
                </b>

              </div>


              <div className="status-row">

                <span>Negative stock</span>

                <b>
                  {settings.allowNegativeStock
                    ? "Allowed"
                    : "Blocked"}
                </b>

              </div>

            </div>


            {/* NOTICE */}

            <div className="notice-card">

              <Info size={12} />

              <p>
                Store settings apply to transactions
                processed at this store. Some options
                may require administrator permission.
              </p>

            </div>

          </aside>

        </div>


        {/* ACTION BAR */}

        <div className="store-actions">

          <button
            type="button"
            className="reset-btn"
            onClick={resetSettings}
          >
            <RotateCcw size={12} />
            Reset
          </button>


          <button
            type="submit"
            className="save-btn"
          >
            <Save size={12} />
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}


/* ==========================================
   SETTINGS SECTION
========================================== */

function SettingsSection({
  icon,
  title,
  description,
  children,
}) {
  return (
    <section className="settings-section">

      <div className="section-header">

        <div className="section-icon">
          {icon}
        </div>

        <div>
          <h2>{title}</h2>

          <p>
            {description}
          </p>
        </div>

      </div>

      <div className="section-content">
        {children}
      </div>

    </section>
  );
}


/* ==========================================
   FIELD
========================================== */

function Field({ label, children }) {
  return (
    <div className="field">

      <label>{label}</label>

      {children}

    </div>
  );
}


/* ==========================================
   TOGGLE
========================================== */

function Toggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="toggle-row">

      <div className="toggle-content">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>


      <button
        type="button"
        className={`toggle ${
          checked ? "active" : ""
        }`}
        onClick={() =>
          onChange(!checked)
        }
      >
        <span />
      </button>

    </div>
  );
}

