
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import "./all-sales.css";

import {
  FaSearch,
  FaEye,
  FaPrint,
  FaUndo,
  FaFilter,
  FaShoppingBag,
  FaMoneyBillWave,
  FaCreditCard,
  FaExchangeAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaPlus,
  FaEllipsisV,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
} from "react-icons/fa";

import "./all-sales.css";


const salesData = [
  {
    id: 1,
    invoice: "INV-10025",
    customer: "Walk-in Customer",
    cashier: "John",
    date: "27 Aug 2026",
    time: "10:32 AM",
    items: 5,
    total: 85500,
    payment: "POS",
    status: "Paid",
  },
  {
    id: 2,
    invoice: "INV-10024",
    customer: "Michael Obi",
    cashier: "Sarah",
    date: "27 Aug 2026",
    time: "10:15 AM",
    items: 3,
    total: 42300,
    payment: "Cash",
    status: "Paid",
  },
  {
    id: 3,
    invoice: "INV-10023",
    customer: "Chinedu Ltd",
    cashier: "John",
    date: "27 Aug 2026",
    time: "09:48 AM",
    items: 12,
    total: 125000,
    payment: "Transfer",
    status: "Paid",
  },
  {
    id: 4,
    invoice: "INV-10022",
    customer: "Grace Okafor",
    cashier: "Sarah",
    date: "27 Aug 2026",
    time: "09:21 AM",
    items: 2,
    total: 18700,
    payment: "Cash",
    status: "Pending",
  },
  {
    id: 5,
    invoice: "INV-10021",
    customer: "Walk-in Customer",
    cashier: "Michael",
    date: "26 Aug 2026",
    time: "05:42 PM",
    items: 7,
    total: 67200,
    payment: "POS",
    status: "Paid",
  },
  {
    id: 6,
    invoice: "INV-10020",
    customer: "David Chukwu",
    cashier: "John",
    date: "26 Aug 2026",
    time: "04:25 PM",
    items: 4,
    total: 36000,
    payment: "Cash",
    status: "Paid",
  },
  {
    id: 7,
    invoice: "INV-10019",
    customer: "Amaka Stores",
    cashier: "Sarah",
    date: "26 Aug 2026",
    time: "03:10 PM",
    items: 15,
    total: 147000,
    payment: "Transfer",
    status: "Paid",
  },
  {
    id: 8,
    invoice: "INV-10018",
    customer: "Walk-in Customer",
    cashier: "Michael",
    date: "26 Aug 2026",
    time: "01:45 PM",
    items: 6,
    total: 52500,
    payment: "POS",
    status: "Returned",
  },
  {
    id: 9,
    invoice: "INV-10017",
    customer: "Ikechukwu Ltd",
    cashier: "John",
    date: "25 Aug 2026",
    time: "05:20 PM",
    items: 9,
    total: 90400,
    payment: "Transfer",
    status: "Paid",
  },
  {
    id: 10,
    invoice: "INV-10016",
    customer: "Blessing Okoro",
    cashier: "Sarah",
    date: "25 Aug 2026",
    time: "02:30 PM",
    items: 3,
    total: 23100,
    payment: "Cash",
    status: "Paid",
  },
];


export default function AllSales() {

  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("all");
  const [status, setStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

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
     FILTER
  ========================================================= */

  const filteredSales = useMemo(() => {

    return salesData.filter((sale) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        sale.invoice.toLowerCase().includes(searchText) ||
        sale.customer.toLowerCase().includes(searchText) ||
        sale.cashier.toLowerCase().includes(searchText);


      const matchesPayment =
        payment === "all" ||
        sale.payment.toLowerCase() === payment;


      const matchesStatus =
        status === "all" ||
        sale.status.toLowerCase() === status;


      return (
        matchesSearch &&
        matchesPayment &&
        matchesStatus
      );

    });

  }, [search, payment, status]);


  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredSales.length / itemsPerPage
  );


  const startIndex =
    (currentPage - 1) * itemsPerPage;


  const displayedSales = filteredSales.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {

    setSearch("");
    setPayment("all");
    setStatus("all");
    setCurrentPage(1);

  };


  return (

    <div className="sales-page  content-wrapper">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="sales-header">

        <div>

          <div className="breadcrumb">

            <Link href="/admin/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <span>Sales</span>

          </div>


          <h1>
            Sales
          </h1>

          <p>
            Manage, monitor and review all sales transactions.
          </p>

        </div>


        <div className="header-actions">

          <button className="secondary-btn">

            <FaDownload />

            Export

          </button>


          <Link
            href="/admin/sales/new"
            className="primary-btn"
          >

            <FaPlus />

            New Sale

          </Link>

        </div>

      </div>



      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="summary-grid">


        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon blue">
              <FaShoppingBag />
            </div>

            <span className="trend positive">
              <FaArrowUp />
              12.5%
            </span>

          </div>


          <div className="summary-label">
            Total Sales
          </div>

          <div className="summary-value">
            ₦1,245,500
          </div>

          <div className="summary-footer">
            Compared with yesterday
          </div>

        </div>



        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon green">
              <FaMoneyBillWave />
            </div>

            <span className="trend positive">
              <FaArrowUp />
              8.4%
            </span>

          </div>


          <div className="summary-label">
            Cash
          </div>

          <div className="summary-value">
            ₦359,100
          </div>

          <div className="summary-footer">
            28.8% of total sales
          </div>

        </div>



        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon orange">
              <FaCreditCard />
            </div>

            <span className="trend positive">
              <FaArrowUp />
              6.2%
            </span>

          </div>


          <div className="summary-label">
            POS
          </div>

          <div className="summary-value">
            ₦486,500
          </div>

          <div className="summary-footer">
            39.1% of total sales
          </div>

        </div>



        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon purple">
              <FaExchangeAlt />
            </div>

            <span className="trend negative">
              <FaArrowDown />
              2.1%
            </span>

          </div>


          <div className="summary-label">
            Transfer
          </div>

          <div className="summary-value">
            ₦399,900
          </div>

          <div className="summary-footer">
            32.1% of total sales
          </div>

        </div>

      </div>



      {/* =====================================================
          FILTER / SEARCH
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
              onChange={(e) => {

                setSearch(e.target.value);
                setCurrentPage(1);

              }}
            />

          </div>



          {/* DATE */}

          <div className="filter-input">

            <FaCalendarAlt />

            <input
              type="date"
              onChange={() => setCurrentPage(1)}
            />

          </div>



          {/* PAYMENT */}

          <select
            value={payment}
            onChange={(e) => {

              setPayment(e.target.value);
              setCurrentPage(1);

            }}
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
            onChange={(e) => {

              setStatus(e.target.value);
              setCurrentPage(1);

            }}
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
              {filteredSales.length} transactions found
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


              {displayedSales.map((sale) => (

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
                          .charAt(0)
                          .toUpperCase()}

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
                      {sale.items}
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


              {displayedSales.length === 0 && (

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
              {filteredSales.length === 0
                ? 0
                : startIndex + 1}
            </strong>

            {" "}to{" "}

            <strong>
              {Math.min(
                startIndex + itemsPerPage,
                filteredSales.length
              )}
            </strong>

            {" "}of{" "}

            <strong>
              {filteredSales.length}
            </strong>

          </span>



          <div className="pagination-buttons">


            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  Math.max(1, currentPage - 1)
                )
              }
            >

              <FaChevronLeft />

            </button>


            {Array.from(
              { length: totalPages },
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
                setCurrentPage(
                  Math.min(
                    totalPages,
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

    </div>

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

    <span className={classes[status]}>

      <span className="status-dot"></span>

      {status}

    </span>

  );

}

