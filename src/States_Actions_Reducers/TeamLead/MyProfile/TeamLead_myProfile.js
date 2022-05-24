



export const TEAMLEAD_MY_PROFILE_ACTIONS = {
                                  UPDATE:"updating the states with user data",
                                  EDIT:"to enable and disable edit option",
                                  DIALOG:"to close dialog when cancelled during its pop-up",
                                  SUBMIT_CHECK:"to enable minor check before confirming submission",
                                  CONFIRM_SUBMIT:"confirming submit to update changes and trigger fetch to get updated data",
                                  PERSONAL_DATA:"to make changes in the editable personal data"
                                 };

export const TEAMLEAD_MY_PROFILE_INITIALSTATES = {
                                        edit:false,
                                        isDisabled:false,
                                        dialogOpen:false,
                                        updatedData:{},
                                        action:"",
                                        triggerUpdate:false
                                        };

export const TEAMLEAD_MY_PROFILE_REDUCER = (states,{eventType,...payLoad})=>{

     switch (eventType){

           case TEAMLEAD_MY_PROFILE_ACTIONS.UPDATE :{
                return {...TEAMLEAD_MY_PROFILE_INITIALSTATES,...payLoad.data}
           }

           case TEAMLEAD_MY_PROFILE_ACTIONS.EDIT :{
                return {...states,edit:!states.edit,updatedData:{}}
           }

           case TEAMLEAD_MY_PROFILE_ACTIONS.DIALOG :{
                return {...states,dialogOpen:!states.dialogOpen}
           }

           case TEAMLEAD_MY_PROFILE_ACTIONS.PERSONAL_DATA :{
               switch (payLoad.name){
                   case "firstName" :{
                       return {...states,updatedData:{...states.updatedData,firstName:payLoad.value}};
                   }
                   case "lastName" :{
                       return {...states,updatedData:{...states.updatedData,firstName:payLoad.value}};
                   }
                   case "email" :{
                        return {...states,updatedData:{...states.updatedData,email:payLoad.email}};
                   }
                   default :{
                        return states;
                   }
               }
           }

           case TEAMLEAD_MY_PROFILE_ACTIONS.SUBMIT_CHECK :{
                  if(Object.keys(states.updatedData).length > 0){
                       return {...states,dialogOpen:true,action:"update"}
                  }else{
                      return {...states,edit:!states.edit}
                  }

           }

           case TEAMLEAD_MY_PROFILE_ACTIONS.CONFIRM_SUBMIT :{
                  return {...states,dialogOpen:false,isDisabled:true,triggerUpdate:true}
           }

           case TEAMLEAD_MY_PROFILE_ACTIONS.SIGNOUT :{
                  return {...states,dialogOpen:true,action:"signout"}
           }

           default :{
               return states;
           }
     }
}