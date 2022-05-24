
//--------- { css , react , react-router-dom imports } --------------
import "./Employee_CustomerTable.css";
//--------------------------------------------------------------

//---- { ACTION component imports } -----------------------------
import { EMPLOYEE_CUSTOMERS_TABLE_ACTIONS } from "../../../../pageActions/EmployeePageActions/CustomerActions/EMPLOYEE_CUSTOMERS_TABLE_ACTIONS";
//---------------------------------------------------------------



export function EMPLOYEE_CUSTOMER_TABLE_PAGE(){
    
    
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

    const Props = {tableHeadingAndButtonBox,tableHeading,tableOuterCard,tableProps};


    return(
        <>
          <EMPLOYEE_CUSTOMERS_TABLE_ACTIONS Props={Props} />
        </>
    )
}



