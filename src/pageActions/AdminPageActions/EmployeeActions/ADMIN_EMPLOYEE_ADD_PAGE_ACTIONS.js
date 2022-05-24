//---- { React && Router DOM imports } ----------------------
import { useReducer, useCallback, useEffect, useState,useRef } from "react";
//-----------------------------------------------------------

//---- { Mui imports } --------------------------------------
// import Card from "@mui/material/Card";
//-----------------------------------------------------------

//--- { component imports } ---------------------------------
import { FormComponent } from "../../../componentContainers/FormComponentContainer";
import { CardComponent } from "../../../BasicComponents/CardComponent";
//-----------------------------------------------------------

//--- { custome hook imports } ------------------------------
import { useFetchAction } from "../../../customHooks/useFetchHook";
//------------------------------------------------------------

//--- { Util functions imports } -----------------------------
import { update,optionsGenerator } from "../../../Util";
//------------------------------------------------------------

//--- { states and actions imports } -------------------------
import { ADMIN_EMPLOYEE_ADD_ACTIONS,ADMIN_EMPLOYEE_ADD_REDUCERS,ADMIN_EMPLOYEE_ADD_INITIALSTATES } from "../../../States_Actions_Reducers/Admin/Employee/Admin_Employee_Add";
//------------------------------------------------------------


export function ADMIN_EMPLOYEE_ADD_PAGE_ACTIONS({Props}){

    const componentMounted = useRef(true);

    useEffect(()=>{

         return()=>{
             componentMounted.current = false;
         }
    },[]);

    const [teamLeadOptions,setTeamLeadOptions] = useState([]);

    const [data] = useFetchAction({componentMounted,path:"/admin/employees/add",method:"GET",header:{},body:{},role:"admin"});
    // ************* Notes for using -{ useFetchAction custom hook }-  ***************
    // componentMounted  ---> must be useRef
    // path  ---> end point of required API
    // method  ---> fetch method
    // header  ---> optional
    // body  ---> optional
    // role ---> should define role for getting respective token

    useEffect(()=>{

        if(componentMounted.current){

           if(data !== "" && data !== null){
                  
               let options = optionsGenerator(data,"userName","Team Lead") // array of objects , key of object , role
               setTeamLeadOptions(options);

           }

        }
        
    },[data,setTeamLeadOptions]);


    const [states,dispatch] = useReducer( ADMIN_EMPLOYEE_ADD_REDUCERS, ADMIN_EMPLOYEE_ADD_INITIALSTATES );

    useEffect(()=>{

        if(componentMounted.current && states.triggerUpdate){

            async function submit(states){
  
                const { firstName,lastName,email,teamLead } = states;

                const body = {firstName,lastName,email,teamLead};
    
                 await update({path:`/admin/employees/add`,method:"POST",header:{},body,role:"admin"});
                 dispatch({eventType:ADMIN_EMPLOYEE_ADD_ACTIONS.SUBMITTED});
                return;
             }
             submit(states);      

        }

      //eslint-disable-next-line
    },[componentMounted,states.triggerUpdate])

   
    const handleChange=useCallback((e)=>{
        dispatch({eventType:ADMIN_EMPLOYEE_ADD_ACTIONS.INPUT_CHANGE , name:e.target.name , value:e.target.value});
    },[dispatch]);


    const handleSubmit=useCallback((e)=>{
        e.preventDefault();
        dispatch({eventType:ADMIN_EMPLOYEE_ADD_ACTIONS.LOADING});
    },[dispatch]);


    const handleClear=useCallback(()=>{
        dispatch({eventType:ADMIN_EMPLOYEE_ADD_ACTIONS.CLEAR});
    },[dispatch]);


    const formHandlers = { handleChange,handleSubmit,handleClear };

    const {formOuterCard={},InputProps={},buttonStyles={}} = Props;


    return(
        <CardComponent props={{...formOuterCard}} >
           <FormComponent InputProps={InputProps} buttonStyles={buttonStyles} options={{teamLeadOptions}} states={states} formHandlers={formHandlers} />
        </CardComponent>
    )
}

