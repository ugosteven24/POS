
"use client";

import React, { useState } from "react";
import {
  Search,
  CalendarDays,
  Filter,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Clock3,
  XCircle,
  DollarSign,
  Package,
  UserRound,
  MoreVertical,
} from "lucide-react";
import "./returns-sales.css";

const returnsData = [
  {
    id: "RET-000102",
    saleId: "SALE-001245",
    customer: "John Okafor",
    product: "Samsung Galaxy A15",
    quantity: 1,
    amount: 285000,
    reason: "Defective product",
    date: "27 Aug 2026",
    status: "Completed",
  },
  {
    id: "RET-000101",
    saleId: "SALE-001238",
    customer: "Mary Johnson",
    product: "HP Wireless Mouse",
    quantity: 2,
    amount: 24000,
    reason: "Wrong item",
    date: "27 Aug 2026",
    status: "Pending",
  },
  {
    id: "RET-000100",
    saleId: "SALE-001220",
    customer: "David Eze",
    product: "Oraimo Power Bank",
    quantity: 1,
    amount: 32000,
    reason: "Customer changed mind",
    date: "26 Aug 2026",
    status: "Completed",
  },
  {
    id: "RET-000099",
    saleId: "SALE-001198",
    customer: "Grace Chukwu",
    product: "USB-C Fast Charger",
    quantity: 1,
    amount: 18500,
    reason: "Damaged packaging",
    date: "26 Aug 2026",
    status: "Rejected",
  },
  {
    id: "RET-000098",
    saleId: "SALE-001180",
    customer: "Michael Obi",
    product: "Apple AirPods Pro",
    quantity: 1,
    amount: 385000,
    reason: "Defective product",
    date: "25 Aug 2026",
    status: "Completed",
  },
  {
    id: "RET-000097",
    saleId: "SALE-001171",
    customer: "Blessing Nwosu",
    product: "Logitech K120 Keyboard",
    quantity: 1,
    amount: 28000,
    reason: "Wrong item",
    date: "25 Aug 2026",
    status: "Pending",
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ReturnsSales() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const filteredReturns = returnsData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.saleId.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="returns-page  content-wrapper">

      {/* PAGE HEADER */}
      <div className="returns-header">
        <div>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span>/</span>
            <strong>Returns</strong>
          </div>

          <h1>Returns & Refunds</h1>
          <p>
            Manage returned products, refunds and sales reversals.
          </p>
        </div>

        <button className="new-return-btn">
          <RotateCcw size={18} />
          Process Return
        </button>
      </div>


      {/* SUMMARY CARDS */}
      <div className="return-stats">

        <div className="stat-card">
          <div className="stat-icon blue">
            <RotateCcw size={21} />
          </div>

          <div className="stat-content">
            <span>Total Returns</span>
            <h2>128</h2>
            <small className="positive">
              +8.4% this month
            </small>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon orange">
            <Clock3 size={21} />
          </div>

          <div className="stat-content">
            <span>Pending Returns</span>
            <h2>12</h2>
            <small>Requires attention</small>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div className="stat-content">
            <span>Completed</span>
            <h2>106</h2>
            <small className="positive">
              82.8% completion rate
            </small>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon purple">
            <DollarSign size={21} />
          </div>

          <div className="stat-content">
            <span>Total Refunded</span>
            <h2>₦2.84M</h2>
            <small>This month</small>
          </div>
        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="returns-card">

        {/* TOOLBAR */}
        <div className="returns-toolbar">

          <div className="toolbar-left">

            <div className="search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search return ID, sale, customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>


          <div className="toolbar-right">

            <div className="select-box">
              <Filter size={17} />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>


            <div className="select-box">
              <CalendarDays size={17} />

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>

          </div>

        </div>


        {/* TABLE */}
        <div className="table-container">

          <table className="returns-table">

            <thead>
              <tr>
                <th>RETURN ID</th>
                <th>SALE ID</th>
                <th>CUSTOMER</th>
                <th>PRODUCT</th>
                <th>QTY</th>
                <th>REFUND AMOUNT</th>
                <th>REASON</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>


            <tbody>

              {filteredReturns.map((item) => (

                <tr key={item.id}>

                  <td>
                    <span className="return-id">
                      {item.id}
                    </span>
                  </td>


                  <td>
                    <span className="sale-id">
                      {item.saleId}
                    </span>
                  </td>


                  <td>
                    <div className="customer-cell">

                      <div className="customer-avatar">
                        {item.customer
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .substring(0, 2)}
                      </div>

                      <div>
                        <strong>{item.customer}</strong>
                        <small>Customer</small>
                      </div>

                    </div>
                  </td>


                  <td>
                    <div className="product-cell">

                      <div className="product-icon">
                        <Package size={17} />
                      </div>

                      <div>
                        <strong>{item.product}</strong>
                      </div>

                    </div>
                  </td>


                  <td>
                    <span className="quantity">
                      {item.quantity}
                    </span>
                  </td>


                  <td>
                    <strong className="refund-amount">
                      {formatCurrency(item.amount)}
                    </strong>
                  </td>


                  <td>
                    <span className="reason">
                      {item.reason}
                    </span>
                  </td>


                  <td>
                    <span className="return-date">
                      {item.date}
                    </span>
                  </td>


                  <td>

                    <span
                      className={`status-badge ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >

                      {item.status === "Completed" && (
                        <CheckCircle2 size={14} />
                      )}

                      {item.status === "Pending" && (
                        <Clock3 size={14} />
                      )}

                      {item.status === "Rejected" && (
                        <XCircle size={14} />
                      )}

                      {item.status}

                    </span>

                  </td>


                  <td>

                    <div className="action-menu">

                      <button title="View return">
                        <Eye size={17} />
                      </button>

                      <button title="Print">
                        <Printer size={17} />
                      </button>

                      <button title="More">
                        <MoreVertical size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredReturns.length === 0 && (

            <div className="empty-state">

              <div className="empty-icon">
                <RotateCcw size={30} />
              </div>

              <h3>No returns found</h3>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>


        {/* TABLE FOOTER */}
        <div className="table-footer">

          <span>
            Showing <strong>1</strong> to{" "}
            <strong>{filteredReturns.length}</strong> of{" "}
            <strong>128</strong> returns
          </span>


          <div className="pagination">

            <button>
              <ChevronLeft size={17} />
            </button>

            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>13</button>

            <button>
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

