
"use client";

import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  UserX,
  Wallet,
} from "lucide-react";

import  {getCustomerStats}  from "@/services/customers/customerService";


const formatCurrency = (value) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;


export default function Stats() {

  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    outstandingBalance: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadStats = async () => {

      try {

        const result = await getCustomerStats();

        if (result.success) {
          setStats(result.data);
        }

      } catch (error) {

        console.error(
          "Failed to load customer stats:",
          error
        );

      } finally {

        setLoading(false);

      }
    };


    loadStats();

  }, []);


  return (
    <div className="customer-stats">

      {/* TOTAL CUSTOMERS */}

      <div className="customer-stat-card">

        <div className="stat-icon blue">
          <Users size={17} />
        </div>

        <div className="stat-info">

          <span>Total Customers</span>

          <strong>
            {loading
              ? "..."
              : stats.totalCustomers}
          </strong>

          <small>
            All registered customers
          </small>

        </div>

      </div>


      {/* ACTIVE CUSTOMERS */}

      <div className="customer-stat-card">

        <div className="stat-icon green">
          <UserCheck size={17} />
        </div>

        <div className="stat-info">

          <span>Active Customers</span>

          <strong>
            {loading
              ? "..."
              : stats.activeCustomers}
          </strong>

          <small className="positive">
            Currently active
          </small>

        </div>

      </div>


      {/* INACTIVE CUSTOMERS */}

      <div className="customer-stat-card">

        <div className="stat-icon orange">
          <UserX size={17} />
        </div>

        <div className="stat-info">

          <span>Inactive Customers</span>

          <strong>
            {loading
              ? "..."
              : stats.inactiveCustomers}
          </strong>

          <small>
            No recent activity
          </small>

        </div>

      </div>


      {/* OUTSTANDING BALANCE */}

      <div className="customer-stat-card">

        <div className="stat-icon purple">
          <Wallet size={17} />
        </div>

        <div className="stat-info">

          <span>Outstanding Balance</span>

          <strong>
            {loading
              ? "..."
              : formatCurrency(
                  stats.outstandingBalance
                )}
          </strong>

          <small>
            Customer credit
          </small>

        </div>

      </div>

    </div>
  );
}
