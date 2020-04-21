import React from 'react';
import './App.css';
import NoteContainer from './note/NoteContainer'
import FolderContainer from './folder/FolderContainer'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components';
import Context from './Context'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary';
import HomeContainer from './HomeContainer';
import NoteInstance from './note/NoteInstance';

console.log('its over? ;c')
class App extends React.Component {

  state = {
    folders: [],
    notes: [],
    currentFolderId: '',
    currentNoteContent: '',
    index: 0
  }

  componentDidMount = () => {
    fetch(`${process.env.REACT_APP_NOTEFUL_API}/folders`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          folders: data
        })
      })
    this.fetchNotes()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.fetchNotes();
    }
  }

  fetchNotes = () => {
    fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          notes: data
        })
      })
  }

  folderClickHandler = (id) => {
    this.setState({ currentFolderId: id })
  }
  
  noteClickHandler = (content) => {
    this.setState({
      currentNoteContent: content
    })
  }

  filterNotes = () => {
    const match = this.state.notes.filter(note =>{
      return note.folder_id === this.state.currentFolderId;
    })
    return match
  }

  removeNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }
 
  // what you see above and below give you the same results just in different ways.

  renderNoteNames = () => {
    console.log(this.state.notes);
    if (this.state.currentFolderId === '') {
      return this.state.notes.map(note => <NoteInstance key={note.id} note={note} deleteNoteRequest={this.deleteNoteRequest}/>)
    } else {
      const filteredNotes = this.filterNotes();
      return filteredNotes.map(note => <NoteInstance key={note.id} note={note} deleteNoteRequest={this.deleteNoteRequest}/>)
    }
  }

  addFolder = (folder) => {
    this.setState({folders: [...this.state.folders, folder]});
  }

  addNewNote = (note) => {
    this.setState({notes: [...this.state.notes, note]});
  }

  updateIndex = () => this.setState({index: this.state.index + 1});

  render() {
    const { folders, notes, currentFolderId } = this.state;

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      currentFolderId: this.state.currentFolderId,
      currentNoteContent: this.state.currentNoteContent,
      folderClickHandler: this.folderClickHandler,
      renderNoteNames: this.renderNoteNames,
      removeNote: this.removeNote,
    }

    return (
      <ErrorBoundary>
      <Context.Provider value={contextValue}>
        <Router>
          <div className="App">

              <header style={{backgroundColor: '#EF476F', marginBottom: '20px'}}>
                <Link to='/' style={{textDecoration: 'none'}}>
                  <StyledHeader onClick={() => this.setState({ currentFolderId: '' })}>Noteful</StyledHeader>
                </Link>
              </header>

            <Switch>
              <Route 
                exact 
                path="/" 
                render={() => 
                  <FolderContainer
                    folders={folders}
                    clickHandler={this.folderClickHandler}
                    renderNoteNames={this.renderNoteNames}
                    addFolder={this.addFolder}
                    addNewNote={this.addNewNote}
                    notes={this.state.notes}
                  />
                }
              />

              <Route 
                path='/folder/:folderId' 
                render={() => 
                  <FolderContainer
                    folders={folders}
                    clickHandler={this.folderClickHandler}
                    renderNoteNames={this.renderNoteNames}
                    currentFolderId={currentFolderId}
                    addFolder={this.addFolder}
                    addNewNote={this.addNewNote}
                  />
                }
              />

              <Route 
                path='/notes/:noteId' 
                render={() => 
                  <NoteContainer
                    notes={this.state.notes}
                    folders={this.state.folders}
                    addNewNote={this.addNewNote}
                    updateIndex={this.updateIndex}
                  />
                }
              />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
      </ErrorBoundary>
    );

  }
  
}

App.propTypes = {
    renderNoteNames: PropTypes.func
}

export default App;

const StyledHeader = styled.h1`
  color: #235789; 
  height: 100px; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  color: #F4F7F9; 
  font-family: "Montserrat", sans-serif; 
`