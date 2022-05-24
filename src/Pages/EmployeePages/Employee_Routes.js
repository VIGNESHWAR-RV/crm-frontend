import { Routes,Route,useNavigate } from "react-router-dom";
import {useEffect} from "react";
import toast from "react-hot-toast";
import logo from "../../svgs/Logo.webp";
import Box from '@mui/material/Box';
import {loggedInCheckService} from "../LoginPage/loginServices";
import {NavBar} from "../../BasicComponents/NavBar";
import { EMPLOYEE_DASHBOARD_PAGE } from "./Dashboard/Employee_Dashboard";
import { EMPLOYEE_MYPROFILE_PAGE } from "./MyProfile/Employee_MyProfile";
import { EMPLOYEE_CUSTOMER_ROUTES } from "./Customers/Customer_Routes";

function EMPLOYEE_ROUTES(){

    
    const navigate = useNavigate();

    const Buttons = [
        {sx:{fontSize:"larger",px:2},
        darkColor:"black",
        lightColor:"white",
        heading:"Dashboard",
        value:"dashboard/"},

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

    const logos = [logo,{height:"3rem",width:"3rem",borderRadius:"50%",margin:"auto 1%"}];
    // const [Buttons,setButtons] = useState(defaultButtons);
    const ButtonsStyle = {display:"flex",flexDirection:"row",p:2};

    const clicking = (e,value)=>{
      navigate(value);
    }

    const navStyle = {backgroundColor:"dodgerblue",display:"flex",flexDirection:"row"};


    useEffect(()=>{

        const employee_auth = sessionStorage.getItem('employee_auth');
        const manager_auth = sessionStorage.getItem('manager_auth');
        const admin_auth = sessionStorage.getItem('admin_auth');
  
        async function loggedInCheck(authorization){
            const response = await loggedInCheckService(authorization);
            // const data = await response.json();
            if(response.status === 200){
                // toast.success(`you are already logged In as ${data.name} ( ${data.role} )`);
                // if(data.role === "admin"){
                //   navigate("/admin/dashboard");
                // }
                // else if(data.role === "manager"){
                //   navigate("/manager/dashboard");
                // }
                // else if(data.role === "employee"){
                //   navigate("/employee/dashboard");
                // }
                return;
            }else{
                // setIsLoading(false);
                sessionStorage.clear();
                navigate("/login");
                return toast.error("couldn't authorize User,please login again");
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
          <NavBar Buttons={Buttons} ButtonsStyle={ButtonsStyle} clicking={clicking} navStyle={navStyle} logo={logos}/>
        </Box>
        {/* backgroundColor:"dodgerblue" should play with this */}
        <Box sx={{overflow:"auto",backgroundColor:"rgba(30, 144, 255, 0.666)",minHeight:"93.5vh",maxHeight:"93.5vh"}}>
          <Routes>
              <Route path="dashboard/*" element={< EMPLOYEE_DASHBOARD_PAGE />}/>
              <Route path="customers/*" element={<EMPLOYEE_CUSTOMER_ROUTES/>}/>
              <Route path="my-profile/*" element={<EMPLOYEE_MYPROFILE_PAGE/>}/>
          </Routes>
        </Box>
    </Box>
    )
}

export default EMPLOYEE_ROUTES;