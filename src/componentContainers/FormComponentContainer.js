
//---- { Mui imports } ----------------------------

//-------------------------------------------------

//---- { Component imports } --------------------------------------------
import { BoxComponent} from "../BasicComponents/BoxComponent";
import { Navback } from "../BasicComponents/NavBack";
import { InputComponent } from "../BasicComponents/InputComponent";
import { ButtonComponent } from "../BasicComponents/ButtonComponent";
import React from "react";
import { TextFieldComponent } from "../BasicComponents/TextFieldComponent";
import { DateComponent } from "../BasicComponents/DateComponent";
//-----------------------------------------------------------------------

export function FormComponent({InputProps={},buttonStyles={},options={},formHandlers={},states={},navBackDisabled=false}){

    const { inputProps={},inputFields={},formBoxProps={},formHeading="",inputOuterBoxProps={},inputBoxProps={} } = InputProps;

    const { submitButton={} , clearButton={} } = buttonStyles;

    const { handleSubmit=()=>{},handleClear="",handleChange="" } = formHandlers;

    return(
        <BoxComponent props={{...formBoxProps,onSubmit:handleSubmit}} >
                
               {(navBackDisabled)
                 ?""
                 :<Navback/>}

               {(formHeading !== "")
                 ? <h1 style={{color:"dodgerblue"}}><i>{formHeading}</i></h1>
                 :""}

              <BoxComponent props={{...inputOuterBoxProps}}>
                {inputFields.map(({heading,field,type,pattern,helperText,optionName},index)=>
                     <BoxComponent key={index} props={{...inputBoxProps}}>
                       {(type === "text" || type === "select" || type === "number")
                          ?<InputComponent inputProps={{...inputProps,
                                                      label:heading,
                                                      name:field,
                                                      type,
                                                      pattern,
                                                      helperText,
                                                      disabled:states?.isDisabled??false,
                                                      value:states[field],
                                                      typing:handleChange,
                                                      options:(type === "select") ?options?.[optionName]??[] :[]
                                                      }}/>
                          : (type === "textArea")
                                ? <TextFieldComponent inputProps={{...inputProps,
                                                                   label:heading,
                                                                   name:field,
                                                                   pattern,
                                                                   helperText,
                                                                   disabled:states?.isDisabled??false,
                                                                   value:states[field],
                                                                   typing:handleChange  
                                                                   }}/>
                                : (type === "date")
                                     ? <DateComponent inputProps={{...inputProps,
                                                                   label:heading,
                                                                   name:field,
                                                                   pattern,
                                                                   helperText,
                                                                   disabled:states?.isDisabled??false,
                                                                   value:states[field],
                                                                   typing:handleChange
                                                                   }} />
                                     : ""}
                     </BoxComponent>                                  
                                                      )}
             
              </BoxComponent>

                {(handleClear !== "")  // clear button component
                   ? <ButtonComponent props={{...clearButton,onClick:handleClear,isDisabled:states?.isDisabled??false}} />
                   :"" }
   
                 <ButtonComponent props={{...submitButton,isDisabled:states?.isDisabled??false}} />
                
        </BoxComponent>
    )
}

