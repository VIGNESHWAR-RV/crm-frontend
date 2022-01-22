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

  const style = {
    display: "grid",
    width: "450px",
    height: "700px",
    justifyContent: "stretch",
    alignContent:"center",
    padding: "5%",
    border: "5px solid dodgerBlue",
    boxShadow: "10px 10px 25px black",
    borderRadius: "3rem",
    ...font
  };
  const [firstName,setFirstName] = useState("");
  const [lastName ,setLastName] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
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

  // const emailValidator=()=>{

  //   const emailID = {email};
  //   fetch("http://localhost:9000/Sign-Up",
  //   {method:"POST",body:JSON.stringify(emailID),
  //     headers:{"Content-Type":"application/json"}})
  // }
  // const otpValidator=()=>{

  // }

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
   
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "grid", placeItems: "center" }}>
      <Box sx={style}>
        <h1>Hii,New user😀</h1>
        <TextField label="First Name*" variant="standard" margin="normal" placeholder='Enter your first-name'
         onChange={(e)=>setFirstName(e.target.value)} 
         onClick={()=>setNoFirstName(false)}/>
        {(noFirstName)
            ? <Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setNoFirstName(false)}>
                      ❌
                    </Button>
                  }>
                    Please enter First Name
               </Alert>
             </Box>
            :""}

        <TextField label="Last Name*" variant="standard" margin="normal" placeholder='Enter your last-name' 
         onChange={(e)=>setLastName(e.target.value)}
         onClick={()=>setNoLastName(false)}/>
        {(noLastName)
            ? <Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setNoLastName(false)}>
                      ❌
                    </Button>
                  }>
                   please enter Last name
               </Alert>
             </Box>
            :""}
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
            ? <Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setNoName(false)}>
                      ❌
                    </Button>
                  }>
                   please enter valid User name
               </Alert>
             </Box>
            :""}
          {(userNameAvail)
              ?<Alert severity='success' sx={font}
                 action={
                   <Button color="success" size="small" onClick={()=>setUserNameAvail(!userNameAvail)}>
                     ❎
                   </Button>
                 }>
                 User Name Available!!!
                </Alert>
              :""}
          {(userNameNotAvail)
              ?<Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setUserNameNotAvail(!userNameNotAvail)}>
                      ❌
                    </Button>
                  }>
                   User Name not available..try any other name
               </Alert>
              :""}
        </Box>
        <TextField label="Email*" variant="standard" margin="normal" type="email" placeholder='Enter your valid email'
        onChange={(e)=>setEmail(e.target.value)}
        onClick={()=>setNoEmail(false)}/>
          {(noEmail)
            ? <Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setNoEmail(false)}>
                      ❌
                    </Button>
                  }>
                   Please enter a valid email
               </Alert>
             </Box>
            :""}
        {/* <Box>
          <Button onClick={()=>emailValidator()}>Verify Email</Button>
          <Box>
            <TextField label="OTP" variant="outlined" margin="normal" type="number" placeholder='Enter your otp'
             onChange={()=>otpValidator()}/>
          </Box>
        </Box> */}
        <TextField label="Password" type="password" margin="normal" variant="standard" placeholder='Enter your password'
         onChange={(e)=>setPassword(e.target.value)} onClick={()=>setPasswordFailed(false)}
         helperText="password must contain atleast One from the following:- (1CAPITAL,1small,1Number,1special Characters)"/>
        {(passwordFailed)
             ?<Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setPasswordFailed(!passwordFailed)}>
                      ❌
                    </Button>
                  }>
                   password should be minimum 6 characters
               </Alert>
             </Box>
             :""}
        <TextField label="Confirm Password" type="password" margin="normal" variant="standard" placeholder='Enter your password to confirm' 
         onChange={(e)=>setConfirmPassword(e.target.value)} onClick={()=>setPasswordMismatch(false)}/>
         {(passwordMismatch)
             ?<Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setPasswordMismatch(false)}>
                      ❌
                    </Button>
                  }>
                   passwords are not matched
               </Alert>
             </Box>
             :""}
        <Button sx={font} variant="contained"
          onClick={()=>signup()}>Sign up</Button>
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
