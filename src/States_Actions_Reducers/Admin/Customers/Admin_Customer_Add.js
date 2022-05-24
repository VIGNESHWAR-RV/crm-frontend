


export const ADMIN_CUSTOMERS_ADD_INITIALSTATES = {
                                          isDisabled:false,
                                          address:"",
                                          firstName:"",
                                          lastName:"",
                                          email:"",
                                          phone:"",
                                          taskDescription:"",
                                          teamLead:"",
                                          taskOwner:"",
                                          startDate:null,
                                          dueDate:null,
                                          optionsLabel:"Team Lead",
                                          triggerUpdate:false
                                          };

export const ADMIN_CUSTOMERS_ADD_ACTIONS = {
                                    INPUT_CHANGE:"inputFieldChange",
                                    CLEAR:"clear",
                                    LOADING:"loading",
                                    TASK_OWNERS_LOADED:"task owners loaded",
                                    };

export const ADMIN_CUSTOMERS_ADD_REDUCERS =(states,{eventType,...payLoad})=>{

    switch (eventType){

        case ADMIN_CUSTOMERS_ADD_ACTIONS.INPUT_CHANGE :{
                function handleChange(){
                 switch (payLoad.name){
                    case "address" :{
                        return {...states,address:payLoad.value};
                    }
                    case "taskDescription" :{
                        return {...states,taskDescription:payLoad.value};
                    }
                    case "firstName" :{
                        return {...states,firstName:payLoad.value};
                     }
                    case "lastName" :{
                        return {...states,lastName:payLoad.value};
                     }
                    case "email" :{
                        return {...states,email:payLoad.value};
                    }
                    case "phone" :{
                        return {...states,phone:payLoad.value};
                    }
                    case "startDate" :{
                        return {...states,startDate:payLoad.value};
                    }
                    case "dueDate" :{
                        return {...states,dueDate:payLoad.value};
                    }
                    case "teamLead" :{
                        return {...states,teamLead:payLoad.value,isDisabled:true,taskOwner:"",optionsLabel:"Task Owner"};
                     }
                    case "taskOwner" :{
                        return {...states,taskOwner:payLoad.value};
                    }
                    default :{
                         return states;
                     }
                    }
                }
             return handleChange(states,payLoad);
        }

        case ADMIN_CUSTOMERS_ADD_ACTIONS.LOADING :{
            function setLoading(states){
              return {...states,isDisabled:true,triggerUpdate:true}
            }
            return setLoading(states);
        }

        case ADMIN_CUSTOMERS_ADD_ACTIONS.TASK_OWNERS_LOADED :{
            function taskOwnersLoaded(states){
               return {...states,isDisabled:false}
            }
            return taskOwnersLoaded(states);
        }
               //for submit and clear same
        case ADMIN_CUSTOMERS_ADD_ACTIONS.CLEAR :{
          function handleClear(){
               return ADMIN_CUSTOMERS_ADD_INITIALSTATES;
          }
          return handleClear();
        }

        default :{
            return states;
        }
  
     }
}

