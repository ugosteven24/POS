
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaSearch,
  FaEye,
  FaPrint,
  FaUndo,
  FaFilter,
  FaMoneyBillWave,
  FaCreditCard,
  FaExchangeAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaEllipsisV,
} from "react-icons/fa";

import { getSales } from "@/services/sales/get";


export default function Table() {

  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("all");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [sales, setSales] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);


  const itemsPerPage = 8;


  /* =========================================================
     CURRENCY
  ========================================================= */

  const currency = (amount) => {

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  };


  /* =========================================================
     FETCH SALES
  ========================================================= */

  useEffect(() => {

    let cancelled = false;

    const fetchSales = async () => {

      setLoading(true);

      const result = await getSales({
        search,
        payment,
        status,
        date,
        page: currentPage,
        limit: itemsPerPage,
      });

      if (cancelled) return;

      if (result.success) {

        setSales(result.sales);

        setPagination(result.pagination);

      } else {

        setSales([]);

        setPagination({
          page: 1,
          limit: itemsPerPage,
          total: 0,
          totalPages: 0,
        });

      }

      setLoading(false);

    };


    fetchSales();


    return () => {
      cancelled = true;
    };

  }, [
    search,
    payment,
    status,
    date,
    currentPage,
  ]);


  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {

    setSearch("");
    setPayment("all");
    setStatus("all");
    setDate("");
    setCurrentPage(1);

  };


  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (e) => {

    setSearch(e.target.value);

    setCurrentPage(1);

  };


  /* =========================================================
     PAYMENT
  ========================================================= */

  const handlePayment = (e) => {

    setPayment(e.target.value);

    setCurrentPage(1);

  };


  /* =========================================================
     STATUS
  ========================================================= */

  const handleStatus = (e) => {

    setStatus(e.target.value);

    setCurrentPage(1);

  };


  /* =========================================================
     DATE
  ========================================================= */

  const handleDate = (e) => {

    setDate(e.target.value);

    setCurrentPage(1);

  };


  /* =========================================================
     PAGINATION
  ========================================================= */

  const startIndex =
    pagination.total === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;


  const endIndex =
    Math.min(
      currentPage * itemsPerPage,
      pagination.total
    );


  return (

    <>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="filter-card">


        <div className="filter-header">

          <div className="filter-title">

            <FaFilter />

            <div>

              <h3>
                Transactions
              </h3>

              <span>
                Search and filter your sales records
              </span>

            </div>

          </div>


          <button
            className="clear-btn"
            onClick={resetFilters}
          >

            Clear filters

          </button>

        </div>


        <div className="filters">


          {/* SEARCH */}

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search invoice, customer or cashier..."
              value={search}
              onChange={handleSearch}
            />

          </div>


          {/* DATE */}

          <div className="filter-input">

            <FaCalendarAlt />

            <input
              type="date"
              value={date}
              onChange={handleDate}
            />

          </div>


          {/* PAYMENT */}

          <select
            value={payment}
            onChange={handlePayment}
          >

            <option value="all">
              All payments
            </option>

            <option value="cash">
              Cash
            </option>

            <option value="pos">
              POS
            </option>

            <option value="transfer">
              Transfer
            </option>

          </select>


          {/* STATUS */}

          <select
            value={status}
            onChange={handleStatus}
          >

            <option value="all">
              All status
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="returned">
              Returned
            </option>

          </select>

        </div>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="sales-table-card">


        <div className="table-top">

          <div>

            <h2>
              All Transactions
            </h2>

            <span>

              {loading
                ? "Loading transactions..."
                : `${pagination.total} transactions found`
              }

            </span>

          </div>


          <button className="more-btn">

            <FaEllipsisV />

          </button>

        </div>


        <div className="table-wrapper">

          <table className="sales-table">

            <thead>

              <tr>

                <th>
                  Invoice
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Cashier
                </th>

                <th>
                  Date
                </th>

                <th>
                  Items
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Payment
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {/* LOADING */}

              {loading && (

                <tr>

                  <td
                    colSpan="9"
                    className="empty-state"
                  >

                    <strong>
                      Loading transactions...
                    </strong>

                  </td>

                </tr>

              )}


              {/* SALES */}

              {!loading &&
                sales.map((sale) => (

                  <tr key={sale.id}>


                    {/* INVOICE */}

                    <td>

                      <Link
                        href={`/admin/sales/${sale.id}`}
                        className="invoice"
                      >

                        #{sale.invoice}

                      </Link>

                    </td>


                    {/* CUSTOMER */}

                    <td>

                      <div className="customer">

                        <div className="customer-avatar">

                          {sale.customer
                            ?.charAt(0)
                            ?.toUpperCase() || "W"}

                        </div>

                        <div>

                          <strong>
                            {sale.customer}
                          </strong>

                          <span>
                            Customer
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* CASHIER */}

                    <td>

                      <span className="cashier">
                        {sale.cashier}
                      </span>

                    </td>


                    {/* DATE */}

                    <td>

                      <div className="date">

                        <strong>
                          {sale.date}
                        </strong>

                        <span>
                          {sale.time}
                        </span>

                      </div>

                    </td>


                    {/* ITEMS */}

                    <td>

                      <span className="items">

                        {sale.items ?? 0}

                      </span>

                    </td>


                    {/* AMOUNT */}

                    <td>

                      <strong className="amount">

                        {currency(sale.total)}

                      </strong>

                    </td>


                    {/* PAYMENT */}

                    <td>

                      <PaymentBadge
                        payment={sale.payment}
                      />

                    </td>


                    {/* STATUS */}

                    <td>

                      <StatusBadge
                        status={sale.status}
                      />

                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="action-buttons">


                        <Link
                          href={`/admin/sales/${sale.id}`}
                          className="icon-btn view"
                          title="View"
                        >

                          <FaEye />

                        </Link>


                        <button
                          className="icon-btn print"
                          title="Print"
                          onClick={() => window.print()}
                        >

                          <FaPrint />

                        </button>


                        {sale.status === "Paid" && (

                          <Link
                            href={`/admin/sales/${sale.id}/return`}
                            className="icon-btn return"
                            title="Return"
                          >

                            <FaUndo />

                          </Link>

                        )}

                      </div>

                    </td>

                  </tr>

                ))}


              {/* EMPTY */}

              {!loading &&
                sales.length === 0 && (

                  <tr>

                    <td
                      colSpan="9"
                      className="empty-state"
                    >

                      <FaSearch />

                      <strong>
                        No transactions found
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


        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="pagination">


          <span>

            Showing{" "}

            <strong>
              {startIndex}
            </strong>

            {" "}to{" "}

            <strong>
              {endIndex}
            </strong>

            {" "}of{" "}

            <strong>
              {pagination.total}
            </strong>

          </span>


          <div className="pagination-buttons">


            {/* PREVIOUS */}

            <button
              disabled={currentPage === 1 || loading}
              onClick={() =>
                setCurrentPage(
                  Math.max(
                    1,
                    currentPage - 1
                  )
                )
              }
            >

              <FaChevronLeft />

            </button>


            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length: pagination.totalPages,
              },
              (_, index) => index + 1
            ).map((page) => (

              <button
                key={page}
                className={
                  currentPage === page
                    ? "active"
                    : ""
                }
                disabled={loading}
                onClick={() =>
                  setCurrentPage(page)
                }
              >

                {page}

              </button>

            ))}


            {/* NEXT */}

            <button
              disabled={
                currentPage === pagination.totalPages ||
                pagination.totalPages === 0 ||
                loading
              }
              onClick={() =>
                setCurrentPage(
                  Math.min(
                    pagination.totalPages,
                    currentPage + 1
                  )
                )
              }
            >

              <FaChevronRight />

            </button>

          </div>

        </div>

      </div>

    </>

  );

}


/* ============================================================
   PAYMENT BADGE
============================================================ */

function PaymentBadge({ payment }) {

  const config = {

    Cash: {
      className: "payment cash",
      icon: <FaMoneyBillWave />,
    },

    POS: {
      className: "payment pos",
      icon: <FaCreditCard />,
    },

    Transfer: {
      className: "payment transfer",
      icon: <FaExchangeAlt />,
    },

  };


  const item = config[payment];


  if (!item) {
    return (
      <span className="payment">
        {payment}
      </span>
    );
  }


  return (

    <span className={item.className}>

      {item.icon}

      {payment}

    </span>

  );

}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }) {

  const classes = {

    Paid: "status paid",

    Pending: "status pending",

    Returned: "status returned",

  };


  return (

    <span className={classes[status] || "status"}>

      <span className="status-dot"></span>

      {status}

    </span>

  );

}

