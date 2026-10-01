
import { useToast } from "@/components/Toast";
import Topheader from "./components/Topheader";
import Stats from "./components/CategoriesStat";
import TableCategories from "./components/TableSearch";
import "./categories.css";
export default function Categories(){
  return(
    <div className="categories-page content-wrapper">

      <Topheader/>
      <Stats/>
      <TableCategories/>

    </div>
  )
}