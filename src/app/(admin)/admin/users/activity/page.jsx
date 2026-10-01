
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
  Pencil,
  Trash2,
  LogIn,
  LogOut,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  RotateCcw,
  ArrowRightLeft,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

import "./activity.css";

const activities = [
  {
    id: 1,
    user: "John Admin",
    initials: "JA",
    role: "Administrator",
    action: "Created",
    module: "Product",
    description: "Created a new product",
    reference: "PRD-000245",
    details: "Coca Cola 50cl",
    date: "Aug 29, 2026",
    time: "03:42 AM",
    type: "create",
  },
  {
    id: 2,
    user: "Michael Cashier",
    initials: "MC",
    role: "Cashier",
    action: "Completed",
    module: "Sale",
    description: "Completed a new sale",
    reference: "SALE-008421",
    details: "₦24,500.00",
    date: "Aug 29, 2026",
    time: "03:35 AM",
    type: "sale",
  },
  {
    id: 3,
    user: "Sarah Manager",
    initials: "SM",
    role: "Manager",
    action: "Updated",
    module: "Product",
    description: "Updated product information",
    reference: "PRD-000218",
    details: "Peak Milk 400g",
    date: "Aug 29, 2026",
    time: "03:21 AM",
    type: "update",
  },
  {
    id: 4,
    user: "John Admin",
    initials: "JA",
    role: "Administrator",
    action: "Adjusted",
    module: "Inventory",
    description: "Adjusted stock quantity",
    reference: "ADJ-000091",
    details: "+25 units",
    date: "Aug 29, 2026",
    time: "02:58 AM",
    type: "inventory",
  },
  {
    id: 5,
    user: "David Cashier",
    initials: "DC",
    role: "Cashier",
    action: "Logged In",
    module: "Authentication",
    description: "User logged into the system",
    reference: "SESSION-91A2",
    details: "POS Terminal 03",
    date: "Aug 29, 2026",
    time: "02:44 AM",
    type: "login",
  },
  {
    id: 6,
    user: "Sarah Manager",
    initials: "SM",
    role: "Manager",
    action: "Created",
    module: "Purchase",
    description: "Created a purchase order",
    reference: "PO-000341",
    details: "₦185,000.00",
    date: "Aug 29, 2026",
    time: "02:30 AM",
    type: "purchase",
  },
  {
    id: 7,
    user: "John Admin",
    initials: "JA",
    role: "Administrator",
    action: "Created",
    module: "User",
    description: "Created a new user",
    reference: "USR-000087",
    details: "Peter Okafor",
    date: "Aug 29, 2026",
    time: "02:12 AM",
    type: "user",
  },
  {
    id: 8,
    user: "Michael Cashier",
    initials: "MC",
    role: "Cashier",
    action: "Returned",
    module: "Sale",
    description: "Processed a sales return",
    reference: "RET-000038",
    details: "₦8,500.00",
    date: "Aug 29, 2026",
    time: "01:55 AM",
    type: "return",
  },
  {
    id: 9,
    user: "David Cashier",
    initials: "DC",
    role: "Cashier",
    action: "Logged Out",
    module: "Authentication",
    description: "User logged out of the system",
    reference: "SESSION-88B1",
    details: "POS Terminal 03",
    date: "Aug 29, 2026",
    time: "01:42 AM",
    type: "logout",
  },
  {
    id: 10,
    user: "John Admin",
    initials: "JA",
    role: "Administrator",
    action: "Updated",
    module: "Settings",
    description: "Updated business settings",
    reference: "SET-000012",
    details: "Business information",
    date: "Aug 28, 2026",
    time: "11:24 PM",
    type: "settings",
  },
  {
    id: 11,
    user: "Sarah Manager",
    initials: "SM",
    role: "Manager",
    action: "Transferred",
    module: "Inventory",
    description: "Transferred stock between locations",
    reference: "TRF-000042",
    details: "35 units",
    date: "Aug 28, 2026",
    time: "10:51 PM",
    type: "transfer",
  },
  {
    id: 12,
    user: "John Admin",
    initials: "JA",
    role: "Administrator",
    action: "Deleted",
    module: "Customer",
    description: "Deleted a customer record",
    reference: "CUS-000164",
    details: "Customer account",
    date: "Aug 28, 2026",
    time: "09:17 PM",
    type: "delete",
  },
];

const moduleOptions = [
  "All Modules",
  "Sale",
  "Product",
  "Inventory",
  "Purchase",
  "Customer",
  "User",
  "Authentication",
  "Settings",
];

const actionOptions = [
  "All Actions",
  "Created",
  "Updated",
  "Deleted",
  "Completed",
  "Adjusted",
  "Returned",
  "Transferred",
  "Logged In",
  "Logged Out",
];

function ActivityIcon({ type }) {
  const icons = {
    create: <Plus size={13} />,
    update: <Pencil size={13} />,
    delete: <Trash2 size={13} />,
    sale: <ShoppingCart size={13} />,
    inventory: <Package size={13} />,
    login: <LogIn size={13} />,
    logout: <LogOut size={13} />,
    purchase: <CreditCard size={13} />,
    user: <Users size={13} />,
    return: <RotateCcw size={13} />,
    transfer: <ArrowRightLeft size={13} />,
    settings: <Settings size={13} />,
  };

  return (
    <div className={`activity-icon ${type}`}>
      {icons[type] || <Eye size={13} />}
    </div>
  );
}

export default function ActivityPage() {
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("All Modules");
  const [action, setAction] = useState("All Actions");
  const [dateFilter, setDateFilter] = useState("Today");

  const [selectedActivity, setSelectedActivity] =
    useState(null);

  const [showFilters, setShowFilters] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.user.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.reference.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query);

      const matchesModule =
        module === "All Modules" ||
        item.module === module;

      const matchesAction =
        action === "All Actions" ||
        item.action === action;

      return (
        matchesSearch &&
        matchesModule &&
        matchesAction
      );
    });
  }, [search, module, action]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredActivities.length / itemsPerPage
    )
  );

  const visibleActivities =
    filteredActivities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const todayCount = activities.filter(
    (item) => item.date === "Aug 29, 2026"
  ).length;

  const salesCount = activities.filter(
    (item) => item.module === "Sale"
  ).length;

  const userActions = activities.filter(
    (item) =>
      item.module === "User" ||
      item.module === "Authentication"
  ).length;

  const inventoryActions = activities.filter(
    (item) => item.module === "Inventory"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setModule("All Modules");
    setAction("All Actions");
    setDateFilter("Today");
    setCurrentPage(1);
  };

  return (
    <div className="activity-page content-wrapper">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="activity-header">

        <div>
          <div className="activity-breadcrumb">
            Admin
            <span>/</span>
            Activity
          </div>

          <h1>Activity Log</h1>

          <p>
            Monitor user actions and system
            activity across your POS.
          </p>
        </div>

        <button className="export-btn">
          <Download size={13} />
          Export Log
        </button>

      </div>


      {/* ======================================
          STAT CARDS
      ====================================== */}

      <div className="activity-stats">

        <Stat
          icon={<ShieldCheck size={15} />}
          label="Total Activities"
          value={activities.length}
          detail="All recorded actions"
          type="blue"
        />

        <Stat
          icon={<RefreshCw size={15} />}
          label="Today's Activity"
          value={todayCount}
          detail="Actions today"
          type="green"
        />

        <Stat
          icon={<ShoppingCart size={15} />}
          label="Sales Activity"
          value={salesCount}
          detail="Sales transactions"
          type="purple"
        />

        <Stat
          icon={<Package size={15} />}
          label="Inventory Actions"
          value={inventoryActions}
          detail="Stock operations"
          type="orange"
        />

      </div>


      {/* ======================================
          ACTIVITY CARD
      ====================================== */}

      <div className="activity-card">

        {/* TOOLBAR */}

        <div className="activity-toolbar">

          <div className="activity-search">

            <Search size={13} />

            <input
              type="text"
              placeholder="Search activity..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

          </div>


          <div className="activity-toolbar-right">

            <div className="date-select">

              <select
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>All Time</option>
              </select>

              <ChevronDown size={11} />

            </div>


            <button
              className={
                showFilters
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setShowFilters(!showFilters)
              }
            >
              <Filter size={12} />
              Filters
            </button>


            <button
              className="refresh-btn"
              onClick={() =>
                setCurrentPage(1)
              }
            >
              <RefreshCw size={12} />
            </button>

          </div>

        </div>


        {/* ====================================
            FILTER PANEL
        ==================================== */}

        {showFilters && (
          <div className="filter-panel">

            <div className="filter-field">

              <label>
                Module
              </label>

              <div className="filter-control">

                <select
                  value={module}
                  onChange={(e) => {
                    setModule(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {moduleOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown size={10} />

              </div>

            </div>


            <div className="filter-field">

              <label>
                Action
              </label>

              <div className="filter-control">

                <select
                  value={action}
                  onChange={(e) => {
                    setAction(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {actionOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown size={10} />

              </div>

            </div>


            <button
              className="clear-filter"
              onClick={resetFilters}
            >
              <X size={11} />
              Clear Filters
            </button>

          </div>
        )}


        {/* ====================================
            TABLE
        ==================================== */}

        <div className="activity-table-wrapper">

          <table className="activity-table">

            <thead>
              <tr>

                <th>
                  USER
                </th>

                <th>
                  ACTIVITY
                </th>

                <th>
                  MODULE
                </th>

                <th>
                  REFERENCE
                </th>

                <th>
                  DATE & TIME
                </th>

                <th>
                  ACTION
                </th>

              </tr>
            </thead>


            <tbody>

              {visibleActivities.length > 0 ? (
                visibleActivities.map(
                  (item) => (
                    <tr key={item.id}>

                      {/* USER */}

                      <td>

                        <div className="activity-user">

                          <div className="user-avatar">
                            {item.initials}
                          </div>

                          <div>

                            <strong>
                              {item.user}
                            </strong>

                            <span>
                              {item.role}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* ACTIVITY */}

                      <td>

                        <div className="activity-description">

                          <ActivityIcon
                            type={item.type}
                          />

                          <div>

                            <strong>
                              {item.description}
                            </strong>

                            <span>
                              {item.details}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* MODULE */}

                      <td>

                        <span className="module-badge">
                          {item.module}
                        </span>

                      </td>


                      {/* REFERENCE */}

                      <td>

                        <span className="reference">
                          {item.reference}
                        </span>

                      </td>


                      {/* DATE */}

                      <td>

                        <div className="activity-date">

                          <strong>
                            {item.date}
                          </strong>

                          <span>
                            {item.time}
                          </span>

                        </div>

                      </td>


                      {/* ACTION */}

                      <td>

                        <button
                          className="view-btn"
                          onClick={() =>
                            setSelectedActivity(
                              item
                            )
                          }
                        >
                          <Eye size={11} />
                          View
                        </button>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-activity"
                  >
                    <ShieldCheck size={24} />

                    <strong>
                      No activities found
                    </strong>

                    <span>
                      Try changing your filters
                      or search query.
                    </span>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>


        {/* ====================================
            FOOTER
        ==================================== */}

        <div className="activity-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredActivities.length === 0
                ? 0
                : (currentPage - 1) *
                    itemsPerPage +
                  1}
            </strong>
            {" - "}
            <strong>
              {Math.min(
                currentPage * itemsPerPage,
                filteredActivities.length
              )}
            </strong>
            {" of "}
            <strong>
              {filteredActivities.length}
            </strong>
            {" activities"}
          </span>


          <div className="pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  Math.max(1, currentPage - 1)
                )
              }
            >
              <ChevronLeft size={12} />
            </button>


            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .slice(0, 5)
              .map((page) => (
                <button
                  key={page}
                  className={
                    page === currentPage
                      ? "current"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}


            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  Math.min(
                    totalPages,
                    currentPage + 1
                  )
                )
              }
            >
              <ChevronRight size={12} />
            </button>

          </div>

        </div>

      </div>


      {/* ======================================
          ACTIVITY DETAILS MODAL
      ====================================== */}

      {selectedActivity && (
        <div
          className="activity-modal-overlay"
          onClick={() =>
            setSelectedActivity(null)
          }
        >

          <div
            className="activity-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-top">

              <div>

                <div className="modal-icon">
                  <ActivityIcon
                    type={
                      selectedActivity.type
                    }
                  />
                </div>

                <div>

                  <h2>
                    Activity Details
                  </h2>

                  <p>
                    {selectedActivity.reference}
                  </p>

                </div>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedActivity(null)
                }
              >
                <X size={14} />
              </button>

            </div>


            <div className="detail-grid">

              <Detail
                label="User"
                value={
                  selectedActivity.user
                }
              />

              <Detail
                label="Role"
                value={
                  selectedActivity.role
                }
              />

              <Detail
                label="Action"
                value={
                  selectedActivity.action
                }
              />

              <Detail
                label="Module"
                value={
                  selectedActivity.module
                }
              />

              <Detail
                label="Reference"
                value={
                  selectedActivity.reference
                }
              />

              <Detail
                label="Date"
                value={
                  selectedActivity.date
                }
              />

              <Detail
                label="Time"
                value={
                  selectedActivity.time
                }
              />

              <Detail
                label="Details"
                value={
                  selectedActivity.details
                }
              />

            </div>


            <div className="modal-description">

              <span>
                ACTIVITY
              </span>

              <p>
                {selectedActivity.description}
              </p>

            </div>


            <div className="modal-footer">

              <button
                onClick={() =>
                  setSelectedActivity(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* ==========================================
   STAT
========================================== */

function Stat({
  icon,
  label,
  value,
  detail,
  type,
}) {
  return (
    <div className="activity-stat">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {detail}
        </small>

      </div>

    </div>
  );
}


/* ==========================================
   DETAIL
========================================== */

function Detail({ label, value }) {
  return (
    <div className="detail-item">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}

