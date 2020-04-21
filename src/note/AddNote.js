import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'
import '../App.css';
import './note.css';
import Context from '../Context'
import {
    AddNoteButtonContainer, 
    Button, 
    FormContainer, 
    LabelContainer, 
    Input, 
    TextArea, 
    CloseButton, 
    CustomButton, 
    Select
    } from '../styled-components.js'

class AddNote extends React.Component {

    static contextType = Context

    state = {
        showForm: false,
        noteName: '',
        noteContent: '',
        folderIdValue: "DEFAULT", 
        validationErrorInfo: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.showForm === true && this.state.showForm === false) {
            this.setState({validationErrorInfo: '', noteName: '', noteContent: ''});
        }
    }

    postNoteRequest = async () => {
        try {
            const { noteName, noteContent, validationErrorInfo } = this.state;
            const folderIdValue = this.state.folderIdValue
            if (validationErrorInfo !== '') {
                return; 
            } 
            const d = new Date().toISOString();
            const obj = {
                name: noteName, 
                content: noteContent, 
                modified: d, 
                folder_id: folderIdValue
            }
            const response = await fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })
            const json = await response.json();
            console.log(json);
            this.setState({
                noteName: "", 
                noteContent: "", 
                folderIdValue: "DEFAULT"
            }, () => console.log(this.state));
            this.props.addNewNote(json);
        } catch (error) {
            console.log(error);
        }
    }

    renderForm = () => {
        console.log(`%c ${this.state.showForm}`, 'background-color: green; color: white;');
        this.setState ({
            showForm: !this.state.showForm
        })
    }

    updateNote = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    setValidationErrors (value) {
        this.setState({validationErrorInfo: value});
    }

    clearError = () => this.setState({validationErrorInfo: ""});

    validateNewNote() {
        const name = this.state.noteName.trim();
        const info = this.state.noteContent.trim(); 
        if (name.length === 0) {
            return this.setValidationErrors('Name is required');
        } else if (name.length < 3 || name.length > 20) {
            return this.setValidationErrors('Name must be between 3 and 20 characters long');
        } else if (info.length === 0) {
            return this.setValidationErrors('Please provide info');
        } else if (info.length < 3) {
            return this.setValidationErrors('Your info should be at least 3 characters long');
        } else if (this.state.folderIdValue === "DEFAULT") {
            return this.setValidationErrors('Please select a folder');
        }
        return true;
    }

    changeHandler = (event) => {
        this.setState({folderIdValue: parseInt(event.target.value)});
    }

    pathToFolder = () => {
        return (
            <div>
                <label>Pick a folder</label>
                <Select value={this.state.folderIdValue} onChange={this.changeHandler}>
                    <option value="DEFAULT" > Select Folder </option>
                    {this.context.folders.map(folder => {
                        return(      
                            <option
                                key={folder.id} 
                                value={folder.id}
                            >
                                {folder.name}
                            </option>
                        )
                    })}
                </Select>
            </div>
        )
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateNewNote(); 
        if (isValid === true) {
            this.postNoteRequest();
            this.renderForm(); 
        }
    }

    noteForm = () => {
        return(
            <>
                <FormContainer onSubmit={event => this.handleFormSubmit(event)}>
                    <LabelContainer>
                        <CloseButton onClick={this.renderForm}> X </CloseButton>
                        <h2 style={{textAlign: 'center', marginBottom: '20px', width: '100%'}}>Note Form</h2>
                        <label>Name:</label>
                        <Input type='text' name='noteName' value={this.state.noteName} onChange={this.updateNote}/>
                        <TextArea type='text' name='noteContent' value={this.state.noteContent} onChange={this.updateNote}/>
                        <CustomButton type='submit'> ADD NOTE </CustomButton>
                        {this.pathToFolder()}

                    { this.state.validationErrorInfo !== "" && 
                        <ValidationError 
                            validationErrorInfo={this.state.validationErrorInfo}
                            clearError={this.clearError}
                            showForm={this.state.showForm}
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
                <AddNoteButtonContainer>
                    <Button onClick={this.renderForm}> ADD NOTE </Button>
                </AddNoteButtonContainer>
                {this.state.showForm && this.noteForm() }
            </>
        )
    }
}

export default withRouter(AddNote);

AddNote.propTypes = {
    noteName: PropTypes.string, 
    noteContent: PropTypes.string, 
    showForm: PropTypes.bool,
};