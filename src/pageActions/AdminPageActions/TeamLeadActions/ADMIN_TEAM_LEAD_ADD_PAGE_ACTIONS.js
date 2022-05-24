//---- { React && Router DOM imports } ----------------------
import { useReducer, useCallback, useEffect, useRef } from "react";
//-----------------------------------------------------------

//---- { Mui imports } --------------------------------------
// import Card from "@mui/material/Card";
//-----------------------------------------------------------

//--- { component imports } ---------------------------------
import { FormComponent } from "../../../componentContainers/FormComponentContainer";
//-----------------------------------------------------------

//--- { states and Actions imports } -------------------------------------
import { ADMIN_TEAM_LEAD_ADD_INITIALSTATES,ADMIN_TEAM_LEAD_ADD_ACTIONS,ADMIN_TEAM_LEAD_ADD_REDUCER } from "../../../States_Actions_Reducers/Admin/TeamLead/Admin_TeamLead_Add";
import { CardComponent } from "../../../BasicComponents/CardComponent";
//---------------------------------------------------------------------------

//--- { util functions imports } ----------------------------------
import { update } from "../../../Util";
//--------------------------------------------------------------------


export function ADMIN_TEAM_LEAD_ADD_PAGE_ACTIONS({Props}){

    const [states,dispatch] = useReducer( ADMIN_TEAM_LEAD_ADD_REDUCER, ADMIN_TEAM_LEAD_ADD_INITIALSTATES );

    const componentMounted = useRef(true);
    
    useEffect(()=>{

        if(componentMounted.current && states.triggerUpdate){

             async function handleSubmit(states){

                 const { firstName,lastName,email } = states;
                
                 const body = {firstName,lastName,email};
    
                 await update({path:`/admin/teamLeads/add`,method:"POST",header:{},body,role:"admin"});
                 dispatch({eventType:ADMIN_TEAM_LEAD_ADD_ACTIONS.SUBMITTED});
                return;
             }
             handleSubmit(states);
               
        }

      //eslint-disable-next-line
    },[componentMounted,dispatch,states.triggerUpdate])


    const handleChange=useCallback((e)=>{
        dispatch({eventType:ADMIN_TEAM_LEAD_ADD_ACTIONS.INPUT_CHANGE , name:e.target.name , value:e.target.value});
    },[dispatch]);

    const handleSubmit=useCallback((e)=>{
        e.preventDefault();
        dispatch({eventType:ADMIN_TEAM_LEAD_ADD_ACTIONS.LOADING});
        dispatch({eventType:ADMIN_TEAM_LEAD_ADD_ACTIONS.SUBMIT});
    },[dispatch]);

    const handleClear=useCallback(()=>{
        dispatch({eventType:ADMIN_TEAM_LEAD_ADD_ACTIONS.CLEAR});
    },[dispatch]);

    const formHandlers = { handleChange,handleSubmit,handleClear };

    const {formOuterCard,InputProps,buttonStyles} = Props;

    return(
         <CardComponent props={{...formOuterCard}} >
            <FormComponent InputProps={InputProps} buttonStyles={buttonStyles} states={states} formHandlers={formHandlers} />
         </CardComponent>
    )
}