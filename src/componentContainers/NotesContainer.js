
import { useContext } from 'react';
import CardContent from '@mui/material/CardContent';
import { context } from '../App';
import { CardComponent } from '../BasicComponents/CardComponent';
import { BoxComponent } from '../BasicComponents/BoxComponent';
import { FabComponent } from '../BasicComponents/FabComponent';
import { SkeletonComponent } from '../BasicComponents/SkeletonComponent';



export function NotesContainer({notesProps={},notesHandlers={},states={}}){

    const { notesOuterCard={},notesHeadingButtonBox={},notesButtonBox={},notesSaveButton="",notesClearButton="",notesButtonSkeleton={},notesTextAreaSkeleton={} } = notesProps;

    const {handleSave="", handleClear="", handleTextChange="" } = notesHandlers;

    const {mode} = useContext(context);

    

    return(
        <>
             {( typeof(states.updatedNotes) === "string")
                   ?<CardComponent props={{...notesOuterCard}}>
                    <CardContent>
                        <BoxComponent props={{...notesHeadingButtonBox}}>
                            <h1 style={{margin:"1%",color:"dodgerblue"}}><i>My Notes</i></h1>
                            <BoxComponent props={{...notesButtonBox}}>
                                
                                {(handleSave !== "" && states.initialNotes !== states.updatedNotes)
                                  ?<FabComponent props={{...notesSaveButton,isDisabled:states.isSaveDisabled,onClick:handleSave}} />
                                  :""}

                               {(handleClear !== "")
                                  ? <FabComponent props={{...notesClearButton,isDisabled:states.isClearDisabled,onClick:handleClear}} />
                                  :""}
                            </BoxComponent>
                        </BoxComponent>

                        {(handleTextChange !== "")
                               ? <textarea className='textArea' 
                                           title="notes" 
                                           style={{color:(mode)?"white":"black"}} 
                                           placeholder="Add your Quick Notes here..."
                                           disabled={states.isNotesDisabled}
                                           value={states.updatedNotes} onChange={handleTextChange}>
                                 </textarea>
                               :""}

                    </CardContent>
                    </CardComponent>
                   :<CardComponent props={{...notesOuterCard}} >
                    <CardContent>
                         <BoxComponent props={{...notesHeadingButtonBox}}>
                               <h1 style={{margin:"1%",color:"dodgerblue"}}><i>My Notes</i></h1>
                               <BoxComponent props={{...notesButtonBox}}>
                                   <SkeletonComponent props={{...notesButtonSkeleton}} />
                                   <SkeletonComponent props={{...notesButtonSkeleton}} />
                               </BoxComponent>
                         </BoxComponent>
                         <SkeletonComponent props={{...notesTextAreaSkeleton}} />
                    </CardContent>
                   </CardComponent>}
        </>
    )
}