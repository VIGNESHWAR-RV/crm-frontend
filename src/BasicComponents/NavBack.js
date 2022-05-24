//---- { react && react-router-dom imports }-------------
import { useNavigate } from "react-router-dom";
//--------------------------------------------------------

//--- { Mui imports } -----------------------------------
import Fab from '@mui/material/Fab';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
//-------------------------------------------------------

export function Navback({props={}}){

    const {sx={},className="",variant="contained",color="primary"} = props;

    // console.log(sx);
    const navigate = useNavigate();

    return (
        <Fab sx={{m:1,backgroundColor:"dodgerblue",...sx}}
               className={className} 
               variant={variant} 
               color={color} 
               onClick={()=>navigate(-1)}>
                   <ArrowBackRoundedIcon/>
        </Fab>
    )

}