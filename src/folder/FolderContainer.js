import React from 'react';
import { Link } from "react-router-dom";
import '../App.css'
import Context from '../Context'
import AddNote from '../note/AddNote'
import AddFolder from './AddFolder'

class FolderContainer extends React.Component {

    static contextType = Context

    renderFolderNames = () => {
        return this.context.folders.map(folder => {
          return (
            <Link to={`/folder/${folder.id}`} key={folder.id}>
                <li 
                    onClick={this.context.folderClickHandler} 
                    id={folder.id}
                    className={ folder.id === this.context.currentFolderId ? "active" : null}
                >
                    {folder.name}
                </li>
            </Link>
          )
        })
      }



    render() {
        return (
            <>
                <div className='folder_list'>
                    <ul>
                        {this.renderFolderNames()}
                    </ul>
                    <AddFolder />
                </div>

                <div className='note_list'>
                    <ul>
                        {this.props.renderNoteNames()}
                    </ul>
                    <AddNote />
                </div>
            </>
        )
    }
}

export default FolderContainer