

//--------- { MUI } imports -------------------------
import Box from '@mui/material/Box';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { InputComponent } from "../BasicComponents/InputComponent";
import { SkeletonComponent } from '../BasicComponents/SkeletonComponent';
import { ChipComponent } from '../BasicComponents/ChipComponent';
//---------------------------------------------------



export function WorkData({workDetailProps={},states={},handleChange=""}){

         // assigning to empty string "" to conditionally prevent from rendering
    const {workDetailFields=[],InputProps="",statusOptions="",roleOptions="",statusChip={},roleChip={},SkeletonName={},SkeletonValue={}} = workDetailProps;


    return(
        <>
        {(states.userData)
          ? <>
                {/* --- work details --------------------*/}
        
                <h1 style={{marginLeft:"5%",color:"dodgerblue"}}><i>Work Status</i></h1>
        
                {workDetailFields.map(({heading,field,type="",pattern="",helperText=""},index)=>
                    <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",alignItems:"center",justifyItems:"start",overflow:"hidden"}}>
                       <h2 style={{fontWeight:"500",justifySelf:"center"}}>{heading} </h2>
                       <h4>-</h4>
        
                       {(states.edit && InputProps !== "" && handleChange !== "" && statusOptions!=="" && roleOptions!=="")
        
                               ?(field === "status")  // if edit === true && field name is status
                                  ?<InputComponent  inputProps={{...InputProps,name:field,type,pattern,helperText,defaultValue:states?.userData?.[field]??"",typing:handleChange,disabled:states.isDisabled,options:statusOptions}}/>
                                  :(field === "role") // if edit === true && field name is role
                                      ?<InputComponent  inputProps={{...InputProps,name:field,type,pattern,helperText,defaultValue:states?.userData?.[field]??"",typing:handleChange,disabled:states.isDisabled,options:roleOptions}}/>
                                      :<h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic",textTransform:"capitalize"}}>{states.userData[field]}</h2>   
             
                               :(field === "status")  // if edit === false && field name is status
                                      ?<ChipComponent props={{...statusChip,label:states.userData[field],color:(states.userData.status === "ACTIVE")?"success":"error"}} />
                                      :(field === "role") // if edit === false && field name is role
                                           ?<ChipComponent props={{...roleChip,label:states.userData[field]}} />
                                           :<h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic",textTransform:"capitalize"}}>{states.userData[field]}</h2>}    
                    </Box>)}
            </>
          :<>
              <h1 style={{marginLeft:"5%",color:"dodgerblue"}}><i>Work Status</i></h1>
              {workDetailFields.map(({heading},index)=>
                    <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",alignItems:"center",justifyItems:"start",overflow:"hidden"}}>
                       <SkeletonComponent props={{...SkeletonName}} />
                       <h4>-</h4>
                       <SkeletonComponent props={{...SkeletonValue}} />
                    </Box>)}
           </>
        }
        </>
    )
}
