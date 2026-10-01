'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBox,
  FaBoxes,
  FaTruck,
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaStore,
  FaTags,
  FaUndo,
  FaExchangeAlt,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaWarehouse,
  FaUserShield,
  FaHistory,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaExclamationTriangle,
  FaCreditCard,
  FaReceipt,
  FaBuilding,
  FaBalanceScale,
  FaChartLine,
  FaCashRegister,
  FaLayerGroup,
} from "react-icons/fa";




export default function Home() {
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Contact</a>
          </li> */}
        </ul>


        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="fas fa-search"></i>
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments"></i>
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">

                <div className="media">
                  <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                  </div>
                </div>

              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell"></i>
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">15 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2"></i> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2"></i> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2"></i> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
      
        </ul>
      </nav>

 <aside className="main-sidebar sidebar-light-dark elevation-0" style={{fontSize:12}}>

      {/* ================= BRAND ================= */}

      <Link
        href="/admin/dashboard"
        className="brand-link"
      >
        <FaCashRegister
          className="brand-image"
          style={{
            opacity: 0.8,
            fontSize: "25px",
            marginLeft: "10px"
          }}
        />

        <span className="brand-text font-weight-light">
          POS SYSTEM
        </span>
      </Link>


      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">

        {/* USER */}

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">

          <div className="image">
            <FaUserTie
              className="img-circle elevation-2"
              style={{
                fontSize: "35px",
                padding: "7px"
              }}
            />
          </div>

          <div className="info">
            <Link
              href="/admin/profile"
              className="d-block"
            >
              Administrator
            </Link>
          </div>

        </div>


        {/* SEARCH */}

        <div className="form-inline">

          <div
            className="input-group"
            data-widget="sidebar-search"
          >

            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <div className="input-group-append">

              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw"></i>
              </button>

            </div>

          </div>

        </div>


        {/* ================= MENU ================= */}

        <nav className="mt-2">

          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >


            {/* ================= DASHBOARD ================= */}

            <li className="nav-item">

              <Link
                href="/"
                className="nav-link"
              >

                <FaTachometerAlt className="nav-icon" />

                <p>
                  Dashboard
                </p>

              </Link>

            </li>


            {/* ================= SALES ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaShoppingCart className="nav-icon" />

                <p>
                  Sales
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/sales"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Sales</p>
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link
                    href="/admin/sales/new"
                    className="nav-link"
                  >
                    <FaPlus className="nav-icon" />
                    <p>New Sale</p>
                  </Link>
                </li> */}

                <li className="nav-item">
                  <Link
                    href="/admin/sales/held"
                    className="nav-link"
                  >
                    <FaClipboardList className="nav-icon" />
                    <p>Held Sales</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/sales/returns"
                    className="nav-link"
                  >
                    <FaUndo className="nav-icon" />
                    <p>Returns</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= PRODUCTS ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaBox className="nav-icon" />

                <p>
                  Products
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/products"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Products</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/add"
                    className="nav-link"
                  >
                    <FaPlus className="nav-icon" />
                    <p>Add Product</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/categories"
                    className="nav-link"
                  >
                    <FaLayerGroup className="nav-icon" />
                    <p>Categories</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/brands"
                    className="nav-link"
                  >
                    <FaTags className="nav-icon" />
                    <p>Brands</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/units"
                    className="nav-link"
                  >
                    <FaBalanceScale className="nav-icon" />
                    <p>Units</p>
                  </Link>
                </li>

              </ul>

            </li>

             {/* ================= Categories ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaBox className="nav-icon" />

                <p>
                  Products
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/products"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Products</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/add"
                    className="nav-link"
                  >
                    <FaPlus className="nav-icon" />
                    <p>Add Product</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/categories"
                    className="nav-link"
                  >
                    <FaLayerGroup className="nav-icon" />
                    <p>Categories</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/brands"
                    className="nav-link"
                  >
                    <FaTags className="nav-icon" />
                    <p>Brands</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/products/units"
                    className="nav-link"
                  >
                    <FaBalanceScale className="nav-icon" />
                    <p>Units</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= INVENTORY ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaWarehouse className="nav-icon" />

                <p>
                  Inventory
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/inventory"
                    className="nav-link"
                  >
                    <FaBoxes className="nav-icon" />
                    <p>Stock Overview</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/inventory/adjustment"
                    className="nav-link"
                  >
                    <FaClipboardList className="nav-icon" />
                    <p>Stock Adjustment</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/inventory/transfer"
                    className="nav-link"
                  >
                    <FaExchangeAlt className="nav-icon" />
                    <p>Stock Transfer</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/inventory/lowstock"
                    className="nav-link"
                  >
                    <FaExclamationTriangle className="nav-icon" />
                    <p>Low Stock</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/inventory/history"
                    className="nav-link"
                  >
                    <FaHistory className="nav-icon" />
                    <p>Stock History</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= PURCHASES ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaTruck className="nav-icon" />

                <p>
                  Purchases
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/purchases"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Purchases</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/purchases/new"
                    className="nav-link"
                  >
                    <FaPlus className="nav-icon" />
                    <p>New Purchase</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/purchases/suppliers"
                    className="nav-link"
                  >
                    <FaUsers className="nav-icon" />
                    <p>Suppliers</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/purchases/returns"
                    className="nav-link"
                  >
                    <FaUndo className="nav-icon" />
                    <p>Purchase Returns</p>
                  </Link>
                </li>

              </ul>

            </li>
            {/* ================= SUPPLIERS ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaUsers className="nav-icon" />

                <p>
                  Suppliers
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/suppliers"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Suppliers</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/suppliers/add"
                    className="nav-link"
                  >
                    <FaPlus className="nav-icon" />
                    <p>Add Customer</p>
                  </Link>
                </li>

              </ul>

            </li>



            {/* ================= CUSTOMERS ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaUsers className="nav-icon" />

                <p>
                  Customers
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/customers"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Customers</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/customers/add"
                    className="nav-link"
                  >
                    <FaPlus className="nav-icon" />
                    <p>Add Customer</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= EXPENSES ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaMoneyBillWave className="nav-icon" />

                <p>
                  Expenses
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/expenses"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Expenses</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/expenses/add"
                    className="nav-link"
                  >
                    <FaPlus className="nav-icon" />
                    <p>Add Expense</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/expenses/categories"
                    className="nav-link"
                  >
                    <FaTags className="nav-icon" />
                    <p>Expense Categories</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= REPORTS ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaChartLine className="nav-icon" />

                <p>
                  Reports
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/reports/sales"
                    className="nav-link"
                  >
                    <FaChartBar className="nav-icon" />
                    <p>Sales Report</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/reports/profit-loss"
                    className="nav-link"
                  >
                    <FaMoneyBillWave className="nav-icon" />
                    <p>Profit & Loss</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/reports/inventory"
                    className="nav-link"
                  >
                    <FaWarehouse className="nav-icon" />
                    <p>Inventory Report</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/reports/purchases"
                    className="nav-link"
                  >
                    <FaTruck className="nav-icon" />
                    <p>Purchase Report</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/reports/expenses"
                    className="nav-link"
                  >
                    <FaFileInvoiceDollar className="nav-icon" />
                    <p>Expense Report</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/reports/cashiers"
                    className="nav-link"
                  >
                    <FaCashRegister className="nav-icon" />
                    <p>Cashier Report</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= USERS & STAFF ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaUserShield className="nav-icon" />

                <p>
                  Users & Staff
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/users"
                    className="nav-link"
                  >
                    <FaUsers className="nav-icon" />
                    <p>All Users</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/users/cashiers"
                    className="nav-link"
                  >
                    <FaCashRegister className="nav-icon" />
                    <p>Cashiers</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/users/roles"
                    className="nav-link"
                  >
                    <FaUserShield className="nav-icon" />
                    <p>Roles & Permissions</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/users/activity"
                    className="nav-link"
                  >
                    <FaHistory className="nav-icon" />
                    <p>Activity Logs</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= BRANCHES ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaBuilding className="nav-icon" />

                <p>
                  Branches
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/branches"
                    className="nav-link"
                  >
                    <FaList className="nav-icon" />
                    <p>All Branches</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/branches/settings"
                    className="nav-link"
                  >
                    <FaCog className="nav-icon" />
                    <p>Branch Settings</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= SETTINGS ================= */}

            <li className="nav-item">

              <a href="#" className="nav-link">

                <FaCog className="nav-icon" />

                <p>
                  Settings
                  <i className="fas fa-angle-left right"></i>
                </p>

              </a>

              <ul className="nav nav-treeview">

                <li className="nav-item">
                  <Link
                    href="/admin/settings/general"
                    className="nav-link"
                  >
                    <FaCog className="nav-icon" />
                    <p>General Settings</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/settings/store"
                    className="nav-link"
                  >
                    <FaStore className="nav-icon" />
                    <p>Store Settings</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/settings/taxes"
                    className="nav-link"
                  >
                    <FaBalanceScale className="nav-icon" />
                    <p>Tax Settings</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/settings/payment-methods"
                    className="nav-link"
                  >
                    <FaCreditCard className="nav-icon" />
                    <p>Payment Methods</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/settings/receipt"
                    className="nav-link"
                  >
                    <FaReceipt className="nav-icon" />
                    <p>Receipt Settings</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/admin/settings/system"
                    className="nav-link"
                  >
                    <FaCog className="nav-icon" />
                    <p>System Settings</p>
                  </Link>
                </li>

              </ul>

            </li>


            {/* ================= LOGOUT ================= */}

            <li className="nav-item">

              <Link
                href="/admin/signout"
                className="nav-link"
              >

                <FaSignOutAlt className="nav-icon" />

                <p>
                  Logout
                </p>

              </Link>

            </li>

          </ul>

        </nav>

      </div>

    </aside>
    </>
  );
}
