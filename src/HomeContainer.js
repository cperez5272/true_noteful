import React, { Component } from 'react';
import FolderContainer from './folder/FolderContainer';
import AllNotes from './note/AllNotes';
import styled from 'styled-components';

const HomeContainer = (props) => {
  console.log(props)

  return (
    <Container className="homeContainer">
    
      <FolderContainer appProps={props}/>
      <AllNotes appProps={props}/>

    </Container>
  )
}

export default HomeContainer;

const Container = styled.div`
  display: flex; 
  width: 100vw; 
  padding: 20px; 
`