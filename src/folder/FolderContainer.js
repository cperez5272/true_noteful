import React from 'react'
import '../App.css'

class FolderContainer extends React.Component {

    renderFolderNames = () => {
        return this.props.folders.map(folder => {
          return (
            <li key={folder.id} onClick={this.props.clickHandler} id={folder.id}>
              {folder.name}
            </li>
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