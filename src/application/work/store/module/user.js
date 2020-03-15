import {
    UPDATE_USER_USERNAME,
    UPDATE_USER_AVATAR,
    UPDATE_USER_DESCRIPTION,
    UPDATE_USER_EMAIL,
    UPDATE_USER_PHONE,
    UPDATE_USER_CASH,
    UPDATE_USER_ADDRESS,
    UPDATE_ALL_USER_DATA
} from "../mutations-types/user";

const user = {
    state: {
        username: "Rem",
        avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
        description: "前端負責人，1804 黃柏曛，I love ArchLinux.",
        email: "fh831.cp9gw@gmail.com",
        phone: "1111111111",
        cash: 1000,
        address: "################",
        password: "********"
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
        }
    },
    actions: {},
    getters: {}
}

export default user;