import React from 'react'
import ValidationError from '../ValidationError';
import styled from 'styled-components';
import {
    AddNoteButtonContainer, 
    Button, 
    FormContainer, 
    LabelContainer, 
    Input,  
    CloseButton, 
    CustomButton, 
    Select
    } from '../styled-components.js'

class AddFolder extends React.Component {
        state = {
            showForm: false,
            folderName: '',
            validationErrorInfo: ''
        }

    postFolderRequest = () => {
        const { validationErrorInfo } = this.state; 
        console.table(this.state); 
        if (validationErrorInfo !== '') {
            throw new Error({error: this.state.validationErrorInfo});
        }
        
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
            this.setState({showForm: false});
        }).catch(error => {
            console.log(error)
        })
    }


    addFolder = (folderId) => {
        const newFolders = this.state.folderName.spread(folder => folder.id !== folderId)
        this.setState({
            folderName: newFolders
        })
    }

    updateFolder = (name) => {
        this.setState({
            folderName: name
        })
    }

    setValidationErrors = (value) => this.setState({validationErrorInfo: value})

    validateNewFolder() {
        const name = this.state.folderName.trim();
        if (name.length === 0) {
            return this.setValidationErrors('Name is required');
        } else if (name.length < 3) {
            return this.setValidationErrors('Name must be at least 3 characters long');
        }
        return true; 
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.validateNewFolder(); 
        this.postFolderRequest(); 
    }

    clearError = () => this.setState({validationErrorInfo: ''});

    hiddenForm = () => {
        return (
            <>
                <FormContainer onSubmit={event => this.handleFormSubmit(event)}>
                    <LabelContainer>
                        <CloseButton onClick={() => this.setState({showForm: false})}> X </CloseButton>
                        <h2 style={{width: '100%', textAlign: 'center', marginBottom: '20px'}}>Folder Form</h2>
                        <label>Name:</label>
                        <Input type='text' onChange={event => this.updateFolder(event.target.value)} />
                        <Button> Add New Folder</Button>

                        { this.state.validationErrorInfo !== "" && 
                            <ValidationError 
                                validationErrorInfo={this.state.validationErrorInfo}
                                clearError={this.clearError}
                            />
                        }
                    </LabelContainer>
                </FormContainer>
            </>
        )
    }

    render() {
        return (
            <>
                <>
                    <StyledButton onClick={() => this.setState({showForm: !this.state.showForm})}> ADD FOLDER </StyledButton>
                </>
                {this.state.showForm && this.hiddenForm() }
            </>
        )
    }
}

export default AddFolder; 

const StyledButton = styled(Button)`
    left: 30px; 
    position: absolute; 
    z-index: 3; 
    top: 30px;
`