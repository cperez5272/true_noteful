import React, { Component } from 'react'
import FolderContainer from './folder/FolderContainer';
import AllNotes from './note/AllNotes';

const HomeContainer = (props) => {
  console.log(props)

  return (
    <>
      <FolderContainer 
        appProps={props}
      />
      <AllNotes appProps={props}/>
    </>
  )
}

export default HomeContainer;
