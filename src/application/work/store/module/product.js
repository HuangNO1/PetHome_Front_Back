import {
    ADD_TO_CART,
    ADD_TO_RECORD,
    UPDATE_CART_ITEMS,
    UPDATE_RECORD_ITEMS,
    INIT_PRODUCT_ITEMS,
    VIEW_PRODUCT_ITEM_DETAIL
} from '../mutations-types/product'
import { TEST_PRODUCT_DATA } from '../testData'

const product = {
    state: {
        productItems: [],
        cartProductItems: [],
        recordProductItems: [],
        viewProductItemDetail: {}
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
            state.productItems.push(item);
        },
        [VIEW_PRODUCT_ITEM_DETAIL](state, item) {
            state.viewProductItemDetail = item;
        }
    },
    actions: {},
    getters: {}
}

export default product;