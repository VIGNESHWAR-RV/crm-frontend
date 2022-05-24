
//---- { Mui imports }----------------------------
import Button  from "@mui/material/Button";
//------------------------------------------------

export function ButtonComponent({props={}}){

    const {sx={},className="",color="primary",type="button",size="medium",variant="contained",onClick=()=>{},contentComponent="",loader="",isDisabled=false,contentText=""} = props

    return(
      <Button 
         sx={{...sx}}
         className={className}
         color={color}
         type={type}
         variant={variant}
         size={size}
         disabled={isDisabled}
         onClick={onClick}>
         {(isDisabled && loader !== "")
            ?loader
            :contentComponent}
         {contentText}
      </Button>
    )

}
