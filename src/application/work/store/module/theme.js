import { UPDATE_NAV_THEME } from '../mutations-types/theme'

const theme = {
    state: {
        navTheme: ""
    },
    mutations: {
        [UPDATE_NAV_THEME](state, navTheme) {
            state.navTheme = navTheme;
        }
    },
    actions: {},
    getters: {}
}

export default theme;