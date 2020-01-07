import React from 'react';
import { Link } from "react-router-dom";
import '../App.css'

class FolderContainer extends React.Component {

    renderFolderNames = () => {
        return this.props.folders.map(folder => {
          return (
            <Link to={`/folder/${folder.id}`} key={folder.id}>
                <li 
                    onClick={this.props.clickHandler} 
                    id={folder.id}
                    className={ folder.id === this.props.currentFolderId ? "active" : null}
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
                </div>

                <div className='note_list'>
                    <ul>
                        {this.props.renderNoteNames()}
                    </ul>
                </div>
            </>
        )
    }
}

export default FolderContainer