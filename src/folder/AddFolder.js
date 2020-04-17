import React from 'react'
import ValidationError from '../ValidationError'

class AddFolder extends React.Component {
    constructor() {
        super()
        this.state = {
            showForm: false,
            folderName: '',
        }
    }
$
    postFolderRequest = () => {
        fetch(`${process.env.REACT_APP_NOTEFUL_API}/folders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: this.state.folderName})
        }).then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        }).then(data => {
            this.props.addFolder(data);
        }).catch(error => {
            console.log(error)
        })
    }


    addFolder = (folderId) => {
        const newFolders = this.state.folderName.spread(folder => folder.id !== folderId)
        this.setState({
            folderName: newFolders
        })
        console.log('click!')
    }

    FormHandler = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    updateFolder = (name) => {
        this.setState({
            folderName: name
        })
    }

    validateNewFolder() {
        const name = this.state.folderName.trim();
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
    }

    hiddenForm = () => {
        return (
            <div>
                <form onSubmit={event => this.handleFormSubmit(event)}>
                    <h2>Folder Form</h2>
                    <div>
                        <label>Name:</label>
                        <input type='text' onChange={event => this.updateFolder(event.target.value)} />
                        {this.state.showForm && (<ValidationError message={this.validateNewFolder()} />)}
                        <button type='submit' disabled={this.validateNewFolder()} onClick={() => this.postFolderRequest(this.addFolder)}>Add New Folder</button>
                    </div>
                </form>
            </div>
        )
    }

    surpiseForm = () => {
        if (this.state.showForm) {
            return this.hiddenForm()
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.FormHandler}>Click For New Folder</button>
                {this.surpiseForm()}
            </div>
        )
    }
}

export default AddFolder