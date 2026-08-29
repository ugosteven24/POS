
'use client';

import Link from "next/link";

import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaBox,
  FaExchangeAlt,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaCashRegister,
  FaWarehouse,
  FaChartLine,
  FaEye,
  FaPlus,
  FaReceipt,
  FaCalendarAlt,
  FaUserTie,
  FaCreditCard,
  FaTruck,
  FaUndo,
} from "react-icons/fa";


export default function Dashboard() {

  return (
    <div className="content-wrapper">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="content-header">

        <div className="container-fluid">

          <div className="row mb-2">

            <div className="col-sm-6">

              <h1 className="m-0">
                Dashboard
              </h1>

            </div>

            <div className="col-sm-6">

              <ol className="breadcrumb float-sm-right">

                <li className="breadcrumb-item">
                  <Link href="/admin/dashboard">
                    Home
                  </Link>
                </li>

                <li className="breadcrumb-item active">
                  Dashboard
                </li>

              </ol>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="content">

        <div className="container-fluid">


          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="row mb-3">

            <div className="col-md-12">

              <div className="card">

                <div className="card-body">

                  <div className="d-flex flex-wrap">

                    <Link
                      href="/admin/products/add"
                      className="btn btn-primary mr-2 mb-2"
                    >
                      <FaPlus className="mr-1" />
                      Add Product
                    </Link>


                    <Link
                      href="/admin/purchases/new"
                      className="btn btn-success mr-2 mb-2"
                    >
                      <FaTruck className="mr-1" />
                      New Purchase
                    </Link>


                    <Link
                      href="/admin/customers/add"
                      className="btn btn-info mr-2 mb-2"
                    >
                      <FaUsers className="mr-1" />
                      Add Customer
                    </Link>


                    <Link
                      href="/cashier"
                      className="btn btn-warning mr-2 mb-2"
                    >
                      <FaCashRegister className="mr-1" />
                      Open POS
                    </Link>


                    <Link
                      href="/admin/reports/sales"
                      className="btn btn-secondary mb-2"
                    >
                      <FaChartLine className="mr-1" />
                      View Reports
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="row">


            {/* SALES */}

            <div className="col-lg-3 col-6">

              <div className="small-box bg-info">

                <div className="inner">

                  <h3>
                    ₦1,245,500
                  </h3>

                  <p>
                    Today's Sales
                  </p>

                  <small>
                    <FaArrowUp className="mr-1" />
                    12.5% compared to yesterday
                  </small>

                </div>

                <div className="icon">
                  <FaShoppingCart />
                </div>

                <Link
                  href="/admin/sales"
                  className="small-box-footer"
                >
                  View Sales
                  <i className="fas fa-arrow-circle-right ml-1"></i>
                </Link>

              </div>

            </div>


            {/* PROFIT */}

            <div className="col-lg-3 col-6">

              <div className="small-box bg-success">

                <div className="inner">

                  <h3>
                    ₦385,200
                  </h3>

                  <p>
                    Today's Profit
                  </p>

                  <small>
                    <FaArrowUp className="mr-1" />
                    8.3% compared to yesterday
                  </small>

                </div>

                <div className="icon">
                  <FaMoneyBillWave />
                </div>

                <Link
                  href="/admin/reports/profit-loss"
                  className="small-box-footer"
                >
                  View Profit
                  <i className="fas fa-arrow-circle-right ml-1"></i>
                </Link>

              </div>

            </div>


            {/* PRODUCTS */}

            <div className="col-lg-3 col-6">

              <div className="small-box bg-warning">

                <div className="inner">

                  <h3>
                    2,548
                  </h3>

                  <p>
                    Total Products
                  </p>

                  <small>
                    37 products low in stock
                  </small>

                </div>

                <div className="icon">
                  <FaBox />
                </div>

                <Link
                  href="/admin/products"
                  className="small-box-footer"
                >
                  Manage Products
                  <i className="fas fa-arrow-circle-right ml-1"></i>
                </Link>

              </div>

            </div>


            {/* CUSTOMERS */}

            <div className="col-lg-3 col-6">

              <div className="small-box bg-danger">

                <div className="inner">

                  <h3>
                    1,842
                  </h3>

                  <p>
                    Customers
                  </p>

                  <small>
                    28 new customers this month
                  </small>

                </div>

                <div className="icon">
                  <FaUsers />
                </div>

                <Link
                  href="/admin/customers"
                  className="small-box-footer"
                >
                  View Customers
                  <i className="fas fa-arrow-circle-right ml-1"></i>
                </Link>

              </div>

            </div>

          </div>


          {/* =================================================
              SECOND ROW
          ================================================= */}

          <div className="row">


            {/* =============================================
                SALES OVERVIEW
            ============================================== */}

            <div className="col-md-8">

              <div className="card">

                <div className="card-header">

                  <h3 className="card-title">

                    <FaChartLine className="mr-2" />

                    Sales Overview

                  </h3>


                  <div className="card-tools">

                    <button
                      type="button"
                      className="btn btn-tool"
                    >
                      <FaCalendarAlt />
                    </button>

                  </div>

                </div>


                <div className="card-body">

                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >

                    <div className="text-center text-muted">

                      <FaChartLine
                        style={{
                          fontSize: "55px",
                          marginBottom: "15px",
                        }}
                      />

                      <h5>
                        Sales Chart
                      </h5>

                      <p>
                        Connect your sales data here to display
                        daily, weekly and monthly sales.
                      </p>

                    </div>

                  </div>

                </div>


                <div className="card-footer">

                  <div className="row text-center">

                    <div className="col-sm-4">

                      <strong>
                        ₦8.4M
                      </strong>

                      <br />

                      <span className="text-muted">
                        This Month
                      </span>

                    </div>


                    <div className="col-sm-4">

                      <strong>
                        ₦23.8M
                      </strong>

                      <br />

                      <span className="text-muted">
                        This Quarter
                      </span>

                    </div>


                    <div className="col-sm-4">

                      <strong>
                        ₦86.2M
                      </strong>

                      <br />

                      <span className="text-muted">
                        This Year
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =============================================
                PAYMENT METHODS
            ============================================== */}

            <div className="col-md-4">

              <div className="card">

                <div className="card-header">

                  <h3 className="card-title">

                    <FaCreditCard className="mr-2" />

                    Payment Methods

                  </h3>

                </div>


                <div className="card-body">


                  {/* CASH */}

                  <div className="d-flex justify-content-between mb-4">

                    <div>

                      <FaMoneyBillWave
                        className="mr-2"
                      />

                      Cash

                    </div>

                    <strong>
                      ₦542,000
                    </strong>

                  </div>


                  {/* POS */}

                  <div className="d-flex justify-content-between mb-4">

                    <div>

                      <FaCreditCard
                        className="mr-2"
                      />

                      POS

                    </div>

                    <strong>
                      ₦486,500
                    </strong>

                  </div>


                  {/* TRANSFER */}

                  <div className="d-flex justify-content-between mb-4">

                    <div>

                      <FaExchangeAlt
                        className="mr-2"
                      />

                      Transfer

                    </div>

                    <strong>
                      ₦217,000
                    </strong>

                  </div>


                  <hr />

                  <div className="d-flex justify-content-between">

                    <strong>
                      Total
                    </strong>

                    <strong>
                      ₦1,245,500
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              THIRD ROW
          ================================================= */}

          <div className="row">


            {/* =============================================
                RECENT SALES
            ============================================== */}

            <div className="col-md-8">

              <div className="card">

                <div className="card-header">

                  <h3 className="card-title">

                    <FaReceipt className="mr-2" />

                    Recent Sales

                  </h3>


                  <div className="card-tools">

                    <Link
                      href="/admin/sales"
                      className="btn btn-sm btn-primary"
                    >
                      View All
                    </Link>

                  </div>

                </div>


                <div className="card-body p-0">

                  <div className="table-responsive">

                    <table className="table table-hover mb-0">

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
                            Amount
                          </th>

                          <th>
                            Payment
                          </th>

                          <th>
                            Status
                          </th>

                        </tr>

                      </thead>


                      <tbody>


                        <tr>

                          <td>
                            #INV-10025
                          </td>

                          <td>
                            Walk-in Customer
                          </td>

                          <td>
                            John
                          </td>

                          <td>
                            ₦85,500
                          </td>

                          <td>
                            POS
                          </td>

                          <td>
                            <span className="badge badge-success">
                              Paid
                            </span>
                          </td>

                        </tr>


                        <tr>

                          <td>
                            #INV-10024
                          </td>

                          <td>
                            Michael Obi
                          </td>

                          <td>
                            Sarah
                          </td>

                          <td>
                            ₦42,300
                          </td>

                          <td>
                            Cash
                          </td>

                          <td>
                            <span className="badge badge-success">
                              Paid
                            </span>
                          </td>

                        </tr>


                        <tr>

                          <td>
                            #INV-10023
                          </td>

                          <td>
                            Chinedu Ltd
                          </td>

                          <td>
                            John
                          </td>

                          <td>
                            ₦125,000
                          </td>

                          <td>
                            Transfer
                          </td>

                          <td>
                            <span className="badge badge-success">
                              Paid
                            </span>
                          </td>

                        </tr>


                        <tr>

                          <td>
                            #INV-10022
                          </td>

                          <td>
                            Grace Okafor
                          </td>

                          <td>
                            Sarah
                          </td>

                          <td>
                            ₦18,700
                          </td>

                          <td>
                            Cash
                          </td>

                          <td>
                            <span className="badge badge-warning">
                              Pending
                            </span>
                          </td>

                        </tr>


                        <tr>

                          <td>
                            #INV-10021
                          </td>

                          <td>
                            Walk-in Customer
                          </td>

                          <td>
                            Michael
                          </td>

                          <td>
                            ₦67,200
                          </td>

                          <td>
                            POS
                          </td>

                          <td>
                            <span className="badge badge-success">
                              Paid
                            </span>
                          </td>

                        </tr>


                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>


            {/* =============================================
                LOW STOCK
            ============================================== */}

            <div className="col-md-4">

              <div className="card">

                <div className="card-header">

                  <h3 className="card-title">

                    <FaExclamationTriangle
                      className="mr-2 text-warning"
                    />

                    Low Stock

                  </h3>


                  <div className="card-tools">

                    <Link
                      href="/admin/inventory/low-stock"
                      className="btn btn-sm btn-warning"
                    >
                      View All
                    </Link>

                  </div>

                </div>


                <div className="card-body p-0">

                  <ul className="products-list product-list-in-card pl-2 pr-2">


                    <li className="item">

                      <div className="product-info">

                        <span className="product-title">

                          Indomie Noodles

                          <span className="badge badge-danger float-right">
                            5 left
                          </span>

                        </span>

                        <span className="product-description">
                          SKU: IND-001
                        </span>

                      </div>

                    </li>


                    <li className="item">

                      <div className="product-info">

                        <span className="product-title">

                          Peak Milk 400g

                          <span className="badge badge-warning float-right">
                            8 left
                          </span>

                        </span>

                        <span className="product-description">
                          SKU: PM-400
                        </span>

                      </div>

                    </li>


                    <li className="item">

                      <div className="product-info">

                        <span className="product-title">

                          Golden Penny Spaghetti

                          <span className="badge badge-warning float-right">
                            12 left
                          </span>

                        </span>

                        <span className="product-description">
                          SKU: GPS-001
                        </span>

                      </div>

                    </li>


                    <li className="item">

                      <div className="product-info">

                        <span className="product-title">

                          Milo 500g

                          <span className="badge badge-danger float-right">
                            3 left
                          </span>

                        </span>

                        <span className="product-description">
                          SKU: MIL-500
                        </span>

                      </div>

                    </li>


                  </ul>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              FOURTH ROW
          ================================================= */}

          <div className="row">


            {/* TOP PRODUCTS */}

            <div className="col-md-6">

              <div className="card">

                <div className="card-header">

                  <h3 className="card-title">

                    <FaBox className="mr-2" />

                    Top Selling Products

                  </h3>

                </div>


                <div className="card-body p-0">

                  <table className="table table-striped mb-0">

                    <thead>

                      <tr>

                        <th>
                          Product
                        </th>

                        <th>
                          Sold
                        </th>

                        <th>
                          Revenue
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      <tr>

                        <td>
                          Indomie Noodles
                        </td>

                        <td>
                          428
                        </td>

                        <td>
                          ₦214,000
                        </td>

                      </tr>

                      <tr>

                        <td>
                          Peak Milk
                        </td>

                        <td>
                          315
                        </td>

                        <td>
                          ₦157,500
                        </td>

                      </tr>

                      <tr>

                        <td>
                          Coca-Cola 50cl
                        </td>

                        <td>
                          287
                        </td>

                        <td>
                          ₦143,500
                        </td>

                      </tr>

                      <tr>

                        <td>
                          Golden Penny Spaghetti
                        </td>

                        <td>
                          243
                        </td>

                        <td>
                          ₦121,500
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </div>


            {/* CASHIER PERFORMANCE */}

            <div className="col-md-6">

              <div className="card">

                <div className="card-header">

                  <h3 className="card-title">

                    <FaUserTie className="mr-2" />

                    Cashier Performance

                  </h3>

                </div>


                <div className="card-body p-0">

                  <table className="table table-striped mb-0">

                    <thead>

                      <tr>

                        <th>
                          Cashier
                        </th>

                        <th>
                          Sales
                        </th>

                        <th>
                          Amount
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      <tr>

                        <td>
                          John
                        </td>

                        <td>
                          38
                        </td>

                        <td>
                          ₦385,200
                        </td>

                      </tr>

                      <tr>

                        <td>
                          Sarah
                        </td>

                        <td>
                          31
                        </td>

                        <td>
                          ₦312,500
                        </td>

                      </tr>

                      <tr>

                        <td>
                          Michael
                        </td>

                        <td>
                          27
                        </td>

                        <td>
                          ₦276,800
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="row">

            <div className="col-md-12">

              <div className="card">

                <div className="card-header">

                  <h3 className="card-title">
                    Quick Links
                  </h3>

                </div>


                <div className="card-body">

                  <div className="row">


                    <div className="col-md-3 col-6 mb-3">

                      <Link
                        href="/admin/products"
                        className="btn btn-outline-primary btn-block"
                      >

                        <FaBox className="mr-2" />

                        Products

                      </Link>

                    </div>


                    <div className="col-md-3 col-6 mb-3">

                      <Link
                        href="/admin/inventory"
                        className="btn btn-outline-success btn-block"
                      >

                        <FaWarehouse className="mr-2" />

                        Inventory

                      </Link>

                    </div>


                    <div className="col-md-3 col-6 mb-3">

                      <Link
                        href="/admin/purchases"
                        className="btn btn-outline-info btn-block"
                      >

                        <FaTruck className="mr-2" />

                        Purchases

                      </Link>

                    </div>


                    <div className="col-md-3 col-6 mb-3">

                      <Link
                        href="/admin/sales/returns"
                        className="btn btn-outline-danger btn-block"
                      >

                        <FaUndo className="mr-2" />

                        Returns

                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


        </div>

      </section>

    </div>
  );
}

