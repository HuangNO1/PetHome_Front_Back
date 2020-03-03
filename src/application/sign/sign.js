import Vue from 'vue'
import App from './sign.vue'
import router from "./router" //引入 router
import vuetify from '../../plugins/vuetify';

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')