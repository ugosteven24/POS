
import "./purchase-returns.css";
import Link from "next/link";
import Stats from "./components/Stats";
import Topheader from "./components/Topheader";
import Tabledata from "./components/TableData";




export default async function PurchaseReturns() {


  return (
    <div className="purchase-returns-page content-wrapper">
     

      <Stats />
      {/* =================================
          TABLE CARD
      ================================= */}
      <Topheader />

      <Tabledata/>

      
    
    </div>
  );
}
