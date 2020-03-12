import { ADD_TO_CART, ADD_TO_RECORD, UPDATE_CART_ITEMS } from '../mutations-types/product'

const product = {
    state: {
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
        }
    },
    actions: {},
    getters: {}
}

export default product;