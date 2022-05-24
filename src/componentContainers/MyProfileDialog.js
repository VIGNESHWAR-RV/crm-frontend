import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import { ButtonComponent } from "../BasicComponents/ButtonComponent";
import { useContext } from "react";
import { context } from "../App";


export function MyProfileDialog({dialogProps={},states={},dialogHandlers={}}){

    const { mode } = useContext(context)

    const { handleConfirmSubmit="",handleDialog="",handleConfirmSignOut="" } = dialogHandlers;

    const {dialogCancelButton={},dialogSubmitButton={}} = dialogProps;



    return(
        <Dialog open={states.dialogOpen} onClose={handleDialog} sx={{'& .MuiDialog-paper': {background:(mode)?"rgb(20,20,20)":"rgb(240,240,240)"} }}>
           <DialogTitle sx={{fontSize:"larger"}}>
                <b>
                  {(states.action === "update")
                     ? "Confirm to update the changes"
                     : "Confirm to log out of CRM"}
                </b>
           </DialogTitle>
           <DialogActions>
                <ButtonComponent props={{...dialogCancelButton,onClick:handleDialog}} />
                <ButtonComponent props={{...dialogSubmitButton,contentText:(states.action === "update")?"Confirm Changes":"Sign Out",onClick:(states.action === "update")?handleConfirmSubmit:handleConfirmSignOut}} />
           </DialogActions>
        </Dialog>
    )
}
