


export const ADMIN_TEAM_LEAD_INITIALSTATES = {edit:false,
                                              isDisabled:false,
                                              dialogOpen:false,
                                              action:"",
                                              updatedData:{},
                                              updatedTeamMembers:[],
                                              removedTeamMembersWithJobs:[],
                                              changedTeamMember:{},
                                              removedTeamMembersWithoutJobs:[],
                                              changedTeamLead:{},
                                              triggerUpdate:false,
                                             }

export const ADMIN_TEAM_LEAD_ACTIONS = {
     UPDATE:"update",
     EDIT:"edit",
     DIALOG:"dialog",
     PERSONAL_DATA:"personal_data",
     TEAM_MEMBER_CHANGE:"team_member_change",
     WORK_DATA:"work_data",
     CHANGED_TEAM_LEAD:"changed_team_lead",
     CHANGED_TEAM_MEMBER:"changed_team_member",
     LOADING:"loading",
     SUBMIT_CHECK:"submit_check",
     DELETE:"delete",
     CONFIRM_DELETE:"confirm_delete"
}

export const ADMIN_TEAM_LEAD_REDUCER =(states,{eventType,...payLoad})=>{
      
     switch (eventType){
          case ADMIN_TEAM_LEAD_ACTIONS.UPDATE:{
                function handleUpdate(data){
                    return {...ADMIN_TEAM_LEAD_INITIALSTATES,...data}
                }
                return handleUpdate(payLoad)
          }
          case ADMIN_TEAM_LEAD_ACTIONS.DIALOG:{
                function handleDialog(states){
                  return {...states,dialogOpen:!states.dialogOpen,isDisabled:false,action:"",triggerUpdate:false,removedTeamMembersWithJobs:[],changedTeamMember:{},removedTeamMembersWithoutJobs:[],changedTeamLead:{}}
                }
              return handleDialog(states);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.EDIT:{
               function handleEdit(states){
                    return {...states,...ADMIN_TEAM_LEAD_INITIALSTATES,triggerUpdate:states.triggerUpdate,edit:!states.edit}
               }
               return handleEdit(states);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.PERSONAL_DATA:{
               function handle_Personal_data_change(states,payLoad){
                  if(payLoad.name === "firstName"){
                      return {...states,updatedData:{...states.updatedData,firstName:payLoad.value}};
                   }
                   else if(payLoad.name === "lastName"){
                      return {...states,updatedData:{...states.updatedData,lastName:payLoad.value}};
                   }
                   else if(payLoad.name === "email"){
                      return {...states,updatedData:{...states.updatedData,email:payLoad.value}};
                   }
                   else{
                       return states;
                   }
               }
               return handle_Personal_data_change(states,payLoad);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.TEAM_MEMBER_CHANGE:{
               function handleTeamChange(states,payLoad){
                  return {...states,updatedTeamMembers:payLoad.value};
               }
               return handleTeamChange(states,payLoad);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.WORK_DATA:{
               function work_detail_handle_change(states,payLoad){
                  if(payLoad.name === "status"){
                      return {...states,updatedData:{...states.updatedData,status:payLoad.value}};
                  }
                  else if(payLoad.name === "role"){
                      return {...states,updatedData:{...states.updatedData,role:payLoad.value}};
                  }
                  else{
                      return states;
                  }
               }
               return work_detail_handle_change(states,payLoad);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.CHANGED_TEAM_LEAD:{
               function handleTeamLeadChange(states,payLoad){
                  let changedTeamLead;
                  for(let member of states.teamLeads){
                      if(member.userName === payLoad.value){
                         changedTeamLead = member;
                         break;
                      }
                  }
                  return {...states,changedTeamLead};
               };
               return handleTeamLeadChange(states,payLoad);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.CHANGED_TEAM_MEMBER:{
               function handleTeamMemberChange(states,payLoad){
                  let changedTeamMember;
                  for(let member of states.updatedTeamMembers){
                      if(member.userName === payLoad.value){
                         changedTeamMember = member;
                         break;
                      }
                  }
                  return {...states,changedTeamMember};
               };
               return handleTeamMemberChange(states,payLoad);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.LOADING :{
               return {...states,isDisabled:true}
          }
          case ADMIN_TEAM_LEAD_ACTIONS.SUBMIT_CHECK:{

            function submit_check(states){
                 // checking if team member is updated.. 
               if(states.updatedTeamMembers?.length>0){
                      if( !((states.removedTeamMembersWithoutJobs.length > 0) || ( (states.removedTeamMembersWithJobs.length > 0)  && states.changedTeamMember)) ){
                        const updatedTeamMembers = states.updatedTeamMembers.map((member)=>member.id);
                        let removedTeamMembersWithJobs = [];
                        let removedTeamMembersWithoutJobs = [];
                           for(let member of states.teamMembers){
                               // if updated --> check whether existing members were removed...
                               if(!(updatedTeamMembers.includes(member.id))){
                               // if existing members were removed --> check removed members have pending jobs
                                   if(member.pendingJobs > 0){
                                     removedTeamMembersWithJobs.push(member);
                                   }else{
                                     removedTeamMembersWithoutJobs.push(member);
                                   }
                               }
                            }
                            
                              // if removed pre-existing members have 0 pending jobs --> update updatedState.removedTeamMembersWithoutJobs
                             if(states.removedTeamMembersWithoutJobs.length === 0 && removedTeamMembersWithoutJobs.length > 0){
                                 states.removedTeamMembersWithoutJobs = removedTeamMembersWithoutJobs;
                             }
             
                            /* if removed pre-existing members who have pending jobs , 
                                                --> update updatedState.removedTeamMembersWithJobs 
                                                --> show dialog to switch pending jobs to another team member*/
                            if(!(states.changedTeamMember.id) && removedTeamMembersWithJobs.length > 0){
 
                                 return {...states,action:"newTeamMember",removedTeamMembersWithJobs,dialogOpen:true,isDisabled:false,changedTeamMember:{},changedTeamLead:{} };
             
                            }
                      }
               }
       
                    // checking if status or role field is updated
               if(states.updatedData.status || states.updatedData.role){  

                      if(!states.changedTeamLead.userName){
                                 //checking if the updated status or role matching the existing data of team lead
                           if(states.updatedData.status && states.updatedData.status !== states.userData.status){
                                 // triggering dialog box to appear for transfering team members and customers
                               return {...states,action:"newTeamLead",dialogOpen:true,isDisabled:false,changedTeamLead:{} };
                           }
                           if(states.updatedData.role && states.updatedData?.role !== states.userData.role){
                                   // triggering dialog box to appear for transfering team members and customers
                                return {...states,action:"newTeamLead",dialogOpen:true,isDisabled:false,changedTeamLead:{} };
                           }
                      }
               }

                return  {...states,isDisabled:true,dialogOpen:false,triggerUpdate:"submit"};
            }
            return submit_check(states);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.DELETE:{
              function handleDelete(states){
                return {...states,action:"delete",dialogOpen:true,changedTeamLead:{} };   
              };
              return handleDelete(states);
          }
          case ADMIN_TEAM_LEAD_ACTIONS.CONFIRM_DELETE:{
              function confirm_delete(states){
                  return {...states,isDisabled:true,dialogOpen:false,triggerUpdate:"delete"};
              }
              return confirm_delete(states);
          }
          default:{
             return states
          }
    }

}
