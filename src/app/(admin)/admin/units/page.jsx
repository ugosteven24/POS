


import { useToast } from "@/components/Toast";

import "./units.css";
import Topheader from "./components/Topheader";
import Stats from "./components/Stat";
import Tableunits from "./components/TableSearch";



export default function Units() {
  return(
    <div className="units-page content-wrapper">
      <Topheader/>
      <Stats/>
      <Tableunits/>


    </div>
  )
}