"use client";

import React, {
    useEffect,
    useState,
} from "react";

import {
    Package,
    AlertTriangle,
    XCircle,
    CheckCircle2,
} from "lucide-react";

import { getProductStats } from "@/services/products/get"


// ============================================================
// FORMAT CURRENCY
// ============================================================


// ============================================================
// PRODUCTS PAGE
// ============================================================

export default function Stats() {

    const [stats, setStats] = useState({
        total_products: 0,
        in_stock: 0,
        low_stock: 0,
        out_of_stock: 0,
    });

    async function loadallproducts() {
        const data = await GetallData();
        setProducts(data);

    }

    useEffect(() => {

        async function loadStats() {

            try {

                const data = await getProductStats();

                console.log("PRODUCT STATS:", data);

                setStats(data);

            } catch (error) {

                console.error(
                    "Failed to load product statistics:",
                    error
                );

            }

        }

        loadStats();

    }, []);

    useEffect(() => {
        loadallproducts()

    }, [])





    return (

        <>




            {/* ====================================================
          STATISTICS
      ==================================================== */}

            <div className="products-stats">


                <div className="product-stat-card">

                    <div className="product-stat-icon blue">

                        <Package size={21} />

                    </div>


                    <div>

                        <span>
                            Products Loaded
                        </span>

                        <h2>
                            {stats?.total_products || 0}
                        </h2>

                        <small>
                            Loaded products
                        </small>

                    </div>

                </div>


                <div className="product-stat-card">

                    <div className="product-stat-icon green">

                        <CheckCircle2 size={21} />

                    </div>


                    <div>

                        <span>
                            In Stock
                        </span>

                        <h2>
                            {stats?.in_stock || 0}
                        </h2>

                        <small>
                            Loaded products
                        </small>

                    </div>

                </div>


                <div className="product-stat-card">

                    <div className="product-stat-icon orange">

                        <AlertTriangle size={21} />

                    </div>


                    <div>

                        <span>
                            Low Stock
                        </span>

                        <h2>
                            {stats?.low_stock || 0}
                        </h2>

                        <small>
                            Needs restocking
                        </small>

                    </div>

                </div>


                <div className="product-stat-card">

                    <div className="product-stat-icon red">

                        <XCircle size={21} />

                    </div>


                    <div>

                        <span>
                            Out of Stock
                        </span>

                        <h2>
                            {stats?.out_of_stock || 0}
                        </h2>

                        <small>
                            Loaded products
                        </small>

                    </div>

                </div>


                <div className="product-stat-card inventory-value">

                    <div className="product-stat-icon purple">

                        <span>
                            ₦
                        </span>

                    </div>


                    <div>

                        <span>
                            Inventory Value
                        </span>

                        <h2>
                            {/* {formatCurrency(
                totalInventoryValue
              )} */}
                        </h2>

                        <small>
                            Loaded products at cost
                        </small>

                    </div>

                </div>

            </div>




        </>

    );

}