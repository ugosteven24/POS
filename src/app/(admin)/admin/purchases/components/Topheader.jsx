import React from 'react'
import {

    Plus,
    Download,
    ShoppingCart,
} from "react";
export default function Topheader() {


    return (
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

                <button
                    className="purchase-add"
                    onClick={() =>
                        alert(
                            "Open New Purchase page"
                        )
                    }
                >

                    <Plus size={15} />

                    New Purchase

                </button>

            </div>

        </div>
    )
}

