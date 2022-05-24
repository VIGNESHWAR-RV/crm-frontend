import "./forgotPasswordPage.css";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import GoogleIcon from '@mui/icons-material/Google';
import MailIcon from '@mui/icons-material/Mail';
import {InputComponent} from "../../BasicComponents/InputComponent";
import {loggedInCheckService} from "../LoginPage/loginServices";
import {forgotPasswordService} from "./forgotPasswordServices";

export function ForgotPasswordPage(){

    const navigate = useNavigate();

    const [passwordForgotUser,setPasswordForgotUser] = useState({role:"",userName:"",email:""});
    const [isDisabled,setIsDisabled] = useState(true);
    const [isLoading,setIsLoading] = useState(true)
    const [isSentMail,setIsSentMail] = useState(false);

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
        if(e.target.name === "role"){
            setPasswordForgotUser({...passwordForgotUser,role:e.target.value});
           }
        if(e.target.name === "userName"){
            setPasswordForgotUser({...passwordForgotUser,userName:e.target.value});
           }
        if(e.target.name === "email"){
          setPasswordForgotUser({...passwordForgotUser,email:e.target.value});
           }
    }

    const regex = { email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                    userName:"^[a-zA-Z0-9@#]{4,16}$",
                    role:"^[a-zA-Z0-9@#]{4,16}$",};

    // color , variant , sx = optional
    // pattern , required  = in case of need for validations
    const Inputs = [
                  //   {name:"role",
                  //   label:"Role",
                  //   type:"select",
                  //   pattern:regex.role,
                  //   required:true,
                  //   options:[{name:"Role",value:"",disabled:true,sx:{}},
                  //            {name:"Employee",value:"employee"},
                  //            {name:"Manager",value:"manager"},
                  //            {name:"Admin",value:"admin"}
                  //           ],
                  //   value:passwordForgotUser.role,
                  //   placeholder:"Select the role of your account",
                  //  //  helperText:"Must be unique with atleast 3 letters",
                  //   typing:handleChange,
                  //   disabled:isDisabled,
                  //  //  autoComplete:"username",
                  //   variant:"outlined",
                  //   color:"primary",
                  //   sx:{fontSize:"1rem"} },

                  //  {name:"userName",
                  //   label:"User Name *",
                  //   type:"text",
                  //   pattern:regex.userName,
                  //   required:true,
                  //   defaultValue:passwordForgotUser.userName,
                  //   placeholder:"Type Here",
                  //   helperText:["Must be unique with atleast 4 letters"],
                  //   typing:handleChange,
                  //   disabled:isDisabled,
                  //   autoComplete:"username",
                  //   variant:"outlined",
                  //   color:"info",
                  //   sx:{fontSize:"1rem",color:"dodgerblue"} },
                    
                   {name:"email",
                    label:"Email *",
                    type:"text",
                    pattern:regex.email,
                    required:true,
                    defaultValue:passwordForgotUser.email,
                    placeholder:"Type Here",
                    helperText:["Enter a email associated with your account"],
                    typing:handleChange,
                    disabled:isDisabled,
                    autoComplete:"email",
                    variant:"outlined",
                    color:"info",
                    sx:{fontSize:"1rem",color:"dodgerblue"} },
                    ];

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!new RegExp(regex.email).test(passwordForgotUser.email) ||
           !new RegExp(regex.role).test(passwordForgotUser.role) ||
           !new RegExp(regex.userName).test(passwordForgotUser.userName)
          ){
           return toast.error("please don't play with html elements ,unless things won't work properly"); 
          }
       
        async function seekingSolutionForForgotPassword(){

            setIsLoading(true);
            setIsDisabled(true);
            const {email,role,userName} = passwordForgotUser;

            const response = await forgotPasswordService({email,role,userName});
            const data = await response.json();

            if(response.status === 200){
                toast.success(`Reset Link successfully sent to your Mail ${data.email}`);
                setIsSentMail(true);
                return;
            }
            else if(response.status >= 400 && response.status < 500){
                toast.error(`No account associated with userName( ${data.userName} ) & email( ${data.email} )`)
                setIsLoading(false);
                setIsDisabled(false);
                return;
            }
            else{
                toast.error("error occured while trying to reset password, try again later");
                setIsLoading(false);
                setIsDisabled(false);
                return;
            }
        }
        seekingSolutionForForgotPassword();

    }

    return(
        <Box id="forgotPasswordDiv" sx={{display:'grid',width:'100vw',height:'100vh',gridTemplateColumns:"1fr 1fr",overflowY:"auto"}}>
           <Box sx={{display:'grid',placeItems:"center"}}>
             <p className="paper">
                  have No Fear, When RV's Team is Here
             </p>
            
           </Box>
           <Box sx={{display: 'grid',
                     width:"100%",
                     height:"100%",
                     justifyItems:"center",
                     alignItems:"center",}}>
                {(isSentMail)
                    ?
                      <Box sx={{width:"fit-content",
                             maxWidth:"30rem",
                             height:"auto",
                             textAlign:"center",
                             margin:"1%",
                             padding:"4%",
                             overflow:"hidden",
                             fontSize:"2rem",
                             textTransform:"capitalize",
                             border:"2px solid dodgerBlue",
                             boxShadow:"inset 0px 0px 0rem 100rem rgba(30, 144, 255, 0.166)",
                             borderRadius:"2rem"}}>

                      <h1 style={{color:"dodgerblue",fontSize:"larger"}}>
                          Successfully sent Email
                      </h1>
                      <p>
                        please check your inbox and spam box for email link to reset your CRM accout password
                      </p>
                      {/* <h5 style={{color:"dodgerblue"}}>Links to Mail Inbox</h5> */}

                        <Button style={{borderRadius:"1.5rem",color:"white"}}>
                           <a style={{color:"dodgerblue",margin:"1%",textDecoration:"none",fontSize:"1.2rem"}} href="https://www.outlook.com/inbox" target="_blank" rel="noreferrer">    
                               <MailIcon sx={{color:"dodgerblue",fontSize:"2.5rem",m:1}}/>Outlook
                           </a>
                         </Button>

                         <Button style={{borderRadius:"1.5rem",color:"white"}}>
                           <a style={{color:"dodgerblue",margin:"1%",textDecoration:"none",fontSize:"1.2rem"}} href="https://www.gmail.com/inbox" target="_blank" rel="noreferrer">    
                               <GoogleIcon sx={{color:"dodgerblue",fontSize:"2.5rem",m:1}}/>Gmail
                           </a>
                         </Button>

                         <Button style={{borderRadius:"1.5rem",color:"white"}}>
                           <a style={{color:"dodgerblue",margin:"1%",textDecoration:"none",fontSize:"1.2rem"}} href="https://mail.yahoo.com/inbox" target="_blank" rel="noreferrer">    
                               <MailIcon sx={{color:"dodgerblue",fontSize:"2.5rem",m:1}}/>Yahoo
                           </a>
                         </Button>
                      </Box>
                    :
                      <Box sx={{
                          width:"fit-content",
                          maxWidth:"30rem",
                          margin:"1%",
                          padding:"1% 4%",
                          fontSize:"1.75rem",
                          overflow:"hidden",
                          textTransform:"capitalize",
                          border:"2px solid dodgerBlue",
                          boxShadow:"inset 0px 0px 0rem 100rem rgba(30, 144, 255, 0.066)",
                          borderRadius:"2rem"}}>

                <h1 id="forgotPasswordHeading" style={{color:"dodgerBlue",marginBottom:"0%"}}>
                    Forgot Password??
                </h1>
                <span style={{fontSize:"1.2rem"}}>Well, You are not alone!!!</span>
                

               
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
       
                    <br/>
                    
                    <Button sx={{backgroundColor:"dodgerblue"}}
                           size="small"
                            variant="contained" 
                            color="primary" 
                            type="submit">
                         Send Reset Link
                    </Button>
                    {(isLoading)
                      ? <LinearProgress sx={{marginTop:"-1%",backgroundColor:"white"}} />
                      :""}
                  
                    <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                      <p>got the Old Password?</p>
                      <Button sx={{ml:"auto"}} 
                              size="small"
                              variant="contained"
                              onClick={()=>navigate("/login")}
                              color="warning">
                        Login
                     </Button>
                    </Box>
                   
                </Box>
        
                      </Box>
                     }
           </Box>
        </Box>
    )
}


