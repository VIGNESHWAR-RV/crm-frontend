
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Skeleton from '@mui/material/Skeleton';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useContext,useState,useEffect, useCallback } from 'react';
import { context } from '../App';

import { useNavigate } from 'react-router-dom';


export function NavBar({navProps,isAuthorized}){

    const {mode,setMode} = useContext(context);

    const navigate = useNavigate();

    const [selected , setSelected] = useState();

    const [isSmallScreen,setIsSmallScreen] = useState(false);

    const [showSmallMenu,setShowSmallMenu] = useState(false);

     // destructuring props
    const [Buttons,ButtonsStyle,logo,navStyle] = navProps

     //during screen resize
    const handleResize = useCallback(() =>{

        if(window.innerWidth <= 960){
            setIsSmallScreen(true);
        }
        else if(window.innerWidth > 960 ){
            setIsSmallScreen(false);
        }
    },[setIsSmallScreen]);

    useEffect(()=>{
        window.addEventListener("resize",handleResize);
        
        if(window.innerWidth <= 960){
             setIsSmallScreen(true);
        }

        return()=>{
           window.removeEventListener("resize",handleResize);
        }
    },[handleResize]);

    useEffect(()=>{
      const path = window.location.href;
      setSelected(path.split("/")[4]+"/");
    },[navigate]);

      // handling click navigation
    const handleClick = (e,value)=>{
        // console.log(value);
        setSelected(e.target.name);
        navigate(value);
        if(setShowSmallMenu){
            setShowSmallMenu(false);
        }
    }

     // for toggling menu in small screen
    const handleMenu=()=>{
        if(isSmallScreen){
           setShowSmallMenu(prevState=>!prevState);
        }
        return;
    }

    return(
        <>
           <Box sx={{...navStyle,alignItems:"center"}}>
               {(logo)
                  ?<img style={logo[1]} src={logo[0]} alt="logo" onClick={()=>handleMenu()}>
                   </img>
                  :""}

                {(isSmallScreen)
                   ? <h1 onClick={handleMenu}><i>Menu</i></h1>
                   : <Box sx={ButtonsStyle}>
                      
                          {(isAuthorized)
                             ?  Buttons.map(({sx,darkColor,lightColor,heading,value},index)=>
                                       <Button key={index} 
                                               sx={{...sx,color:(selected === value)
                                                                     ?(mode)
                                                                        ?lightColor
                                                                        :darkColor
                                                                     :(mode)
                                                                        ?darkColor
                                                                        :lightColor ,
                                                         backgroundColor:(selected === value)
                                                                       ?(mode)
                                                                          ?darkColor
                                                                          :lightColor 
                                                                       :""
                                                                    }}
                                               name={value}
                                               title={heading}
                                               variant={(selected === value)?"contained":""}
                                               onClick={(e)=>handleClick(e,value)} >
                                        {heading}
                                        {(value==="menu")
                                          ?value
                                          :""}
                                       </Button>)
                             :  Buttons.map(({sx},index)=>
                                     <Skeleton key={index} variant="text" sx={{width:"8rem",height:"1.75rem",m:1,backgroundColor:"rgba(255,255,255,0.6)"}} />)
                           }
                     </Box> }
               
               <Fab sx={{m:1,ml:"auto",backgroundColor:"dodgerblue"}}
                    color="primary"
                    onClick={()=>setMode(!mode)}>
                  {(mode)
                    ?<Brightness7RoundedIcon sx={{color:"white"}}/>
                    :<NightsStayRoundedIcon sx={{color:"black"}}/>}
               </Fab>
           </Box>
            {(isSmallScreen)
               ? <Box sx={{display:"flex",
                           flexDirection:"column",
                           position:"fixed",
                           p:1,
                           zIndex:"2",
                           minWidth:"18rem",
                           transition:"all 0.45s ease-in-out",
                           marginLeft:(showSmallMenu)?"0rem":"-20rem",
                           background:"dodgerblue",
                           overflow:"hidden"}}>

                     <ClearRoundedIcon onClick={handleMenu} sx={{fontSize:"2rem"}} />
                      {(isAuthorized)
                         ?  Buttons.map(({sx,darkColor,lightColor,heading,value},index)=>
                            <Button key={index} 
                                    sx={{...sx,
                                         color:(selected === value)
                                                     ?(mode)
                                                        ?lightColor
                                                        :darkColor
                                                     :(mode)
                                                        ?darkColor
                                                        :lightColor,
                                         backgroundColor:(selected === value)
                                                     ?(mode)
                                                        ?darkColor
                                                        :lightColor
                                                     :"" 
                                                    }}
                                    name={value}
                                    title={heading}
                                    variant={(selected === value)?"contained":""}
                                    onClick={(e)=>handleClick(e,value)} >
                               {heading}
                                   </Button>)
                         :  Buttons.map(({sx},index)=>
                                 <Skeleton key={index} variant="text" sx={{width:"8rem",height:"1.75rem",m:1,backgroundColor:"rgba(255,255,255,0.6)"}} />)
                        }
                 </Box>
               :""}
        </>
    )
}