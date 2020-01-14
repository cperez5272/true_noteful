import React from 'react'
import { withRouter } from 'react-router-dom'
import '../App.css'
import Context from '../Context'

class NoteContainer extends React.Component {

    static contextType = Context

    state = {
        foundNote: {},
        folder: {}
    }

    findNote = () => {
     const foundNote = this.context.notes.find(note => note.id === this.props.match.params.noteId);
     return foundNote
    }

    componentDidMount() {
        const foundNote = this.context.notes.find(note => note.id === this.props.match.params.noteId);
        const foundFolder = this.context.folders.find(folder => folder.id === foundNote.folderId);
        this.setState({ foundNote: foundNote, folder: foundFolder });
        console.log(foundFolder);

        return foundNote === undefined ? this.props.history.push("/") : null;
    }

    deleteNoteRequest(noteId, callback) {
        fetch(`http://localhost:9090/notes/${noteId}`, {method: 'DELETE'})
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
        const note = this.context.notes.find(note => note.id === this.props.match.params.noteId)
        return (
            <div>
                {this.state.folder.name}
                {this.state.foundNote.name}
                {this.state.foundNote.content}
                <button onClick={() => this.props.history.go(-1)}>Go back </button>
                <button onClick={() => this.deleteNoteRequest(note.id, this.context.removeNote)}>Delete</button>
            </div>
        )
    }
}

export default withRouter(NoteContainer)