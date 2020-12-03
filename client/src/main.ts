import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import router from './router/index2'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '/@/styles/main.scss'


const app = createApp(App)
app.use(Antd)
app.use(router).use(store).mount('#app')
