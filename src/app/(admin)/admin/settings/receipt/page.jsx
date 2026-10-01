
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Receipt,
  Printer,
  Store,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Check,
  Info,
} from "lucide-react";

import "./receipt.css";

export default function ReceiptSettingsPage() {
  const [settings, setSettings] = useState({
    paperSize: "80mm",

    showLogo: true,
    showBusinessName: true,
    showBusinessAddress: true,
    showPhone: true,
    showEmail: false,
    showTaxNumber: true,

    showCashier: true,
    showCustomer: true,
    showCustomerPhone: false,

    showProductCode: false,
    showProductDiscount: true,
    showTax: true,
    showSubtotal: true,

    showPaymentMethod: true,
    showAmountPaid: true,
    showChange: true,

    showDate: true,
    showTime: true,
    showReceiptNumber: true,

    headerText: "",
    footerText:
      "Thank you for shopping with us!",
    terms:
      "Goods sold are not returnable without a valid receipt.",

    printAutomatically: false,
    openDrawer: true,
    copies: "1",
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Receipt Settings:", settings);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setSettings({
      paperSize: "80mm",

      showLogo: true,
      showBusinessName: true,
      showBusinessAddress: true,
      showPhone: true,
      showEmail: false,
      showTaxNumber: true,

      showCashier: true,
      showCustomer: true,
      showCustomerPhone: false,

      showProductCode: false,
      showProductDiscount: true,
      showTax: true,
      showSubtotal: true,

      showPaymentMethod: true,
      showAmountPaid: true,
      showChange: true,

      showDate: true,
      showTime: true,
      showReceiptNumber: true,

      headerText: "",
      footerText:
        "Thank you for shopping with us!",
      terms:
        "Goods sold are not returnable without a valid receipt.",

      printAutomatically: false,
      openDrawer: true,
      copies: "1",
    });

    setSaved(false);
  };

  return (
    <div className="receipt-page content-wrapper">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="receipt-header">

        <div className="receipt-header-left">

          <Link
            href="/admin/settings"
            className="back-button"
          >
            <ArrowLeft size={14} />
          </Link>

          <div>

            <div className="breadcrumb">
              Settings
              <span>/</span>
              Receipt
            </div>

            <h1>Receipt Settings</h1>

            <p>
              Customize how receipts are displayed
              and printed from your POS.
            </p>

          </div>

        </div>

        <div className="header-actions">

          <button
            type="button"
            className="reset-button"
            onClick={handleReset}
          >
            <RotateCcw size={12} />
            Reset
          </button>

          <button
            type="button"
            className="save-button"
            onClick={handleSave}
          >
            {saved ? (
              <Check size={12} />
            ) : (
              <Save size={12} />
            )}

            {saved
              ? "Saved"
              : "Save Changes"}
          </button>

        </div>

      </div>


      {/* =====================================
          MAIN LAYOUT
      ===================================== */}

      <form
        className="receipt-layout"
        onSubmit={handleSave}
      >

        {/* ===================================
            SETTINGS
        =================================== */}

        <div className="receipt-settings">


          {/* ---------------------------------
              PRINTER
          ---------------------------------- */}

          <section className="settings-card">

            <CardHeader
              icon={<Printer size={14} />}
              title="Printer & Paper"
              description="Configure receipt printer and paper settings."
            />

            <div className="settings-body">

              <div className="form-grid">

                <div className="form-field">

                  <label>
                    Receipt Paper Size
                  </label>

                  <select
                    value={settings.paperSize}
                    onChange={(e) =>
                      updateSetting(
                        "paperSize",
                        e.target.value
                      )
                    }
                  >
                    <option value="58mm">
                      58mm Thermal
                    </option>

                    <option value="80mm">
                      80mm Thermal
                    </option>

                    <option value="A4">
                      A4
                    </option>

                    <option value="Letter">
                      Letter
                    </option>

                  </select>

                  <small>
                    Select the paper size used by
                    your receipt printer.
                  </small>

                </div>


                <div className="form-field">

                  <label>
                    Number of Copies
                  </label>

                  <select
                    value={settings.copies}
                    onChange={(e) =>
                      updateSetting(
                        "copies",
                        e.target.value
                      )
                    }
                  >
                    <option value="1">
                      1 Copy
                    </option>

                    <option value="2">
                      2 Copies
                    </option>

                    <option value="3">
                      3 Copies
                    </option>

                  </select>

                  <small>
                    Number of receipts printed per sale.
                  </small>

                </div>

              </div>


              <div className="setting-divider" />


              <Toggle
                title="Print Automatically"
                description="Automatically send the receipt to the printer after completing a sale."
                checked={settings.printAutomatically}
                onChange={(value) =>
                  updateSetting(
                    "printAutomatically",
                    value
                  )
                }
              />


              <Toggle
                title="Open Cash Drawer"
                description="Send the cash drawer opening command when a cash transaction is completed."
                checked={settings.openDrawer}
                onChange={(value) =>
                  updateSetting(
                    "openDrawer",
                    value
                  )
                }
              />

            </div>

          </section>


          {/* ---------------------------------
              BUSINESS INFORMATION
          ---------------------------------- */}

          <section className="settings-card">

            <CardHeader
              icon={<Store size={14} />}
              title="Business Information"
              description="Choose the business details displayed on receipts."
            />

            <div className="settings-body">

              <Toggle
                title="Business Logo"
                description="Display your store logo at the top of the receipt."
                checked={settings.showLogo}
                onChange={(value) =>
                  updateSetting(
                    "showLogo",
                    value
                  )
                }
              />

              <Toggle
                title="Business Name"
                description="Display the store name on the receipt."
                checked={settings.showBusinessName}
                onChange={(value) =>
                  updateSetting(
                    "showBusinessName",
                    value
                  )
                }
              />

              <Toggle
                title="Business Address"
                description="Display your store address."
                checked={settings.showBusinessAddress}
                onChange={(value) =>
                  updateSetting(
                    "showBusinessAddress",
                    value
                  )
                }
              />

              <Toggle
                title="Phone Number"
                description="Display the business phone number."
                checked={settings.showPhone}
                onChange={(value) =>
                  updateSetting(
                    "showPhone",
                    value
                  )
                }
              />

              <Toggle
                title="Email Address"
                description="Display the business email address."
                checked={settings.showEmail}
                onChange={(value) =>
                  updateSetting(
                    "showEmail",
                    value
                  )
                }
              />

              <Toggle
                title="Tax Identification Number"
                description="Display your business tax identification number."
                checked={settings.showTaxNumber}
                onChange={(value) =>
                  updateSetting(
                    "showTaxNumber",
                    value
                  )
                }
              />

            </div>

          </section>


          {/* ---------------------------------
              SALE INFORMATION
          ---------------------------------- */}

          <section className="settings-card">

            <CardHeader
              icon={<Receipt size={14} />}
              title="Sale Information"
              description="Choose the transaction details shown on receipts."
            />

            <div className="settings-body">

              <Toggle
                title="Receipt Number"
                description="Display the unique receipt or invoice number."
                checked={settings.showReceiptNumber}
                onChange={(value) =>
                  updateSetting(
                    "showReceiptNumber",
                    value
                  )
                }
              />

              <Toggle
                title="Date"
                description="Display the transaction date."
                checked={settings.showDate}
                onChange={(value) =>
                  updateSetting(
                    "showDate",
                    value
                  )
                }
              />

              <Toggle
                title="Time"
                description="Display the transaction time."
                checked={settings.showTime}
                onChange={(value) =>
                  updateSetting(
                    "showTime",
                    value
                  )
                }
              />

              <Toggle
                title="Cashier"
                description="Display the name of the cashier who processed the sale."
                checked={settings.showCashier}
                onChange={(value) =>
                  updateSetting(
                    "showCashier",
                    value
                  )
                }
              />

              <Toggle
                title="Customer"
                description="Display the customer's name when available."
                checked={settings.showCustomer}
                onChange={(value) =>
                  updateSetting(
                    "showCustomer",
                    value
                  )
                }
              />

              <Toggle
                title="Customer Phone"
                description="Display the customer's phone number."
                checked={settings.showCustomerPhone}
                onChange={(value) =>
                  updateSetting(
                    "showCustomerPhone",
                    value
                  )
                }
              />

            </div>

          </section>


          {/* ---------------------------------
              PRODUCT INFORMATION
          ---------------------------------- */}

          <section className="settings-card">

            <CardHeader
              icon={<Receipt size={14} />}
              title="Product Details"
              description="Configure the product information printed on receipts."
            />

            <div className="settings-body">

              <Toggle
                title="Product Code"
                description="Display SKU or barcode beside each product."
                checked={settings.showProductCode}
                onChange={(value) =>
                  updateSetting(
                    "showProductCode",
                    value
                  )
                }
              />

              <Toggle
                title="Product Discount"
                description="Display individual product discounts."
                checked={settings.showProductDiscount}
                onChange={(value) =>
                  updateSetting(
                    "showProductDiscount",
                    value
                  )
                }
              />

              <Toggle
                title="Subtotal"
                description="Display the subtotal before tax and final adjustments."
                checked={settings.showSubtotal}
                onChange={(value) =>
                  updateSetting(
                    "showSubtotal",
                    value
                  )
                }
              />

              <Toggle
                title="Tax"
                description="Display tax amount on the receipt."
                checked={settings.showTax}
                onChange={(value) =>
                  updateSetting(
                    "showTax",
                    value
                  )
                }
              />

            </div>

          </section>


          {/* ---------------------------------
              PAYMENT
          ---------------------------------- */}

          <section className="settings-card">

            <CardHeader
              icon={<Printer size={14} />}
              title="Payment Information"
              description="Configure payment information displayed after checkout."
            />

            <div className="settings-body">

              <Toggle
                title="Payment Method"
                description="Display whether the customer paid by cash, card, transfer, or another method."
                checked={settings.showPaymentMethod}
                onChange={(value) =>
                  updateSetting(
                    "showPaymentMethod",
                    value
                  )
                }
              />

              <Toggle
                title="Amount Paid"
                description="Display the amount received from the customer."
                checked={settings.showAmountPaid}
                onChange={(value) =>
                  updateSetting(
                    "showAmountPaid",
                    value
                  )
                }
              />

              <Toggle
                title="Change"
                description="Display the change returned to the customer."
                checked={settings.showChange}
                onChange={(value) =>
                  updateSetting(
                    "showChange",
                    value
                  )
                }
              />

            </div>

          </section>


          {/* ---------------------------------
              TEXT
          ---------------------------------- */}

          <section className="settings-card">

            <CardHeader
              icon={<ImageIcon size={14} />}
              title="Receipt Text"
              description="Customize the header, footer, and terms printed on receipts."
            />

            <div className="settings-body">

              <div className="form-field">

                <label>
                  Header Message
                </label>

                <textarea
                  rows="3"
                  placeholder="e.g. Welcome to our store!"
                  value={settings.headerText}
                  onChange={(e) =>
                    updateSetting(
                      "headerText",
                      e.target.value
                    )
                  }
                />

                <small>
                  Optional message printed below
                  the business information.
                </small>

              </div>


              <div className="form-field">

                <label>
                  Footer Message
                </label>

                <textarea
                  rows="3"
                  placeholder="Thank you for shopping with us!"
                  value={settings.footerText}
                  onChange={(e) =>
                    updateSetting(
                      "footerText",
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Terms & Conditions
                </label>

                <textarea
                  rows="4"
                  placeholder="Enter your receipt terms..."
                  value={settings.terms}
                  onChange={(e) =>
                    updateSetting(
                      "terms",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </section>


          {/* BOTTOM ACTIONS */}

          <div className="bottom-actions">

            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              <RotateCcw size={12} />
              Reset
            </button>

            <button
              type="submit"
              className="save-button"
            >
              {saved ? (
                <Check size={12} />
              ) : (
                <Save size={12} />
              )}

              {saved
                ? "Saved Successfully"
                : "Save Changes"}
            </button>

          </div>

        </div>


        {/* ===================================
            RECEIPT PREVIEW
        =================================== */}

        <aside className="receipt-preview-area">

          <div className="preview-title">

            <div>
              <h2>Receipt Preview</h2>

              <p>
                Live preview of your receipt.
              </p>
            </div>

            <span>
              {settings.paperSize}
            </span>

          </div>


          <div className="receipt-paper">

            {settings.showLogo && (
              <div className="receipt-logo">
                <div className="logo-placeholder">
                  <Store size={17} />
                </div>
              </div>
            )}


            {settings.showBusinessName && (
              <h3 className="business-name">
                YOUR STORE
              </h3>
            )}


            {settings.showBusinessAddress && (
              <div className="business-info">
                12 Market Street
                <br />
                Benin City, Edo State
              </div>
            )}


            {settings.showPhone && (
              <div className="business-info">
                Tel: 0800 000 0000
              </div>
            )}


            {settings.showEmail && (
              <div className="business-info">
                info@yourstore.com
              </div>
            )}


            {settings.showTaxNumber && (
              <div className="business-info">
                TIN: 1234567890
              </div>
            )}


            <div className="receipt-line" />


            {settings.headerText && (
              <div className="receipt-header-text">
                {settings.headerText}
              </div>
            )}


            <div className="receipt-meta">

              {settings.showReceiptNumber && (
                <div>
                  <span>Receipt</span>
                  <strong>#00001245</strong>
                </div>
              )}

              {settings.showDate && (
                <div>
                  <span>Date</span>
                  <strong>29/08/2026</strong>
                </div>
              )}

              {settings.showTime && (
                <div>
                  <span>Time</span>
                  <strong>10:42 AM</strong>
                </div>
              )}

              {settings.showCashier && (
                <div>
                  <span>Cashier</span>
                  <strong>John</strong>
                </div>
              )}

              {settings.showCustomer && (
                <div>
                  <span>Customer</span>
                  <strong>Walk-in</strong>
                </div>
              )}

            </div>


            <div className="receipt-line" />


            <div className="receipt-products">

              <div className="product-row product-heading">
                <span>ITEM</span>
                <span>AMOUNT</span>
              </div>


              <div className="product-row">

                <div>
                  <strong>
                    Coca Cola 50cl
                  </strong>

                  {settings.showProductCode && (
                    <small>
                      SKU: COKE50
                    </small>
                  )}

                  <small>
                    2 × ₦500
                  </small>
                </div>

                <strong>
                  ₦1,000
                </strong>

              </div>


              <div className="product-row">

                <div>
                  <strong>
                    Bread
                  </strong>

                  {settings.showProductCode && (
                    <small>
                      SKU: BRD001
                    </small>
                  )}

                  <small>
                    1 × ₦1,200
                  </small>
                </div>

                <strong>
                  ₦1,200
                </strong>

              </div>


              <div className="product-row">

                <div>
                  <strong>
                    Bottled Water
                  </strong>

                  {settings.showProductCode && (
                    <small>
                      SKU: WTR001
                    </small>
                  )}

                  <small>
                    3 × ₦300
                  </small>

                </div>

                <strong>
                  ₦900
                </strong>

              </div>

            </div>


            <div className="receipt-line" />


            <div className="receipt-totals">

              {settings.showSubtotal && (
                <div>
                  <span>Subtotal</span>
                  <strong>
                    ₦3,100
                  </strong>
                </div>
              )}

              {settings.showProductDiscount && (
                <div>
                  <span>Discount</span>
                  <strong>
                    -₦100
                  </strong>
                </div>
              )}

              {settings.showTax && (
                <div>
                  <span>VAT 7.5%</span>
                  <strong>
                    ₦225
                  </strong>
                </div>
              )}

              <div className="receipt-total">
                <span>TOTAL</span>
                <strong>
                  ₦3,225
                </strong>
              </div>

            </div>


            <div className="receipt-line" />


            {settings.showPaymentMethod && (
              <div className="payment-row">

                <span>
                  Payment
                </span>

                <strong>
                  Cash
                </strong>

              </div>
            )}


            {settings.showAmountPaid && (
              <div className="payment-row">

                <span>
                  Amount Paid
                </span>

                <strong>
                  ₦5,000
                </strong>

              </div>
            )}


            {settings.showChange && (
              <div className="payment-row">

                <span>
                  Change
                </span>

                <strong>
                  ₦1,775
                </strong>

              </div>
            )}


            <div className="receipt-line" />


            {settings.terms && (
              <div className="receipt-terms">
                {settings.terms}
              </div>
            )}


            {settings.footerText && (
              <div className="receipt-footer">
                {settings.footerText}
              </div>
            )}

          </div>


          {/* INFO */}

          <div className="preview-info">

            <Info size={13} />

            <p>
              This preview uses sample transaction
              data. Actual receipts will use your
              store and sale information.
            </p>

          </div>

        </aside>

      </form>

    </div>
  );
}


/* ==========================================
   CARD HEADER
========================================== */

function CardHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="card-header">

      <div className="card-icon">
        {icon}
      </div>

      <div>

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

      </div>

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
    <div className="receipt-toggle">

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

