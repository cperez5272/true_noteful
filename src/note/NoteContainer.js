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

    deleteNoteRequest = async (callback) => {
        const noteId = this.props.match.params.noteId; 
        const response = await fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/${noteId}`, {method: 'DELETE'}); 
        console.log(response);
        this.props.updateIndex();
        return this.props.history.push("/");
    }


    render() {  

        if (!this.state.note.name) return <></>
        return (
            <>
                <p> { this.state.note.name} </p>
                <p> {this.state.note.content } </p>
                <p> { this.state.note.modified } </p>
                <button onClick={this.deleteNoteRequest}> DELETE </button>
            </>
        )
    }
}

export default withRouter(NoteContainer); 

