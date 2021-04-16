import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-products';

// export const setWishlist = (id, productsDetails) => {
//     return{
//         type:actionTypes.SET_WISHLIST,
//         wishlistItemId:id,
//         productsDetails:productsDetails,
//     }
// }

export const onWishlistProduct = (productsDetails, token) => {
    return dispatch => {
        axios.post('/wishlist.json?auth='+token, productsDetails)
        .then(response => {
            console.log('16',response);
            // dispatch(setWishlist(response.data.name, productsDetails));
        })
    }
}

export const fetchWishlistStarted = () => {
    return{
        type:actionTypes.FETCH_WISHLIST_STARTED,
    }
}

export const setFetchedWishlist = (fetchedList) => {
   return{ 
        type:actionTypes.SET_FETCHED_WISHLIST,
        fetchedList:fetchedList,
    }
}

export const onFetchWishlist = (token, userId) => {
    return dispatch =>{
        dispatch(fetchWishlistStarted());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/wishlist.json' + queryParams)
        .then(response => {
            const fetchedList = [];
            for (let key in response.data){
                fetchedList.push({
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(setFetchedWishlist(fetchedList));
        })
    }
}

export const updateWishlist = (wishlistItem) =>{
    return{
        type:actionTypes.UPDATE_WISHLIST,
        wishlistItem:wishlistItem,
    }
}
export const removeWishlistItem = (wishlistItem, token) => {
    return dispatch => {
        const queryParams = '?auth=' + token;
        axios.delete(`https://shopify-101.firebaseio.com/wishlist/${wishlistItem.id}.json` + queryParams)
        .then(response => {
            console.log('56',response);
        })
        .catch(err =>{
            console.log('59',err);
        })
        dispatch(updateWishlist(wishlistItem))
    }
}
