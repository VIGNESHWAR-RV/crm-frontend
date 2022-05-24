import { useState } from 'react';

import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

import { Areachart, Radarchart } from "../BasicComponents/chart";
import { CardComponent } from '../BasicComponents/CardComponent';
import { BoxComponent } from '../BasicComponents/BoxComponent';
import { ButtonComponent } from '../BasicComponents/ButtonComponent';
import { SkeletonComponent } from '../BasicComponents/SkeletonComponent';

export function GraphContainer({graphProps={},graphData=""}){

    const { graphOutercard={},graphInfoAndButtonBox={},graphChangeButton={},graphSkeleton={},textSkeleton={} } = graphProps;

    const [chart,changeChart] = useState(true);


    return(
        <>
          {(typeof(graphData) === "object")
            ?<CardComponent props={{...graphOutercard}} >
                <h1 style={{margin:"3% 0% 0% 3%",color:"dodgerblue"}}><i>Revenue</i></h1>
                {(chart)
                       ?<Areachart data={graphData}/>
                       :<Radarchart data={graphData}/>}
  
                <BoxComponent props={{...graphInfoAndButtonBox}}>
                    <h1 style={{margin:"0 0 2% 6%"}}><i>Total<span style={{color:"dodgerblue"}}><CurrencyRupeeRoundedIcon sx={{ml:2,fontSize:"2rem"}}/>32</span></i></h1>
                    <ButtonComponent props={{...graphChangeButton,onClick:()=>changeChart(!chart),contentText:`View as ${(chart)?"Radar chart":"Area chart"}` }} />
                </BoxComponent>
             </CardComponent>

            :<CardComponent props= {{...graphOutercard}}>
                <h1 style={{margin:"3% 0% 0% 3%",color:"dodgerblue"}}><i>Revenue</i></h1>
                <SkeletonComponent props={{...graphSkeleton}} />
                <BoxComponent props={{...graphInfoAndButtonBox}}>
                    <SkeletonComponent props={{...textSkeleton}} />
                    <SkeletonComponent props={{...textSkeleton,sx:{...textSkeleton.sx,ml:"auto"} }} />
                </BoxComponent>
             </CardComponent>
          }
        </>
    )
}