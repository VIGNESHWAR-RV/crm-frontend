import "./LoginPage.css";
import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import { context } from "../../App.js";
import LinearProgress from '@mui/material/LinearProgress';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Input from '@mui/material/Input';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import {InputComponent} from "../../BasicComponents/InputComponent";
import {loginService,loggedInCheckService} from "./loginServices";

export function LoginPage(){

    const navigate = useNavigate();

    const [userLoggingIn,setUserLoggingIn] = useState({email:"",password:""});
    const [isDisabled,setIsDisabled] = useState(true);
    const [isLoading,setIsLoading] = useState(true)

   useEffect(()=>{
     
      const employee_auth = sessionStorage.getItem('employee_auth');
      const teamLead_auth = sessionStorage.getItem('teamLead_auth');
      const admin_auth = sessionStorage.getItem('admin_auth');

      async function loggedInCheck(authorization){
          const response = await loggedInCheckService(authorization);
          const data = await response.json();
          if(response.status === 200){
              toast.success(`you are already logged In as ${data.name} ( ${data.role} )`);
              if(data.role === "admin"){
                navigate("/admin/dashboard/");
              }
              else if(data.role === "teamLead"){
                navigate("/teamLead/dashboard/");
              }
              else if(data.role === "employee"){
                navigate("/employee/dashboard/");
              }
              return;
          }else{
              setIsLoading(false);
              setIsDisabled(false);
              sessionStorage.clear();
              // console.log(data);
              return toast.error("couldn't authorize User,please login again");
          }
      }
        if(employee_auth){
             loggedInCheck({employee_auth});
        }else if(teamLead_auth){
             loggedInCheck({teamLead_auth});
        }else if(admin_auth){
             loggedInCheck({admin_auth});
        }else{
          //  console.log("not logged in")
           setIsLoading(false);
           setIsDisabled(false);
        }
    // eslint-disable-next-line
    },[]);

    const handleChange = (e)=>{
      // if(e.target.name === "role"){
      //   setUserLoggingIn({...userLoggingIn,role:e.target.value});
      //  }
       if(e.target.name === "email"){
        setUserLoggingIn({...userLoggingIn,email:e.target.value});
       }
       if(e.target.name === "password"){
        setUserLoggingIn({...userLoggingIn,password:e.target.value});
       }
    }

    const regex = {email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                   password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
                  };

    // color , variant , sx = optional
    // pattern , required  = in case of need for validations
    const Inputs = [
                    {name:"email",
                     label:"Email",
                     type:"text",
                     pattern:regex.email,
                     required:true,
                     defaultValue:userLoggingIn.email,
                     placeholder:"Type Here",
                    //  helperText:"Must be unique with atleast 3 letters",
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"username",
                     variant:"outlined",
                     color:"primary",
                     sx:{fontSize:"1rem"} },

                    {name:"password",
                     label:"Password",
                     type:"password",
                     pattern:regex.password,
                     required:true,
                     defaultValue:userLoggingIn.password,
                     placeholder:"Type Here",
                    //  helperText:"Enter your password here",
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"current-password",
                     variant:"outlined",
                     color:"primary",
                     sx:{fontSize:"1rem"} }
                      ];

    const handleSubmit = (e)=>{
      e.preventDefault();
      // !["employee","manager","admin"].includes(userLoggingIn.role) ||
       if(
          !new RegExp(regex.email).test(userLoggingIn.email) || 
          !new RegExp(regex.password).test(userLoggingIn.password)){
           return toast.error("please don't play with html elements ,in order to work properly");
       }
  
      async function LoggingIn(){
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
            else if(data.role === "teamLead"){
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
      LoggingIn();
    }


    return(
      <Box id="loginDiv" sx={{display:'grid',width:'100vw',height:'100vh',gridTemplateColumns:"1fr 1fr",overflowY:"auto"}}>
         <Box sx={{display:'grid',placeItems:"center"}}>
           <p className="paper">
                Make Your Work Easier..
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
              
                 <h1 id="loginHeading" style={{color:"dodgerBlue",marginBottom:"0%"}}>Welcome Back</h1>
                 <span style={{fontSize:"1.2rem"}}>login to access CRM</span>
                 
                 <Box
                    component="form"
                    sx={{
                      '& > :not(style)': {},
                      display:"grid",
                      justifyItems:"stretch",
                      alignContent:"center",
                    }}
                    autoComplete="on"
                    onSubmit={handleSubmit}>

                     {Inputs.map((inputProps, index) =>
                     <Grid item sx={{m:1,p:1}} key={index} > 
                        <InputComponent  inputProps={inputProps}/>
                     </Grid>
                     )}
                    <Box>
                       <Button sx={{m:2,mt:1,ml:3}}
                               size="small"
                               variant="contained" 
                               color="warning" 
                               type="button"
                               onClick={()=>navigate("/forgot-password")}>
                            Forgot Password??
                       </Button>
                     </Box>
                     
                     <Button sx={{backgroundColor:"dodgerblue"}}
                             size="small"
                             variant="contained" 
                             color="primary" 
                             type="submit">
                          Login
                     </Button>
                     {(isLoading)
                       ? <LinearProgress sx={{marginTop:"-1%",backgroundColor:"white"}} />
                       :""}
                   
                     <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                       <p>New User?</p>
                       <Button sx={{ml:"auto"}} 
                               size="small"
                               variant="contained"
                               onClick={()=>navigate("/getting-started")}
                               color="warning">
                         Let's get Started
                      </Button>
                     </Box>
                    
                 </Box>
            </Box>
         </Box>
      </Box>
    )
}

