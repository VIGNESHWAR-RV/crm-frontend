
//-------- { react , react-router-dom } imports -----
import { useEffect,useState,useRef,useCallback, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
//----------------------------------------------------

//--------- { MUI } imports -------------------------
import Box from '@mui/material/Box';
//---------------------------------------------------

//--------- { Component } imports -------------------
import { Dialogs } from '../../../componentContainers/Admin/TeamLeads/AdminDialogs';
import { Heading } from '../../../componentContainers/Heading';
import { PersonalData } from '../../../componentContainers/PersonalData';
import { TeamMembers } from '../../../componentContainers/Admin/TeamLeads/TeamMembers';
import { WorkData } from '../../../componentContainers/WorkData';
import { RevenueData } from '../../../componentContainers/RevenueData';
import { PendingJobsContainer } from '../../../componentContainers/PendingJobsContainer';
//---------------------------------------------------

//--------- { custom Hook imports } ---------------------------------
import { useFetchAction } from '../../../customHooks/useFetchHook';
//-------------------------------------------------------------------

//---------- { initialStates,Actions ,Reducers imports } ----------------
import { ADMIN_TEAM_LEAD_INITIALSTATES,
         ADMIN_TEAM_LEAD_ACTIONS,
         ADMIN_TEAM_LEAD_REDUCER } from '../../../States_Actions_Reducers/Admin/TeamLead/Admin_TeamLead';
import { BoxComponent } from '../../../BasicComponents/BoxComponent';
//--------------------------------------------------------------------------

//--------- { Util function imports } -------------------------------------
import { update } from "../../../Util";
//-------------------------------------------------------------------------


export function ADMIN_TEAM_LEAD_PAGE_ACTIONS({Props}){

    
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


    const [states,dispacth] = useReducer(ADMIN_TEAM_LEAD_REDUCER , ADMIN_TEAM_LEAD_INITIALSTATES);

    const [data,setFetchData] = useFetchAction({componentMounted,path:`/admin/teamLeads/${userName}`,method:"GET",header:{userName},body:{},role:"admin" });

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
                dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.UPDATE,...data})
             }
        }

    },[data]);

    useEffect(()=>{

       if(componentMounted.current){
           
                if(states.triggerUpdate === "submit"){

                       async function handleSubmit(states){
                               
                           //update function to send the data
           
                           const { updatedData,updatedTeamMembers,removedTeamMembersWithJobs,removedTeamMembersWithoutJobs,changedTeamLead,changedTeamMember } = states;
           
                           const body = { updatedData,updatedTeamMembers,removedTeamMembersWithJobs,removedTeamMembersWithoutJobs,changedTeamLead,changedTeamMember };
           
                           await update({ path:"/admin/teamLeads/update",method:"PUT",header:{},body,role:"admin" });
                           // path="/",method="POST",header={},body={},role=""
                           setFetchData(prevData => {return {...prevData,body:{}}});

                           return;
                       };
                       handleSubmit(states);   
                      
                }
                else if(states.triggerUpdate === "delete"){
                     
                    async function handleDelete(states){
                          
                       const { changedTeamLead } = states;
         
                       const body = { userName:states.userData.userName,changedTeamLead };

                       await update({ path:"/admin/teamLeads/delete",method:"DELETE",header:{},body,role:"admin" });
                       
                       navigate(-1);

                       return;
                    }
                    handleDelete(states);
                }

       }
     //eslint-disable-next-line
    },[states.triggerUpdate,setFetchData,navigate])

       //for handling edit mode on and off events
    const handleEdit=useCallback(()=>{

        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.EDIT});
        return;

    },[dispacth]);

       // for handling dialog on and off events
    const handleDialog=useCallback(()=>{

        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.DIALOG});
        return;

    },[dispacth]);

     //for submitting edited details
    const handleSubmit=useCallback((e)=>{

        e.preventDefault();
        // dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.LOADING});
        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.SUBMIT_CHECK});
        return;

    },[dispacth]);

     //for handling delete event
    const handleDelete=useCallback((e)=>{

        e.preventDefault();
        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.DELETE})
        return;

    },[dispacth]);

     //for conforming delete event from dialog
    const handleConfirmDelete = useCallback((e)=>{

        e.preventDefault();
        // dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.LOADING});
        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.CONFIRM_DELETE});
        return;

    },[dispacth]);

    //---- { dialog component event handlers }-------------------------------------------------


       //for handling team lead select in dialog component
    const handleTeamLeadChange=useCallback((e)=>{

        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.CHANGED_TEAM_LEAD,value:e.target.value});
        return ;

    },[dispacth]);
 
       //for handling team member select in dialog component
    const handleTeamMemberChange=useCallback((e)=>{
        
        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.CHANGED_TEAM_MEMBER,value:e.target.value});
        return;

    },[dispacth]);

         // event handlers for updating team lead , updating team member , cancelling dialogs and for triggering submit and delete events
    const dialogHandlers = [ handleSubmit,handleDialog,handleConfirmDelete, handleTeamLeadChange, handleTeamMemberChange];

 
    //-------------------------------------------------------------------------------------------

    //--- { Heading Component Event handlers  } --------------------------------------------------

         // event handlers for edit and delete event in heading component
    const headingHandlers = { handleEdit, handleDelete };

    //---------------------------------------------------------------------------------------------


 
    //--- { Personal Data Component event handlers } ----------------------------------------------
 
         // for handling Changes in personal data   
    const handle_Personal_data_change=useCallback((e)=>{

        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.PERSONAL_DATA,name:e.target.name,value:e.target.value});
        return;

    },[dispacth]);

    //--------------------------------------------------------------------------------------------


    //--- { Team Members Component event handlers } ----------------------------------------------

         // for handling changes in team members
    const handleTeamChange = useCallback((e,value) => {

        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.TEAM_MEMBER_CHANGE,value});
        return;

    },[dispacth]);

    //--------------------------------------------------------------------------------------------


    //--- { work Info component event handlers  } ------------------------------------------------------

         // for handling changes in work details
    const  work_detail_handle_change = useCallback((e)=>{

        dispacth({eventType:ADMIN_TEAM_LEAD_ACTIONS.WORK_DATA,name:e.target.name,value:e.target.value});
        return;

    },[dispacth]);

    //---------------------------------------------------------------------------------------------

    const {tableOuterBox={},headingOuterBox={},headingProps={},dialogProps={},personalAndTeamOuterBox={},personalDataProps={},teamMembersProps={},workAndJobsOuterBox={},workDetailProps={},revenueDetailProps={},pendingJobProps={}} = Props;



    return (
        <>
              {/* dialog component */}
            <Dialogs dialogProps={dialogProps} states={states} dialogHandlers={dialogHandlers} />
  
             <BoxComponent props={{...tableOuterBox,onSubmit:handleSubmit}}>

                    {/*--- heading -------------------- */}
                    <BoxComponent props={{...headingOuterBox}}>
                        <Heading headingProps={headingProps} states={states} headingHandlers={headingHandlers} />
                    </BoxComponent>
                    {/* ------------------------------- */}
       
                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       
                    {/*--- personal profile and team members ------------- */}
                    <BoxComponent props={{...personalAndTeamOuterBox}}>     
                          <PersonalData personalDataProps={personalDataProps} states={states} handleChange={handle_Personal_data_change} />
       
                          <TeamMembers teamMembersProps={teamMembersProps} states={states} handleTeamChange={handleTeamChange} />
                    </BoxComponent>
                    {/*--------------------------------------------------- */}
       
                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       
                    {/*--- Works and pending Jobs ----------------------*/}
                    <BoxComponent props={{...workAndJobsOuterBox}}>
                          <Box>
                             <WorkData workDetailProps={workDetailProps} states={states} handleChange={work_detail_handle_change} />
                             <RevenueData states={states} revenueDetailProps={revenueDetailProps} /> 
                          </Box>
                           
                          <PendingJobsContainer pendingJobProps={pendingJobProps} pendingJobData={states.pendingJobData} />
                    </BoxComponent>
                    {/* ------------------------------------------------ */}
             
            </BoxComponent>
           
        </>
    )
}

