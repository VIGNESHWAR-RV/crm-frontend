

export const ADMIN_NOTES_CONTAINER_INITIALSTATES = {
                                        isNotesDisabled:false,
                                        isSaveDisabled:false,
                                        isClearDisabled:false,
                                        initialNotes:"",
                                        updatedNotes:"",
                                        triggerUpdate:false
                                       };

export const ADMIN_NOTES_CONTAINER_ACTIONS = {
                                 NOTES_CHANGE:"notes_update",
                                 LOADING:"loading",
                                 FIRST_TIME_SET:"setting Initial notes",
                                 NOTES_SAVED:"save_notes",
                                 CLEAR_NOTES:"clear_notes"
                                };

export const ADMIN_NOTES_CONTAINER_REDUCER =(states,{eventType,...payLoad})=>{

     switch (eventType){

           case ADMIN_NOTES_CONTAINER_ACTIONS.NOTES_CHANGE:{

                 function notesChange(states,payLoad){
                        if(payLoad.value !== ""){
                            return {...states,isSaveDisabled:false,isClearDisabled:false,updatedNotes:payLoad.value}
                        }else{
                            return {...states,isClearDisabled:true,isSaveDisabled:false,updatedNotes:payLoad.value}
                        }
                 }
                 return notesChange(states,payLoad)
           }
           case ADMIN_NOTES_CONTAINER_ACTIONS.LOADING: {
                function notesLoading(states){
                    return {...states,isNotesDisabled:true,isSaveDisabled:true,isClearDisabled:true,triggerUpdate:true};
                }
                return notesLoading(states);
           }
           case ADMIN_NOTES_CONTAINER_ACTIONS.NOTES_SAVED: {
                
                function notesSaved(states){
                    return {...states,isSaveDisabled:false,
                                      isNotesDisabled:false,
                                      isClearDisabled:(states.updatedNotes !== "")?false:true,
                                      initialNotes:states.updatedNotes,
                                      triggerUpdate:false}
                }
                return notesSaved(states);
           }
           case ADMIN_NOTES_CONTAINER_ACTIONS.CLEAR_NOTES:{

               function notesClear(states){
                   return {...states,updatedNotes:"",isClearDisabled:true }
               }
               return notesClear(states);
           }
           case ADMIN_NOTES_CONTAINER_ACTIONS.FIRST_TIME_SET:{

                function firstTimeUpdate(states,payLoad){
                    return {...states,initialNotes:payLoad.value,updatedNotes:payLoad.value}
                }
                return firstTimeUpdate(states,payLoad);
           }
           default:{
               return states;
           }

     }
};
