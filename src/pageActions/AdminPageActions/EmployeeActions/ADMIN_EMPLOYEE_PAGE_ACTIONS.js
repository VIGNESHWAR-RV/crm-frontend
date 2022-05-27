//-------- { react , react-router-dom } imports -----
import { useEffect,useState,useRef,useCallback, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
//----------------------------------------------------

//--------- { MUI } imports -------------------------
// import Box from '@mui/material/Box';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { BoxComponent } from '../../../BasicComponents/BoxComponent';
import { Dialogs } from '../../../componentContainers/Admin/Employees/EmployeeDialogs';
import { Heading } from '../../../componentContainers/Heading';
import { PersonalData } from '../../../componentContainers/PersonalData';
import { WorkData } from '../../../componentContainers/WorkData';
import { RevenueData } from '../../../componentContainers/RevenueData';
import { PendingJobsContainer } from '../../../componentContainers/PendingJobsContainer';
//---------------------------------------------------

//--------- { custom Hook imports } ---------------------------------
import { useFetchAction } from '../../../customHooks/useFetchHook';
//-------------------------------------------------------------------

//--------- { states & actions impots } ------------------------------
import { ADMIN_EMPLOYEE_ACTIONS,
         ADMIN_EMPLOYEE_REDUCERS,
         ADMIN_EMPLOYEE_INITIALSTATES } from '../../../States_Actions_Reducers/Admin/Employee/Admin_Employee';
//--------------------------------------------------------------------

// ---- { util functions imports } ------------------------------------
import { update } from "../../../Util";
// --------------------------------------------------------------------


export function ADMIN_EMPLOYEE_PAGE_ACTIONS({Props}){

        
    const navigate = useNavigate();

    const [userName] = useState(window.location.href.split("/")[5]);

    const componentMounted = useRef(true);

    useEffect(()=>{

        if(componentMounted.current){
            if(userName === "" || userName === "undefined"){
                navigate(-1);
            }
        }
        
        return ()=>{
            componentMounted.current = false;
            // console.log("unmounting",componentMounted);
        }

    },[componentMounted,userName,navigate])


    const [states,dispatch] = useReducer(ADMIN_EMPLOYEE_REDUCERS , ADMIN_EMPLOYEE_INITIALSTATES);

    const [data,setFetchData] = useFetchAction({componentMounted,path:`/admin/employees/${userName}`,method:"GET",header:{userName},body:{},role:"admin" });

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
                dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.UPDATE,...data})
             }
        }

    },[data]);

    useEffect(()=>{

        if(componentMounted.current){

            if(states.triggerUpdate === "submit"){

                 async function handleSubmit(states){
                     //update function to send the data
 
                     const { updatedData,changedTeamMember } = states;
 
                     const body = { updatedData,changedTeamMember };
 
                     await update({ path:"/admin/employees/update",method:"PUT",header:{},body,role:"admin" });

                     setFetchData(prevState=>{return {...prevState,body:{} }});

                     return;
                 };
                 handleSubmit(states);

            }

            if(states.triggerUpdate === "delete"){

              async function deleteEmployee(states){
                  
                    const { changedTeamMember } = states;
  
                    const body = { userName:states.updatedData.userName,changedTeamMember };
  
                    await update({ path:"/admin/employees/delete",method:"DELETE",header:{},body,role:"admin" });

                    navigate(-1);

                    return;

              }
              deleteEmployee(states);
            }

        }
        //eslint-disable-next-line
    },[componentMounted,states.triggerUpdate,setFetchData,navigate]);

       //for handling edit mode on and off events
    const handleEdit=useCallback(()=>{

        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.EDIT});
        return;

    },[dispatch]);

       // for handling dialog on and off events
    const handleDialog=useCallback(()=>{

        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.DIALOG});
        return;

    },[dispatch]);

     //for submitting edited details
    const handleSubmit=useCallback((e)=>{

        e.preventDefault();
        // dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.LOADING});
        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.SUBMIT_CHECK});
        return;

    },[dispatch]);

     //for handling delete event
    const handleDelete=useCallback((e)=>{

        e.preventDefault();
        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.DELETE})
        return;

    },[dispatch]);


     //for conforming delete event from dialog
    const handleConfirmDelete = useCallback((e,userName)=>{

        e.preventDefault();
        // dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.LOADING});
        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.CONFIRM_DELETE,userName});
        return;

    },[dispatch]);



    //---- { dialog component event handlers }-------------------------------------------------

       //for handling team member select in dialog component
    const handleTeamMemberChange=useCallback((e)=>{

        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.CHANGED_TEAM_MEMBER,value:e.target.value});
        return;

    },[dispatch]);

         // event handlers for updating team lead , updating team member , cancelling dialogs and for triggering submit and delete events
    const dialogHandlers = [ handleSubmit,handleDialog,handleConfirmDelete, handleTeamMemberChange];

 
    //-------------------------------------------------------------------------------------------


    //--- { Heading Component Event handlers  } --------------------------------------------------

         // event handlers for edit and delete event in heading component
    const headingHandlers = { handleEdit, handleDelete };

    //---------------------------------------------------------------------------------------------

 
    //--- { Personal Data Component event handlers } ----------------------------------------------
 
         // for handling Changes in personal data   
    const handle_Personal_data_change=useCallback((e)=>{

        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.PERSONAL_DATA,name:e.target.name,value:e.target.value});
        return;

    },[dispatch]);

    //--------------------------------------------------------------------------------------------



    //--- { work Info component event handlers } ------------------------------------------------------

         // for handling changes in work details
    const  work_detail_handle_change = useCallback((e)=>{

        dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.WORK_DATA,name:e.target.name,value:e.target.value});
        return;

    },[dispatch]);

    //---------------------------------------------------------------------------------------------

    const {pageOuterBox={},headingOuterBox={},headingProps={},dialogProps={},personalOuterBox={},personalDataProps={},workAndJobOuterBox={},workDetailProps={},revenueDetailProps={},pendingJobProps={}} = Props;



    return(
        <>
              {/* dialog component */}
            <Dialogs dialogProps={dialogProps} states={states} dialogHandlers={dialogHandlers} />
  
            <BoxComponent props={{...pageOuterBox,onSubmit:handleSubmit}} >

                    {/*--- heading -------------------- */}
                    <BoxComponent props={{...headingOuterBox}}>
                        <Heading headingProps={headingProps} states={states} headingHandlers={headingHandlers} />
                    </BoxComponent>
                    {/* ------------------------------- */}
       
                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       
                    {/*--- personal profile and team members ------------- */}
                    <BoxComponent props={{...personalOuterBox}}>     
                          <PersonalData personalDataProps={personalDataProps} states={states} handleChange={handle_Personal_data_change} />
       
                          {/* <TeamMembers teamMembersProps={teamMembersProps} states={states} handleTeamChange={handleTeamChange} /> */}
                    </BoxComponent>
                    {/*--------------------------------------------------- */}
       
                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       
                    {/*--- Works and pending Jobs ----------------------*/}
                    <BoxComponent props={{...workAndJobOuterBox}} >
                          <BoxComponent>
                             <WorkData workDetailProps={workDetailProps} states={states} handleChange={work_detail_handle_change} />
                             <RevenueData states={states} revenueDetailProps={revenueDetailProps} /> 
                          </BoxComponent>
                           
                           <PendingJobsContainer pendingJobProps={pendingJobProps} pendingJobData={states.pendingJobData} />
                    </BoxComponent>
                    {/* ------------------------------------------------ */}
             
            </BoxComponent>
           
        </>
    )
}


