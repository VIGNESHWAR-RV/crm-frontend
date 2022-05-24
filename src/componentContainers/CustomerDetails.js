
import { Box } from '@mui/material';
import { SkeletonComponent } from "../BasicComponents/SkeletonComponent";
import { TextFieldComponent } from "../BasicComponents/TextFieldComponent";
import { DateComponent } from "../BasicComponents/DateComponent";
import { InputComponent } from '../BasicComponents/InputComponent';




export function CustomerDetails({customerDataProps={},states={},handleChange=""}){

    const {inputProps={},customerDataFields=[],SkeletonName={},SkeletonValue={},dataField="customerData"} = customerDataProps;

    return(
        <>
     {(states[dataField])
                ?  <Box
                      sx={{'& > :not(style)': {} }}>
            
                            <h1 style={{marginLeft:"5%",color:"dodgerblue"}}><i>Customer Details</i></h1>
                            {customerDataFields.map(({heading,field,type,pattern,helperText},index)=>
                              <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",height:(states.edit)?"12vh":"auto",my:2,mb:(type === "textArea" && states.edit)?6:2,alignItems:"center",justifyItems:"start"}}>

                                <h2 style={{fontWeight:"500",justifySelf:"center"}}>{heading} </h2>
                                <h4>-</h4>
                                 {(states.edit && handleChange !== "" && inputProps !== "")
                                       ?(type === "text" || type === "select")
                                           ?<InputComponent inputProps={{...inputProps,name:field,type,pattern,helperText,disabled:states.isDisabled,defaultValue:states?.[dataField]?.[field]??"",typing:handleChange}}/>
                                           : (type === "textArea")
                                                ? <TextFieldComponent inputProps={{...inputProps,name:field,type,pattern,helperText,disabled:states.isDisabled,defaultValue:states?.[dataField]?.[field]??"",typing:handleChange}} />
                                                :(type === "date")
                                                    ? <DateComponent inputProps={{...inputProps,name:field,type,pattern,helperText,disabled:states.isDisabled,defaultValue:states?.[dataField]?.[field]??"",typing:handleChange}} />
                                                    : ""
                                       :<h2 style={{width:"100%",overflow:"auto",fontWeight:"500",fontStyle:"italic"}} >{states[dataField][field]}</h2>
                                         }
                              </Box>)}
            
                   </Box>
                :  <Box>
                      <h1 style={{marginLeft:"5%",color:"dodgerblue"}}>Customer Details</h1>
                      {customerDataFields.map(({value},index)=>
                                <Box key={index} sx={{display:"grid",gridTemplateColumns:"35% 10% 50%",height:(states.edit)?"12vh":"auto",my:2,pt:1,alignItems:"center",justifyItems:"start"}}>
                                  <SkeletonComponent props={{...SkeletonName}} />
                                  <h4>-</h4>
                                  <SkeletonComponent props={{...SkeletonValue}} />
                                </Box>)}
                   </Box>}
             </>
    )
}
