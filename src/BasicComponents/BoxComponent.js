

//---- { Mui imports } ----------------------------
import Box from "@mui/material/Box";
//-------------------------------------------------


export function BoxComponent({props={},children}){

    const {sx={},className="",component="div",onClick=()=>{},onSubmit=(e)=>{e.preventDefault()}} = props;
 
    return(
      <Box sx={{...sx}} className={className} component={component} onClick={onClick} onSubmit={onSubmit}>
        {children}
      </Box>
    )
 
 }