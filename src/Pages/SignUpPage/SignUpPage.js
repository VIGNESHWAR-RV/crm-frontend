import "./SignUp.css";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import {InputComponent} from "../../BasicComponents/InputComponent";
import { loggedInCheckService } from "../LoginPage/loginServices";
import { signupService } from "./signupServices";

export function SignUpPage(){

    const navigate = useNavigate();

    const [newUser,setNewUser] = useState({firstName:"",
                                           lastName:"",
                                           email:"",
                                           role:"",
                                           company:"",
                                           userName:"",
                                           password:"",
                                           confirm_password:"",
                                           terms_and_conditions:false});

    const [isDisabled,setIsDisabled] = useState(true);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
     
      const employee_auth = sessionStorage.getItem('employee_auth');
      const manager_auth = sessionStorage.getItem('manager_auth');
      const admin_auth = sessionStorage.getItem('admin_auth');

      async function loggedInCheck(authorization){
          const response = await loggedInCheckService(authorization);
          const data = await response.json();
          if(response.status === 200){
              toast.success(`you are already logged In as ${data.name} ( ${data.role} )`);
              if(data.role === "admin"){
                navigate("/admin/dashboard/");
              }
              else if(data.role === "manager"){
                navigate("/manager/dashboard/");
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
        }else if(manager_auth){
             loggedInCheck({manager_auth});
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

      if(e.target.name === "firstName"){
        setNewUser({...newUser,firstName: e.target.value});
       }
       if(e.target.name === "lastName"){
        setNewUser({...newUser,lastName:e.target.value});
       }
       if(e.target.name === "email"){
        setNewUser({...newUser,email:e.target.value});
       }
       if(e.target.name === "company"){
        setNewUser({...newUser,company:e.target.value});
       }
      //  if(e.target.name === "role"){
      //   setNewUser({...newUser,role:e.target.value});
      //  }
      //  if(e.target.name === "userName"){
      //   setNewUser({...newUser,userName:e.target.value});
      //  }
       if(e.target.name === "password"){
        setNewUser({...newUser,password:e.target.value});
       }
       if(e.target.name === "confirm_password"){
        setNewUser({...newUser,confirm_password:e.target.value});
       }
       if(e.target.name === "terms_and_conditions"){
        setNewUser({...newUser,terms_and_conditions:e.target.checked});
       }
    }

    const regex = {name:"^[a-zA-Z0-9 ]{2,}$",
                   password:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$",
                   userName:"^[a-zA-Z0-9@#]{4,16}$",
                   company:`^[a-zA-Z0-9.'",@ ()-_]{1,}$`,
                   email:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                  };

    // color , variant , sx = optional
    // pattern , required  = in case of need for validations
    const Inputs1 = [
                     {name:"firstName",
                     label:"First Name *",
                     type:"text",
                     pattern:regex.name,
                     required:true,
                     value:newUser.firstName,
                     placeholder:"Type Here",
                     helperText:["should be atleast 2 letters"],
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"username",
                     variant:"outlined",
                     color:"info",
                     sx:{fontSize:"normal",color:"dodgerblue"} },

                    {name:"lastName",
                     label:"Last Name *",
                     type:"text",
                     pattern:regex.name,
                     required:true,
                     value:newUser.lastName,
                     placeholder:"Type Here",
                     helperText:["should be atleast 2 letters"],
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"username",
                     variant:"outlined",
                     color:"info",
                     sx:{fontSize:"normal",color:"dodgerblue"} },

                     {name:"email",
                     label:"Email *",
                     type:"text",
                     pattern:regex.email,
                     required:true,
                     value:newUser.email,
                     placeholder:"Type Here",
                     helperText:["your valid email address"],
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"email",
                     variant:"outlined",
                     color:"info",
                     sx:{fontSize:"normal",color:"dodgerblue"} },


                    //  {name:"role",
                    //  label:"Role *",
                    //  type:"select",
                    //  pattern:regex.name,
                    //  required:true,
                    //  options:[{name:"Role",value:"",disabled:true,sx:{}},
                    //           {name:"Employee",value:"employee"},
                    //           {name:"Manager",value:"manager"},
                    //          ],
                    //  value:newUser.role,
                    //  placeholder:"Select the role of your profile",
                    //  typing:handleChange,
                    //  disabled:isDisabled,
                    //  helperText:["Select your role*"],
                    //  autoComplete:"username",
                    //  variant:"outlined",
                    //  color:"info",
                    //  sx:{fontSize:"normal",color:"dodgerblue"} },

                    ];

    const Inputs2 = [
                    //  {name:"userName",
                    //  label:"User Name *",
                    //  type:"text",
                    //  pattern:regex.userName,
                    //  required:true,
                    //  defaultValue:newUser.userName,
                    //  placeholder:"Type Here",
                    //  helperText:["Must be unique with atleast 4 letters"],
                    //  typing:handleChange,
                    //  disabled:isDisabled,
                    //  autoComplete:"username",
                    //  variant:"outlined",
                    //  color:"info",
                    //  sx:{fontSize:"normal",color:"dodgerblue"} },
            
                    {name:"company",
                     label:"Company Name *",
                     type:"text",
                     pattern:regex.company,
                     required:true,
                     value:newUser.company,
                     placeholder:"Type Here",
                     helperText:["Enter Your Company's Full Name"],
                     typing:handleChange,
                     disabled:isDisabled,
                    //  autoComplete:"username",
                     variant:"outlined",
                     color:"info",
                     sx:{fontSize:"normal",color:"dodgerblue"} },

                     {name:"password",
                     label:"Password *",
                     type:"password",
                     pattern:regex.password,
                     required:true,
                     value:newUser.password,
                     placeholder:"Type Here",
                     helperText:["ATLEAST","- 1*(uppercase letter)","- 1*(lowercase letter)","- 1*(number)","- 1*special character (!@#$%&^*)"],
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"current-password",
                     variant:"outlined",
                     color:"info",
                     sx:{fontSize:"normal",color:"dodgerblue"} },
            
                     {name:"confirm_password",
                     label:"Confirm Password *",
                     type:"password",
                     pattern:newUser.password,
                     required:true,
                     value:newUser.confirm_password,
                     placeholder:"Type Here",
                     helperText:["Confirm your password"],
                     typing:handleChange,
                     disabled:isDisabled,
                     autoComplete:"current-password",
                     variant:"outlined",
                     color:"info",
                     sx:{fontSize:"normal",color:"dodgerblue"} },

                      ];

    const termsAgree =    {name:"terms_and_conditions",
                           check_label:"Agreeing to Terms and Conditions",
                           type:"checkbox",
                           //  pattern:regex.name,
                           required:true,
                           value:newUser.terms_and_conditions,
                           //  placeholder:"Select the role of your profile",
                           typing:handleChange,
                           disabled:isDisabled,
                           //  helperText:["By signingUp your are agreeing to our terms and conditions"],
                           //  autoComplete:"username",
                           variant:"outlined",
                           color:"info",
                           sx:{fontSize:"0.75rem",color:"dodgerblue"} }


    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!new RegExp(regex.name).test(newUser.firstName) || 
           !new RegExp(regex.name).test(newUser.lastName) || 
           !new RegExp(regex.email).test(newUser.email) ||
           !new RegExp(regex.company).test(newUser.company) || 
          //  !["manager","employee"].includes(newUser.role) ||
          //  !new RegExp(regex.userName).test(newUser.userName) ||
           !new RegExp(regex.password).test(newUser.password) ||
           !new RegExp(regex.password).test(newUser.confirm_password) ||
           newUser.terms_and_conditions !== true  
           ){
           return toast.error("please don't play with html elements ,in order to work properly"); 
          }
       
        async function signingUp(){
            setIsLoading(true);
            setIsDisabled(true);
            const {firstName,lastName,email,company,password,confirm_password,terms_and_conditions} = newUser;

            const response = await signupService({firstName,lastName,email,company,password,confirm_password,terms_and_conditions});
             const data = await response.json();
            if(response.status === 200){
                toast.success("Signup successfull , please login to continue");
                return navigate("/login")
            }if(response.status >= 400 && response.status < 500){
                toast.error(data.message);
                setNewUser({...newUser,[data.field]:""});
                setIsLoading(false);
                setIsDisabled(false);
            }
            else{
                toast.error("error occured while signup, try again later");
                setIsLoading(false);
                setIsDisabled(false);
            }
        }
         signingUp();

    }

    return(
        <Box id="signupDiv" sx={{display:'grid',width:'100vw',height:'100vh',gridTemplateColumns:"1fr 1fr",overflowY:"auto"}}>
          <Box sx={{display:'grid',placeItems:"center"}}>
            <p className="paper">
                 Let's Make your work Organized!
            </p> 
          </Box>
          <Box sx={{display: 'grid',
                  width:"100%",
                  height:"100%",
                  justifyItems:"center",
                  alignItems:"center",}}>

              <Box sx={{
                  width:"fit-content",
                  maxWidth:"45rem",
                  minWidth:"16rem",
                  margin:"1%",
                  padding:"1% 4%",
                  fontSize:"1.3rem",
                  overflow:"hidden",
                  textTransform:"capitalize",
                  border:"2px solid dodgerblue",
                  boxShadow:"inset 0px 0px 0rem 100rem rgba(30, 144, 255, 0.066)",
                  borderRadius:"2rem",}}>

                <h1 id="signupHeading" style={{color:"dodgerblue",margin:"1% 0% 0% 1%"}}>
                 Welcome New User
                </h1>
                {/* <span style={{color:"red",fontSize:"1.2rem"}}>please login to continue</span> */}
                


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
                  <Box id="signupForm" 
                            sx={{display:"grid",
                            gridColumnGap:"5%",
                            gridTemplateColumns:"1fr 1fr",}}>
                    <Box sx={{display:"grid"}}>
                        {Inputs1.map((inputProps, index) =>
                        <Grid item sx={{my:1,mx:1}} key={index} > 
                           <InputComponent  inputProps={inputProps}/>
                        </Grid>
                        )}
                    </Box>
                    <Box sx={{display:"grid"}}>
                        {Inputs2.map((inputProps, index) =>
                        <Grid item sx={{m:1}} key={index} > 
                           <InputComponent  inputProps={inputProps}/>
                        </Grid>
                        )}
                    </Box>
                    <Grid sx={{m:1}} > 
                        <InputComponent  inputProps={termsAgree}/>
                    </Grid>
                  </Box>

                  <br/>
                    
                    <Button sx={{backgroundColor:"dodgerblue",fontSize:"1.1rem"}}
                            size="small"
                            variant="contained"
                            color="primary"
                            type="submit">
                         Get Started
                    </Button>
                    {(isLoading)
                      ? <LinearProgress sx={{marginTop:"-0.8%",backgroundColor:"white"}} />
                      :""}
                  
                    <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                      <p>Existing User?</p>
                      <Button sx={{ml:"auto",fontSize:"1rem"}} 
                              size="small"
                              variant="contained"
                              onClick={()=>navigate("/login")}
                              color="warning">
                        Login
                     </Button>
                    </Box>
                   
                </Box>

              </Box>
          </Box>
        </Box>
    )
}