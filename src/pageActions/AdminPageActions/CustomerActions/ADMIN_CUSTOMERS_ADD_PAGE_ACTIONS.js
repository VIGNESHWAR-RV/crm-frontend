//--- { React && Router DOM imports } ----------------------
import { useReducer, useCallback, useEffect, useState,useRef } from "react";
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
import { BoxComponent } from "../../../BasicComponents/BoxComponent";
//------------------------------------------------------------

//--- { initialStates and reducers imports } -----------------
import { ADMIN_CUSTOMERS_ADD_ACTIONS,
         ADMIN_CUSTOMERS_ADD_INITIALSTATES,
         ADMIN_CUSTOMERS_ADD_REDUCERS } from "../../../States_Actions_Reducers/Admin/Customers/Admin_Customer_Add";
//-------------------------------------------------------------


export function ADMIN_CUSTOMER_ADD_PAGE_ACTIONS({Props={}}){

    const componentMounted = useRef(true);

    useEffect(()=>{

        return()=>{
            componentMounted.current = false;
        }
    },[]);

    const [teamLeadOptions,setTeamLeadOptions] = useState([]);

    const [taskOwnerOptions,setTaskOwnerOptions] = useState([]);

    const [data,setFetchData] = useFetchAction({componentMounted,path:"/admin/customers/add",method:"GET",header:{},body:{},role:"admin"});
    // ************* Notes for using -{ useFetchAction custom hook }-  ***************
    // componentMounted  ---> must be useRef
    // path  ---> end point of required API
    // method  ---> fetch method
    // header  ---> optional
    // body  ---> optional
    // role ---> should define role for getting respective token


    const [states,dispatch] = useReducer( ADMIN_CUSTOMERS_ADD_REDUCERS, ADMIN_CUSTOMERS_ADD_INITIALSTATES );


       // to trigger on optionLabel update to load taskOwners
    useEffect(()=>{

        if(componentMounted.current){

              if(states.optionsLabel === "Task Owner"){
                  async function taskOwnersLoad(teamLead){
                     await setFetchData(prevData=>{return {...prevData,header:{teamLead}}});
                  }
                  taskOwnersLoad(states.teamLead);
              }
        }
          
      //eslint-disable-next-line
    },[componentMounted,states.optionsLabel,dispatch,setFetchData])

       // to trigger post method and form clear
    useEffect(()=>{

          if(componentMounted.current){
                if(states.triggerUpdate){
                     async function submit(states){
                         const {firstName,lastName,email,phone,address,taskDescription,teamLead,taskOwner,startDate,dueDate} = states;
                         const body = {firstName,lastName,email,phone,address,taskDescription,teamLead,taskOwner,startDate,dueDate};
                         await update({path:"/admin/customers/add",method:"POST",header:{},body,role:"admin"});
                         dispatch({eventType:ADMIN_CUSTOMERS_ADD_ACTIONS.CLEAR});
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

               if(states.optionsLabel === "Team Lead"){
                  let options = optionsGenerator(data,"userName","Team Lead"); // array of objects , key of object , role
                  setTeamLeadOptions(options);
               }
               else if(states.optionsLabel === "Task Owner"){
                  let options = optionsGenerator(data,"userName","Task Owner"); // array of objects , key of object , role
                  setTaskOwnerOptions(options);
                  dispatch({eventType:ADMIN_CUSTOMERS_ADD_ACTIONS.TASK_OWNERS_LOADED});
               } 

           }

        }
        
        //eslint-disable-next-line
    },[data,dispatch,setTeamLeadOptions,setTaskOwnerOptions]);
 

    const handleChange=useCallback((e)=>{
        dispatch({eventType:ADMIN_CUSTOMERS_ADD_ACTIONS.INPUT_CHANGE , name:e.target.name , value:e.target.value});
    },[dispatch]);


    const handleSubmit=useCallback((e)=>{
        e.preventDefault();
        dispatch({eventType:ADMIN_CUSTOMERS_ADD_ACTIONS.LOADING});
    },[dispatch]);


    const handleClear=useCallback(()=>{
        dispatch({eventType:ADMIN_CUSTOMERS_ADD_ACTIONS.CLEAR});
    },[dispatch]);


    const formHandlers = { handleChange,handleSubmit,handleClear };


    const {formOuterCard={},InputProps={},buttonStyles={}} =  Props;

    return(
        <BoxComponent props={{sx:{display:"grid",width:"100vw",gridTemplateColumns:"1fr"}}}>

             <CardComponent props={{...formOuterCard}} >

                  <FormComponent InputProps={InputProps} buttonStyles={buttonStyles} options={{teamLeadOptions,taskOwnerOptions}} states={states} formHandlers={formHandlers} />

             </CardComponent>
             
        </BoxComponent>
    )
}





