import React from 'react'
import { withRouter } from 'react-router-dom'
import '../App.css'
import Context from '../Context'

class NoteContainer extends React.Component {

    static contextType = Context

    state = {
        folder: {}
    }

    deleteNoteRequest(noteId, callback) {
        fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/${noteId}`, {method: 'DELETE'})
            .then(response => {
                if(!response.ok) {
                    return response.json().then(error => {
                        throw error
                    })
                }
                return response.json()
            })
            .then(data => {
                callback(noteId)
            })
            .then(this.props.history.push('/'))
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const foundNote = this.context.notes.find(note => note.id === this.props.match.params.noteId);
        const note = this.context.notes.find(note => note.id === this.props.match.params.noteId)
        
        if (note === undefined) {
            return (<div>Note not found</div>)
        }

        const foundFolder = this.context.folders.find(folder => folder.id === foundNote.folderId);

        if (foundFolder === undefined) {
            return (<div>Note not found</div>)
        }
    }
}

export default withRouter(NoteContainer)