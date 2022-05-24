//-------- { react , react-router-dom imports } -----
import { useContext } from 'react';
//---------------------------------------------------

//--------- { MUI imports } -------------------------
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//---------------------------------------------------

//--------- { Component imports } -------------------
import { InputComponent } from "../../../BasicComponents/InputComponent";
import { context } from "../../../App";
import { ButtonComponent } from '../../../BasicComponents/ButtonComponent';
//---------------------------------------------------

//---- { Util imports } -----------------------------
import { optionsGenerator } from '../../../Util';
//---------------------------------------------------

export function Dialogs({dialogProps={},states={},dialogHandlers=[]}){

    const {InputProps={},regex={},dialogCancelButton={},dialogSubmitButton={}} = dialogProps;

    const [handleSubmit=()=>{},handleDialog=()=>{},handleConfirmDelete=()=>{},handleTeamLeadChange=()=>{},handleTeamMemberChange=()=>{}] = dialogHandlers;


    let options = [];

    if(states.action === "delete" || states.action === "newTeamLead"){

          options = optionsGenerator(states.teamLeads,"userName","Team Lead"); // (array of object , object key , role name );
    }
    else if(states.action === "newTeamMember"){


         options = optionsGenerator(states.updatedTeamMembers,"userName","Team Member"); // (array of object , object key , role name );

    }

    const { mode } = useContext(context);

    return(
        <Dialog open={states?.dialogOpen??false} 
                 sx={{'& .MuiDialog-paper': {background:(mode)?"rgb(20,20,20)":"rgb(240,240,240)"}                
                      }} 
                 onClose={handleDialog}>
            <Box component="form" onSubmit={(e)=>(states.action === "delete")
                                           ?handleConfirmDelete(e)
                                           :handleSubmit(e)}>
                 <DialogTitle>
                     <b>{(states.action === "newTeamMember")
                                     ? "Team Member Change"
                                     : "Team Lead Change"}
                     </b>
                 </DialogTitle>

                 <DialogContent>

                        <i style={{fontWeight:"100",fontSize:"1rem"}}>
                                     {(states.action === "newTeamMember")
                                            ?`Select One of your Team Members to change Customers of 
                                                 "${states.removedTeamMembersWithJobs.map((member)=>member.userName).join('" , "')}"`
                                    :"Select an Team Lead to change Team Members and customers"}</i>
    
    
                         <InputComponent inputProps={{...InputProps,type:"select",pattern:regex.userName,options,
                                                              typingPatternErrorCheck:null,
                                                              blurPatternErrorCheck:null,
                                                              name:(states.action === "newTeamMember")
                                                                        ?"teamMember"
                                                                        :"teamLead",
                                                              typing:(states.action === "newTeamMember")
                                                                        ?handleTeamMemberChange
                                                                :handleTeamLeadChange}}
                                                                />

                 </DialogContent>

                 <DialogActions>
                           <ButtonComponent props={{...dialogCancelButton,isDisabled:states?.isDisabled??false,onClick:handleDialog}} />
                           <ButtonComponent props={{...dialogSubmitButton,isDisabled:states?.isDisabled??false,contentText:(states.action === "delete" ?"Confirm Delete" :"Confirm changes" )}} />
                 </DialogActions>

            </Box>
        </Dialog>
    )
}