import { ADD_TO_CART, ADD_TO_RECORD, DELETE_CART_ITEM } from '../mutations-types/product'

const product = {
    state: {
        cartProduct: [],
        recordProduct: []
    },
    mutations: {
        [ADD_TO_CART](state, item) {
            state.cartProduct.push(item);
        },
        [ADD_TO_RECORD](state, item) {
            state.recordProduct.push(item);
        },
        [DELETE_CART_ITEM](state, item) {
            state.cartProduct = item;
        }
    },
    actions: {},
    getters: {}
}