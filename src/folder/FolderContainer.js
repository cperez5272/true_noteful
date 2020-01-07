import React from 'react'
import '../App.css'

class FolderContainer extends React.Component {

    render() {
        return (
            <div className='folder_list'>
                <ul>
                    {this.props.renderFolderNames}
                </ul>
            </div>
        )
    }
}

export default FolderContainer