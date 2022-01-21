import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import { useState,useContext } from "react";
import { font } from "./font";
import { context } from './App';

export function ForgotPassword() {

    const history = useHistory();
    const [otp,setOtp] = useState(false);
    const [passwordChange,setPasswordChange] = useState(false);
    const [mailAndOtpCheck,setMailAndOtpCheck] = useState(true);

    const [mailError,setMailError] = useState(false);
    const [otpError,setOtpError] = useState(false);
    const [newPasswordError,setNewPasswordError] = useState(false);
    const [newPasswordMatchError,setNewPasswordMatchError] = useState(false);

    const [email,setEmail] = useState("");
    const [secretOtp,setSecretOtp] = useState("");
    const [otpTyped,setOtpTyped] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword , setConfirmNewPassword] = useState("");

    const emailVerification=()=>{
       
        if(email === "" || email === undefined || email === null ||
        !(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i).test(email))
          {
            return  setMailError(true);
          }

         const verifyEmail = {email}
         fetch("https://crm-nodejs-rv.herokuapp.com/forgotPassword",
         {method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(verifyEmail)
        })
         .then((response)=>{
             if(response.status===400){
                 setMailError(true);
             }
             async function receive(response){
                  let reply = await response.json();
                  setSecretOtp(reply.otp);
                  setOtp(true);
             }
             receive(response);
            });

    }

    const otpVerifcation=()=>{
      
        if(parseInt(secretOtp)===parseInt(otpTyped)){
             setMailAndOtpCheck(false);
             setPasswordChange(true)
             return;
             }
        return setOtpError(true);
    }

    const passwordUpdation=()=>{

         const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

         if(newPassword === "" ||
            newPassword === null ||
            newPassword === undefined ||
            !strongRegex.test(newPassword)
         ){
           return setNewPasswordError(true);
         }
         if(newPassword !== confirmNewPassword){
           return setNewPasswordMatchError(true);
         }
         

    }
    const style = {
        display: "grid",
        width: "450px",
        height: "300px",
        justifyContent: "stretch",
        alignContent:"space-evenly",
        padding: "5%",
        border: "5px solid dodgerBlue",
        boxShadow: "5px 5px 25px black",
        borderRadius: "3rem",
        transition: "all 0.6s ease-in-out",
        overflow: "hidden",
        fontSize:"1rem"
      };

  return (
    <Box sx={{display:"grid",placeItems:"center",width:"100%",height:"100vh"}}>
       
      <Box sx={style}>
      <h2>Password Reset Section🔑</h2>
      
    {(mailAndOtpCheck)
       
        ? (otp)
          ? <Box sx={{display:"grid"}}>
              <Box>
               Please enter the 6 digit one-time password(OTP) 
               sent to the Mail which is associaed with this account.
               <TextField 
                varient="outlined" 
                margin="normal"
                type="number"
                onChange={(e)=>setOtpTyped(e.target.value)}
                />
              </Box>
               <Box sx={{display:"flex"}}>
               <Button sx={font} onClick={()=>{otpVerifcation();
               }}>
                Verify Email
                </Button>
               
               <Button sx={{...font,marginLeft:"auto"}} color="error" onClick={()=>{setOtp(false);setPasswordChange(false)}}
                >
                Cancel
                </Button>

               </Box>
               {(otpError)
                      ? <Alert severity='error' sx={font}
                      action={
                        <Button color="error" size="small" onClick={() => setOtpError(false)}>
                          ❌
                        </Button>
                      }>
                      OTP Entered is not correct
                    </Alert>
                      :""}
               <br/>
            </Box>
             
          : <Box>
                 Enter the Email registered with your account
                 <TextField sx={{width:"100%"}}
                 variant="outlined" 
                 label=" email "
                 type="email" 
                 margin="normal"
                 defaultValue={email}
                 onClick={()=>setMailError(false)}
                 onChange={(e)=>setEmail(e.target.value)}
                 placeholder='please enter the email your existing account'/>
                 <Box>
                   <Button sx={font} onClick={()=>emailVerification()}>
                    Verify Account
                   </Button>
                 </Box>
                 {(mailError)
                      ? <Alert severity='error' sx={font}
                      action={
                        <Button color="error" size="small" onClick={() => setMailError(false)}>
                          ❌
                        </Button>
                      }>
                      Enter a valid email to Check
                    </Alert>
                      :""}
                     <Box>
                        Knew the old password already?
                        <Button sx={font} onClick={()=>history.push("/login")}>Login</Button>
                     </Box>
            </Box>
        :""  }
           <br/>
        {(passwordChange)
          ? <Box sx={{display:"grid"}}>
              <TextField 
              varient="outlined"
              label="Enter new Password"
              type="password"
              placeholder='Please enter a password minimum 6 characters'
              onClick={()=>setNewPasswordError(false)}
              onChange={(e)=>setNewPassword(e.target.value)}
              helperText="password must contain atleast One from the following:- (1CAPITAL,1small,1Number,1special Characters)"/>
                
        {(newPasswordError)
             ?<Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setNewPasswordError(false)}>
                      ❌
                    </Button>
                  }>
                   password should be in required format with minimum 6 characters
               </Alert>
             </Box>
             :""}
              <br/>
             <TextField 
              varient="outlined"
              label="Confirm new Password"
              type="password"
              placeholder='Please confirm password'
              onClick={()=>setNewPasswordMatchError(false)}
              onChange={(e)=>setConfirmNewPassword(e.target.value)}
              />
        {(newPasswordMatchError)
             ?<Box>
               <Alert severity='error' sx={font}
                  action={
                    <Button color="error" size="small" onClick={()=>setNewPasswordMatchError(false)}>
                      ❌
                    </Button>
                  }>
                   passwords didnt match
               </Alert>
              </Box>
             :""}
              <Box sx={{display:"flex"}}>
              <Button sx={font} onClick={()=>passwordUpdation()}>Update password</Button>
              <Button sx={{...font,marginLeft:"auto"}} color="error" onClick={()=>{setMailAndOtpCheck(true);setOtp(false);setPasswordChange(false)}}>cancel</Button>
              </Box>
              <br/>
              you will redirected to login page to login again.
            </Box>
          : ""
        }
      </Box>
    </Box>
  );
}
