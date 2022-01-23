import * as React from 'react';
import Box from '@mui/material/Box';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { context } from './App';
import { useState, useEffect,useContext } from 'react';

export function DashBoard() {

  const {keys,header} = useContext(context);

  const [leads, setLeads] = useState();
  const details = () => fetch("https://crm-nodejs-rv.herokuapp.com/crm-app",
    {
      method: "GET",
      headers: header(keys)
    })
    .then((response) => response.json())
    .then((data) => { setLeads(data) });

  useEffect(() => details(), []);

  const style = {
    border: "2px solid black",
    width: "auto",
    background: "dodgerBlue",
    color: "white",
    padding: "0 4%",
    borderRadius: "0.5rem",
    fontSize: "1.5rem",
    transition: "all 0.4s ease-in-out",
    ":hover": { color: "dodgerblue", background: "white" },
  };

  return (
    <>
      {(leads)
        ? <Box>
          <h2>Lead Stats</h2>
          <hr />
          <Box id="stats" sx={{ display: "grid",gridTemplateColumns:"1fr 1fr 1fr 1fr", margin: "2rem 5%" }}>
            <Box sx={style}>
              <h4>Total Count-total</h4>
            </Box>
            <Box sx={style}>
              <h4>Total Completed-total</h4>
            </Box>
            <Box sx={style}>
              <h4>Total Pending-total</h4>
            </Box>
            <Box sx={style}>
              <h4>Total Streak-total</h4>
            </Box>
          </Box>

          <Box id="graphs" sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", justifyItems: "center" }}>
            <Box sx={{ width: "90%", height: "30vh", fontSize: "15px" }}>
              <ResponsiveContainer>
                <AreaChart
                  data={leads}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area name="Tasks Completed per Lead" type="monotone" dataKey="cpmpletedTasks" stroke="dodgerBlue" fill="dodgerBlue" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ width: "90%", height: "30vh", fontSize: "15px" }}>
              <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={leads}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar name="Tasks Completed per Lead" dataKey="cpmpletedTasks" stroke="dodgerBlue" fill="dodgerBlue" fillOpacity={0.6} />
                  {/* <Radar name="name" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <br />

          <h2>Service Stats</h2>
          <hr />
          <Box id="stats" sx={{ display: "grid",gridTemplateColumns:"1fr 1fr 1fr 1fr", margin: "2rem 5%" }}>
            <Box sx={style}>
              <h4>Total Count-total</h4>
            </Box>
            <Box sx={style}>
              <h4>Total Completed-total</h4>
            </Box>
            <Box sx={style}>
              <h4>Total Pending-total</h4>
            </Box>
            <Box sx={style}>
              <h4>Total Streak-total</h4>
            </Box>
          </Box>

          <Box id="graphs" sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", justifyItems: "center" }}>
            <Box sx={{ width: "90%", height: "30vh", fontSize: "15px" }}>
              <ResponsiveContainer>
                <AreaChart
                  data={leads}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area name="Services Completed per Lead" type="monotone" dataKey="cpmpletedTasks" stroke="dodgerBlue" fill="dodgerBlue" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ width: "90%", height: "30vh", fontSize: "15px", }}>
              <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={leads}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar name="Services Completed per Lead " dataKey="cpmpletedTasks" stroke="dodgerBlue" fill="dodgerBlue" fillOpacity={0.6} />
                  {/* <Radar name="name" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <br />
          <hr />
        </Box>
        : ""}
    </>
  );
}
