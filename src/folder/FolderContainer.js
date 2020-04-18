import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Context from '../Context'
import AddNote from '../note/AddNote'
import AddFolder from './AddFolder'

class FolderContainer extends React.Component {

    static contextType = Context

    renderFolderNames = () => {
        return this.context.folders.map(folder => {
            return (
                    <Link to={`/folder/${folder.id}`} key={folder.id} style={{textDecoration: 'none', width: '90%', borderRadius: '4px'}}>
                        <LI
                            key={folder.id}
                            onClick={() => this.context.folderClickHandler(folder.id)}
                            id={folder.id}
                            className={folder.id === this.context.currentFolderId ? "active" : null}
                        >
                                {folder.name}
                        </LI>
                    </Link>
            )
        })
    }


    render() {
        return (
            <>
                <Container className="folderContainer">
                    <UL>
                        {this.renderFolderNames()}
                    </UL>


                    <RenderedNotesContainer>
                        {this.props.renderNoteNames()}
                    </RenderedNotesContainer>
                    <AddNote addNewNote={this.props.addNewNote}/>
                </Container>
                <AddFolder addFolder={this.props.addFolder}/>
            </>
        )
    }
}

export default FolderContainer;

FolderContainer.defaultProps = {
    folders: [], 
    clickHandler: () => {}, 
    renderNoteNames: () => {}, 
    addFolder: () => {}, 
    addNewNote: () => {}
}

const Container = styled.div`
    display: flex;
    width: 50%;     
`

const UL = styled.ul`
    display: flex; 
    flex-direction: column; 
    width: 100%; 
    align-items: center; 
`

const LI = styled.li`
    list-style-type: none; 
    border: 5px solid #2F4858; 
    background-color: #33658A; 
    padding: 20px;
    color: #444; 
    display: flex;
    width: 100%; 
    justify-content: center; 
    align-items: center; 
    font-size: 18px; 
    color: white; 
    font-weight: bold; 
    text-decoration: none!important;
    margin-top: 10px; 
    border-radius: 4px; 

`

const RenderedNotesContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    width: 50%;  
    align-items: center;
`