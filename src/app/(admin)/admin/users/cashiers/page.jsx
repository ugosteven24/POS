
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  RefreshCw,
  Filter,
  UserCheck,
  UserX,
  Monitor,
  Clock3,
  MoreHorizontal,
  Eye,
  Pencil,
  Lock,
  Unlock,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Banknote,
  Activity,
} from "lucide-react";

import "./cashiers.css";
import Link from "next/link";

const initialCashiers = [
  {
    id: 1,
    name: "David Okoro",
    email: "david.okoro@example.com",
    phone: "+234 803 421 9821",
    register: "Register 01",
    shift: "Morning",
    status: "Active",
    shiftStatus: "On Shift",
    sales: 184,
    transactions: 62,
    amount: 1845200,
    lastLogin: "Today, 09:42 AM",
    joined: "Jan 12, 2026",
    avatar: "DO",
  },
  {
    id: 2,
    name: "Grace Eze",
    email: "grace.eze@example.com",
    phone: "+234 806 315 4720",
    register: "Register 02",
    shift: "Morning",
    status: "Active",
    shiftStatus: "On Shift",
    sales: 156,
    transactions: 49,
    amount: 1568400,
    lastLogin: "Today, 08:15 AM",
    joined: "Jan 18, 2026",
    avatar: "GE",
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+234 809 524 6318",
    register: "Register 03",
    shift: "Evening",
    status: "Active",
    shiftStatus: "Off Shift",
    sales: 142,
    transactions: 43,
    amount: 1296300,
    lastLogin: "Yesterday, 06:31 PM",
    joined: "Feb 14, 2026",
    avatar: "SW",
  },
  {
    id: 4,
    name: "John Peters",
    email: "john.peters@example.com",
    phone: "+234 814 231 9087",
    register: "Register 04",
    shift: "Morning",
    status: "Inactive",
    shiftStatus: "Off Shift",
    sales: 98,
    transactions: 31,
    amount: 894500,
    lastLogin: "Aug 25, 2026",
    joined: "Mar 01, 2026",
    avatar: "JP",
  },
  {
    id: 5,
    name: "Emmanuel Ade",
    email: "emmanuel.ade@example.com",
    phone: "+234 816 439 2710",
    register: "Register 05",
    shift: "Evening",
    status: "Active",
    shiftStatus: "On Shift",
    sales: 167,
    transactions: 57,
    amount: 1624300,
    lastLogin: "Today, 08:47 AM",
    joined: "Mar 19, 2026",
    avatar: "EA",
  },
  {
    id: 6,
    name: "Robert Kings",
    email: "robert.kings@example.com",
    phone: "+234 813 526 8014",
    register: "Register 06",
    shift: "Morning",
    status: "Active",
    shiftStatus: "On Shift",
    sales: 121,
    transactions: 39,
    amount: 1128500,
    lastLogin: "Today, 07:22 AM",
    joined: "Apr 15, 2026",
    avatar: "RK",
  },
  {
    id: 7,
    name: "Daniel Obi",
    email: "daniel.obi@example.com",
    phone: "+234 805 718 2045",
    register: "Register 07",
    shift: "Evening",
    status: "Active",
    shiftStatus: "Off Shift",
    sales: 133,
    transactions: 41,
    amount: 1267100,
    lastLogin: "Yesterday, 09:04 PM",
    joined: "May 02, 2026",
    avatar: "DO",
  },
  {
    id: 8,
    name: "Peter James",
    email: "peter.james@example.com",
    phone: "+234 802 517 9041",
    register: "Unassigned",
    shift: "Morning",
    status: "Inactive",
    shiftStatus: "Off Shift",
    sales: 76,
    transactions: 24,
    amount: 674300,
    lastLogin: "Aug 18, 2026",
    joined: "May 18, 2026",
    avatar: "PJ",
  },
];

export default function CashiersPage() {
  const [cashiers, setCashiers] = useState(initialCashiers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [register, setRegister] = useState("All Registers");
  const [shift, setShift] = useState("All Shifts");

  const [openMenu, setOpenMenu] = useState(null);

  const [selectedCashiers, setSelectedCashiers] =
    useState([]);

  const filteredCashiers = useMemo(() => {
    return cashiers.filter((cashier) => {
      const searchable =
        `${cashier.name} ${cashier.email} ${cashier.phone} ${cashier.register}`
          .toLowerCase();

      const matchesSearch = searchable.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        status === "All Status" ||
        cashier.status === status;

      const matchesRegister =
        register === "All Registers" ||
        cashier.register === register;

      const matchesShift =
        shift === "All Shifts" ||
        cashier.shift === shift;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRegister &&
        matchesShift
      );
    });
  }, [cashiers, search, status, register, shift]);

  const totalCashiers = cashiers.length;

  const activeCashiers = cashiers.filter(
    (cashier) => cashier.status === "Active"
  ).length;

  const onShift = cashiers.filter(
    (cashier) => cashier.shiftStatus === "On Shift"
  ).length;

  const totalSales = cashiers.reduce(
    (sum, cashier) => sum + cashier.amount,
    0
  );

  const totalTransactions = cashiers.reduce(
    (sum, cashier) => sum + cashier.transactions,
    0
  );

  const formatCurrency = (value) => {
    return `₦${value.toLocaleString("en-NG")}`;
  };

  const toggleStatus = (id) => {
    setCashiers((current) =>
      current.map((cashier) =>
        cashier.id === id
          ? {
              ...cashier,
              status:
                cashier.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : cashier
      )
    );

    setOpenMenu(null);
  };

  const toggleSelect = (id) => {
    setSelectedCashiers((current) =>
      current.includes(id)
        ? current.filter(
            (cashierId) => cashierId !== id
          )
        : [...current, id]
    );
  };

  const toggleSelectAll = () => {
    if (
      selectedCashiers.length ===
      filteredCashiers.length
    ) {
      setSelectedCashiers([]);
    } else {
      setSelectedCashiers(
        filteredCashiers.map(
          (cashier) => cashier.id
        )
      );
    }
  };

  const deleteCashier = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cashier?"
    );

    if (!confirmed) return;

    setCashiers((current) =>
      current.filter(
        (cashier) => cashier.id !== id
      )
    );

    setSelectedCashiers((current) =>
      current.filter(
        (cashierId) => cashierId !== id
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="cashiers-page content-wrapper">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="cashiers-page-header">

        <div>
          <h1>Cashiers</h1>

          <p>
            Manage cashier accounts, registers,
            shifts and sales activity.
          </p>
        </div>

        <div className="cashiers-header-actions">

          <button className="cashiers-secondary-btn">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="cashiers-secondary-btn">
            <Download size={13} />
            Export
          </button>

          <Link className="cashiers-primary-btn" href="/admin/users/cashiers/add">
            <Plus size={14} />
            Add Cashier
          </Link>

        </div>

      </div>


      {/* =========================================
          SUMMARY
      ========================================= */}

      <div className="cashiers-summary-grid">

        <div className="cashier-summary-card">

          <div className="cashier-summary-icon blue">
            <UserCheck size={17} />
          </div>

          <div>
            <span>TOTAL CASHIERS</span>

            <strong>
              {totalCashiers}
            </strong>

            <small>
              Registered cashier accounts
            </small>
          </div>

        </div>


        <div className="cashier-summary-card">

          <div className="cashier-summary-icon green">
            <Activity size={17} />
          </div>

          <div>
            <span>ACTIVE CASHIERS</span>

            <strong>
              {activeCashiers}
            </strong>

            <small className="green-text">
              {totalCashiers
                ? Math.round(
                    (activeCashiers /
                      totalCashiers) *
                      100
                  )
                : 0}
              % active
            </small>
          </div>

        </div>


        <div className="cashier-summary-card">

          <div className="cashier-summary-icon orange">
            <Clock3 size={17} />
          </div>

          <div>
            <span>ON SHIFT</span>

            <strong>
              {onShift}
            </strong>

            <small>
              Currently working
            </small>
          </div>

        </div>


        <div className="cashier-summary-card">

          <div className="cashier-summary-icon purple">
            <Banknote size={17} />
          </div>

          <div>
            <span>TOTAL SALES</span>

            <strong className="sales-total">
              {formatCurrency(totalSales)}
            </strong>

            <small>
              Current period
            </small>
          </div>

        </div>

      </div>


      {/* =========================================
          ACTIVITY STRIP
      ========================================= */}

      <div className="cashier-activity-strip">

        <div className="cashier-activity-item">

          <ShoppingCart size={14} />

          <div>
            <span>Transactions</span>
            <strong>
              {totalTransactions.toLocaleString()}
            </strong>
          </div>

        </div>


        <div className="cashier-activity-divider" />


        <div className="cashier-activity-item">

          <Monitor size={14} />

          <div>
            <span>Registers in use</span>

            <strong>
              {onShift}
            </strong>
          </div>

        </div>


        <div className="cashier-activity-divider" />


        <div className="cashier-activity-item">

          <Activity size={14} />

          <div>
            <span>Average per cashier</span>

            <strong>
              {formatCurrency(
                totalCashiers
                  ? Math.round(
                      totalSales /
                        totalCashiers
                    )
                  : 0
              )}
            </strong>
          </div>

        </div>

      </div>


      {/* =========================================
          FILTERS
      ========================================= */}

      <div className="cashiers-filter-card">

        <div className="cashiers-filter-heading">

          <div className="cashiers-filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Filter Cashiers</strong>

            <span>
              Find cashiers by account, register
              or shift.
            </span>
          </div>

        </div>


        <div className="cashiers-filter-controls">

          {/* SEARCH */}

          <div className="cashiers-search">

            <Search size={13} />

            <input
              type="text"
              placeholder="Search cashier..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* REGISTER */}

          <div className="cashiers-select">

            <Monitor size={12} />

            <select
              value={register}
              onChange={(e) =>
                setRegister(e.target.value)
              }
            >
              <option>All Registers</option>
              <option>Register 01</option>
              <option>Register 02</option>
              <option>Register 03</option>
              <option>Register 04</option>
              <option>Register 05</option>
              <option>Register 06</option>
              <option>Register 07</option>
            </select>

            <ChevronDown size={11} />

          </div>


          {/* SHIFT */}

          <div className="cashiers-select">

            <Clock3 size={12} />

            <select
              value={shift}
              onChange={(e) =>
                setShift(e.target.value)
              }
            >
              <option>All Shifts</option>
              <option>Morning</option>
              <option>Evening</option>
            </select>

            <ChevronDown size={11} />

          </div>


          {/* STATUS */}

          <div className="cashiers-select">

            <UserCheck size={12} />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <ChevronDown size={11} />

          </div>

        </div>

      </div>


      {/* =========================================
          TABLE
      ========================================= */}

      <div className="cashiers-table-card">

        <div className="cashiers-table-header">

          <div>

            <h2>Cashier Accounts</h2>

            <p>
              {filteredCashiers.length} cashiers
              found
            </p>

          </div>


          {selectedCashiers.length > 0 && (

            <div className="cashier-bulk-actions">

              <span>
                {selectedCashiers.length}
                {" "}selected
              </span>

              <button>
                <Lock size={12} />
                Disable
              </button>

              <button className="danger">
                <Trash2 size={12} />
                Delete
              </button>

            </div>

          )}

        </div>


        <div className="cashiers-table-wrapper">

          <table className="cashiers-table">

            <thead>

              <tr>

                <th className="check-column">

                  <input
                    type="checkbox"
                    checked={
                      filteredCashiers.length > 0 &&
                      selectedCashiers.length ===
                        filteredCashiers.length
                    }
                    onChange={toggleSelectAll}
                  />

                </th>

                <th>CASHIER</th>

                <th>REGISTER</th>

                <th>SHIFT</th>

                <th>STATUS</th>

                <th>TRANSACTIONS</th>

                <th>SALES</th>

                <th>LAST LOGIN</th>

                <th></th>

              </tr>

            </thead>


            <tbody>

              {filteredCashiers.map(
                (cashier) => (

                  <tr key={cashier.id}>

                    {/* CHECK */}

                    <td className="check-column">

                      <input
                        type="checkbox"
                        checked={selectedCashiers.includes(
                          cashier.id
                        )}
                        onChange={() =>
                          toggleSelect(
                            cashier.id
                          )
                        }
                      />

                    </td>


                    {/* CASHIER */}

                    <td>

                      <div className="cashier-profile">

                        <div className="cashier-avatar">
                          {cashier.avatar}
                        </div>

                        <div>

                          <strong>
                            {cashier.name}
                          </strong>

                          <span>
                            {cashier.email}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* REGISTER */}

                    <td>

                      <span
                        className={`register-badge ${
                          cashier.register ===
                          "Unassigned"
                            ? "unassigned"
                            : ""
                        }`}
                      >

                        <Monitor size={10} />

                        {cashier.register}

                      </span>

                    </td>


                    {/* SHIFT */}

                    <td>

                      <div className="shift-info">

                        <strong>
                          {cashier.shift}
                        </strong>

                        <span
                          className={
                            cashier.shiftStatus ===
                            "On Shift"
                              ? "on-shift"
                              : ""
                          }
                        >
                          {cashier.shiftStatus}
                        </span>

                      </div>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`cashier-status ${
                          cashier.status ===
                          "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >

                        <i />

                        {cashier.status}

                      </span>

                    </td>


                    {/* TRANSACTIONS */}

                    <td>

                      <div className="transaction-count">

                        <strong>
                          {cashier.transactions}
                        </strong>

                        <span>
                          today
                        </span>

                      </div>

                    </td>


                    {/* SALES */}

                    <td>

                      <div className="cashier-sales">

                        <strong>
                          {formatCurrency(
                            cashier.amount
                          )}
                        </strong>

                        <span>
                          {cashier.sales} sales
                        </span>

                      </div>

                    </td>


                    {/* LAST LOGIN */}

                    <td>

                      <span className="last-login">
                        {cashier.lastLogin}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td className="cashier-action-cell">

                      <button
                        className="cashier-action-btn"
                        onClick={() =>
                          setOpenMenu(
                            openMenu ===
                              cashier.id
                              ? null
                              : cashier.id
                          )
                        }
                      >
                        <MoreHorizontal
                          size={15}
                        />
                      </button>


                      {openMenu ===
                        cashier.id && (

                        <div className="cashier-action-menu">

                          <button>
                            <Eye size={12} />
                            View Cashier
                          </button>

                          <button>
                            <Pencil size={12} />
                            Edit Cashier
                          </button>

                          <button>
                            <Monitor size={12} />
                            Assign Register
                          </button>

                          <button>
                            <Clock3 size={12} />
                            View Shift
                          </button>

                          <button
                            onClick={() =>
                              toggleStatus(
                                cashier.id
                              )
                            }
                          >

                            {cashier.status ===
                            "Active" ? (
                              <>
                                <Lock size={12} />
                                Disable Account
                              </>
                            ) : (
                              <>
                                <Unlock size={12} />
                                Activate Account
                              </>
                            )}

                          </button>

                          <div className="menu-divider" />

                          <button
                            className="delete-action"
                            onClick={() =>
                              deleteCashier(
                                cashier.id
                              )
                            }
                          >
                            <Trash2 size={12} />
                            Delete Cashier
                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                )
              )}


              {filteredCashiers.length === 0 && (

                <tr>

                  <td
                    colSpan="9"
                    className="cashiers-empty"
                  >

                    <div>

                      <UserX size={25} />

                      <strong>
                        No cashiers found
                      </strong>

                      <span>
                        Try changing your filters
                        or search.
                      </span>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =======================================
            PAGINATION
        ======================================= */}

        <div className="cashiers-table-footer">

          <div className="cashiers-showing">

            Showing{" "}

            <strong>
              {filteredCashiers.length}
            </strong>{" "}

            of{" "}

            <strong>
              {cashiers.length}
            </strong>{" "}

            cashiers

          </div>


          <div className="cashiers-pagination">

            <button>
              <ChevronLeft size={12} />
            </button>

            <button className="active">
              1
            </button>

            <button>2</button>

            <button>3</button>

            <span>...</span>

            <button>8</button>

            <button>
              <ChevronRight size={12} />
            </button>

          </div>

        </div>

      </div>


      {/* =========================================
          INFORMATION
      ========================================= */}

      <div className="cashiers-info">

        <div className="cashiers-info-icon">
          <Activity size={14} />
        </div>

        <div>

          <strong>
            Cashier management
          </strong>

          <p>
            Monitor cashier activity, assign
            registers, manage shifts and control
            cashier account access.
          </p>

        </div>

      </div>

    </div>
  );
}

