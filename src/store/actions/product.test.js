import * as actionTypes from './actionTypes';
import * as actions from './products';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {foo} from './products';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Products actions ', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('Init Products async action', () => {
        fetchMock.get('*', {
            response: 200,
            body: { products: [] },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            {
                type: actionTypes.FETCH_PRODUCTS_STARTED
            },
            {
                type: actionTypes.SET_PRODUCTS,
                body: { products: [] },
            }
        ]

        const store = mockStore({products : []});

        expect(actions.fetchProductStarted).toBeDefined();
        expect(actions.mockInitProducts()).toBeDefined();
        store.dispatch(actions.mockInitProducts()).then(data => {
            expect(data).toEqual(expectedActions)
        })
    })
    it('promise test', () => {
        actions.foo().then(msg => {
            console.log(msg)
          })

    })
    it('FETCH PRODUCT ACTION', () => {
        const expectedAction = {
            type: actionTypes.FETCH_PRODUCTS_STARTED
        }
        expect(actions.fetchProductStarted).toBeDefined();
        expect(actions.fetchProductStarted()).toEqual(expectedAction);
    })

    it('Set items size action', () => {
        const expectedAction = {
            type: actionTypes.SET_ITEM_SIZE,
            itemSize:10
        }
        expect(actions.setItems).toBeDefined();
        expect(actions.setItems(10)).toEqual(expectedAction);
    })

    it('Set Product action', () => {
        const expectedAction = {
            type: actionTypes.SET_PRODUCTS,
            products:[{}, {}]
        }
        expect(actions.setProducts).toBeDefined();
        expect(actions.setProducts([{}, {}])).toEqual(expectedAction);
    })

    it('Search Product action', () => {
        const expectedAction = {
            type: actionTypes.SEARCH_PRODUCTS,
            searchQuery: 'bag'
        }
        expect(actions.searchProducts).toBeDefined();
        expect(actions.searchProducts('bag')).toEqual(expectedAction);
    })

    it('Set Search action', () => {
        const expectedAction = {
            type: actionTypes.SET_SEARCH_PRODUCTS,
            searchResults: [{}, {}]
        }
        expect(actions.setSearch).toBeDefined();
        expect(actions.setSearch([{}, {}])).toEqual(expectedAction);
    })


})
