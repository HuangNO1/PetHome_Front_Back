import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/application/admin/page/Dashboard.vue'
import Notify from '@/application/admin/page/Notify.vue'
import Task from '@/application/admin/page/Task.vue'
import Edit from '@/application/admin/page/Edit.vue'
import Preview from '@/application/admin/page/Preview.vue'
import Manage from '@/application/admin/page/Manage.vue'
import About from '@/application/admin/page/About.vue'
import PageNotFound from '@/application/admin/page/404.vue'

//使用 vue-router
Vue.use(VueRouter)

//匯出vue-router 設置
export default new VueRouter({
    routes: [{
            name: 'Dashboard', //元件呈現的名稱
            path: '/Dashboard', //對應的路徑
            component: Dashboard //對應的元件
        },
        {
            name: 'Notify',
            path: '/Notify',
            component: Notify
        },
        {
            name: 'Task',
            path: '/Task',
            component: Task
        },
        {
            name: 'Edit',
            path: '/Edit',
            component: Edit
        },
        {
            name: 'Preview',
            path: '/Preview',
            component: Preview
        },
        {
            name: 'Manage',
            path: '/Manage',
            component: Manage
        },
        {
            name: 'About',
            path: '/About',
            component: About
        },
        {
            name: '404Page',
            path: '*',
            component: PageNotFound
        }
    ]
})