import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'
import '../App.css';
import './note.css';
import Context from '../Context'

class AddNote extends React.Component {

    static contextType = Context

    state = {
        showForm: false,
        noteName: '',
        noteContent: '',
        folderIdValue: 1
    }

    postNoteRequest = async () => {
        try {
            const { noteName, noteContent, } = this.state;
            const folderValue = this.state.folderIdValue
            const d = new Date().toISOString();
            const obj = {
                name: noteName, 
                content: noteContent, 
                modified: d, 
                folder_id: folderValue
            }
            console.log(obj);
            const response = await fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            const json = await response.json();
            this.props.addNewNote(json);
            this.setState({
                noteName: "", 
                noteContent: "", 
                folderIdValue: ""
            })
            console.log(json);
        } catch (error) {
            console.log(error);
        }
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
    }

    changeHandler = (event) => {
        this.setState({folderIdValue: parseInt(event.target.value)});
    }

    pathToFolder = () => {
        return (
            <div>
                <label>Pick a folder</label>
                <select value={this.state.folderIdValue} onChange={this.changeHandler}>
                    {this.context.folders.map(folder => {
                        return(      
                            <option
                                key={folder.id} 
                                value={folder.id}
                            >
                                {folder.name}
                            </option>
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
            <>
                <form onSubmit = {event => this.handleFormSubmit(event)}>
                    <h2>Note Form</h2>
                    <div>
                        <label>Name:</label>
                        <input type='text' name='noteName' value={this.state.noteName} onChange={this.updateNote}/>
                        {this.state.showForm && (<ValidationError message={this.validateNewNote()}/>)}
                        <textarea type='text' name='noteContent' value={this.state.noteContent} onChange={this.updateNote}/>
                        <button disabled={this.validateNewNote()} type='submit' onClick={this.postNoteRequest}>Click</button>
                        {this.pathToFolder()}
                    </div>
                </form>
            </>
        )
    }

    render() {
        return (
            <div className="add-note-form">
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