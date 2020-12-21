import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import 'ant-design-vue/dist/antd.css'
import '/@/styles/main.scss'

const app = createApp(App)
const socketConnection = SocketIO('http://localhost:9999')

app.config.globalProperties.$socket = new VueSocketIO({
    debug: process.env.NODE_ENV === 'development',
    connection: socketConnection,
    vuex: {
        store,
        mutationPrefix: "SOCKET_",
        actionPrefix: "SOCKET_"
    }
})
app.use(Antd)
app.use(router).use(store).mount('#app')
