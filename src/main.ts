import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import IO from 'socket.io-client'
import 'ant-design-vue/dist/antd.css'
import './styles/main.scss'

const app = createApp(App)

const SocketIO = {
    install: (app:any, { connection, options }:any) => {
      const socket = IO(connection, options)
      app.config.globalProperties.$socket = socket
      app.provide('socket', socket)
    }
}

app.use(Antd)
app.use(SocketIO, {
    connection: process.env.NODE_ENV === 'development' ? 'http://localhost:9999' : 'http://chrisying.cn/chat/api'
})
app.use(router).use(store)
app.mount('#app')
