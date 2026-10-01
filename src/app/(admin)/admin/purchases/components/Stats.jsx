import {
  ShoppingCart,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
} from "lucide-react";

import getPurchaseStats from "@/services/purchases/create";

export default async function Stats() {

  const money = (value) => {
    const amount = Number(value || 0);

    return `₦${amount.toLocaleString()}`;
  };

  const stats = await getPurchaseStats();

  return (
    <div className="purchase-stats">

      {/* TOTAL */}
      <div className="purchase-stat">

        <div className="purchase-stat-icon blue">
          <ShoppingCart size={18} />
        </div>

        <div>
          <span>Total Purchases</span>

          <strong>
            {stats.total}
          </strong>

          <small>
            Loaded purchase records
          </small>
        </div>

      </div>


      {/* RECEIVED */}
      <div className="purchase-stat">

        <div className="purchase-stat-icon green">
          <CheckCircle2 size={18} />
        </div>

        <div>
          <span>Received</span>

          <strong>
            {stats.received}
          </strong>

          <small>
            Completed purchases
          </small>
        </div>

      </div>


      {/* PENDING */}
      <div className="purchase-stat">

        <div className="purchase-stat-icon orange">
          <Clock3 size={18} />
        </div>

        <div>
          <span>Pending</span>

          <strong>
            {stats.pending}
          </strong>

          <small>
            Awaiting delivery
          </small>
        </div>

      </div>


      {/* VALUE */}
      <div className="purchase-stat">

        <div className="purchase-stat-icon purple">
          <DollarSign size={18} />
        </div>

        <div>
          <span>Purchase Value</span>

          <strong>
            {money(stats.purchaseValue)}
          </strong>

          <small>
            Total purchase value
          </small>
        </div>

      </div>


      {/* OUTSTANDING */}
      <div className="purchase-stat">

        <div className="purchase-stat-icon red">
          <CreditCard size={18} />
        </div>

        <div>
          <span>Outstanding</span>

          <strong>
            {money(stats.outstanding)}
          </strong>

          <small>
            Supplier balance
          </small>
        </div>

      </div>

    </div>
  );
}