



export const EMPLOYEE_CUSTOMER_INFO_INITIALSTATES = {
                                           edit:false,
                                           isDisabled:false,
                                           dialogOpen:false,
                                           action:"",
                                           isTaskCompleted:false,
                                           updatedCustomerData:{},
                                           triggerUpdate:false,
                                          };

export const EMPLOYEE_CUSTOMER_INFO_ACTIONS = {
                                     UPDATE:"update",
                                     EDIT:"edit",
                                     DIALOG:"dialog",
                                     CUSTOMER_DATA:"customer_data",
                                     TASK_DATA:"task_data",
                                     SUBMIT_PROMPT:"dialog to confirm submit",
                                     CONFIRM_SUBMIT:"confirming submit from dialog",
                                    };

export const EMPLOYEE_CUSTOMER_INFO_REDUCER=(states,{eventType,...payLoad})=>{

    switch (eventType){
        //✅
        case EMPLOYEE_CUSTOMER_INFO_ACTIONS.UPDATE:{
              function handleUpdate(data){
                  if(data.customerData.status === "completed"){
                    return {...EMPLOYEE_CUSTOMER_INFO_INITIALSTATES,...data,isTaskCompleted:true}
                  }else{
                    return {...EMPLOYEE_CUSTOMER_INFO_INITIALSTATES,...data}
                  }
              }
              return handleUpdate(payLoad)
        }
        //✅
        case EMPLOYEE_CUSTOMER_INFO_ACTIONS.DIALOG:{
            function handleDialog(states){
                return {...states,isDisabled:false,dialogOpen:!states.dialogOpen,action:""}
            }
            return handleDialog(states);
        }
        //✅
        case EMPLOYEE_CUSTOMER_INFO_ACTIONS.EDIT:{
             function handleEdit(states){
                  return {...states,edit:!states.edit}
             }
             return handleEdit(states);
        }
        //✅
        case EMPLOYEE_CUSTOMER_INFO_ACTIONS.TASK_DATA:{

             function work_detail_handle_change(states,payLoad){

                switch (payLoad.name){
        
                    case "status" :{   
                     return {...states,updatedCustomerData:{...states.updatedCustomerData,status:payLoad.value},isTaskCompleted:(payLoad.value === "completed")?true:false};
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
        case EMPLOYEE_CUSTOMER_INFO_ACTIONS.SUBMIT_PROMPT :{

            if(Object.keys(states.updatedCustomerData).length > 0){
                return {...states,dialogOpen:true,action:"submit"}
            }
            else{
                return {...states,edit:!states.edit}
            }
        }
        //✅
        case EMPLOYEE_CUSTOMER_INFO_ACTIONS.CONFIRM_SUBMIT:{  
             return  {...states,isDisabled:true,dialogOpen:false,triggerUpdate:"submit"};
        }
        
        default:{
           return states
        }
    }
};
