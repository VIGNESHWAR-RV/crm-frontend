// import Chip from '@mui/material/Chip';
import { dateColor, giveDate } from '../Util';
import { ChipComponent } from './ChipComponent';
import { SkeletonComponent } from './SkeletonComponent';
// import {context} from "../App";
// import {useContext} from "react";

export function Table({tableProps={},tableData="",onClick=()=>{}}){

       const { requiredHeadings=[],tableDataSkeleton={},tableStatusChip={} } = tableProps
        

    return(
      <table style={{width:'100%'}}>
        <thead>
        <tr>
          <th style={{borderTopLeftRadius:"1.5rem"}}>
              <h2><i>S.No</i></h2>
          </th>
          {requiredHeadings.map(({heading},index)=>
            <th key={index} style={{borderTopRightRadius:(index === requiredHeadings.length - 1)?"1.5rem":""}}>
              <h3 style={{textTransform:"uppercase"}}>
                  <i>{heading}</i>
              </h3>
            </th>)}
        </tr>
        </thead>
        <tbody>

            {(tableData !== "")
              ? (tableData.length > 0 && typeof(tableData) === "object")
                    ? tableData.map((data,index)=>
                        <tr key={index} onClick={()=>onClick(data)}>
                            <td style={{borderBottom:(index !== tableData.length-1)?`2px solid dodgerblue`:""}}>
                                <h3>{index+1}.</h3>
                            </td>
                            <RowGenerator requiredHeadings={requiredHeadings} tableStatusChip={tableStatusChip} data={data} isLastIndex={index === tableData.length-1}/> 
                        </tr>)
                    : <tr>
                        <td colSpan={+requiredHeadings.length+1}>
                            <h3><i>No Data</i></h3>
                        </td>
                      </tr>
              : requiredHeadings.map(({value},index)=>
                   <tr key={index}>
                       <td style={{borderBottom:`2px solid dodgerblue`}} >
                           <SkeletonComponent props={{...tableDataSkeleton,sx:{...tableDataSkeleton.sx,minWidth:"1.5rem",width:"4vw"}}} />
                       </td>
                       {/* <RowGenerator requiredHeadings={requiredHeadings} data={data} isLastIndex={index === tableData.length-1}/> */}
                       {requiredHeadings.map(({value},index)=>
                           <td key={index} style={{borderBottom:`2px solid dodgerblue`}} >
                             <SkeletonComponent props={{...tableDataSkeleton}} />
                           </td>
                        )} 
                   </tr>)
              }
        </tbody>
      </table>
    )
}

    
function RowGenerator({requiredHeadings=[],tableStatusChip={},data={},isLastIndex=false}){


    return(
        <>
        {requiredHeadings.map(({field},index)=>
            <td key={index} style={{borderBottom:(isLastIndex)?"":`2px solid dodgerblue`}}>
               {(field === "status")
                   ? <h3><ChipComponent props={{...tableStatusChip,label:data.status,color:(data.status === "ACTIVE")?"success":"error"}} /></h3>
                   :(field === "name")
                       ? <h3  style={{fontWeight:"500"}}>{data.firstName+" "+data.lastName}</h3>
                       :(field === "revenue")
                           ? <h3 style={{fontWeight:"500"}}><i style={{color:"dodgerblue",fontSize:"1.5rem"}}>₹ </i>{data[field]}</h3>
                           :(field === "dueDate")
                               ? <h3><ChipComponent props={{...tableStatusChip,label:giveDate(data[field]),color:dateColor(data[field])}} /></h3>
                               : <h3 style={{fontWeight:"500"}}>{data[field]}</h3>}                   
            </td>)}
        </>
    )

}
