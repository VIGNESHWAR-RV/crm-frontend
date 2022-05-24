import {Routes,Route} from "react-router-dom";
import { ADMIN_TEAM_LEADS_TABLE_PAGE } from "./TeamLeadsTable/Admin_TeamLeads_Table_Page";
import { ADMIN_TEAM_LEAD_PAGE } from "./TeamLeadInfo/Admin_TeamLead_Details_Page";
import { ADMIN_TEAM_LEAD_ADD_PAGE } from "./TeamLeadAdd/Admin_TeamLead_Add_Page";

export function ADMIN_TEAM_LEADS_ROUTES(){

    // const {mode,setMode} = useContext(context);


    return(
        
            <Routes>
                <Route path="/" element={<ADMIN_TEAM_LEADS_TABLE_PAGE/>}/>
                <Route path="add" element={<ADMIN_TEAM_LEAD_ADD_PAGE/>}/>
                <Route path="/:id" element={<ADMIN_TEAM_LEAD_PAGE/>}/>
            </Routes> 
    )
}