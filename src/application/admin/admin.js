import Vue from 'vue'
import App from './admin.vue'
import router from './router' //引入 router
import store from './store'
import vuetify from '../../plugins/vuetify';
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);
Vue.use(VueScrollProgressBar);
Vue.use(VueNumberInput);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')