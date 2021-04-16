import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-products';

export const addToCart = (productDetails, token) =>{
    return () => {
        axios.post('/cart.json?auth=' + token,productDetails)
        .then(response => {
            console.log('8',response.data);
        })
    }
}

export const fetchCartStarted = () => {
    return{
        type:actionTypes.FETCH_CART_STARTED,
    }
}

export const setFetchedCart = (fetchedList) =>{
    return{
        type:actionTypes.SET_FETCHED_CART,
        fetchedList:fetchedList
    }
}

export const fetchCart = (token, userId) =>{
    return dispatch =>{
        dispatch(fetchCartStarted());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/cart.json' + queryParams)
        .then(response => {
            console.log(response)
            const fetchedList = [];
            for(let key in response.data){
                fetchedList.push({
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(setFetchedCart(fetchedList));
        })
    }
}

export const updateCart = (cartItem) =>{
    return{
        type:actionTypes.UPDATE_CART,
        cartItem:cartItem
    }
}

export const removeCartItem = (cartItem, token) => {
    return dispatch => {
        const queryParams = '?auth=' + token;
        axios.delete(`https://shopify-101.firebaseio.com/cart/${cartItem.id}.json` + queryParams)
        .then(response => {
            console.log(response)
        dispatch(updateCart(cartItem))
        })
    }
}