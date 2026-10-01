import React from "react";
import { Plus, Download} from "react";

import {RotateCcw} from "lucide-react";
import Link from "next/link";


export default function Topheader() {
  return (
    <>
      {/* =================================
            HEADER
        ================================= */}

      <div className="returns-header">
        <div className="returns-title">
          <div className="title-icon">
            <RotateCcw size={19} />
          </div>

          <div>
            <h1>Purchase Returns</h1>

            <p>Manage products returned to suppliers.</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="export-btn">
            {/* <Download size={14} />*/}
            Export
          </button>

          <Link className="new-return-btn" href="/admin/purchases/returns/new">
            {/* <Plus size={14} />*/}
            New Purchase Return
          </Link>
        </div>
      </div>
    </>
  );
}
