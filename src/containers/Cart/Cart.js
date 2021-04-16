import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Card, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as actions from '../../store/actions/index';
import Cards from '../../components/Card/Card';
import NotAuthenticated from '../../components/NotAuthenticated/NotAuthenticated';
import EmptyList from '../../components/EmptyList/EmptyList';
import './Cart.css';
import Spinner from '../../components/Spinner/Spinner';
import Search from '../../components/Search/Search';

const Cart = (props) => {
    const {cart, itemCount, cartTotal , GST,onFetchCart, 
            onRemoveCartItem, onWishlistItem, token, userId, isLoading, 
            searchQuery, searchResults} = props;

    console.table(searchResults);
    const toolTipMsg = {leftBtn:'Product removed',rightBtn:'Product moved to wishlist'};

    let shippingCharge = cartTotal>1199 || cartTotal === 0 ? 0 : 99;
    let totalAmount = cartTotal + GST + shippingCharge;
    const cartSummary =[
                            {key:'Total Items:', value:itemCount},
                            {key:'Cart Total:', value:cartTotal},
                            {key:'GST:', value:GST},
                            {key:'Shipping:', value:shippingCharge},
                            {key:'Total amount:', value:totalAmount},
                        ]
    useEffect(() => {
        onFetchCart(token, userId)
    },[onFetchCart, token ,userId])

    const onWishlistItemHandler = (cartItem) => {
        cartItem['userId'] = userId;
        onWishlistItem(cartItem, token)
    }

    const productsToBeDisplayed = searchQuery.length === 0 ? cart : searchResults;
    const cartCard = 
        productsToBeDisplayed.length !== 0 ?
        <>
            <div className='card-wrapper'>
                { productsToBeDisplayed.map(cartItem =>(
                    <Cards
                        key = {cartItem.id}
                        listItem = {cartItem} 
                        btn1text = {'Remove'}
                        btn2text = {'Move to Wishlist'}
                        toolTipMsg = {toolTipMsg}
                        onLeftButtonClick = {() => {onRemoveCartItem(cartItem, token)}}
                        onRightButtonClick = {() => { onWishlistItemHandler(cartItem)
                                                    onRemoveCartItem(cartItem,token)  }}
                    />
                    ) )
                }
            </div>
            <Card
                className = 'Summary'
                bg='light'
                text='dark'>
                {/* style={{ width: '30rem' }}> */}
                <Card.Header><h5>Cart Summary</h5></Card.Header>
                <Card.Body>
                {/* <Card.Text> */}
                    { cartSummary.map(item => (
                        <Row key={item.key}>
                            <Col><h6>{item.key}</h6></Col>
                            <Col className = 'SecondCol'><h6>{item.key !== 'Total Items:'?'Rs.':null} {item.value}</h6></Col>
                        </Row>
                    ))  
                    }  
                    <Link to = '/checkout' cartsummary = {cartSummary}>
                    <Button 
                        className = "Summary" 
                        variant = "primary"
                        >Checkout</Button>
                    </Link> 
                {/* </Card.Text> */}
                </Card.Body>
            </Card> 
        </> :

        <EmptyList title = {'Cart'}/>

    return(
        <>
            <Search />
            {token != null ? (isLoading ? <Spinner/> : cartCard) : <NotAuthenticated />}    
            
        </>
    )
}

const mapStateToProps = state =>{
    const {cart, itemCount, cartTotal, GST, isLoading} = state.cart;
    return{
        cart:cart,
        itemCount:itemCount,
        cartTotal:cartTotal,
        GST:GST,
        token:state.auth.token,
        userId:state.auth.userId,
        isLoading:isLoading,
        searchQuery: state.products.searchQuery,
        searchResults: state.products.searchResults,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchCart: (token, userId) => dispatch(actions.fetchCart(token, userId)),
        onRemoveCartItem: (cartItem, token) => dispatch(actions.removeCartItem(cartItem, token)),
        onWishlistItem: (cartItem, token) => dispatch(actions.onWishlistProduct(cartItem, token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);