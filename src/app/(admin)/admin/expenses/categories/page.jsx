


import "./expense-categories.css";
import Topheader from "./components/Topheader";
import Stats from "./components/Stats";
import Tabledata from "./components/Tabledata";



export default function ExpenseCategoriesPage() {

  

  return (
    <div className="expense-categories-page content-wrapper">


   
      <Topheader/>

      <Stats/>

      <Tabledata/>
    

    
    </div>
  );
}

