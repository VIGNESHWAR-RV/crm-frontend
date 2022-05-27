
//--------- { css , react , react-router-dom } imports ------------
import { useCallback, useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
//--------------------------------------------------------------

//----------- { Component } Imports -----------------------------
import {Table} from "../../../BasicComponents/Table";
import { ButtonComponent } from "../../../BasicComponents/ButtonComponent";
//---------------------------------------------------------------

//---- { custom Hook imports }-----------------------------------
import { useFetchAction } from "../../../customHooks/useFetchHook";
import { BoxComponent } from "../../../BasicComponents/BoxComponent";
import { CardComponent } from "../../../BasicComponents/CardComponent";
//---------------------------------------------------------------


export function ADMIN_TEAM_LEADS_TABLE_ACTIONS({Props}){

    const navigate =  useNavigate();
  
    const componentMounted = useRef(true);
  
    useEffect(()=>{
 
     return()=>{
       componentMounted.current = false;
     }
    },[]);
 
    const [tableData , setTableData ] = useState("");
 
    const [data] = useFetchAction({componentMounted,path:`/admin/teamLeads/table`,method:"GET",header:{},body:{},role:"admin" });
 
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
             setTableData(data);
          }
     }
 
    },[data,setTableData]);
 
 
    const handleSelect=useCallback((data)=>{
     // setData(data);
     navigate(`${data.userName}`);
    },[navigate]);
 
 
    const {addButton={},tableHeadingAndButtonBox={},tableHeading={},tableOuterCard={},tableProps={}} = Props;
 
   return (
          <>

            <BoxComponent props={{...tableHeadingAndButtonBox}}>
               
               <h1><i>{tableHeading}</i></h1>
               <ButtonComponent props={{...addButton,onClick:()=>navigate("add") }} />

            </BoxComponent>

            <CardComponent props={{...tableOuterCard}} >

               <Table tableProps={tableProps} tableData={tableData} onClick={handleSelect} />

            </CardComponent>

          </>
   )
 }
 