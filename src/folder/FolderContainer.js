import React from 'react'
import '../App.css'

class FolderContainer extends React.Component {
    render() {
        
        return (
            <div>
                <h1>I am folder</h1>
                <ul>
                    {this.props.folders}
                </ul>
            </div>
        )
    }
}

export default FolderContainer