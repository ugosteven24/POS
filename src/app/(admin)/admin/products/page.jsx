"use client";
import "./all-products.css";


import Topheader from "./components/Topheader";
import Stats from "./components/Stats";
import TableData from "./components/TableData";

// ============================================================
// FORMAT CURRENCY
// ============================================================



// ============================================================
// PRODUCTS PAGE
// ============================================================

export default function AllProducts() {



  return (

    <div className="products-page content-wrapper">

      <Topheader/>


      {/* ====================================================
          STATISTICS
      ==================================================== */}

      <Stats/>


      {/* ====================================================
          PRODUCTS CARD
      ==================================================== */}
      <TableData/>

    </div>

  );

}