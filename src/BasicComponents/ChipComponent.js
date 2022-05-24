//--- { Mui imports } -----------------------------------------
import Chip  from "@mui/material/Chip";
//-------------------------------------------------------------

export function ChipComponent({props={}}){

    const {sx={},className="",label="",color="success",variant=""} = props

    return(
        <Chip className={className} sx={{...sx}} label={label} color={color} variant={variant} />
    )
}