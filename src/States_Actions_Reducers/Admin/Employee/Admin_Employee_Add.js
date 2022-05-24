export const ADMIN_EMPLOYEE_ADD_INITIALSTATES = {
                                          isDisabled:false,
                                          firstName:"",
                                          lastName:"",
                                          email:"",
                                          teamLead:"",
                                          triggerUpdate:false
                                         };

export const ADMIN_EMPLOYEE_ADD_ACTIONS = {
                                    INPUT_CHANGE:"inputFieldChange",
                                    CLEAR:"clear",
                                    LOADING:"loading",
                                    SUBMITTED:"submitted",
                                    UPDATE:"update"
                                   };

export const ADMIN_EMPLOYEE_ADD_REDUCERS = (states,{eventType,...payLoad})=>{

    switch (eventType){

        case ADMIN_EMPLOYEE_ADD_ACTIONS.INPUT_CHANGE :{
                function handleChange(){
                    if(payLoad.name === "firstName"){
                        return {...states,firstName:payLoad.value};
                     }
                     else if(payLoad.name === "lastName"){
                        return {...states,lastName:payLoad.value};
                     }
                     else if(payLoad.name === "email"){
                        return {...states,email:payLoad.value};
                     }
                     else if(payLoad.name === "teamLead"){
                        return {...states,teamLead:payLoad.value};
                     }
                     else{
                         return states;
                     }
                }
             return handleChange(states,payLoad);
        }
        case ADMIN_EMPLOYEE_ADD_ACTIONS.LOADING :{
            function setLoading(states){
              return {...states,isDisabled:true,triggerUpdate:true}
            }
            return setLoading(states);
        }
        case ADMIN_EMPLOYEE_ADD_ACTIONS.SUBMITTED :{
           
           return ADMIN_EMPLOYEE_ADD_INITIALSTATES;
        }
        case ADMIN_EMPLOYEE_ADD_ACTIONS.CLEAR :{
          function handleClear(){
               return ADMIN_EMPLOYEE_ADD_INITIALSTATES;
          }
          return handleClear();
        }
        default :{
            return states;
        }
  
     }

};
