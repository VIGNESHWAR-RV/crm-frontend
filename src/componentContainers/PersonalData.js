//--- { react imports } ----------------------------
// import { useReducer } from 'react';
//--------------------------------------------------

//--------- { MUI } imports -------------------------
import Box from '@mui/material/Box';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { InputComponent } from "../BasicComponents/InputComponent";
import { SkeletonComponent } from '../BasicComponents/SkeletonComponent';
//---------------------------------------------------


export function PersonalData({personalDataProps={},states={},handleChange=""}){

        // assigning to empty string "" to conditionally prevent from rendering
   const {InputProps="",personalDataFields=[],SkeletonName={},SkeletonValue={}} = personalDataProps;



    return(
        <>
        {(states.userData)
           ?  <Box
                 sx={{'& > :not(style)': {} }}>
       
                       <h1 style={{marginLeft:"5%",color:"dodgerblue"}}><i>Personal Profile</i></h1>
                       {personalDataFields.map(({heading,field,type,pattern,helperText},index)=>
                         <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",height:(states.edit)?"12vh":"auto",my:2,pt:1,alignItems:"center",justifyItems:"start"}}>
                           <h2 style={{fontWeight:"500",justifySelf:"center"}}>{heading} </h2>
                           <h4>-</h4>
                            {(states.edit && handleChange !== "" && InputProps !== "")
                                  ?(type === "text" || type === "number" || type === "select")
                                      ?<InputComponent inputProps={{...InputProps,name:field,type,pattern,helperText,disabled:states.isDisabled,defaultValue:states?.userData?.[field]??"",typing:handleChange}}/>
                                      :<h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{states.userData[field]}</h2>
                                  :<h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{states.userData[field]}</h2>
                                    }
                         </Box>)}
       
              </Box>
           :  <Box>
                 <h1 style={{marginLeft:"5%",color:"dodgerblue"}}>Personal Profile</h1>
                 {personalDataFields.map(({value},index)=>
                           <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",height:(states.edit)?"12vh":"auto",my:2,pt:1,alignItems:"center",justifyItems:"start"}}>
                             <SkeletonComponent props={{...SkeletonName}} />
                             <h4>-</h4>
                             <SkeletonComponent props={{...SkeletonValue}} />
                           </Box>)}
              </Box>}
        </>
    )
}