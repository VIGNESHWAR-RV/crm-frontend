
//--------- { css , react , react-router-dom imports } --------------
import "./TeamLead_Employees_Table_Page.css";
//--------------------------------------------------------------

//---------- { MUI Imports } -----------------------------------
// import AddRoundedIcon from '@mui/icons-material/AddRounded';
//--------------------------------------------------------------

//---- { ACTION component imports } -----------------------------
import { TEAMLEAD_EMPLOYEES_TABLE_ACTIONS } from "../../../../pageActions/TeamLeadPageActions/EmployeeActions/TEAMLEAD_EMPLOYEES_TABLE_ACTIONS";
//---------------------------------------------------------------



export function TEAMLEAD_EMPLOYEES_TABLE_PAGE(){
    
//--- { employee add button } -----------------------------------------------------

// const addButton = { sx:{mb:1,mt:3,mr:2,ml:"auto",p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"dodgerblue"},
// color:"primary",
// className:"",
// variant:"contained",
// type:"submit",
// contentComponent:<AddRoundedIcon/>,
// contentText:" Add Employee" }; 

//----------------------------------------------------------------------------------

// --- { table Props } -------------------------------------------------------------


const tableHeadingAndButtonBox = {sx:{display:"flex",mx:3,alignItems:"center"},
                  className:"",
                  component:"div"
                 }

const tableHeading = "Employees List";


const tableOuterCard = {sx:{m:2,overflowX:"auto",borderRadius:"1.5rem"},
                 className:""
                }


const requiredHeadings = [
      {
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
           className:"",
           variant:"text"};

const tableStatusChip = {sx:{padding:"5%",cursor: "pointer"},className:""};

const tableProps = {requiredHeadings,tableDataSkeleton,tableStatusChip}

// --------------------------------------------------------------------------------------

const Props = {tableHeadingAndButtonBox,tableHeading,tableOuterCard,tableProps}; //addButton


    return(
        <TEAMLEAD_EMPLOYEES_TABLE_ACTIONS Props={Props} />
    )
}




