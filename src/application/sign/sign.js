import Vue from 'vue'
import App from './sign.vue'
import router from './router' //引入 router
import vuetify from '../../plugins/vuetify';
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    Vuelidate,
    render: h => h(App)
}).$mount('#app')