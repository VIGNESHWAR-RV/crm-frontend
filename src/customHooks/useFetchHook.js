//---- { react and router dom imports } ---------------------------------
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
//-----------------------------------------------------------------------

//---- { react hot-toast imports } -------------------------------------
import toast from 'react-hot-toast';
//----------------------------------------------------------------------

//---- { API imports } -------------------------------------------------
import { API } from "../API";
//----------------------------------------------------------------------


export const useFetchAction = ({componentMounted,path="/",method="GET",header={},body={},role=""})=>{

    // componentMounted  ---> must be useRef
    // path  ---> end point of required API
    // method  ---> fetch method
    // header  ---> optional
    // body  ---> optional
    // role ---> should define role for getting respective token

    const navigate = useNavigate();
      
    const [data,setData] = useState(null);

    const [fetchData,setFetchData] = useState({path,method,header,body,role});

    // console.count("rendering custom hook");

    useEffect(()=>{
       
       async function adminAction({path,method,header,body,role}){

         if(path === "/"){
           toast.error("Please provide a valid API to fetch");
           return;
         }

         if(role === ""){
            toast.error("provide the role to fetch data");
            return;
         }

          const roles = {admin:"admin_auth",
                         teamLead:"teamLead_auth",
                         employee:"employee_auth"};

           const token = sessionStorage.getItem(roles[role]);

             if(token !== "" && token !== undefined && token !== null){

                 if(componentMounted.current){
                        try{
                             let fetchInfo = (method==="GET")
                                                ?{method:method,
                                                  headers:{"Content-Type":"application/json",[roles[role]]:token,...header}}
                                                :{method:method,
                                                  headers:{"Content-Type":"application/json",[roles[role]]:token,...header},
                                                  body:JSON.stringify(body)};
                             const response = await fetch(`${API}${path}`,fetchInfo);
              
                             const data = await response.json();
                 
                              if(componentMounted.current){
    
                                if(response.status === 200){
                                    setData(data);
                                }
    
                                else if (response.status >= 400 && response.status < 500){
                                    toast.error((data.message)?data.message:"something went wrong, please try again");
                                    // setData("");
                                    navigate(-1);
                                    // toast.error("Server busy while fetching data, please try again!!!");
                                }
                                else{
                                    toast.error((data.message)?data.message:"Server Busy , try again later");
                                    // setData("");
                                    navigate(-1);
                                }
                              }
                        }catch(err){
                            throw new Error(err);
                        }
                   
                 }else{
                   return;
                 }

             }else{
                 navigate("/login");
                 sessionStorage.clear();
                 return;
             }
       }
       adminAction(fetchData);
    //    console.count("re-rendering by effect")

    },[componentMounted,fetchData,navigate]);


    return [data,setFetchData];
}
