import {
  Download,
  ShoppingCart,
} from "lucide-react";



import "./all-purchases.css";
import Stats from "./components/Stats";
import TableData from "./components/TableData";


// ============================================================
// ALL PURCHASES PAGE
// ============================================================

export default  function AllPurchases() {


  return (

    <div className="purchases-page content-wrapper">


      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="purchases-header">

        <div>

          <div className="purchases-breadcrumb">

            <span>
              Purchases
            </span>

            <span>
              /
            </span>

            <strong>
              All Purchases
            </strong>

          </div>


          <div className="purchases-title">

            <div className="purchases-title-icon">

              <ShoppingCart
                size={20}
              />

            </div>


            <div>

              <h1>
                All Purchases
              </h1>

              <p>
                Manage purchase orders and
                inventory purchases.
              </p>

            </div>

          </div>

        </div>


        <div className="purchases-header-actions">


          {/* REFRESH */}

      

          {/* EXPORT */}

          <button
            className="purchase-export"
        
          >

            <Download
              size={14}
            />

            Export

          </button>


          {/* NEW PURCHASE */}


        </div>

      </div>


      {/* ======================================================
          STATISTICS
      ======================================================= */}

      <Stats/>

      <TableData/>


    </div>

  );

}

