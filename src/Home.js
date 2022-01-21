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
  
   const {keys} = useContext(context);

  //  console.log(sessionStorage.getItem(`${encrypt}1`));
 
  const role = sessionStorage.getItem(`${keys}1`);
 
  
  return (
    <>
    <Box>
       <Box sx={{
              width:"100%",
              height:"5rem",
              display:"flex",
              alignItems:"center",
              background:"dodgerBlue",
              position:"sticky",
              zIndex:"2"
              }}>
      <h2>Welcome {role.toUpperCase()}</h2>
      <Button sx={{marginLeft:"auto",
                   color:"white",...font
                  }}
                  onClick={()=>{history.push("/login");sessionStorage.clear()}}>
        SignOut
      </Button>
    </Box>
    <Box  sx={{
               display:"grid",
               width:"100%",
               marginTop:(expand)?"0":"-10.85rem",
               transition:"all 0.6s ease-in-out",
               background:"transparent",
               overflow:"hidden",
               zIndex:"1",
              }}>
       <Box
          sx={{border:"3px solid dodgerBlue",
               height:"166px",
               display:"flex",
               justifyContent:"space-evenly",
               alignItems:"center",
              }}>
        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={DASHBOARD} alt="dashboard" style={{width:"200px",height:"80px"}}/>
          <Button sx={font}
          onClick={()=>{history.push("/crm-app/");setExpand(!expand)}}>Dashboard</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={LEADS} alt="dashboard" style={{width:"200px",height:"80px"}}/>
          <Button sx={font}
           onClick={()=>{history.push("/crm-app/leads");setExpand(!expand)}}>Leads</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={SERVICE} alt="dashboard" style={{width:"200px",height:"80px"}}/>
          <Button sx={font}
           onClick={()=>history.push("/crm-app/services")}>Service Requests</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={ABOUTME} alt="dashboard" style={{width:"200px",height:"80px"}}/>
          <Button sx={font}
           onClick={()=>history.push("/crm-app/about")}>About</Button> 
        </Box>

     </Box>
       <Box sx={{display:"grid",
                 justifyContent:"center",
                 }}>
          <Button
            sx={{border:"3px solid dodgerBlue",
                 borderRadius:"3rem",
                 borderTopLeftRadius:"0",
                 borderTopRightRadius:"0",
                 width:"18rem",
                 height:"2.5rem",
                 fontSize:"1.2rem",
                 ...font
                 }}
                 onClick={()=>setExpand(!expand)}>
             {(expand) ? "⬆️":"⬇️"} Menu
          </Button>
       </Box>
    </Box>
    <Box  sx={{padding:"1rem 1.5rem",
               }}>
       <Switch>
         <Route exact path="/">
           <DashBoard />
         </Route>
         <Route exact path="/leads/">
            <Leads/>
         </Route>
         <Route exact path="/services/">
             <h1>this page is still under the construction</h1>
         </Route>
         <Route exact path="/about/">
             <h1>this page is still under the construction</h1>
         </Route>
        </Switch> 
    </Box>
    </Box>
    </>
  );
}
