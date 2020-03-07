import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/application/work/page/Home.vue'
import Cart from '@/application/work/page/Cart.vue'
import Setting from '@/application/work/page/Setting.vue'
import Record from '@/application/work/page/Record.vue'
import User from '@/application/work/page/User.vue'
import About from '@/application/work/page/About.vue'

//使用 vue-router
Vue.use(VueRouter)

//匯出vue-router 設置
export default new VueRouter({
    routes: [{
            name: 'Home', //元件呈現的名稱
            path: '/Home', //對應的路徑
            component: Home //對應的元件
        },
        {
            name: 'Cart',
            path: '/Cart',
            component: Cart
        },
        {
            name: 'Setting',
            path: '/Setting',
            component: Setting
        },
        {
            name: 'Record',
            path: '/Record',
            component: Record
        },
        {
            name: 'User',
            path: '/User',
            component: User
        },
        {
            name: 'About',
            path: '/About',
            component: About
        },
    ]
})