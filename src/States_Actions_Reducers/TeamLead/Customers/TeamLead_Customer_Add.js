

export const TEAMLEAD_CUSTOMERS_ADD_INITIALSTATES = {
                                          isDisabled:false,
                                          address:"",
                                          firstName:"",
                                          lastName:"",
                                          email:"",
                                          phone:"",
                                          taskDescription:"",
                                          taskOwner:"",
                                          startDate:null,
                                          dueDate:null,
                                          triggerUpdate:false
                                          };

export const TEAMLEAD_CUSTOMERS_ADD_ACTIONS = {
                                    INPUT_CHANGE:"inputFieldChange",
                                    CLEAR:"clear",
                                    LOADING:"loading",
                                    };

export const TEAMLEAD_CUSTOMERS_ADD_REDUCERS =(states,{eventType,...payLoad})=>{

    switch (eventType){

        case TEAMLEAD_CUSTOMERS_ADD_ACTIONS.INPUT_CHANGE :{
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

        case TEAMLEAD_CUSTOMERS_ADD_ACTIONS.LOADING :{
            function setLoading(states){
              return {...states,isDisabled:true,triggerUpdate:true}
            }
            return setLoading(states);
        }
               //for submit and clear same
        case TEAMLEAD_CUSTOMERS_ADD_ACTIONS.CLEAR :{
          function handleClear(){
               return TEAMLEAD_CUSTOMERS_ADD_INITIALSTATES;
          }
          return handleClear();
        }

        default :{
            return states;
        }
  
     }
}
