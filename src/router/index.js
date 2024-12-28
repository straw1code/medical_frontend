import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../views/Main.vue'
import Login from '../views/login/Login.vue'

const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    
]
const router = createRouter({
    //路由数据
    routes,
    //路由匹配模式
    history:createWebHashHistory()
})
export default router