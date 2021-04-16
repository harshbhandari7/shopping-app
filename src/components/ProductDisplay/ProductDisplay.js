import React from 'react';
import {Card, Button, CardGroup,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

const ProductDisplay = props => {
    const {productDetails,onAddToWishlist} = props;

    return(
    
        <CardGroup style={{ width: '22rem'}}>
        <Card border="info" >
            <Card.Img variant="top" src={productDetails.imgUrl} />
            <Card.Body>
            <Card.Title>{productDetails.name}</Card.Title>
            <Card.Text>
                Product Price : {productDetails.price}
            </Card.Text>
            <Row>
                <Col>
                    <Button  onClick= {() => onAddToWishlist(productDetails)} variant="primary">Add to WishList</Button>
                </Col>
                <Col>
                    <Button  variant="primary">Add to Cart</Button>
                </Col>
            </Row>
            </Card.Body>
        </Card>
        </CardGroup>
        
    )
}

const mapDispatchToProps = dispatch => {
    return{
        onAddToWishlist : (productDetails) => dispatch(actions.onWishlistProduct(productDetails)),
    };
}

export default connect(null,mapDispatchToProps)(ProductDisplay);