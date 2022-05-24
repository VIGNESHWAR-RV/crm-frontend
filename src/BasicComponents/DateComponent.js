import TextField from '@mui/material/TextField';
import isWeekend from 'date-fns/isWeekend';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl } from '@mui/material';
import { useState,useCallback, useEffect } from 'react';

export function DateComponent({inputProps={}}){


    const {sx={}, name="",variant="",label="",disablePast=true,className="",value=null,defaultValue=null,isDisabled=false,helperText="",typing=(e)=>e.preventDefault(),...InputProps } = inputProps;

    const [date,setDate] = useState((defaultValue !== "")?defaultValue:value);

    useEffect(()=>{

       if(defaultValue === null && value === null && date !== null){
         setDate(null);
       }

       //eslint-disable-next-line
    },[defaultValue,value,setDate]);
    

    const handleTyping= useCallback((value)=>{
        let e = {target:{}};
        e.target.name = name;
        e.target.value = value;
        typing(e);
        setDate(value);
    },[typing,setDate,name]);

    // console.log(InputProps);

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormControl fullWidth> 
            <DatePicker
              sx={{...sx}}
              name={name}
              className={className}
              disablePast={disablePast}
              disabled={isDisabled}
              shouldDisableDate={isWeekend}
              label={label}
              value={date}
              onChange={handleTyping}
              {...InputProps}
              // required={required}
              variant={variant}
              renderInput={(params) => <TextField sx={{width:"100%"}} {...params} />}
            />
             {(helperText !== "")
               ? <FormHelperText sx={{...sx,mx:2}}>
                      {helperText}
                 </FormHelperText>
               :""}
        </FormControl>
      </LocalizationProvider>
    )

}