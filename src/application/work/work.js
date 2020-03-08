import Vue from 'vue'
import App from './work.vue'
import router from './router' //引入 router
import store from './store'
import vuetify from '../../plugins/vuetify';
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'
import VueNumberInput from '@smartweb/vue-number-input';

Vue.component('vue-number-input', VueNumberInput);

Vue.use(VueScrollProgressBar)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')