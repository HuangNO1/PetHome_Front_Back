import {
    ADD_TO_CART,
    ADD_TO_RECORD,
    UPDATE_CART_ITEMS,
    UPDATE_RECORD_ITEMS,
    INIT_PRODUCT_ITEMS
} from '../mutations-types/product'
import { TEST_PRODUCT_DATA } from '../testData'

const product = {
    state: {
        productItems: TEST_PRODUCT_DATA,
        cartProductItems: [],
        recordProductItems: []
    },
    mutations: {
        [ADD_TO_CART](state, item) {
            state.cartProductItems.push(item);
        },
        [ADD_TO_RECORD](state, item) {
            state.recordProductItems.push(item);
        },
        [UPDATE_CART_ITEMS](state, item) {
            state.cartProductItems = item;
        },
        [UPDATE_RECORD_ITEMS](state, item) {
            state.recordProductItems = item;
        },
        [INIT_PRODUCT_ITEMS](state, item) {
            state.productItems = item;
        }
    },
    actions: {},
    getters: {}
}

export default product;