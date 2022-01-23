import * as React from 'react';
import { Box, Button } from '@mui/material';
import { context } from './App';
import { useContext } from 'react';


export function ThemeSwitch() {

    const {mode,setMode} = useContext(context);



  return (
    <Box sx={{}}>
      <Button  sx={{fontSize:"2rem",position:"fixed",zIndex:"4",marginTop:"3%"}} onClick={() => setMode(!mode)}>
          {(mode) ? "🌇" : "🌉"}     
      </Button>
    </Box>
  );
}
