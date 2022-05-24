import "./TeamLead_Dashboard.css";

//--- { Mui imports } ---------------------------------------
// import Box from '@mui/material/Box';
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
//-----------------------------------------------------------

//--- { action component import } ---------------------------
import { TEAMLEAD_DASHBOARD_PAGE_ACTIONS } from "../../../pageActions/TeamLeadPageActions/DashboardActions/TEAMLEAD_DASHBOARD_PAGE_ACTIONS";
//-----------------------------------------------------------

export function TEAMLEAD_DASHBOARD_PAGE(){

    

    const dashBoardOuterDiv = {sx:{width:"100%",mb:9,height:"100%",display:"grid",gridTemplateColumns:"6fr 4fr"},
                               component:"div",
                               className:"DashBoardOuterDiv"
                              } 

//------------ { graph and notes props } -----------------------------------------------------------------

    //--------- { Outer Div props } -----------------------

    const graphAndNotesDiv = {sx:{width:"100%",overflow:"hidden"},
                              component:"div",
                              className:""
                             }

    //--------- { graph props } -----------------------------------------------------------------------

              const graphOutercard = {sx:{mx:2,my:4,height:"auto",minHeight:"40vh",minWidth:"15.75rem",borderRadius:"1.5rem",fontSize:"90%"},
                                       className:""
                                      }

              const graphInfoAndButtonBox = {sx:{display:"flex",flexFlow:"wrap"},
                                              component:"div",
                                              className:""
                                             }
           
              const graphChangeButton = {sx:{m:1,ml:"auto",borderRadius:"1rem",color:"dodgerblue"},
                                          size:"small",
                                          variant:"",
                                          type:"button",
                                          className:""
                                         }
            
              const graphSkeleton = {sx:{m:5, height:"38vh", fontSize: "15px",backgroundColor:"rgba(30, 144, 255,0.6)",borderRadius:"1rem"},
                                     variant:"rectangular",
                                     className:""
                                    }

              const textSkeleton = {sx:{mx:5,my:2,minWidth:"5rem",width:"15vw",height:"2rem",backgroundColor:"rgba(30, 144, 255,0.6)"},
                                    variant:"text",
                                    className:""
                                   }

              
         const graphProps = { graphOutercard,graphInfoAndButtonBox,graphChangeButton,graphSkeleton,textSkeleton };

    //---------- { Notes Props } ------------------------------------------------------------------------


              const notesOuterCard = {sx:{m:2,overflow:"hidden",borderRadius:"1.5rem",fontSize:"90%"},
                                      className:""
                                     }

              const notesHeadingButtonBox = {sx:{display:"flex",alignItems:"center"},
                                             component:"div",
                                             className:""
                                            }
          
              const notesButtonBox = {sx:{ml:"auto",display:"flex",flexFlow:"wrap",justifyContent:"center"},
                                      component:"div",
                                      className:""
                                     }
          
              const notesSaveButton = {sx:{backgroundColor:"dodgerblue",m:1,fontSize:"90%"},
                                      className:"",
                                      color:"primary",
                                      variant:"extended",
                                      type:"button",
                                      contentComponent:<SaveIcon/>,
                                      loader:<CircularProgress size={25} />,
                                      contentText:" Save"};
          
              const notesUpdatePath = "/admin/dashboard/notes";
          
              const notesClearButton = {sx:{m:1,fontSize:"90%",backgroundColor:"dodgerBlue"},
                                        className:"",
                                        color:"error",
                                        type:"button",
                                        variant:"extended",
                                        contentComponent:<ClearRoundedIcon/>,
                                        // loader:<CircularProgress size={25} />,
                                        contentText:" Clear"};
   
              const notesButtonSkeleton = {sx:{m:2,minWidth:"4rem",width:"8vw",height:"3rem",backgroundColor:"rgba(30, 144, 255,0.6)",borderRadius:"0.75rem"},
                                           variant:"text",
                                           className:""
                                          };

              const notesTextAreaSkeleton = {sx:{m:2, height:"50vh", fontSize:"15px",backgroundColor:"rgba(30, 144, 255,0.6)",borderRadius:"1rem"},
                                             variant:"rectangular",
                                             className:""
                                            }

             
         const notesProps = { notesOuterCard,notesHeadingButtonBox,notesButtonBox,notesSaveButton,notesClearButton,notesUpdatePath,notesButtonSkeleton,notesTextAreaSkeleton };

//------------ { info card and pending job props  } --------------------------------------------------------------------

    //--------- { Outer Div props } -----------------------
    const infoAndJobsDiv = {sx:{width:"100%"},
                            component:"div",
                            className:""
                           }
     
    //---------- { info cards props } ---------------------------------------------------------------------------------------------------------

               const infoOuterBox = {sx:{display:"grid",gridTemplateColumns:"1fr 1fr",minWidth:"16rem"},
                                     component:"div",
                                     className:""
                                    }
            
               const infoFirstCard = {sx:{m:2,mr:1,mt:4,borderRadius:"1.5rem",textAlign:"center",fontSize:"90%"},
                                     className:""
                                    }
            
               const infoSecondCard = {sx:{mt:4,mr:2,ml:1,mb:2,borderRadius:"1.5rem",textAlign:"center",fontSize:"90%"},
                                    className:""
                                   }

               const infoCardTextSkeleton = {sx:{mx:"auto",my:2,minWidth:"4rem",width:"10vw",height:"2.5rem",backgroundColor:"rgba(30, 144, 255,0.6)"},
                                              variant:"text",
                                              className:""
                                             };
               
         const infoProps = {infoOuterBox,infoFirstCard,infoSecondCard,infoCardTextSkeleton};

    //-----------{ pending job props } --------------------------------------------------------------------------------------------------

               const jobOuterCard = {sx:{m:2,borderRadius:"1.5rem",maxHeight:"55.5rem",height:"111vh",overflowY:"auto",fontSize:"90%"},
                                     className:"",
                                    };

               const jobHeadingCard = {sx:{position:"sticky",top:"0rem",zIndex:"2"},
                                       className:""
                                      } 

               const navPath = "/teamLead/customers/";

               const pendingCustomerCard={sx:{width:"100%",mb:1,border:"1px solid dodgerblue",borderRadius:"1rem"},
                                          className:""
                                         };

               const customerNameAndStatusBox={sx:{display:"flex",alignItems:"center"},
                                               className:""
                                              };

               const jobStatusChip = {sx:{m:1,ml:"auto",fontSize:"1rem",fontStyle:"bold"},
                                      className:""
                                     };
               
               
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
           
           
         const pendingJobProps = {jobOuterCard,jobHeadingCard,navPath,pendingCustomerCard,customerNameAndStatusBox,jobStatusChip,customerNameSkeleton,customerStatusSkeleton,jobDescriptionSekeleton};

//-----------------------------------------------------------------------------------------------------------------

     const Props = {dashBoardOuterDiv,graphAndNotesDiv,graphProps,notesProps,infoAndJobsDiv,infoProps,pendingJobProps}


    return(
        <>
        <TEAMLEAD_DASHBOARD_PAGE_ACTIONS Props={Props} />
        </>
    )
}





