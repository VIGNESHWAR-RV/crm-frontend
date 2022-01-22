import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import {font} from "../font";

export function SignUp() {

  const history = useHistory();


  const [firstName,setFirstName] = useState("");
  const [lastName ,setLastName] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const [otpFromServer,setOtpFromServer] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [noFirstName , setNoFirstName] = useState(false);
  const [noLastName , setNoLastName] = useState(false);
  const [noName,setNoName] = useState(false);
  const [noEmail,setNoEmail] = useState(false);
  const [userNameAvail , setUserNameAvail] = useState(false);
  const [userNameNotAvail , setUserNameNotAvail] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false);
  const [passwordMismatch , setPasswordMismatch] = useState(false);

  const [validEmail , setValidEmail] = useState(false);
  const [otpError,setOtpError] = useState(false);
 


  const userNameCheck=()=>{
    const check = 1;
    const nameCheck = {name,check};
    fetch("http://localhost:9000/Sign-Up",
    {method:"POST",body:JSON.stringify(nameCheck),
      headers:{"Content-Type":"application/json"}})
    .then((response)=>{
      if(response.status===400){
       
        setUserNameAvail(false);
        return setUserNameNotAvail(true);
        }
      else if(response.status===200){
  
        setUserNameNotAvail(false);
        return setUserNameAvail(true);
      
        }
    });
  }

  const emailValidator=()=>{
   //setValidEmail
   //event.target.disabled
    const emailID = {email};
    fetch("http://localhost:9000/Sign-Up",
    {method:"POST",body:JSON.stringify(emailID),
      headers:{"Content-Type":"application/json"}})

  }
  const otpValidator=()=>{

  }

  const signup=() => {
   
    if(firstName==="" || firstName === undefined){
      return  setNoFirstName(true);
    }
    if(lastName==="" || lastName === undefined){
      return setNoLastName(true);
    }
    if(name==="" || name === undefined){
      return setNoName(true);
    }
    if(email==="" || email === undefined || !(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i).test(email)){
      return setNoEmail(true);
    }
    if( +otp !== +otpFromServer){
      return setOtpError(true);
    }
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");
    if(password==="" || password === undefined ||  !strongRegex.test(password)){
      return setPasswordFailed(true);
    }
    const userSignUp = {firstName,lastName,name,email,password,role:"user"};
    if(confirmPassword!==password){
      return setPasswordMismatch(true);
    }
   
 
   fetch("https://crm-nodejs-rv.herokuapp.com/Sign-Up",
       {method:"POST",body:JSON.stringify(userSignUp),
         headers:{"Content-Type":"application/json"}})
   .then(response=>{
         if(response.status===400){
           return setUserNameNotAvail(true);
           }

         else if(response.status===200){
            history.push("/login");
         }
         
    });
  }
  
  const style = {
    display: "grid",
    width: "minContent",
    height: "minContent",
    justifyContent: "stretch",
    alignContent:"center",
    padding: "3%",
    margin:"3%",
    border: "5px solid dodgerBlue",
    boxShadow: "10px 10px 25px black",
    borderRadius: "3rem",
    ...font
  };

  return (
    <Box sx={{ width: "100%", height: "maxContent", display: "grid", placeItems: "center" }}>
      <Box sx={style}>
        <h1>Hii,New user😀</h1>

         {/* first name */}
        <TextField label="First Name*" variant="standard" margin="normal" placeholder='Enter your first-name'
         onChange={(e)=>setFirstName(e.target.value)} 
         onClick={()=>setNoFirstName(false)}/>

        {(noFirstName)
            ?<AlertComponent message={"please Enter first name"}
                            status={"error"}/>
            :""}

         {/* last name  */}
        <TextField label="Last Name*" variant="standard" margin="normal" placeholder='Enter your last-name' 
         onChange={(e)=>setLastName(e.target.value)}
         onClick={()=>setNoLastName(false)}/>
        {(noLastName)
            ?<AlertComponent message={"please Enter last name"}
                              status={"error"}/>
            :""}

          {/* user name validation */}

        <TextField label="user Name*" 
                   variant="standard" 
                   margin="normal" 
                   placeholder='Enter your desired user-name'
                   onClick={()=>{setUserNameAvail(false);setUserNameNotAvail(false);setNoName(false)}}
                   onChange={(e)=>{setName(e.target.value)}}
                   onKeyDown={(e)=>{if(e.key==="Enter"){userNameCheck()}}} />
        <Box>
          <Button onClick={()=>userNameCheck()}>Validate User name</Button>
          {(noName)
            ? <AlertComponent message={"please Enter valid user name"}
                              status={"error"}/>
            :""}
          {(userNameAvail)
              ?<AlertComponent message={"User name Availabe!!!"}
                               status={"success"}/>
              :""}
          {(userNameNotAvail)
              ?<AlertComponent message={"User name not Available!.. Try another name"}
                               status={"error"} />
              :""}
        </Box>

            {/* Mail validation */}

        <TextField label="Email*" variant="standard" margin="normal" type="email" placeholder='Enter your valid email'
            onChange={(e)=>setEmail(e.target.value)}
            onClick={()=>setNoEmail(false)}/>   
       {(noEmail)
            ? <AlertComponent message={"please Enter a valid email"}
                              status={"error"}/>
            :""}
        <Box>
        <Button onClick={()=>emailValidator()}>Verify Email</Button>
        </Box>

            {/* Otp Validation */}
     {(validEmail)      
        ?<Box>
            <TextField label="OTP" variant="outlined" margin="normal" type="number" placeholder='Enter your otp'
             onClick={()=>setOtpError(false)}
             onChange={(e)=>setOtp(e.target.value)}/>

             <Button onClick={()=>otpValidator()}
             >Verify OTP</Button>
          {(otpError)
             ? <Alert severity='error' sx={font}>
                  Incorrect OTP
               </Alert>
             : ""}
         </Box>
      
        :""}

               {/* password enter section */}
        <TextField label="Password" type="password" margin="normal" variant="standard" placeholder='Enter your password'
         onChange={(e)=>setPassword(e.target.value)} onClick={()=>setPasswordFailed(false)}
         helperText="password must contain atleast One from the following:- (1CAPITAL,1small,1Number,1special Characters)"/>

        {(passwordFailed)
             ? <AlertComponent message={"password should be minimum 6 characters"}
                               status={"error"} />
             :""}


                {/* Confirm password section */}
        <TextField label="Confirm Password" type="password" margin="normal" variant="standard" placeholder='Enter your password to confirm' 
         onChange={(e)=>setConfirmPassword(e.target.value)} onClick={()=>setPasswordMismatch(false)}/>

         {(passwordMismatch)
             ? <AlertComponent message={"passwords are not matched"}
                               status={"error"} />
             :""}
        <br/>
        <Box sx={{display:"flex"}}>
           <Button sx={font} variant="contained"
             onClick={()=>signup()}>Sign up</Button>
           <Button sx={{...font,marginLeft:"auto"}} variant="contained" color="error"
             onClick={()=>{}}>Reset</Button>
        </Box>
        <p>
          Already Have An Account?<br/>
          <Button variant='text' sx={font} onClick={() => history.push("/login")}>
            Login
          </Button>
        </p>
      </Box>
    </Box>
  );
}

function AlertComponent(message,status){


return(
<Alert severity={status} sx={font}>
      {message}
</Alert>

)

}