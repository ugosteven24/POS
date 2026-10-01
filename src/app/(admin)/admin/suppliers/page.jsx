
"use client";

import React, { useMemo, useState } from "react";
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

import "./purchase-suppliers.css";
import Link from "next/link";
import Topheader from "./components/Topheader";
import Stats from "./components/Stats";
import { getSupplierStats } from "@/services/suppliers/supplierService";
import { useEffect } from "react";
import Tabledata from "./components/Tabledata";

// ==========================================
// SAMPLE DATA
// ==========================================

const supplierData = [
  {
    id: 1,
    name: "Oraimo Nigeria",
    company: "Oraimo Trading Ltd.",
    phone: "0803 421 9087",
    email: "sales@oraimo.ng",
    address: "Ikeja, Lagos",
    purchases: 38,
    totalPurchased: 4850000,
    balance: 320000,
    status: "Active",
  },
  {
    id: 2,
    name: "Tech Accessories Ltd",
    company: "Tech Accessories Ltd.",
    phone: "0806 332 1172",
    email: "info@techaccessories.ng",
    address: "Computer Village, Lagos",
    purchases: 27,
    totalPurchased: 2980000,
    balance: 185000,
    status: "Active",
  },
  {
    id: 3,
    name: "Samsung Distributor",
    company: "Samsung Electronics",
    phone: "0814 555 8210",
    email: "orders@samsungdist.ng",
    address: "Victoria Island, Lagos",
    purchases: 19,
    totalPurchased: 8120000,
    balance: 0,
    status: "Active",
  },
  {
    id: 4,
    name: "HP Distributor",
    company: "HP Nigeria Distribution",
    phone: "0802 731 4418",
    email: "sales@hpdistribution.ng",
    address: "Ikeja, Lagos",
    purchases: 14,
    totalPurchased: 6450000,
    balance: 450000,
    status: "Active",
  },
  {
    id: 5,
    name: "JBL Distributor",
    company: "JBL Audio Nigeria",
    phone: "0703 812 9921",
    email: "jbl@audionigeria.ng",
    address: "Lekki, Lagos",
    purchases: 11,
    totalPurchased: 1780000,
    balance: 0,
    status: "Active",
  },
  {
    id: 6,
    name: "Kingston Distributor",
    company: "Kingston Technology",
    phone: "0810 442 1830",
    email: "kingston@techdist.ng",
    address: "Yaba, Lagos",
    purchases: 8,
    totalPurchased: 925000,
    balance: 75000,
    status: "Active",
  },
  {
    id: 7,
    name: "Computer World Ltd",
    company: "Computer World Nigeria",
    phone: "0809 712 6401",
    email: "contact@computerworld.ng",
    address: "Wuse, Abuja",
    purchases: 6,
    totalPurchased: 1320000,
    balance: 210000,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Mobile Hub Nigeria",
    company: "Mobile Hub Distribution",
    phone: "0705 341 2268",
    email: "mobilehub@gmail.com",
    address: "Onitsha, Anambra",
    purchases: 4,
    totalPurchased: 870000,
    balance: 0,
    status: "Inactive",
  },
];


// ==========================================
// COMPONENT
// ==========================================

export default function PurchaseSuppliers() {

  

  return (

    <div className="suppliers-page content-wrapper">


      <Topheader/>

      <Stats/>


     

      <Tabledata/>

    </div>
  );
}

