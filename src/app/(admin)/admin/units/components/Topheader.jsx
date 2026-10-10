"use client";

import {
  Search,
  Plus,
  FolderTree,
  Package,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  Save,
} from "lucide-react";
import Link from "next/link";




export default  function Topheader() {
 

  return (


      <div className="units-header">

        <div>

          <div className="units-breadcrumb">

            <span>
              Products
            </span>

            <span>/</span>

            <strong>
              Units
            </strong>

          </div>


          <h1>
            Product Units
          </h1>


          <p>
            Organize your products into
            unit for easier inventory
            management.
          </p>

        </div>


        <Link
          type="button"
          className="add-unit-button"
          href={"units/add"}
          
        >

          <Plus size={18} />

          Add Units

        </Link>


      </div>


  );

}