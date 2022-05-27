import {Routes,Route} from "react-router-dom";

import { TEAMLEAD_CUSTOMER_ADD_PAGE } from "./CustomerAdd/TeamLead_Customer_Add_Page";
import { TEAMLEAD_CUSTOMER_INFO_PAGE } from "./CustomerInfo/TeamLead_Customer_Info_Page";
import { TEAMLEAD_CUSTOMERS_TABLE_PAGE } from "./CustomersTable/TeamLead_Customers_Table_Page";


export function TEAMLEAD_CUSTOMERS_ROUTES(){

    return(
        <Routes>
          <Route path="/" element={<TEAMLEAD_CUSTOMERS_TABLE_PAGE/>}/>
          <Route path="add" element={<TEAMLEAD_CUSTOMER_ADD_PAGE/>}/>
          <Route path="/:id" element={<TEAMLEAD_CUSTOMER_INFO_PAGE/>}/>
        </Routes> 
    )
}
