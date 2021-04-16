import React, {useEffect} from 'react';
import {connect} from 'react-redux'

import * as actions from '../../store/actions/index';
import Card from '../../components/Card/Card';
import NotAuthenticated from '../../components/NotAuthenticated/NotAuthenticated';
import EmptyList from '../../components/EmptyList/EmptyList';
import Search from '../../components/Search/Search';
import Spinner from '../../components/Spinner/Spinner';


const Wishlist = props => {
    const {FetchWishlist, wishlist, onRemoveWishlistItem, onAddToCart, token,
            userId, searchQuery, searchResults, isLoading} = props;
    

    const toolTipMsg = {leftBtn:'Product removed',rightBtn:'Product added to cart'};

    useEffect(() => {
        FetchWishlist(token, userId)
        },[FetchWishlist, token, userId])
    
    const onAddToCartHandler = (wishlistItem) => {
        wishlistItem['userId'] = userId;
        onAddToCart(wishlistItem, token)
    }
    const productsToBeDisplayed = searchQuery.length === 0 ? wishlist : searchResults;
    
    const wishlistCard = 
        productsToBeDisplayed.length !== 0 ?
        <div className='card-wrapper'>
            {productsToBeDisplayed.map(wishlistItem => (
                <Card 
                    key = {wishlistItem.id}  
                    listItem = {wishlistItem} 
                    btn1text = {'Remove'}
                    btn2text = {'Add to Cart'}
                    toolTipMsg = {toolTipMsg}
                    onLeftButtonClick = {() => {onRemoveWishlistItem(wishlistItem, token)}}
                    onRightButtonClick = {() => {
                                                    onAddToCartHandler(wishlistItem) 
                                                    onRemoveWishlistItem(wishlistItem, token)
                                                }
                                            }
                    />))
            } 
        </div>:
        <EmptyList title = {'Wishlist'}/>
    

    return(
        <div>
            <Search/>
            {token != null ? (isLoading ? <Spinner/> : wishlistCard) : <NotAuthenticated />}
        </div>
    )
}
const mapStateToProps = state => {
    
    return{
        wishlist: state.wishlist.wishlist,
        isLoading: state.wishlist.isLoading,
        token: state.auth.token,
        userId: state.auth.userId,
        searchQuery: state.products.searchQuery,
        searchResults: state.products.searchResults,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        FetchWishlist : (token, userId) => dispatch(actions.onFetchWishlist(token, userId)),
        onRemoveWishlistItem: (wishlistItem, token) => dispatch(actions.removeWishlistItem(wishlistItem, token)),
        onAddToCart: (wishlistItem, token) => dispatch(actions.addToCart(wishlistItem, token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Wishlist);