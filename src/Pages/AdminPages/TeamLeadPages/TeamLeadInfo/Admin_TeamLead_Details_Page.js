import "./Admin_TeamLead_Details_Page.css";

//--------- { MUI } imports -------------------------
// import Card from '@mui/material/Card';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { Navback } from '../../../../BasicComponents/NavBack';
//---------------------------------------------------

//--------- { Page Container imports } --------------------------
import { ADMIN_TEAM_LEAD_PAGE_ACTIONS } from '../../../../pageActions/AdminPageActions/TeamLeadActions/ADMIN_TEAM_LEAD_PAGE_ACTIONS';
import { CardComponent } from "../../../../BasicComponents/CardComponent";
//---------------------------------------------------------------


export function ADMIN_TEAM_LEAD_PAGE(){


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


    const tableOuterBox = {sx:{},
                           component:"form",
                           className:""
                          };


//---- Heading Component ----------------------------------------------------------

    const headingOuterBox = {sx:{display:"flex",alignItems:"baseline"},
                             component:"div",
                             className:""
                            };
  
    const saveButton = {sx:{m:1,p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"dodgerblue"},
                        color:"primary",
                        variant:"contained",
                        type:"submit",
                        contentComponent:<SaveIcon/>,
                        loader:<CircularProgress size={25} />,
                        contentText:"Save"};

    const cancelButton = {sx:{m:1,p:1,px:2,borderRadius:"1.5rem",fontSize:"1rem",backgroundColor:"red"},
                          color:"error",
                          type:"button",
                          variant:"contained",
                          contentComponent:<ClearRoundedIcon/>,
                          contentText:"Cancel"};

    const editFabButton = {sx:{m:1,px:2,fontSize:"0.9rem",backgroundColor:"orange"},
                           color:"warning",
                           type:"button",
                           variant:"extended",
                           contentComponent:<EditRoundedIcon/>,
                           contentText:"Edit"};

    const deleteButton = {sx:{m:1,p:1,px:2,borderRadius:"1.5rem",fontSize:"1.1rem",backgroundColor:"red"},
                          color:"error",
                          type:"button",
                          variant:"contained",
                          contentComponent:<DeleteForeverRoundedIcon/>,
                          contentText:"Delete"};

    const titleSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.6)",m:2,minWidth:"10rem",width:"40vw",height:"1.5rem"},
                          variant:"text"};

    const buttonSkeleton = {sx:{backgroundColor:"rgba(30, 144, 255,0.6)",m:2,minWidth:"4rem",width:"12vw",height:"1.5rem"},
                           variant:"text"};


     // props required for heading component
    const headingProps = {saveButton,cancelButton,editFabButton,deleteButton,titleSkeleton,buttonSkeleton};
 
//------------------------------------------------------------------------------


// --- Dialogs Component -------------------------------------------------------

    const dialogCancelButton = {sx:{},
                          color:"error",
                          variant:"contained",
                          type:"button",
                          contentText:"Cancel"};

    const dialogSubmitButton = {sx:{backgroundColor:"dodgerblue"},
                          color:"primary",
                          variant:"contained",
                          loader:<CircularProgress size={25}/>,
                          type:"submit"};

   //props required for dialog component
   const dialogProps = {InputProps, regex,dialogCancelButton,dialogSubmitButton};


// -----------------------------------------------------------------------------

// --- { common styles for personal data , work details , revenue details }
    const SkeletonName =  {sx:{fontWeight:"500",justifySelf:"center",minWidth:"5rem",width:"10vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                           variant:"text"
                          }

    const SkeletonValue = {sx:{fontWeight:"500",justifySelf:"start",minWidth:"5rem",width:"15vw",backgroundColor:"rgba(30, 144, 255,0.6)"},
                           variant:"text"
                          }

//---------------------------------------------------------------------------------


// --- Personal Data Component -------------------------------------------------

  const personalAndTeamOuterBox = {sx:{display:"grid",gridTemplateColumns:"5fr 4fr",my:3},
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
                                  }
                                ];
    
       //props required for personal data component
    const personalDataProps = {InputProps,personalDataFields,SkeletonName,SkeletonValue}

// ------------------------------------------------------------------------------    



// --- Team members Component ---------------------------------------------------

    const memberChip = {sx:{m:1,p:2,fontSize:"1.5rem",fontStyle:"italic",backgroundColor:"dodgerblue"},
                        color:"primary"
                       };

    const SkeletonInner = {sx:{backgroundColor:"rgba(30,114,255,0.6)",width:"8vw",height:"2rem",m:2,mb:0},
                          variant:"text"};

    const SkeletonOuter = {sx:{backgroundColor:"rgba(30,114,255,0.6)",width:"8vw",height:"2rem"},
                          variant:"text"};

    const teamMembersProps = {memberChip,SkeletonInner,SkeletonOuter};

// ----------------------------------------------------------------------------------


    const workAndJobsOuterBox = {sx:{display:"grid",gridTemplateColumns:"5fr 4fr",my:3},
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
    const  roleOptions = [{name:"Role",value:"",disabled:true,sx:{color:"dodgerblue"}},
                          {name:"Employee",value:"employee"},
                          {name:"Team Lead",value:"team lead"},
                          {name:"Admin",value:"admin"},
                         ];

         // required fields for work details section 
    const workDetailFields = [   {heading:"User Name",field:"userName"},

                                 {heading:"Status",
                                  field:"status",
                                  type:"select",
                                  pattern:regex.status,
                                  helperText:helperText.status,
                                //   defaultValue:states?.userData?.status??"",
                                //   typing:work_detail_handle_change
                                },

                                 {heading:"Role",
                                  field:"role",
                                  type:"select",
                                  pattern:regex.role,
                                  helperText:helperText.role,
                                //   defaultValue:states?.userData?.role??"",
                                //   typing:work_detail_handle_change
                                },

                                 {heading:"Joined Date",field:"joinedDate"},
                                 {heading:"Pending Jobs",field:"pendingJobs"},
                                 {heading:"Completed Jobs",field:"completedJobs"},
                                ];

    const statusChip = {sx:{borderRadius:"2rem",px:3,height:"50%",fontWeight:"bolder"},
                        color:"success"
                       }

    const roleChip = {sx:{borderRadius:"2rem",px:2,height:"50%",fontSize:"1rem",fontWeight:"bolder"},
                      color:"success"
                     }

                
         // props required for work details section
    const workDetailProps = {workDetailFields,InputProps,statusOptions,roleOptions,statusChip,roleChip,SkeletonName,SkeletonValue}


// ---- { revenue details component } ---------------------------------------------------

         // required fields and props for revenue details section
    const revenueDetailsHeadings = [{heading:"Current Week",field:"currentWeek"},
                                    {heading:"Total",field:"total"}
                                   ];

    const revenueDetailProps = {revenueDetailsHeadings,SkeletonName,SkeletonValue};
    
//---------------------------------------------------------------------------------------

    // const pendingJobs = [];

    const jobOuterCard = {sx:{mr:3,border:"1px solid dodgerblue",maxHeight:"48rem",overflowY:"auto",borderRadius:"1rem"},
                          className:""
                         }

    const jobHeadingCard = {sx:{position:"sticky",top:"0rem",zIndex:"2"},
                            className:""
                           } 

    const navPath = "/admin/customers/";

   const pendingCustomerCard={sx:{width:"100%",mb:1,border:"1px solid dodgerblue",borderRadius:"1rem",cursor:"pointer"}};

   const jobStatusChip = {sx:{m:1,ml:"auto",fontSize:"1rem",fontStyle:"bold"},
                          className:""
                         };

   const customerNameAndStatusBox={sx:{display:"flex",alignItems:"center"}};
   
   
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


const pendingJobProps = {jobOuterCard,jobHeadingCard,jobStatusChip,navPath,pendingCustomerCard,customerNameAndStatusBox,customerNameSkeleton,customerStatusSkeleton,jobDescriptionSekeleton};


//---------------------------------------------------------------------------------------


    const infoPageOuterCard = {sx:{m:2,mb:5,overflowX:"auto",borderRadius:"1.5rem"},
                               className:""
                              }

const Props =  {tableOuterBox,headingOuterBox,headingProps,dialogProps,personalAndTeamOuterBox,personalDataProps,teamMembersProps,workAndJobsOuterBox,workDetailProps,revenueDetailProps,pendingJobProps}

    return(
        <>
          <CardComponent props={{...infoPageOuterCard}}>
  
                {/* navigate back button */}
              <Navback/>
  
              <ADMIN_TEAM_LEAD_PAGE_ACTIONS Props={Props}/>
  
          </CardComponent>
        </>
    )
}


