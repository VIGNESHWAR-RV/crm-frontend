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
  const [validateName,setValidateName] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false);
  const [passwordMismatch , setPasswordMismatch] = useState(false);

  const [validEmail , setValidEmail] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [nonValidEmail , setNonValidEmail] = useState(false);
  const [couldNotValidEmail , setCouldNotValidEmail] = useState(false);
  const [validateOtp,setValidateOtp] = useState(false);
  const [otpError,setOtpError] = useState(false);
  const [otpSuccess,setOtpSuccess] = useState(false);


  const userNameCheck=()=>{
    const verifyName = name;
    const nameCheck = {verifyName};
    fetch("https://crm-nodejs-rv.herokuapp.com/Sign-Up",
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
    const verifyEmail = email;
    const emailID = {verifyEmail};
    fetch("https://crm-nodejs-rv.herokuapp.com/Sign-Up",
    {method:"POST",body:JSON.stringify(emailID),
      headers:{"Content-Type":"application/json"}})
    .then((response)=>{
      
         if(response.status === 400){

             async function check(){
               let reply = await response.json()
               console.log(reply);
               if(reply.message === "email already exists"){
                  return setNonValidEmail(true);
                }
                return setCouldNotValidEmail(true);
             }

             return check(response);
         }

         async function getOtp(response){
          let reply = await response.json();
          setOtpFromServer(reply.otp);
          return setValidEmail(true);
      }
       
      getOtp(response);
    })

  }
  const otpValidator=()=>{
    if( +otp === +otpFromServer){
      return setOtpSuccess(true);
    }
    return setOtpError(true);
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
    if(!userNameAvail){
       return setValidateName(true);
    }
    if(email==="" || email === undefined || !(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i).test(email)){
      return setNoEmail(true);
    }
    if(!validEmail){
       return setValidateEmail(true);
    }
    if(!otpSuccess || +otp !== +otpFromServer){
      return setValidateOtp(true);
   }
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");
    if(password==="" || password === undefined ||  !strongRegex.test(password)){
      return setPasswordFailed(true);
    }
    if(confirmPassword!==password){
      return setPasswordMismatch(true);
    }
   
    const userSignUp = {firstName,lastName,name,email,password,role:"user"};
    
   fetch("https://crm-nodejs-rv.herokuapp.com/Sign-Up",
       {method:"POST",body:JSON.stringify(userSignUp),
         headers:{"Content-Type":"application/json"}})
   .then(response=>{
         if(response.status === 400){
          setUserNameNotAvail(true)
           return console.log(response.json());
           }

         else if(response.status === 200){
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
                   onClick={()=>{setUserNameNotAvail(false);setNoName(false)}}
                   onChange={(e)=>{setName(e.target.value);setUserNameAvail(false)}}
                   onKeyDown={(e)=>{if(e.key==="Enter"){userNameCheck()}}} />
        <Box>
          <Button onClick={()=>{userNameCheck();setValidateName(false)}}>Validate User name</Button>

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
          {(validateName)
               ?<AlertComponent message={"please validate the user name"}
                          status={"error"} />
               :""}
        </Box>

            {/* Mail validation */}

        <TextField label="Email*" variant="standard" margin="normal" type="email" placeholder='Enter your valid email'
            onChange={(e)=>{setEmail(e.target.value);
                            setOtpSuccess(false);
                            setValidEmail(false);
                            setNonValidEmail(false)}}
            onClick={()=>setNoEmail(false)}/>   
       {(noEmail)
            ? <AlertComponent message={"please Enter a valid email"} status={"error"}/>
            :""}
       {(nonValidEmail)
          ? <AlertComponent message={"Email is already associated with an account"} status={"error"} />
          :""}
       {(couldNotValidEmail)
          ? <AlertComponent message={"couldn't verify email.Please try with any other email"} status={"error"} />
          :""}
       
        <Box>
          <Button onClick={()=>{emailValidator();setValidateEmail(false)}}>Verify Email</Button>
        </Box>

     
         {(validateEmail)
            ? <AlertComponent message={"please verify the email"} status={"error"} />
            :""}
            {/* Otp Validation */}
     {(validEmail)      
        ?<Box sx={{fontSize:"1rem",color:"gold"}}>
          Please Enter the One-Time-Password (OTP)<br/> that has been sent to your email..
          <Box sx={{display:"flex"}}>
            <TextField label="OTP" variant="outlined" margin="normal" type="number" placeholder='Enter your otp'
             onClick={()=>setOtpError(false)}
             onChange={(e)=>{setOtp(e.target.value);setOtpSuccess(false)}}/>

             <Button onClick={()=>{otpValidator();setValidateOtp(false)}}
             >Verify OTP</Button>
          </Box>
          {(otpError)
             ? <AlertComponent message={"Invalid OTP"} status={"error"}/>
             : ""}
          {(otpSuccess)
             ? <AlertComponent message={"mail verified"} status={"success"}/>
             :""}
          {(validateOtp)
               ? <AlertComponent message={"please verify OTP"} status={"error"}/>
               :""}
         </Box>
      
        :""}
      
    
               {/* password enter section */}
        <TextField label="Password" type="password" margin="normal" variant="standard" placeholder='Enter your password'
         onChange={(e)=>setPassword(e.target.value)} onClick={()=>setPasswordFailed(false)}
         helperText="password must contain atleast 
         (1 CAPITAL LETTER, 1 small letter, 1 Number, 1 special Character)"/>

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

function AlertComponent({message,status}){

return(
     <Alert severity={status} sx={font}>
           {message}
     </Alert>
)};