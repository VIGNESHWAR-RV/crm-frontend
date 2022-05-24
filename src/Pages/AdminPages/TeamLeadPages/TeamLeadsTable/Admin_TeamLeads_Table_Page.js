//--------- { css , react , react-router-dom imports } --------------
import "./Admin_Team_Lead_Table_Page.css";
//--------------------------------------------------------------

//---------- { MUI Imports } -----------------------------------
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//--------------------------------------------------------------

//---- { ACTION component imports } -----------------------------
import { ADMIN_TEAM_LEADS_TABLE_ACTIONS } from "../../../../pageActions/AdminPageActions/TeamLeadActions/ADMIN_TEAM_LEADS_TABLE_ACTIONS";
//---------------------------------------------------------------


export function ADMIN_TEAM_LEADS_TABLE_PAGE(){


    //--- { team lead add button } -----------------------------------------------------

    const addButton = { sx:{mb:1,mt:3,mr:2,ml:"auto",p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"dodgerblue"},
                        color:"primary",
                        variant:"contained",
                        type:"submit",
                        contentComponent:<AddRoundedIcon/>,
                        contentText:" Add Team Lead" }; 

    //----------------------------------------------------------------------------------
    
    // --- { table Props } -------------------------------------------------------------
    

    const tableHeadingAndButtonBox = {sx:{display:"flex",mx:3,alignItems:"center"},
                                      className:"",
                                      component:"div"
                                     }

    const tableHeading = "Team Leads List";

    const tableOuterCard = {sx:{m:2,overflowX:"auto",borderRadius:"1.5rem"},
                                     className:""
                                    }

    const requiredHeadings = [{
                                heading:"Name",
                                field:"name",
                               },
                               {
                                 heading:"Status",
                                 field:"status",
                               },
                               {
                                 heading:"Pending Jobs",
                                 field:"pendingJobs"
                               },
                               {
                                 heading:"Accomplished",
                                 field:"completedJobs"
                               },
                               {
                                 heading:"Revenue Generated",
                                 field:"revenue", 
                               }
                              ];

    const tableDataSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.4)",m:2,minWidth:"2.5rem",width:"10vw",height:"1.5rem"},
                               variant:"text"};

    const tableStatusChip = {sx:{padding:"5%",cursor: "pointer"}};

    const tableProps = {requiredHeadings,tableDataSkeleton,tableStatusChip}

    // --------------------------------------------------------------------------------------

    const Props = {tableHeadingAndButtonBox,tableHeading,tableOuterCard,addButton,tableProps};


    return(
        <>
          <ADMIN_TEAM_LEADS_TABLE_ACTIONS Props={Props} />
        </>
    ) 
}


