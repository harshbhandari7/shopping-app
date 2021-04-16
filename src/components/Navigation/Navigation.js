import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Navbar,Nav,Form,FormControl} from 'react-bootstrap';

import * as actions from '../../store/actions/index'; 
import Logo from '../Logo/Logo';
import './Navigation.css';
import menuIcon from './icons-menu.png';

const NavigationBar = (props) => {
    const {isAuthenticated, onSearch} = props;

    const searchTextHandler = (event) => {
        onSearch(event.target.value);

    }
    return(
            <Navbar sticky = "top" bg="light" variant="light" expand>
                <Navbar.Brand as={Link} to = "/"><Logo /></Navbar.Brand>

                <Nav className="mr-auto" >
                    <Nav.Link as={Link} to ="/products">Products</Nav.Link>
                    
                </Nav>
                {/* <Nav>
                    <Nav.Item>
                        <img src={menuIcon} alt='drawer toggle' />
                    </Nav.Item>
                </Nav> */}
                <Nav className="justify-content-center">
                    <Form inline>
                        <FormControl 
                            type="text" 
                            placeholder="Search"
                            className="mr-sm-2"
                            onChange={(event) => searchTextHandler(event)} />
                    </Form>
                </Nav>

                <Nav>
                    <Nav.Item>
                        <Nav.Link as= {Link} to="/wishlist" >Wishlist</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as= {Link} to="/cart" >Cart</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        {!isAuthenticated 
                            ?<Nav.Link as= {Link} to="/login">Sign In</Nav.Link> 
                            :<Nav.Link as= {Link} to="/logout">Logout</Nav.Link>}
                        
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link></Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onSearch: (searchQuery) => dispatch(actions.searchProducts(searchQuery)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);