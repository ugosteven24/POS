"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Search,
  Eye,
  Edit3,
  Trash2,
  MoreHorizontal,
  ShoppingCart,
  Package,
  CheckCircle2,
  Clock3,
  XCircle,
  CreditCard,
  ChevronDown,
  X,
  FileText,
  Truck,
  CalendarDays,
  DollarSign,
  Loader2,
} from "lucide-react";
import { getPurchases, deactivatePurchase } from "@/services/purchases/get";


export default function TableData() {

 


  // ==========================================================
  // PURCHASES
  // ==========================================================

  const [purchases, setPurchases] =useState([]);


  // ==========================================================
  // SEARCH
  // ==========================================================

  const [search, setSearch] =
    useState("");


  // ==========================================================
  // LOADING
  // ==========================================================

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);


  // ==========================================================
  // INFINITE SCROLL
  // ==========================================================

  const [page, setPage] =useState(1);

  const [hasMore, setHasMore] =useState(true);

  const LIMIT = 20;

  const observerRef =useRef(null);


  // ==========================================================
  // FILTERS
  // ==========================================================

  const [statusFilter, setStatusFilter] =useState("All");

  const [paymentFilter, setPaymentFilter] =useState("All");

  const [dateFilter, setDateFilter] = useState("");

  const [warehouseFilter, setWarehouseFilter] =useState("All");


  // ==========================================================
  // VIEW MODAL
  // ==========================================================

  const [selectedPurchase, setSelectedPurchase] =
    useState(null);


  // ==========================================================
  // ACTION MENU
  // ==========================================================

  const [showMenu, setShowMenu] =
    useState(null);


  // ==========================================================
  // DELETE MODAL
  // ==========================================================

  const [showDeleteModal, setShowDeleteModal] =
    useState(null);
  const [purchaseId, setPurchaseId] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);


  // ==========================================================
  // MONEY
  // ==========================================================

  const money = (value) => {

    const amount =
      Number(value || 0);

    return `₦${amount.toLocaleString()}`;

  };


  // ==========================================================
  // FORMAT PURCHASE
  // ==========================================================

  const formatPurchase =
    useCallback((purchase) => {

      const total =
        Number(
          purchase.total || 0
        );


      const paid =
        Number(
          purchase.paid || 0
        );


      const balance =
        purchase.balance !== undefined
          ? Number(
            purchase.balance || 0
          )
          : Math.max(
            total - paid,
            0
          );


      // ======================================================
      // PAYMENT
      // ======================================================

      let payment =
        purchase.payment;


      if (!payment) {

        if (paid <= 0) {

          payment = "Unpaid";

        } else if (
          paid < total
        ) {

          payment = "Partial";

        } else {

          payment = "Paid";

        }

      }


      // ======================================================
      // STATUS
      // ======================================================

      let status =
        purchase.status || "Pending";


      status =
        String(status)
          .toLowerCase();


      if (
        status === "completed"
      ) {

        status = "Received";

      } else {

        status =
          status.charAt(0).toUpperCase() +
          status.slice(1);

      }


      // ======================================================
      // DATE
      // ======================================================

      let formattedDate =
        "—";


      if (
        purchase.purchase_date
      ) {

        const date =
          new Date(
            purchase.purchase_date
          );


        if (
          !Number.isNaN(
            date.getTime()
          )
        ) {

          formattedDate =
            date.toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );

        }

      }


      // ======================================================
      // RETURN
      // ======================================================

      return {

        ...purchase,

        id:
          purchase.id,

        purchaseId:
          purchase.purchase_id ||
          purchase.invoice_number ||
          purchase.id,

        date:
          formattedDate,

        supplier:
          purchase.supplier_name ||
          purchase.supplier ||
          "Unknown Supplier",

        supplierPhone:
          purchase.supplier_phone ||
          purchase.supplierPhone ||
          "",

        items:
          Number(
            purchase.items_count ||
            purchase.items ||
            0
          ),

        quantity:
          Number(
            purchase.total_quantity ||
            purchase.quantity ||
            0
          ),

        subtotal:
          Number(
            purchase.subtotal || 0
          ),

        discount:
          Number(
            purchase.discount || 0
          ),

        tax:
          Number(
            purchase.tax || 0
          ),

        // Your current purchases table
        // does not contain shipping.
        shipping:
          Number(
            purchase.shipping || 0
          ),

        total,

        paid,

        balance,

        payment,

        status,

        createdBy:
          purchase.created_by ||
          purchase.createdBy ||
          "Admin",

        warehouse:
          purchase.warehouse_name ||
          purchase.warehouse ||
          "Main Store",

      };

    }, []);


  // ==========================================================
  // FETCH PURCHASES
  // ==========================================================

  const fetchPurchases =
    useCallback(
      async (
        pageNumber = 1,
        append = false
      ) => {

        try {

          if (append) {

            setLoadingMore(true);

          } else {

            setLoading(true);

          }


          // ==================================================
          // SERVER ACTION
          // ==================================================

          const result =
            await getPurchases({

              page:
                pageNumber,

              limit:
                LIMIT,

              search,

              status:
                statusFilter,

              payment:
                paymentFilter,

              date:
                dateFilter,

              warehouse:
                warehouseFilter,

            });


          if (
            !result.success
          ) {

            throw new Error(
              result.message ||
              "Failed to fetch purchases."
            );

          }


          const newPurchases =
            (
              result.purchases ||
              []
            ).map(
              formatPurchase
            );


          // ==================================================
          // APPEND
          // ==================================================

          if (append) {

            setPurchases(
              (current) => {

                const existingIds =
                  new Set(
                    current.map(
                      (purchase) =>
                        String(
                          purchase.id
                        )
                    )
                  );


                const uniquePurchases =
                  newPurchases.filter(
                    (purchase) =>
                      !existingIds.has(
                        String(
                          purchase.id
                        )
                      )
                  );


                return [
                  ...current,
                  ...uniquePurchases,
                ];

              }
            );

          } else {

            setPurchases(
              newPurchases
            );

          }


          // ==================================================
          // PAGINATION
          // ==================================================

          setHasMore(
            result.pagination?.hasMore ??
            newPurchases.length >= LIMIT
          );


          setPage(
            pageNumber
          );


        } catch (error) {

          console.error(
            "Fetch purchases error:",
            error
          );


        


        } finally {

          setLoading(false);

          setLoadingMore(false);

        }

      },
      [
        search,
        statusFilter,
        paymentFilter,
        dateFilter,
        warehouseFilter,
        formatPurchase,
      
      ]
    );


  // ==========================================================
  // INITIAL LOAD + FILTER CHANGES
  // ==========================================================

  useEffect(() => {

    setPurchases([]);

    setPage(1);

    setHasMore(true);

    fetchPurchases(
      1,
      false
    );

  }, [
    search,
    statusFilter,
    paymentFilter,
    dateFilter,
    warehouseFilter,
  ]);


  // ==========================================================
  // LOAD MORE
  // ==========================================================

  const loadMore =
    useCallback(() => {

      if (
        loading ||
        loadingMore ||
        !hasMore
      ) {

        return;

      }


      fetchPurchases(
        page + 1,
        true
      );

    }, [
      loading,
      loadingMore,
      hasMore,
      page,
      fetchPurchases,
    ]);


  // ==========================================================
  // INFINITE SCROLL
  // ==========================================================

  const lastPurchaseRef =
    useCallback(
      (node) => {

        if (loadingMore) {
          return;
        }


        if (observerRef.current) {

          observerRef.current.disconnect();

        }


        observerRef.current =
          new IntersectionObserver(
            (entries) => {

              if (
                entries[0]?.isIntersecting &&
                hasMore &&
                !loading &&
                !loadingMore
              ) {

                loadMore();

              }

            },
            {
              root: null,

              rootMargin:
                "400px",

              threshold: 0,
            }
          );


        if (node) {

          observerRef.current.observe(
            node
          );

        }

      },
      [
        loadingMore,
        hasMore,
        loading,
        loadMore,
      ]
    );


  // ==========================================================
  // CLEANUP OBSERVER
  // ==========================================================

  useEffect(() => {

    return () => {

      if (
        observerRef.current
      ) {

        observerRef.current.disconnect();

      }

    };

  }, []);



  const handleDate = (e) => {
    setDateFilter(e.target.value);
    setPage(1);
  };

  // ==========================================================
  // REFRESH
  // ==========================================================



  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  const clearFilters = () => {

    setSearch("");

    setStatusFilter("All");

    setPaymentFilter("All");

    setDateFilter("");

    setWarehouseFilter("All");

  };


  // ==========================================================
  // DELETE PURCHASE
  // ==========================================================

  // ==========================================================
  // DELETE PURCHASE
  // ==========================================================

  const deletePurchase = async () => {
    if (!showDeleteModal) {
      return;
    }

    try {
      setDeleting(true);

      // The ID selected in the delete confirmation modal
      // const purchaseId = showDeleteModal;
      console.log("Deleting purchase with ID:", purchaseId);

      const result = await deactivatePurchase(
        purchaseId
      );

      if (!result?.success) {
     

        return;
      }

      // Remove the deleted purchase from the UI immediately
      setPurchases((currentPurchases) =>
        currentPurchases.filter(
          (purchase) =>
            String(purchase.id) !==
            String(purchaseId)
        )
      );

      // Close delete modal
      setShowDeleteModal(null);

      // Close details modal if the same purchase is open
      if (
        selectedPurchase &&
        String(selectedPurchase.id) ===
        String(purchaseId)
      ) {
        setSelectedPurchase(null);
      }

      // Close action menu
      setShowMenu(null);

     

    } catch (error) {
      console.error(
        "Error deleting purchase:",
        error
      );

     

    } finally {
      setDeleting(false);
    }
  };


  // ==========================================================
  // EXPORT
  // ==========================================================

  const exportPurchases = () => {

    if (
      purchases.length === 0
    ) {
      return;

    }


    const headers = [
      "Purchase ID",
      "Date",
      "Supplier",
      "Items",
      "Quantity",
      "Subtotal",
      "Discount",
      "Tax",
      "Shipping",
      "Total",
      "Paid",
      "Balance",
      "Payment",
      "Status",
      "Created By",
      "Warehouse",
    ];


    const rows =
      purchases.map(
        (purchase) => [

          purchase.id,

          purchase.date,

          purchase.supplier,

          purchase.items,

          purchase.quantity,

          purchase.subtotal,

          purchase.discount,

          purchase.tax,

          purchase.shipping,

          purchase.total,

          purchase.paid,

          purchase.balance,

          purchase.payment,

          purchase.status,

          purchase.createdBy,

          purchase.warehouse,

        ]
      );


    const csv = [

      headers.join(","),

      ...rows.map(
        (row) =>
          row
            .map(
              (value) =>
                `"${String(
                  value ?? ""
                ).replace(
                  /"/g,
                  '""'
                )}"`
            )
            .join(",")
      ),

    ].join("\n");


    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );


    link.href = url;

    link.download =
      "purchases.csv";


    document.body.appendChild(
      link
    );

    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );

  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <>
      {/* ======================================================
          FILTERS
      ======================================================= */}

      <div className="purchase-filter-card">


        {/* SEARCH */}

        <div className="purchase-search">

          <Search size={15} />

          <input
            value={search}
            placeholder="Search purchase ID, supplier..."
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          {search && (

            <button
              onClick={() =>
                setSearch("")
              }
            >

              <X size={13} />

            </button>

          )}

        </div>


        {/* DATE */}

        <div className="filter-input">
          <input
            type="date"
            value={dateFilter}
            onChange={handleDate}
          />

        </div>


        {/* STATUS */}

        <div className="purchase-filter-select">

          <Package size={13} />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Received">
              Received
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

          <ChevronDown size={12} />

        </div>


        {/* PAYMENT */}

        <div className="purchase-filter-select">

          <CreditCard size={13} />

          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Payments
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Partial">
              Partial
            </option>

            <option value="Unpaid">
              Unpaid
            </option>

          </select>

          <ChevronDown size={12} />

        </div>


        {/* WAREHOUSE */}

        <div className="purchase-filter-select">

          <Truck size={13} />

          <select
            value={warehouseFilter}
            onChange={(e) =>
              setWarehouseFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Locations
            </option>

            <option value="Main Store">
              Main Store
            </option>

            <option value="Warehouse">
              Warehouse
            </option>

          </select>

          <ChevronDown size={12} />

        </div>


        {/* CLEAR */}

        <button
          className="purchase-clear"
          onClick={
            clearFilters
          }
        >
          Clear
        </button>

      </div>


      {/* ======================================================
          TABLE CARD
      ======================================================= */}

      <div className="purchase-table-card">


        {/* HEADER */}

        <div className="purchase-table-header">

          <div>

            <h2>
              Purchase Records
            </h2>

            <p>
              View and manage all purchase
              transactions.
            </p>

          </div>


          <div className="purchase-count">

            {purchases.length}

            {" "}

            purchases

          </div>

        </div>


        {/* ====================================================
            TABLE
        ===================================================== */}

        <div className="purchase-table-wrapper">

          {loading ? (

            <div className="purchase-loading">

              <Loader2
                size={25}
                className="purchase-spin"
              />

              <strong>
                Loading purchases...
              </strong>

              <span>
                Please wait.
              </span>

            </div>

          ) : (

            <table className="purchase-table">

              <thead>

                <tr>

                  <th>PURCHASE</th>

                  <th>DATE</th>

                  <th>SUPPLIER</th>

                  <th>ITEMS</th>

                  <th>TOTAL</th>

                  <th>PAYMENT</th>

                  <th>STATUS</th>

                  <th>LOCATION</th>

                  <th>ACTION</th>

                </tr>

              </thead>


              <tbody>

                {purchases.map(
                  (
                    purchase,
                    index
                  ) => {

                    const isLast =
                      index ===
                      purchases.length - 1;


                    return (

                      <tr
                        key={
                          purchase.id
                        }
                        ref={
                          isLast
                            ? lastPurchaseRef
                            : null
                        }
                      >

                        {/* PURCHASE */}

                        <td>

                          <div className="purchase-id">

                            <div className="purchase-id-icon">

                              <FileText
                                size={14}
                              />

                            </div>


                            <div>

                              <strong>
                                {
                                  purchase.invoice_number ||
                                  purchase.id
                                }
                              </strong>

                              <span>
                                By{" "}
                                {
                                  purchase.createdBy
                                }
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* DATE */}

                        <td>

                          <div className="purchase-date">

                            <strong>
                              {
                                purchase.date
                              }
                            </strong>

                            <span>
                              Purchase date
                            </span>

                          </div>

                        </td>


                        {/* SUPPLIER */}

                        <td>

                          <div className="purchase-supplier">

                            <strong>
                              {
                                purchase.supplier
                              }
                            </strong>

                            {purchase.supplierPhone && (

                              <span>
                                {
                                  purchase.supplierPhone
                                }
                              </span>

                            )}

                          </div>

                        </td>


                        {/* ITEMS */}

                        <td>

                          <div className="purchase-items">

                            <strong>
                              {
                                purchase.items
                              }
                            </strong>

                            <span>
                              {
                                purchase.quantity
                              }{" "}
                              units
                            </span>

                          </div>

                        </td>


                        {/* TOTAL */}

                        <td>

                          <div className="purchase-total">

                            <strong>
                              {money(
                                purchase.total
                              )}
                            </strong>


                            {purchase.balance > 0 && (

                              <span>

                                Due{" "}

                                {money(
                                  purchase.balance
                                )}

                              </span>

                            )}

                          </div>

                        </td>


                        {/* PAYMENT */}

                        <td>

                          <span
                            className={`payment-badge ${String(
                              purchase.payment
                            ).toLowerCase()}`}
                          >

                            {purchase.payment ===
                              "Paid" && (

                                <CheckCircle2
                                  size={11}
                                />

                              )}


                            {purchase.payment ===
                              "Partial" && (

                                <Clock3
                                  size={11}
                                />

                              )}


                            {purchase.payment ===
                              "Unpaid" && (

                                <XCircle
                                  size={11}
                                />

                              )}

                            {
                              purchase.payment
                            }

                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`purchase-status ${String(
                              purchase.status
                            ).toLowerCase()}`}
                          >

                            {purchase.status ===
                              "Received" && (

                                <CheckCircle2
                                  size={11}
                                />

                              )}


                            {purchase.status ===
                              "Pending" && (

                                <Clock3
                                  size={11}
                                />

                              )}


                            {purchase.status ===
                              "Cancelled" && (

                                <XCircle
                                  size={11}
                                />

                              )}

                            {
                              purchase.status
                            }

                          </span>

                        </td>


                        {/* LOCATION */}

                        <td>

                          <div className="purchase-location">

                            <Truck
                              size={12}
                            />

                            {
                              purchase.warehouse
                            }

                          </div>

                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="purchase-actions">


                            {/* VIEW */}

                            <button
                              title="View"
                              onClick={() =>
                                setSelectedPurchase(
                                  purchase
                                )
                              }
                            >

                              <Eye size={14} />

                            </button>


                            {/* EDIT */}
                            <button
                              className="View"
                              onClick={() => {
                                setPurchaseId(purchase.id);
                                setShowDeleteModal(
                                  purchase.id
                                );
                              

                              }}
                            >

                              <Trash2
                              className="text-red"
                                size={13}
                              />

                          

                            </button>


                            {/* MORE */}

                            <button
                              title="More"
                              onClick={() =>
                                setShowMenu(
                                  showMenu ===
                                    purchase.id
                                    ? null
                                    : purchase.id
                                )
                              }
                            >

                              <MoreHorizontal
                                size={14}
                              />

                            </button>


                            {/* MENU */}

                            {showMenu ===
                              purchase.id && (

                                <div className="purchase-action-menu">

                                  <button
                                    onClick={() => {

                                      setSelectedPurchase(
                                        purchase
                                      );

                                      setShowMenu(
                                        null
                                      );

                                    }}
                                  >

                                    <Eye size={13} />

                                    View Details

                                  </button>


                                  <button
                                    onClick={() => {

                                      alert(
                                        `Print ${purchase.id}`
                                      );

                                      setShowMenu(
                                        null
                                      );

                                    }}
                                  >

                                    <FileText
                                      size={13}
                                    />

                                    Print Purchase

                                  </button>


                                  <button
                                    className="danger"
                                    onClick={() => {
                                      setPurchaseId(purchase.id);

                                      setShowDeleteModal(
                                        purchase.id
                                      );

                                      setShowMenu(
                                        null
                                      );

                                    }}
                                  >

                                    <Trash2
                                      size={13}
                                    />

                                    Delete

                                  </button>

                                </div>

                              )}

                          </div>

                        </td>

                      </tr>

                    );

                  }
                )}


                {/* EMPTY */}

                {purchases.length === 0 && (

                  <tr>

                    <td
                      colSpan="9"
                      className="purchase-empty"
                    >

                      <ShoppingCart
                        size={30}
                      />

                      <strong>
                        No purchases found
                      </strong>

                      <span>
                        Try changing your search
                        or filters.
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          )}

        </div>


        {/* ====================================================
            LOADING MORE
        ===================================================== */}

        {!loading &&
          loadingMore && (

            <div className="purchase-load-more">

              <Loader2
                size={18}
                className="purchase-spin"
              />

              <span>
                Loading more purchases...
              </span>

            </div>

          )}


        {/* ====================================================
            END
        ===================================================== */}

        {!loading &&
          !loadingMore &&
          !hasMore &&
          purchases.length > 0 && (

            <div className="purchase-load-more">

              <span>
                You have reached the end of
                the purchases.
              </span>

            </div>

          )}


        {/* ====================================================
            FOOTER
        ===================================================== */}

        <div className="purchase-pagination">

          <span>

            Showing{" "}

            <strong>
              {
                purchases.length
              }
            </strong>

            {" "}loaded purchases

          </span>

        </div>

      </div>


      {/* ======================================================
          PURCHASE DETAILS MODAL
      ======================================================= */}

      {selectedPurchase && (

        <div
          className="purchase-modal-overlay"
          onClick={() =>
            setSelectedPurchase(
              null
            )
          }
        >

          <div
            className="purchase-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="purchase-modal-header">

              <div>

                <div className="purchase-modal-icon">

                  <FileText size={17} />

                </div>


                <div>

                  <h2>
                    Purchase Details
                  </h2>

                  <span>
                    {
                      selectedPurchase.invoice_number ||
                      selectedPurchase.id
                    }
                  </span>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedPurchase(
                    null
                  )
                }
              >

                <X size={16} />

              </button>

            </div>


            {/* CONTENT */}

            <div className="purchase-modal-content">


              {/* SUPPLIER */}

              <div className="purchase-detail-section">

                <div className="purchase-detail-heading">

                  <Truck size={14} />

                  Supplier

                </div>


                <div className="supplier-detail-box">

                  <div>

                    <strong>
                      {
                        selectedPurchase.supplier
                      }
                    </strong>

                    {selectedPurchase.supplierPhone && (

                      <span>
                        {
                          selectedPurchase.supplierPhone
                        }
                      </span>

                    )}

                  </div>


                  <span>
                    {
                      selectedPurchase.warehouse
                    }
                  </span>

                </div>

              </div>


              {/* SUMMARY */}

              <div className="purchase-detail-section">

                <div className="purchase-detail-heading">

                  <Package size={14} />

                  Purchase Summary

                </div>


                <div className="purchase-summary-grid">


                  <div>

                    <span>
                      Items
                    </span>

                    <strong>
                      {
                        selectedPurchase.items
                      }
                    </strong>

                  </div>


                  <div>

                    <span>
                      Quantity
                    </span>

                    <strong>
                      {
                        selectedPurchase.quantity
                      }
                    </strong>

                  </div>


                  <div>

                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {money(
                        selectedPurchase.subtotal
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Discount
                    </span>

                    <strong>
                      {money(
                        selectedPurchase.discount
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Tax
                    </span>

                    <strong>
                      {money(
                        selectedPurchase.tax
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Shipping
                    </span>

                    <strong>
                      {money(
                        selectedPurchase.shipping
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Total
                    </span>

                    <strong className="modal-total">

                      {money(
                        selectedPurchase.total
                      )}

                    </strong>

                  </div>

                </div>

              </div>


              {/* PAYMENT */}

              <div className="purchase-detail-section">

                <div className="purchase-detail-heading">

                  <CreditCard size={14} />

                  Payment

                </div>


                <div className="payment-summary">


                  <div>

                    <span>
                      Paid
                    </span>

                    <strong className="paid-value">

                      {money(
                        selectedPurchase.paid
                      )}

                    </strong>

                  </div>


                  <div>

                    <span>
                      Balance
                    </span>

                    <strong className="balance-value">

                      {money(
                        selectedPurchase.balance
                      )}

                    </strong>

                  </div>


                  <span
                    className={`payment-badge ${String(
                      selectedPurchase.payment
                    ).toLowerCase()}`}
                  >

                    {
                      selectedPurchase.payment
                    }

                  </span>

                </div>

              </div>


              {/* META */}

              <div className="purchase-meta-grid">


                <div>

                  <span>
                    Purchase Date
                  </span>

                  <strong>
                    {
                      selectedPurchase.date
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Created By
                  </span>

                  <strong>
                    {
                      selectedPurchase.createdBy
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {
                      selectedPurchase.warehouse
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Status
                  </span>

                  <strong>
                    {
                      selectedPurchase.status
                    }
                  </strong>

                </div>

              </div>

            </div>


            {/* FOOTER */}

            <div className="purchase-modal-footer">

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedPurchase(
                    null
                  )
                }
              >

                Close

              </button>


              <button
                className="modal-print-btn"
                onClick={() =>
                  alert(
                    `Printing ${selectedPurchase.id}`
                  )
                }
              >

                <FileText size={13} />

                Print Purchase

              </button>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          DELETE MODAL
      ======================================================= */}

      {showDeleteModal && (

        <div
          className="purchase-modal-overlay"
          onClick={() => {

            if (!deleting) {

              setShowDeleteModal(
                null
              );

            }

          }}
        >

          <div
            className="purchase-delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* ICON */}

            <div className="delete-icon">

              <Trash2 size={18} />

            </div>


            {/* TITLE */}

            <h2>
              Delete Purchase?
            </h2>


            {/* MESSAGE */}

            <p>

              Are you sure you want
              to delete{" "}

              <strong>
                {
                  purchases.find(
                    (purchase) =>
                      String(
                        purchase.id
                      ) ===
                      String(
                        showDeleteModal
                      )
                  )?.id ||
                  showDeleteModal
                }
              </strong>

              ?

              <br />

              This action cannot be undone.

            </p>


            {/* ACTIONS */}

            <div className="delete-actions">


              <button
                onClick={() =>
                  setShowDeleteModal(
                    null
                  )
                }
                disabled={
                  deleting
                }
              >

                Cancel

              </button>


              <button
                className="delete-confirm"
                onClick={
                  deletePurchase
                }
                disabled={
                  deleting
                }
              >

                {deleting ? (

                  <>

                    <Loader2
                      size={14}
                      className="purchase-spin"
                    />

                    Deleting...

                  </>

                ) : (

                  <>

                    <Trash2 size={13} />

                    Delete Purchase

                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}