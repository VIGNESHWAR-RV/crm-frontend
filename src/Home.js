import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DASHBOARD from "./svgs/dashboard.svg";
import LEADS from "./svgs/leads.svg";
import SERVICE from "./svgs/services.svg";
import ABOUTME from "./svgs/aboutMe.svg"
import { LeadDisplay } from './LeadDisplay';
import { DashBoard } from './DashBoard';
import { header } from './header';
export function Home() {

  const history = useHistory();

  
  
 if ((sessionStorage.getItem("userId") === "" ||
    sessionStorage.getItem("userId") === undefined ||
    sessionStorage.getItem("userId")=== null)
    ||
    (sessionStorage.getItem("token") === "" ||
    sessionStorage.getItem("token") === undefined ||
    sessionStorage.getItem("token") === null)
    ||
    (sessionStorage.getItem("role") === "" ||
    sessionStorage.getItem("role") === undefined ||
    sessionStorage.getItem("role") === null)
    ){
     history.push("/login");
  }
 
  const role = sessionStorage.getItem("role");
  //console.log(sessionStorage.getItem("token").split("/a").join("."));
 const[leads,setLeads] = useState();
 const details =()=> fetch("https://crm-nodejs-rv.herokuapp.com/leads",
                     {method:"GET",
                      headers:header()})
                .then((response)=>response.json())
                .then((data)=>{setLeads(data)});

  useEffect(()=> details(),[]);

const [expand,setExpand] = useState(false);

  return (
    <>
    {(leads)
    ?<Box>
    <Box sx={{zIndex:"2",
              width:"100%",
              height:"5rem",
              display:"flex",
              alignItems:"center",
              background:"dodgerBlue",
              position:"fixed"
              }}>
      <h2>Welcome {role.toUpperCase()}</h2>
      <Button sx={{marginLeft:"auto",
                   color:"white",
                  }}
                  onClick={()=>{history.push("/login");sessionStorage.clear()}}>
        SignOut
      </Button>
    </Box>
    <Box  sx={{
               display:"grid",
               marginTop:(expand)?"5rem":"-5.66rem",
               width:"100%",
               position:"fixed",
               transition:"all 0.6s ease-in-out",
               background:"white",
               zIndex:"1"
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
          <Button
          onClick={()=>{history.push("/crm-app/");setExpand(!expand)}}>Dashboard</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={LEADS} alt="dashboard" style={{width:"200px",height:"80px"}}/>
          <Button
           onClick={()=>{history.push("/crm-app/leads");setExpand(!expand)}}>Leads</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={SERVICE} alt="dashboard" style={{width:"200px",height:"80px"}}/>
          <Button>Service Requests</Button>
        </Box>

        <Box sx={{display:"grid",justifyItems:"center",cursor:"pointer"}}>
          <img src={ABOUTME} alt="dashboard" style={{width:"200px",height:"80px"}}/>
          <Button>About</Button> 
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
                 width:"15rem",
                 height:"2rem",
                 }}
                 onClick={()=>setExpand(!expand)}>
             {(expand) ? "⬆️":"⬇️"} Menu
          </Button>
       </Box>
    </Box>
    <Box  sx={{padding:"1.5rem",
               paddingTop:"10rem",
               }}>
       <Switch>
         <Route exact path="/crm-app/">
           <DashBoard leads={leads}/>
         </Route>
         <Route exact path="/crm-app/leads/">
             {leads.map((lead,index)=>
              <LeadDisplay key={index} lead={lead} />
            )}
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
    :""}
    </>
  );
}

