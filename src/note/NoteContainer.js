import React from 'react'
import { withRouter } from 'react-router-dom'
import '../App.css'

class NoteContainer extends React.Component {

    state = {
        foundNote: {}
    }
    findNote = () => {
        const foundNote = this.props.notes.find(note => note.id === this.props.match.params.noteId)
        this.setState({foundNote})
        console.log(this.props)
    }
    render() {
        return(
            <div>
                {this.state.foundNote.name}
            </div>
        )
    }
}

export default withRouter(NoteContainer)