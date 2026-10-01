
import Link from "next/link";
import "./all-sales.css";
import Stats from "./components/stats";
import Table from "./components/Table";



export default function AllSales(){
  return(
    <>
    <div className="sales-page  content-wrapper sales-page ">

      <Stats/>
      <Table/>
    </div>
    </>
  )
}

