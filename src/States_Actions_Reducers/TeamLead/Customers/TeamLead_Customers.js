



export const TEAMLEAD_CUSTOMER_INFO_INITIALSTATES = {
                                           edit:false,
                                           isDisabled:false,
                                           dialogOpen:false,
                                           action:"",
                                           isTaskCompleted:false,
                                           updatedCustomerData:{},
                                           triggerUpdate:false,
                                          };

export const TEAMLEAD_CUSTOMER_INFO_ACTIONS = {
                                     UPDATE:"update",
                                     EDIT:"edit",
                                     DIALOG:"dialog",
                                     CUSTOMER_DATA:"customer_data",
                                     TASK_DATA:"task_data",
                                     SUBMIT_PROMPT:"dialog to confirm submit",
                                     CONFIRM_SUBMIT:"confirming submit from dialog",
                                    };

export const TEAMLEAD_CUSTOMER_INFO_REDUCER=(states,{eventType,...payLoad})=>{

    switch (eventType){
        //✅
        case TEAMLEAD_CUSTOMER_INFO_ACTIONS.UPDATE:{
              function handleUpdate(data){
                  if(data.customerData.status === "completed"){
                    return {...TEAMLEAD_CUSTOMER_INFO_INITIALSTATES,...data,isTaskCompleted:true}
                  }else{
                    return {...TEAMLEAD_CUSTOMER_INFO_INITIALSTATES,...data}
                  }
              }
              return handleUpdate(payLoad)
        }
        //✅
        case TEAMLEAD_CUSTOMER_INFO_ACTIONS.DIALOG:{
            function handleDialog(states){
                return {...states,isDisabled:false,dialogOpen:!states.dialogOpen,action:""}
            }
            return handleDialog(states);
        }
        //✅
        case TEAMLEAD_CUSTOMER_INFO_ACTIONS.EDIT:{
             function handleEdit(states){
                  return {...states,edit:!states.edit,isTaskCompleted:(states.customerData.status === "completed")?true:false}
             }
             return handleEdit(states);
        }
        //✅
        case TEAMLEAD_CUSTOMER_INFO_ACTIONS.CUSTOMER_DATA:{
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
        case TEAMLEAD_CUSTOMER_INFO_ACTIONS.TASK_DATA:{
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
                        return {...states,updatedCustomerData:{...states.updatedCustomerData,teamLead:payLoad.value}};
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
        case TEAMLEAD_CUSTOMER_INFO_ACTIONS.SUBMIT_PROMPT :{

            if(Object.keys(states.updatedCustomerData).length > 0){
                return {...states,dialogOpen:true,action:"submit"}
            }
            else{
                return {...states,edit:!states.edit}
            }
        }
        //✅
        case TEAMLEAD_CUSTOMER_INFO_ACTIONS.CONFIRM_SUBMIT:{  
             return  {...states,isDisabled:true,dialogOpen:false,triggerUpdate:"submit"};
        }
        
        default:{
           return states
        }
    }
};
