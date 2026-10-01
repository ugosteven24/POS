import React from 'react'
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building2,
  Users,
  Wallet,
  ShoppingCart,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Ban,
  Filter,
} from "lucide-react";
import { getSupplierStats } from "@/services/suppliers/supplierService";
export default function Stats() {
    const [totalSuppliers, setTotalSuppliers] = useState(0);
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [totalPurchases, setTotalPurchases] = useState(0);
    const [outstandingBalance, setOutstandingBalance] = useState(0);
    const [statsLoading, setStatsLoading] = useState(true);

      // ==========================================
  // FORMAT MONEY
  // ==========================================

  const money = (value) => {
    return `₦${Number(value).toLocaleString()}`;
  };

    useEffect(() => {
        async function loadStats() {
            try {
                setStatsLoading(true);

                const result = await getSupplierStats();

                if (result.success) {
                    setTotalSuppliers(
                        result.data.totalSuppliers
                    );

                    setActiveSuppliers(
                        result.data.activeSuppliers
                    );

                    setTotalPurchases(
                        result.data.totalPurchases
                    );

                    setOutstandingBalance(
                        result.data.outstandingBalance
                    );
                } else {
                    console.error(result.message);
                }

            } catch (error) {
                console.error(
                    "Failed to load supplier stats:",
                    error
                );
            } finally {
                setStatsLoading(false);
            }
        }

        loadStats();
    }, []);
    return (
        <>
            {/* ======================================
          STATISTICS
      ====================================== */}

            <div className="supplier-stat-grid">


                <div className="supplier-stat-card">

                    <div className="supplier-stat-icon blue">
                        <Users size={17} />
                    </div>

                    <div>

                        <span>
                            Total Suppliers
                        </span>

                        <strong>
                            {totalSuppliers}
                        </strong>

                    </div>

                </div>


                <div className="supplier-stat-card">

                    <div className="supplier-stat-icon green">
                        <CheckCircle2 size={17} />
                    </div>

                    <div>

                        <span>
                            Active Suppliers
                        </span>

                        <strong>
                            {activeSuppliers}
                        </strong>

                    </div>

                </div>


                <div className="supplier-stat-card">

                    <div className="supplier-stat-icon purple">
                        <ShoppingCart size={17} />
                    </div>

                    <div>

                        <span>
                            Total Purchases
                        </span>

                        <strong>
                            {money(totalPurchases)}
                        </strong>

                    </div>

                </div>


                <div className="supplier-stat-card">

                    <div className="supplier-stat-icon orange">
                        <Wallet size={17} />
                    </div>

                    <div>

                        <span>
                            Outstanding Balance
                        </span>

                        <strong>
                            {money(outstandingBalance)}
                        </strong>

                    </div>

                </div>

            </div>

        </>
    )
}
