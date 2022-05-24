import {Routes,Route} from "react-router-dom";
import { ADMIN_EMPLOYEES_TABLE_PAGE } from "./EmployeesTable/Admin_Employees_Table_Page";
import { ADMIN_EMPLOYEE_ADD_PAGE } from "./EmployeeAdd/Admin_Employee_Add_Page";
import { ADMIN_EMPLOYEE_PAGE } from "./EmployeeInfo/Admin_Employee_Details_Page";

export function ADMIN_EMPLOYEES_ROUTES(){
    return(
        <Routes>
                <Route path="/" element={<ADMIN_EMPLOYEES_TABLE_PAGE/>}/>
                <Route path="add" element={<ADMIN_EMPLOYEE_ADD_PAGE/>}/>
                <Route path="/:id" element={<ADMIN_EMPLOYEE_PAGE/>}/>
        </Routes> 
    )
}

