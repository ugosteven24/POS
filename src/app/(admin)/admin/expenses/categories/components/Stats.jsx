"use server"

import {
    Receipt,
    CheckCircle,
    XCircle,
    FolderOpen,
} from "lucide-react";

import {getExpenseCategoryStats} from "@/services/expenses/expenseService"


const formatCurrency = (value) => {
    return `₦${Number(value || 0).toLocaleString("en-NG")}`;
};
export default async function Stats() {
    const stats = await getExpenseCategoryStats()
    return (
        <>

            {/* ==================================================
          STATISTICS
      ================================================== */}

            <div className="expense-category-stats">


                <div className="expense-category-stat-card">

                    <div className="expense-stat-icon blue">
                        <FolderOpen size={17} />
                    </div>

                    <div className="expense-stat-info">

                        <span>
                            Total Categories
                        </span>

                        <strong>
                            {stats.total}
                        </strong>

                        <small>
                            All expense categories
                        </small>

                    </div>

                </div>


                <div className="expense-category-stat-card">

                    <div className="expense-stat-icon green">
                        <CheckCircle size={17} />
                    </div>

                    <div className="expense-stat-info">

                        <span>
                            Active Categories
                        </span>

                        <strong>
                            {stats.active}
                        </strong>

                        <small>
                            Currently active
                        </small>

                    </div>

                </div>


                <div className="expense-category-stat-card">

                    <div className="expense-stat-icon orange">
                        <XCircle size={17} />
                    </div>

                    <div className="expense-stat-info">

                        <span>
                            Inactive Categories
                        </span>

                        <strong>
                            {stats.inactive}
                        </strong>

                        <small>
                            Currently inactive
                        </small>

                    </div>

                </div>


                <div className="expense-category-stat-card">

                    <div className="expense-stat-icon purple">
                        <Receipt size={17} />
                    </div>

                    <div className="expense-stat-info">

                        <span>
                            Total Expenses
                        </span>

                        <strong>
                            {formatCurrency(stats.total)}
                        </strong>

                        <small>
                            Across all categories
                        </small>

                    </div>

                </div>

            </div>


        </>
    )
}
