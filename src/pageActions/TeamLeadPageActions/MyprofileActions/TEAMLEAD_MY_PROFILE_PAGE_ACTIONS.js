

import { useCallback, useEffect, useReducer, useRef } from "react";
import { useFetchAction } from "../../../customHooks/useFetchHook";


//--------- { Component } imports -------------------
import { BoxComponent } from "../../../BasicComponents/BoxComponent";
import { MyProfileDialog } from "../../../componentContainers/MyProfileDialog";
import { Heading } from "../../../componentContainers/Heading";
import { PersonalData } from "../../../componentContainers/PersonalData";
import { ButtonComponent } from "../../../BasicComponents/ButtonComponent";
import { update } from "../../../Util";
import { useNavigate } from "react-router-dom";
//---------------------------------------------------

//--- { initialStates and reducers imports } --------------------------------
import { TEAMLEAD_MY_PROFILE_INITIALSTATES,
         TEAMLEAD_MY_PROFILE_ACTIONS,
         TEAMLEAD_MY_PROFILE_REDUCER } from "../../../States_Actions_Reducers/TeamLead/MyProfile/TeamLead_myProfile";
//----------------------------------------------------------------------------

export function TEAMLEAD_MY_PROFILE_PAGE_ACTIONS({Props={}}){

    const navigate = useNavigate();
    
    const componentMounted = useRef(true);

    useEffect(()=>{

        return()=>{
            componentMounted.current = false;
        }
    },[componentMounted]);

    const [data,fetchData] = useFetchAction({componentMounted,path:"/teamLead/myProfile",method:"GET",header:{},body:{},role:"teamLead"});

    const [states,dispatch] = useReducer(TEAMLEAD_MY_PROFILE_REDUCER,TEAMLEAD_MY_PROFILE_INITIALSTATES);


    useEffect(()=>{

        if(componentMounted.current){
               if(data !== "" && data !== null){
                    dispatch({eventType:TEAMLEAD_MY_PROFILE_ACTIONS.UPDATE,data});
               }
             
        }

    },[componentMounted,data,dispatch]);

    
    useEffect(()=>{
 
         if(componentMounted.current && states.triggerUpdate){

             async function submit(data){

                await update({path:"/teamLead/myProfile",method:"PUT",header:{},body:data,role:"teamLead"});
                fetchData(prevFetchData=>{return {...prevFetchData,body:{}}});
                return;
             }
             submit(states.updatedData);

         }

         //eslint-disable-next-line
    },[componentMounted,fetchData,states.triggerUpdate])


    const handleEdit = useCallback(()=>{

        dispatch({eventType:TEAMLEAD_MY_PROFILE_ACTIONS.EDIT});
        return;

    },[dispatch]);

    const handleDialog = useCallback(()=>{

        dispatch({eventType:TEAMLEAD_MY_PROFILE_ACTIONS.DIALOG});
        return;

    },[dispatch]);

    const handleSubmit = useCallback((e)=>{

        e.preventDefault();
        dispatch({eventType:TEAMLEAD_MY_PROFILE_ACTIONS.SUBMIT_CHECK});
        return;

    },[dispatch]);

    const handleConfirmSubmit = useCallback(()=>{
           
        dispatch({eventType:TEAMLEAD_MY_PROFILE_ACTIONS.CONFIRM_SUBMIT});
        return;

    },[dispatch]);

    const handleConfirmSignOut = useCallback(()=>{

        sessionStorage.clear();
        navigate("/login");
    },[navigate]);


    const dialogHandlers = {handleDialog,handleConfirmSubmit,handleConfirmSignOut};

    const headingHandlers = {handleEdit,handleSubmit};

    const handle_Personal_data_change = useCallback((e)=>{

         dispatch({eventType:TEAMLEAD_MY_PROFILE_ACTIONS.PERSONAL_DATA,name:e.target.name,value:e.target.value});
         return;

    },[dispatch]);

    const handleSignOut = useCallback(()=>{

          dispatch({eventType:TEAMLEAD_MY_PROFILE_ACTIONS.SIGNOUT});
          return;

    },[dispatch]);

    const {tableOuterBox={},headingOuterBox={},headingProps={},dialogProps={},personalAndTeamOuterBox={},personalDataProps={},signOutButton={}} = Props;

    return(
        <>
   
          <MyProfileDialog dialogProps={dialogProps} states={states} dialogHandlers={dialogHandlers} />

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
                    </BoxComponent>
                    {/*--------------------------------------------------- */}

                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>

                    <ButtonComponent props={{...signOutButton,onClick:handleSignOut}} />

          </BoxComponent>
        </>
    )
}
