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


import { useToast } from "@/components/Toast";
import getUnitsStats from "@/services/units/get"

export default async function Stats() {

  const stats = await getUnitsStats()


  return (


      <div className="unit-stats">
    
    
            <div className="unit-stat-card">
    
              <div className="unit-stat-icon blue">
    
                <FolderTree
                  size={21}
                />
    
              </div>
    
    
              <div>
    
                <span>
                  Total unit
                </span>
    
                <h2>
                  {stats.total}
                </h2>
    
                <small>
                  All unit
                </small>
    
              </div>
    
            </div>
    
    
            <div className="unit-stat-card">
    
              <div className="unit-stat-icon green">
    
                <CheckCircle2
                  size={21}
                />
    
              </div>
    
    
              <div>
    
                <span>
                  Active
                </span>
    
                <h2>
                  {stats.active}
                </h2>
    
                <small>
                  On this page
                </small>
    
              </div>
    
            </div>
    
    
            <div className="unit-stat-card">
    
              <div className="unit-stat-icon orange">
    
                <XCircle
                  size={21}
                />
    
              </div>
    
    
              <div>
    
                <span>
                  Inactive
                </span>
    
                <h2>
                  {stats.inactive}
                </h2>
    
                <small>
                  On this page
                </small>
    
              </div>
    
            </div>
    
    
            {/* <div className="unit-stat-card">
    
              <div className="unit-stat-icon purple">
    
                <Package
                  size={21}
                />
    
              </div>
    
    
              <div>
    
                <span>
                  Products
                </span>
    
                <h2>
                  {stats.active}
                </h2>
    
                <small>
                  On this page
                </small>
    
              </div>
    
            </div> */}
    
          </div>


  );

}