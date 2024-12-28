import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index.js'

import '../public/static/css/global.css'

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

const app = createApp(App)

app.config.globalProperties.$http = axios;
//路由挂载
app.use(router)

app.mount('#app')
