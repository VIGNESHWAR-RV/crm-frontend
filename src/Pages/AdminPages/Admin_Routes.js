import { Routes,Route,useNavigate, Navigate } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import Logo from "../../svgs/Logo.webp";
import Box from '@mui/material/Box';
import {loggedInCheckService} from "../LoginPage/loginServices";
import {NavBar} from "../../BasicComponents/NavBar";
import { ADMIN_DASHBOARD } from "./Dashboard/Admin_Dashboard";
import { ADMIN_TEAM_LEADS_ROUTES } from "./TeamLeadPages/Routes";
import { ADMIN_EMPLOYEES_ROUTES } from "./EmployeePages/Routes";
import { ADMIN_CUSTOMERS_ROUTES } from "./CustomerPages/Routes";
import { ADMIN_MY_PROFILE } from "./MyProfile/Admin_MyProfile";

function ADMIN_ROUTES(){

    const navigate = useNavigate();

    const [isAuthorized,setIsAuthorized] = useState(false);
    const componentMounted = useRef(true);


          // nav styles , button and button styles
    const Buttons = [
        {sx:{fontSize:"1rem",px:2,borderRadius:"1.5rem"},
        darkColor:"black",
        lightColor:"white",
        heading:"Dashboard",
        value:"dashboard/"},

        {sx:{fontSize:"1rem",px:2,borderRadius:"1.5rem"},
        darkColor:"black",
        lightColor:"white",
        heading:"Team Leads",
        value:"teamLeads/"},

        {sx:{fontSize:"1rem",px:2,borderRadius:"1.5rem"},
        darkColor:"black",
        lightColor:"white",
        heading:"Employees",
        value:"employees/"},

        {sx:{fontSize:"1rem",px:2,borderRadius:"1.5rem"},
        darkColor:"black",
        lightColor:"white",
        heading:"Customers",
        value:"customers/"},

        {sx:{fontSize:"1rem",px:2,borderRadius:"1.5rem"},
        darkColor:"black",
        lightColor:"white",
        heading:"My Account",
        value:"my-profile/"},
      ];
    const logo = [Logo,{height:"3rem",width:"3rem",borderRadius:"50%",margin:"auto 1%"}];
    const ButtonsStyle = {display:"flex",flexDirection:"row",p:2};
    const navStyle = {backgroundColor:"dodgerblue",display:"flex",flexDirection:"row"};


    const navProps = [Buttons,ButtonsStyle,logo,navStyle];

    useEffect(()=>{

        const employee_auth = sessionStorage.getItem('employee_auth');
        const teamLead_auth = sessionStorage.getItem('teamLead_auth');
        const admin_auth = sessionStorage.getItem('admin_auth');
  
        async function loggedInCheck(authorization){
          if(componentMounted.current){
              const response = await loggedInCheckService(authorization);
              // const data = await response.json();
              if(componentMounted.current){
                    if(response.status === 200){
                        setIsAuthorized(true);
                        return;
                    }else{
                        sessionStorage.clear();
                        navigate("/login");
                        return toast.error("couldn't authorize User,please login again");
                    }
              }
              else{
                 return;
              }
           }
           else{
              return;
           }
        }

        if(employee_auth){
             navigate("/employee");
        }else if(teamLead_auth){
             navigate("/teamLead");
        }else if(admin_auth){
             loggedInCheck({admin_auth});
        }else{
          //  console.log("not logged in")
           navigate("/login");
        }

          return()=>{
            componentMounted.current = false;
            }

    // eslint-disable-next-line
    },[]);
 

    return(
         <Box sx={{overflow: "hidden"}}>
           
            <Box>
              <NavBar navProps={navProps} isAuthorized={isAuthorized}/>
            </Box>

            {/* backgroundColor:"dodgerblue" should play with this */}
            {(isAuthorized)
              ?
                 <Box sx={{overflow:"auto",backgroundColor:"rgba(30, 144, 255, 0.666)",minHeight:"93.5vh",maxHeight:"93.5vh"}}>
                   <Routes>
                       {/* SCREAMING_SNAKE_CASE 😀 */}
                       <Route path="/" element={ <Navigate to="dashboard/" />} />  
                          {/* nav bar not detecting on navigating  from "/" to  "dashboard/" */}
                       <Route path="dashboard/*" element={<ADMIN_DASHBOARD/>}/>
                       <Route path="teamLeads/*" element={<ADMIN_TEAM_LEADS_ROUTES/>}/>
                       <Route path="employees/*" element={<ADMIN_EMPLOYEES_ROUTES/>}/>
                       <Route path="customers/*" element={<ADMIN_CUSTOMERS_ROUTES/>}/>
                       <Route path="my-profile/*" element={<ADMIN_MY_PROFILE/>}/>
                   </Routes>
                 </Box>
              :""}
         </Box>
    )
}

export default ADMIN_ROUTES;