
import CardContent from "@mui/material/CardContent";
import { BoxComponent } from "../BasicComponents/BoxComponent";
import { CardComponent } from "../BasicComponents/CardComponent";
import { SkeletonComponent } from "../BasicComponents/SkeletonComponent";


export function InfoCardCotainer({infoProps={},infoCardData=""}){

    const { infoOuterBox={},infoFirstCard={},infoSecondCard={},infoCardTextSkeleton={} } = infoProps


    return(
        <>
          {/* Revenue && customers */}
          {( typeof(infoCardData) === "object")
                   ? <BoxComponent props={{...infoOuterBox}}>
                         <CardComponent props={{...infoFirstCard}}>
                             <CardContent>
                                  <h2 style={{color:"dodgerblue"}}><i>Total Revenue</i></h2>
                                  <h1>{infoCardData[0]}</h1>
                             </CardContent>
                         </CardComponent>
                       
                         <CardComponent props={{...infoSecondCard}}>
                             <CardContent>
                                  <h2 style={{color:"dodgerblue"}}><i>New Customers</i></h2>
                                  <h1>{infoCardData[1]}</h1>
                             </CardContent>
                         </CardComponent>
                     </BoxComponent>
       
                   : <BoxComponent props={{...infoOuterBox}}>
                         <CardComponent props={{...infoFirstCard}}>
                              <CardContent>
                                   <h2 style={{color:"dodgerblue"}}><i>Total Revenue</i></h2>
                                   <SkeletonComponent props={{...infoCardTextSkeleton}} />
                              </CardContent>
                          </CardComponent>
                        
                          <CardComponent props={{...infoSecondCard}}>
                              <CardContent>
                                   <h2 style={{color:"dodgerblue"}}><i>New Customers</i></h2>
                                   <SkeletonComponent props={{...infoCardTextSkeleton}} />
                              </CardContent>
                          </CardComponent>
                     </BoxComponent>}
        </>
    )
}