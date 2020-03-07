import Vue from 'vue'
import App from './work.vue'
import router from './router' //引入 router
import store from './store'
import vuetify from '../../plugins/vuetify';
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'

Vue.use(VueScrollProgressBar)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')