import * as actionTypes from '../actions/actionTypes';
import { arrayOfProducts } from "../../containers/Products/products.json";

const intialState = {

    productList:[],
    searchQuery:'',
    searchResults:[],
    isLoading:false,
    itemSize:0,
}

const reducer = (state = intialState, action) => {
   
    switch(action.type){

        case actionTypes.FETCH_PRODUCTS_STARTED:
            return{
                ...state,
                isLoading:true,
            }
        
        case actionTypes.SET_ITEM_SIZE:
            //console.log('reducer',action.itemSize);
            const pList = arrayOfProducts.slice(0, action.itemSize);
            console.log('pl',pList);
            
            return{
                ...state,
                itemSize:action.itemSize,
                productList:pList
            }

        case actionTypes.SET_PRODUCTS:
            return{
                ...state,
                //productList:action.products,
                isLoading:false,
            }
        
        case actionTypes.SEARCH_PRODUCTS:
            return{
                ...state,
                searchQuery:action.searchQuery,
            }
        
        case actionTypes.SET_SEARCH_PRODUCTS:
            return{
                ...state,
                searchResults:action.searchResults,
            }
            
        default:
            return state;
    }
}

export default reducer;