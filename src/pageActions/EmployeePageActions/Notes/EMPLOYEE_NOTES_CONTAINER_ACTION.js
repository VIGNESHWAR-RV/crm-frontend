

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { update } from '../../../Util';

//--- { component imports } -----------------------------------
import { NotesContainer } from '../../../componentContainers/NotesContainer';
//--------------------------------------------------------------

//--- { states and actions imports } ------------------------------------------------
import { EMPLOYEE_NOTES_CONTAINER_INITIALSTATES,
         EMPLOYEE_NOTES_CONTAINER_ACTIONS,
         EMPLOYEE_NOTES_CONTAINER_REDUCER } from '../../../States_Actions_Reducers/Employee/Dashboard Notes/Employee_Notes';
//-----------------------------------------------------------------------------------

export function EMPLOYEE_NOTES_CONTAINER_PAGE_ACTIONS({notesProps={},notesData={}}){

    const { notesUpdatePath="",...otherNotesProps } = notesProps;

    const [states,dispatch] = useReducer(EMPLOYEE_NOTES_CONTAINER_REDUCER,EMPLOYEE_NOTES_CONTAINER_INITIALSTATES);

    const componentMounted = useRef(true);


    useEffect(()=>{
       
        return ()=>{
            componentMounted.current = false;
        }
    },[componentMounted]);

    useEffect(()=>{
        
          if(componentMounted.current){

               if( typeof(notesData) === "string"){
                   dispatch({eventType:EMPLOYEE_NOTES_CONTAINER_ACTIONS.FIRST_TIME_SET,value:notesData});
               }

          }

    },[componentMounted,notesData,dispatch]);
    
    useEffect(()=>{

        if(componentMounted.current){
             if(states.triggerUpdate && notesUpdatePath !== ""){
                 async function updateNotes(fetchData){
                   await update(fetchData);
                   dispatch({eventType:EMPLOYEE_NOTES_CONTAINER_ACTIONS.NOTES_SAVED});
                   return;
                 }
                 updateNotes({path:notesUpdatePath,method:"POST",header:{},body:{notes:states.updatedNotes},role:"employee"})
             }
        }
              //eslint-disable-next-line
    },[componentMounted,notesUpdatePath,states.triggerUpdate]);


    const handleSave=useCallback(()=>{
        dispatch({eventType:EMPLOYEE_NOTES_CONTAINER_ACTIONS.LOADING});
    },[dispatch]);

    const handleClear=useCallback(()=>{
         dispatch({eventType:EMPLOYEE_NOTES_CONTAINER_ACTIONS.CLEAR_NOTES});
    },[dispatch]);

    const handleTextChange=useCallback((e)=>{
         dispatch({eventType:EMPLOYEE_NOTES_CONTAINER_ACTIONS.NOTES_CHANGE,value:e.target.value});
    },[dispatch]);
    

     const notesHandlers = {handleSave,handleClear,handleTextChange}

    return (
        <NotesContainer notesProps={otherNotesProps} notesHandlers={notesHandlers} states={states} />
    )
}
