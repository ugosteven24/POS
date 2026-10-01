
"use client";

import { useState } from "react";
import {
  Settings,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe2,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Clock3,
  CalendarDays,
  Hash,
  CheckCircle2,
} from "lucide-react";

import "./general.css";

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState({
    businessName: "My POS Store",
    businessEmail: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
    currency: "NGN",
    currencyPosition: "Before",
    timezone: "Africa/Lagos",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-hour",
    decimalPlaces: "2",
    invoicePrefix: "INV-",
    receiptPrefix: "REC-",
    enableNotifications: true,
    enableLowStockAlert: true,
  });

  const [logo, setLogo] = useState(null);
  const [saved, setSaved] = useState(false);

  const updateSetting = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogo(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("General settings:", settings);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const resetSettings = () => {
    setSettings({
      businessName: "My POS Store",
      businessEmail: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      country: "Nigeria",
      postalCode: "",
      currency: "NGN",
      currencyPosition: "Before",
      timezone: "Africa/Lagos",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "12-hour",
      decimalPlaces: "2",
      invoicePrefix: "INV-",
      receiptPrefix: "REC-",
      enableNotifications: true,
      enableLowStockAlert: true,
    });

    setLogo(null);
  };

  return (
    <div className="general-settings-page content-wrapper">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="settings-header">

        <div className="settings-header-icon">
          <Settings size={16} />
        </div>

        <div>
          <div className="settings-breadcrumb">
            Settings
            <span>/</span>
            General
          </div>

          <h1>General Settings</h1>

          <p>
            Configure your business information and
            application defaults.
          </p>
        </div>

      </div>


      {/* ======================================
          SUCCESS ALERT
      ====================================== */}

      {saved && (
        <div className="settings-success">

          <CheckCircle2 size={14} />

          <div>
            <strong>Settings saved successfully</strong>
            <span>
              Your general settings have been updated.
            </span>
          </div>

        </div>
      )}


      <form onSubmit={handleSubmit}>

        <div className="settings-layout">

          {/* ====================================
              MAIN CONTENT
          ==================================== */}

          <main className="settings-main">

            {/* BUSINESS PROFILE */}

            <SettingsSection
              icon={<Building2 size={14} />}
              title="Business Information"
              description="Basic information about your business."
            >

              <div className="settings-grid">

                <SettingField
                  label="Business Name"
                  required
                >
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) =>
                      updateSetting(
                        "businessName",
                        e.target.value
                      )
                    }
                    placeholder="Enter business name"
                  />
                </SettingField>


                <SettingField label="Business Email">

                  <div className="field-icon">
                    <Mail size={12} />

                    <input
                      type="email"
                      value={settings.businessEmail}
                      onChange={(e) =>
                        updateSetting(
                          "businessEmail",
                          e.target.value
                        )
                      }
                      placeholder="business@example.com"
                    />
                  </div>

                </SettingField>


                <SettingField label="Phone Number">

                  <div className="field-icon">
                    <Phone size={12} />

                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) =>
                        updateSetting(
                          "phone",
                          e.target.value
                        )
                      }
                      placeholder="+234 800 000 0000"
                    />
                  </div>

                </SettingField>


                <SettingField label="Website">

                  <div className="field-icon">
                    <Globe2 size={12} />

                    <input
                      type="text"
                      value={settings.website}
                      onChange={(e) =>
                        updateSetting(
                          "website",
                          e.target.value
                        )
                      }
                      placeholder="www.example.com"
                    />
                  </div>

                </SettingField>

              </div>

            </SettingsSection>


            {/* LOGO */}

            <SettingsSection
              icon={<ImageIcon size={14} />}
              title="Business Logo"
              description="Upload the logo used throughout your POS system."
            >

              <div className="logo-upload-area">

                <div className="logo-preview">

                  {logo ? (
                    <img
                      src={logo}
                      alt="Business logo"
                    />
                  ) : (
                    <Building2 size={25} />
                  )}

                </div>

                <div className="logo-info">

                  <strong>
                    Business Logo
                  </strong>

                  <p>
                    Recommended size: 300 × 300px.
                    JPG, PNG or WebP.
                  </p>

                  <label className="upload-btn">

                    <Upload size={11} />

                    Upload Logo

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleLogoChange}
                    />

                  </label>

                </div>

              </div>

            </SettingsSection>


            {/* ADDRESS */}

            <SettingsSection
              icon={<MapPin size={14} />}
              title="Business Address"
              description="Address displayed on receipts and invoices."
            >

              <div className="settings-grid">

                <SettingField
                  label="Street Address"
                  full
                >
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) =>
                      updateSetting(
                        "address",
                        e.target.value
                      )
                    }
                    placeholder="Enter business address"
                  />
                </SettingField>


                <SettingField label="City">

                  <input
                    type="text"
                    value={settings.city}
                    onChange={(e) =>
                      updateSetting(
                        "city",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Benin City"
                  />

                </SettingField>


                <SettingField label="State">

                  <input
                    type="text"
                    value={settings.state}
                    onChange={(e) =>
                      updateSetting(
                        "state",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Edo"
                  />

                </SettingField>


                <SettingField label="Country">

                  <select
                    value={settings.country}
                    onChange={(e) =>
                      updateSetting(
                        "country",
                        e.target.value
                      )
                    }
                  >
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>Kenya</option>
                    <option>South Africa</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>

                </SettingField>


                <SettingField label="Postal Code">

                  <input
                    type="text"
                    value={settings.postalCode}
                    onChange={(e) =>
                      updateSetting(
                        "postalCode",
                        e.target.value
                      )
                    }
                    placeholder="Enter postal code"
                  />

                </SettingField>

              </div>

            </SettingsSection>


            {/* REGIONAL */}

            <SettingsSection
              icon={<Globe2 size={14} />}
              title="Regional Settings"
              description="Configure currency, timezone and formatting."
            >

              <div className="settings-grid">

                <SettingField label="Currency">

                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      updateSetting(
                        "currency",
                        e.target.value
                      )
                    }
                  >
                    <option value="NGN">
                      Nigerian Naira (₦)
                    </option>

                    <option value="GHS">
                      Ghanaian Cedi (₵)
                    </option>

                    <option value="KES">
                      Kenyan Shilling (KSh)
                    </option>

                    <option value="USD">
                      US Dollar ($)
                    </option>

                    <option value="GBP">
                      British Pound (£)
                    </option>
                  </select>

                </SettingField>


                <SettingField label="Currency Position">

                  <select
                    value={settings.currencyPosition}
                    onChange={(e) =>
                      updateSetting(
                        "currencyPosition",
                        e.target.value
                      )
                    }
                  >
                    <option value="Before">
                      Before amount — ₦1,000
                    </option>

                    <option value="After">
                      After amount — 1,000 ₦
                    </option>
                  </select>

                </SettingField>


                <SettingField label="Timezone">

                  <div className="field-icon">

                    <Clock3 size={12} />

                    <select
                      value={settings.timezone}
                      onChange={(e) =>
                        updateSetting(
                          "timezone",
                          e.target.value
                        )
                      }
                    >
                      <option value="Africa/Lagos">
                        Africa/Lagos
                      </option>

                      <option value="Africa/Accra">
                        Africa/Accra
                      </option>

                      <option value="Africa/Nairobi">
                        Africa/Nairobi
                      </option>

                      <option value="Europe/London">
                        Europe/London
                      </option>

                      <option value="America/New_York">
                        America/New_York
                      </option>
                    </select>

                  </div>

                </SettingField>


                <SettingField label="Date Format">

                  <div className="field-icon">

                    <CalendarDays size={12} />

                    <select
                      value={settings.dateFormat}
                      onChange={(e) =>
                        updateSetting(
                          "dateFormat",
                          e.target.value
                        )
                      }
                    >
                      <option>
                        DD/MM/YYYY
                      </option>

                      <option>
                        MM/DD/YYYY
                      </option>

                      <option>
                        YYYY-MM-DD
                      </option>
                    </select>

                  </div>

                </SettingField>


                <SettingField label="Time Format">

                  <select
                    value={settings.timeFormat}
                    onChange={(e) =>
                      updateSetting(
                        "timeFormat",
                        e.target.value
                      )
                    }
                  >
                    <option value="12-hour">
                      12-hour
                    </option>

                    <option value="24-hour">
                      24-hour
                    </option>
                  </select>

                </SettingField>


                <SettingField label="Decimal Places">

                  <select
                    value={settings.decimalPlaces}
                    onChange={(e) =>
                      updateSetting(
                        "decimalPlaces",
                        e.target.value
                      )
                    }
                  >
                    <option value="0">
                      0 — ₦1,000
                    </option>

                    <option value="2">
                      2 — ₦1,000.00
                    </option>

                    <option value="3">
                      3 — ₦1,000.000
                    </option>
                  </select>

                </SettingField>

              </div>

            </SettingsSection>


            {/* DOCUMENT NUMBERING */}

            <SettingsSection
              icon={<Hash size={14} />}
              title="Document Numbering"
              description="Configure prefixes used for business documents."
            >

              <div className="settings-grid">

                <SettingField label="Invoice Prefix">

                  <input
                    type="text"
                    value={settings.invoicePrefix}
                    onChange={(e) =>
                      updateSetting(
                        "invoicePrefix",
                        e.target.value
                      )
                    }
                    placeholder="INV-"
                  />

                </SettingField>


                <SettingField label="Receipt Prefix">

                  <input
                    type="text"
                    value={settings.receiptPrefix}
                    onChange={(e) =>
                      updateSetting(
                        "receiptPrefix",
                        e.target.value
                      )
                    }
                    placeholder="REC-"
                  />

                </SettingField>

              </div>

            </SettingsSection>


            {/* SYSTEM PREFERENCES */}

            <SettingsSection
              icon={<Settings size={14} />}
              title="System Preferences"
              description="Control general POS behaviour."
            >

              <ToggleSetting
                title="System Notifications"
                description="Allow the POS to display system notifications."
                checked={settings.enableNotifications}
                onChange={(value) =>
                  updateSetting(
                    "enableNotifications",
                    value
                  )
                }
              />


              <ToggleSetting
                title="Low Stock Alerts"
                description="Notify administrators when products reach their minimum stock level."
                checked={settings.enableLowStockAlert}
                onChange={(value) =>
                  updateSetting(
                    "enableLowStockAlert",
                    value
                  )
                }
              />

            </SettingsSection>

          </main>


          {/* ====================================
              SIDEBAR
          ==================================== */}

          <aside className="settings-sidebar">

            <div className="sidebar-card">

              <div className="sidebar-heading">
                <Settings size={13} />

                <div>
                  <strong>
                    General Settings
                  </strong>

                  <span>
                    Store configuration
                  </span>
                </div>
              </div>


              <div className="settings-nav">

                <div className="settings-nav-item active">
                  <Building2 size={12} />
                  General
                </div>

                <div className="settings-nav-item">
                  <ImageIcon size={12} />
                  Branding
                </div>

                <div className="settings-nav-item">
                  <Hash size={12} />
                  Numbering
                </div>

                <div className="settings-nav-item">
                  <Globe2 size={12} />
                  Regional
                </div>

              </div>

            </div>


            {/* CURRENT STORE */}

            <div className="store-card">

              <span className="store-label">
                CURRENT BUSINESS
              </span>

              <div className="store-name">
                <div className="store-logo">

                  {logo ? (
                    <img
                      src={logo}
                      alt=""
                    />
                  ) : (
                    <Building2 size={15} />
                  )}

                </div>

                <div>
                  <strong>
                    {settings.businessName ||
                      "My POS Store"}
                  </strong>

                  <span>
                    {settings.city &&
                    settings.state
                      ? `${settings.city}, ${settings.state}`
                      : "Location not set"}
                  </span>
                </div>

              </div>

            </div>

          </aside>

        </div>


        {/* ======================================
            ACTION BAR
        ====================================== */}

        <div className="settings-actions">

          <button
            type="button"
            className="reset-settings"
            onClick={resetSettings}
          >
            <RotateCcw size={12} />
            Reset
          </button>

          <button
            type="submit"
            className="save-settings"
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

      <div className="section-heading">

        <div className="section-heading-icon">
          {icon}
        </div>

        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

      </div>

      <div className="section-body">
        {children}
      </div>

    </section>
  );
}


/* ==========================================
   FIELD
========================================== */

function SettingField({
  label,
  required,
  full,
  children,
}) {
  return (
    <div
      className={`setting-field ${
        full ? "field-full" : ""
      }`}
    >

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

function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="toggle-setting">

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
        className={`toggle ${
          checked ? "on" : ""
        }`}
        onClick={() =>
          onChange(!checked)
        }
        aria-label={title}
      >
        <span />
      </button>

    </div>
  );
}

