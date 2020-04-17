import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './note.css';

const NoteInstance = (props) => {

  const { note } = props;

  const deleteNoteRequest = async (noteId) => {
    const response = await fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/${noteId}`, { method: 'DELETE' }); 
    if (!response.ok) {
      console.log(response); 
      throw response;
    }  
  }

  console.log(props)
  return (
    <div className="note-instance">
      <Link to={`/notes/${note.id}`}>  <p> {note.name} </p> </Link>
    </div>
  )
}

export default withRouter(NoteInstance);

