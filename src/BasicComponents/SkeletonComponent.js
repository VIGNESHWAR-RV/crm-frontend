
//---- { Mui imports } -------------------------
import Skeleton from '@mui/material/Skeleton';
//----------------------------------------------

export function SkeletonComponent({props={}}){

    const {sx={},className="",variant="text"} = props
 
    return(
      <Skeleton sx={{...sx}} className={className} variant={variant} />
    )
 }