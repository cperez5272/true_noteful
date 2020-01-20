import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'
import '../App.css';
import Context from '../Context'

class AddNote extends React.Component {

    static contextType = Context

    state = {
        showForm: false,
        noteName: '',
        noteContent: '',
        value: ''
    }

    postNoteRequest = () => {
        const { noteName, noteContent, } = this.state;
        const d = new Date().toISOString();
        const obj = {
            name: noteName, 
            content: noteContent, 
            modified: d, 
            folderId: this.state.value
        }
        console.log(obj);
        fetch(`http://localhost:9090/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        }).then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        }).then(data => {
            this.props.addNote(data);
        }).catch(error => {
            console.log(error)
        })
    }

      addNote = (noteId) => {
        const newNotes = this.state.folderName.spread(note => note.id !== noteId)
        this.setState({
          noteName: newNotes
        })
        console.log('click!')
      }

    renderForm = () => {
        this.setState ({
            showForm: !this.state.showForm
        })
    }

    updateNote = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    validateNewNote() {
        const name = this.state.noteName.trim();
        const info = this.state.noteContent.trim()
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        } else if (info.length === 0) {
            return 'Please provide info'
        } else if (info.length < 3) {
            return 'Your info should be at least 3 characters long'
        }

        // <label>Pick a folder</label>
        // <select>
        //     <option>Fight</option>
        //     <option>Run</option>
        //     <option>Pay</option>
        // </select>
    }

    changeHandler = (event) => {
        this.setState({value: event.target.value})
    }

    pathToFolder = () => {
        return (
            <div>
                <label>Pick a folder</label>
                <select value={this.state.value} onChange={this.changeHandler}>
                    {this.context.folders.map(folder => {
                        console.log(folder)
                        return(      
                            <option key={folder.id} value={folder.id}>{folder.name}</option>
                        )
                    })}
                </select>
            </div>
        )
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        console.log('Name: ', this.state.noteName)
    }

    noteForm = () => {
        return(
            <div>
                <form onSubmit = {event => this.handleFormSubmit(event)}>
                    <h2>Note Form</h2>
                    <div>
                        <label>Name:</label>
                        <input type='text' name='noteName' value={this.state.noteName} onChange={this.updateNote}/>
                        {this.state.showForm && (<ValidationError message={this.validateNewNote()}/>)}
                        <textarea type='text' name='noteContent' value={this.state.noteContent} onChange={this.updateNote}/>
                        <button disabled={this.validateNewNote()} type='submit' onClick={() => this.postNoteRequest(this.addNote)}>Click</button>
                        {this.pathToFolder()}
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.renderForm}> {!this.state.showForm ? 'show form' : 'remove form'} </button>
                {this.state.showForm ? this.noteForm() : null }
            </div>
        )
    }
}

export default withRouter(AddNote);

AddNote.propTypes = {
    noteName: PropTypes.string, 
    noteContent: PropTypes.string, 
    showForm: PropTypes.bool,
};
