import "./TeamLead_Customer_Info_Page.css";

//--------- { MUI } imports -------------------------
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { Navback } from '../../../../BasicComponents/NavBack';
import { CardComponent } from "../../../../BasicComponents/CardComponent";
//---------------------------------------------------

//--------- { action component imports } ----------------------------------
import { TEAMLEAD_CUSTOMER_DETAILS_PAGE_ACTIONS } from "../../../../pageActions/TeamLeadPageActions/CustomerActions/TEAMLEAD_CUSTOMER_DETAILS_PAGE_ACTIONS";
//---------------------------------------------------------------


export function TEAMLEAD_CUSTOMER_INFO_PAGE(){

       // --- Common Data ----------------------------------------------------------------------------
                                        
       //regex patterns
    const regex = {firstName:"^[a-zA-Z.]{2,}$",
                   lastName:"^[a-zA-Z.]{2,}$",
                   phoneNumber:"^[0-9+]{13,}$",
                   password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",
                   userName:"^[A-Z0-9-]{9,9}$",
                   role:"^[a-z ]{5,}$",
                   status:"^[A-Za-z -]{2,}$",
                   company:`^[a-zA-Z0-9.'",@ ()-_]{1,}$`,
                   email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                   customerId:"^[0-9a-zA-Z- ]{6,}$",
                   serviceCharge:"^[0-9]{3,}$"
                  };

        //input field props
    const inputProps = {
                         name:"", //will be set during mapping in personal data component
                         label:"", //will be set during mapping in personal data component
                         pattern:"", //will be set during mapping in personal data component
                        //  defaultValue:"", //will be set during mapping in personal data component
                         helperText:[], //will be set during mapping in personal data component
                         type:"text", //will be set during mapping in personal data component
                         typing:"", //will be set during mapping in personal data component
                         required:true,
                         placeholder:"Type Here",
                      //    disabled:states.isDisabled,
                         variant:"outlined",
                         color:"info",
                         sx:{fontSize:"large",color:"dodgerblue"} }

        //helperText for different fields
    const helperText = {firstName:["Should be atleast 2 letters"],
                        lastName:["Should be atleast 2 letters"],
                        email:["Enter Customer's valid email address"],
                        role:["Select to change role"],
                        status:["Select to change status"],
                        address:["Enter Customer's address here"],
                        taskDescription:["Enter the task details here"],
                        dueDate:["Enter the deadline of task"],
                        startDate:["From when the customer is available"],
                        teamLead:["Select Team Lead to assign the task"],
                        taskOwner:["Select Employee to perform the task"],
                        customerId:["Enter the Existing 6 digit Unique Customer ID"],
                        phoneNumber:["Enter customer's valid contact number"],
                        serviceCharge:["Enter the charges obtained for task completion"]
                       };


// --------------------------------------------------------------------------------

    const pageOuterBox = {sx:{},
                          component:"form",
                          className:""
                         };


//---- Heading Component ----------------------------------------------------------


    const headingOuterBox = {sx:{display:"flex",alignItems:"baseline"},
                             component:"div",
                             className:""
                            };
  
    const saveButton = {sx:{m:1,p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"dodgerblue"},
                        className:"",
                        color:"primary",
                        variant:"contained",
                        type:"submit",
                        contentComponent:<SaveIcon/>,
                        loader:<CircularProgress size={25} />,
                        contentText:"Save"};

    const cancelButton = {sx:{m:1,p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"red"},
                          className:"",
                          color:"error",
                          type:"button",
                          variant:"contained",
                          contentComponent:<ClearRoundedIcon/>,
                          contentText:"Cancel"};

    const editFabButton = {sx:{m:1,px:2,fontSize:"0.9rem",backgroundColor:"orange"},
                           className:"",
                           color:"warning",
                           type:"button",
                           variant:"extended",
                           contentComponent:<EditRoundedIcon/>,
                           contentText:"Edit"};

    const titleSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.6)",m:2,minWidth:"10rem",width:"40vw",height:"1.5rem"},
                          variant:"text",className:"",};

    const buttonSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.6)",m:2,minWidth:"4rem",width:"12vw",height:"1.5rem"},
                           variant:"text",className:""};

    const dataField = "customerData";

    const fields = ["firstName","lastName","status"];

     // props required for heading component
    const headingProps = {saveButton,cancelButton,editFabButton,titleSkeleton,buttonSkeleton,dataField,fields};
 
//------------------------------------------------------------------------------


// --- Dialogs Component -------------------------------------------------------

    const dialogCancelButton = {sx:{},
                                className:"",
                                color:"error",
                                variant:"contained",
                                type:"button",
                                contentText:"Cancel"};

    const dialogSubmitButton = {sx:{backgroundColor:"dodgerblue"},
                                className:"",
                                color:"primary",
                                variant:"contained",
                                loader:<CircularProgress size={25}/>,
                                type:"button",
                                };

   //props required for dialog component
   const dialogProps = {dialogCancelButton,dialogSubmitButton};


// -----------------------------------------------------------------------------

// --- { common styles for personal data , work details , revenue details }
    const SkeletonName =  {sx:{fontWeight:"500",justifySelf:"center",minWidth:"5rem",width:"10vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                           variant:"text",className:"",
                          }

    const SkeletonValue = {sx:{fontWeight:"500",justifySelf:"start",minWidth:"5rem",width:"15vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                           variant:"text",className:"",
                          }

// --- Personal Data Component -------------------------------------------------

   const customerOuterBox = {sx:{display:"grid",gridTemplateColumns:"1fr",my:3},
                             component:"div",
                             className:""
                            };

            // required fields for personal data component
    const customerDataFields = [ {heading:"First Name",
                                 field:"firstName",
                                 type:"text",
                                 pattern:regex.firstName,
                                 helperText:helperText.firstName,
                                },  
                                 {heading:"Last Name",
                                  field:"lastName",
                                  type:"text",
                                  pattern:regex.lastName,
                                  helperText:helperText.lastName,
                                 },  
                                 {heading:"Email",
                                  field:"email",
                                  type:"text",
                                  pattern:regex.email,
                                  helperText:helperText.email,
                                  },
                                  {heading:"Phone Number",
                                  field:"phone",
                                  type:"text",
                                  pattern:regex.phoneNumber,
                                  helperText:helperText.phoneNumber,
                                  },
                                  {heading:"Address",
                                  field:"address",
                                  type:"textArea",
                                  helperText:helperText.address,
                                  },
                                ];
    
       //props required for personal data component
    const customerDataProps = {inputProps,customerDataFields,SkeletonName,SkeletonValue}

// ------------------------------------------------------------------------------    


    const CustomerTaskDetailsOuterBox = {sx:{display:"grid",gridTemplateColumns:"1fr",my:3},
                                         component:"div",
                                         className:""
                                        }


// --- work details and revenue component -------------------------------------------

         // status options for selecting state of user
    const taskStatusOptions = [
                           {name:"In-complete",value:"in-complete"},
                           {name:"In-progress",value:"in-progress"},
                           {name:"Completed",value:"completed"},
                           {name:"Not Available",value:"not available"},
                           {name:"Junk Customer",value:"junk customer"},
                           {name:"Cancelled",value:"cancelled"},
                          ];

         // required fields for work details section 
    const taskDetailFields = [   {heading:"Customer ID",field:"customer_id"},

                                 {heading:"Task",
                                  field:"taskDescription",
                                  type:"textArea",
                                  helperText:helperText.taskDescription
                                 },

                                 {heading:"Start Date",
                                  field:"startDate",
                                  type:"date",
                                  disablePast:false,
                                  helperText:helperText.startDate},

                                 {heading:"Due Date",
                                  field:"dueDate",
                                  type:"date",
                                  helperText:helperText.dueDate},

                                 {heading:"Team Lead",field:"teamLead" },

                                 {heading:"Task Owner",
                                  field:"taskOwner",
                                  type:"select",
                                  pattern:regex.userName,
                                  helperText:helperText.taskOwner,
                                  optionName:"taskOwners"
                                 },

                                 {heading:"Status",
                                  field:"status",
                                  type:"select",
                                  pattern:regex.status,
                                  helperText:helperText.status,
                                 },

                                 {heading:"Service Charge",
                                  field:"serviceCharge",
                                  type:"number",
                                  pattern:regex.serviceCharge,
                                  helperText:helperText.serviceCharge 
                                 },

                                 {heading:"Completed On",
                                  field:"completionDate"}
                                ];

    const statusChip = {sx:{borderRadius:"2rem",px:3,height:"50%",fontWeight:"bolder"},
                        color:"success",className:"",
                       }
                
         // props required for work details section
    const taskDetailProps = {taskDetailFields,inputProps,taskStatusOptions,statusChip,SkeletonName,SkeletonValue}

   
//---------------------------------------------------------------------------------------


const Props =  {pageOuterBox,headingOuterBox,headingProps,dialogProps,customerOuterBox,customerDataProps,CustomerTaskDetailsOuterBox,taskDetailProps}


const outerCard = {sx:{m:2,mb:5,overflowX:"auto",borderRadius:"1.5rem"},
                   className:""
                  }


    return(
        <CardComponent props={{...outerCard}}>
  
                {/* navigate back button */}
              <Navback/>
  
              <TEAMLEAD_CUSTOMER_DETAILS_PAGE_ACTIONS Props={Props}/>
  
        </CardComponent>
    )
}














