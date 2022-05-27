

//-------- { react , react-router-dom } imports -----
import { useEffect,useState,useRef,useCallback, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
//----------------------------------------------------

//--------- { Component } imports -------------------
import { BoxComponent } from '../../../BasicComponents/BoxComponent';
import { CustomerDialog } from '../../../componentContainers/CustomerDialog';
import { Heading } from '../../../componentContainers/Heading';
import { CustomerDetails } from '../../../componentContainers/CustomerDetails';
import { CustomerTaskDetails } from '../../../componentContainers/CustomerTaskDetails';
//---------------------------------------------------

//--------- { custom Hook imports } ---------------------------------
import { useFetchAction } from '../../../customHooks/useFetchHook';
//-------------------------------------------------------------------

// ---- { util functions imports } ------------------------------------
import { update } from "../../../Util";
// --------------------------------------------------------------------

// --- { initialStates and reduvcer imports } ----------------------------

import { EMPLOYEE_CUSTOMER_INFO_INITIALSTATES,
         EMPLOYEE_CUSTOMER_INFO_ACTIONS,
         EMPLOYEE_CUSTOMER_INFO_REDUCER } from "../../../States_Actions_Reducers/Employee/Customers/Employee_Customers";

//------------------------------------------------------------------------

export function EMPLOYEE_CUSTOMER_DETAILS_PAGE_ACTIONS({Props={}}){

          
    const navigate = useNavigate();

    const [customer_id] = useState(window.location.href.split("/")[5]);

    const componentMounted = useRef(true);

    useEffect(()=>{

        if(componentMounted.current){
            if(customer_id === "" || customer_id === "undefined"){
                navigate(-1);
            }
        }
        
        return ()=>{
            componentMounted.current = false;
            // console.log("unmounting",componentMounted);
        }

    },[componentMounted,customer_id,navigate])

    const [states,dispatch] = useReducer(EMPLOYEE_CUSTOMER_INFO_REDUCER , EMPLOYEE_CUSTOMER_INFO_INITIALSTATES);

    const [data,setFetchData] = useFetchAction({componentMounted,path:`/employee/customers/${customer_id}`,method:"GET",header:{},body:{},role:"employee" });
      // ************* Notes for using -{ useFetchAction custom hook }- ***************
      // componentMounted  ---> must be useRef
      // path  ---> end point of required API
      // method  ---> fetch method
      // header  ---> optional
      // body  ---> optional
      // role ---> should define role for getting respective token

    useEffect(()=>{
        
        if(componentMounted.current){
           
            if(data !== "" && data !== null){ 
               
                dispatch({eventType:EMPLOYEE_CUSTOMER_INFO_ACTIONS.UPDATE,...data})
              
             }
        }


    },[data]);


    useEffect(()=>{

        if(componentMounted.current){

            if(states.triggerUpdate === "submit"){

                 async function handleSubmit(states){
                     //update function to send the data
 
                     const { updatedCustomerData } = states;
 
                     const body = {...updatedCustomerData};

                     console.log(body);
 
                     await update({ path:"/employee/customers/update",method:"PUT",header:{},body,role:"employee" });

                     setFetchData(prevState=>{return {...prevState,body:{},path:`/employee/customers/${customer_id}` }});
                     
                     return;
                 };
                 handleSubmit(states);
            }

        }

        //eslint-disable-next-line
    },[componentMounted,states.triggerUpdate,setFetchData,navigate,customer_id]);

       //for handling edit mode on and off events
    const handleEdit=useCallback(()=>{

        dispatch({eventType:EMPLOYEE_CUSTOMER_INFO_ACTIONS.EDIT});
        return;

    },[dispatch]);

       // for handling dialog on and off events
    const handleDialog=useCallback(()=>{

        dispatch({eventType:EMPLOYEE_CUSTOMER_INFO_ACTIONS.DIALOG});
        return;

    },[dispatch]);

     //for submitting edited details
    const handleSubmit=useCallback((e)=>{

        e.preventDefault();
        dispatch({eventType:EMPLOYEE_CUSTOMER_INFO_ACTIONS.SUBMIT_PROMPT});
        return;

    },[dispatch]);
    
    const handleConfirmSubmit=useCallback((e)=>{

          e.preventDefault();
          dispatch({eventType:EMPLOYEE_CUSTOMER_INFO_ACTIONS.CONFIRM_SUBMIT});
          return;

    },[dispatch])


    //---- { dialog component event handlers }-------------------------------------------------

         // event handlers for updating team lead , updating team member , cancelling dialogs and for triggering submit and delete events
    const dialogHandlers = { handleConfirmSubmit,handleDialog };


    //--- { Heading Component Event handlers  } --------------------------------------------------

         // event handlers for edit and delete event in heading component
    const headingHandlers = { handleEdit };

 
    //--- { Task details component event handlers } ------------------------------------------------------

         // for handling changes in work details
    const  handle_task_detail_change = useCallback((e)=>{

        dispatch({eventType:EMPLOYEE_CUSTOMER_INFO_ACTIONS.TASK_DATA,name:e.target.name,value:e.target.value});
        return;

    },[dispatch]);

    //---------------------------------------------------------------------------------------------

    const { pageOuterBox={},headingOuterBox={},headingProps={},dialogProps={},customerOuterBox={},customerDataProps={},CustomerTaskDetailsOuterBox={},taskDetailProps={} } = Props;

    return(
        <>
              {/* dialog component */}
            <CustomerDialog dialogProps={dialogProps} states={states} dialogHandlers={dialogHandlers} />
  
            <BoxComponent props={{...pageOuterBox,onSubmit:handleSubmit}} >

                    {/* --- heading -------------------- */}
                    <BoxComponent props={{...headingOuterBox}}>

                          <Heading headingProps={headingProps} states={states} headingHandlers={headingHandlers} />

                    </BoxComponent>
                    {/* ------------------------------- */}
       
                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       
                    {/*--- customer details ------------- */}
                    <BoxComponent props={{...customerOuterBox}}>     

                          <CustomerDetails customerDataProps={customerDataProps} states={states} />

                    </BoxComponent>
                    {/*--------------------------------------------------- */}
       
                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       
                    {/*--- customer task details ----------------------*/}
                    <BoxComponent props={{...CustomerTaskDetailsOuterBox}}>
                          
                           <CustomerTaskDetails taskDetailProps={taskDetailProps} states={states} handleChange={handle_task_detail_change} />

                    </BoxComponent>
                    {/* ------------------------------------------------ */}
             
            </BoxComponent>
        </>
    )
}


