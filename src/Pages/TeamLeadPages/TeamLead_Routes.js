import { Routes,Route,useNavigate,Navigate } from "react-router-dom";
import {useEffect,useState,useRef} from "react";
import toast from "react-hot-toast";
import Logo from "../../svgs/Logo.webp";
import Box from '@mui/material/Box';
import {loggedInCheckService} from "../LoginPage/loginServices";
import {NavBar} from "../../BasicComponents/NavBar";
import { TEAMLEAD_DASHBOARD_PAGE } from "./Dashboard/TeamLead_Dashboard";
import { TEAMLEAD_EMPLOYEES_ROUTES } from "./EmployeePages/TeamLead_Employee_Routes";
import { TEAMLEAD_CUSTOMERS_ROUTES } from "./CustomerPages/TeamLead_Customers_Routes";
import { TEAMLEAD_MY_PROFILE_PAGE } from "./MyProfile/TeamLead_MyProfile";

 function TEAMLEAD_ROUTES(){

        const navigate = useNavigate();

        const [isAuthorized,setIsAuthorized] = useState(false);
        const componentMounted = useRef(true);
        

        const Buttons = [
            {sx:{fontSize:"larger",px:2},
            darkColor:"black",
            lightColor:"white",
            heading:"Dashboard",
            value:"dashboard/"},
    
            {sx:{fontSize:"larger",px:2},
            darkColor:"black",
            lightColor:"white",
            heading:"Employees",
            value:"employees/"},
    
            {sx:{fontSize:"larger",px:2},
            darkColor:"black",
            lightColor:"white",
            heading:"Customers",
            value:"customers/"},
    
            {sx:{fontSize:"larger",px:2},
            darkColor:"black",
            lightColor:"white",
            heading:"My Account",
            value:"my-profile/"},
          ];
    
        const logo = [Logo,{height:"3rem",width:"3rem",borderRadius:"50%",margin:"auto 1%"}];
        // const [Buttons,setButtons] = useState(defaultButtons);
        const ButtonsStyle = {display:"flex",flexDirection:"row",p:2};
        const navStyle = {backgroundColor:"dodgerblue",display:"flex",flexDirection:"row"};

    
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
                 navigate("/employee")
            }else if(teamLead_auth){
                 loggedInCheck({teamLead_auth});
            }else if(admin_auth){
                 navigate("/admin")
            }else{
              //  console.log("not logged in")
               navigate("/login");
            }

            
            return()=>{
              componentMounted.current = false;
              }

        // eslint-disable-next-line
          },[]);


          const navProps = [Buttons,ButtonsStyle,logo,navStyle];
      
    return(
        <Box sx={{overflow: "hidden"}}>
        <Box>
          <NavBar navProps={navProps} isAuthorized={isAuthorized} />
        </Box>
        {(isAuthorized)
              ?
                 <Box sx={{overflow:"auto",backgroundColor:"rgba(30, 144, 255, 0.666)",minHeight:"93.5vh",maxHeight:"93.5vh"}}>
                   <Routes>
                       {/* SCREAMING_SNAKE_CASE 😀 */}
                       <Route path="/" element={ <Navigate to="dashboard/" />} />
                       <Route path="dashboard/*" element={ <TEAMLEAD_DASHBOARD_PAGE/> }/>
                       <Route path="employees/*" element={ <TEAMLEAD_EMPLOYEES_ROUTES/> }/>
                       <Route path="customers/*" element={ <TEAMLEAD_CUSTOMERS_ROUTES/> }/>
                       <Route path="my-profile/*" element={ <TEAMLEAD_MY_PROFILE_PAGE/> }/>
                       {/* nav back option for 404 page */}
                   </Routes>
                 </Box>
              :""}
    </Box>
    )
}

export default TEAMLEAD_ROUTES;

