import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import { ButtonComponent } from "../BasicComponents/ButtonComponent";
import { useContext } from "react";
import { context } from "../App";


export function CustomerDialog({dialogProps={},states={},dialogHandlers={}}){

    const { mode } = useContext(context)

    const { handleConfirmSubmit="",handleDialog="",handleConfirmDelete="" } = dialogHandlers;

    const {dialogCancelButton={},dialogSubmitButton={}} = dialogProps;

    return(
        <Dialog open={states.dialogOpen} onClose={handleDialog} sx={{'& .MuiDialog-paper': {background:(mode)?"rgb(20,20,20)":"rgb(240,240,240)"} }}>
           <DialogTitle sx={{fontSize:"larger"}}>
                <b>
                {(states.action === "delete")
                  ? "Confirm Delete"
                  :"Confirm Changes"}
                </b>
           </DialogTitle>
           <DialogActions>
                <ButtonComponent props={{...dialogCancelButton,onClick:handleDialog}}/>
                <ButtonComponent props={{...dialogSubmitButton,contentText:(states.action === "delete")?"Confirm Delete":"Confirm Changes",onClick:(states.action === "delete")?handleConfirmDelete:handleConfirmSubmit}} />
           </DialogActions>
        </Dialog>
    )
}