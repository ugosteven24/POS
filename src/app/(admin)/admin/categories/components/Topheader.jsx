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


      <div className="categories-header">

        <div>

          <div className="categories-breadcrumb">

            <span>
              Products
            </span>

            <span>/</span>

            <strong>
              Categories
            </strong>

          </div>


          <h1>
            Product Categories
          </h1>


          <p>
            Organize your products into
            categories for easier inventory
            management.
          </p>

        </div>


        <Link
          type="button"
          className="add-category-button"
          href={"categories/add"}
          
        >

          <Plus size={18} />

          Add Category

        </Link>


      </div>


  );

}