import React from 'react'

const Context = React.createContext({
    folders: [],
    notes: [],
    currentFolderId: '',
    currentNoteContent: '',
    folderClickHandler: () => {},
    renderNoteNames: () => {},
    removeNote: () => {},
})

export default Context