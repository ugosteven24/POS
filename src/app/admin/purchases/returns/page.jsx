
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  RotateCcw,
  Eye,
  MoreVertical,
  CalendarDays,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Package,
  CheckCircle2,
  Clock3,
  XCircle,
  DollarSign,
  Filter,
} from "lucide-react";

import "./purchase-returns.css";
import Link from "next/link";

const returnsData = [
  {
    id: "PR-000128",
    date: "Aug 28, 2026",
    supplier: "ABC Distributors Ltd",
    reference: "PO-000891",
    items: 4,
    quantity: 12,
    amount: 185000,
    reason: "Damaged goods",
    status: "Completed",
  },
  {
    id: "PR-000127",
    date: "Aug 27, 2026",
    supplier: "Global Foods Nigeria",
    reference: "PO-000876",
    items: 2,
    quantity: 6,
    amount: 92000,
    reason: "Wrong items",
    status: "Pending",
  },
  {
    id: "PR-000126",
    date: "Aug 25, 2026",
    supplier: "Prime Wholesale",
    reference: "PO-000851",
    items: 7,
    quantity: 19,
    amount: 310500,
    reason: "Expired products",
    status: "Completed",
  },
  {
    id: "PR-000125",
    date: "Aug 23, 2026",
    supplier: "MegaMart Suppliers",
    reference: "PO-000829",
    items: 3,
    quantity: 8,
    amount: 145000,
    reason: "Damaged goods",
    status: "Rejected",
  },
  {
    id: "PR-000124",
    date: "Aug 21, 2026",
    supplier: "ABC Distributors Ltd",
    reference: "PO-000804",
    items: 5,
    quantity: 11,
    amount: 220000,
    reason: "Quality issue",
    status: "Completed",
  },
  {
    id: "PR-000123",
    date: "Aug 19, 2026",
    supplier: "Fresh Choice Ltd",
    reference: "PO-000781",
    items: 2,
    quantity: 5,
    amount: 67000,
    reason: "Wrong items",
    status: "Pending",
  },
  {
    id: "PR-000122",
    date: "Aug 17, 2026",
    supplier: "Prime Wholesale",
    reference: "PO-000755",
    items: 6,
    quantity: 14,
    amount: 198500,
    reason: "Damaged goods",
    status: "Completed",
  },
  {
    id: "PR-000121",
    date: "Aug 15, 2026",
    supplier: "Global Foods Nigeria",
    reference: "PO-000731",
    items: 1,
    quantity: 3,
    amount: 45000,
    reason: "Expired products",
    status: "Rejected",
  },
];

const formatCurrency = (amount) => {
  return `₦${amount.toLocaleString("en-NG")}`;
};

export default function PurchaseReturns() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  const filteredReturns = useMemo(() => {
    return returnsData.filter((item) => {
      const searchMatch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.supplier.toLowerCase().includes(search.toLowerCase()) ||
        item.reference.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        item.status === statusFilter;

      const reasonMatch =
        reasonFilter === "All" ||
        item.reason === reasonFilter;

      return searchMatch && statusMatch && reasonMatch;
    });
  }, [search, statusFilter, reasonFilter]);

  const totalPages = Math.ceil(
    filteredReturns.length / rowsPerPage
  );

  const paginatedReturns = filteredReturns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalReturns = returnsData.length;

  const completedReturns = returnsData.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingReturns = returnsData.filter(
    (item) => item.status === "Pending"
  ).length;

  const totalValue = returnsData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const getStatusClass = (status) => {
    if (status === "Completed") return "status-completed";
    if (status === "Pending") return "status-pending";
    return "status-rejected";
  };

  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return <CheckCircle2 size={12} />;
    }

    if (status === "Pending") {
      return <Clock3 size={12} />;
    }

    return <XCircle size={12} />;
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setReasonFilter("All");
    setDateFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="purchase-returns-page content-wrapper">

      {/* =================================
          HEADER
      ================================= */}

      <div className="returns-header">

        <div className="returns-title">

          <div className="title-icon">
            <RotateCcw size={19} />
          </div>

          <div>
            <h1>Purchase Returns</h1>

            <p>
              Manage products returned to suppliers.
            </p>
          </div>

        </div>


        <div className="header-actions">

          <button className="export-btn">
            <Download size={14} />
            Export
          </button>

          <Link className="new-return-btn" href="/admin/purchases/returns/new">
            <Plus size={14} />
            New Purchase Return
          </Link>

        </div>

      </div>


      {/* =================================
          STATISTICS
      ================================= */}

      <div className="return-statistics">

        <div className="stat-card">

          <div className="stat-icon blue">
            <RotateCcw size={17} />
          </div>

          <div className="stat-content">
            <span>Total Returns</span>
            <strong>{totalReturns}</strong>
          </div>

          <div className="stat-trend">
            This month
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={17} />
          </div>

          <div className="stat-content">
            <span>Completed</span>
            <strong>{completedReturns}</strong>
          </div>

          <div className="stat-trend positive">
            Processed
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon orange">
            <Clock3 size={17} />
          </div>

          <div className="stat-content">
            <span>Pending</span>
            <strong>{pendingReturns}</strong>
          </div>

          <div className="stat-trend warning">
            Requires action
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon purple">
            <DollarSign size={17} />
          </div>

          <div className="stat-content">
            <span>Return Value</span>
            <strong>{formatCurrency(totalValue)}</strong>
          </div>

          <div className="stat-trend">
            Total value
          </div>

        </div>

      </div>


      {/* =================================
          TABLE CARD
      ================================= */}

      <div className="returns-card">


        {/* TOOLBAR */}

        <div className="returns-toolbar">

          <div className="search-wrapper">

            <Search size={14} />

            <input
              type="text"
              placeholder="Search return ID, supplier or PO..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

          </div>


          <div className="toolbar-filters">

            <div className="filter-select">

              <Filter size={13} />

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>

            </div>


            <select
              className="normal-filter"
              value={reasonFilter}
              onChange={(e) => {
                setReasonFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Reasons</option>
              <option value="Damaged goods">
                Damaged goods
              </option>
              <option value="Wrong items">
                Wrong items
              </option>
              <option value="Expired products">
                Expired products
              </option>
              <option value="Quality issue">
                Quality issue
              </option>
            </select>


            <div className="date-filter">

              <CalendarDays size={13} />

              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />

            </div>


            <button
              className="reset-filter"
              onClick={resetFilters}
            >
              Reset
            </button>

          </div>

        </div>


        {/* TABLE */}

        <div className="table-container">

          <table className="returns-table">

            <thead>
              <tr>

                <th>RETURN ID</th>

                <th>DATE</th>

                <th>SUPPLIER</th>

                <th>PURCHASE ORDER</th>

                <th>ITEMS</th>

                <th>QTY</th>

                <th>RETURN VALUE</th>

                <th>REASON</th>

                <th>STATUS</th>

                <th></th>

              </tr>
            </thead>


            <tbody>

              {paginatedReturns.length > 0 ? (
                paginatedReturns.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <span className="return-id">
                        {item.id}
                      </span>
                    </td>


                    <td>
                      <span className="date-text">
                        {item.date}
                      </span>
                    </td>


                    <td>

                      <div className="supplier-cell">

                        <div className="supplier-avatar">
                          {item.supplier
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {item.supplier}
                          </strong>
                        </div>

                      </div>

                    </td>


                    <td>
                      <span className="po-reference">
                        {item.reference}
                      </span>
                    </td>


                    <td>
                      <span className="items-count">
                        {item.items}
                      </span>
                    </td>


                    <td>
                      <span className="quantity">
                        {item.quantity}
                      </span>
                    </td>


                    <td>
                      <strong className="return-amount">
                        {formatCurrency(item.amount)}
                      </strong>
                    </td>


                    <td>
                      <span className="reason">
                        {item.reason}
                      </span>
                    </td>


                    <td>

                      <span
                        className={`return-status ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>

                    </td>


                    <td>

                      <div className="row-actions">

                        <button
                          className="view-btn"
                          title="View return"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          className="more-btn"
                          title="More options"
                        >
                          <MoreVertical size={14} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>

                  <td
                    colSpan="10"
                    className="empty-state"
                  >

                    <Package size={25} />

                    <strong>
                      No purchase returns found
                    </strong>

                    <span>
                      Try changing your search or filters.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* FOOTER */}

        <div className="table-footer">

          <div className="results-info">

            Showing{" "}

            <strong>
              {filteredReturns.length === 0
                ? 0
                : (currentPage - 1) *
                    rowsPerPage +
                  1}
            </strong>

            {" "}to{" "}

            <strong>
              {Math.min(
                currentPage * rowsPerPage,
                filteredReturns.length
              )}
            </strong>

            {" "}of{" "}

            <strong>
              {filteredReturns.length}
            </strong>

            {" "}returns

          </div>


          <div className="pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <ChevronLeft size={13} />
            </button>


            {Array.from(
              { length: Math.max(totalPages, 1) },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                className={
                  currentPage === page
                    ? "active"
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
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              <ChevronRight size={13} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

