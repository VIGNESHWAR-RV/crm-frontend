import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useState,useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DASHBOARD from "./svgs/dashboard.svg";
import LEADS from "./svgs/leads.svg";
import SERVICE from "./svgs/services.svg";
import ABOUTME from "./svgs/aboutMe.svg"
import { Leads } from './LeadDisplay';
import { DashBoard } from './DashBoard';
import { font } from './font';
import { context } from './App';


export function Home() {

  const history = useHistory();

  const [expand,setExpand] = useState(false);
  
   const {keys,mode} = useContext(context);

  //  console.log(sessionStorage.getItem(`${encrypt}1`));
 
  const role = sessionStorage.getItem(`${keys}1`);
 
  
  return (
    <>
    <Box>

      {/* App header */}
       <Box sx={{
              width:"100%",
              height:"5rem",
              display:"flex",
              alignItems:"center",
              background:"dodgerBlue",
              position:"fixed",
              zIndex:"2"
              }}>
      <h2>Welcome <span style={{textTransform:"upperCase"}}>{role}</span></h2>
      <Button sx={{marginLeft:"auto",
                   color:"white",...font
                  }}
                  onClick={()=>{history.push("/login");sessionStorage.clear()}}>
        SignOut
      </Button>
    </Box>

    {/* Nav Bar  */}
    <Box  sx={{
               display:"grid",
               width:"100%",
               marginTop:"0",
               transition:"all 0.4s ease-in-out",
               position:"fixed",
               zIndex:"1",
              }}>
       <Box
          sx={{border:"3px solid dodgerBlue",
               height:"166px",
               marginTop:(expand)? "5rem": "-5.6rem",
               transition:"all 0.4s ease-in-out",
               display:"flex",
               justifyContent:"space-around",
               alignItems:"center",
               background:(mode)?"#1b1b1b" : "white",
              }}>

      {/* nav buttons with svg */}
        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={DASHBOARD} alt="dashboard" style={{width:"100%",height:"80px"}}/>
          <Button sx={font}
          onClick={()=>{history.push("/crm-app/");setExpand(!expand)}}>Dashboard</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={LEADS} alt="dashboard" style={{width:"100%",height:"80px"}}/>
          <Button sx={font}
           onClick={()=>{history.push("/crm-app/leads");setExpand(!expand)}}>Leads</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={SERVICE} alt="dashboard" style={{width:"100%",height:"80px"}}/>
          <Button sx={font}
           onClick={()=>{history.push("/crm-app/services");setExpand(!expand)}}>Service Requests</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={ABOUTME} alt="dashboard" style={{width:"100%",height:"80px"}}/>
          <Button sx={font}
           onClick={()=>{history.push("/crm-app/about");setExpand(!expand)}}>About</Button> 
        </Box>

     </Box>
       <Box sx={{display:"grid",
                 justifyContent:"center",
                 }}>
          <Button
            sx={{border:"3px solid white",
                 borderTop:"none",
                 borderRadius:"3rem",
                 borderTopLeftRadius:"0",
                 borderTopRightRadius:"0",
                 width:"18rem",
                 height:"2.5rem",
                 fontSize:"1.2rem",
                 boxShadow:"2px 6px 15px black",
                 background:"dodgerblue",
                 ":hover": { color:"dodgerblue", background: "whitesmoke",border:"3px solid dodgerBlue" },
                 ...font
                 }}  variant='contained'
                 onClick={()=>setExpand(!expand)}>
             {(expand) ?"⬆️":"⬇️"} Menu
          </Button>
       </Box>
    </Box>
    <Box  sx={{padding:"1rem 1.5rem",paddingTop:"8rem"
               }}>
       <Switch>
         <Route exact path="/crm-app/">
           <DashBoard />
         </Route>
         <Route exact path="/crm-app/leads/">
            <Leads/>
         </Route>
         <Route exact path="/crm-app/services/">
             <h1>this page is still under the construction</h1>
         </Route>
         <Route exact path="/crm-app/about/">
             <h1>this page is still under the construction</h1>
         </Route>
        </Switch> 
    </Box>
    </Box>
    </>
  );
}
