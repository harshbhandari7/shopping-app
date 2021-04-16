import React from 'react';
import Auxi from '../Auxi/Auxi';

const ErrorHandler = (WrappedComponent) => {
    return(props) => {
        return(
            <Auxi>
                <h1>It didn't work!</h1>
                <WrappedComponent {...props}/>
            </Auxi>
        )
    }
}

export default ErrorHandler;