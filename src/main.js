import { createApp } from 'vue'
import App from './App.vue'

import { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router/index.js'

import '../public/static/css/global.css'

import axios from "axios";
// axios.defaults.baseURL = "http://localhost:8080";
// 不能写死
axios.defaults.baseURL = "/api";

import * as echarts from 'echarts'

const app = createApp(App)

app.config.globalProperties.$http = axios;

app.config.globalProperties.$confirm = ElMessageBox.confirm
app.config.globalProperties.$message = ElMessage

app.config.globalProperties.$echarts = echarts

//路由挂载
app.use(router)

app.mount('#app')
