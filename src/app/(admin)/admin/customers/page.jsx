
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
import { getCustomerStats } from "@/services/customers/customerService";
import Topheader from "./components/Topheader";
import Stats from "./components/Stats";
import TableData from "./components/Tabledata"
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

   
    <Topheader/>
    <Stats/>
    <TableData/>
    </div>
  );
}

