
import './App.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import Typography from '@mui/material/Typography';
import {font} from "./font"
import { Home } from './Home';


function App() {



  return (
  
    <div className="App">
      <Paper sx={{borderRadius:"none",width:"100%",height:"200vh"}}>
      <Typography variant="h5" sx={font}>
      <Switch>
        <Route exact path="/">
           <Redirect to="/login"/>
        </Route>
        <Route exact path="/login">
           <Login/>
        </Route>
        <Route exact path="/Sign-Up">
            <SignUp/>
        </Route>
        <Route path="/crm-app">
           <Home/>
        </Route>
        <Route path="**">
          <h1>404</h1>
        </Route>
      </Switch>
    </Typography>
      </Paper>
    </div>
  
  );
}

export default App;

