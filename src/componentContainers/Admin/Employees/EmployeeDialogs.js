// //-------- { react , react-router-dom } imports ----
import { useContext } from 'react';
// //--------------------------------------------------

//--------- { MUI } imports -------------------------
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { InputComponent } from "../../../BasicComponents/InputComponent";
import { context } from "../../../App";
import { ButtonComponent } from '../../../BasicComponents/ButtonComponent';
import { optionsGenerator } from '../../../Util';
//---------------------------------------------------

export function Dialogs({dialogProps={},states={},dialogHandlers=[]}){

    const {InputProps={},regex={},dialogCancelButton={},dialogSubmitButton={}} = dialogProps;

    const [handleSubmit=()=>{},handleDialog=()=>{},handleConfirmDelete=()=>{},handleTeamMemberChange=()=>{}] = dialogHandlers;


    let options = [];

     if(states.action === "newTeamMember" || states.action === "delete"){

        options = optionsGenerator(states.teamMembers,"userName","Team Member"); // (array of object , object key , role name );

     }

    const { mode } = useContext(context);

    return(
        <>
        {(states.dialogOpen)
            ?<Dialog open={states.dialogOpen} 
                      sx={{'& .MuiDialog-paper': {background:(mode)?"rgb(20,20,20)":"rgb(240,240,240)"}                
                           }} 
                      onClose={handleDialog}>
                    <Box component="form" onSubmit={(e)=>(states.action === "delete")
                                                   ?handleConfirmDelete(e,states.userData.userName)
                                                   :handleSubmit(e)}>
                         <DialogTitle>
                             <b>
                                { "Team Member Change"}
                             </b>
                         </DialogTitle>
      
                         <DialogContent>
      
                                <i style={{fontWeight:"100",fontSize:"1rem"}}>
                                     Select One of your Team Members to change Customers of " {states.userData.userName} "
                                     </i>
          
          
                                 <InputComponent inputProps={{...InputProps,
                                                              type:"select",
                                                              pattern:regex.userName,
                                                              options,
                                                              typingPatternErrorCheck:null,
                                                              blurPatternErrorCheck:null,
                                                              name:"teamMember",
                                                              typing:handleTeamMemberChange }}
                                />
      
                         </DialogContent>
      
                         <DialogActions>
                                   <ButtonComponent props={{...dialogCancelButton,isDisabled:states?.isDisabled??false,onClick:handleDialog}} />
                                   <ButtonComponent props={{...dialogSubmitButton,isDisabled:states?.isDisabled??false,contentText:(states.action === "delete" ?"Confirm Delete" :"Confirm changes" )}} />
                         </DialogActions>
      
                    </Box>
            </Dialog>
            :""}
        </>
    )
}