import React from 'react'
import { withRouter } from 'react-router-dom'
import '../App.css'

class NoteContainer extends React.Component {

    state = {
        foundNote: {}, 
        folder: {}
    }

    componentDidMount() {
        const foundNote = this.props.notes.find(note => note.id === this.props.match.params.noteId);
        const foundFolder = this.props.folders.find(folder => folder.id === foundNote.folderId); 
        this.setState({foundNote: foundNote, folder: foundFolder});
        console.log(foundFolder);

        return foundNote === undefined ? this.props.history.push("/") : null;
    }

    render() {
        return(
            <div>
                {this.state.folder.name}
                {this.state.foundNote.name}
                {this.state.foundNote.content}
                <button onClick={() => this.props.history.go(-1)}>Go back </button>
            </div>
        )
    }
}

export default withRouter(NoteContainer)