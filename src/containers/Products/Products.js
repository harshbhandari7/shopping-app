import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import * as actions from '../../store/actions/index';
import Card from '../../components/Card/Card';
import Search from '../../components/Search/Search'; 
import Spinner from '../../components/Spinner/Spinner';

const Products = (props) =>{
    const {productList, onInitProducts, onSetItems, onAddToWishlist, onAddToCart, 
            token, userId, searchQuery, searchResults, isLoading} = props;

    const [itemSize, setItemSize] = useState(0);

    const toolTipMsg = {leftBtn:'Product added to Wishlist',rightBtn:'Product added to cart'};
    
    useEffect(() => {
        onInitProducts()
    }, [onInitProducts])
    
    const onAddToWishlistHandler = (product) => {
        product['userId'] = userId;
        onAddToWishlist(product, token)
    }

    const onAddToCartHandler = (product) => {
        product['userId'] = userId;
        onAddToCart(product, token)
    }

    const getMoreProducts = () => {
        onSetItems(itemSize)
        setItemSize(itemSize+10)
    }

    const productsCard = () => {
        // const searchResults = searchProducts();
        const productsToBeDisplayed = searchQuery === '' ? productList : searchResults;
        return(
            <div style={{overflow:'hidden'}}>
            <InfiniteScroll
                key = {itemSize}
                loadMore={getMoreProducts}
                hasMore={productsToBeDisplayed.length !== 115 ? true : false}
                loader= {<Spinner/>}
                useWindow
                threshold={150}
            >

                <div className='card-wrapper'>
                    {productsToBeDisplayed.map((product, index) => (
                        <Card
                            key = {index}
                            listItem = {product}
                            onLeftButtonClick = {() => onAddToWishlistHandler(product)}
                            onRightButtonClick = {() => onAddToCartHandler(product)} 
                            btn1text = 'Add to Wishlist' 
                            btn2text = 'Add to Cart'
                            toolTipMsg = {toolTipMsg}/>
                        ))
                    }   
                </div>
            </InfiniteScroll>
        </div>
        )
    }
    return(
        <div>
            <Search/>
            {isLoading ? <Spinner/> :productsCard()}
        </div>
    )
}
const mapStateToProps = state =>{
    const {token, userId} = state.auth;
    const {productList, searchQuery, searchResults, isLoading} = state.products;
    return {
        productList: productList,
        searchQuery: searchQuery,
        searchResults: searchResults,
        token:token,
        userId:userId,
        isLoading:isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitProducts: () => dispatch(actions.initProducts()),
        onSetItems: (itemSize) => dispatch(actions.setItems(itemSize)),
        onAddToWishlist : (productDetails, token) => dispatch(actions.onWishlistProduct(productDetails, token)),
        onAddToCart : (productDetails, token) => dispatch(actions.addToCart(productDetails, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)