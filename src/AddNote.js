import React from 'react'
import ValidationError from './ValidationError'

class AddNote extends React.Component {
    constructor () {
        super()
        this.state = {
            showForm: false,
            noteName: ''
        }
    }

    postNoteRequest(folderId, callback) {
        fetch(`http://localhost:9090/notes`, { method: 'POST' })
          .then(response => {
            if (!response.ok) {
              return response.json().then(error => {
                throw error
              })
            }
            return response.json()
          })
          .then(data => {
            // callback(folderId)
          })
          .catch(error => {
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

    FormHandler = () => {
        this.setState ({
            showForm: !this.state.showForm
        })
    }

    updateNote = (name) => {
        this.setState ({
            noteName: name
        })
    }

    validateNewNote() {
        const name = this.state.noteName.trim();
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        console.log('Name: ', this.state.noteName)
    }

    hiddenForm = () => {
        return(
            <div>
                <form onSubmit = {event => this.handleFormSubmit(event)}>
                    <h2>Note Form</h2>
                    <div>
                        <label>Name:</label>
                        <input type='text' onChange={ event => this.updateNote(event.target.value)}/>
                        {this.state.showForm && (<ValidationError message={this.validateNewNote()}/>)}
                        <button type= 'submit' disabled= {this.validateNewNote()} onClick={() => this.postNoteRequest(this.addNote)}>Click</button>
                    </div>
                </form>
            </div>
        )
    }

    surpiseForm = () => {
        if(this.state.showForm) {
            return this.hiddenForm()
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.FormHandler}>Click For New Note</button>
                {this.surpiseForm()}
            </div>
        )
    }
}

export default AddNote