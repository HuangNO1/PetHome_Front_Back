import { UPDATE_ALL_USERS_DETAIL } from '../mutations-types/manageUsers'
import { TEST_USERS } from '../testData'
const users = {
    state: {
        users: []
    },
    mutations: {
        [UPDATE_ALL_USERS_DETAIL](state, user) {
            state.users.push(user);
        }
    },
    actions: {},
    getters: {}
}

export default users;