import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import { useState,useContext } from "react";
import { font } from "../font";
import { context } from '../App';


export function Login() {

  const history = useHistory();
  const {setKeys} = useContext(context);

  const style = {
    display: "grid",
    width: "450px",
    height: "450px",
    justifyContent: "stretch",
    padding: "5%",
    border: "5px solid dodgerBlue",
    boxShadow: "5px 5px 25px black",
    borderRadius: "3rem",
    transition: "all 0.2s ease-in-out",
    overflow: "hidden"
  };
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [authenFailed, setAuthenFailed] = useState(false);


  const login = () => {

    const userLogin = { name, password };

    if (userLogin.name === "" || userLogin.name === undefined ||
       userLogin.password === "" || userLogin.password === undefined){

        return setAuthenFailed(true);

    }

    fetch("https://crm-nodejs-rv.herokuapp.com/login",
      {
        method: "POST", body: JSON.stringify(userLogin),
        headers: { "Content-Type": "application/json" }
      })
    .then(response => {
        if (response.status === 400) {

          return setAuthenFailed(true);

        }

      async function get(response) {
          const reply = await response.json();
           sessionStorage.setItem("encryption",reply.encryption);
           setKeys(sessionStorage.getItem("encryption"));
           sessionStorage.setItem(`${reply.encryption}1`, reply.role);
           const arr = reply.token.split(".").join(`${reply.encryption}`);
          sessionStorage.setItem(`${reply.encryption}2`, arr);
          history.push("/crm-app");
        }
        get(response);

      });
  }

  // note work for setting textField when the credential is wrong

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "grid", placeItems: "center" }}>
      <Box sx={{ ...font, ...style }}>


        <h1>Welcome to CRM😀</h1>
        <i style={{ color: "red", fontSize: "20px" }}>Please login to access your account!</i>
        <TextField
          className="TextField"
          label="User Name"
          sx={{ ...font }}
          margin="normal"
          variant="standard"
          placeholder='Enter your user-name'
          onClick={() => { setAuthenFailed(false) }}
          onChange={(e) => { setName(e.target.value) }} />

        <TextField
          className="TextField"
          label="Password"
          sx={{ ...font }}
          margin="normal"
          type="password"
          variant="standard"
          placeholder='Enter your password'
          onClick={() => { setAuthenFailed(false) }}
          onChange={(e) => { setPassword(e.target.value) }}
          onKeyDown={(e) => { if (e.key === "Enter") { login() } }} />


        <Box sx={{ display: "grid", justifyContent: "start" }}>
          <Button
            sx={font}
            color='error'
            onClick={() => history.push("/forgotPassword")}>
            Forgot Password?
          </Button>
        </Box>

        <Button sx={{ ...font }} variant="contained" onClick={() => login()}>Login</Button>

        <Box>
          <p>
            New user?
            <Button variant='text'
              sx={{ ...font }}
              onClick={() => history.push("/Sign-Up")}>
              Sign up
            </Button>
          </p>
        </Box>

        {(authenFailed)
          ? <Alert severity='error' sx={font}
            action={
              <Button color="error" size="small" onClick={() => setAuthenFailed(!authenFailed)}>
                ❌
              </Button>
            }>
            Invalid User Credentials
          </Alert>
          : ""}
      </Box>
    </Box>
  );
}
