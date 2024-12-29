import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../views/Main.vue'
import Login from '../views/login/Login.vue'
import User from '../views/User.vue'
import Dashboard from '../views/Dashboard.vue'
import CompanyManage from '@/views/management/CompanyManage.vue'
import CityinfoManage from '@/views/management/CityinfoManage.vue'
import SaleposManage from '@/views/management/SaleposManage.vue'

const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { 
        path: "/main", 
        component: Main,
        redirect: "/main/dashboard",
        children: [
            {
                path: "dashboard",
                component: Dashboard,
                meta: { title: "首页"},
            },
            {
                path: "company_manage",
                component: CompanyManage,
                meta: { title: "医药公司信息管理"},
            },
            {
                path: "salepos_manage",
                component: SaleposManage,
                meta: { title: "销售地点管理"},
            },
            {
                path: "cityinfo_manage",
                component: CityinfoManage,
                meta: { title: "城市信息管理"},
            },
            {
                path: "user",
                component: User,
                meta: { title: "用户管理"},
            },
        ]
    }
]
const router = createRouter({
    //路由数据
    routes,
    //路由匹配模式
    history:createWebHashHistory()
})
export default router