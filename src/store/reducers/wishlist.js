import * as actionTypes from '../actions/actionTypes';

const intialState = {
    wishlist : [],
    isLoading: false,
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        
        case actionTypes.FETCH_WISHLIST_STARTED:
            return{
                ...state,
                isLoading:true,
            }

        case actionTypes.SET_FETCHED_WISHLIST:
            return{
                ...state,
                wishlist:action.fetchedList,
                isLoading:false,
            }
        
        case actionTypes.UPDATE_WISHLIST:
            const updatedWishlist = state.wishlist.filter(item => item.id !== action.wishlistItem.id);
            return{
                ...state,
                wishlist:updatedWishlist
            }

        default:
            return state;
    }
}

export default reducer;