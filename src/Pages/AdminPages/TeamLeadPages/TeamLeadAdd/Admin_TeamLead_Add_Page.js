import "./Admin_TeamLead_Add_Page.css";

//---- { Mui imports } --------------------------------------
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CircularProgress from '@mui/material/CircularProgress';
//-----------------------------------------------------------

//---- { component imports } ------------------------------------------
import { ADMIN_TEAM_LEAD_ADD_PAGE_ACTIONS } from "../../../../pageActions/AdminPageActions/TeamLeadActions/ADMIN_TEAM_LEAD_ADD_PAGE_ACTIONS"
//----------------------------------------------------------------------



export function ADMIN_TEAM_LEAD_ADD_PAGE(){

//--- { card style } --------------------------------------------------

    const formOuterCard = {sx:{m:2,maxWidth:"50rem",borderRadius:"1.5rem"},
                           className:""
                          }

//--------------------------------------------------------------------

//--- { input props } -------------------------------------------------

       //regex patterns
    const regex = {firstName:"^[a-zA-Z.]{2,}$",
                   lastName:"^[a-zA-Z.]{2,}$",
                   password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",
                   userName:"^[A-Z0-9-]{9,9}$",
                   role:"^[a-z ]{5,}$",
                   status:"^[A-Z-]{2,}$",
                   company:`^[a-zA-Z0-9.'",@ ()-_]{1,}$`,
                   email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
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
                         sx:{fontSize:"large",p:1} }

        //helperText for different fields
    const helperText = {firstName:["should be atleast 2 letters"],
                        lastName:["should be atleast 2 letters"],
                        email:["your valid email address"],
                        role:["Select to change role"],
                        status:["Select to change status"],
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
                           }
                        ];

    const formBoxProps = {sx:{p:2},
                          component:"form",
                          className:""
                         }

    const formHeading = "Create New Team Lead";

    const inputBoxProps = {sx:{p:1,my:2},
                           component:"div",
                           className:""
                          };

    const InputProps = {inputProps,inputFields,formBoxProps,formHeading,inputBoxProps};

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
          <ADMIN_TEAM_LEAD_ADD_PAGE_ACTIONS Props={Props} />
        </>
    )
}


