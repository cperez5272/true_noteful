import React from 'react'
import { withRouter } from 'react-router-dom'
import '../App.css'
import Context from '../Context'

class NoteContainer extends React.Component {

    static contextType = Context

    state = {
        folder: {}, 
        note: {}
    }

    componentDidMount() {
        const noteId = this.props.match.params.noteId;
        const foundNote = this.props.notes.find(note => parseInt(note.id) === parseInt(noteId));
        if (foundNote) {
            this.setState({note: foundNote});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.notes !== this.props.notes) {
            const noteId = this.props.match.params.noteId;
            const foundNote = this.props.notes.find(note => parseInt(note.id) === parseInt(noteId));
            this.setState({note: foundNote});
        }    
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
        console.log(this.state.note);
        if (!this.state.note.name) return <></>
        return (
            <>
                <p> { this.state.note.name} </p>
                <p> {this.state.note.content} </p>
            </>
        )
    }
}

export default withRouter(NoteContainer)