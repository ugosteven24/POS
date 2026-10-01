
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  ShieldCheck,
  Clock3,
  Bell,
  DatabaseBackup,
  Save,
  RotateCcw,
  Check,
  Monitor,
  Hash,
  Trash2,
} from "lucide-react";

import "./system.css";

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    /* General */
    language: "English",
    currency: "NGN",
    timezone: "Africa/Lagos",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12",

    /* Number */
    decimalPlaces: "2",
    thousandSeparator: ",",
    decimalSeparator: ".",

    /* Security */
    sessionTimeout: "30",
    loginAttempts: "5",
    requirePasswordChange: false,
    autoLogout: true,

    /* Notifications */
    lowStockNotification: true,
    purchaseNotification: true,
    salesNotification: false,
    expenseNotification: true,
    systemNotification: true,

    /* Backup */
    autoBackup: true,
    backupFrequency: "Daily",
    retainBackups: "30",

    /* POS */
    confirmDelete: true,
    confirmSale: false,
    allowNegativeStock: false,
    allowDuplicateBarcode: false,
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

    console.log("System Settings:", settings);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setSettings({
      language: "English",
      currency: "NGN",
      timezone: "Africa/Lagos",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "12",

      decimalPlaces: "2",
      thousandSeparator: ",",
      decimalSeparator: ".",

      sessionTimeout: "30",
      loginAttempts: "5",
      requirePasswordChange: false,
      autoLogout: true,

      lowStockNotification: true,
      purchaseNotification: true,
      salesNotification: false,
      expenseNotification: true,
      systemNotification: true,

      autoBackup: true,
      backupFrequency: "Daily",
      retainBackups: "30",

      confirmDelete: true,
      confirmSale: false,
      allowNegativeStock: false,
      allowDuplicateBarcode: false,
    });

    setSaved(false);
  };

  return (
    <div className="system-page content-wrapper">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="system-header">

        <div className="system-header-left">

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
              System
            </div>

            <h1>System Settings</h1>

            <p>
              Configure system-wide behavior,
              security, notifications and preferences.
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

            {saved ? "Saved" : "Save Changes"}
          </button>

        </div>

      </div>


      {/* =====================================
          CONTENT
      ===================================== */}

      <form
        className="system-layout"
        onSubmit={handleSave}
      >

        <div className="system-content">


          {/* ==================================
              GENERAL
          ================================== */}

          <section className="system-card">

            <CardHeader
              icon={<Settings size={14} />}
              title="General System"
              description="Configure the basic system preferences."
            />

            <div className="card-body">

              <div className="form-grid">

                <SelectField
                  label="System Language"
                  value={settings.language}
                  onChange={(value) =>
                    updateSetting(
                      "language",
                      value
                    )
                  }
                  options={[
                    ["English", "English"],
                  ]}
                />

                <SelectField
                  label="Currency"
                  value={settings.currency}
                  onChange={(value) =>
                    updateSetting(
                      "currency",
                      value
                    )
                  }
                  options={[
                    ["NGN", "₦ Nigerian Naira"],
                    ["USD", "$ US Dollar"],
                    ["GBP", "£ British Pound"],
                    ["EUR", "€ Euro"],
                  ]}
                />

                <SelectField
                  label="Timezone"
                  value={settings.timezone}
                  onChange={(value) =>
                    updateSetting(
                      "timezone",
                      value
                    )
                  }
                  options={[
                    [
                      "Africa/Lagos",
                      "(UTC+01:00) Lagos",
                    ],
                    [
                      "Africa/Accra",
                      "(UTC+00:00) Accra",
                    ],
                    [
                      "Africa/Nairobi",
                      "(UTC+03:00) Nairobi",
                    ],
                    [
                      "Europe/London",
                      "(UTC+00:00) London",
                    ],
                  ]}
                />

                <SelectField
                  label="Date Format"
                  value={settings.dateFormat}
                  onChange={(value) =>
                    updateSetting(
                      "dateFormat",
                      value
                    )
                  }
                  options={[
                    ["DD/MM/YYYY", "DD/MM/YYYY"],
                    ["MM/DD/YYYY", "MM/DD/YYYY"],
                    ["YYYY-MM-DD", "YYYY-MM-DD"],
                  ]}
                />

                <SelectField
                  label="Time Format"
                  value={settings.timeFormat}
                  onChange={(value) =>
                    updateSetting(
                      "timeFormat",
                      value
                    )
                  }
                  options={[
                    ["12", "12 Hour"],
                    ["24", "24 Hour"],
                  ]}
                />

              </div>

            </div>

          </section>


          {/* ==================================
              NUMBER FORMAT
          ================================== */}

          <section className="system-card">

            <CardHeader
              icon={<Hash size={14} />}
              title="Number & Currency Format"
              description="Configure how numbers and monetary values are displayed."
            />

            <div className="card-body">

              <div className="form-grid">

                <SelectField
                  label="Decimal Places"
                  value={settings.decimalPlaces}
                  onChange={(value) =>
                    updateSetting(
                      "decimalPlaces",
                      value
                    )
                  }
                  options={[
                    ["0", "0"],
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                  ]}
                />

                <SelectField
                  label="Thousand Separator"
                  value={settings.thousandSeparator}
                  onChange={(value) =>
                    updateSetting(
                      "thousandSeparator",
                      value
                    )
                  }
                  options={[
                    [",", "Comma (1,000)"],
                    [".", "Dot (1.000)"],
                    [" ", "Space (1 000)"],
                  ]}
                />

                <SelectField
                  label="Decimal Separator"
                  value={settings.decimalSeparator}
                  onChange={(value) =>
                    updateSetting(
                      "decimalSeparator",
                      value
                    )
                  }
                  options={[
                    [".", "Dot (100.50)"],
                    [",", "Comma (100,50)"],
                  ]}
                />

              </div>


              <div className="format-preview">

                <span>
                  Example:
                </span>

                <strong>
                  ₦1,250,000.00
                </strong>

              </div>

            </div>

          </section>


          {/* ==================================
              SECURITY
          ================================== */}

          <section className="system-card">

            <CardHeader
              icon={<ShieldCheck size={14} />}
              title="Security & Sessions"
              description="Control login sessions and system security behavior."
            />

            <div className="card-body">

              <div className="form-grid">

                <div className="form-field">

                  <label>
                    Session Timeout
                  </label>

                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      updateSetting(
                        "sessionTimeout",
                        e.target.value
                      )
                    }
                  >
                    <option value="15">
                      15 Minutes
                    </option>

                    <option value="30">
                      30 Minutes
                    </option>

                    <option value="60">
                      1 Hour
                    </option>

                    <option value="120">
                      2 Hours
                    </option>

                    <option value="0">
                      Never
                    </option>
                  </select>

                  <small>
                    Automatically expire inactive
                    user sessions.
                  </small>

                </div>


                <div className="form-field">

                  <label>
                    Maximum Login Attempts
                  </label>

                  <select
                    value={settings.loginAttempts}
                    onChange={(e) =>
                      updateSetting(
                        "loginAttempts",
                        e.target.value
                      )
                    }
                  >
                    <option value="3">
                      3 Attempts
                    </option>

                    <option value="5">
                      5 Attempts
                    </option>

                    <option value="10">
                      10 Attempts
                    </option>
                  </select>

                  <small>
                    Number of failed attempts before
                    temporarily blocking login.
                  </small>

                </div>

              </div>


              <div className="setting-list">

                <Toggle
                  title="Automatic Logout"
                  description="Automatically log users out after the configured session timeout."
                  checked={settings.autoLogout}
                  onChange={(value) =>
                    updateSetting(
                      "autoLogout",
                      value
                    )
                  }
                />

                <Toggle
                  title="Require Password Change"
                  description="Require users to change their password periodically."
                  checked={settings.requirePasswordChange}
                  onChange={(value) =>
                    updateSetting(
                      "requirePasswordChange",
                      value
                    )
                  }
                />

              </div>

            </div>

          </section>


          {/* ==================================
              POS BEHAVIOR
          ================================== */}

          <section className="system-card">

            <CardHeader
              icon={<Monitor size={14} />}
              title="POS Behavior"
              description="Configure how the POS handles common operations."
            />

            <div className="card-body">

              <Toggle
                title="Confirm Before Delete"
                description="Ask for confirmation before deleting products, customers or other records."
                checked={settings.confirmDelete}
                onChange={(value) =>
                  updateSetting(
                    "confirmDelete",
                    value
                  )
                }
              />

              <Toggle
                title="Confirm Sale"
                description="Require confirmation before completing a sale."
                checked={settings.confirmSale}
                onChange={(value) =>
                  updateSetting(
                    "confirmSale",
                    value
                  )
                }
              />

              <Toggle
                title="Allow Negative Stock"
                description="Allow products to be sold even when the available stock is zero."
                checked={settings.allowNegativeStock}
                onChange={(value) =>
                  updateSetting(
                    "allowNegativeStock",
                    value
                  )
                }
              />

              <Toggle
                title="Allow Duplicate Barcodes"
                description="Allow multiple products to use the same barcode."
                checked={settings.allowDuplicateBarcode}
                onChange={(value) =>
                  updateSetting(
                    "allowDuplicateBarcode",
                    value
                  )
                }
              />

            </div>

          </section>


          {/* ==================================
              NOTIFICATIONS
          ================================== */}

          <section className="system-card">

            <CardHeader
              icon={<Bell size={14} />}
              title="Notifications"
              description="Choose which system events should generate notifications."
            />

            <div className="card-body">

              <Toggle
                title="Low Stock Alerts"
                description="Notify administrators when products reach their minimum stock level."
                checked={settings.lowStockNotification}
                onChange={(value) =>
                  updateSetting(
                    "lowStockNotification",
                    value
                  )
                }
              />

              <Toggle
                title="Purchase Notifications"
                description="Notify administrators when a new purchase is created or received."
                checked={settings.purchaseNotification}
                onChange={(value) =>
                  updateSetting(
                    "purchaseNotification",
                    value
                  )
                }
              />

              <Toggle
                title="Sales Notifications"
                description="Generate notifications for completed sales."
                checked={settings.salesNotification}
                onChange={(value) =>
                  updateSetting(
                    "salesNotification",
                    value
                  )
                }
              />

              <Toggle
                title="Expense Notifications"
                description="Notify administrators when new expenses are recorded."
                checked={settings.expenseNotification}
                onChange={(value) =>
                  updateSetting(
                    "expenseNotification",
                    value
                  )
                }
              />

              <Toggle
                title="System Notifications"
                description="Show important system messages and maintenance notifications."
                checked={settings.systemNotification}
                onChange={(value) =>
                  updateSetting(
                    "systemNotification",
                    value
                  )
                }
              />

            </div>

          </section>


          {/* ==================================
              BACKUP
          ================================== */}

          <section className="system-card">

            <CardHeader
              icon={<DatabaseBackup size={14} />}
              title="Database Backup"
              description="Configure automatic backups of your POS database."
            />

            <div className="card-body">

              <Toggle
                title="Automatic Backup"
                description="Automatically create database backups according to the selected schedule."
                checked={settings.autoBackup}
                onChange={(value) =>
                  updateSetting(
                    "autoBackup",
                    value
                  )
                }
              />


              {settings.autoBackup && (
                <div className="backup-options">

                  <div className="form-grid">

                    <SelectField
                      label="Backup Frequency"
                      value={settings.backupFrequency}
                      onChange={(value) =>
                        updateSetting(
                          "backupFrequency",
                          value
                        )
                      }
                      options={[
                        ["Hourly", "Hourly"],
                        ["Daily", "Daily"],
                        ["Weekly", "Weekly"],
                      ]}
                    />

                    <SelectField
                      label="Keep Backups For"
                      value={settings.retainBackups}
                      onChange={(value) =>
                        updateSetting(
                          "retainBackups",
                          value
                        )
                      }
                      options={[
                        ["7", "7 Days"],
                        ["14", "14 Days"],
                        ["30", "30 Days"],
                        ["60", "60 Days"],
                        ["90", "90 Days"],
                      ]}
                    />

                  </div>

                  <div className="last-backup">

                    <div className="backup-status">
                      <Check size={11} />
                    </div>

                    <div>

                      <strong>
                        Last backup completed
                      </strong>

                      <span>
                        Today at 02:00 AM
                      </span>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="backup-button"
                    onClick={() =>
                      console.log(
                        "Create backup"
                      )
                    }
                  >
                    <DatabaseBackup size={12} />
                    Create Backup Now
                  </button>

                </div>
              )}

            </div>

          </section>


          {/* ==================================
              DANGER ZONE
          ================================== */}

          <section className="danger-card">

            <div className="danger-header">

              <div className="danger-icon">
                <Trash2 size={14} />
              </div>

              <div>

                <h2>
                  Maintenance
                </h2>

                <p>
                  Administrative system maintenance
                  operations.
                </p>

              </div>

            </div>

            <div className="danger-body">

              <div>

                <strong>
                  Clear Application Cache
                </strong>

                <span>
                  Remove cached application data.
                  This does not delete your sales,
                  products or customers.
                </span>

              </div>

              <button
                type="button"
                className="maintenance-button"
                onClick={() =>
                  alert(
                    "Application cache cleared."
                  )
                }
              >
                Clear Cache
              </button>

            </div>

          </section>


          {/* ==================================
              BOTTOM ACTIONS
          ================================== */}

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
            SIDE SUMMARY
        =================================== */}

        <aside className="system-sidebar">

          <div className="summary-card">

            <div className="summary-icon">
              <Settings size={16} />
            </div>

            <h2>
              System Configuration
            </h2>

            <p>
              These settings affect the entire
              POS application and may apply to
              all branches and users.
            </p>


            <div className="summary-list">

              <SummaryItem
                icon={<Clock3 size={11} />}
                label="Timezone"
                value="Lagos (UTC+1)"
              />

              <SummaryItem
                icon={<Hash size={11} />}
                label="Currency"
                value="NGN ₦"
              />

              <SummaryItem
                icon={<ShieldCheck size={11} />}
                label="Session"
                value={`${settings.sessionTimeout} min`}
              />

              <SummaryItem
                icon={<DatabaseBackup size={11} />}
                label="Backup"
                value={
                  settings.autoBackup
                    ? settings.backupFrequency
                    : "Disabled"
                }
              />

            </div>

          </div>


          <div className="tip-card">

            <div className="tip-icon">
              <InfoIcon />
            </div>

            <div>

              <h3>
                Important
              </h3>

              <p>
                System settings should normally
                be changed only by a user with
                administrator permissions.
              </p>

            </div>

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
   SELECT
========================================== */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="form-field">

      <label>
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        {options.map(([optionValue, label]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {label}
          </option>
        ))}
      </select>

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
    <div className="system-toggle">

      <div className="toggle-info">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <button
        type="button"
        aria-pressed={checked}
        className={
          checked
            ? "switch active"
            : "switch"
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
   SUMMARY ITEM
========================================== */

function SummaryItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="summary-item">

      <div className="summary-item-icon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}


/* ==========================================
   INFO ICON
========================================== */

function InfoIcon() {
  return (
    <span className="info-i">
      i
    </span>
  );
}

