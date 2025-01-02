import { createRouter, createWebHashHistory } from 'vue-router'

import Main from '../views/layout/Main.vue'
import Login from '../views/login/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import CompanyManage from '@/views/management/CompanyManage.vue'
import CityinfoManage from '@/views/management/CityinfoManage.vue'
import SaleposManage from '@/views/management/SaleposManage.vue'
import MedinfoManage from '@/views/management/MedinfoManage.vue'
import HcpolicyManage from '@/views/management/HcpolicyManage.vue'
import MedipolicyManage from '@/views/management/MedipolicyManage.vue'
import DoctorManage from '@/views/management/DoctorManage.vue'
import MaterialsManage from '@/views/management/MaterialsManage.vue'

const routes = [
    { path: "/", redirect: "/main" },
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
                path: "medinfo_manage",
                component: MedinfoManage,
                meta: { title: "药品信息管理"},
            },
            {
                path: "hcpolicy_manage",
                component: HcpolicyManage,
                meta: { title: "医保政策管理"},
            },
            {
                path: "medipolicy_manage",
                component: MedipolicyManage,
                meta: { title: "医药公司政策管理"},
            },
            {
                path: "docinfo_manage",
                component: DoctorManage,
                meta: { title: "医生信息管理"},
            },
            {
                path: "materials_manage",
                component: MaterialsManage,
                meta: { title: "必备材料管理"},
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