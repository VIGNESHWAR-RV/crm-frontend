import * as React from 'react';
import Box from '@mui/material/Box';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { header } from './header';
import { useState,useEffect } from 'react';

export function DashBoard({leads}) {



  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  const data1 = [
    {
      subject: 'Math',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Chinese',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Geography',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Physics',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'History',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  // const[leads,setLeads] = useState();
  // const details =()=> fetch("https://crm-nodejs-rv.herokuapp.com/crm-app/leads",
  //                     {method:"GET",
  //                      headers:header})
  //                .then((response)=>response.json())
  //                .then((data)=>{setLeads(data)});
 
  //  useEffect(()=> details(),[]);
console.log(leads);
const style = {
              border:"2px solid black",
              width:"auto",
              background:"dodgerBlue",
              color:"white",
              padding:"0 4%",
              borderRadius:"0.5rem",
              fontSize:"1.5rem",
              transition: "all 0.4s ease-in-out",
              ":hover": { color: "dodgerblue", background: "white" },
              }; 

  return (
    <>
    <h2>Lead Stats</h2>
    <hr/>
    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-around",margin:"2rem 0"}}>
       <Box  sx={style}>
             <h4>Total Count-total</h4>
      </Box>
      <Box  sx={style}>
             <h4>Total Completed-total</h4>
      </Box>
      <Box  sx={style}>
             <h4>Total Pending-total</h4>
      </Box>
      <Box  sx={style}>
             <h4>Total Streak-total</h4>
      </Box>
    </Box>
   
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr",justifyItems:"center" }}>
        <Box sx={{ width: "80%", height: "30vh", fontSize: "15px" }}>
          <ResponsiveContainer>
            <AreaChart
              data={leads}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area  name="Tasks Completed per Lead" type="monotone" dataKey="cpmpletedTasks" stroke="#8884d8" fill="#8884d8" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ width: "80%", height: "30vh", fontSize: "15px" }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={leads}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar name="Tasks Completed per Lead" dataKey="cpmpletedTasks" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              {/* <Radar name="name" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
     
      <br/>
    
       <h2>Service Stats</h2>
       <hr/>
       <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-around",margin:"2rem 0"}}>
          <Box  sx={style}>
                <h4>Total Count-total</h4>
         </Box>
         <Box  sx={style}>
                <h4>Total Completed-total</h4>
         </Box>
         <Box  sx={style}>
                <h4>Total Pending-total</h4>
         </Box>
         <Box  sx={style}>
                <h4>Total Streak-total</h4>
         </Box>
       </Box>
  
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr",justifyItems:"center" }}>
        <Box sx={{ width: "80%", height: "30vh", fontSize: "15px" }}>
          <ResponsiveContainer>
            <AreaChart
              data={leads}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis  />
              <Tooltip />
              <Area name="Services Completed per Lead" type="monotone" dataKey="cpmpletedTasks" stroke="#8884d8" fill="#8884d8" />
              <Legend/>
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ width: "80%", height: "30vh", fontSize: "15px" }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={leads}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar name="Services Completed per Lead " dataKey="cpmpletedTasks" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              {/* <Radar name="name" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <br/>
      <hr/>
    </>
  );
}
