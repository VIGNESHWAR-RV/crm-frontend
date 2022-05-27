import { Routes,Route,useNavigate } from "react-router-dom";
import {useEffect,useState,useRef} from "react";
import toast from "react-hot-toast";
import Logo from "../../svgs/Logo.webp";
import Box from '@mui/material/Box';
import {loggedInCheckService} from "../LoginPage/loginServices";
import {NavBar} from "../../BasicComponents/NavBar";
import { EMPLOYEE_DASHBOARD_PAGE } from "./Dashboard/Employee_Dashboard";
import { EMPLOYEE_MYPROFILE_PAGE } from "./MyProfile/Employee_MyProfile";
import { EMPLOYEE_CUSTOMER_ROUTES } from "./Customers/Customer_Routes";

function EMPLOYEE_ROUTES(){

    
    const navigate = useNavigate();

    const [isAuthorized,setIsAuthorized] = useState(false);
    const componentMounted = useRef(true);

    const Buttons = [
        {sx:{fontSize:"larger",px:2,borderRadius:"1.5rem"},
        darkColor:"black",
        lightColor:"white",
        heading:"Dashboard",
        value:"dashboard/"},

        {sx:{fontSize:"larger",px:2,borderRadius:"1.5rem"},
        darkColor:"black",
        lightColor:"white",
        heading:"Customers",
        value:"customers/"},

        {sx:{fontSize:"larger",px:2,borderRadius:"1.5rem"},
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
        const manager_auth = sessionStorage.getItem('manager_auth');
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
                     // setIsLoading(false);
                     sessionStorage.clear();
                     navigate("/login");
                     return toast.error("couldn't authorize User,please login again");
                   }
              }else{
                return;
              }
          }else{
            return;
          }
        }
          if(employee_auth){
               loggedInCheck({employee_auth});
          }else if(manager_auth){
               loggedInCheck({manager_auth});
          }else if(admin_auth){
               loggedInCheck({admin_auth});
          }else{
            //  console.log("not logged in")
             navigate("/login");
          }
    // eslint-disable-next-line
      },[]);

    return(
      
        <Box sx={{overflow: "hidden"}}>

          <Box>
            <NavBar navProps={navProps} isAuthorized={isAuthorized} />
          </Box>

          {(isAuthorized)
            ? <Box sx={{overflow:"auto",backgroundColor:"rgba(30, 144, 255, 0.666)",minHeight:"93.5vh",maxHeight:"93.5vh"}}>
                 <Routes>
                     <Route path="dashboard/*" element={< EMPLOYEE_DASHBOARD_PAGE />}/>
                     <Route path="customers/*" element={<EMPLOYEE_CUSTOMER_ROUTES/>}/>
                     <Route path="my-profile/*" element={<EMPLOYEE_MYPROFILE_PAGE/>}/>
                 </Routes>
              </Box>
            :""}
        </Box>
    )
}

export default EMPLOYEE_ROUTES;