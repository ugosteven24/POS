import { useToast } from "@/components/Toast";

import "./brands.css";

import Topheader from "./components/Topheader";
import Stats from "./components/BrandsStat";
import TableBrands from "./components/TableSearch";
// ========================================
// BRANDS PAGE
// ========================================

export default function Brands() {

  return (

    <div className="brands-page content-wrapper">
      <Topheader/>
      <Stats/>
      <TableBrands/>


    </div>

  );

}

