import Vue from 'vue'
import App from './work.vue'
import router from './router' //引入 router
import vuetify from '../../plugins/vuetify';
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')