
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
import { ADMIN_NOTES_CONTAINER_ACTION } from "../Notes/ADMIN_NOTES_ACTIONS";


//--- { custom hooks imports } --------------------------------------------------
import { useFetchAction } from "../../../customHooks/useFetchHook";
//-------------------------------------------------------------------------------



export function ADMIN_DASHBOARD_PAGE_ACTIONS({Props}){

    const componentMounted = useRef(true);

    const [dashboardData,setDashboardData] = useState({});

    useEffect(()=>{

         return ()=>{
             componentMounted.current = false;
         }
    },[componentMounted])

    const [data] = useFetchAction({componentMounted,path:"/admin/dashboard",method:"GET",header:{},body:{},role:"admin"})

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
     
                <ADMIN_NOTES_CONTAINER_ACTION notesProps={notesProps} notesData={dashboardData.notesData} />
     
             </BoxComponent>
     
             <BoxComponent props={{...infoAndJobsDiv}} >
     
                <InfoCardCotainer infoProps={infoProps} infoCardData={dashboardData.infoCardData} />
     
                <PendingJobsContainer pendingJobProps={pendingJobProps} pendingJobData={dashboardData.pendingJobData} />
     
             </BoxComponent>
     
          </BoxComponent>
    )
}

