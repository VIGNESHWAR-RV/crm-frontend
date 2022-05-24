
import {context} from "../App";
import {useContext} from "react";

import Box from '@mui/material/Box';
//  CartesianGrid
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,Legend } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { PieChart, Pie } from 'recharts';

export function Areachart({data}){
  
  const {mode} = useContext(context);

    return(
        <Box sx={{ m:5, height:"38vh", fontSize: "15px" }}>
              <ResponsiveContainer>
                <AreaChart
                  data={data}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -35,
                    bottom: 0,
                  }}
                >
                  {/* grid */}
                  {/* <CartesianGrid strokeDasharray="0 0" /> */}
                  <XAxis dataKey="name" stroke={(mode)?"white":"black"}/>
                  <YAxis dataKey="cost" stroke={(mode)?"white":"black"}/>
                  <Tooltip />
                  <Area name="Revenue Generated In Last 7 Days" type="monotone" dataKey="cost" stroke="dodgerBlue" fill="dodgerBlue" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
        </Box>
    )
}

export function Radarchart({data}){

  const {mode} = useContext(context);

  return(
    <Box sx={{ m:5, height: "38vh", fontSize: "15px"}}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" stroke={(mode)?"white":"black"}/>
            <PolarRadiusAxis angle={10} domain={[0, 10]} />
            <Radar name="Revenue Generated In last 7 days" dataKey="cost" stroke="dodgerBlue" fill="dodgerBlue" fillOpacity={0.6} />
            {/* <Radar name="name" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
            <Tooltip/>
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
    </Box>
  )
}

export function Piechart({leads}){

  return(
    <Box sx={{ m:5, height: "38vh", fontSize: "15px"}}>
        <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="cost"
            isAnimationActive={true}
            data={leads}
            cx="50%"
            cy="50%"
            outerRadius={100}
            stroke="dodgerBlue"
            label
          />
          <Legend/>
          <Tooltip />
        </PieChart>
        </ResponsiveContainer>
    </Box>

  )
}