import { useCallback, useEffect, useReducer, useRef } from 'react';
import { update } from '../../../Util';

//--- { component imports } -----------------------------------
import { NotesContainer } from '../../../componentContainers/NotesContainer';
//--------------------------------------------------------------

//--- { states and actions imports } ------------------------------------------------
import { ADMIN_NOTES_CONTAINER_INITIALSTATES,ADMIN_NOTES_CONTAINER_ACTIONS,ADMIN_NOTES_CONTAINER_REDUCER } from '../../../States_Actions_Reducers/Admin/Dashboard Notes/Admin_Notes';
//-----------------------------------------------------------------------------------

export function ADMIN_NOTES_CONTAINER_ACTION({notesProps={},notesData=null}){

    const { notesUpdatePath="",...otherNotesProps } = notesProps;

    const [states,dispatch] = useReducer(ADMIN_NOTES_CONTAINER_REDUCER,ADMIN_NOTES_CONTAINER_INITIALSTATES);

    const componentMounted = useRef(true);


    useEffect(()=>{
       
        return ()=>{
            componentMounted.current = false;
        }
    },[componentMounted]);

    useEffect(()=>{
          
          if(componentMounted.current){
                dispatch({eventType:ADMIN_NOTES_CONTAINER_ACTIONS.FIRST_TIME_SET,value:notesData});
          }

    },[componentMounted,notesData,dispatch]);
    
    useEffect(()=>{

        if(componentMounted.current){
             if(states.triggerUpdate && notesUpdatePath !== ""){
                 async function updateNotes(fetchData){
                   await update(fetchData);
                   dispatch({eventType:ADMIN_NOTES_CONTAINER_ACTIONS.NOTES_SAVED});
                   return;
                 }
                 updateNotes({path:notesUpdatePath,method:"POST",header:{},body:{notes:states.updatedNotes},role:"admin"})
             }
        }
            //eslint-disable-next-line
    },[]);


    const handleSave=useCallback(()=>{
        dispatch({eventType:ADMIN_NOTES_CONTAINER_ACTIONS.LOADING});
    },[dispatch]);

    const handleClear=useCallback(()=>{
         dispatch({eventType:ADMIN_NOTES_CONTAINER_ACTIONS.CLEAR_NOTES});
    },[dispatch]);

    const handleTextChange=useCallback((e)=>{
         dispatch({eventType:ADMIN_NOTES_CONTAINER_ACTIONS.NOTES_CHANGE,value:e.target.value});
    },[dispatch]);
    

    const notesHandlers = {handleSave,handleClear,handleTextChange}

    return (
        <NotesContainer notesProps={otherNotesProps} notesHandlers={notesHandlers} states={states} />
    )
}
