import {
    UPDATE_USER_USERNAME,
    UPDATE_USER_AVATAR,
    UPDATE_USER_DESCRIPTION,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PHONE,
    UPDATE_USER_CASH,
    UPDATE_USER_ADDRESS,
    UPDATE_ALL_USER_DATA,
    UPDATE_USER_LIKE_PRODUCT,
    UPDATE_USER_UP_VOTE_PRODUCT,
    REMOVE_USER_LIKE_PRODUCT,
    REMOVE_USER_UP_VOTE_PRODUCT,
    ADD_USER_LIKE_PRODUCT,
    ADD_USER_UP_VOTE_PRODUCT,
} from "../mutations-types/user";

import {
    TEST_USERNAME,
    TEST_AVATAR,
    TEST_DESCRIPTION,
    TEST_EMAIL,
    TEST_PHONE,
    TEST_CASH,
    TEST_ADDRESS,
    TEST_PASSWORD,
    TEST_LIKED,
    TEST_UP_VOTE
} from "../testData.js";

const user = {
    state: {
        username: TEST_USERNAME,
        avatar: TEST_AVATAR,
        description: TEST_DESCRIPTION,
        email: TEST_EMAIL,
        phone: TEST_PHONE,
        cash: TEST_CASH,
        address: TEST_ADDRESS,
        password: TEST_PASSWORD,
        likedProduct: TEST_LIKED,
        upVoteProduct: TEST_UP_VOTE
    },
    mutations: {
        [UPDATE_USER_USERNAME](state, username) {
            state.username = username;
        },
        [UPDATE_USER_AVATAR](state, avatar) {
            state.avatar = avatar;
        },
        [UPDATE_USER_DESCRIPTION](state, description) {
            state.description = description;
        },
        [UPDATE_USER_EMAIL](state, email) {
            state.email = email;
        },
        [UPDATE_USER_PHONE](state, phone) {
            state.phone = phone;
        },
        [UPDATE_USER_CASH](state, cash) {
            state.cash = cash;
        },
        [UPDATE_USER_ADDRESS](state, address) {
            state.address = address;
        },
        [UPDATE_ALL_USER_DATA](state, user) {
            state.username = user.username;
            state.avatar = user.avatar;
            state.description = user.description;
            state.email = user.email;
            state.phone = user.phone;
            state.cash = user.cash;
            state.address = user.address;
        },
        [UPDATE_USER_LIKE_PRODUCT](state, likedProduct) {
            state.likedProduct = likedProduct;
        },
        [UPDATE_USER_UP_VOTE_PRODUCT](state, upVoteProduct) {
            state.upVoteProduct = upVoteProduct;
        },
        [REMOVE_USER_LIKE_PRODUCT](state, itemID) {
            for (let i = 0; i < state.likedProduct.length; i++) {
                if (state.likedProduct[i] === itemID) {
                    state.likedProduct.splice(i, 1);
                    break;
                }
            }
        },
        [REMOVE_USER_UP_VOTE_PRODUCT](state, itemID) {
            for (let i = 0; i < state.upVoteProduct.length; i++) {
                if (state.upVoteProduct[i] === itemID) {
                    state.upVoteProduct.splice(i, 1);
                    break;
                }
            }
        },
        [ADD_USER_LIKE_PRODUCT](state, itemID) {
            state.likedProduct.push(itemID);
        },
        [ADD_USER_UP_VOTE_PRODUCT](state, itemID) {
            state.upVoteProduct.push(itemID);
        }
    },
    actions: {},
    getters: {}
}

export default user;