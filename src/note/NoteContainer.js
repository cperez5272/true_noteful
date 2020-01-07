import React from 'react'
import '../App.css'

class NoteContainer extends React.Component {
    render() {
        return(
            <div>
                {this.props.match.params.noteId}
            </div>
        )
    }
}

export default NoteContainer