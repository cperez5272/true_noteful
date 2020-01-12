import React from 'react'
import ValidationError from './ValidationError'


class AddFolder extends React.Component {
    constructor () {
        super()
        this.state = {
            showForm: false,
            folderName: ''
        }
    }

    FormHandler = () => {
        this.setState ({
            showForm: !this.state.showForm
        })
    }

    updateFolder = (name) => {
        this.setState ({
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
        console.log('click')
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { name } = this.state
        console.log('Name: ', name.folderName)
        
    }

    hiddenForm = () => {
        return(
            <div>
                <form onSubmit = {event => this.handleFormSubmit(event)}>
                    <h2>Folder Form</h2>
                    <div>
                        <label>Name:</label>
                        <input type='text' onChange={ event => this.updateFolder(event.target.folderName)}/>
                        {this.state.showForm && (<ValidationError message={this.validateNewFolder()}/>)}
                        <button type= 'submit' disabled= {this.validateNewFolder()}>Click</button>
                    </div>
                </form>
            </div>
        )
    }

    surpiseForm = () => {
        if(this.state.showForm) {
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