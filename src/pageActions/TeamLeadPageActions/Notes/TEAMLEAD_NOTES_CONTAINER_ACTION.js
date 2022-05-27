import { useCallback, useEffect, useReducer, useRef } from 'react';
import { update } from '../../../Util';

//--- { component imports } -----------------------------------
import { NotesContainer } from '../../../componentContainers/NotesContainer';
//--------------------------------------------------------------

//--- { states and actions imports } ------------------------------------------------
import { TEAMLEAD_NOTES_CONTAINER_INITIALSTATES,TEAMLEAD_NOTES_CONTAINER_ACTIONS,TEAMLEAD_NOTES_CONTAINER_REDUCER } from '../../../States_Actions_Reducers/TeamLead/Dashboard Notes/TeamLead_Notes';
//-----------------------------------------------------------------------------------



export function TEAMLEAD_NOTES_CONTAINER_ACTION({notesProps={},notesData=""}){

    const { notesUpdatePath="",...otherNotesProps } = notesProps;

    const [states,dispatch] = useReducer(TEAMLEAD_NOTES_CONTAINER_REDUCER,TEAMLEAD_NOTES_CONTAINER_INITIALSTATES);

    const componentMounted = useRef(true);


    useEffect(()=>{
       
        return ()=>{
            componentMounted.current = false;
        }
    },[componentMounted]);

    useEffect(()=>{
        
          if(componentMounted.current){
                dispatch({eventType:TEAMLEAD_NOTES_CONTAINER_ACTIONS.FIRST_TIME_SET,value:notesData});
          }

    },[componentMounted,notesData,dispatch]);
    
    useEffect(()=>{

        if(componentMounted.current){
             if(states.triggerUpdate && notesUpdatePath !== ""){
                 async function updateNotes(fetchData){
                   await update(fetchData);
                   dispatch({eventType:TEAMLEAD_NOTES_CONTAINER_ACTIONS.NOTES_SAVED});
                   return;
                 }
                 updateNotes({path:notesUpdatePath,method:"POST",header:{},body:{notes:states.updatedNotes},role:"teamLead"})
             }
        }
              //eslint-disable-next-line
    },[componentMounted,notesUpdatePath,states.triggerUpdate]);


    const handleSave=useCallback(()=>{
        dispatch({eventType:TEAMLEAD_NOTES_CONTAINER_ACTIONS.LOADING});
    },[dispatch]);

    const handleClear=useCallback(()=>{
         dispatch({eventType:TEAMLEAD_NOTES_CONTAINER_ACTIONS.CLEAR_NOTES});
    },[dispatch]);

    const handleTextChange=useCallback((e)=>{
         dispatch({eventType:TEAMLEAD_NOTES_CONTAINER_ACTIONS.NOTES_CHANGE,value:e.target.value});
    },[dispatch]);
    

     const notesHandlers = {handleSave,handleClear,handleTextChange}


    return(
        <NotesContainer notesProps={otherNotesProps} notesHandlers={notesHandlers} states={states} />
    )
}
