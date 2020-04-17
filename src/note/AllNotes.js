import React from 'react';
import NoteInstance from './NoteInstance';

const AllNotes = (props) => {
  
  const renderNotes = () => {
    return props.appProps.notes.map(note => <NoteInstance key={note.id} note={note} />);
  }

  return (
    <div>
      { props.appProps.notes.length > 0 && renderNotes() }
    </div>
  )
}


export default AllNotes; 



