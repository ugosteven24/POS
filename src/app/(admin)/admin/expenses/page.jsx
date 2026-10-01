
import "./expenses.css";
import Topheader from "./components/Topheader";
import Stats from "./components/Stats";
import DataTable from "./components/TableData";


export default function AllExpensesPage() {
 

  return (
    <div className="expenses-page  content-wrapper">

      <Topheader />

      <Stats />

      {/* =========================================
          TABLE CARD
      ========================================= */}
      <DataTable />

    </div>
  );
}

