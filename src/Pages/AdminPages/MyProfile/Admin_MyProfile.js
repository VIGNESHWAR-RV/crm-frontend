

//--------- { MUI } imports -------------------------
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { Navback } from '../../../BasicComponents/NavBack';
import { CardComponent } from "../../../BasicComponents/CardComponent";
//---------------------------------------------------

//--------- { action component imports } --------------------------
import { ADMIN_MY_PROFILE_PAGE_ACTIONS } from "../../../pageActions/AdminPageActions/MyprofileActions/ADMIN_MY_PROFILE_PAGE_ACTIONS";
//---------------------------------------------------------------


export function ADMIN_MY_PROFILE(){

    // --- Common Data ----------------------------------------------------------------------------
                                        
        //regex patterns
        const regex = {firstName:"^[a-zA-Z]{2,}$",
                        lastName:"^[a-zA-Z]{2,}$",
                        password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",
                        userName:"^[A-Z0-9-]{9,9}$",
                        role:"^[a-z ]{5,}$",
                        status:"^[A-Z-]{2,}$",
                        company:`^[a-zA-Z0-9.'",@ ()-_]{1,}$`,
                        email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                       };

        //input field props
         const InputProps = {
                             name:"", //will be set during mapping in personal data component
                             label:"", //will be set during mapping in personal data component
                             pattern:"", //will be set during mapping in personal data component
                             defaultValue:"", //will be set during mapping in personal data component
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
         const helperText = {firstName:["should be atleast 2 letters"],
                             lastName:["should be atleast 2 letters"],
                             email:["your valid email address"],
                             role:["Select to change role"],
                             status:["Select to change status"],
                            };

// --------------------------------------------------------------------------------


const tableOuterBox = {sx:{display:"grid"},
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
               variant:"text",className:""};

const buttonSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.6)",m:2,minWidth:"4rem",width:"12vw",height:"1.5rem"},
                variant:"text",className:""};


// props required for heading component
const headingProps = {saveButton,cancelButton,editFabButton,titleSkeleton,buttonSkeleton};

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
                            contentText:"Confirm Changes"};

//props required for dialog component
const dialogProps = {dialogCancelButton,dialogSubmitButton};


// -----------------------------------------------------------------------------

// --- { common styles for personal data , work details , revenue details }
const SkeletonName =  {sx:{fontWeight:"500",justifySelf:"center",minWidth:"5rem",width:"10vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                variant:"text",
                className:""
               }

const SkeletonValue = {sx:{fontWeight:"500",justifySelf:"start",minWidth:"5rem",width:"15vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                variant:"text",
                className:""
               }

//---------------------------------------------------------------------------------


// --- Personal Data Component -------------------------------------------------

const personalAndTeamOuterBox = {sx:{display:"grid",gridTemplateColumns:"1fr",my:3},
                          component:"div",
                          className:""
                         };

 // required fields for personal data component
const personalDataFields = [ {heading:"First Name",
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
                               {heading:"User Name",field:"userName"},
                               {heading:"Role",field:"role"},
                               {heading:"Company Name",field:"company"},
                               {heading:"Joined Date",field:"joinedDate"}
                            ];

//props required for personal data component
const personalDataProps = {InputProps,personalDataFields,SkeletonName,SkeletonValue}



//---------------------------------------------------------------------------------------

const signOutButton= {sx:{width:"98%",m:2},
                      className:"",
                      color:"error",
                      variant:"contained",
                      type:"button",
                      contentText:"sign out"}

const infoPageOuterCard = {sx:{m:2,mb:5,overflowX:"auto",borderRadius:"1.5rem"},
                    className:""
                   }

const Props =  {tableOuterBox,headingOuterBox,headingProps,dialogProps,personalAndTeamOuterBox,personalDataProps,signOutButton}




    return(
        <>
         <CardComponent props={{...infoPageOuterCard}}>
             <Navback/>

             <ADMIN_MY_PROFILE_PAGE_ACTIONS Props={Props}/>

         </CardComponent>
        </>
    )
}




