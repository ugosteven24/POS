
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  FaArrowLeft,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaClock,
  FaPlay,
  FaTrash,
  FaEllipsisV,
  FaReceipt,
  FaBoxOpen,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./held-sales.css";


/* ============================================================
   DEMO HELD SALES
============================================================ */

const initialHeldSales = [
  {
    id: 1,
    reference: "HLD-10021",
    customer: "Walk-in Customer",
    cashier: "Stephen",
    items: 4,
    total: 12800,
    date: "27 Aug 2026",
    time: "10:42 AM",
  },
  {
    id: 2,
    reference: "HLD-10020",
    customer: "Michael Obi",
    cashier: "David",
    items: 7,
    total: 34500,
    date: "27 Aug 2026",
    time: "10:18 AM",
  },
  {
    id: 3,
    reference: "HLD-10019",
    customer: "Grace Okafor",
    cashier: "Stephen",
    items: 2,
    total: 7600,
    date: "27 Aug 2026",
    time: "09:56 AM",
  },
  {
    id: 4,
    reference: "HLD-10018",
    customer: "Walk-in Customer",
    cashier: "David",
    items: 9,
    total: 52700,
    date: "27 Aug 2026",
    time: "09:21 AM",
  },
  {
    id: 5,
    reference: "HLD-10017",
    customer: "Chinedu Ltd",
    cashier: "Stephen",
    items: 5,
    total: 21400,
    date: "26 Aug 2026",
    time: "05:42 PM",
  },
  {
    id: 6,
    reference: "HLD-10016",
    customer: "Walk-in Customer",
    cashier: "David",
    items: 3,
    total: 9200,
    date: "26 Aug 2026",
    time: "04:37 PM",
  },
];


export default function HeldSales() {

  const [heldSales, setHeldSales] =
    useState(initialHeldSales);

  const [search, setSearch] =
    useState("");

  const [deleteSale, setDeleteSale] =
    useState(null);


  /* ==========================================================
     CURRENCY
  ========================================================== */

  const currency = (amount) => {

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  };


  /* ==========================================================
     FILTER
  ========================================================== */

  const filteredSales = useMemo(() => {

    const value = search.toLowerCase().trim();

    if (!value) {
      return heldSales;
    }

    return heldSales.filter((sale) =>

      sale.reference
        .toLowerCase()
        .includes(value) ||

      sale.customer
        .toLowerCase()
        .includes(value) ||

      sale.cashier
        .toLowerCase()
        .includes(value)

    );

  }, [search, heldSales]);


  /* ==========================================================
     DELETE HELD SALE
  ========================================================== */

  const confirmDelete = () => {

    if (!deleteSale) {
      return;
    }

    setHeldSales((current) =>
      current.filter(
        (sale) => sale.id !== deleteSale.id
      )
    );

    setDeleteSale(null);

  };


  /* ==========================================================
     RESUME SALE
  ========================================================== */

  const resumeSale = (sale) => {

    /*
      Later this should load the held sale from MySQL
      and redirect to:

      /admin/sales/new?heldSale=HLD-10021

      Example:

      router.push(
        `/admin/sales/new?heldSale=${sale.id}`
      );
    */

    alert(
      `Resuming ${sale.reference}`
    );

  };


  return (

    <div className="held-sales-page content-wrapper">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="held-sales-header">

        <div className="held-header-left">

          <Link
            href="/admin/sales"
            className="held-back-button"
          >

            <FaArrowLeft />

          </Link>


          <div>

            <div className="held-breadcrumb">

              <Link href="/admin/dashboard">
                Dashboard
              </Link>

              <span>/</span>

              <Link href="/admin/sales">
                Sales
              </Link>

              <span>/</span>

              <span>Held Sales</span>

            </div>


            <h1>
              Held Sales
            </h1>

            <p>
              Manage sales that have been temporarily put on hold.
            </p>

          </div>

        </div>


        <div className="held-count">

          <FaClock />

          <div>

            <strong>
              {heldSales.length}
            </strong>

            <span>
              Held Sales
            </span>

          </div>

        </div>

      </header>



      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="held-summary">


        <div className="summary-card">

          <div className="summary-icon blue">
            <FaClock />
          </div>

          <div>

            <span>
              Total Held
            </span>

            <strong>
              {heldSales.length}
            </strong>

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon orange">
            <FaShoppingCart />
          </div>

          <div>

            <span>
              Items on Hold
            </span>

            <strong>

              {heldSales.reduce(
                (sum, sale) =>
                  sum + sale.items,
                0
              )}

            </strong>

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon green">
            <FaReceipt />
          </div>

          <div>

            <span>
              Held Value
            </span>

            <strong>

              {currency(
                heldSales.reduce(
                  (sum, sale) =>
                    sum + sale.total,
                  0
                )
              )}

            </strong>

          </div>

        </div>


      </div>



      {/* ======================================================
          CONTENT
      ====================================================== */}

      <section className="held-content">


        {/* TOOLBAR */}

        <div className="held-toolbar">


          <div>

            <h2>
              Held Transactions
            </h2>

            <span>
              Select a transaction to continue the sale.
            </span>

          </div>


          <div className="held-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search reference, customer or cashier..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (

              <button
                onClick={() =>
                  setSearch("")
                }
              >

                <FaTimes />

              </button>

            )}

          </div>

        </div>



        {/* ====================================================
            TABLE
        ==================================================== */}

        {filteredSales.length > 0 ? (

          <div className="held-table-wrapper">

            <table className="held-table">

              <thead>

                <tr>

                  <th>
                    Reference
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Cashier
                  </th>

                  <th>
                    Items
                  </th>

                  <th>
                    Total
                  </th>

                  <th>
                    Held At
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredSales.map((sale) => (

                  <tr key={sale.id}>


                    {/* REFERENCE */}

                    <td>

                      <div className="reference-cell">

                        <div className="reference-icon">
                          <FaReceipt />
                        </div>

                        <div>

                          <strong>
                            {sale.reference}
                          </strong>

                          <span>
                            Pending
                          </span>

                        </div>

                      </div>

                    </td>



                    {/* CUSTOMER */}

                    <td>

                      <div className="customer-cell">

                        <div className="customer-avatar">
                          <FaUser />
                        </div>

                        <span>
                          {sale.customer}
                        </span>

                      </div>

                    </td>



                    {/* CASHIER */}

                    <td>

                      <span className="cashier-name">
                        {sale.cashier}
                      </span>

                    </td>



                    {/* ITEMS */}

                    <td>

                      <span className="items-badge">

                        <FaShoppingCart />

                        {sale.items}

                      </span>

                    </td>



                    {/* TOTAL */}

                    <td>

                      <strong className="sale-total">
                        {currency(sale.total)}
                      </strong>

                    </td>



                    {/* DATE */}

                    <td>

                      <div className="held-date">

                        <strong>
                          {sale.date}
                        </strong>

                        <span>
                          {sale.time}
                        </span>

                      </div>

                    </td>



                    {/* ACTION */}

                    <td>

                      <div className="sale-actions">


                        <button
                          className="resume-button"
                          onClick={() =>
                            resumeSale(sale)
                          }
                        >

                          <FaPlay />

                          Resume

                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            setDeleteSale(sale)
                          }
                        >

                          <FaTrash />

                        </button>


                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          /* ==================================================
             EMPTY SEARCH RESULT
          ================================================== */

          <div className="held-empty">

            <div className="empty-icon">
              <FaBoxOpen />
            </div>

            <h3>
              No held sales found
            </h3>

            <p>
              {search
                ? "Try changing your search criteria."
                : "There are currently no sales on hold."
              }
            </p>

          </div>

        )}

      </section>



      {/* ======================================================
          DELETE CONFIRMATION MODAL
      ====================================================== */}

      {deleteSale && (

        <div className="held-modal-overlay">

          <div className="delete-modal">


            <div className="delete-icon">
              <FaExclamationTriangle />
            </div>


            <h2>
              Delete Held Sale?
            </h2>


            <p>

              Are you sure you want to delete

              <strong>
                {" "}{deleteSale.reference}
              </strong>

              ?

              <br />

              This action cannot be undone.

            </p>


            <div className="delete-modal-actions">

              <button
                className="cancel-delete"
                onClick={() =>
                  setDeleteSale(null)
                }
              >

                Cancel

              </button>


              <button
                className="confirm-delete"
                onClick={confirmDelete}
              >

                <FaTrash />

                Delete Sale

              </button>

            </div>


          </div>

        </div>

      )}

    </div>

  );

}

