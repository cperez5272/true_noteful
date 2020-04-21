import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const ValidationError = (props) => {

    useEffect(() => {
        if (props.validationErrorInfo === '') return; 
        const timer = setTimeout(() => props.clearError(), 3000); 
        return () => clearTimeout(timer);
    }, [props.showForm])

    return (
        <>
            {props.validationErrorInfo !== "" && <Container> {props.validationErrorInfo} </Container> }
        </>
    )
}

export default ValidationError; 

const Container = styled.div`
    position: absolute; 
    z-index: 500; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    font-size: 14px; 
    top: 150px; 
    border: 1px solid red; 
    font-size: 14px; 
    padding: 20px; 
    background-color: red; 
    color: white; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 200px;
`