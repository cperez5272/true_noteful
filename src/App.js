import React from 'react';
import './App.css';
import NoteContainer from './note/NoteContainer'
import FolderContainer from './folder/FolderContainer'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Context from './Context'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary'

class App extends React.Component {

  state = {
    folders: [],
    notes: [],
    currentFolderId: 2,
    currentNoteContent: '',
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

  fetchNotes = () => {
    fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
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
    // console.log(this.state.notes);
    const match = this.state.notes.filter(note =>{
      // console.log("FOLDER ID:", this.state.currentFolderId);
      return note.folder_id === this.state.currentFolderId;
    })
    console.log(match)
    return match
  }

  removeNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
    console.log('click!')
  }

  // what you see above and below give you the same results just in different ways.

  deleteNoteRequest(noteId, callback) {
    fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/${noteId}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
          return response.json().then(error => {
              throw error
          });
      }
      callback(noteId); // just run this on success, instead of calling response.json()
  })
  .catch(error => {
      console.log(error);
  });
  }

  renderNoteNames = () => {
    const noteDataTransform = (note) => {
      return (
        <li 
          key={note.id} 
          onClick={() => this.noteClickHandler(note.content)} 
          content={note.content}
        >
          <Link to={`/notes/${note.id}`}>
            {note.name}
          </Link>
          {note.modified} <br />
          <button onClick={() => this.deleteNoteRequest(note.id, this.removeNote)}>Delete</button>
        </li>
      )
    }
    if (this.state.currentFolderId === '') {
      return this.state.notes.map(noteDataTransform)
    } else {
      const filteredNotes = this.filterNotes();
      return filteredNotes.map(noteDataTransform)
    }
  }

  addFolder = (folder) => {
    this.setState({folders: [...this.state.folders, folder]});
  }

  addNote = (note) => {
    this.setState({notes: [...this.state.notes, note]});
  }

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

            <Link to='/'>
              <header>
                <h1 onClick={() => this.setState({ currentFolderId: 0 })}>Noteful</h1>
              </header>
            </Link>

            <Switch>
              <Route exact path="/" render={() => <FolderContainer
                folders={folders}
                clickHandler={this.folderClickHandler}
                renderNoteNames={this.renderNoteNames}
                addFolder={this.addFolder}
              />}
              />
              <Route path='/folder/:folderId' render={() => <FolderContainer
                folders={folders}
                clickHandler={this.folderClickHandler}
                renderNoteNames={this.renderNoteNames}
                currentFolderId={currentFolderId}
                addFolder={this.addFolder}
                addNote={this.addNote}
              />}
              />
              <Route path='/notes/:noteId' render={() => <NoteContainer
                notes={notes}
                folders={folders}
              />}
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