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


      <div className="brands-header">

        <div>

          <div className="brands-breadcrumb">

            <span>
              Products
            </span>

            <span>/</span>

            <strong>
              brands
            </strong>

          </div>


          <h1>
            Product brands
          </h1>


          <p>
            Organize your products into
            brands for easier inventory
            management.
          </p>

        </div>


        <Link
          type="button"
          className="add-brand-button"
          href={"brands/add"}
          
        >

          <Plus size={18} />

          Add Brand

        </Link>


      </div>


  );

}