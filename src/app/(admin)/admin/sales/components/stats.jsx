
import Link from "next/link";

import {
  FaShoppingBag,
  FaMoneyBillWave,
  FaCreditCard,
  FaExchangeAlt,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
} from "react-icons/fa";

import { getSalesStats } from "@/services/sales/get";

export default async function Stats() {
  const stats = await getSalesStats();

  return (
    <div>

      {/* PAGE HEADER */}

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

          {/* <Link
            href="/admin/sales/new"
            className="primary-btn"
          >
            <FaPlus />
            New Sale
          </Link> */}

        </div>

      </div>


      {/* SUMMARY */}

      <div className="summary-grid">


        {/* TOTAL SALES */}

        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon blue">
              <FaShoppingBag />
            </div>

            <span
              className={
                stats.sales_trend >= 0
                  ? "trend positive"
                  : "trend negative"
              }
            >

              {stats.sales_trend >= 0
                ? <FaArrowUp />
                : <FaArrowDown />
              }

              {Math.abs(stats.sales_trend)}%

            </span>

          </div>

          <div className="summary-label">
            Total Sales
          </div>

          <div className="summary-value">
            ₦{stats.total_sales}
          </div>

          <div className="summary-footer">
            Compared with yesterday
          </div>

        </div>


        {/* CASH */}

        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon green">
              <FaMoneyBillWave />
            </div>

            <span className="trend positive">
              <FaArrowUp />
              {stats.cash_percentage}%
            </span>

          </div>

          <div className="summary-label">
            Cash
          </div>

          <div className="summary-value">
            ₦{stats.cash_sales.toLocaleString()}
          </div>

          <div className="summary-footer">
            {stats.cash_percentage}% of total sales
          </div>

        </div>


        {/* POS */}

        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon orange">
              <FaCreditCard />
            </div>

            <span className="trend positive">
              <FaArrowUp />
              {stats.pos_percentage}%
            </span>

          </div>

          <div className="summary-label">
            POS
          </div>

          <div className="summary-value">
            ₦{stats.pos_sales.toLocaleString()}
          </div>

          <div className="summary-footer">
            {stats.pos_percentage}% of total sales
          </div>

        </div>


        {/* TRANSFER */}

        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-icon purple">
              <FaExchangeAlt />
            </div>

            <span className="trend positive">
              <FaArrowUp />
              {stats.transfer_percentage}%
            </span>

          </div>

          <div className="summary-label">
            Transfer
          </div>

          <div className="summary-value">
            ₦{stats.transfer_sales.toLocaleString()}
          </div>

          <div className="summary-footer">
            {stats.transfer_percentage}% of total sales
          </div>

        </div>


      </div>

    </div>
  );
}

