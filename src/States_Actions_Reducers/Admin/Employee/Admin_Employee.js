


export const ADMIN_EMPLOYEE_ACTIONS = {
    UPDATE:"update",
    EDIT:"edit",
    DIALOG:"dialog",
    PERSONAL_DATA:"personal_data",
    WORK_DATA:"work_data",
    CHANGED_TEAM_MEMBER:"changed_team_member",
    LOADING:"loading",
    SUBMIT_CHECK:"submit_check",
    DELETE:"delete",
    CONFIRM_DELETE:"confirm_delete"
};

export const ADMIN_EMPLOYEE_INITIALSTATES = {
                                       edit:false,
                                       isDisabled:false,
                                       dialogOpen:false,
                                       action:"",
                                       updatedData:{},
                                       changedTeamMember:{},
                                       triggerUpdate:false
                                      };

export const ADMIN_EMPLOYEE_REDUCERS = (states,{eventType,...payLoad})=>{
        
    switch (eventType){
        case ADMIN_EMPLOYEE_ACTIONS.UPDATE:{
              function handleUpdate(data){
                  return {...ADMIN_EMPLOYEE_INITIALSTATES,...data}
              }
              return handleUpdate(payLoad)
        }
        case ADMIN_EMPLOYEE_ACTIONS.DIALOG:{
            function handleDialog(states){
                return {...states,action:"",dialogOpen:!states.dialogOpen,isDisabled:false,triggerUpdate:false,changedTeamMember:{}}
            }
            return handleDialog(states);
        }
        case ADMIN_EMPLOYEE_ACTIONS.EDIT:{
             function handleEdit(states){
                  return {...states,edit:!states.edit}
             }
             return handleEdit(states);
        }
        case ADMIN_EMPLOYEE_ACTIONS.PERSONAL_DATA:{
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
        case ADMIN_EMPLOYEE_ACTIONS.WORK_DATA:{
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
        case ADMIN_EMPLOYEE_ACTIONS.CHANGED_TEAM_MEMBER:{
             function handleTeamMemberChange(states,payLoad){
                let changedTeamMember;
                for(let member of states.teamMembers){
                    if(member.userName === payLoad.value){
                       changedTeamMember = member;
                       break;
                    }
                }
                return {...states,changedTeamMember};
             };
             return handleTeamMemberChange(states,payLoad);
        }
        case ADMIN_EMPLOYEE_ACTIONS.LOADING :{
             return {...states,isDisabled:true}
        }
        case ADMIN_EMPLOYEE_ACTIONS.SUBMIT_CHECK:{
              
                       // checking if status or role field is updated
               if(states.updatedData.status || states.updatedData.role){   
                   
                  if(!states.changedTeamMember.userName){
                         //checking if the updated status or role matching the existing data of team lead
                       if(states.updatedData.status && states.updatedData.status !== states.userData.status){
                               // triggering dialog box to appear for transfering team members and customers
                               return {...states,action:"newTeamMember",dialogOpen:true,isDisabled:false,changedTeamMember:{} };
                       }
                       if(states.updatedData.role && states.updatedData.role !== states.userData.role){
                               // triggering dialog box to appear for transfering team members and customers
                               return {...states,action:"newTeamMember",dialogOpen:true,isDisabled:false,changedTeamMember:{} };
                       }
                    }
               }
              
                return  {...states,isDisabled:true,dialogOpen:false,triggerUpdate:"submit"};

        }
        case ADMIN_EMPLOYEE_ACTIONS.DELETE:{
            function handleDelete(states){
              return {...states,action:"delete",dialogOpen:!states.dialogOpen,changedTeamMember:{},changedTeamLead:{} };    
            };
            return handleDelete(states);
        }
        case ADMIN_EMPLOYEE_ACTIONS.CONFIRM_DELETE:{
                 function confirm_delete(states){

                 return  {...states,isDisabled:true,dialogOpen:false,triggerUpdate:"delete"};
            }
            return confirm_delete(states);
        }
        default:{
           return states
        }
  }

};
