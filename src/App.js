import "./App.css";
import toast,{ Toaster } from "react-hot-toast";
import { createContext,useState,lazy,Suspense } from 'react';
import {Routes,Route,useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { loginService } from "./Pages/LoginPage/loginServices";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import {SignUpPage} from "./Pages/SignUpPage/SignUpPage";
import {ForgotPasswordPage} from "./Pages/ForgotPasswordPage/forgotPasswordPage";


const LazyAdmin = lazy(() => import("./Pages/AdminPages/Admin_Routes"));
const LazyTeamLead = lazy(() => import("./Pages/TeamLeadPages/TeamLead_Routes"));
const LazyEmployee = lazy(() => import("./Pages/EmployeePages/Employee_Routes"));


export const context = createContext("");

export default function App(){

  const [mode,setMode] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: (mode) ? "dark" : "light",
    },
  });

  // console.count("rendering");

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <context.Provider value={{mode,setMode}}>
       <Box>
        <Paper elevation={0} sx={{backgroundColor:(mode)?"":"rgb(245,250,255)",borderRadius: "0", width: "100%",height:"100vh",overflow:"hidden" }}>
         <Toaster/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="getting-started" element={<SignUpPage/>}/>
            <Route path="forgot-password" element={<ForgotPasswordPage/>}/>

            <Route path="admin/*" element={<Suspense fallback={"loading..."}>
                                              <LazyAdmin/>
                                           </Suspense>}/>
            <Route path="teamLead/*" element={<Suspense fallback={"loading..."}>
                                                 <LazyTeamLead/>
                                              </Suspense>}/>
            <Route path="employee/*" element={<Suspense fallback={"loading..."}>
                                                 <LazyEmployee/>
                                              </Suspense>}/>

            {/* <Route path="admin/*" element={<ADMIN_ROUTES/> }/>
            <Route path="teamLead/*" element={<TEAMLEAD_ROUTES/>}/>
            <Route path="employee/*" element={<EMPLOYEE_ROUTES/>}/> 
               */}
          </Routes>
        </Paper>
       </Box>
      </context.Provider>
    </ThemeProvider>
    </>
  )
}

function LandingPage(){

  const navigate = useNavigate();

  const [isDisabled,setIsDisabled] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  async function loggingIn(userLoggingIn){
    setIsLoading(true);
    setIsDisabled(true);  
    const {email,password} = userLoggingIn;

    const response = await loginService({email,password});
    const data = await response.json();
    setIsLoading(false);
    setIsDisabled(false);
    if(response.status === 200){
        if(data.role === "admin"){
          sessionStorage.setItem("admin_auth",data.token);
          navigate("/admin/dashboard/");
        }
        else if(data.role === "team Lead"){
          sessionStorage.setItem("teamLead_auth",data.token);
          navigate("/teamLead/dashboard/");
        }
        else if(data.role === "employee"){
          sessionStorage.setItem("employee_auth",data.token);
          navigate("/employee/dashboard/");
        }
        return toast.success(`Welcome Back,${data.name}`);
    }else if(response.status >= 400 && response.status < 500){
        return toast.error("Invalid request");
    }else{
        return toast.error("Server error , please try again later");
    }
  }


  return(
    <>
    <Box id="landingDiv" sx={{display:'grid',width:'100vw',height:'100vh',gridTemplateColumns:"1fr 1fr",overflowY:"auto"}}>
         <Box sx={{display:'grid',placeItems:"center",placeContent:"center"}}>
           <p className="paper">
                What is CRM ???
           </p>
           <p style={{margin:"0% 4%",textAlign:"center",fontSize:"1.25rem"}}>
           <i>
              CRM stands for Customer Relationship Management. Today, when you hear about CRM, it mostly refers to CRM software - a tool which acts as a single repository to bring your sales, marketing, customer support activities together, and streamlines your process, policy, and people in one platform.
            </i>
           </p>
           
         </Box>
         <Box sx={{display: 'grid',
                   width:"100%",
                   height:"100%",
                   justifyItems:"center",
                   alignItems:"center"}}>
            <Box sx={{
               width:"fit-content",
               maxWidth:"30rem",
               minWidth:"15rem",
               margin:"1%",
               padding:"1% 4%",
               fontSize:"1.75rem",
               overflow:"hidden",
               textTransform:"capitalize",
               border:"2px solid dodgerBlue",
               boxShadow:"inset 0px 0px 0rem 100rem rgba(30, 144, 255, 0.066)",
               borderRadius:"2rem",}}>

            {(isLoading)
                   ? <LinearProgress sx={{backgroundColor:"dodgerblue",width:"120%",marginLeft:"-10%",mt:-0.75,height:"0.5rem"}} />
                   :""}
                 
                 <h1 id="landingHeading" style={{marginBottom:"0%"}}>Welcome to RV's CRM</h1>
                 {/* <span style={{fontSize:"1.2rem"}}>login to access CRM</span> */}
                 
                 <Box
                    sx={{
                      '& > :not(style)': {},
                      display:"grid",
                      justifyItems:"center",
                      alignContent:"center",
                    }}
                    >

                     <Button sx={{m:2,mt:5,backgroundColor:"dodgerblue"}}
                             variant="contained" 
                             color="primary" 
                             type="button"
                             disabled={isDisabled}
                             onClick={()=>navigate("/login")}>
                          Login
                     </Button>

                     <h5 style={{margin:"0 0 4% 0"}}>{"(or)"}</h5>
                     
                     <Button sx={{backgroundColor:"dodgerblue"}}
                             variant="contained" 
                             color="primary" 
                             disabled={isDisabled}
                             onClick={()=>navigate("/getting-started")}
                             type="button">
                          Sign Up
                     </Button>
                   
                     <h4 style={{margin:"8% 0 2% 0"}}>Demo Accounts</h4>
                     <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>

                     <Button sx={{m:1}} 
                               size="small"
                               variant="contained"
                               disabled={isDisabled}
                               onClick={()=>loggingIn({email:"demoadmin01@gmail.com",password:"Demoadmin@123"})}
                               color="warning">
                         Admin
                      </Button>
                      <Button sx={{m:1}} 
                               size="small"
                               variant="contained"
                               disabled={isDisabled}
                               onClick={()=>loggingIn({email:"demoteamlead01@gmail.com",password:"DemoTeamLead@123"})}
                               color="warning">
                         Team Lead
                      </Button>
                       <Button sx={{m:1}} 
                               size="small"
                               variant="contained"
                               disabled={isDisabled}
                               onClick={()=>loggingIn({email:"demoemployee01@gmail.com",password:"DemoEmployee@123"})}
                               color="warning">
                         Employee
                      </Button>
                     </Box>
                    
                 </Box>
            </Box>
         </Box>
    </Box>
    </>
  )
}