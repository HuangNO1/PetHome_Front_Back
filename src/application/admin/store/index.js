import Vue from 'vue'
import Vuex from 'vuex'
import theme from './module/theme'
import product from './module/product'
import user from './module/user'
import order from './module/order'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        theme,
        product,
        user,
        order
    }
})