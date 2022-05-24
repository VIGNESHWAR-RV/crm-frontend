
//-----{ Mui imports }---------------------
import Chip from "@mui/material/Chip";
import { statusColorGenerator } from "../Util";
//-----------------------------------------

export function TitleWithBadge({states={},dataField,fields=["firstName","lastName","role"]}){

    return(
         <h1 style={{margin:"2%"}}>
         <i>{states[dataField][fields[0]] + " "+ states[dataField][fields[1]]} </i>
         {(dataField === "userData")
             ? <Chip sx={{textTransform:"capitalize"}}
                label={states[dataField][fields[2]]}
                color="success"/>
             :(fields[2] === "status")
               ? <Chip sx={{textTransform:"capitalize"}}
                       label={states[dataField][fields[2]]}
                       color={statusColorGenerator(states[dataField][fields[2]])}/>
               :""}
        </h1> 
    )
  }
  