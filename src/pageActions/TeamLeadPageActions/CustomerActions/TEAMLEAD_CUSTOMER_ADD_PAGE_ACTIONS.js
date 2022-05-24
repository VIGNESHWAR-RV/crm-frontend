

//--- { React && Router DOM imports } ----------------------
import { useReducer, useCallback, useEffect, useState,useRef } from "react";
//-----------------------------------------------------------

//--- { component imports } ---------------------------------
import { FormComponent } from "../../../componentContainers/FormComponentContainer";
import { CardComponent } from "../../../BasicComponents/CardComponent";
import { BoxComponent } from "../../../BasicComponents/BoxComponent";
//-----------------------------------------------------------

//--- { custome hook imports } ------------------------------
import { useFetchAction } from "../../../customHooks/useFetchHook";
//------------------------------------------------------------

//--- { initialStates and reducer imports } ------------------
import { TEAMLEAD_CUSTOMERS_ADD_ACTIONS,
         TEAMLEAD_CUSTOMERS_ADD_INITIALSTATES,
         TEAMLEAD_CUSTOMERS_ADD_REDUCERS } from "../../../States_Actions_Reducers/TeamLead/Customers/TeamLead_Customer_Add";
//------------------------------------------------------------

//--- { Util functions imports } -----------------------------
import { update,optionsGenerator } from "../../../Util";
//------------------------------------------------------------


export function TEAMLEAD_CUSTOMER_ADD_PAGE_ACTIONS({Props={}}){

    const componentMounted = useRef(true);

    useEffect(()=>{

        return()=>{
            componentMounted.current = false;
        }
    },[]);


    const [taskOwnerOptions,setTaskOwnerOptions] = useState([]);


    const [data,setFetchData] = useFetchAction({componentMounted,path:"/teamLead/customers/add",method:"GET",header:{},body:{},role:"teamLead"});
    // ************* Notes for using -{ useFetchAction custom hook }-  ***************
    // componentMounted  ---> must be useRef
    // path  ---> end point of required API
    // method  ---> fetch method
    // header  ---> optional
    // body  ---> optional
    // role ---> should define role for getting respective token


    const [states,dispatch] = useReducer( TEAMLEAD_CUSTOMERS_ADD_REDUCERS, TEAMLEAD_CUSTOMERS_ADD_INITIALSTATES );


       // to trigger post method and form clear
    useEffect(()=>{

          if(componentMounted.current){

                if(states.triggerUpdate){
                     async function submit(states){
                         const {firstName,lastName,email,phone,address,taskDescription,taskOwner,startDate,dueDate} = states;
                         const body = {firstName,lastName,email,phone,address,taskDescription,taskOwner,startDate,dueDate};
                         await update({path:"/teamLead/customers/add",method:"POST",header:{},body,role:"teamLead"});
                         dispatch({eventType:TEAMLEAD_CUSTOMERS_ADD_ACTIONS.CLEAR});
                         return;
                     }
                     submit(states);
                     return;
                }

          }
         //eslint-disable-next-line
    },[componentMounted,states.triggerUpdate,dispatch,setFetchData]);


       // to trigger on data update
    useEffect(()=>{

        if(componentMounted.current){

           if(data !== "" && data !== null){

                  let options = optionsGenerator(data,"userName","Task Owner"); // array of objects , key of object , role
                  setTaskOwnerOptions(options);

           }

        }
        
        //eslint-disable-next-line
    },[data,dispatch,setTeamLeadOptions]);
 

    const handleChange=useCallback((e)=>{
        dispatch({eventType:TEAMLEAD_CUSTOMERS_ADD_ACTIONS.INPUT_CHANGE , name:e.target.name , value:e.target.value});
    },[dispatch]);


    const handleSubmit=useCallback((e)=>{
        e.preventDefault();
        dispatch({eventType:TEAMLEAD_CUSTOMERS_ADD_ACTIONS.LOADING});
    },[dispatch]);


    const handleClear=useCallback(()=>{
        dispatch({eventType:TEAMLEAD_CUSTOMERS_ADD_ACTIONS.CLEAR});
    },[dispatch]);


    const formHandlers = { handleChange,handleSubmit,handleClear };


    const {formOuterCard={},InputProps={},buttonStyles={}} =  Props;
     //inputProps2

    return(
        <BoxComponent props={{sx:{display:"grid",width:"100vw",gridTemplateColumns:"1fr"}}}>

             <CardComponent props={{...formOuterCard}} >

                  <FormComponent InputProps={InputProps} buttonStyles={buttonStyles} options={{taskOwnerOptions}} states={states} formHandlers={formHandlers} />

             </CardComponent>
             
        </BoxComponent>
    )
}

