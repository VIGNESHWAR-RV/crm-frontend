import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import {font} from "../font";

export function SignUp() {

  const history = useHistory();

  const style = {
    display: "grid",
    width: "450px",
    height: "600px",
    background: "white",
    justifyContent: "stretch",
    padding: "5%",
    border: "5px solid dodgerBlue",
    boxShadow: "10px 10px 25px black",
    borderRadius: "3rem",
    ...font
  };
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "grid", placeItems: "center" }}>
      <Box sx={style}>
        <h1>Hii,New user😀</h1>
        <TextField label="First Name" variant="standard" margin="normal" placeholder='Enter your first-name' />
        <TextField label="Last Name" variant="standard" margin="normal" placeholder='Enter your last-name' />
        <TextField label="Email" variant="standard" margin="normal" type="email" placeholder='Enter your valid email' />
        <TextField label="Password" type="password" margin="normal" variant="standard" placeholder='Enter your password' />
        <TextField label="Confirm Password" type="password" margin="normal" variant="standard" placeholder='Enter your password to confirm' />
        <Button sx={font} variant="contained">Sign up</Button>
        <p>
          Already Have Account?
          <Button variant='text' sx={font} onClick={() => history.push("/login")}>
            Login
          </Button>
        </p>
      </Box>
    </Box>
  );
}
