//-------- { react , react-router-dom } imports -----
import { useEffect,useState,useRef } from 'react'; //useCallback, useReducer
import { useNavigate } from "react-router-dom";
//----------------------------------------------------


//--------- { Component } imports -------------------
import { BoxComponent } from '../../../BasicComponents/BoxComponent';
import { Heading } from '../../../componentContainers/Heading';
import { PersonalData } from '../../../componentContainers/PersonalData';
import { WorkData } from '../../../componentContainers/WorkData';
import { RevenueData } from '../../../componentContainers/RevenueData';
import { PendingJobsContainer } from '../../../componentContainers/PendingJobsContainer';
//---------------------------------------------------

//--------- { custom Hook imports } ---------------------------------
import { useFetchAction } from '../../../customHooks/useFetchHook';
//-------------------------------------------------------------------



export function TEAMLEAD_EMPLOYEE_PAGE_ACTIONS({Props={}}){

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


    const [employeeData,setEmployeeData] = useState({});

    const [data] = useFetchAction({componentMounted,path:`/teamLead/employees/${userName}`,method:"GET",header:{},body:{},role:"teamLead" });
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
                // dispatch({eventType:ADMIN_EMPLOYEE_ACTIONS.UPDATE,...data})
                setEmployeeData({...data});
             }
        }

    },[data]);


    const {pageOuterBox={},headingOuterBox={},headingProps={},personalOuterBox={},personalDataProps={},workAndJobOuterBox={},workDetailProps={},revenueDetailProps={},pendingJobProps={}} = Props;
        
    return(
        <>
           
            <BoxComponent props={{...pageOuterBox}} >


                    {/*--- heading -------------------- */}
                    <BoxComponent props={{...headingOuterBox}}>
                        <Heading headingProps={headingProps} states={employeeData} />  {/* headingHandlers={headingHandlers} */}
                    </BoxComponent>
                    {/* ------------------------------- */}
       

                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       

                    {/*--- personal profile and team members ------------- */}
                    <BoxComponent props={{...personalOuterBox}}> 
                        
                          <PersonalData personalDataProps={personalDataProps} states={employeeData} /> {/* handleChange={handle_Personal_data_change} */}
       
                    </BoxComponent>
                    {/*--------------------------------------------------- */}
       

                    <hr style={{width:"98%",backgroundColor:"dodgerblue",border:"1px solid dodgerblue"}}/>
       

                    {/*--- Works and pending Jobs ----------------------*/}
                    <BoxComponent props={{...workAndJobOuterBox}} >

                          <BoxComponent>
                             <WorkData workDetailProps={workDetailProps} states={employeeData} /> {/* handleChange={work_detail_handle_change} */}
                             <RevenueData states={employeeData} revenueDetailProps={revenueDetailProps} /> 
                          </BoxComponent>
                           
                           <PendingJobsContainer pendingJobProps={pendingJobProps} pendingJobData={employeeData.pendingJobData} />
                    </BoxComponent>
                    {/* ------------------------------------------------ */}
             
            </BoxComponent> 
        </>
    )
}



