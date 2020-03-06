import Vue from 'vue'
import Vuex from 'vuex'
import theme from './module/theme'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        theme
    }
})