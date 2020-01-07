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
    console.log(event.target.id)
    this.setState({
      currentFolderId: event.target.id
    })
  }

  noteClickHandler = (content) => {
    console.log(content)
    this.setState ({
      currentNoteContent: content
    })
  }

  filterNotes = () => {
    const match = this.state.notes.filter(note => note.folderId === this.state.currentFolderId)
    return match
  }

  renderFolderNames = () => {
    return this.state.folders.map(folder => {
      return (
        <li key={folder.id} onClick={this.folderClickHandler} id={folder.id}>
          {folder.name}
        </li>
      )
    })
  }

  // what you see above and below give you the same results just in different ways.

  renderNoteNames = () => {
    const noteDataTransform = (note) => {
      return (
        <li key={note.id} onClick={() => this.noteClickHandler(note.content)} content={note.content}>
          {note.name}<br />
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

    console.log()
    console.log('testing')
    return (
      <Router>
        <div className="App">

          <Link to='/'>
            <header>
              <h1>Noteful</h1>
            </header>
          </Link>

          <div className='folder_list'>
            <ul>
                {this.renderFolderNames()}
            </ul>
          </div>

          <div className='note_list'>
            <ul>    
                {this.renderNoteNames()}
            </ul>
          </div>

          <Switch>
            <Route path='/folders' render={() => <FolderContainer renderFolderNames={this.renderFolderNames()} />} />
            <Route path='/notes/:noteId' component={NoteContainer} />
          </Switch>
        </div>
      </Router>
    );

  }
}

export default App;
