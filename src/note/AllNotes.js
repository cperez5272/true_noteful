import React from 'react';
import NoteInstance from './NoteInstance';
import styled from 'styled-components';

const AllNotes = (props) => {
  
  const renderNotes = () => {
    return props.appProps.notes.map(note => <NoteInstance key={note.id} note={note} />);
  }

  return (
    <>
      { props.appProps.notes.length > 0 && 
        <RenderedNotesContainer className="allNotes">
          { renderNotes() }
        </RenderedNotesContainer>
      }
    </>
  )
}


export default AllNotes; 

const RenderedNotesContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    width: 50%;  
    align-items: center;
`



