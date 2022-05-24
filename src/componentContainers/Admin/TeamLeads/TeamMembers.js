

//--------- { MUI } imports -------------------------
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ChipComponent } from '../../../BasicComponents/ChipComponent';
import { SkeletonComponent } from '../../../BasicComponents/SkeletonComponent';
//---------------------------------------------------



export function TeamMembers({teamMembersProps={},states={},handleTeamChange=""}){

      // assigning to empty string "" to conditionally prevent from rendering
   const { memberChip={} ,SkeletonInner={},SkeletonOuter={} } = teamMembersProps;
   
    return(
       <>
       {(states.teamMembers && states.employeesList )
          ?  <Box
                   sx={{
                     '& > :not(style)': {},
                   //   display:"grid",
                   //   justifyItems:"stretch",
                   //   alignContent:"center",
                   // backgroundColor:"dodgerblue"
                   }}>
                    <h2 style={{marginLeft:"5%",color:"dodgerblue"}}><i>Team Members</i></h2>
                    {(states.edit && handleTeamChange !== "")
                      ?<Autocomplete       
                         multiple
                         sx={{m:2,p:4,
                              maxHeight:"30vh",
                              overflowY:"auto",
                              border:"1px solid dodgerblue",
                              borderRadius:"1.5rem",
                          // display: 'inline-block',
                          '& input': {
                            bgcolor: 'transparent',
                          //   color: (theme) =>
                          //     theme.palette.getContrastText(theme.palette.background.paper),
                          },
                        }}
                         id="team-members"
                         options={states.employeesList}
                         getOptionLabel={(option) => option.userName}
                         defaultValue={states.teamMembers}
                         isOptionEqualToValue={(option,value) => option.userName === value.userName}
                         onChange={(e,value)=>handleTeamChange(e,value)}
                           // should  pass params
                         renderInput={(params) => (
                            <TextField variant="standard" 
                                       color="primary"
                                       style={{}}
                                      //  onFocus={()=>setOpen(true)}  for showing loading state while search
                                      //  onBlur={()=>setOpen(false)}
                                      placeholder="Type Here"
                                      label="Members"
                                       {...params}
                                       InputProps={{
                                         ...params.InputProps,
                                      //    endAdornment: (
                                      //       <>
                                      //         {(open) ? <CircularProgress color="inherit" size={20} /> : null}
                                      //         {params.InputProps.endAdornment}
                                      //       </>
                                      //    )
                                      }}/>
                           )} 
                           />
                      :<Box sx={{mx:1,mr:2,py:2,border:"1px solid dodgerblue",borderRadius:"1.5rem",maxHeight:"45vh",overflow:"auto",textAlign:"center"}}>
                           {/* <h2>Members</h2> */}
                           {states.teamMembers.map(({userName},index)=>
                             <ChipComponent props={{...memberChip,label:userName}} key={index} />  )}
                       </Box>}
             </Box>

          :  <Box>
                <h2 style={{marginLeft:"5%",color:"dodgerblue"}}>Team Members</h2>
                <Box sx={{width:"96%",minHeight:"8rem",height:"15vh",border:"1px solid dodgerblue",borderRadius:"1.5rem",display:"grid",justifyItems:"center"}}>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                      <SkeletonComponent props={{...SkeletonInner}} />
                      <SkeletonComponent props={{...SkeletonInner}} />
                      <SkeletonComponent props={{...SkeletonInner}} />
                    </Box>
                    <SkeletonComponent props={{...SkeletonOuter}} />
                </Box>
             </Box>}
       </>
    )}