const ProductsStore = {
    productList:[],
    searchQuery:'',
    searchResults:[],
    isLoading:false,
    itemSize:0,
}

describe('products Store', () => {
    let store = null;

    beforeEach(() => {
        store = ProductsStore;
    })

    afterEach(() => {
        store = null;
    });
    
    it('store should exist', () => {
        expect(store).toBeDefined();
        });
    
    it('store should have right intial data', () => {
        expect(store).toBeDefined();
        expect(store.productList).toEqual([]);
        expect(store.searchResults).toEqual([]);
        expect(store.searchQuery).toEqual('');
        expect(store.isLoading).toBeFalsy();
        expect(store.itemSize).toEqual(0);

    })

})