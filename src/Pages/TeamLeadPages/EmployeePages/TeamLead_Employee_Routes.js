import {Routes,Route} from "react-router-dom";
import { TEAMLEAD_EMPLOYEE_INFO_PAGE } from "./EmployeeInfo/TeamLead_Employee_Info_Page";
import { TEAMLEAD_EMPLOYEES_TABLE_PAGE } from "./EmployeesTable/TeamLead_Employees_Table";


export function TEAMLEAD_EMPLOYEES_ROUTES(){

    return(
        <Routes>
           <Route path="/" element={<TEAMLEAD_EMPLOYEES_TABLE_PAGE/> }/>
           <Route path="/:id" element={<TEAMLEAD_EMPLOYEE_INFO_PAGE/> }/>
        </Routes> 
    )
}
