import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import {font} from "../font";

export function Login() {

  const history = useHistory();

  const [email,setEmail] = useState(false);
  const [otp,setOtp] = useState(false);
  const [resend,setResend] = useState(false);
  const [passWord,setPassWord] = useState(false);
  const [successAlert , setS_Alert] = useState(false);
  const [failedAlert , setF_Alert] = useState(false);

  const style = {
    display: "grid",
    width: "450px",
    height:  (passWord) ? "700px" :(otp) ? "700px" :(email) ?"620px": "450px",
    justifyContent:"stretch",
    padding: "5%",
    border: "5px solid dodgerBlue",
    boxShadow: "5px 5px 25px black",
    borderRadius: "3rem",
    transition: "all 0.2s ease-in-out",
    overflow:"hidden"
  };
   const [name,setName] = useState("");
   const [password,setPassword] = useState(""); 

   const login=() => {
   const userLogin = {name,password};
   fetch("https://crm-nodejs-rv.herokuapp.com/",
   {method:"POST",body:JSON.stringify(userLogin),
   headers:{"Content-Type":"application/json"}
})
   .then((response)=>response.status===200)
   .then(()=> history.push("/dashboard"));
}

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "grid", placeItems: "center" }}>
      <Box sx={{...font,...style}}>
         

         <h1>Welcome User😀</h1>

         <TextField 
            className="TextField"
            label="User Name" 
            sx={{...font}} 
            margin="normal" 
            variant="standard" 
            placeholder='Enter your user-name'
            onChange={(e)=>{setName(e.target.value)}} />
         <TextField 
            className="TextField"
            label="Password" 
            sx={{...font}} 
            margin="normal" 
            type="password" 
            variant="standard" 
            placeholder='Enter your password'
            onChange={(e)=>setPassword(e.target.value)} />

          {(email)
            ?""
            :(passWord)
               ?""
               :<Box sx={{display:"grid",justifyContent:"start"}}>
                   <Button 
                      sx={font}
                      color='error'
                      onClick={()=>{setEmail(!email);setS_Alert(false);setF_Alert(false)}}>
                      Forgot Password?
                   </Button>
               </Box>}

         <Button sx={{...font}} variant="contained" onClick={()=>login()}>Login</Button>

         <Box>
            <p>
              New user?
              <Button variant='text' 
                sx={{...font}} 
                onClick={()=>history.push("/Sign-Up")}>
                 Sign up
              </Button>
            </p>
          </Box>


         {(email) 
              ?<Box sx={{display:"grid",justifyContent:"stretch",alignContent:"center",height:"200px"}}>
                <hr style={{background:"black",width:"100%",padding:"1px"}}/>
                <h4 style={{color:"red",fontSize:"1.5rem",textAlign:"center"}}>
                  FORGOT PASSWORD
                   </h4>
                   <h4 style={{color:"red",fontSize:"1.5rem",textAlign:"center",marginTop:"-35px"}}>(User Verification)</h4>
                <TextField label="Verify Email" 
                           className="TextField"
                           variant="standard" 
                           type="email" 
                           placeholder='Enter your email for verficiation'
                           margin='normal' />
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                   {(resend)
                      ?<Button variant="contained"
                         sx={font}
                         onClick={()=>{}}>
                         Resend OTP number
                       </Button>
                      :<Button variant="contained"
                           sx={font}
                           onClick={()=>{setOtp(!otp);setResend(!resend)}}>
                           Send OTP number
                       </Button>}
                   {(otp)?""
                         :<Button variant="contained"
                           color="error"
                           sx={font}
                           onClick={()=>setEmail(!email)}>
                           Cancel
                          </Button>}
                </Box>
               </Box>
              : ""}


           {(otp) 
              ?<Box sx={{display:"grid",justifyContent:"stretch",alignContent:"center",height:"150px"}}>
                <TextField label="Verify OTP" 
                           className="TextField"
                           variant="standard" 
                           type="number" 
                           placeholder='Enter the OTP sent to your mail'
                           margin='normal' />
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <Button variant="contained"
                           sx={font}
                           onClick={()=>{setEmail(!email);setOtp(!otp);setPassWord(!passWord);setResend(!resend)}}
                           >
                           Continue To reset Password
                   </Button>
                   <Button variant="contained"
                           sx={font}
                           color="error"
                           onClick={()=>{setEmail(!email);setOtp(!otp);setResend(!resend);setF_Alert(!successAlert)}}>
                           Cancel
                   </Button>
                </Box>
               </Box>
              : ""}


            {(passWord) 
              ?<Box sx={{display:"grid",justifyContent:"stretch",alignContent:"center",height:"300px"}}>
                      <hr style={{background:"black",width:"100%",padding:"1px"}}/>
                      <h4 style={{color:"red",fontSize:"1.5rem",textAlign:"center"}}>
                         Set new Password
                      </h4>
                <TextField label="Enter New Password"
                           className="TextField" 
                           variant="standard" 
                           type="password" 
                           placeholder='Enter your new password'
                           margin='normal' />
                 <TextField label="Confirm New Password"
                           className="TextField" 
                           variant="standard" 
                           type="password" 
                           placeholder='Enter your password for verficiation'
                           margin='normal' />        
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <Button variant="contained"
                           sx={font}
                           onClick={()=>{setPassWord(!passWord);setS_Alert(!successAlert)}}
                           >
                           Reset Password
                   </Button>
                   <Button variant="contained"
                           sx={font}
                           color="error"
                           onClick={()=>{setPassWord(!passWord);setF_Alert(!successAlert)}}>
                           Cancel
                   </Button>
                </Box>
               </Box>
              : ""}  


           {(successAlert)
              ?<Alert severity='success' sx={font}
                action={
                  <Button color="success" size="small" onClick={()=>setS_Alert(!successAlert)}>
                    ❎
                  </Button>
                }>
                Your account password is successfully reset.
                Please login to access your account.
              </Alert>
              :""}

              
            {(failedAlert)
               ?<Alert severity='error' sx={font}
               action={
                 <Button color="error" size="small" onClick={()=>setF_Alert(!failedAlert)}>
                   ❌
                 </Button>
               }>
                Password reset is failed.
                Please try again after some-time.
             </Alert>
             :""}
      </Box>
    </Box>
  );
}
