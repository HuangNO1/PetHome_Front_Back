import {
    UPDATE_ALL_ORDER,
    ADD_TO_FINISH_ORDER,
    ADD_TO_CANCEL_ORDER
} from '../mutations-types/order'
import { TEST_ORDER } from '../testData'
const order = {
    state: {
        order: TEST_ORDER
    },
    mutations: {
        [UPDATE_ALL_ORDER](state, order) {
            state.order = order;
        },
    },
    actions: {},
    getters: {}
}

export default order;