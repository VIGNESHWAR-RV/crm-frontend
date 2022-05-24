//--------- { MUI } imports -------------------------
import Box from '@mui/material/Box';
//---------------------------------------------------

//-------- { Component imports } --------------------
import { SkeletonComponent } from '../BasicComponents/SkeletonComponent';

export function RevenueData({states={},revenueDetailProps={}}){

    const {revenueDetailsHeadings=[],SkeletonName={},SkeletonValue={}} = revenueDetailProps

    return(
        <>
            {(states.userData)
              ?  <Box>
                    {/* --- revenue Details ------------------*/}
        
                    <h1 style={{marginLeft:"6%",color:"dodgerblue"}}><i>Revenue</i></h1>
        
                    {revenueDetailsHeadings.map(({heading,field},index)=>
                    <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",alignItems:"center",justifyItems:"start",overflow:"hidden"}}>
                       <h2 style={{fontWeight:"500",justifySelf:"center"}}>{heading} </h2>
                       <h4>-</h4>
                       <h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{states.userData[field]}</h2>
                    </Box>)}
                 </Box>
              :  <Box>
                    <h1 style={{marginLeft:"6%",color:"dodgerblue"}}><i>Revenue</i></h1>
                    {revenueDetailsHeadings.map(({heading},index)=>
                          <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",alignItems:"center",justifyItems:"start",overflow:"hidden"}}>
                             <SkeletonComponent props={{...SkeletonName}} />
                             <h4>-</h4>
                             <SkeletonComponent props={{...SkeletonValue}} />
                          </Box>)}
                 </Box>
               }
        </>
    )

}