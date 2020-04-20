import React from 'react'
import { withRouter } from 'react-router-dom'
import '../App.css'
import Context from '../Context'
import styled from 'styled-components';

class NoteContainer extends React.Component {

    static contextType = Context

    state = {
        folder: {}, 
        note: {}
    }

    componentDidMount() {
        const noteId = this.props.match.params.noteId;
        const foundNote = this.props.notes.find(note => parseInt(note.id) === parseInt(noteId));
        if (foundNote) {
            this.setState({note: foundNote});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.notes !== this.props.notes) {
            const noteId = this.props.match.params.noteId;
            const foundNote = this.props.notes.find(note => parseInt(note.id) === parseInt(noteId));
            this.setState({note: foundNote});
        }    
    }

    deleteNoteRequest = async (callback) => {
        const noteId = this.props.match.params.noteId; 
        const response = await fetch(`${process.env.REACT_APP_NOTEFUL_API}/notes/${noteId}`, {method: 'DELETE'}); 
        console.log(response);
        this.props.updateIndex();
        return this.props.history.push("/");
    }


    render() {  

        if (!this.state.note.name) return <></>
        return (
            <Container>
                <Header> { this.state.note.name} </Header>
                <MidContainer>
                    <Content> {this.state.note.content } </Content>
                    <Date> created: { this.state.note.modified } </Date>
                </MidContainer>
                <DeleteButton onClick={this.deleteNoteRequest}> DELETE </DeleteButton>
            </Container>
        )
    }
}

export default withRouter(NoteContainer); 

const Container = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    height: 400px; 
    background-color: #EFF9FF; 
    padding: 20px 50px; 
    max-width: 450px; 
    margin: 0 auto; 
    border-radius: 4px; 
    justify-content: space-around;
`

const Header = styled.h1`
    font-size: 26px; 
    width: 100%; 
    text-align: left;
    font-family: "Montserrat", sans-serif;
`

const Content = styled.p`
    width: 100%; 
    text-align: left; 
    margin-bottom: 10px; 
`

const Date = styled.p`
    width: 100%; 
    text-align: left; 
    font-size: 12px;
`

const MidContainer = styled.div`
    width: 100%; 
    text-align: left; 
`

const DeleteButton = styled.button`
    margin-right: auto; 
    border-radius: 4px; 
    transition: .1s ease-in-out all; 

    :hover {
        background-color: #EF476F;
        color: white; 
    }
`