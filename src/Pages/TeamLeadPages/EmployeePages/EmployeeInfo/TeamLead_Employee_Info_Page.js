import "./TeamLead_Employee_Info_Page.css";

//--------- { MUI } imports -------------------------
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
// import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
// import SaveIcon from '@mui/icons-material/Save';
// import CircularProgress from '@mui/material/CircularProgress';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { Navback } from '../../../../BasicComponents/NavBack';
import { CardComponent } from "../../../../BasicComponents/CardComponent";
//---------------------------------------------------


//--------- { action imports } --------------------------
import { TEAMLEAD_EMPLOYEE_PAGE_ACTIONS } from "../../../../pageActions/TeamLeadPageActions/EmployeeActions/TEAMLEAD_EMPLOYEE_PAGE_ACTIONS";
//---------------------------------------------------------------


export function TEAMLEAD_EMPLOYEE_INFO_PAGE(){

    

const pageOuterBox = {sx:{},
               component:"form",
               className:""
              };


//---- Heading Component ----------------------------------------------------------


const headingOuterBox = {sx:{display:"flex",alignItems:"baseline"},
                  component:"div",
                  className:""
                 };


const titleSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.6)",m:2,minWidth:"10rem",width:"40vw",height:"1.5rem"},
               variant:"text",className:""};

const buttonSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.6)",m:2,minWidth:"4rem",width:"12vw",height:"1.5rem"},
                variant:"text",className:""};


// props required for heading component
const headingProps = {titleSkeleton,buttonSkeleton};

//------------------------------------------------------------------------------



// --- { common styles for personal data , work details , revenue details } ---------------------

const SkeletonName =  {sx:{fontWeight:"500",justifySelf:"center",minWidth:"5rem",width:"10vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                variant:"text",className:""
               }

const SkeletonValue = {sx:{fontWeight:"500",justifySelf:"start",minWidth:"5rem",width:"15vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                variant:"text",className:""
               }

// --- Personal Data Component -------------------------------------------------

const personalOuterBox = {sx:{display:"grid",gridTemplateColumns:"1fr",my:3},
                  component:"div",
                  className:""
                 };

 // required fields for personal data component
const personalDataFields = [ {heading:"First Name",
                      field:"firstName",
                     },  
                      {heading:"Last Name",
                       field:"lastName",
                      },  
                      {heading:"Email",
                       field:"email",
                       }
                     ];

//props required for personal data component
const personalDataProps = {personalDataFields,SkeletonName,SkeletonValue}

// ------------------------------------------------------------------------------    


const workAndJobOuterBox = {sx:{display:"grid",gridTemplateColumns:"5fr 4fr",my:3},
                     component:"div",
                     className:""
                    }


// --- work details and revenue component -------------------------------------------

// status options for selecting state of user
const statusOptions = [
                {name:"ACTIVE",value:"ACTIVE"},
                {name:"IN-ACTIVE",value:"IN-ACTIVE"},
               ];

// role options for selecting role of user
const  roleOptions = [
               {name:"Role",value:"",disabled:true,sx:{color:"dodgerblue"}},
               {name:"Employee",value:"employee"},
               {name:"Team Lead",value:"team lead"},
               {name:"Admin",value:"admin"},
              ];

// required fields for work details section 
const workDetailFields = [   
                      {heading:"User Name",field:"userName"},
                      {heading:"Status",field:"status"},
                      {heading:"Role",field:"role"},
                      {heading:"Joined Date",field:"joinedDate"},
                      {heading:"Pending Jobs",field:"pendingJobs"},
                      {heading:"Completed Jobs",field:"completedJobs"},
                     ];

const statusChip = {sx:{borderRadius:"2rem",px:3,height:"50%",fontWeight:"bolder"},
             color:"success",className:"",
            }

const roleChip = {sx:{borderRadius:"2rem",px:2,height:"50%",fontSize:"1rem",fontWeight:"bolder"},
           color:"success",className:"",
          }

     
// props required for work details section
const workDetailProps = {workDetailFields,statusOptions,roleOptions,statusChip,roleChip,SkeletonName,SkeletonValue}


// ---- { revenue details component } ---------------------------------------------------

// required fields and props for revenue details section
const revenueDetailsHeadings = [
                         {heading:"Current Week",field:"currentWeek"},
                         {heading:"Total",field:"total"}
                        ];

const revenueDetailProps = {revenueDetailsHeadings,SkeletonName,SkeletonValue};

//---------------------------------------------------------------------------------------



const jobOuterCard = {sx:{mr:3,border:"1px solid dodgerblue",maxHeight:"48rem",overflowY:"auto",borderRadius:"1rem"},
               className:""
              }

const jobHeadingCard = {sx:{position:"sticky",top:"0rem",zIndex:"2"},
                 className:""
                } 

const navPath = "/teamLead/customers/";

const pendingCustomerCard={sx:{width:"100%",mb:1,border:"1px solid dodgerblue",borderRadius:"1rem",cursor:"pointer"},className:"",};

const jobStatusChip = {sx:{m:1,ml:"auto",fontSize:"1rem",fontStyle:"bold"},
                          className:""
                         };

const customerNameAndStatusBox={sx:{display:"flex",alignItems:"center"},className:"",};


const customerNameSkeleton= {sx:{mx:2,my:2,minWidth:"4rem",width:"8vw",height:"1.5rem",backgroundColor:"rgba(30, 144, 255,0.6)"},
                     variant:"text",
                     className:""
                    };

const customerStatusSkeleton= {sx:{m:2,ml:"auto",minWidth:"4rem",width:"8vw",height:"3rem",backgroundColor:"rgba(30, 144, 255,0.6)",borderRadius:"0.75rem"},
                       variant:"text",
                       className:""
                      };

const jobDescriptionSekeleton={sx:{m:1,minWidth:"4rem",width:"96%",height:"1.5rem",backgroundColor:"rgba(30, 144, 255,0.6)"},
                       variant:"text",
                       className:""
                      };


const pendingJobProps = {jobOuterCard,jobHeadingCard,navPath,pendingCustomerCard,jobStatusChip,customerNameAndStatusBox,customerNameSkeleton,customerStatusSkeleton,jobDescriptionSekeleton};


//---------------------------------------------------------------------------------------

const outerCard = {sx:{m:2,mb:5,overflowX:"auto",borderRadius:"1.5rem"},
                   className:""
                  }


const Props =  {pageOuterBox,headingOuterBox,headingProps,personalOuterBox,personalDataProps,workAndJobOuterBox,workDetailProps,revenueDetailProps,pendingJobProps}



    return(
        <CardComponent props={{...outerCard}}>
  
                {/* navigate back button */}
              <Navback/>
  
              <TEAMLEAD_EMPLOYEE_PAGE_ACTIONS Props={Props}/>
  
        </CardComponent>
    )
}









