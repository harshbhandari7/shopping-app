import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-products';


export const fetchProductStarted = () => {
    return{
        type:actionTypes.FETCH_PRODUCTS_STARTED,
    }
}

export const setItems = (itemSize) => {
    
    return{
        type:actionTypes.SET_ITEM_SIZE,
        itemSize:itemSize,
    }
}

export const setProducts = (products) => {
    return{
        type:actionTypes.SET_PRODUCTS,
        products:products,
    }
}

export const initProducts = () => {
    return dispatch => {
        // const queryParams = '?orderBy="price"&limitToFirst=' + 10;
        dispatch(fetchProductStarted());
        return axios.get('https://shopify-101.firebaseio.com/products.json')
        .then(response => {
            dispatch(setProducts(response.data))
        })
    }
}
export const mockInitProducts = () => {
    return dispatch =>{
            dispatch(fetchProductStarted());
            let success = true;
            return new Promise((resolve, reject) => {
                
                if(success){
                    // resolve(dispatch([
                    //     {type: actionTypes.FETCH_PRODUCTS_STARTED},
                    //     {type: actionTypes.SET_PRODUCTS,  body: { products: [] }}
                    // ]))
                    dispatch(setProducts([]))
                    resolve([
                        {
                            type: actionTypes.FETCH_PRODUCTS_STARTED
                        },
                        {
                            type: actionTypes.SET_PRODUCTS,
                            body: { products: [] },
                        }
                    ])
                }
                else{
                    reject(null)
                }
            }) 
        } 
    }
export const foo = () =>{
    return new Promise((resolve, reject) => {
        resolve('Promise successful')
    })
}
export const searchProducts = (searchQuery) => {
    return {
        type:actionTypes.SEARCH_PRODUCTS,
        searchQuery:searchQuery,
    }
}

export const setSearch = (searchResults) => {
    return {
        type:actionTypes.SET_SEARCH_PRODUCTS,
        searchResults:searchResults,
    }
}