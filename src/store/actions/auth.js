import axios from 'axios';
import * as actionTypes from './actionTypes';
import {apiKey} from '../../utils/envvariable';

export const authStart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId,
    }
}
export const authFail = (error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const setPath = (path) => {
    return{
        type:actionTypes.AUTH_REDIRECT_PATH,
        path:path,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type:actionTypes.LOGOUT
    }
}

export const authTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() => dispatch(logout()), expirationTime*1000);
    }
}
export const auth = (email, password, isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const data ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        if(!isSignup){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        }
        axios.post(url, data)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            })

    }
}

export const authState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(authTimeout((expirationDate.getTime() - new Date())/1000)) 
                                                //dividing here by 1000 cause we are passing time in seconds. 
            }
        }
    }
}
