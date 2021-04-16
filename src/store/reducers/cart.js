import * as actionTypes from '../actions/actionTypes';

const intialState = {
    cart:[],
    itemCount:0,
    cartTotal:0,
    GST:0,
    isLoading:false,
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        
        case actionTypes.FETCH_CART_STARTED:
            return{
                ...state,
                isLoading:true,
            }

        case actionTypes.SET_FETCHED_CART:
            let count = action.fetchedList.length;

            let total = 0;
            action.fetchedList.map(fetchedItem => (
                total+=fetchedItem.price
            ))
            let GST = 0.05 * total;
            return{
                ...state,
                cart:action.fetchedList,
                itemCount:count,
                cartTotal:total,
                GST:GST,
                isLoading:false
            }

        case actionTypes.UPDATE_CART:
            let updatedCart = state.cart.filter(item => item.id !== action.cartItem.id);
            let updatedCount = updatedCart.length;
    
            let updatedTotal = 0;
            updatedTotal = state.cartTotal - action.cartItem.price;
            
            let updatedGST = state.GST - 0.05 * action.cartItem.price;
            return{
                ...state,
                cart:updatedCart,
                itemCount:updatedCount,
                cartTotal:updatedTotal,
                GST:updatedGST,
            }
        default:
            return state;
    }

}

export default reducer;