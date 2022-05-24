

export const ADMIN_CUSTOMER_INFO_INITIALSTATES = {
                                           edit:false,
                                           isDisabled:false,
                                           dialogOpen:false,
                                           action:"",
                                           isTaskCompleted:false,
                                           updatedCustomerData:{},
                                           triggerUpdate:false,
                                           updateTaskOwner:false,
                                          };

export const ADMIN_CUSTOMER_INFO_ACTIONS = {
                                     UPDATE:"update",
                                     EDIT:"edit",
                                     DIALOG:"dialog",
                                     CUSTOMER_DATA:"customer_data",
                                     TASK_DATA:"task_data",
                                     TASK_OWNERS_UPDATED:"to stop after updating task owner's list",
                                     SUBMIT_PROMPT:"dialog to confirm submit",
                                     CONFIRM_SUBMIT:"confirming submit from dialog",
                                     DELETE_PROMPT:"dialog to confirm delete",
                                     CONFIRM_DELETE:"confirm_delete"
                                    };

export const ADMIN_CUSTOMER_INFO_REDUCER=(states,{eventType,...payLoad})=>{

    switch (eventType){
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.UPDATE:{
              function handleUpdate(data){
                  if(data.customerData.status === "completed"){
                    return {...ADMIN_CUSTOMER_INFO_INITIALSTATES,...data,isTaskCompleted:true}
                  }else{
                    return {...ADMIN_CUSTOMER_INFO_INITIALSTATES,...data}
                  }
              }
              return handleUpdate(payLoad)
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.DIALOG:{
            function handleDialog(states){
                return {...states,isDisabled:false,dialogOpen:!states.dialogOpen,action:""}
            }
            return handleDialog(states);
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.EDIT:{
             function handleEdit(states){
                  return {...states,edit:!states.edit}
             }
             return handleEdit(states);
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.CUSTOMER_DATA:{
             function handle_Personal_data_change(states,payLoad){
                 switch (payLoad.name){
                   case "firstName" :{
                       return {...states,updatedCustomerData:{...states.updatedCustomerData,firstName:payLoad.value}};
                    }
                   case "lastName" :{
                       return {...states,updatedCustomerData:{...states.updatedCustomerData,lastName:payLoad.value}};
                    }
                   case "email" :{
                       return {...states,updatedCustomerData:{...states.updatedCustomerData,email:payLoad.value}};
                    }
                   case "address" :{
                       return {...states,updatedCustomerData:{...states.updatedCustomerData,address:payLoad.value}};
                    }
                   case "phone" :{
                       return {...states,updatedCustomerData:{...states.updatedCustomerData,phone:payLoad.value}};
                   }
                   default :{
                        return states;
                    }
                }
             }
             return handle_Personal_data_change(states,payLoad);
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.TASK_DATA:{
             function work_detail_handle_change(states,payLoad){

                switch (payLoad.name){
                    case "taskDescription" :{
                        return {...states,updatedCustomerData:{...states.updatedCustomerData,taskDescription:payLoad.value}};
                    }
                    case "status" :{   
                     return {...states,updatedCustomerData:{...states.updatedCustomerData,status:payLoad.value},isTaskCompleted:(payLoad.value === "completed")?true:false};
                    }
                    case "startDate" :{
                        return {...states,updatedCustomerData:{...states.updatedCustomerData,startDate:payLoad.value}};
                    }
                    case "dueDate" :{
                        return {...states,updatedCustomerData:{...states.updatedCustomerData,dueDate:payLoad.value}};
                    }
                    case "teamLead" :{
                        return {...states,isDisabled:true,updateTaskOwner:true,updatedCustomerData:{...states.updatedCustomerData,teamLead:payLoad.value}};
                    }
                    case "taskOwner" :{
                        return {...states,updatedCustomerData:{...states.updatedCustomerData,taskOwner:payLoad.value}};
                    }
                    case "serviceCharge" :{
                        return {...states,updatedCustomerData:{...states.updatedCustomerData,serviceCharge:payLoad.value}};
                    }
                    default :{
                        return states;
                    }
               }

             }
             return work_detail_handle_change(states,payLoad);
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.TASK_OWNERS_UPDATED :{
            return {...states,isDisabled:false,updateTaskOwner:false,taskOwners:payLoad.data}
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.SUBMIT_PROMPT :{

            if(Object.keys(states.updatedCustomerData).length > 0){
                return {...states,dialogOpen:true,action:"submit"}
            }
            else{
                return {...states,edit:!states.edit}
            }
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.CONFIRM_SUBMIT:{  
             return  {...states,isDisabled:true,dialogOpen:false,triggerUpdate:"submit"};
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.DELETE_PROMPT:{
            function handleDelete(states){
              return {...states,action:"delete",dialogOpen:true };    
            };
            return handleDelete(states);
        }
        //✅
        case ADMIN_CUSTOMER_INFO_ACTIONS.CONFIRM_DELETE:{
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
