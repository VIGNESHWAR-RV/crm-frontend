
import './App.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import Typography from '@mui/material/Typography';
import {font} from "./font"

function App() {

  return (
  
    <div className="App">
      <Paper sx={{borderRadius:"none"}}>
      <Typography variant="h5" sx={font}>
      <Switch>
        <Route exact path="/login">
           <Login/>
        </Route>
        <Route exact path="/Sign-Up">
            <SignUp/>
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
