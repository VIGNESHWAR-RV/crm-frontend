
import { Box } from '@mui/material';
import { SkeletonComponent } from "../BasicComponents/SkeletonComponent";
import { TextFieldComponent } from "../BasicComponents/TextFieldComponent";
import { DateComponent } from "../BasicComponents/DateComponent";
import { InputComponent } from '../BasicComponents/InputComponent';

import { giveDate, optionsGenerator } from "../Util";

export function CustomerTaskDetails({taskDetailProps={},states={},handleChange=""}){

    const {taskDetailFields=[],inputProps={},taskStatusOptions={},SkeletonName={},SkeletonValue={},dataField="customerData"} = taskDetailProps;  //statusChip={}

    // console.log(states);

    return(
        <>
        {(states[dataField])
                ?  <Box
                      sx={{'& > :not(style)': {} }}>
        
                            <h1 style={{marginLeft:"5%",color:"dodgerblue"}}><i>Task Details</i></h1>
                            {taskDetailFields.map(({heading,field,type,pattern,helperText,optionName,disablePast},index)=>

                                  <Box key={index}>
                                    {(heading !== "Service Charge" && heading !== "Completed On")
                                       ? <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",height:(states.edit)?"12vh":"auto",my:2,mb:(type === "textArea" && states.edit)?10:2,alignItems:"center",justifyItems:"start"}}>
                                          <h2 style={{fontWeight:"500",justifySelf:"center"}}>{heading} </h2>
                                          <h4>-</h4>
                                           {(states.edit && handleChange !== "" && inputProps !== "")
                                                 ?(type === "text" || type === "select")
                                                     ?<InputComponent inputProps={{...inputProps,name:field,type,pattern,helperText,disabled:states.isDisabled,defaultValue:states?.[dataField]?.[field]??"",typing:handleChange,options:(type==="select")?(field === "status")?taskStatusOptions:optionsGenerator(states[optionName],"userName",heading):[]}}/>
                                                     : (type === "textArea")
                                                          ? <TextFieldComponent inputProps={{...inputProps,name:field,type,pattern,helperText,disabled:states.isDisabled,defaultValue:states?.[dataField]?.[field]??"",typing:handleChange}} />
                                                          :(type === "date")
                                                              ? <DateComponent inputProps={{...inputProps,name:field,type,pattern,disablePast,helperText,disabled:states.isDisabled,defaultValue:states?.[dataField]?.[field]??"",typing:handleChange}} />                                                          
                                                              : <h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{states[dataField][field]}</h2>
                                                 :<h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{(type === "date")?giveDate(states[dataField][field]):states[dataField][field]}</h2>
                                                   }
                                         </Box>
                                       :(states.isTaskCompleted)
                                           ?(heading === "Service Charge")
                                                ?<Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",height:(states.edit)?"12vh":"auto",my:2,mb:(type === "textArea" && states.edit)?10:2,alignItems:"center",justifyItems:"start"}}>
                                                    <h2 style={{fontWeight:"500",justifySelf:"center"}}> {heading} </h2>
                                                    <h4>-</h4>
                                                    {(states.edit && handleChange !== "" && inputProps !== "")
                                                         ?(type === "number")
                                                               ?<InputComponent inputProps={{...inputProps,name:field,type,pattern,helperText,disabled:states.isDisabled,defaultValue:states?.[dataField]?.[field]??"",typing:handleChange,options:(type==="select")?(field === "status")?taskStatusOptions:optionsGenerator(states[optionName],"userName",heading):[]}}/>
                                                               :""
                                                         : <h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{states[dataField][field]}</h2>
                                                      }
                                                 </Box>
                                               :""
                                           :(heading === "Completed On")
                                               ? (states[dataField].status === "completed")
                                                    ? <h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{states[dataField][field]}</h2>
                                                    :""
                                               :""}
                                 </Box>
                                )}
            
                   </Box>
                :  <Box>
                      <h1 style={{marginLeft:"5%",color:"dodgerblue"}}>Task Details</h1>
                      {taskDetailFields.map(({value},index)=>
                                <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",height:(states.edit)?"12vh":"auto",my:2,pt:1,alignItems:"center",justifyItems:"start"}}>
                                  <SkeletonComponent props={{...SkeletonName}} />
                                  <h4>-</h4>
                                  <SkeletonComponent props={{...SkeletonValue}} />
                                </Box>)}
                   </Box>}
        </>
    )
}

