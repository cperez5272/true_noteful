import React from 'react';
import './App.css';
import NoteContainer from './note/NoteContainer'
import FolderContainer from './folder/FolderContainer'
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {

  title = () => {
    return (
      <header>
        <h1>Noteful</h1>
      </header>
    )
  }


  render() {


    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={this.title}/>
            <Route path='/folders' render={() => <FolderContainer title={this.title} /> } />
            {/* <Route path='/folders' component={FolderContainer} /> */}
            <Route path='/notes' component={NoteContainer} />
          </Switch>

        </div>
      </Router>
    );

  }
}


export default App;
