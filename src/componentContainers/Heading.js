//--------{ react  } imports -----------------------
// import { useContext } from "react";
//---------------------------------------------------

//--------- { MUI } imports -------------------------
import Box from '@mui/material/Box';
//----------------------------------------------------

//--------- { context and component imports }----------
// import { context } from "../../App";
import { TitleWithBadge } from '../BasicComponents/TitleWithBadge';
import { ButtonComponent } from '../BasicComponents/ButtonComponent';
import { FabComponent } from '../BasicComponents/FabComponent';
import { SkeletonComponent } from '../BasicComponents/SkeletonComponent';
//------------------------------------------------------

export function Heading({headingProps={},states={},headingHandlers={}}){


    const {saveButton={},cancelButton={},editFabButton={},deleteButton="",titleSkeleton={},buttonSkeleton={},dataField="userData",fields} = headingProps;
    
     // assigning to empty string "" to conditionally prevent from rendering
    const {handleEdit="",handleDelete=""} = headingHandlers;


    return(
        <>
         {(states[dataField])
             ?<>
                 <TitleWithBadge states={states} dataField={dataField} fields={fields} /> 

                 <Box sx={{ml:"auto"}} >
                     
                         {/* if states.edit === false show edit button and delete button */}
                     {(states.edit && handleEdit !== "")
                        ?<>

                            <ButtonComponent props={{...saveButton,isDisabled:states?.isDisabled??false}}/>
  
                            <ButtonComponent props={{...cancelButton,isDisabled:states?.isDisabled??false,onClick:handleEdit}}/>

                         </>
                        :<>

                             {/* just tried Fab instead of Button */}
                             {(handleEdit !== "" && ((states.customerData)?states.customerData.status !== "completed":true))
                                 ? <FabComponent props={{...editFabButton,onClick:handleEdit}} />
                                 :""}

                             {(handleDelete !== "" && deleteButton !== "" && ((states.customerData)?states.customerData.status !== "completed":true) )
                                 ? <ButtonComponent props={{...deleteButton,onClick:handleDelete}} />
                                 :""}

                         </>
                          }
                 </Box>
              </>
              
             :<>
                
                <SkeletonComponent props={titleSkeleton} />

                <Box sx={{mx:2,ml:"auto",display:"flex"}}>
                    {(handleDelete !== "" || handleEdit !== "")
                      ? <SkeletonComponent props={buttonSkeleton} /> 
                      : ""}
                </Box>
              </>}
        </>
          )
}

