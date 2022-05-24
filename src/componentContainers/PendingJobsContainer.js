
// import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { BoxComponent } from "../BasicComponents/BoxComponent";
import { CardComponent } from "../BasicComponents/CardComponent";
import { ChipComponent } from "../BasicComponents/ChipComponent";
import { SkeletonComponent } from "../BasicComponents/SkeletonComponent";
import { dateColor, giveDate } from "../Util";


export function PendingJobsContainer({pendingJobProps={},pendingJobData=""}){

    const navigate = useNavigate();

    const {jobOuterCard={},
           jobHeadingCard={},
           navPath="",
           pendingCustomerCard={},
           customerNameAndStatusBox={},
           jobStatusChip={},
           customerNameSkeleton={},
           customerStatusSkeleton={},
           jobDescriptionSekeleton={}} = pendingJobProps;


return(
    <>
       {/* Pending jobs */}
       {(typeof(pendingJobData) === "object")
             ?<CardComponent props={{...jobOuterCard}} >
                 <CardComponent props={{...jobHeadingCard}}>
                      <h1 style={{margin:"4%",color:"dodgerblue"}}><i>Pending Jobs</i></h1>
                 </CardComponent>
                 <CardContent>
                     { (pendingJobData.length > 0)
                           ? pendingJobData.map((customer,index)=>
                               <CardComponent key={index} props={{...pendingCustomerCard}}>
                                    <BoxComponent props={{...customerNameAndStatusBox,onClick:(navPath !== "")?()=>navigate(`${navPath}${customer.customer_id}`):(e)=>{e.preventDefault();}}}>
                                         <h2 style={{margin:"1% 3%",color:"dodgerblue"}}><i>{customer.firstName}</i></h2>
                                         <h2 style={{margin:"1% 0%",color:"dodgerblue"}}><i>{customer.lastName}</i></h2>
                                         <ChipComponent props={{...jobStatusChip,label:giveDate(customer.dueDate),color:dateColor(customer.dueDate)}}/>
                                    </BoxComponent>
                                    <p style={{margin:"2%"}}>{customer.taskDescription}</p>
                              </CardComponent>)
                           : <h2><i>No Pending Jobs</i></h2> }
                    
                 </CardContent>
              </CardComponent>
              
             :<CardComponent props={{...jobOuterCard}}>
                  <CardComponent props={{sx:{position:"sticky",top:"0rem",zIndex:"2"}}}>
                     <h1 style={{margin:"4%",color:"dodgerblue"}}><i>Pending Jobs</i></h1>
                  </CardComponent>
                 
                  <CardContent>
      
                      {[1,2,3,4,5,6].map((value)=>
                                   <CardComponent key={value} props={{...pendingCustomerCard}}>
                                       <BoxComponent props={{...customerNameAndStatusBox}}>
                                          <SkeletonComponent props={{...customerNameSkeleton}} />
                                          <SkeletonComponent props={{...customerNameSkeleton}} />
                                          <SkeletonComponent props={{...customerStatusSkeleton}} />
                                       </BoxComponent>
                                       <SkeletonComponent props={{...jobDescriptionSekeleton}} />
                                       <SkeletonComponent props={{...jobDescriptionSekeleton}} />
                                   </CardComponent>)}
                  </CardContent>    
              </CardComponent>}
    </>
)}