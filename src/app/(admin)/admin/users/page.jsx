
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  RefreshCw,
  Filter,
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";

import "./users.css";
import Link from "next/link";

const initialUsers = [
  {
    id: 1,
    name: "David Okoro",
    email: "david.okoro@example.com",
    phone: "+234 803 421 9821",
    role: "Cashier",
    status: "Active",
    lastLogin: "Today, 09:42 AM",
    joined: "Jan 12, 2026",
    avatar: "DO",
  },
  {
    id: 2,
    name: "Grace Eze",
    email: "grace.eze@example.com",
    phone: "+234 806 315 4720",
    role: "Cashier",
    status: "Active",
    lastLogin: "Today, 08:15 AM",
    joined: "Jan 18, 2026",
    avatar: "GE",
  },
  {
    id: 3,
    name: "Michael James",
    email: "michael.james@example.com",
    phone: "+234 812 645 3810",
    role: "Manager",
    status: "Active",
    lastLogin: "Today, 07:54 AM",
    joined: "Feb 03, 2026",
    avatar: "MJ",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+234 809 524 6318",
    role: "Cashier",
    status: "Active",
    lastLogin: "Yesterday, 06:31 PM",
    joined: "Feb 14, 2026",
    avatar: "SW",
  },
  {
    id: 5,
    name: "John Peters",
    email: "john.peters@example.com",
    phone: "+234 814 231 9087",
    role: "Cashier",
    status: "Inactive",
    lastLogin: "Aug 25, 2026",
    joined: "Mar 01, 2026",
    avatar: "JP",
  },
  {
    id: 6,
    name: "Daniel Obi",
    email: "daniel.obi@example.com",
    phone: "+234 805 718 2045",
    role: "Supervisor",
    status: "Active",
    lastLogin: "Today, 09:10 AM",
    joined: "Mar 08, 2026",
    avatar: "DO",
  },
  {
    id: 7,
    name: "Emmanuel Ade",
    email: "emmanuel.ade@example.com",
    phone: "+234 816 439 2710",
    role: "Cashier",
    status: "Active",
    lastLogin: "Today, 08:47 AM",
    joined: "Mar 19, 2026",
    avatar: "EA",
  },
  {
    id: 8,
    name: "Victoria James",
    email: "victoria.james@example.com",
    phone: "+234 807 315 6248",
    role: "Manager",
    status: "Inactive",
    lastLogin: "Aug 20, 2026",
    joined: "Apr 02, 2026",
    avatar: "VJ",
  },
  {
    id: 9,
    name: "Robert Kings",
    email: "robert.kings@example.com",
    phone: "+234 813 526 8014",
    role: "Cashier",
    status: "Active",
    lastLogin: "Today, 07:22 AM",
    joined: "Apr 15, 2026",
    avatar: "RK",
  },
  {
    id: 10,
    name: "Admin User",
    email: "admin@example.com",
    phone: "+234 801 000 0000",
    role: "Administrator",
    status: "Active",
    lastLogin: "Today, 10:02 AM",
    joined: "Jan 02, 2026",
    avatar: "AU",
  },
];

export default function AllUsersPage() {
  const [users, setUsers] = useState(initialUsers);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");
  const [status, setStatus] = useState("All Status");

  const [openMenu, setOpenMenu] = useState(null);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const formatNumber = (value) =>
    value.toLocaleString("en-NG");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText =
        `${user.name} ${user.email} ${user.phone} ${user.role}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(search.toLowerCase());

      const matchesRole =
        role === "All Roles" ||
        user.role === role;

      const matchesStatus =
        status === "All Status" ||
        user.status === status;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, role, status]);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const administrators = users.filter(
    (user) => user.role === "Administrator"
  ).length;

  const toggleUserStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );

    setOpenMenu(null);
  };

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    setUsers((current) =>
      current.filter((user) => user.id !== id)
    );

    setSelectedUsers((current) =>
      current.filter((userId) => userId !== id)
    );

    setOpenMenu(null);
  };

  const toggleSelectUser = (id) => {
    setSelectedUsers((current) =>
      current.includes(id)
        ? current.filter((userId) => userId !== id)
        : [...current, id]
    );
  };

  const toggleSelectAll = () => {
    if (
      selectedUsers.length === filteredUsers.length
    ) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        filteredUsers.map((user) => user.id)
      );
    }
  };

  const getRoleClass = (userRole) => {
    switch (userRole) {
      case "Administrator":
        return "administrator";

      case "Manager":
        return "manager";

      case "Supervisor":
        return "supervisor";

      default:
        return "cashier";
    }
  };

  return (
    <div className="users-page content-wrapper">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="users-page-header">

        <div>

          <h1>All Users</h1>

          <p>
            Manage system users, roles, permissions and
            account access.
          </p>

        </div>


        <div className="users-header-actions">

          <button className="users-refresh-btn">
            <RefreshCw size={13} />
            Refresh
          </button>

          <button className="users-export-btn">
            <Download size={13} />
            Export
          </button>

          <Link className="users-add-btn" href="/admin/users/add">
            <Plus size={14} />
            Add User
          </Link>

        </div>

      </div>


      {/* ==========================================
          SUMMARY CARDS
      ========================================== */}

      <div className="users-summary-grid">

        <div className="user-summary-card">

          <div className="user-summary-icon blue">
            <Users size={17} />
          </div>

          <div className="user-summary-content">

            <span>TOTAL USERS</span>

            <strong>
              {formatNumber(totalUsers)}
            </strong>

            <small>
              Registered accounts
            </small>

          </div>

        </div>


        <div className="user-summary-card">

          <div className="user-summary-icon green">
            <UserCheck size={17} />
          </div>

          <div className="user-summary-content">

            <span>ACTIVE USERS</span>

            <strong>
              {formatNumber(activeUsers)}
            </strong>

            <small className="green-text">
              {Math.round(
                (activeUsers / totalUsers) * 100
              )}
              % of all users
            </small>

          </div>

        </div>


        <div className="user-summary-card">

          <div className="user-summary-icon gray">
            <UserX size={17} />
          </div>

          <div className="user-summary-content">

            <span>INACTIVE USERS</span>

            <strong>
              {formatNumber(inactiveUsers)}
            </strong>

            <small>
              Disabled accounts
            </small>

          </div>

        </div>


        <div className="user-summary-card">

          <div className="user-summary-icon purple">
            <ShieldCheck size={17} />
          </div>

          <div className="user-summary-content">

            <span>ADMINISTRATORS</span>

            <strong>
              {formatNumber(administrators)}
            </strong>

            <small>
              Administrative access
            </small>

          </div>

        </div>

      </div>


      {/* ==========================================
          FILTER CARD
      ========================================== */}

      <div className="users-filter-card">

        <div className="users-filter-title">

          <div className="users-filter-icon">
            <Filter size={14} />
          </div>

          <div>
            <strong>Filter Users</strong>

            <span>
              Search and filter system users.
            </span>
          </div>

        </div>


        <div className="users-filter-controls">

          {/* SEARCH */}

          <div className="users-search-box">

            <Search size={13} />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* ROLE */}

          <div className="users-select-box">

            <ShieldCheck size={12} />

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option>All Roles</option>
              <option>Administrator</option>
              <option>Manager</option>
              <option>Supervisor</option>
              <option>Cashier</option>
            </select>

            <ChevronDown size={11} />

          </div>


          {/* STATUS */}

          <div className="users-select-box">

            <UserCheck size={12} />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <ChevronDown size={11} />

          </div>

        </div>

      </div>


      {/* ==========================================
          TABLE
      ========================================== */}

      <div className="users-table-card">

        {/* TABLE HEADER */}

        <div className="users-table-header">

          <div>

            <h2>System Users</h2>

            <p>
              {filteredUsers.length} users found
            </p>

          </div>


          {selectedUsers.length > 0 && (

            <div className="users-bulk-actions">

              <span>
                {selectedUsers.length} selected
              </span>

              <button>
                <Lock size={12} />
                Disable
              </button>

              <button className="danger">
                <Trash2 size={12} />
                Delete
              </button>

            </div>

          )}

        </div>


        {/* TABLE */}

        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>

              <tr>

                <th className="checkbox-column">

                  <input
                    type="checkbox"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length ===
                        filteredUsers.length
                    }
                    onChange={toggleSelectAll}
                  />

                </th>

                <th>USER</th>

                <th>CONTACT</th>

                <th>ROLE</th>

                <th>STATUS</th>

                <th>LAST LOGIN</th>

                <th>JOINED</th>

                <th></th>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user.id}>

                  {/* CHECKBOX */}

                  <td className="checkbox-column">

                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(
                        user.id
                      )}
                      onChange={() =>
                        toggleSelectUser(user.id)
                      }
                    />

                  </td>


                  {/* USER */}

                  <td>

                    <div className="user-profile">

                      <div className="user-avatar">
                        {user.avatar}
                      </div>

                      <div className="user-profile-info">

                        <strong>
                          {user.name}
                        </strong>

                        <span>
                          ID: USR-
                          {String(user.id).padStart(
                            4,
                            "0"
                          )}
                        </span>

                      </div>

                    </div>

                  </td>


                  {/* CONTACT */}

                  <td>

                    <div className="user-contact">

                      <strong>
                        {user.email}
                      </strong>

                      <span>
                        {user.phone}
                      </span>

                    </div>

                  </td>


                  {/* ROLE */}

                  <td>

                    <span
                      className={`user-role ${getRoleClass(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>

                  </td>


                  {/* STATUS */}

                  <td>

                    <span
                      className={`user-status ${
                        user.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >

                      <i></i>

                      {user.status}

                    </span>

                  </td>


                  {/* LOGIN */}

                  <td>

                    <span className="user-login">
                      {user.lastLogin}
                    </span>

                  </td>


                  {/* JOINED */}

                  <td>

                    <span className="user-joined">
                      {user.joined}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="user-action-cell">

                    <button
                      className="user-action-btn"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === user.id
                            ? null
                            : user.id
                        )
                      }
                    >
                      <MoreHorizontal size={15} />
                    </button>


                    {openMenu === user.id && (

                      <div className="user-action-menu">

                        <button>
                          <Eye size={12} />
                          View User
                        </button>

                        <button>
                          <Pencil size={12} />
                          Edit User
                        </button>

                        <button
                          onClick={() =>
                            toggleUserStatus(
                              user.id
                            )
                          }
                        >
                          {user.status === "Active" ? (
                            <>
                              <Lock size={12} />
                              Disable Account
                            </>
                          ) : (
                            <>
                              <Unlock size={12} />
                              Activate Account
                            </>
                          )}
                        </button>

                        <div className="user-menu-divider"></div>

                        <button
                          className="delete-action"
                          onClick={() =>
                            deleteUser(user.id)
                          }
                        >
                          <Trash2 size={12} />
                          Delete User
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}


              {filteredUsers.length === 0 && (

                <tr>

                  <td
                    colSpan="8"
                    className="users-empty"
                  >

                    <div>

                      <Users size={25} />

                      <strong>
                        No users found
                      </strong>

                      <span>
                        Try changing your search or filters.
                      </span>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ======================================
            PAGINATION
        ====================================== */}

        <div className="users-table-footer">

          <div className="users-showing">

            Showing{" "}

            <strong>
              {filteredUsers.length}
            </strong>{" "}

            of{" "}

            <strong>
              {users.length}
            </strong>{" "}

            users

          </div>


          <div className="users-pagination">

            <button>
              <ChevronLeft size={12} />
            </button>

            <button className="active">
              1
            </button>

            <button>2</button>

            <button>3</button>

            <span>...</span>

            <button>8</button>

            <button>
              <ChevronRight size={12} />
            </button>

          </div>

        </div>

      </div>


      {/* ==========================================
          FOOTER INFORMATION
      ========================================== */}

      <div className="users-info">

        <ShieldCheck size={14} />

        <div>

          <strong>
            User access management
          </strong>

          <p>
            Administrators can create users, assign
            roles, manage permissions and control
            account access.
          </p>

        </div>

      </div>

    </div>
  );
}

