import "./App.css";
import { Toaster } from "react-hot-toast";
import { createContext,useState,lazy,Suspense, useEffect } from 'react';
import {Routes,Route} from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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

  return(
    <></>
  )
}