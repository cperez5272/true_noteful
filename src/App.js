import React from 'react';
import './App.css';
import NoteContainer from './note/NoteContainer'
import FolderContainer from './folder/FolderContainer'
import StoreData from './DummyStore'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {

  state = {
    folders: [],
    notes: [],
    currentFolderId: '',
    currentNoteContent: '',
  }

  componentDidMount = () => {
    this.setState({
      folders: StoreData.folders,
      notes: StoreData.notes
    })
  }

  folderClickHandler = (event) => {
    this.setState({
      currentFolderId: event.target.id,
    })
    console.log(this.state.currentFolderName);

  }

  noteClickHandler = (content) => {
    this.setState({
      currentNoteContent: content
    })
  }

  filterNotes = () => {
    const match = this.state.notes.filter(note => note.folderId === this.state.currentFolderId)
    return match
  }

  // what you see above and below give you the same results just in different ways.

  renderNoteNames = () => {
    const noteDataTransform = (note) => {
      return (
        <li key={note.id} onClick={() => this.noteClickHandler(note.content)} content={note.content}>
          <Link to={`/notes/${note.id}`}>
            {note.name}
          </Link>
          {note.modified} <br />
          <button>Delete</button>
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

  render() {

    const { folders, notes, currentFolderName } = this.state;

    return (
      <Router>
        <div className="App">

          <Link to='/'>
            <header>
              <h1>Noteful</h1>
            </header>
          </Link>

          <Switch>
            <Route path='/folders' render={() => 
              <FolderContainer 
                folders={folders} 
                clickHandler={this.folderClickHandler}
                renderNoteNames={this.renderNoteNames}
              />} 
            />
            <Route path='/notes/:noteId' render={() => <NoteContainer notes={this.state.notes} />} />
          </Switch>
        </div>
      </Router>
    );

  }
}

export default App;
