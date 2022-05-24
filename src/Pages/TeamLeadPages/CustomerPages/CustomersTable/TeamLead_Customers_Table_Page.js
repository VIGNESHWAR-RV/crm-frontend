
//--------- { css , react , react-router-dom imports } --------------
import "./TeamLead_Customer_Info_Page.css";
//--------------------------------------------------------------

//---------- { MUI Imports } -----------------------------------
import AddRoundedIcon from '@mui/icons-material/AddRounded';
//--------------------------------------------------------------

//---- { ACTION component imports } -----------------------------
import { TEAMLEAD_CUSTOMERS_TABLE_PAGE_ACTIONS } from "../../../../pageActions/TeamLeadPageActions/CustomerActions/TEAMLEAD_CUSTOMERS_TABLE_PAGE_ACTIONS";
//---------------------------------------------------------------


export function TEAMLEAD_CUSTOMERS_TABLE_PAGE(){

        //--- { customer add button } -----------------------------------------------------

    const addButton = { sx:{mb:1,mt:3,mr:2,ml:"auto",p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"dodgerblue"},
                        className:"",
                        color:"primary",
                        variant:"contained",
                        type:"submit",
                        contentComponent:<AddRoundedIcon/>,
                        contentText:" Add Team Lead" }; 

    //----------------------------------------------------------------------------------
    
    //--- { customer table Props } -------------------------------------------------------------


    const tableHeadingAndButtonBox = {sx:{display:"flex",mx:3,alignItems:"center"},
                                      className:"",
                                      component:"div"
                                     }

    const tableHeading = "Customers List";

    const tableOuterCard = {sx:{m:2,overflowX:"auto",borderRadius:"1.5rem"},
                                     className:""
                                    }
    
    const requiredHeadings = [
                               {
                                heading:"Name",
                                field:"name",
                               },
                               {
                                 heading:"Task Description",
                                 field:"taskDescription",
                               },
                               {
                                 heading:"Task Owner",
                                 field:"taskOwner"
                               },
                               {
                                 heading:"Due Date",
                                 field:"dueDate"
                               },
                              ];

    const tableDataSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.4)",m:2,minWidth:"2.5rem",width:"10vw",height:"1.5rem"},
                               variant:"text",className:""};

    const tableStatusChip = {sx:{padding:"5%",cursor: "pointer",className:""}};

    const tableProps = {requiredHeadings,tableDataSkeleton,tableStatusChip}

    // --------------------------------------------------------------------------------------

    const Props = {tableHeadingAndButtonBox,tableHeading,tableOuterCard,addButton,tableProps};


    return(
        <>
        <TEAMLEAD_CUSTOMERS_TABLE_PAGE_ACTIONS Props={Props} />
        </>
    )
}





