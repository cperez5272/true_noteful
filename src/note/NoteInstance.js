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
    <StyledLink to={`/notes/${note.id}`}> 
      <NoteInstanceContainer className="note-instance">
          <img src="/iconmonstr-note-14.svg" />
          {note.name} 
      </NoteInstanceContainer>
    </StyledLink>
  )
}

export default withRouter(NoteInstance);

const StyledLink = styled(Link)`
  text-decoration: none; 
  font-size: 20px; 
  font-weight: bold; 
  width: 90%; 
  background-color: #F4F7F9; 
  padding: 20px 50px; 
  border-radius: 4px; 
  margin-top: 10px; 

  :hover {
    border: 1px solid #235789;
    background-color: #F4F7F9;
  }
`

const NoteInstanceContainer = styled.div`
  margin-top: 10px; 
  color: #EF476F; 
  color: #235789; 
  display: flex; 
  justify-content: space-between;
`