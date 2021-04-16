import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';

const Search = (props) => {
    const {searchQuery, productList, onSetSearchResult} = props;
    
    const searchProducts = () => {
    
        const searchResults = productList.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return searchResults;
    }
    
    const searchResults = searchProducts();
    
    onSetSearchResult(searchResults);

    return (
        <>

        </>
    )
}

const mapStateToprops = (state) => {
    return{
        searchQuery:state.products.searchQuery,
        productList: state.products.productList,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSetSearchResult : (searchResults) => dispatch(actions.setSearch(searchResults)),
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(Search);