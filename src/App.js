import React from 'react';
import './App.css';
import NoteContainer from './note/NoteContainer'
import FolderContainer from './folder/FolderContainer'
import StoreData from './DummyStore'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {

    state= {
      folders: [],
      notes: [],
    }

    componentDidMount = () => {
      this.setState ({
        folders: StoreData.folders,
        notes: StoreData.notes
      })
    }

    renderFolder = () => {
      StoreData.folders.map(folder => {
        return <FolderContainer key={folder.id} />
      })
    }


  render() {

    console.log('test here')
    console.log(this.renderFolder())
    return (
      <Router>
        <div className="App">
          <Link to='/'>
            <header>
              <h1>Noteful</h1>
            </header>
          </Link>
          <Switch>
            <Route path='/folders' render={() => <FolderContainer folders={this.renderFolder()}/>} />
            <Route path='/notes' component={NoteContainer} />
          </Switch>
        </div>
      </Router>
    );

  }
}


export default App;
