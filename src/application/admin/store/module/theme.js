import { UPDATE_NAV_THEME, UPDATE_NAV_IMAGE } from '../mutations-types/theme'

const theme = {
    state: {
        navTheme: "",
        navImage: "",
    },
    mutations: {
        [UPDATE_NAV_THEME](state, navTheme) {
            state.navTheme = navTheme;
        },
        [UPDATE_NAV_IMAGE](state, navImage) {
            state.navImage = navImage;
        }
    },
    actions: {},
    getters: {}
}

export default theme;