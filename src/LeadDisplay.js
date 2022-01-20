import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function LeadDisplay({ lead }) {

  let style = {
    padding: "0 0.3rem ",
    borderRadius: "0.5rem",
    fontSize: "20px"
  };
  const color_background = (lead.status === "active")
    ? { background: "green", color: "white" }
    : (lead.status === "new")
      ? { background: "gold", color: "black" }
      : (lead.status === "cancelled")
        ? { background: "red", color: "white" }
        : {};
  return (
    <Box sx={{
      border: "2px solid black",
      borderRadius: "0.8rem",
      margin: "4px 0px",
      height: "6rem",
      padding: "0px 1rem",
      color: "dodgerBlue",
      boxShadow: "3px 3px 6px black",
      overflow: "hidden",
      transition: "all 0.6s ease-in-out",
      ":hover": { color: "white", height: "15rem", background: "dodgerBlue" },
    }}>
      <h3>{lead.name} <span style={{ ...style, ...color_background }}>{lead.status}</span></h3>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "1fr 0.5fr",
        alignItems: "baseline",
        justifyItems: "start",
        height: ""
      }}>
        <Box>
          <p>Contact: <b>{lead.mail}</b> | phone: <b>{lead.contact}</b> <br />
            Company: <b>{lead.company}</b>  | Tilte : <b>{lead.title}</b> <br />
            Lead Source : <b>{lead.source}</b> </p>
        </Box>
        <Box sx={{display: "flex"}}>
          <Button color="success" variant="contained">Mark as Complete</Button>
          <Button color="error" variant='contained'>Delete</Button>
        </Box>
      </Box>
    </Box>
  );
}
