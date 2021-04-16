import React,{lazy, useEffect} from 'react';
import {withRouter,Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Logout from './containers/Login/Logout';
import * as actions from './store/actions/index';

const Products = lazy(() => import('./containers/Products/Products'));
const Wishlist = lazy(() => import('./containers/Wishlist/Wishlist'));
const Cart = lazy(() => import('./containers/Cart/Cart'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Signup = lazy(() => import('./containers/Signup/Signup'));
const Login = lazy(() => import('./containers/Login/Login'));

const App = (props) => {
	const {onAutoSignup} = props;

	useEffect(() => {
		onAutoSignup()
	}, [onAutoSignup])

	let routes = (
		<Switch>
			<Route exact path = "/" component = {Home} />
			<Route path = "/products" component = {Products} />
			<Route path = "/wishlist" component = {Wishlist} />
			<Route path = "/cart" component = {Cart} />
			<Route path = "/signup" component = {Signup} />
			<Route path = "/login" component = {Login} />
			<Route path = "/checkout" render = {props => <Checkout {...props}/>} />
			<Route path = "/logout" component = {Logout} />
			<Redirect to = "/" />
		</Switch>
	)

	return (
    	<>
			<Layout>
				
				{routes}
			</Layout>
    	</>
  	);
}
const mapDispatchToProps = dispatch => {
	return{
		onAutoSignup:() => dispatch(actions.authState())
	}
}
export default withRouter(connect(null, mapDispatchToProps)(App));
