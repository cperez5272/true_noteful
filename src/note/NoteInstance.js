import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components'

const NoteInstance = (props) => {

  const { note } = props;

  const deleteNoteRequest = async (noteId) => {
    const response = await fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/${noteId}`, { method: 'DELETE' }); 
    if (!response.ok) {
      console.log(response); 
      throw response;
    }  
  }

  return (
    <NoteInstanceContainer className="note-instance">
      <StyledLink to={`/notes/${note.id}`} > {note.name} </StyledLink>
    </NoteInstanceContainer>
  )
}

export default withRouter(NoteInstance);

const NoteInstanceContainer = styled.div`
  padding: 20px; 
  margin-top: 10px; 
  border: 5px solid #EF476F; 
  color: #EF476F; 
  width: 90%; 
  border-radius: 4px; 
`

const StyledLink = styled(Link)`
  text-decoration: none; 
  color: #FFD166; 
  font-size: 18px; 
  font-weight: bold; 
`
