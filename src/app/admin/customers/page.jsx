
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Wallet,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import "./all-customers.css";

const customersData = [
  {
    id: 1,
    name: "John Okafor",
    phone: "0803 456 7890",
    email: "john.okafor@gmail.com",
    address: "Owerri, Imo State",
    purchases: 42,
    spent: 485000,
    balance: 0,
    status: "Active",
    joined: "Aug 12, 2026",
  },
  {
    id: 2,
    name: "Sarah Williams",
    phone: "0812 345 6789",
    email: "sarah.williams@gmail.com",
    address: "Port Harcourt, Rivers State",
    purchases: 28,
    spent: 327500,
    balance: 15000,
    status: "Active",
    joined: "Aug 08, 2026",
  },
  {
    id: 3,
    name: "Michael Eze",
    phone: "0806 789 1234",
    email: "michael.eze@gmail.com",
    address: "Aba, Abia State",
    purchases: 19,
    spent: 216000,
    balance: 0,
    status: "Active",
    joined: "Jul 29, 2026",
  },
  {
    id: 4,
    name: "Grace Nwosu",
    phone: "0704 321 9876",
    email: "grace.nwosu@gmail.com",
    address: "Owerri, Imo State",
    purchases: 35,
    spent: 394500,
    balance: 25000,
    status: "Active",
    joined: "Jul 25, 2026",
  },
  {
    id: 5,
    name: "David Chukwu",
    phone: "0814 222 4567",
    email: "david.chukwu@gmail.com",
    address: "Umuahia, Abia State",
    purchases: 11,
    spent: 142000,
    balance: 0,
    status: "Inactive",
    joined: "Jul 19, 2026",
  },
  {
    id: 6,
    name: "Emeka Obi",
    phone: "0805 678 2345",
    email: "emeka.obi@gmail.com",
    address: "Owerri, Imo State",
    purchases: 54,
    spent: 625000,
    balance: 12000,
    status: "Active",
    joined: "Jul 14, 2026",
  },
  {
    id: 7,
    name: "Mary Johnson",
    phone: "0901 345 6789",
    email: "mary.johnson@gmail.com",
    address: "Port Harcourt, Rivers State",
    purchases: 23,
    spent: 286000,
    balance: 0,
    status: "Active",
    joined: "Jul 08, 2026",
  },
  {
    id: 8,
    name: "Daniel Nnamdi",
    phone: "0810 987 6543",
    email: "daniel.nnamdi@gmail.com",
    address: "Owerri, Imo State",
    purchases: 8,
    spent: 94000,
    balance: 8500,
    status: "Active",
    joined: "Jun 30, 2026",
  },
  {
    id: 9,
    name: "Anthony Umeh",
    phone: "0706 456 1234",
    email: "anthony.umeh@gmail.com",
    address: "Onitsha, Anambra State",
    purchases: 31,
    spent: 358000,
    balance: 0,
    status: "Inactive",
    joined: "Jun 22, 2026",
  },
  {
    id: 10,
    name: "Blessing Peter",
    phone: "0809 876 5432",
    email: "blessing.peter@gmail.com",
    address: "Enugu, Enugu State",
    purchases: 16,
    spent: 198500,
    balance: 5000,
    status: "Active",
    joined: "Jun 18, 2026",
  },
];

const formatCurrency = (value) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();

export default function AllCustomers() {
  const [customers, setCustomers] =
    useState(customersData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [openMenu, setOpenMenu] =
    useState(null);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [customerToDelete, setCustomerToDelete] =
    useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(searchValue) ||
        customer.phone
          .toLowerCase()
          .includes(searchValue) ||
        customer.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalOutstanding = customers.reduce(
    (sum, customer) =>
      sum + Number(customer.balance || 0),
    0
  );

  const deleteCustomer = () => {
    if (!customerToDelete) return;

    setCustomers((current) =>
      current.filter(
        (customer) =>
          customer.id !== customerToDelete.id
      )
    );

    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  const openDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
    setOpenMenu(null);
  };

  return (
    <div
      className="customers-page content-wrapper"
      onClick={() => setOpenMenu(null)}
    >

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="customers-header ">

        <div className="customers-title">

          <div className="customers-title-icon">
            <Users size={19} />
          </div>

          <div>
            <h1>All Customers</h1>

            <p>
              Manage your customers and view their purchase history.
            </p>
          </div>

        </div>


        <div className="customers-header-actions">

          <button className="export-btn">
            <Download size={14} />
            Export
          </button>

          <button
            className="add-customer-btn"
            onClick={() =>
              (window.location.href =
                "/admin/customers/add")
            }
          >
            <Plus size={14} />
            Add Customer
          </button>

        </div>

      </div>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="customer-stats">

        <div className="customer-stat-card">

          <div className="stat-icon blue">
            <Users size={17} />
          </div>

          <div className="stat-info">
            <span>Total Customers</span>
            <strong>{totalCustomers}</strong>
            <small>
              All registered customers
            </small>
          </div>

        </div>


        <div className="customer-stat-card">

          <div className="stat-icon green">
            <UserCheck size={17} />
          </div>

          <div className="stat-info">
            <span>Active Customers</span>
            <strong>{activeCustomers}</strong>
            <small className="positive">
              Currently active
            </small>
          </div>

        </div>


        <div className="customer-stat-card">

          <div className="stat-icon orange">
            <UserX size={17} />
          </div>

          <div className="stat-info">
            <span>Inactive Customers</span>
            <strong>{inactiveCustomers}</strong>
            <small>
              No recent activity
            </small>
          </div>

        </div>


        <div className="customer-stat-card">

          <div className="stat-icon purple">
            <Wallet size={17} />
          </div>

          <div className="stat-info">
            <span>Outstanding Balance</span>
            <strong>
              {formatCurrency(totalOutstanding)}
            </strong>
            <small>
              Customer credit
            </small>
          </div>

        </div>

      </div>


      {/* =====================================
          CUSTOMER TABLE CARD
      ===================================== */}

      <div className="customers-table-card">

        {/* TOOLBAR */}

        <div className="customers-toolbar">

          <div className="toolbar-left">

            <div className="customer-search">

              <Search size={14} />

              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                >
                  <X size={12} />
                </button>
              )}

            </div>


            <div className="status-filter">

              <Filter size={12} />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>

          </div>


          <div className="result-count">

            Showing{" "}
            <strong>
              {filteredCustomers.length}
            </strong>{" "}
            of {customers.length}

          </div>

        </div>


        {/* TABLE */}

        <div className="customers-table-wrapper">

          <table className="customers-table">

            <thead>

              <tr>

                <th>
                  CUSTOMER
                </th>

                <th>
                  CONTACT
                </th>

                <th>
                  PURCHASES
                </th>

                <th>
                  TOTAL SPENT
                </th>

                <th>
                  BALANCE
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  JOINED
                </th>

                <th>
                  ACTION
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCustomers.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-table"
                  >

                    <div className="empty-icon">
                      <Users size={23} />
                    </div>

                    <strong>
                      No customers found
                    </strong>

                    <span>
                      Try changing your search or filter.
                    </span>

                  </td>

                </tr>

              ) : (

                filteredCustomers.map(
                  (customer) => (

                    <tr key={customer.id}>

                      {/* CUSTOMER */}

                      <td>

                        <div className="customer-profile">

                          <div className="customer-avatar">
                            {getInitials(
                              customer.name
                            )}
                          </div>

                          <div className="customer-name">

                            <strong>
                              {customer.name}
                            </strong>

                            <span>
                              CUST-
                              {String(
                                customer.id
                              ).padStart(
                                5,
                                "0"
                              )}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* CONTACT */}

                      <td>

                        <div className="contact-info">

                          <div>
                            <Phone size={10} />
                            <span>
                              {customer.phone}
                            </span>
                          </div>

                          <div>
                            <Mail size={10} />
                            <span>
                              {customer.email}
                            </span>
                          </div>

                        </div>

                      </td>


                      {/* PURCHASES */}

                      <td>

                        <div className="purchase-count">
                          <strong>
                            {customer.purchases}
                          </strong>

                          <span>
                            orders
                          </span>
                        </div>

                      </td>


                      {/* SPENT */}

                      <td>

                        <strong className="spent-value">
                          {formatCurrency(
                            customer.spent
                          )}
                        </strong>

                      </td>


                      {/* BALANCE */}

                      <td>

                        {customer.balance > 0 ? (

                          <div className="balance-due">

                            <strong>
                              {formatCurrency(
                                customer.balance
                              )}
                            </strong>

                            <span>
                              Due
                            </span>

                          </div>

                        ) : (

                          <span className="no-balance">
                            No balance
                          </span>

                        )}

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`customer-status ${
                            customer.status ===
                            "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >

                          <i></i>

                          {customer.status}

                        </span>

                      </td>


                      {/* JOINED */}

                      <td>

                        <span className="joined-date">
                          {customer.joined}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <div
                          className="customer-actions"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          <button
                            className="view-action"
                            title="View customer"
                            onClick={() =>
                              setSelectedCustomer(
                                customer
                              )
                            }
                          >
                            <Eye size={13} />
                          </button>


                          <button
                            className="more-action"
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  customer.id
                                  ? null
                                  : customer.id
                              )
                            }
                          >
                            <MoreVertical
                              size={14}
                            />
                          </button>


                          {openMenu ===
                            customer.id && (

                            <div className="action-menu">

                              <button
                                onClick={() =>
                                  setSelectedCustomer(
                                    customer
                                  )
                                }
                              >
                                <Eye size={13} />
                                View Customer
                              </button>

                              <button
                                onClick={() =>
                                  (window.location.href =
                                    `/admin/customers/edit/${customer.id}`)
                                }
                              >
                                <Pencil size={13} />
                                Edit Customer
                              </button>

                              <div></div>

                              <button
                                className="delete-menu"
                                onClick={() =>
                                  openDelete(
                                    customer
                                  )
                                }
                              >
                                <Trash2 size={13} />
                                Delete Customer
                              </button>

                            </div>

                          )}

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>


        {/* PAGINATION */}

        <div className="customers-pagination">

          <div>
            Showing{" "}
            <strong>
              {filteredCustomers.length > 0
                ? 1
                : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {filteredCustomers.length}
            </strong>{" "}
            of{" "}
            <strong>
              {customers.length}
            </strong>{" "}
            customers
          </div>


          <div className="pagination-buttons">

            <button disabled>
              <ChevronLeft size={13} />
            </button>

            <button className="current-page">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <span>...</span>

            <button>
              8
            </button>

            <button>
              <ChevronRight size={13} />
            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          CUSTOMER DETAILS MODAL
      ===================================== */}

      {selectedCustomer && (

        <div
          className="customer-modal-overlay"
          onClick={() =>
            setSelectedCustomer(null)
          }
        >

          <div
            className="customer-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <h2>
                  Customer Details
                </h2>

                <span>
                  Customer profile information
                </span>
              </div>

              <button
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                <X size={15} />
              </button>

            </div>


            <div className="modal-customer-profile">

              <div className="modal-avatar">
                {getInitials(
                  selectedCustomer.name
                )}
              </div>

              <div>

                <h3>
                  {selectedCustomer.name}
                </h3>

                <span>
                  CUST-
                  {String(
                    selectedCustomer.id
                  ).padStart(5, "0")}
                </span>

              </div>

              <span
                className={`customer-status ${
                  selectedCustomer.status ===
                  "Active"
                    ? "active"
                    : "inactive"
                }`}
              >
                <i></i>
                {selectedCustomer.status}
              </span>

            </div>


            <div className="modal-info-grid">

              <div className="modal-info-item">

                <Phone size={14} />

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedCustomer.phone}
                  </strong>
                </div>

              </div>


              <div className="modal-info-item">

                <Mail size={14} />

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedCustomer.email}
                  </strong>
                </div>

              </div>


              <div className="modal-info-item">

                <MapPin size={14} />

                <div>
                  <span>Address</span>
                  <strong>
                    {selectedCustomer.address}
                  </strong>
                </div>

              </div>


              <div className="modal-info-item">

                <Wallet size={14} />

                <div>
                  <span>Outstanding</span>
                  <strong>
                    {formatCurrency(
                      selectedCustomer.balance
                    )}
                  </strong>
                </div>

              </div>

            </div>


            <div className="modal-stats">

              <div>
                <span>Total Purchases</span>
                <strong>
                  {selectedCustomer.purchases}
                </strong>
              </div>

              <div>
                <span>Total Spent</span>
                <strong>
                  {formatCurrency(
                    selectedCustomer.spent
                  )}
                </strong>
              </div>

              <div>
                <span>Customer Since</span>
                <strong>
                  {selectedCustomer.joined}
                </strong>
              </div>

            </div>


            <div className="modal-footer">

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                Close
              </button>

              <button
                className="modal-edit"
                onClick={() =>
                  (window.location.href =
                    `/admin/customers/edit/${selectedCustomer.id}`)
                }
              >
                <Pencil size={13} />
                Edit Customer
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          DELETE MODAL
      ===================================== */}

      {showDeleteModal && (

        <div
          className="customer-modal-overlay"
          onClick={() =>
            setShowDeleteModal(false)
          }
        >

          <div
            className="delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="delete-icon">
              <Trash2 size={19} />
            </div>

            <h2>
              Delete Customer?
            </h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {customerToDelete?.name}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="delete-actions">

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={deleteCustomer}
              >
                Delete Customer
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

