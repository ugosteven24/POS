import {
  ShoppingCart,
  CheckCircle2,
  Clock3,
  RotateCcw,
  CreditCard,
  DollarSign,
} from "lucide-react";

import {getPurchaseReturnStats} from "@/services/purchases/purchaseReturnService";

const formatCurrency = (amount) => {
  return `₦${amount.toLocaleString("en-NG")}`;
};
export default async function Stats() {

  const stats = await getPurchaseReturnStats();
  
  const totalReturns = stats.total_returns;
  const completedReturns = stats.completed_returns;
  const pendingReturns = stats.pending_returns;
  const totalValue = stats.total_value;

  return (
    <>
      {/* =================================
          STATISTICS
      ================================= */}

      <div className="return-statistics">

        <div className="stat-card">

          <div className="stat-icon blue">
            <RotateCcw size={17} />
          </div>

          <div className="stat-content">
            <span>Total Returns</span>
            <strong>{totalReturns}</strong>
          </div>

          <div className="stat-trend">
            This month
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={17} />
          </div>

          <div className="stat-content">
            <span>Completed</span>
            <strong>{completedReturns}</strong>
          </div>

          <div className="stat-trend positive">
            Processed
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon orange">
            <Clock3 size={17} />
          </div>

          <div className="stat-content">
            <span>Pending</span>
            <strong>{pendingReturns}</strong>
          </div>

          <div className="stat-trend warning">
            Requires action
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon purple">
            <DollarSign size={17} />
          </div>

          <div className="stat-content">
            <span>Return Value</span>
            <strong>{formatCurrency(totalValue)}</strong>
          </div>

          <div className="stat-trend">
            Total value
          </div>

        </div>

      </div>

    </>
 )
}