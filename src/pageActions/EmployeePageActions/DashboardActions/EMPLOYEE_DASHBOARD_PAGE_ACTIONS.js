
//--- { react imports } ------------------------------------
import { useEffect, useRef, useState } from "react";
//----------------------------------------------------------

//--- { container imports } -----------------------------------------------------
import { GraphContainer } from '../../../componentContainers/GraphContainer';
import { InfoCardCotainer } from '../../../componentContainers/InfoCardsContainer';
import { PendingJobsContainer } from '../../../componentContainers/PendingJobsContainer';
import { BoxComponent } from "../../../BasicComponents/BoxComponent";
//--------------------------------------------------------------------------------

//--- { action component imports } ----------------------------------------------
import { EMPLOYEE_NOTES_CONTAINER_PAGE_ACTIONS } from "../Notes/EMPLOYEE_NOTES_CONTAINER_ACTION";
//------------------------------------------------------------------------------

//--- { custom hooks imports } --------------------------------------------------
import { useFetchAction } from "../../../customHooks/useFetchHook";
//-------------------------------------------------------------------------------



export function EMPLOYEE_DASHBOARD_PAGE_ACTIONS({Props}){

    const componentMounted = useRef(true);

    const [dashboardData,setDashboardData] = useState({});

    useEffect(()=>{

         return ()=>{
             componentMounted.current = false;
         }
    },[componentMounted])

    const [data] = useFetchAction({componentMounted,path:"/employee/dashboard",method:"GET",header:{},body:{},role:"employee"})

    // ************* Notes for using -{ useFetchAction custom hook }-  ***************
    // componentMounted  ---> must be useRef
    // path  ---> end point of required API
    // method  ---> fetch method
    // header  ---> optional
    // body  ---> optional
    // role ---> should define role for getting respective token


    useEffect(()=>{

        if(componentMounted.current){

             if(data !== null && data !== ""){
                  setDashboardData(data);
             }

        }
         
    },[data,componentMounted,setDashboardData]);


    const {dashBoardOuterDiv,graphAndNotesDiv,graphProps,notesProps,infoAndJobsDiv,infoProps,pendingJobProps} = Props;

    return(
          <BoxComponent props={{...dashBoardOuterDiv}} >
     
             <BoxComponent props={{...graphAndNotesDiv}} >
                 
                <GraphContainer graphProps={graphProps} graphData={dashboardData.graphData} />
     
                <EMPLOYEE_NOTES_CONTAINER_PAGE_ACTIONS notesProps={notesProps} notesData={dashboardData.notesData} />
     
             </BoxComponent>
     
             <BoxComponent props={{...infoAndJobsDiv}} >
     
                <InfoCardCotainer infoProps={infoProps} infoCardData={dashboardData.infoCardData} />
     
                <PendingJobsContainer pendingJobProps={pendingJobProps} pendingJobData={dashboardData.pendingJobData} />
     
             </BoxComponent>
     
          </BoxComponent>
    )
}

