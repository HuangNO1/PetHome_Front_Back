import { UPDATE_ALL_USERS_DETAIL } from '../mutations-types/manageUsers'
import { TEST_USERS } from '../testData'
const users = {
    state: {
        users: TEST_USERS
    },
    mutations: {
        [UPDATE_ALL_USERS_DETAIL](state, users) {
            state.users = users;
        }
    },
    actions: {},
    getters: {}
}

export default users;