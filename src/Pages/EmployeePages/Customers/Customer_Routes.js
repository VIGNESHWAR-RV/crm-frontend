import {Routes,Route} from "react-router-dom";

import { EMPLOYEE_CUSTOMER_INFO_PAGE } from "./CustomerInfo/Employee_CustomerInfo";
import { EMPLOYEE_CUSTOMER_TABLE_PAGE } from "./CustomerTable/Employee_CustomerTable";


export function EMPLOYEE_CUSTOMER_ROUTES(){

    return(
        <Routes>
           <Route path="/" element={<EMPLOYEE_CUSTOMER_TABLE_PAGE/>}/>
           <Route path="/:id" element={<EMPLOYEE_CUSTOMER_INFO_PAGE/>}/>
        </Routes> 
    )
}

