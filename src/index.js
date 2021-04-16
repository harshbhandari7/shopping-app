import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import productsReducer from './store/reducers/products';
import wishlistReducer from './store/reducers/wishlist';
import cartReducer from './store/reducers/cart';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	products:productsReducer,
	wishlist:wishlistReducer,
	cart:cartReducer,
	form:reduxFormReducer,
	auth:authReducer,
	});
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

const app = (
	<Provider store = {store}>
		<BrowserRouter>
			<Suspense fallback = {<div>Loading...</div>}>
				<App />
			</Suspense>
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
