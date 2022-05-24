
import {Routes,Route} from "react-router-dom";
import { ADMIN_CUSTOMERS_TABLE_PAGE } from "./CustomerTable/Admin_Customers_Table_Page";
import { ADMIN_CUSTOMER_ADD_PAGE } from "./CustomerAdd/Admin_Customer_Add_Page";
import { ADMIN_CUSTOMERS_PAGE } from "./CustomerInfo/Admin_Customer_Details_Page";



export function ADMIN_CUSTOMERS_ROUTES(){
    return(
        <Routes>
                <Route path="/" element={<ADMIN_CUSTOMERS_TABLE_PAGE/>}/>
                <Route path="add" element={<ADMIN_CUSTOMER_ADD_PAGE/>}/>
                <Route path="/:id" element={<ADMIN_CUSTOMERS_PAGE/>}/>
        </Routes> 
    )
}
