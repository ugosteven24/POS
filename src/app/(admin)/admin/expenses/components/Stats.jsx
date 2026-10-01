import React from "react";

import {
    Receipt,
    Wallet,
    Clock3,
    TrendingUp,
} from "lucide-react";

import {
    getExpenseStats,
} from "@/services/expenses/expenses";


export default async function Stats() {

    const formatCurrency = (value) => {
        return `₦${Number(value || 0).toLocaleString("en-NG")}`;
    };


    const result = await getExpenseStats();


    const stats = result.success
        ? result.data
        : {
            totalExpenses: 0,
            totalAmount: 0,
            pendingExpenses: 0,
            pendingAmount: 0,
            paidExpenses: 0,
            paidAmount: 0,
        };


    // Average expense

    const averageExpense =
        stats.totalExpenses > 0
            ? stats.totalAmount / stats.totalExpenses
            : 0;


    return (
        <>

            {/* =========================================
                SUMMARY CARDS
            ========================================= */}

            <div className="expense-summary">


                {/* ==================================================
                    TOTAL EXPENSES
                ================================================== */}

                <div className="summary-card">

                    <div className="summary-top">

                        <div className="summary-icon blue">
                            <Receipt size={17} />
                        </div>

                        <span className="summary-label">
                            TOTAL EXPENSES
                        </span>

                    </div>


                    <div className="summary-value">
                        {formatCurrency(
                            stats.totalAmount
                        )}
                    </div>


                    <div className="summary-footer">

                        <TrendingUp size={11} />

                        <span>
                            {stats.totalExpenses} expense{" "}
                            {stats.totalExpenses === 1
                                ? "record"
                                : "records"}
                        </span>

                    </div>

                </div>


                {/* ==================================================
                    PAID EXPENSES
                ================================================== */}

                <div className="summary-card">

                    <div className="summary-top">

                        <div className="summary-icon green">
                            <Wallet size={17} />
                        </div>

                        <span className="summary-label">
                            PAID EXPENSES
                        </span>

                    </div>


                    <div className="summary-value">
                        {formatCurrency(
                            stats.paidAmount
                        )}
                    </div>


                    <div className="summary-footer green-text">

                        <span>
                            {stats.paidExpenses} completed{" "}
                            {stats.paidExpenses === 1
                                ? "payment"
                                : "payments"}
                        </span>

                    </div>

                </div>


                {/* ==================================================
                    PENDING
                ================================================== */}

                <div className="summary-card">

                    <div className="summary-top">

                        <div className="summary-icon orange">
                            <Clock3 size={17} />
                        </div>

                        <span className="summary-label">
                            PENDING
                        </span>

                    </div>


                    <div className="summary-value">
                        {formatCurrency(
                            stats.pendingAmount
                        )}
                    </div>


                    <div className="summary-footer orange-text">

                        <span>
                            {stats.pendingExpenses} awaiting{" "}
                            {stats.pendingExpenses === 1
                                ? "payment"
                                : "payments"}
                        </span>

                    </div>

                </div>


                {/* ==================================================
                    AVERAGE EXPENSE
                ================================================== */}

                <div className="summary-card">

                    <div className="summary-top">

                        <div className="summary-icon purple">
                            <TrendingUp size={17} />
                        </div>

                        <span className="summary-label">
                            AVERAGE EXPENSE
                        </span>

                    </div>


                    <div className="summary-value">
                        {formatCurrency(
                            averageExpense
                        )}
                    </div>


                    <div className="summary-footer">

                        <span>
                            Per expense record
                        </span>

                    </div>

                </div>

            </div>

        </>
    );
}