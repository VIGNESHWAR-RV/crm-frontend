import "./Admin_Customer_Add_Page.css";

//---- { Mui imports } --------------------------------------
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CircularProgress from '@mui/material/CircularProgress';
//-----------------------------------------------------------

//---- { component imports } ------------------------------------------
import { ADMIN_CUSTOMER_ADD_PAGE_ACTIONS } from "../../../../pageActions/AdminPageActions/CustomerActions/ADMIN_CUSTOMERS_ADD_PAGE_ACTIONS";
//----------------------------------------------------------------------



export function ADMIN_CUSTOMER_ADD_PAGE(){

    
//--- { card style } --------------------------------------------------

    const formOuterCard = {sx:{m:2,mb:5,maxWidth:"100%",borderRadius:"1.5rem"},
                           className:""
                          }

//--------------------------------------------------------------------

//--- { input props } -------------------------------------------------

       //regex patterns
    const regex = {firstName:"^[a-zA-Z.]{2,}$",
                   lastName:"^[a-zA-Z.]{2,}$",
                   phoneNumber:"^[0-9+]{13,}$",
                   password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",
                   userName:"^[A-Z0-9-]{9,9}$",
                   role:"^[a-z ]{5,}$",
                   status:"^[A-Z-]{2,}$",
                   company:`^[a-zA-Z0-9.'",@ ()-_]{1,}$`,
                   email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                   customerId:"^[0-9a-zA-Z- ]{6,}$"
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
                        phoneNumber:["Enter customer's valid contact number"]
                       };

        // required fields for adding new team lead component
    const inputFields = [ {heading:"First Name",
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
                        //    pattern:regex.email,
                           helperText:helperText.address,
                           },
                          {heading:"Task",
                           field:"taskDescription",
                           type:"textArea",
                        //    pattern:regex.firstName,
                           helperText:helperText.taskDescription,
                           },  
                           {heading:"Available From",
                           field:"startDate",
                           type:"date",
                        //    pattern:"",
                           helperText:helperText.startDate,
                           },
                           {heading:"Due Date",
                           field:"dueDate",
                           type:"date",
                        //    pattern:"",
                           helperText:helperText.dueDate,
                           },
                           {
                            heading:"Team Lead",
                            field:"teamLead",
                            type:"select",
                            pattern:regex.userName,
                            helperText:helperText.teamLead,
                            optionName:"teamLeadOptions" 
                          },
                          {heading:"Task Owner",
                           field:"taskOwner",
                           type:"select",
                           pattern:regex.userName,
                           helperText:helperText.taskOwner,
                           optionName:"taskOwnerOptions"
                           },

                        ];

    const formBoxProps = {sx:{p:2},
                          component:"form",
                          className:""
                         }

    const formHeading = "Create New Customer";


    const inputBoxProps = {sx:{p:1,my:2},
                           component:"div",
                           className:""
                          };
                        
     const inputOuterBoxProps = {sx:{m:2,display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",columnGap:"5%"},
                           component:"div",
                           className:""
                            };

        //   display:"grid",gridTemplateColumns:"1fr 1fr"
    const InputProps = {inputProps,inputFields,formBoxProps,formHeading,inputOuterBoxProps,inputBoxProps};

//----------------------------------------------------------------------

//--- { button styles } ------------------------------------------------


    const submitButton = {sx:{m:1,p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"dodgerblue"},
                          color:"primary",
                          variant:"contained",
                          type:"submit",
                          contentComponent:<PersonRoundedIcon/>,
                          loader:<CircularProgress size={25}/>,
                          contentText:" Send Mail"};


    const clearButton = {sx:{m:1,p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"red"},
                         color:"error",
                         type:"button",
                         variant:"contained",
                         contentComponent:<RestartAltIcon/>,
                         contentText:" Reset"};


    const buttonStyles = {submitButton,clearButton}

//----------------------------------------------------------------------

    const Props = {formOuterCard,InputProps,buttonStyles}; 


    return(
        <>
          <ADMIN_CUSTOMER_ADD_PAGE_ACTIONS Props={Props} />
        </>
    )
}


