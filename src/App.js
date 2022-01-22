
import './App.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createContext,useState } from 'react';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import Typography from '@mui/material/Typography';
import { font } from "./font"
import { Home } from './Home';
import { ForgotPassword } from './ForgotPassword';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';

const context = createContext("");

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

  const [keys,setKeys] = useState(sessionStorage.getItem("encryption"));

  
function header(key){
   // const key = sessionStorage.getItem("encryption");
    const role = sessionStorage.getItem(`${key}1`);
    const token =sessionStorage.getItem(`${key}2`).split(`${key}`).join(".");
    const header = (role==="admin") 
                      ? {"admin-auth":`${token}`}
                      : (role==="manager")
                           ?{"manager-auth":`${token}`}
                           :(role==="employee")
                               ?{"employee-auth":`${token}`}
                               :{"user-auth":`${token}`};
  
    return header;
}

  return (
  <ThemeProvider theme={darkTheme}>
    <context.Provider value={{keys,setKeys,header}}>
    <div className="App">
      <Paper sx={{ borderRadius: "none", width: "100%", minHeight: "100vh" }}>
        <Typography variant="h5" sx={font}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/Sign-Up">
              <SignUp />
            </Route>
            <Route path="/crm-app">
            {(keys === null || keys === undefined || keys === "")
               ? <Redirect to="/login"/>
               :   <Home />
            } 
            </Route>
            <Route exact path="/forgotPassword">
              <ForgotPassword/>
            </Route>
            <Route path="**">
              <h1>404</h1>
            </Route>
          </Switch>
        </Typography>
      </Paper>
    </div>
    </context.Provider>
  </ThemeProvider>
  );
}

export default App;
export {context};

