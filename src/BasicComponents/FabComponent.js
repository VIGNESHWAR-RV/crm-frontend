
//--- { Mui imports } ---------------------------------
import Fab from '@mui/material/Fab';
//-----------------------------------------------------

export function FabComponent({props={}}){

    const {sx={},className="",color="primary",type="button",variant="extended",isDisabled=false,loader="",onClick=()=>{},contentComponent="",contentText=""} = props
  
    return(
      <Fab 
         sx={{...sx}}
         className={className}
         color={color}
         type={type}
         variant={variant}
         disabled={isDisabled}
         onClick={onClick}>
          {(isDisabled && loader !== "")
               ?loader
               :contentComponent}
          {contentText}
      </Fab>
    )
  
  }


 