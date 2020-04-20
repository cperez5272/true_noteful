import styled from 'styled-components';

export const AddNoteButtonContainer = styled.div`
    position: absolute; 
    z-index: 3; 
    right: 50px; 
    top: 30px;

`

export const Button = styled.button`
    border-radius: 4px; 
    background-color: white; 
    font-size: 12px;
    font-family: "Lato", sans-serif;

    :hover {
        box-shadow: inset -1px 0px 5px -1px rgba(0,0,0,0.5);
    }
`

export const FormContainer = styled.form`
    flex-direction: column; 
    padding: 40px; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    position: fixed; 
    width: 100vw; 
    height: 100vh; 
    top: 0; 
    left: 0; 
    background-color: rgba(0, 0, 0, .25);
    z-index: 10; 
`

export const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 20px 40px;
    z-index: 20;
    background-color: white; 
    justify-content: space-around;
    align-items: flex-start;
    border-radius: 4px;
    position: relative; 
`

export const Input = styled.input`
    height: 40px; 
    width: 97%;
    border-radius: 4px; 
    border: 1px solid grey;
    margin-bottom: 20px;
    padding: 5px 10px; 
    font-size: 14px; 
`

export const TextArea = styled.textarea`
    width: 97%; 
    height: 200px;
    resize: none;
    margin-bottom: 20px; 
    font-size: 14px;
    padding: 5px 10px;
`

export const CloseButton = styled.div`
    padding: 5px; 
    font-size: 16px; 
    position: absolute; 
    right: 10px;
    top: 10px; 

    :hover {
        color: red; 
        cursor: pointer; 
        transition: .25s ease all; 
    }
`

export const CustomButton = styled(Button)`
    margin: 20px 0 20px 0;
`

export const Select = styled.select`
    margin-left: 20px; 
    padding: 5px 10px; 
    font-size: 14px; 
`