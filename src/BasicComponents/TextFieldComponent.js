import { FormControl } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
// import { BoxComponent } from "./BoxComponent";


export function TextFieldComponent({inputProps={}}){

    const {sx={},className="",name="",label="",rows=4,variant="standard",helperText="",isDisabled=false,typing=(e)=>e.preventDefault(),...InputProps} = inputProps;

    return(
        <FormControl fullWidth>
            <TextField 
               sx={{fontSize:"large"}}
               className={className}
               name={name}
               label={label}
               multiline
               fullWidth
               onChange={typing}
               disabled={isDisabled}
               rows={rows}
            //    value={value}
               variant={variant}
               {...InputProps}
              />
            {(helperText !== "")
               ? <FormHelperText sx={{...sx,mx:2}}>
                      {helperText}
                 </FormHelperText>
               :""}
        </FormControl>
    )
}